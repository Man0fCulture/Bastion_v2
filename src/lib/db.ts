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

export const mockData = {
  stores: MOCK_STORES,
  employees: MOCK_EMPLOYEES,
  assets: MOCK_ASSETS,
  claims: MOCK_CLAIMS,
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
