export type UserRole = 'UNIT_CHIEF' | 'GROUP_CHIEF' | 'ARMORER' | 'OPERATOR';

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

export type WeaponType = 'PISTOL' | 'RIFLE' | 'SHOTGUN' | 'SMG' | 'SNIPER' | 'OTHER';
export type WeaponState = 'AVAILABLE' | 'CHECKED_OUT' | 'MAINTENANCE' | 'LOST';
export type CheckoutStatus = 'PENDING' | 'APPROVED' | 'CHECKED_OUT' | 'RETURNED';

export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  serial_number: string;
  caliber: string;
  description?: string;
  state: WeaponState;
  store_id: string;
  assigned_to_employee_id?: string;
  shot_count: number;
  last_maintenance?: Date;
  next_maintenance?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface WeaponPhoto {
  id: string;
  weapon_id: string;
  storage_key: string;
  is_primary: boolean;
  created_at: Date;
}

export interface WeaponCheckout {
  id: string;
  weapon_id: string;
  operator_id: string;
  armorer_id?: string;
  mission_id?: string;
  status: CheckoutStatus;
  checked_out_at?: Date;
  checked_in_at?: Date;
  ammo_out: number;
  ammo_in?: number;
  created_at: Date;
}

export interface AmmunitionStock {
  id: string;
  caliber: string;
  quantity: number;
  store_id: string;
  last_updated: Date;
}

export type VehicleType = 'CAR' | 'VAN' | 'TRUCK' | 'MOTORCYCLE' | 'ARMORED';
export type VehicleState = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'OUT_OF_SERVICE';

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  registration: string;
  description?: string;
  state: VehicleState;
  mileage: number;
  store_id: string;
  assigned_to_employee_id?: string;
  last_maintenance?: Date;
  next_maintenance?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface VehiclePhoto {
  id: string;
  vehicle_id: string;
  storage_key: string;
  is_primary: boolean;
  created_at: Date;
}

export interface VehicleLog {
  id: string;
  vehicle_id: string;
  operator_id: string;
  mission_id?: string;
  started_at: Date;
  ended_at?: Date;
  mileage_start: number;
  mileage_end?: number;
  notes?: string;
  created_at: Date;
}

export type MissionType = 'INTERVENTION' | 'SURVEILLANCE' | 'ESCORT' | 'TRAINING' | 'PATROL';
export type MissionStatus = 'PLANNED' | 'BRIEFING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Mission {
  id: string;
  name: string;
  type: MissionType;
  status: MissionStatus;
  description?: string;
  scheduled_at: Date;
  started_at?: Date;
  ended_at?: Date;
  store_id: string;
  created_by_user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface MissionAssignment {
  id: string;
  mission_id: string;
  employee_id: string;
  role?: string;
  created_at: Date;
}

export type MissionKitType = 'HOSTAGE' | 'RAID' | 'SURVEILLANCE' | 'VIP_PROTECTION' | 'TRAINING';

export interface MissionKit {
  id: string;
  name: string;
  type: MissionKitType;
  description?: string;
  store_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface MissionKitItem {
  id: string;
  kit_id: string;
  item_type: 'ASSET' | 'WEAPON' | 'VEHICLE';
  item_id: string;
  quantity: number;
}

export type AlertType = 'EXPIRATION' | 'MAINTENANCE' | 'LOW_STOCK' | 'MISSION_UPCOMING';
export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  resource_type: 'ASSET' | 'WEAPON' | 'VEHICLE' | 'MISSION';
  resource_id: string;
  due_date?: Date;
  dismissed_at?: Date;
  dismissed_by_user_id?: string;
  created_at: Date;
}

export interface WeaponWithDetails extends Weapon {
  store?: Store;
  assigned_to?: Employee;
  photos?: WeaponPhoto[];
  current_checkout?: WeaponCheckout;
}

export interface VehicleWithDetails extends Vehicle {
  store?: Store;
  assigned_to?: Employee;
  photos?: VehiclePhoto[];
  current_log?: VehicleLog;
}

export interface MissionWithDetails extends Mission {
  store?: Store;
  assignments?: (MissionAssignment & { employee?: Employee })[];
  resources?: { weapons?: Weapon[]; vehicles?: Vehicle[]; assets?: Asset[] };
}
