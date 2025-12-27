CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE user_role AS ENUM ('ADMIN', 'MANAGER', 'EMPLOYEE');
CREATE TYPE location_type AS ENUM ('STORE', 'EMPLOYEE');
CREATE TYPE asset_state AS ENUM ('AVAILABLE', 'ASSIGNED', 'IN_REPAIR', 'LOST', 'RETIRED');
CREATE TYPE movement_reason AS ENUM ('ASSIGN', 'RETURN', 'TRANSFER', 'AUDIT', 'LOSS');
CREATE TYPE claim_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id),
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  matricule VARCHAR(7) NOT NULL UNIQUE,
  rio VARCHAR(7) NOT NULL,
  tel_neo VARCHAR(20),
  tel_pro VARCHAR(20),
  tel_perso VARCHAR(20),
  indicatif VARCHAR(10) NOT NULL,
  affectation VARCHAR(100) NOT NULL,
  photo_key VARCHAR(255),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE employee_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL UNIQUE REFERENCES employees(id),
  casque_sn VARCHAR(50),
  radio_motorola_sn VARCHAR(50),
  v60_invisio_sn VARCHAR(50),
  r30_invisio_sn VARCHAR(50),
  cable_invisio_sn VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'EMPLOYEE',
  employee_id UUID REFERENCES employees(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type location_type NOT NULL,
  store_id UUID REFERENCES stores(id),
  employee_id UUID REFERENCES employees(id),
  name VARCHAR(100) NOT NULL,
  CONSTRAINT location_reference CHECK (
    (type = 'STORE' AND store_id IS NOT NULL AND employee_id IS NULL) OR
    (type = 'EMPLOYEE' AND employee_id IS NOT NULL AND store_id IS NULL)
  )
);

CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  state asset_state NOT NULL DEFAULT 'AVAILABLE',
  serial_number VARCHAR(100),
  tags TEXT[],
  current_location_id UUID NOT NULL REFERENCES locations(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE asset_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  storage_key VARCHAR(255) NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES assets(id),
  from_location_id UUID REFERENCES locations(id),
  to_location_id UUID NOT NULL REFERENCES locations(id),
  moved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  moved_by_user_id UUID NOT NULL REFERENCES users(id),
  reason movement_reason NOT NULL,
  note TEXT
);

CREATE TABLE possession_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES assets(id),
  employee_id UUID NOT NULL REFERENCES employees(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  status claim_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  decided_at TIMESTAMPTZ,
  decided_by_user_id UUID REFERENCES users(id),
  note TEXT
);

CREATE INDEX idx_employees_store ON employees(store_id);
CREATE INDEX idx_employees_matricule ON employees(matricule);
CREATE INDEX idx_assets_location ON assets(current_location_id);
CREATE INDEX idx_assets_state ON assets(state);
CREATE INDEX idx_assets_category ON assets(category);
CREATE INDEX idx_movements_asset ON movements(asset_id);
CREATE INDEX idx_movements_date ON movements(moved_at DESC);
CREATE INDEX idx_claims_status ON possession_claims(status);
CREATE INDEX idx_claims_store ON possession_claims(store_id);
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);
