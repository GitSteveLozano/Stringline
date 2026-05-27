// Sitelayer demo data — exterior cladding contractor (EIFS, stucco, masonry, siding)
// v2 — adds catalog, dispatches, returns, billing, reservations, suggestions
window.SITELAYER_DATA = (function () {
  const scopeItems = [
    { code: 'EPS',    name: 'EPS Insulation',     unit: 'sqft', rate: 4.85,  color: '#E8A86B' },
    { code: 'BASE',   name: 'Basecoat',           unit: 'sqft', rate: 3.20,  color: '#C77B4F' },
    { code: 'FIN',    name: 'Finish Coat',        unit: 'sqft', rate: 4.10,  color: '#A05A33' },
    { code: 'STONE',  name: 'Cultured Stone',     unit: 'sqft', rate: 22.50, color: '#7A8C6F' },
    { code: 'AIRB',   name: 'Air Barrier',        unit: 'sqft', rate: 2.40,  color: '#5B8AA8' },
    { code: 'CMNB',   name: 'Cementboard',        unit: 'sqft', rate: 5.60,  color: '#8A6F9C' },
    { code: 'ENV',    name: 'Envelope Seal',      unit: 'lf',   rate: 6.80,  color: '#D4A24C' },
    { code: 'CAULK',  name: 'Caulking',           unit: 'lf',   rate: 3.40,  color: '#6FA8A0' },
    { code: 'FLASH',  name: 'Flashing',           unit: 'lf',   rate: 8.90,  color: '#9C7A5B' },
  ];

  const projects = [
    {
      id: 'p-hillcrest', name: 'Hillcrest Homes — Phase 4', client: 'Hillcrest Homes',
      address: '4820 Crestline Dr, Calgary AB', division: 'D4 Exterior Systems',
      status: 'active', bid: 184250, bid_psf: 38.50, sqft_total: 4785,
      laborRate: 38, targetSqftHr: 145, bonusPool: 4500,
      progress: 0.62, daysActive: 18, crewSize: 4,
      health: 'on-track',
      created: '2026-04-08',
      cover: 'a',
    },
    {
      id: 'p-riverbend', name: 'Riverbend Retail Shell', client: 'Northline Builders',
      address: '212 Riverbend Way, Calgary AB', division: 'D2 Commercial Shell',
      status: 'bid', bid: 93200, bid_psf: 32.10, sqft_total: 2903,
      laborRate: 40, targetSqftHr: 120, bonusPool: 2500,
      progress: 0, daysActive: 0, crewSize: 0,
      health: 'pending',
      created: '2026-04-18',
      cover: 'b',
    },
    {
      id: 'p-aspen', name: 'Aspen Ridge Townhomes', client: 'Cardinal Group',
      address: '88 Aspen Ridge Bv, Canmore AB', division: 'D4 Exterior Systems',
      status: 'active', bid: 312800, bid_psf: 41.20, sqft_total: 7592,
      laborRate: 38, targetSqftHr: 150, bonusPool: 7800,
      progress: 0.34, daysActive: 12, crewSize: 6,
      health: 'over-budget',
      created: '2026-04-04',
      cover: 'c',
    },
    {
      id: 'p-greenwillow', name: 'Greenwillow Senior Living', client: 'Sage Care Properties',
      address: '1100 Greenwillow Cr, Edmonton AB', division: 'D4 Exterior Systems',
      status: 'closeout', bid: 428900, bid_psf: 36.80, sqft_total: 11655,
      laborRate: 38, targetSqftHr: 140, bonusPool: 12000,
      progress: 0.96, daysActive: 84, crewSize: 8,
      health: 'on-track',
      created: '2026-01-12',
      cover: 'd',
    },
    {
      id: 'p-foothills', name: 'Foothills Medical Annex', client: 'AHS Capital',
      address: '1403 29 St NW, Calgary AB', division: 'D2 Commercial Shell',
      status: 'bid', bid: 156400, bid_psf: 44.10, sqft_total: 3547,
      laborRate: 40, targetSqftHr: 130, bonusPool: 3200,
      progress: 0, daysActive: 0, crewSize: 0,
      health: 'pending',
      created: '2026-04-22',
      cover: 'e',
    },
  ];

  const measurements = {
    'p-hillcrest': [
      { id: 'm1', code: 'EPS',   notes: 'East elevation',   qty: 1284.5, unit: 'sqft', points: [[12,18],[68,16],[72,52],[14,56]] },
      { id: 'm2', code: 'EPS',   notes: 'South elevation',  qty: 942.0,  unit: 'sqft', points: [[14,62],[60,62],[60,86],[14,86]] },
      { id: 'm3', code: 'STONE', notes: 'Front feature',    qty: 184.0,  unit: 'sqft', points: [[20,22],[44,22],[44,42],[20,42]] },
      { id: 'm4', code: 'CAULK', notes: 'Window perimeter', qty: 310.0,  unit: 'lf',   points: [[64,62],[88,62],[88,68],[64,68]] },
      { id: 'm5', code: 'FLASH', notes: 'Roofline',         qty: 142.0,  unit: 'lf',   points: [[12,12],[88,10],[88,16],[12,18]] },
    ],
    'p-aspen': [
      { id: 'm6', code: 'EPS',   notes: 'Block A',          qty: 2480.0, unit: 'sqft', points: [[10,15],[48,15],[48,55],[10,55]] },
      { id: 'm7', code: 'BASE',  notes: 'Block A',          qty: 2480.0, unit: 'sqft', points: [[10,15],[48,15],[48,55],[10,55]] },
    ],
  };

  const workers = [
    { id: 'w1', name: 'Ana Castillo',   role: 'Lead', initials: 'AC', clockedIn: true,  hoursWeek: 32.5, project: 'p-hillcrest', tone: 1 },
    { id: 'w2', name: 'Marcus Lee',     role: 'Crew', initials: 'ML', clockedIn: true,  hoursWeek: 30.0, project: 'p-hillcrest', tone: 2 },
    { id: 'w3', name: 'Diego Fontana',  role: 'Crew', initials: 'DF', clockedIn: true,  hoursWeek: 28.5, project: 'p-aspen',     tone: 3 },
    { id: 'w4', name: 'Priya Shah',     role: 'Foreman', initials: 'PS', clockedIn: true,  hoursWeek: 36.0, project: 'p-aspen',     tone: 4 },
    { id: 'w5', name: 'Tomás Reyes',    role: 'Crew', initials: 'TR', clockedIn: false, hoursWeek: 24.0, project: 'p-hillcrest', tone: 5 },
    { id: 'w6', name: 'Hank Mueller',   role: 'Crew', initials: 'HM', clockedIn: false, hoursWeek: 31.5, project: 'p-aspen',     tone: 6 },
    { id: 'w7', name: 'Sara Bouchard',  role: 'Crew', initials: 'SB', clockedIn: true,  hoursWeek: 22.0, project: 'p-aspen',     tone: 7 },
    { id: 'w8', name: 'Jamal Okafor',   role: 'Crew', initials: 'JO', clockedIn: false, hoursWeek: 30.5, project: 'p-greenwillow', tone: 8 },
  ];

  const scheduleWeek = (() => {
    // Mon–Sun grid for current week
    const days = ['Mon 04/27','Tue 04/28','Wed 04/29','Thu 04/30','Fri 05/01','Sat 05/02','Sun 05/03'];
    return {
      days,
      assignments: [
        { id: 's1', day: 0, project: 'p-hillcrest', crew: ['w1','w2','w5'], note: 'East elevation EPS', confirmed: true },
        { id: 's2', day: 0, project: 'p-aspen',     crew: ['w3','w4','w6','w7'], note: 'Block A basecoat', confirmed: true },
        { id: 's3', day: 1, project: 'p-hillcrest', crew: ['w1','w2'], note: 'South elevation EPS', confirmed: true },
        { id: 's4', day: 1, project: 'p-aspen',     crew: ['w3','w4','w6'], note: 'Block A basecoat cont.', confirmed: false },
        { id: 's5', day: 2, project: 'p-hillcrest', crew: ['w1','w2','w5'], note: 'Stone feature', confirmed: false },
        { id: 's6', day: 2, project: 'p-aspen',     crew: ['w4','w7'], note: 'Detail caulk', confirmed: false },
        { id: 's7', day: 3, project: 'p-hillcrest', crew: ['w1','w2'], note: 'Caulk + flashing', confirmed: false },
        { id: 's8', day: 4, project: 'p-aspen',     crew: ['w3','w4','w6','w7'], note: 'Finish coat A', confirmed: false },
      ],
    };
  })();

  // Catalog — item master data (the SKU level)
  // drift: physical count − system count. Negative = system says we have more than reality.
  // idleDays: average days the average unit sat without earning across last 90 days.
  const catalog = [
    { sku: 'SCAF-6FT',   name: 'Aluminum scaffold — 6ft tower', category: 'Scaffold', daily: 24, owned: 24, replacement: 1850, drift: 0,  idleDays: 38, lastCount: '04/12' },
    { sku: 'SCAF-8FT',   name: 'Aluminum scaffold — 8ft tower', category: 'Scaffold', daily: 28, owned: 30, replacement: 2240, drift: -2, idleDays: 14, lastCount: '03/28' },
    { sku: 'SCAF-PLNK',  name: 'Scaffold plank — 10ft',         category: 'Scaffold', daily: 4,  owned: 80, replacement: 95,   drift: -3, idleDays: 22, lastCount: '03/28' },
    { sku: 'MIX-9CF',    name: 'Mixer — 9 cu ft',               category: 'Power',    daily: 38, owned: 5,  replacement: 4200, drift: 0,  idleDays: 41, lastCount: '04/12' },
    { sku: 'GUN-HOPP',   name: 'Stucco hopper gun',             category: 'Power',    daily: 18, owned: 7,  replacement: 480,  drift: 0,  idleDays: 32, lastCount: '04/20' },
    { sku: 'GEN-3KW',    name: 'Generator — 3kW',               category: 'Power',    daily: 32, owned: 4,  replacement: 1100, drift: 0,  idleDays: 48, lastCount: '04/12' },
    { sku: 'COMP-30G',   name: 'Air compressor — 30gal',        category: 'Power',    daily: 22, owned: 3,  replacement: 950,  drift: -1, idleDays: 56, lastCount: '03/15' },
    { sku: 'LIFT-19',    name: 'Scissor lift — 19ft',           category: 'Lift',     daily: 145, owned: 2, replacement: 18500,drift: 0,  idleDays: 12, lastCount: '04/22' },
  ];

  // Active dispatches — multi-line tickets, each line is one SKU at a qty
  // ticketId groups lines on one ticket (one truck, one signature)
  const dispatches = [
    { id: 'd1', ticketId: 'T-1042', sku: 'SCAF-6FT', qty: 8,  project: 'p-hillcrest', sentOn: '04/12', dueBack: '05/02', status: 'out', signedBy: 'A. Castillo' },
    { id: 'd2', ticketId: 'T-1042', sku: 'SCAF-PLNK', qty: 24, project: 'p-hillcrest', sentOn: '04/12', dueBack: '05/02', status: 'out', signedBy: 'A. Castillo' },
    { id: 'd3', ticketId: 'T-1042', sku: 'MIX-9CF',  qty: 1,  project: 'p-hillcrest', sentOn: '04/12', dueBack: '05/02', status: 'overdue', signedBy: 'A. Castillo' },
    { id: 'd4', ticketId: 'T-1043', sku: 'SCAF-8FT', qty: 12, project: 'p-aspen',     sentOn: '04/16', dueBack: '05/16', status: 'out', signedBy: 'P. Shah' },
    { id: 'd5', ticketId: 'T-1043', sku: 'SCAF-PLNK', qty: 36, project: 'p-aspen',     sentOn: '04/16', dueBack: '05/16', status: 'out', signedBy: 'P. Shah' },
    { id: 'd6', ticketId: 'T-1043', sku: 'GUN-HOPP', qty: 2,  project: 'p-aspen',     sentOn: '04/16', dueBack: '05/16', status: 'out', signedBy: 'P. Shah' },
    { id: 'd7', ticketId: 'T-1044', sku: 'GEN-3KW',  qty: 1,  project: 'p-aspen',     sentOn: '04/18', dueBack: '04/28', status: 'overdue', signedBy: 'P. Shah' },
    { id: 'd8', ticketId: 'T-1041', sku: 'COMP-30G', qty: 1,  project: 'p-greenwillow', sentOn: '03/22', dueBack: '04/30', status: 'out', signedBy: 'J. Okafor' },
    { id: 'd9', ticketId: 'T-1040', sku: 'LIFT-19',  qty: 1,  project: 'p-greenwillow', sentOn: '03/15', dueBack: '04/24', status: 'overdue', signedBy: 'J. Okafor' },
  ];

  // Returns log
  const returns = [
    { id: 'rt1', ticketId: 'T-1037', sku: 'SCAF-6FT', qty: 6, returnedOn: '04/22', condition: { good: 6, damaged: 0, lost: 0 }, charges: 0,   project: 'p-greenwillow' },
    { id: 'rt2', ticketId: 'T-1038', sku: 'GUN-HOPP', qty: 2, returnedOn: '04/20', condition: { good: 1, damaged: 1, lost: 0 }, charges: 240, project: 'p-greenwillow', workOrder: 'WO-211' },
    { id: 'rt3', ticketId: 'T-1039', sku: 'SCAF-PLNK',qty: 12,returnedOn: '04/19', condition: { good: 11,damaged: 0, lost: 1 }, charges: 95,  project: 'p-greenwillow' },
  ];

  // Repair work orders — each damaged return spawns one
  const workOrders = [
    { id: 'WO-211', sku: 'GUN-HOPP', qty: 1, opened: '04/20', returnId: 'rt2', issue: 'Trigger sticking, hopper bent', estCost: 145, status: 'open',     assignee: 'Shop · D. Reyes' },
    { id: 'WO-209', sku: 'MIX-9CF',  qty: 1, opened: '04/14', returnId: null,  issue: 'Scheduled 250-hr service',    estCost: 220, status: 'in_repair', assignee: 'Shop · D. Reyes' },
    { id: 'WO-207', sku: 'COMP-30G', qty: 1, opened: '04/02', returnId: null,  issue: 'Pressure switch replaced',    estCost: 95,  status: 'closed',    assignee: 'Shop · D. Reyes', closed: '04/09' },
  ];

  // Billing cycles — what's queued for QBO
  const billingCycles = [
    { id: 'bc1', project: 'p-aspen',     period: 'Apr 1 – Apr 25', lines: 4, amount: 11820, status: 'ready',     dueOn: '04/26' },
    { id: 'bc2', project: 'p-hillcrest', period: 'Apr 1 – Apr 25', lines: 3, amount: 7344,  status: 'ready',     dueOn: '04/26' },
    { id: 'bc3', project: 'p-greenwillow', period: 'Apr 1 – Apr 25', lines: 2, amount: 4495, status: 'review',  dueOn: '04/26' },
    { id: 'bc4', project: 'p-aspen',     period: 'Mar 1 – Mar 25', lines: 4, amount: 9640,  status: 'pushed',    dueOn: '03/26' },
  ];

  // Per-cycle line items (drilldown)
  const billingLines = {
    bc1: [
      { sku: 'SCAF-8FT', qty: 12, days: 25, daily: 28,  amount: 8400 },
      { sku: 'SCAF-PLNK', qty: 36, days: 25, daily: 4,  amount: 3600 },
      { sku: 'GUN-HOPP', qty: 2,  days: 25, daily: 18,  amount: 900 },
      { sku: 'GEN-3KW',  qty: 1,  days: 18, daily: 32,  amount: -1080, kind: 'credit' },
    ],
    bc2: [
      { sku: 'SCAF-6FT', qty: 8,  days: 25, daily: 24, amount: 4800 },
      { sku: 'SCAF-PLNK', qty: 24, days: 25, daily: 4, amount: 2400 },
      { sku: 'MIX-9CF',  qty: 1,  days: 6,  daily: 38, amount: 144 },
    ],
    bc3: [
      { sku: 'COMP-30G', qty: 1,  days: 25, daily: 22, amount: 550 },
      { sku: 'LIFT-19',  qty: 1,  days: 25, daily: 145, amount: 3625 },
    ],
  };

  // Reservations — future commitments per SKU per week (for forecasting curve)
  // Each entry is { sku, weekIdx (0=this week), qty, project }
  const reservations = [
    { sku: 'SCAF-8FT', week: 0, qty: 12, project: 'p-aspen' },
    { sku: 'SCAF-8FT', week: 1, qty: 12, project: 'p-aspen' },
    { sku: 'SCAF-8FT', week: 2, qty: 12, project: 'p-aspen' },
    { sku: 'SCAF-8FT', week: 3, qty: 8,  project: 'p-foothills' },
    { sku: 'SCAF-8FT', week: 4, qty: 14, project: 'p-foothills' },
    { sku: 'SCAF-8FT', week: 5, qty: 6,  project: 'p-foothills' },
    { sku: 'SCAF-6FT', week: 0, qty: 8,  project: 'p-hillcrest' },
    { sku: 'SCAF-6FT', week: 1, qty: 8,  project: 'p-hillcrest' },
    { sku: 'SCAF-6FT', week: 2, qty: 14, project: 'p-riverbend' },
    { sku: 'SCAF-6FT', week: 3, qty: 14, project: 'p-riverbend' },
  ];

  // Takeoff → rental suggestions (rule: every 1000 sqft of EPS/BASE → 8 scaffold + 24 planks etc.)
  // Materialized for the demo per project
  const rentalSuggestions = {
    'p-hillcrest': [
      { sku: 'SCAF-6FT', qty: 10, reason: '2,226 sqft EPS · 12 lin sections', already: 8 },
      { sku: 'SCAF-PLNK', qty: 30, reason: 'paired with 6ft towers', already: 24 },
      { sku: 'GUN-HOPP',  qty: 1,  reason: '184 sqft basecoat / finish', already: 0 },
    ],
    'p-aspen': [
      { sku: 'SCAF-8FT', qty: 16, reason: '2,480 sqft Block A · 22 lin', already: 12 },
      { sku: 'GEN-3KW',  qty: 2,  reason: 'no grid power on Block A', already: 1 },
    ],
  };

  // Legacy alias kept so old views don't break
  const rentals = dispatches.filter(d => d.status !== 'returned').map(d => ({
    id: d.id, name: catalog.find(c => c.sku === d.sku)?.name || d.sku,
    qty: d.qty, project: d.project,
    daily: catalog.find(c => c.sku === d.sku)?.daily || 0,
    since: d.sentOn,
    stock: catalog.find(c => c.sku === d.sku)?.owned || 0,
  }));

  const syncQueue = [
    { id: 'q1', kind: 'estimate.push',     entity: 'Hillcrest Homes — Phase 4', status: 'pending',  ts: '12 min ago' },
    { id: 'q2', kind: 'bill.pull',         entity: 'Atlas Supply — INV-44102',   status: 'success',  ts: '1 h ago' },
    { id: 'q3', kind: 'time.pull',         entity: 'Week of Apr 21',             status: 'success',  ts: '2 h ago' },
    { id: 'q4', kind: 'rental.invoice',    entity: 'Aspen Ridge — Apr cycle',    status: 'pending',  ts: '3 h ago' },
    { id: 'q5', kind: 'estimate.push',     entity: 'Foothills Medical Annex',    status: 'queued',   ts: 'just now' },
  ];

  // ============================================================
  // SCHEDULE & TIME (iteration 2)
  // ============================================================

  // 4-week look-ahead. Each week is 0..3 (this week, next, +2, +3).
  // Day index 0..6 within week (Mon..Sun).
  const schedule4Week = (() => {
    const weeks = [
      { idx: 0, label: 'This week',     start: 'Apr 27', end: 'May 3',  weekOf: 'Week of Apr 27' },
      { idx: 1, label: 'Next week',     start: 'May 4',  end: 'May 10', weekOf: 'Week of May 4'  },
      { idx: 2, label: '+2 weeks',      start: 'May 11', end: 'May 17', weekOf: 'Week of May 11' },
      { idx: 3, label: '+3 weeks',      start: 'May 18', end: 'May 24', weekOf: 'Week of May 18' },
    ];
    // assignments — week-scoped, with derived productivity link
    // suggestedHours = pulled from takeoff sqft × productivity rate
    const assignments = [
      // Week 0
      { id: 'a1',  week: 0, day: 0, project: 'p-hillcrest', crew: ['w1','w2','w5'],         note: 'East elevation EPS',     scope: 'EPS',  sqft: 980,  suggestedHr: 6.8, plannedHr: 7.5, confirmed: true,  status: 'confirmed' },
      { id: 'a2',  week: 0, day: 0, project: 'p-aspen',     crew: ['w3','w4','w6','w7'],    note: 'Block A basecoat',       scope: 'BASE', sqft: 1480, suggestedHr: 8.6, plannedHr: 8.0, confirmed: true,  status: 'confirmed' },
      { id: 'a3',  week: 0, day: 1, project: 'p-hillcrest', crew: ['w1','w2'],              note: 'South elevation EPS',    scope: 'EPS',  sqft: 720,  suggestedHr: 5.0, plannedHr: 5.0, confirmed: true,  status: 'confirmed' },
      { id: 'a4',  week: 0, day: 1, project: 'p-aspen',     crew: ['w3','w4','w6'],         note: 'Block A basecoat cont.', scope: 'BASE', sqft: 1100, suggestedHr: 6.4, plannedHr: 7.0, confirmed: false, status: 'sent' },
      { id: 'a5',  week: 0, day: 2, project: 'p-hillcrest', crew: ['w1','w2','w5'],         note: 'Stone feature wall',     scope: 'STONE',sqft: 320,  suggestedHr: 8.4, plannedHr: 8.0, confirmed: false, status: 'sent' },
      { id: 'a6',  week: 0, day: 2, project: 'p-aspen',     crew: ['w4','w7'],              note: 'Detail caulk',           scope: 'CAULK',sqft: 0,    suggestedHr: 4.0, plannedHr: 4.0, confirmed: false, status: 'sent' },
      { id: 'a7',  week: 0, day: 3, project: 'p-hillcrest', crew: ['w1','w2'],              note: 'Caulk + flashing',       scope: 'CAULK',sqft: 0,    suggestedHr: 6.0, plannedHr: 6.0, confirmed: false, status: 'pending' },
      { id: 'a8',  week: 0, day: 4, project: 'p-aspen',     crew: ['w3','w4','w6','w7'],    note: 'Finish coat A',          scope: 'FIN',  sqft: 1480, suggestedHr: 8.2, plannedHr: 8.0, confirmed: false, status: 'declined', declineNote: 'Need more EPS time first — Marcus' },
      // Week 1
      { id: 'a9',  week: 1, day: 0, project: 'p-hillcrest', crew: ['w1','w2','w5'],         note: 'West elevation EPS',     scope: 'EPS',  sqft: 1200, suggestedHr: 8.3, plannedHr: 8.0, confirmed: false, status: 'pending' },
      { id: 'a10', week: 1, day: 0, project: 'p-aspen',     crew: ['w3','w4','w6'],         note: 'Block B basecoat',       scope: 'BASE', sqft: 1620, suggestedHr: 9.4, plannedHr: 9.0, confirmed: false, status: 'pending' },
      { id: 'a11', week: 1, day: 2, project: 'p-hillcrest', crew: ['w1','w2'],              note: 'Stone wainscot',         scope: 'STONE',sqft: 520,  suggestedHr: 13.7,plannedHr: 14.0,confirmed: false, status: 'pending' },
      { id: 'a12', week: 1, day: 3, project: 'p-aspen',     crew: ['w4','w7'],              note: 'Detail flashing',        scope: 'CAULK',sqft: 0,    suggestedHr: 8.0, plannedHr: 8.0, confirmed: false, status: 'pending' },
      { id: 'a13', week: 1, day: 4, project: 'p-foothills', crew: ['w8','w6'],              note: 'Foothills mobilization', scope: 'MOB',  sqft: 0,    suggestedHr: 6.0, plannedHr: 6.0, confirmed: false, status: 'pending' },
      // Week 2
      { id: 'a14', week: 2, day: 0, project: 'p-hillcrest', crew: ['w1','w2','w5'],         note: 'Final coat all elev.',   scope: 'FIN',  sqft: 2400, suggestedHr: 13.3,plannedHr: 14.0,confirmed: false, status: 'pending' },
      { id: 'a15', week: 2, day: 0, project: 'p-aspen',     crew: ['w3','w4','w6','w7'],    note: 'Block B finish',         scope: 'FIN',  sqft: 1620, suggestedHr: 9.0, plannedHr: 9.0, confirmed: false, status: 'pending' },
      { id: 'a16', week: 2, day: 2, project: 'p-foothills', crew: ['w8','w6'],              note: 'EPS — north + east',     scope: 'EPS',  sqft: 1840, suggestedHr: 12.8,plannedHr: 12.0,confirmed: false, status: 'pending' },
      { id: 'a17', week: 2, day: 4, project: 'p-aspen',     crew: ['w4','w7'],              note: 'Punch list — Block A',   scope: 'PUNCH',sqft: 0,    suggestedHr: 6.0, plannedHr: 6.0, confirmed: false, status: 'pending' },
      // Week 3
      { id: 'a18', week: 3, day: 0, project: 'p-hillcrest', crew: ['w1','w2'],              note: 'Punch list + walkthrough',scope:'PUNCH',sqft: 0,    suggestedHr: 8.0, plannedHr: 8.0, confirmed: false, status: 'pending' },
      { id: 'a19', week: 3, day: 0, project: 'p-foothills', crew: ['w8','w6','w3'],         note: 'Foothills basecoat',     scope: 'BASE', sqft: 1840, suggestedHr: 10.7,plannedHr: 11.0,confirmed: false, status: 'pending' },
      { id: 'a20', week: 3, day: 3, project: 'p-foothills', crew: ['w8','w6'],              note: 'Stone accent — entry',   scope: 'STONE',sqft: 240,  suggestedHr: 6.3, plannedHr: 7.0, confirmed: false, status: 'pending' },
    ];
    return { weeks, assignments };
  })();

  // Worker burden rates (insurance %, benefits %, OT premium %, base hourly)
  // True labor cost = base × (1 + ins% + ben%) for regular, OT adds premium on top.
  const workerRates = {
    w1: { base: 38, ins: 0.18, ben: 0.12, ot: 0.50 },
    w2: { base: 32, ins: 0.18, ben: 0.10, ot: 0.50 },
    w3: { base: 30, ins: 0.18, ben: 0.10, ot: 0.50 },
    w4: { base: 42, ins: 0.18, ben: 0.14, ot: 0.50 },
    w5: { base: 28, ins: 0.18, ben: 0.08, ot: 0.50 },
    w6: { base: 30, ins: 0.18, ben: 0.10, ot: 0.50 },
    w7: { base: 32, ins: 0.18, ben: 0.10, ot: 0.50 },
    w8: { base: 30, ins: 0.18, ben: 0.10, ot: 0.50 },
  };

  // Time entries — pending approval (the queue).
  // anomaly: array of flags from { 'over_hours','outside_geofence','overtime','manual_override','no_clockout','duplicate' }
  // source: 'auto' | 'foreman' | 'manual' | 'reminder'
  const timeEntries = [
    { id: 't1',  worker: 'w1', date: 'Apr 28', project: 'p-hillcrest', clockIn: '06:58', clockOut: '15:46', hours: 8.8, source: 'auto',     anomalies: ['overtime'],            geo: 'on-site',  scope: 'EPS — East',         note: '' },
    { id: 't2',  worker: 'w2', date: 'Apr 28', project: 'p-hillcrest', clockIn: '07:02', clockOut: '15:51', hours: 8.8, source: 'auto',     anomalies: ['overtime'],            geo: 'on-site',  scope: 'EPS — East',         note: '' },
    { id: 't3',  worker: 'w5', date: 'Apr 28', project: 'p-hillcrest', clockIn: '06:44', clockOut: '14:02', hours: 7.3, source: 'auto',     anomalies: [],                      geo: 'on-site',  scope: 'EPS — East',         note: '' },
    { id: 't4',  worker: 'w3', date: 'Apr 28', project: 'p-aspen',     clockIn: '06:50', clockOut: '15:30', hours: 8.7, source: 'auto',     anomalies: ['overtime'],            geo: 'on-site',  scope: 'BASE — Block A',     note: '' },
    { id: 't5',  worker: 'w4', date: 'Apr 28', project: 'p-aspen',     clockIn: '06:48', clockOut: '15:32', hours: 8.7, source: 'auto',     anomalies: ['overtime'],            geo: 'on-site',  scope: 'BASE — Block A',     note: '' },
    { id: 't6',  worker: 'w6', date: 'Apr 28', project: 'p-aspen',     clockIn: '06:55', clockOut: '15:34', hours: 8.6, source: 'auto',     anomalies: ['overtime'],            geo: 'on-site',  scope: 'BASE — Block A',     note: '' },
    { id: 't7',  worker: 'w7', date: 'Apr 28', project: 'p-aspen',     clockIn: '07:30', clockOut: '13:00', hours: 5.5, source: 'foreman',  anomalies: ['under_scheduled'],     geo: 'on-site',  scope: 'BASE — Block A',     note: 'Left early — dentist' },
    { id: 't8',  worker: 'w1', date: 'Apr 27', project: 'p-hillcrest', clockIn: '07:00', clockOut: '15:30', hours: 8.5, source: 'auto',     anomalies: [],                      geo: 'on-site',  scope: 'EPS — East',         note: '' },
    { id: 't9',  worker: 'w8', date: 'Apr 28', project: 'p-greenwillow',clockIn: '06:45',clockOut: '—',     hours: 0,   source: 'auto',     anomalies: ['no_clockout','outside_geofence'], geo: '0.4 mi off-site', scope: 'Punch — wrap-up', note: 'GPS lost 11:14 AM — no clock-out event' },
    { id: 't10', worker: 'w5', date: 'Apr 27', project: 'p-hillcrest', clockIn: '07:15', clockOut: '15:00', hours: 7.8, source: 'manual',   anomalies: ['manual_override'],     geo: '—',        scope: 'EPS — East',         note: 'Phone died at lunch — Priya entered' },
    { id: 't11', worker: 'w7', date: 'Apr 27', project: 'p-aspen',     clockIn: '07:00', clockOut: '15:30', hours: 8.5, source: 'auto',     anomalies: [],                      geo: 'on-site',  scope: 'BASE — Block A',     note: '' },
    { id: 't12', worker: 'w2', date: 'Apr 27', project: 'p-hillcrest', clockIn: '06:55', clockOut: '15:25', hours: 8.5, source: 'auto',     anomalies: [],                      geo: 'on-site',  scope: 'EPS — East',         note: '' },
  ];

  // Daily logs — auto-populated context, foreman fills in narrative
  const dailyLogs = [
    {
      id: 'dl1', date: 'Apr 28', project: 'p-hillcrest', foreman: 'w1',
      submitted: false,
      weather: { high: 64, low: 51, condition: 'Partly cloudy', wind: '8 mph SW', precip: 0 },
      crewOnsite: ['w1','w2','w5'], crewHours: 24.9,
      photos: 6, scheduleHits: ['East elevation EPS — confirmed'],
      progress: { scope: 'EPS', sqftDone: 980, sqftPlanned: 1284, pct: 76 },
      blockers: 'Vapor barrier delivery delayed 2hr. Caught up before lunch.',
      narrative: 'EPS 76% complete on east elevation. Marcus and Tomás taped seams ahead of schedule. Found a soft spot near the vapor barrier — flagged for inspection.',
    },
    {
      id: 'dl2', date: 'Apr 27', project: 'p-hillcrest', foreman: 'w1',
      submitted: true, submittedAt: '4:52 PM',
      weather: { high: 61, low: 48, condition: 'Clear', wind: '6 mph W', precip: 0 },
      crewOnsite: ['w1','w2','w5'], crewHours: 24.8,
      photos: 8, scheduleHits: ['East elevation EPS — confirmed'],
      progress: { scope: 'EPS', sqftDone: 720, sqftPlanned: 720, pct: 100 },
      blockers: '',
      narrative: 'South elevation EPS complete. Stone delivery confirmed for tomorrow 7:30am. Crew in good shape.',
    },
  ];

  // Mobile notifications — assignment alerts, confirmations
  const notifications = [
    { id: 'n1', kind: 'assignment_new',   worker: 'w2', project: 'p-hillcrest', when: '5:42 PM',       title: 'New assignment · Apr 29',            body: 'Caulk + flashing · Hillcrest 7:00 AM', requiresConfirm: true },
    { id: 'n2', kind: 'assignment_moved', worker: 'w3', project: 'p-aspen',     when: 'yesterday',     title: 'Assignment moved · Apr 28',          body: 'Block A basecoat moved from Tue to Mon', requiresConfirm: true },
    { id: 'n3', kind: 'clock_warning',    worker: 'w8', project: 'p-greenwillow',when: '12 min ago',   title: 'Clock-in unverified',                body: 'GPS unavailable — confirm location?',    requiresConfirm: false },
    { id: 'n4', kind: 'approval_needed',  worker: 'w4', project: 'p-aspen',     when: '2 h ago',       title: '6 entries pending review',           body: '7 entries flagged — bulk approve?',    requiresConfirm: false },
  ];

  return { scopeItems, projects, measurements, workers, scheduleWeek, schedule4Week, workerRates,
    timeEntries, dailyLogs, notifications, rentals, syncQueue,
    catalog, dispatches, returns, workOrders, billingCycles, billingLines, reservations, rentalSuggestions };
})();
