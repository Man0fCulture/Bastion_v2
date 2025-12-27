import { z } from 'zod';

export const UserRoleSchema = z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']);

export const LocationTypeSchema = z.enum(['STORE', 'EMPLOYEE']);

export const AssetStateSchema = z.enum(['AVAILABLE', 'ASSIGNED', 'IN_REPAIR', 'LOST', 'RETIRED']);

export const MovementReasonSchema = z.enum(['ASSIGN', 'RETURN', 'TRANSFER', 'AUDIT', 'LOSS']);

export const ClaimStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);

export const StoreSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(20),
  created_at: z.coerce.date()
});

export const CreateStoreSchema = z.object({
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(20)
});

export const EmployeeSchema = z.object({
  id: z.string().uuid(),
  store_id: z.string().uuid(),
  firstname: z.string().min(1).max(100),
  lastname: z.string().min(1).max(100),
  matricule: z.string().regex(/^\d{7}$/),
  rio: z.string().regex(/^\d{7}$/),
  tel_neo: z.string().max(20).optional(),
  tel_pro: z.string().max(20).optional(),
  tel_perso: z.string().max(20).optional(),
  indicatif: z.string().regex(/^[A-Z]\s?\d{2}$/),
  affectation: z.string().min(1).max(100),
  photo_key: z.string().optional(),
  active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export const CreateEmployeeSchema = z.object({
  store_id: z.string().uuid(),
  firstname: z.string().min(1).max(100),
  lastname: z.string().min(1).max(100),
  matricule: z.string().regex(/^\d{7}$/, 'Le matricule doit contenir 7 chiffres'),
  rio: z.string().regex(/^\d{7}$/, 'Le RIO doit contenir 7 chiffres'),
  tel_neo: z.string().max(20).optional(),
  tel_pro: z.string().max(20).optional(),
  tel_perso: z.string().max(20).optional(),
  indicatif: z.string().regex(/^[A-Z]\s?\d{2}$/, 'Format: lettre + 2 chiffres (ex: B 05)'),
  affectation: z.string().min(1).max(100)
});

export const UpdateEmployeeSchema = CreateEmployeeSchema.partial().extend({
  active: z.boolean().optional()
});

export const EmployeeEquipmentSchema = z.object({
  id: z.string().uuid(),
  employee_id: z.string().uuid(),
  casque_sn: z.string().max(50).optional(),
  radio_motorola_sn: z.string().max(50).optional(),
  v60_invisio_sn: z.string().max(50).optional(),
  r30_invisio_sn: z.string().max(50).optional(),
  cable_invisio_sn: z.string().max(50).optional(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export const UpdateEquipmentSchema = z.object({
  casque_sn: z.string().max(50).optional(),
  radio_motorola_sn: z.string().max(50).optional(),
  v60_invisio_sn: z.string().max(50).optional(),
  r30_invisio_sn: z.string().max(50).optional(),
  cable_invisio_sn: z.string().max(50).optional()
});

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: UserRoleSchema,
  employee_id: z.string().uuid().optional(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  role: UserRoleSchema,
  employee_id: z.string().uuid().optional()
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const LocationSchema = z.object({
  id: z.string().uuid(),
  type: LocationTypeSchema,
  store_id: z.string().uuid().optional(),
  employee_id: z.string().uuid().optional(),
  name: z.string().min(1).max(100)
});

export const AssetSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  category: z.string().min(1).max(100),
  state: AssetStateSchema,
  serial_number: z.string().max(100).optional(),
  tags: z.array(z.string().max(50)).optional(),
  current_location_id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export const CreateAssetSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  category: z.string().min(1).max(100),
  state: AssetStateSchema.default('AVAILABLE'),
  serial_number: z.string().max(100).optional(),
  tags: z.array(z.string().max(50)).optional(),
  current_location_id: z.string().uuid()
});

export const UpdateAssetSchema = CreateAssetSchema.partial();

export const MoveAssetSchema = z.object({
  to_location_id: z.string().uuid(),
  reason: MovementReasonSchema,
  note: z.string().max(500).optional()
});

export const CreateClaimSchema = z.object({
  asset_id: z.string().uuid(),
  note: z.string().max(500).optional()
});

export const DecideClaimSchema = z.object({
  note: z.string().max(500).optional()
});

export const AssetFiltersSchema = z.object({
  store_id: z.string().uuid().optional(),
  category: z.string().optional(),
  state: AssetStateSchema.optional(),
  employee_id: z.string().uuid().optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20)
});

export const ClaimFiltersSchema = z.object({
  status: ClaimStatusSchema.optional(),
  store_id: z.string().uuid().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20)
});
