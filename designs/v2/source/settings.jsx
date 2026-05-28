/* global React */

// ============================================================
// SETTINGS · V2 (Section 19)
// Workspace · Account · Roles · Help.
// Settings home is a list of 10 destinations. Each has its own
// detail screen — pricing book, burden, hours, roles+permissions
// matrix, integrations, notifications, profile, help, etc.
// ============================================================

function V2Sb({ time = '9:14' }) {
  return (
    <div style={{height:32, padding:'10px 18px 0', display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'JetBrains Mono, monospace', fontSize:12, fontWeight:500, flexShrink:0, color:'var(--v2-ink)'}}>
      <span>{time}</span>
      <span style={{display:'flex', gap:6, alignItems:'center'}}>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor"><rect x="0" y="6" width="3" height="4"/><rect x="5" y="4" width="3" height="6"/><rect x="10" y="2" width="3" height="8"/><rect x="15" y="0" width="3" height="10"/></svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="20" height="8"/><rect x="23" y="4" width="2" height="4" fill="currentColor"/><rect x="3" y="4" width="14" height="4" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

// =====================================================================
// 1 · SETTINGS HOME — the menu
// =====================================================================
function V2SettingsHome() {
  const groups = [
    { l:'WORKSPACE', items:[
      { l:'COMPANY',              sub:'DAVIS STUCCO LLC · STUCCO' },
      { l:'PRICING BOOK',         sub:'142 ITEMS · UPDATED 2D' },
      { l:'LOADED LABOR · BURDEN', sub:'$54.20 / HR' },
      { l:'WORKING HOURS',        sub:'M–S 7–4 · 8 HOLIDAYS' },
      { l:'INTEGRATIONS',         sub:'QBO · GUSTO · STRIPE' },
    ]},
    { l:'TEAM', items:[
      { l:'ROLES + PERMISSIONS',  sub:'3 ROLES · 1 CUSTOM' },
      { l:'INVITE TEAMMATES',     sub:'2 PENDING' },
    ]},
    { l:'ACCOUNT', items:[
      { l:'PROFILE',              sub:'MIKE DAVIS · OWNER' },
      { l:'NOTIFICATIONS',        sub:'PUSH · SMS · EMAIL' },
      { l:'HELP + SUPPORT',       sub:'CHAT · BOOK A CALL' },
    ]},
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">SETTINGS</div>
      </div>

      {/* Profile card */}
      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)', display:'flex', gap:14, alignItems:'center'}}>
        <div style={{width:52, height:52, background:'var(--v2-ink)', color:'var(--v2-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18}}>MD</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:18}}>MIKE DAVIS</div>
          <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>OWNER · DAVIS STUCCO LLC</div>
        </div>
        <span style={{padding:'4px 8px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>SOLO · ALL HATS</span>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {groups.map((g, gi) => (
          <React.Fragment key={gi}>
            <div className="v2-section-bar"><div className="v2-eyebrow">{g.l}</div></div>
            {g.items.map((r, i) => (
              <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'18px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{r.l}</div>
                  <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.sub}</div>
                </div>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18, color:'var(--v2-ink-3)'}}>→</div>
              </button>
            ))}
          </React.Fragment>
        ))}
        <div style={{padding:'24px 20px', textAlign:'center'}}>
          <button style={{background:'transparent', border:'none', color:'var(--v2-bad)', fontFamily:'var(--v2-font)', fontWeight:700, fontSize:14}}>SIGN OUT</button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// 2 · PRICING BOOK
// =====================================================================
function V2SettingsPricing() {
  const items = [
    { code:'09 24 00', l:'EPS BOARD · 2"',          unit:'SF', cost:'$3.45' },
    { code:'09 24 00', l:'EPS BOARD · 1.5"',        unit:'SF', cost:'$2.90' },
    { code:'09 24 00', l:'BASECOAT · POLYMER',      unit:'SF', cost:'$2.10' },
    { code:'09 24 00', l:'FINISH COAT · ACRYLIC',   unit:'SF', cost:'$1.80' },
    { code:'04 73 00', l:'STONE VENEER',            unit:'SF', cost:'$8.40' },
    { code:'07 90 00', l:'SEALANT JOINT',           unit:'LF', cost:'$1.20' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SETTINGS</div>
          <div className="v2-appbar-title">PRICING BOOK</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">TOTAL ITEMS</div>
        <div className="v2-bignum" style={{fontSize:64, marginTop:10}}>142</div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600}}>SYNCED FROM QBO · LAST 2D AGO</div>
      </div>

      <div style={{padding:'14px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:10}}>
          <span className="v2-mono" style={{fontWeight:700}}>↳</span>
          <span style={{flex:1, color:'var(--v2-ink-4)', fontSize:15}}>Search items, codes…</span>
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {items.map((it, i) => (
          <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:12, padding:'14px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div className="v2-mono" style={{fontSize:9, color:'var(--v2-ink-3)', fontWeight:700, width:54, flexShrink:0}}>{it.code}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{it.l}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{it.unit}</div>
            </div>
            <div className="v2-mono" style={{fontSize:14, fontWeight:700}}>{it.cost}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 3 · LOADED LABOR · BURDEN editor
// =====================================================================
function V2SettingsBurden() {
  const lines = [
    { l:'BASE WAGE',           v:'$32.00', sub:'CREW AVERAGE' },
    { l:'PAYROLL TAX',         v:'$3.20',  sub:'10% OF BASE' },
    { l:'WORKERS COMP',        v:'$5.60',  sub:'17.5% INSURANCE' },
    { l:'HEALTH + BENEFITS',   v:'$6.40',  sub:'$1,100/MO ÷ 172 H' },
    { l:'PTO + HOLIDAYS',      v:'$2.80',  sub:'15 DAYS / YEAR' },
    { l:'OVERHEAD ALLOC',      v:'$4.20',  sub:'OFFICE · TRUCKS' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SETTINGS</div>
          <div className="v2-appbar-title">LOADED LABOR</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">YOUR REAL HOURLY COST</div>
        <div className="v2-bignum" style={{fontSize:84, marginTop:10}}>$54<span className="unit">.20/H</span></div>
        <div className="v2-mono" style={{marginTop:10, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5}}>BASE + ALL BURDENS · USED IN BIDS + MARGIN CALC.</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">BREAKDOWN</div><div className="v2-mono" style={{fontWeight:700}}>EDITABLE</div></div>
      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {lines.map((r, i) => (
          <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'16px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{r.l}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.sub}</div>
            </div>
            <div className="v2-mono" style={{fontSize:15, fontWeight:800, fontVariantNumeric:'tabular-nums'}}>{r.v}</div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:16, color:'var(--v2-ink-3)'}}>→</div>
          </button>
        ))}
      </div>

      <div style={{padding:'12px 20px', background:'var(--v2-accent)', borderTop:'2px solid var(--v2-ink)', borderBottom:'2px solid var(--v2-ink)', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:700, color:'var(--v2-accent-ink)', letterSpacing:'0.06em'}}>SUBTOTAL</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:24, fontVariantNumeric:'tabular-nums', color:'var(--v2-accent-ink)'}}>$54.20</div>
      </div>
      <div style={{padding:'14px 20px 18px'}}>
        <button className="v2-btn primary">SAVE CHANGES</button>
      </div>
    </div>
  );
}

// =====================================================================
// 4 · WORKING HOURS + HOLIDAYS
// =====================================================================
function V2SettingsHours() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SETTINGS</div>
          <div className="v2-appbar-title">HOURS + HOLIDAYS</div>
        </div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">WORK DAYS</div></div>
      <div style={{padding:'16px 20px', display:'flex', gap:0}}>
        {['M','T','W','T','F','S','S'].map((d, i) => (
          <button key={i} style={{
            flex:1, padding:'14px 0',
            background: i < 6 ? 'var(--v2-accent)' : 'transparent',
            color: i < 6 ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)',
            border:'2px solid var(--v2-ink)', borderLeft: i > 0 ? 'none' : '2px solid var(--v2-ink)',
            fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18,
          }}>{d}</button>
        ))}
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">DAILY WINDOW</div></div>
      <div style={{padding:'20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
        <div>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>START</div>
          <div style={{marginTop:8, padding:'14px 16px', border:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:28, fontVariantNumeric:'tabular-nums'}}>7:00</div>
        </div>
        <div>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>END</div>
          <div style={{marginTop:8, padding:'14px 16px', border:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:28, fontVariantNumeric:'tabular-nums'}}>16:00</div>
        </div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">HOLIDAYS · 2026</div><div className="v2-mono" style={{fontWeight:700}}>8</div></div>
      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {[
          { d:'JAN 1', l:'NEW YEAR' },
          { d:'FEB 16', l:'FAMILY DAY' },
          { d:'APR 3', l:'GOOD FRIDAY' },
          { d:'MAY 18', l:'VICTORIA DAY' },
          { d:'JUL 1', l:'CANADA DAY' },
          { d:'SEP 7', l:'LABOUR DAY' },
        ].map((h, i) => (
          <div key={i} className="v2-row">
            <div className="v2-mono" style={{width:64, fontSize:11, fontWeight:700, color:'var(--v2-ink-3)'}}>{h.d}</div>
            <div style={{flex:1, fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{h.l}</div>
            <button style={{padding:'4px 8px', background:'transparent', border:'1.5px solid var(--v2-line-soft)', color:'var(--v2-ink-3)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:600}}>✕</button>
          </div>
        ))}
      </div>

      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn ghost">+ ADD HOLIDAY</button>
      </div>
    </div>
  );
}

// =====================================================================
// 5 · INTEGRATIONS
// =====================================================================
function V2SettingsIntegrations() {
  const list = [
    { l:'QUICKBOOKS ONLINE', sub:'BOOKS · INVOICES · PRICING', status:'CONNECTED', good:true },
    { l:'GUSTO',             sub:'PAYROLL · BURDEN AUTO',      status:'CONNECTED', good:true },
    { l:'STRIPE',            sub:'COLLECT PAYMENTS',           status:'NOT YET' },
    { l:'XERO',              sub:'BOOKS · ALTERNATIVE',        status:'NOT YET' },
    { l:'PROCORE',           sub:'GC PROJECT IMPORT',          status:'NOT YET' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SETTINGS</div>
          <div className="v2-appbar-title">INTEGRATIONS</div>
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {list.map((it, i) => (
          <div key={i} style={{padding:'18px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:14}}>
            <div style={{width:48, height:48, background: it.good ? 'var(--v2-good)' : 'var(--v2-sand-soft)', color: it.good ? '#fff' : 'var(--v2-ink-3)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18}}>{it.l[0]}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{it.l}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{it.sub}</div>
            </div>
            {it.good ? (
              <span style={{padding:'4px 8px', background:'var(--v2-good)', color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>{it.status}</span>
            ) : (
              <button style={{padding:'8px 12px', background:'var(--v2-ink)', color:'var(--v2-sand)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.04em'}}>CONNECT</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 6 · ROLES + PERMISSIONS MATRIX
// =====================================================================
function V2SettingsRoles() {
  const rows = [
    { l:'CREATE PROJECT',     O:1, E:1, F:0, W:0 },
    { l:'EDIT PRICING BOOK',  O:1, E:1, F:0, W:0 },
    { l:'AUTH MATERIALS · $', O:1, E:0, F:0, W:0 },
    { l:'BRIEF CREW',         O:1, E:0, F:1, W:0 },
    { l:'SUBMIT DAILY LOG',   O:1, E:0, F:1, W:0 },
    { l:'CLOCK IN · OUT',     O:1, E:1, F:1, W:1 },
    { l:'FLAG ISSUE',         O:1, E:1, F:1, W:1 },
    { l:'STOP WORK',          O:1, E:1, F:1, W:1 },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SETTINGS</div>
          <div className="v2-appbar-title">ROLES</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">4 BUILT-IN ROLES</div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5, fontSize:12}}>OWNER · ESTIMATOR · FOREMAN · CREW. CUSTOM ROLES INHERIT FROM ONE.</div>
      </div>

      {/* Matrix header */}
      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-ink)'}}>
        <div style={{padding:'12px 14px', color:'var(--v2-sand)'}}>
          <div className="v2-mono" style={{fontSize:10, fontWeight:700, letterSpacing:'0.06em'}}>ACTION</div>
        </div>
        {['O','E','F','W'].map(c => (
          <div key={c} style={{padding:'12px 0', textAlign:'center', color:'var(--v2-accent)', borderLeft:'1px solid var(--v2-ink-2)'}}>
            <div className="v2-mono" style={{fontSize:13, fontWeight:800}}>{c}</div>
          </div>
        ))}
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {rows.map((r, i) => (
          <div key={i} style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', borderBottom:'1px solid var(--v2-line-soft)', alignItems:'center'}}>
            <div style={{padding:'14px 14px'}}>
              <div className="v2-mono" style={{fontSize:11, fontWeight:600, color:'var(--v2-ink)'}}>{r.l}</div>
            </div>
            {[r.O, r.E, r.F, r.W].map((v, j) => (
              <div key={j} style={{padding:'14px 0', textAlign:'center', borderLeft:'1px solid var(--v2-line-soft)'}}>
                {v === 1
                  ? <div style={{width:20, height:20, background:'var(--v2-accent)', display:'inline-block', border:'2px solid var(--v2-ink)'}}/>
                  : <div style={{width:20, height:20, display:'inline-block', border:'2px solid var(--v2-line-soft)'}}/>}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn ghost">+ CREATE CUSTOM ROLE</button>
      </div>
    </div>
  );
}

// =====================================================================
// 7 · NOTIFICATIONS preferences
// =====================================================================
function V2SettingsNotifications() {
  const groups = [
    { l:'PROJECT', items:[
      { l:'NEW PROJECT ASSIGNED', push:true, sms:false, email:true },
      { l:'PROJECT AT RISK',      push:true, sms:true,  email:true },
      { l:'DAILY LOG SUBMITTED',  push:true, sms:false, email:false },
    ]},
    { l:'MONEY', items:[
      { l:'INVOICE PAID',         push:true, sms:false, email:true },
      { l:'APPROVAL REQUEST',     push:true, sms:true,  email:false },
    ]},
    { l:'SAFETY', items:[
      { l:'STOP WORK',            push:true, sms:true,  email:true, locked:true },
    ]},
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SETTINGS</div>
          <div className="v2-appbar-title">NOTIFICATIONS</div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-ink)', color:'var(--v2-sand)'}}>
        <div style={{padding:'12px 14px'}}><div className="v2-mono" style={{fontSize:10, fontWeight:700}}>EVENT</div></div>
        {['PUSH','SMS','EMAIL'].map(c => (
          <div key={c} style={{padding:'12px 0', textAlign:'center', borderLeft:'1px solid var(--v2-ink-2)'}}><div className="v2-mono" style={{fontSize:10, fontWeight:700, color:'var(--v2-accent)'}}>{c}</div></div>
        ))}
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {groups.map((g, gi) => (
          <React.Fragment key={gi}>
            <div style={{padding:'10px 14px', background:'var(--v2-sand-soft)', borderBottom:'1px solid var(--v2-line-soft)'}}><div className="v2-mono" style={{fontSize:10, fontWeight:700, color:'var(--v2-ink-3)', letterSpacing:'0.06em'}}>{g.l}</div></div>
            {g.items.map((r, i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', borderBottom:'1px solid var(--v2-line-soft)', alignItems:'center'}}>
                <div style={{padding:'14px 14px'}}>
                  <div className="v2-mono" style={{fontSize:11, fontWeight:600}}>{r.l}</div>
                  {r.locked && <div className="v2-mono" style={{fontSize:9, fontWeight:700, color:'var(--v2-bad)', marginTop:3, letterSpacing:'0.06em'}}>● LOCKED · ALL ON</div>}
                </div>
                {[r.push, r.sms, r.email].map((v, j) => (
                  <div key={j} style={{padding:'14px 0', textAlign:'center', borderLeft:'1px solid var(--v2-line-soft)'}}>
                    <div style={{width:20, height:20, background: v ? 'var(--v2-accent)' : 'transparent', border:'2px solid', borderColor: v ? 'var(--v2-ink)' : 'var(--v2-line-soft)', display:'inline-block', opacity: r.locked ? 0.7 : 1}}/>
                  </div>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 8 · PROFILE
// =====================================================================
function V2SettingsProfile() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SETTINGS</div>
          <div className="v2-appbar-title">PROFILE</div>
        </div>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
        <div style={{width:96, height:96, background:'var(--v2-ink)', color:'var(--v2-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:900, fontSize:36}}>MD</div>
        <h2 className="v2-h2" style={{marginTop:18}}>MIKE DAVIS</h2>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-3)', fontWeight:600}}>OWNER · ALL HATS</div>
      </div>

      {[
        { l:'NAME',     v:'MIKE DAVIS' },
        { l:'EMAIL',    v:'mike@davis.co' },
        { l:'PHONE',    v:'(403) 555-0142' },
        { l:'PASSWORD', v:'••••••••••', sub:'CHANGED 2 MO AGO' },
        { l:'2FA',      v:'ON',       sub:'AUTHENTICATOR APP' },
      ].map((r, i) => (
        <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'18px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
          <div style={{flex:1, minWidth:0}}>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:700, letterSpacing:'0.06em'}}>{r.l}</div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14, marginTop:4}}>{r.v}</div>
            {r.sub && <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.sub}</div>}
          </div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18, color:'var(--v2-ink-3)'}}>→</div>
        </button>
      ))}

      <div className="v2-flex-1"/>
    </div>
  );
}

// =====================================================================
// 9 · HELP + SUPPORT
// =====================================================================
function V2SettingsHelp() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SETTINGS</div>
          <div className="v2-appbar-title">HELP</div>
        </div>
      </div>

      <div style={{padding:'24px 20px', background:'var(--v2-accent)', borderBottom:'2px solid var(--v2-ink)'}}>
        <h2 className="v2-h2" style={{color:'var(--v2-accent-ink)'}}>Stuck on something?</h2>
        <div className="v2-mono" style={{marginTop:10, color:'var(--v2-accent-ink)', fontWeight:600, lineHeight:1.45}}>WE TALK BACK QUICK. NO TICKETS · NO BOTS.</div>
      </div>

      <div style={{padding:'14px 20px 0'}}>
        {[
          { l:'CHAT WITH SUPPORT',   sub:'AVG 4 MIN · 6AM-6PM MT',  primary:true },
          { l:'BOOK A 30-MIN CALL',  sub:'WALK THROUGH YOUR SETUP' },
          { l:'EMAIL US',            sub:'help@sitelayer.co' },
        ].map((o, i) => (
          <button key={i} style={{
            display:'flex', width:'100%', alignItems:'center', gap:14,
            padding:'18px 20px',
            background: o.primary ? 'var(--v2-ink)' : 'var(--v2-sand)',
            color: o.primary ? 'var(--v2-sand)' : 'var(--v2-ink)',
            border:'2px solid var(--v2-ink)', borderTop: i > 0 ? 'none' : '2px solid var(--v2-ink)',
            textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer',
          }}>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16}}>{o.l}</div>
              <div className="v2-mono" style={{fontSize:11, marginTop:4, fontWeight:600, opacity:0.65}}>{o.sub}</div>
            </div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18}}>→</div>
          </button>
        ))}
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">QUICK LINKS</div></div>
      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {['SETUP GUIDE','TAKEOFF BASICS','CONNECTING QBO','WHY MY MARGIN IS RED','KEYBOARD SHORTCUTS'].map((q, i) => (
          <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'14px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div className="v2-mono" style={{fontSize:13, fontWeight:600, flex:1}}>{q}</div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:16, color:'var(--v2-ink-3)'}}>→</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 10 · INVITE TEAMMATES (sheet)
// =====================================================================
function V2SettingsInvite() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">✕</button>
        <div className="v2-appbar-title">INVITE TEAMMATE</div>
      </div>

      <div style={{padding:'24px 20px 8px'}}>
        <h2 className="v2-h2">Bring someone on.</h2>
        <div className="v2-mono" style={{marginTop:12, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5, fontSize:12}}>PICK A ROLE · ENTER A NUMBER OR EMAIL · WE\u2019LL SEND THE INVITE.</div>
      </div>

      <div style={{padding:'14px 20px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>ROLE</div>
        <div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, border:'2px solid var(--v2-ink)'}}>
          {[{l:'ESTIMATOR'},{l:'FOREMAN', on:true},{l:'CREW'},{l:'OWNER'}].map((t, i) => {
            const isRight = i % 2 === 1;
            const isLastRow = i >= 2;
            return (
              <button key={t.l} style={{
                padding:'18px 0', background: t.on ? 'var(--v2-accent)' : 'transparent',
                color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)',
                border:'none',
                borderRight: isRight ? 'none' : '2px solid var(--v2-ink)',
                borderBottom: isLastRow ? 'none' : '2px solid var(--v2-ink)',
                fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.06em',
              }}>{t.l}</button>
            );
          })}
        </div>
      </div>

      <div style={{padding:'14px 20px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>SEND TO</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:15, fontWeight:600}}>
          (403) 555-0142<span style={{display:'inline-block', width:2, height:14, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:2}}/>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">SEND INVITE</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  V2SettingsHome, V2SettingsPricing, V2SettingsBurden,
  V2SettingsHours, V2SettingsIntegrations, V2SettingsRoles,
  V2SettingsNotifications, V2SettingsProfile,
  V2SettingsHelp, V2SettingsInvite,
});
