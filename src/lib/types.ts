export type UserRole = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export type LocationType = 'STORE' | 'EMPLOYEE';

export type AssetState = 'AVAILABLE' | 'ASSIGNED' | 'IN_REPAIR' | 'LOST' | 'RETIRED';

export type MovementReason = 'ASSIGN' | 'RETURN' | 'TRANSFER' | 'AUDIT' | 'LOSS';

export type ClaimStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface Store {
  id: string;
  name: string;
  code: string;
  created_at: Date;
}

export interface Employee {
  id: string;
  store_id: string;
  firstname: string;
  lastname: string;
  matricule: string;
  rio: string;
  tel_neo?: string;
  tel_pro?: string;
  tel_perso?: string;
  indicatif: string;
  affectation: string;
  photo_key?: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface EmployeeEquipment {
  id: string;
  employee_id: string;
  casque_sn?: string;
  radio_motorola_sn?: string;
  v60_invisio_sn?: string;
  r30_invisio_sn?: string;
  cable_invisio_sn?: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  employee_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Location {
  id: string;
  type: LocationType;
  store_id?: string;
  employee_id?: string;
  name: string;
}

export interface Asset {
  id: string;
  name: string;
  description?: string;
  category: string;
  state: AssetState;
  serial_number?: string;
  tags?: string[];
  current_location_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface AssetPhoto {
  id: string;
  asset_id: string;
  storage_key: string;
  is_primary: boolean;
  created_at: Date;
}

export interface Movement {
  id: string;
  asset_id: string;
  from_location_id?: string;
  to_location_id: string;
  moved_at: Date;
  moved_by_user_id: string;
  reason: MovementReason;
  note?: string;
}

export interface PossessionClaim {
  id: string;
  asset_id: string;
  employee_id: string;
  store_id: string;
  status: ClaimStatus;
  created_at: Date;
  decided_at?: Date;
  decided_by_user_id?: string;
  note?: string;
}

export interface Session {
  id: string;
  user_id: string;
  expires_at: Date;
  created_at: Date;
}

export interface EmployeeWithEquipment extends Employee {
  equipment?: EmployeeEquipment;
  store?: Store;
}

export interface AssetWithDetails extends Asset {
  location?: Location;
  photos?: AssetPhoto[];
  movements?: Movement[];
}
