const MOCK_STORES = [
  { id: '1', name: 'Paris Centre', code: 'PAR01', created_at: new Date() },
  { id: '2', name: 'Paris Nord', code: 'PAR02', created_at: new Date() },
  { id: '3', name: 'Lyon', code: 'LYO01', created_at: new Date() },
  { id: '4', name: 'Marseille', code: 'MAR01', created_at: new Date() },
  { id: '5', name: 'Bordeaux', code: 'BDX01', created_at: new Date() },
];

const MOCK_EMPLOYEES = [
  { id: '1', store_id: '1', firstname: 'Jean', lastname: 'Dupont', matricule: '1234567', rio: '7654321', tel_neo: '0612345678', tel_pro: '0123456789', indicatif: 'A 01', affectation: 'PARIS', active: true, store_name: 'Paris Centre', casque_sn: 'CSQ-001', radio_motorola_sn: 'MOT-001', v60_invisio_sn: 'V60-001', r30_invisio_sn: 'R30-001', cable_invisio_sn: 'CBL-001' },
  { id: '2', store_id: '1', firstname: 'Marie', lastname: 'Martin', matricule: '2345678', rio: '8765432', tel_pro: '0123456790', indicatif: 'A 02', affectation: 'PARIS', active: true, store_name: 'Paris Centre', casque_sn: 'CSQ-002', radio_motorola_sn: 'MOT-002' },
  { id: '3', store_id: '2', firstname: 'Pierre', lastname: 'Bernard', matricule: '3456789', rio: '9876543', indicatif: 'B 01', affectation: 'PARIS NORD', active: true, store_name: 'Paris Nord', casque_sn: 'CSQ-003' },
  { id: '4', store_id: '3', firstname: 'Sophie', lastname: 'Petit', matricule: '4567890', rio: '0987654', indicatif: 'C 01', affectation: 'LYON', active: true, store_name: 'Lyon' },
  { id: '5', store_id: '4', firstname: 'Lucas', lastname: 'Moreau', matricule: '5678901', rio: '1098765', indicatif: 'D 01', affectation: 'MARSEILLE', active: false, store_name: 'Marseille' },
  { id: '6', store_id: '1', firstname: 'Emma', lastname: 'Leroy', matricule: '6789012', rio: '2109876', indicatif: 'A 03', affectation: 'PARIS', active: true, store_name: 'Paris Centre', radio_motorola_sn: 'MOT-006', v60_invisio_sn: 'V60-006' },
];

const MOCK_ASSETS = [
  { id: '1', name: 'Radio Motorola DP4800', category: 'Communication', state: 'ASSIGNED', serial_number: 'MOT-2024-001', location_name: 'Jean Dupont', store_name: 'Paris Centre', current_location_id: 'loc-1' },
  { id: '2', name: 'Casque Peltor', category: 'Protection', state: 'AVAILABLE', serial_number: 'PEL-2024-001', location_name: 'Stock Paris Centre', store_name: 'Paris Centre', current_location_id: 'loc-store-1' },
  { id: '3', name: 'Gilet pare-balles', category: 'Protection', state: 'ASSIGNED', serial_number: 'GPB-2024-001', location_name: 'Marie Martin', store_name: 'Paris Centre', current_location_id: 'loc-2' },
  { id: '4', name: 'Lampe tactique Streamlight', category: 'Equipement', state: 'AVAILABLE', serial_number: 'STR-2024-001', location_name: 'Stock Lyon', store_name: 'Lyon', current_location_id: 'loc-store-3' },
  { id: '5', name: 'Kit Invisio V60', category: 'Communication', state: 'IN_REPAIR', serial_number: 'INV-2024-001', location_name: 'SAV', store_name: 'Paris Centre', current_location_id: 'loc-sav' },
  { id: '6', name: 'Radio Motorola DP4800', category: 'Communication', state: 'ASSIGNED', serial_number: 'MOT-2024-002', location_name: 'Pierre Bernard', store_name: 'Paris Nord', current_location_id: 'loc-3' },
  { id: '7', name: 'Menottes', category: 'Equipement', state: 'AVAILABLE', serial_number: 'MEN-2024-001', location_name: 'Stock Marseille', store_name: 'Marseille', current_location_id: 'loc-store-4' },
  { id: '8', name: 'Taser X26P', category: 'Armement', state: 'LOST', serial_number: 'TAS-2024-001', location_name: 'Inconnu', store_name: 'Bordeaux', current_location_id: 'loc-unknown' },
];

const MOCK_CLAIMS = [
  { id: '1', asset_id: '2', employee_id: '1', store_id: '1', status: 'PENDING', created_at: new Date(), firstname: 'Jean', lastname: 'Dupont', matricule: '1234567', asset_name: 'Casque Peltor' },
  { id: '2', asset_id: '4', employee_id: '4', store_id: '3', status: 'PENDING', created_at: new Date(), firstname: 'Sophie', lastname: 'Petit', matricule: '4567890', asset_name: 'Lampe tactique Streamlight' },
];

const MOCK_WEAPONS = [
  { id: '1', name: 'Glock 17 Gen5', type: 'PISTOL', serial_number: 'GLK-2024-001', caliber: '9mm', description: 'Pistolet semi-automatique standard. Capacité 17+1 cartouches.', state: 'AVAILABLE', store_id: '1', assigned_to_employee_id: undefined, shot_count: 2500, last_maintenance: new Date('2024-11-01'), next_maintenance: new Date('2025-02-01'), created_at: new Date(), updated_at: new Date() },
  { id: '2', name: 'Glock 17 Gen5', type: 'PISTOL', serial_number: 'GLK-2024-002', caliber: '9mm', description: 'Pistolet semi-automatique standard. Capacité 17+1 cartouches.', state: 'CHECKED_OUT', store_id: '1', assigned_to_employee_id: '1', shot_count: 1800, last_maintenance: new Date('2024-10-15'), next_maintenance: new Date('2025-01-15'), created_at: new Date(), updated_at: new Date() },
  { id: '3', name: 'HK MP5', type: 'SMG', serial_number: 'MP5-2024-001', caliber: '9mm', description: 'Pistolet-mitrailleur compact. Mode semi-auto et rafale. Crosse rétractable.', state: 'AVAILABLE', store_id: '1', assigned_to_employee_id: undefined, shot_count: 5200, last_maintenance: new Date('2024-12-01'), next_maintenance: new Date('2025-03-01'), created_at: new Date(), updated_at: new Date() },
  { id: '4', name: 'HK416', type: 'RIFLE', serial_number: 'HK416-2024-001', caliber: '5.56x45mm', description: 'Fusil d\'assaut. Canon court 11". Rail Picatinny intégral. Optique Aimpoint T2.', state: 'AVAILABLE', store_id: '1', assigned_to_employee_id: undefined, shot_count: 3100, last_maintenance: new Date('2024-11-20'), next_maintenance: new Date('2025-02-20'), created_at: new Date(), updated_at: new Date() },
  { id: '5', name: 'HK416', type: 'RIFLE', serial_number: 'HK416-2024-002', caliber: '5.56x45mm', description: 'Fusil d\'assaut. Canon court 11". En maintenance pour remplacement canon.', state: 'MAINTENANCE', store_id: '2', assigned_to_employee_id: undefined, shot_count: 4800, last_maintenance: new Date('2024-09-01'), next_maintenance: new Date('2024-12-01'), created_at: new Date(), updated_at: new Date() },
  { id: '6', name: 'Remington 870', type: 'SHOTGUN', serial_number: 'REM-2024-001', caliber: '12 gauge', description: 'Fusil à pompe. Capacité 7+1. Crosse tactique et rail supérieur.', state: 'AVAILABLE', store_id: '3', assigned_to_employee_id: undefined, shot_count: 890, last_maintenance: new Date('2024-12-10'), next_maintenance: new Date('2025-03-10'), created_at: new Date(), updated_at: new Date() },
  { id: '7', name: 'PGM Hécate II', type: 'SNIPER', serial_number: 'PGM-2024-001', caliber: '.50 BMG', description: 'Fusil de précision anti-matériel. Portée effective 1800m. Lunette Schmidt & Bender.', state: 'AVAILABLE', store_id: '1', assigned_to_employee_id: undefined, shot_count: 120, last_maintenance: new Date('2024-12-15'), next_maintenance: new Date('2025-06-15'), created_at: new Date(), updated_at: new Date() },
  { id: '8', name: 'Glock 17 Gen5', type: 'PISTOL', serial_number: 'GLK-2024-003', caliber: '9mm', description: 'Pistolet semi-automatique standard. Capacité 17+1 cartouches.', state: 'CHECKED_OUT', store_id: '3', assigned_to_employee_id: '4', shot_count: 950, last_maintenance: new Date('2024-12-05'), next_maintenance: new Date('2025-03-05'), created_at: new Date(), updated_at: new Date() },
];

const MOCK_WEAPON_PHOTOS = [
  { id: '1', weapon_id: '1', storage_key: 'weapons/glock17-1.jpg', is_primary: true, created_at: new Date() },
  { id: '2', weapon_id: '3', storage_key: 'weapons/mp5-1.jpg', is_primary: true, created_at: new Date() },
  { id: '3', weapon_id: '4', storage_key: 'weapons/hk416-1.jpg', is_primary: true, created_at: new Date() },
  { id: '4', weapon_id: '7', storage_key: 'weapons/hecate-1.jpg', is_primary: true, created_at: new Date() },
];

const MOCK_WEAPON_CHECKOUTS = [
  { id: '1', weapon_id: '2', operator_id: '1', armorer_id: '2', mission_id: '1', status: 'CHECKED_OUT', checked_out_at: new Date(), ammo_out: 45, created_at: new Date() },
];

const MOCK_AMMUNITION = [
  { id: '1', caliber: '9mm', quantity: 5000, store_id: '1', last_updated: new Date() },
  { id: '2', caliber: '5.56x45mm', quantity: 2000, store_id: '1', last_updated: new Date() },
  { id: '3', caliber: '12 gauge', quantity: 500, store_id: '1', last_updated: new Date() },
  { id: '4', caliber: '.50 BMG', quantity: 100, store_id: '1', last_updated: new Date() },
  { id: '5', caliber: '9mm', quantity: 3000, store_id: '3', last_updated: new Date() },
];

const MOCK_VEHICLES = [
  { id: '1', name: 'Renault Master', type: 'VAN', registration: 'AA-123-BB', description: 'Fourgon d\'intervention. 9 places. Équipé sirène et gyrophares. Compartiment matériel arrière.', state: 'AVAILABLE', mileage: 45000, store_id: '1', assigned_to_employee_id: undefined, last_maintenance: new Date('2024-11-01'), next_maintenance: new Date('2025-02-01'), created_at: new Date(), updated_at: new Date() },
  { id: '2', name: 'Renault Master', type: 'VAN', registration: 'CC-456-DD', description: 'Fourgon d\'intervention. 9 places. Équipé sirène et gyrophares.', state: 'IN_USE', mileage: 62000, store_id: '1', assigned_to_employee_id: '1', last_maintenance: new Date('2024-10-15'), next_maintenance: new Date('2025-01-15'), created_at: new Date(), updated_at: new Date() },
  { id: '3', name: 'ARQUUS Sherpa', type: 'ARMORED', registration: 'EE-789-FF', description: 'Véhicule blindé léger. Protection niveau B6. Capacité 10 opérateurs. Tourelle observation.', state: 'AVAILABLE', mileage: 12000, store_id: '1', assigned_to_employee_id: undefined, last_maintenance: new Date('2024-12-01'), next_maintenance: new Date('2025-06-01'), created_at: new Date(), updated_at: new Date() },
  { id: '4', name: 'BMW R1250 RT', type: 'MOTORCYCLE', registration: 'GG-012-HH', description: 'Moto d\'escorte. Équipement police. Sirène et feux prioritaires.', state: 'AVAILABLE', mileage: 8500, store_id: '1', assigned_to_employee_id: undefined, last_maintenance: new Date('2024-11-20'), next_maintenance: new Date('2025-02-20'), created_at: new Date(), updated_at: new Date() },
  { id: '5', name: 'Peugeot 5008', type: 'CAR', registration: 'II-345-JJ', description: 'Véhicule banalisé. 7 places. En maintenance pour révision freins.', state: 'MAINTENANCE', mileage: 89000, store_id: '2', assigned_to_employee_id: undefined, last_maintenance: new Date('2024-09-01'), next_maintenance: new Date('2024-12-01'), created_at: new Date(), updated_at: new Date() },
  { id: '6', name: 'Renault Trafic', type: 'VAN', registration: 'KK-678-LL', description: 'Fourgon compact. 6 places. Vitres teintées. Équipement surveillance.', state: 'AVAILABLE', mileage: 34000, store_id: '3', assigned_to_employee_id: undefined, last_maintenance: new Date('2024-12-10'), next_maintenance: new Date('2025-03-10'), created_at: new Date(), updated_at: new Date() },
];

const MOCK_VEHICLE_PHOTOS = [
  { id: '1', vehicle_id: '1', storage_key: 'vehicles/master-1.jpg', is_primary: true, created_at: new Date() },
  { id: '2', vehicle_id: '3', storage_key: 'vehicles/sherpa-1.jpg', is_primary: true, created_at: new Date() },
  { id: '3', vehicle_id: '4', storage_key: 'vehicles/bmw-1.jpg', is_primary: true, created_at: new Date() },
];

const MOCK_VEHICLE_LOGS = [
  { id: '1', vehicle_id: '2', operator_id: '1', mission_id: '1', started_at: new Date(), mileage_start: 62000, created_at: new Date() },
];

const MOCK_MISSIONS = [
  { id: '1', name: 'Opération Alpha', type: 'INTERVENTION', status: 'IN_PROGRESS', description: 'Intervention sur site sensible', scheduled_at: new Date(), started_at: new Date(), store_id: '1', created_by_user_id: '1', created_at: new Date(), updated_at: new Date() },
  { id: '2', name: 'Surveillance VIP', type: 'ESCORT', status: 'PLANNED', description: 'Protection rapprochée personnalité', scheduled_at: new Date(Date.now() + 86400000), store_id: '1', created_by_user_id: '1', created_at: new Date(), updated_at: new Date() },
  { id: '3', name: 'Entraînement tir', type: 'TRAINING', status: 'PLANNED', description: 'Session de tir mensuelle', scheduled_at: new Date(Date.now() + 172800000), store_id: '1', created_by_user_id: '1', created_at: new Date(), updated_at: new Date() },
  { id: '4', name: 'Patrouille secteur', type: 'PATROL', status: 'COMPLETED', description: 'Patrouille de routine', scheduled_at: new Date(Date.now() - 86400000), started_at: new Date(Date.now() - 86400000), ended_at: new Date(Date.now() - 72000000), store_id: '3', created_by_user_id: '1', created_at: new Date(), updated_at: new Date() },
];

const MOCK_MISSION_ASSIGNMENTS = [
  { id: '1', mission_id: '1', employee_id: '1', role: 'Chef d\'équipe', created_at: new Date() },
  { id: '2', mission_id: '1', employee_id: '2', role: 'Opérateur', created_at: new Date() },
  { id: '3', mission_id: '1', employee_id: '6', role: 'Opérateur', created_at: new Date() },
  { id: '4', mission_id: '2', employee_id: '1', role: 'Chef d\'équipe', created_at: new Date() },
  { id: '5', mission_id: '2', employee_id: '3', role: 'Opérateur', created_at: new Date() },
];

const MOCK_ALERTS = [
  { id: '1', type: 'MAINTENANCE', severity: 'HIGH', message: 'HK416 #HK416-2024-002 - Maintenance en retard', resource_type: 'WEAPON', resource_id: '5', due_date: new Date('2024-12-01'), created_at: new Date() },
  { id: '2', type: 'MAINTENANCE', severity: 'MEDIUM', message: 'Peugeot 5008 #II-345-JJ - Révision prévue', resource_type: 'VEHICLE', resource_id: '5', due_date: new Date('2024-12-01'), created_at: new Date() },
  { id: '3', type: 'LOW_STOCK', severity: 'MEDIUM', message: 'Stock munitions .50 BMG bas (100 restantes)', resource_type: 'WEAPON', resource_id: '4', created_at: new Date() },
  { id: '4', type: 'MISSION_UPCOMING', severity: 'LOW', message: 'Mission "Surveillance VIP" dans 24h', resource_type: 'MISSION', resource_id: '2', due_date: new Date(Date.now() + 86400000), created_at: new Date() },
];

export const mockData = {
  stores: MOCK_STORES,
  employees: MOCK_EMPLOYEES,
  assets: MOCK_ASSETS,
  claims: MOCK_CLAIMS,
  weapons: MOCK_WEAPONS,
  weaponPhotos: MOCK_WEAPON_PHOTOS,
  weaponCheckouts: MOCK_WEAPON_CHECKOUTS,
  ammunition: MOCK_AMMUNITION,
  vehicles: MOCK_VEHICLES,
  vehiclePhotos: MOCK_VEHICLE_PHOTOS,
  vehicleLogs: MOCK_VEHICLE_LOGS,
  missions: MOCK_MISSIONS,
  missionAssignments: MOCK_MISSION_ASSIGNMENTS,
  alerts: MOCK_ALERTS,
};

export function getEmployees(filters?: { store_id?: string; search?: string }) {
  let result = [...MOCK_EMPLOYEES];
  if (filters?.store_id) {
    result = result.filter(e => e.store_id === filters.store_id);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(e =>
      e.firstname.toLowerCase().includes(s) ||
      e.lastname.toLowerCase().includes(s) ||
      e.matricule.includes(s)
    );
  }
  return result;
}

export function getEmployee(id: string) {
  return MOCK_EMPLOYEES.find(e => e.id === id) || null;
}

export function getAssets(filters?: { store_id?: string; category?: string; state?: string; search?: string }) {
  let result = [...MOCK_ASSETS];
  if (filters?.category) {
    result = result.filter(a => a.category === filters.category);
  }
  if (filters?.state) {
    result = result.filter(a => a.state === filters.state);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(a =>
      a.name.toLowerCase().includes(s) ||
      a.serial_number?.toLowerCase().includes(s)
    );
  }
  return result;
}

export function getAsset(id: string) {
  return MOCK_ASSETS.find(a => a.id === id) || null;
}

export function getEmployeeAssets(employeeId: string) {
  return MOCK_ASSETS.filter(a => a.current_location_id === `loc-${employeeId}`);
}

export function getClaims(filters?: { status?: string; store_id?: string }) {
  let result = [...MOCK_CLAIMS];
  if (filters?.status) {
    result = result.filter(c => c.status === filters.status);
  }
  if (filters?.store_id) {
    result = result.filter(c => c.store_id === filters.store_id);
  }
  return result;
}

export function getWeapons(filters?: { store_id?: string; type?: string; state?: string; search?: string }) {
  let result = [...MOCK_WEAPONS];
  if (filters?.store_id) {
    result = result.filter(w => w.store_id === filters.store_id);
  }
  if (filters?.type) {
    result = result.filter(w => w.type === filters.type);
  }
  if (filters?.state) {
    result = result.filter(w => w.state === filters.state);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(w =>
      w.name.toLowerCase().includes(s) ||
      w.serial_number.toLowerCase().includes(s)
    );
  }
  return result;
}

export function getWeapon(id: string) {
  const weapon = MOCK_WEAPONS.find(w => w.id === id);
  if (!weapon) return null;

  const photos = MOCK_WEAPON_PHOTOS.filter(p => p.weapon_id === id);
  const assigned_to = weapon.assigned_to_employee_id
    ? MOCK_EMPLOYEES.find(e => e.id === weapon.assigned_to_employee_id)
    : undefined;
  const store = MOCK_STORES.find(s => s.id === weapon.store_id);

  return { ...weapon, photos, assigned_to, store };
}

export function getWeaponPhotos(weapon_id: string) {
  return MOCK_WEAPON_PHOTOS.filter(p => p.weapon_id === weapon_id);
}

export function getWeaponCheckouts(filters?: { weapon_id?: string; operator_id?: string; status?: string }) {
  let result = [...MOCK_WEAPON_CHECKOUTS];
  if (filters?.weapon_id) {
    result = result.filter(c => c.weapon_id === filters.weapon_id);
  }
  if (filters?.operator_id) {
    result = result.filter(c => c.operator_id === filters.operator_id);
  }
  if (filters?.status) {
    result = result.filter(c => c.status === filters.status);
  }
  return result;
}

export function getAmmunition(store_id?: string) {
  if (store_id) {
    return MOCK_AMMUNITION.filter(a => a.store_id === store_id);
  }
  return [...MOCK_AMMUNITION];
}

export function getVehicles(filters?: { store_id?: string; type?: string; state?: string; search?: string }) {
  let result = [...MOCK_VEHICLES];
  if (filters?.store_id) {
    result = result.filter(v => v.store_id === filters.store_id);
  }
  if (filters?.type) {
    result = result.filter(v => v.type === filters.type);
  }
  if (filters?.state) {
    result = result.filter(v => v.state === filters.state);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(v =>
      v.name.toLowerCase().includes(s) ||
      v.registration.toLowerCase().includes(s)
    );
  }
  return result;
}

export function getVehicle(id: string) {
  const vehicle = MOCK_VEHICLES.find(v => v.id === id);
  if (!vehicle) return null;

  const photos = MOCK_VEHICLE_PHOTOS.filter(p => p.vehicle_id === id);
  const assigned_to = vehicle.assigned_to_employee_id
    ? MOCK_EMPLOYEES.find(e => e.id === vehicle.assigned_to_employee_id)
    : undefined;
  const store = MOCK_STORES.find(s => s.id === vehicle.store_id);

  return { ...vehicle, photos, assigned_to, store };
}

export function getVehiclePhotos(vehicle_id: string) {
  return MOCK_VEHICLE_PHOTOS.filter(p => p.vehicle_id === vehicle_id);
}

export function getVehicleLogs(vehicle_id: string) {
  return MOCK_VEHICLE_LOGS.filter(l => l.vehicle_id === vehicle_id);
}

export function getMissions(filters?: { store_id?: string; status?: string; type?: string }) {
  let result = [...MOCK_MISSIONS];
  if (filters?.store_id) {
    result = result.filter(m => m.store_id === filters.store_id);
  }
  if (filters?.status) {
    result = result.filter(m => m.status === filters.status);
  }
  if (filters?.type) {
    result = result.filter(m => m.type === filters.type);
  }
  return result.sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime());
}

export function getMission(id: string) {
  const mission = MOCK_MISSIONS.find(m => m.id === id);
  if (!mission) return null;

  const assignments = MOCK_MISSION_ASSIGNMENTS.filter(a => a.mission_id === id).map(a => ({
    ...a,
    employee: MOCK_EMPLOYEES.find(e => e.id === a.employee_id)
  }));

  return { ...mission, assignments };
}

export function getMissionAssignments(mission_id: string) {
  return MOCK_MISSION_ASSIGNMENTS.filter(a => a.mission_id === mission_id);
}

export function getAlerts(filters?: { type?: string; severity?: string; dismissed?: boolean }) {
  let result = [...MOCK_ALERTS];
  if (filters?.type) {
    result = result.filter(a => a.type === filters.type);
  }
  if (filters?.severity) {
    result = result.filter(a => a.severity === filters.severity);
  }
  if (filters?.dismissed === false) {
    result = result.filter(a => !a.dismissed_at);
  }
  return result.sort((a, b) => {
    const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    return severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder];
  });
}

export function getActiveAlertCount() {
  return MOCK_ALERTS.filter(a => !a.dismissed_at).length;
}

export function getStores() {
  return [...MOCK_STORES];
}

export function getStore(id: string) {
  return MOCK_STORES.find(s => s.id === id) || null;
}
