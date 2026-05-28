/* global React */

// ============================================================
// ESTIMATOR · V2 (Section 15)
// PlanSwift-class takeoff — mobile-first, AI-forward.
// Tokens: --v2-sand / --v2-ink / --v2-accent (#FFD400).
// 56px tap targets, 16px min body, hard edges only.
// ============================================================

// Local helper — bottom nav for estimator (5 tabs)
function V2EstTabs({ active = 'projects', queueBadge = 0 }) {
  const tabs = [
    { id:'projects',  l:'PROJECTS' },
    { id:'queue',     l:'QUEUE',   b: queueBadge },
    { id:'clients',   l:'CLIENTS' },
    { id:'library',   l:'LIBRARY' },
    { id:'more',      l:'MORE' },
  ];
  return (
    <div className="v2-bottombar">
      {tabs.map(t => (
        <button key={t.id} className={'v2-bottombar-tab' + (t.id === active ? ' active' : '')}>
          {t.l}{t.b ? <span style={{marginLeft:4, background:'var(--v2-bad)', color:'#fff', fontSize:9, padding:'1px 4px'}}>{t.b}</span> : null}
        </button>
      ))}
    </div>
  );
}

function V2EstStatusBar({ time = '9:41', dark }) {
  return (
    <div style={{
      height: 32, padding: '10px 18px 0',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500,
      flexShrink: 0,
      color: dark ? 'var(--v2-sand)' : 'var(--v2-ink)',
    }}>
      <span>{time}</span>
      <span style={{display:'flex', gap:6, alignItems:'center'}}>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor"><rect x="0" y="6" width="3" height="4"/><rect x="5" y="4" width="3" height="6"/><rect x="10" y="2" width="3" height="8"/><rect x="15" y="0" width="3" height="10"/></svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="20" height="8"/><rect x="23" y="4" width="2" height="4" fill="currentColor"/><rect x="3" y="4" width="14" height="4" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

// =====================================================================
// 1 · ESTIMATOR HOME · projects list w/ queue states
// =====================================================================
function V2EstHome() {
  const projects = [
    { name:'HILLCREST MEWS PHASE 4', client:'JOHN MARCHETTI', state:'DUE TODAY', stateColor:'var(--v2-bad)', meta:'4,820 SF · 6 SHEETS', updated:'1H AGO' },
    { name:'ASPEN RIDGE TOWNHOMES',  client:'CALVERA BUILDERS', state:'AI READY',  stateColor:'var(--v2-accent)', meta:'12,400 SF · 22 SHEETS', updated:'18M AGO' },
    { name:'GREENWILLOW SENIOR',      client:'GREENWILLOW LIVING', state:'IN PROGRESS', stateColor:'var(--v2-good)', meta:'8,200 SF · 14 SHEETS', updated:'2D AGO' },
    { name:'FOOTHILLS MEDICAL',       client:'FOOTHILLS HEALTH', state:'DRAFT',       stateColor:'var(--v2-ink-3)', meta:'NEW · 0 SHEETS', updated:'YESTERDAY' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">ESTIMATOR · SARAH</div>
          <div className="v2-appbar-title">4 PROJECTS</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {projects.map((p, i) => (
          <button key={i} style={{display:'block', width:'100%', textAlign:'left', padding:'18px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8}}>
              <div style={{flex:1}}>
                <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:600}}>{p.client}</div>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:18, letterSpacing:'-0.015em', marginTop:4}}>{p.name}</div>
              </div>
              <span style={{padding:'4px 8px', background:p.stateColor, color: p.stateColor === 'var(--v2-accent)' ? 'var(--v2-accent-ink)' : '#fff', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)', whiteSpace:'nowrap'}}>{p.state}</span>
            </div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:10, fontWeight:600, letterSpacing:'0.04em'}}>{p.meta} · {p.updated}</div>
          </button>
        ))}
      </div>

      <V2EstTabs active="projects" queueBadge={2}/>
    </div>
  );
}

// =====================================================================
// 2 · NEW PROJECT · client picker
// =====================================================================
function V2EstNewProject() {
  const clients = [
    { i:'JM', n:'JOHN MARCHETTI',     sub:'HILLCREST HOMES CO · 4 PROJECTS' },
    { i:'CB', n:'CALVERA BUILDERS',   sub:'COMMERCIAL GC · 6 PROJECTS' },
    { i:'GW', n:'GREENWILLOW LIVING', sub:'SR CARE · 1 PROJECT' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">NEW PROJECT</div>
      </div>

      <div style={{padding:'24px 20px 8px'}}>
        <div className="v2-eyebrow">STEP 1 / 3</div>
        <h2 className="v2-h2" style={{marginTop:8}}>Who's it for?</h2>
      </div>

      <div style={{padding:'14px 20px 8px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>SEARCH CLIENTS</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:10}}>
          <span className="v2-mono" style={{fontWeight:700}}>↳</span>
          <span style={{flex:1, color:'var(--v2-ink-4)', fontSize:15}}>Name, company, project…</span>
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {clients.map((c, i) => (
          <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'14px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', fontFamily:'var(--v2-font)', cursor:'pointer', textAlign:'left'}}>
            <div style={{width:44, height:44, background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14, flexShrink:0}}>{c.i}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16, letterSpacing:'-0.01em'}}>{c.n}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{c.sub}</div>
            </div>
          </button>
        ))}
        <button style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'18px 20px', background:'var(--v2-accent)', border:'none', borderTop:'2px solid var(--v2-ink)', borderBottom:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font)', cursor:'pointer', textAlign:'left'}}>
          <div style={{width:44, height:44, background:'var(--v2-ink)', color:'var(--v2-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:24, flexShrink:0}}>+</div>
          <div style={{flex:1, fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16, color:'var(--v2-accent-ink)'}}>NEW CLIENT</div>
        </button>
      </div>
    </div>
  );
}

// =====================================================================
// 3 · PLAN INGEST · upload + parse states
// =====================================================================
function V2EstPlanIngest({ state = 'parsing' }) {
  const isParsing = state === 'parsing';
  const isDone = state === 'done';
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">STEP 3 / 3 · PLAN INGEST</div>
          <div className="v2-appbar-title">HILLCREST PH4</div>
        </div>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow accent" style={{display:'inline-block'}}>{isDone ? 'PARSED' : 'PARSING'}</div>
        <h2 className="v2-h2" style={{marginTop:10}}>{isDone ? 'Plan set ready.' : 'AI reading the plan set…'}</h2>
        <div style={{fontFamily:'var(--v2-font-mono)', fontSize:12, color:'var(--v2-ink-3)', marginTop:10, fontWeight:500}}>HILLCREST-PH4-DRAWINGS.PDF · 12.4 MB</div>
      </div>

      {/* Steps */}
      <div className="v2-flex-1" style={{overflow:'auto', padding:'10px 0'}}>
        {[
          { l:'PDF UPLOADED',           done:true },
          { l:'22 SHEETS DETECTED',     done:true },
          { l:'CROSS-SHEET REFERENCES', done:true, sub:'8 callouts linked' },
          { l:'SCALE AUTO-DETECT',      done:isDone, active:!isDone, sub: isDone ? '22 of 22 sheets · review needed' : 'reading title blocks…' },
          { l:'SCOPE PRE-CLASSIFY',     done:isDone, queued:!isDone, sub: isDone ? 'EPS · base · stone · plumbing' : '' },
        ].map((s, i) => (
          <div key={i} style={{padding:'14px 20px', display:'flex', alignItems:'center', gap:14, borderBottom:'1px solid var(--v2-line-soft)'}}>
            <div style={{
              width:32, height:32,
              background: s.done ? 'var(--v2-good)' : s.active ? 'var(--v2-accent)' : 'transparent',
              color: s.done ? '#fff' : s.active ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)',
              border: s.queued ? '2px solid var(--v2-line-soft)' : '2px solid var(--v2-ink)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14,
              flexShrink:0,
            }}>
              {s.done ? '✓' : s.active ? '●' : ''}
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14, letterSpacing:'-0.005em', color: s.queued ? 'var(--v2-ink-3)' : 'var(--v2-ink)'}}>{s.l}</div>
              {s.sub && <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{s.sub}</div>}
            </div>
          </div>
        ))}
      </div>

      {isDone && (
        <div style={{padding:'16px 20px', borderTop:'2px solid var(--v2-ink)'}}>
          <button className="v2-btn primary">CONFIRM SCALE · START TAKEOFF</button>
        </div>
      )}
      {isParsing && (
        <div style={{padding:'16px 20px', borderTop:'2px solid var(--v2-ink)'}}>
          <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-3)', textAlign:'center', fontWeight:600}}>~22 SECONDS REMAINING</div>
        </div>
      )}
    </div>
  );
}

// =====================================================================
// 4 · SHEET NAVIGATOR · thumbnail strip drawer
// =====================================================================
function V2EstSheetNav() {
  const sheets = [
    { n:'A-001', l:'COVER',        active:false, hasTakeoff:false },
    { n:'A-101', l:'FLOOR PLAN',   active:false, hasTakeoff:true },
    { n:'A-201', l:'ELEV. EAST',   active:true,  hasTakeoff:true },
    { n:'A-202', l:'ELEV. SOUTH',  active:false, hasTakeoff:true },
    { n:'A-203', l:'ELEV. WEST',   active:false, hasTakeoff:false },
    { n:'A-204', l:'ELEV. NORTH',  active:false, hasTakeoff:false },
    { n:'A-501', l:'DETAILS',      active:false, hasTakeoff:false, unverified:true },
  ];
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SHEETS · 22 TOTAL</div>
          <div className="v2-appbar-title">A-201 · ELEV. EAST</div>
        </div>
      </div>

      <div style={{padding:'14px 20px 8px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>FILTER</div>
        <div style={{display:'flex', gap:6, marginTop:8, flexWrap:'wrap'}}>
          {[{l:'ALL · 22', on:true}, {l:'WITH TAKEOFF · 8'}, {l:'UNVERIFIED · 3'}].map(c => (
            <button key={c.l} style={{padding:'8px 12px', background: c.on ? 'var(--v2-ink)' : 'transparent', color: c.on ? 'var(--v2-sand)' : 'var(--v2-ink-3)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em'}}>{c.l}</button>
          ))}
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto', padding:'12px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          {sheets.map(s => (
            <button key={s.n} style={{background: s.active ? 'var(--v2-accent)' : 'var(--v2-sand)', border:'2px solid var(--v2-ink)', padding:0, fontFamily:'var(--v2-font)', cursor:'pointer', textAlign:'left'}}>
              {/* sheet thumb mock */}
              <div style={{height:80, background:'var(--v2-sand-soft)', borderBottom:'2px solid var(--v2-ink)', position:'relative'}}>
                <svg viewBox="0 0 140 80" width="100%" height="100%">
                  <rect x="8" y="8" width="124" height="64" fill="none" stroke="#0F0E0C" strokeWidth="1.5"/>
                  <rect x="14" y="20" width="80" height="44" fill="#FFD400" opacity={s.hasTakeoff ? 0.35 : 0}/>
                  <rect x="14" y="20" width="80" height="44" fill="none" stroke="#0F0E0C" strokeWidth="1.2"/>
                  <text x="102" y="32" fontFamily="JetBrains Mono" fontSize="7" fill="#0F0E0C">A-201</text>
                </svg>
                {s.unverified && <div style={{position:'absolute', top:4, right:4, width:8, height:8, background:'var(--v2-bad)', border:'1.5px solid var(--v2-ink)'}}/>}
                {s.hasTakeoff && <div style={{position:'absolute', top:4, left:4, padding:'1px 5px', background:'var(--v2-ink)', color:'var(--v2-accent)', fontFamily:'JetBrains Mono', fontSize:8, fontWeight:700}}>✓</div>}
              </div>
              <div style={{padding:'10px 12px'}}>
                <div className="v2-mono" style={{fontSize:10, fontWeight:700, color:'var(--v2-ink-3)'}}>{s.n}</div>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:13, marginTop:2}}>{s.l}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// 5 · SCALE CALIBRATION · manual (2-tap + enter length)
// =====================================================================
function V2EstScaleManual() {
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">✕</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SCALE · A-201</div>
          <div className="v2-appbar-title">MANUAL</div>
        </div>
      </div>

      {/* Drawing area with 2 points placed */}
      <div style={{flex:1, background:'var(--v2-sand-soft)', borderBottom:'2px solid var(--v2-ink)', position:'relative'}}>
        <svg viewBox="0 0 320 380" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="scale-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" stroke="#C8C0AC" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="320" height="380" fill="url(#scale-grid)"/>
          {/* fake floorplan walls */}
          <rect x="40" y="80" width="240" height="160" fill="none" stroke="#0F0E0C" strokeWidth="3"/>
          <line x1="160" y1="80" x2="160" y2="240" stroke="#0F0E0C" strokeWidth="2"/>
          {/* scale ref line — the user is tapping */}
          <line x1="40" y1="280" x2="280" y2="280" stroke="#FFD400" strokeWidth="3"/>
          <line x1="40" y1="270" x2="40" y2="290" stroke="#0F0E0C" strokeWidth="2"/>
          <line x1="280" y1="270" x2="280" y2="290" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="36" y="276" width="8" height="8" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="276" y="276" width="8" height="8" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
        </svg>

        {/* Loupe overlay (magnifier) */}
        <div style={{position:'absolute', top:240, right:36, width:80, height:80, background:'var(--v2-sand)', border:'3px solid var(--v2-ink)', borderRadius:'50%', overflow:'hidden', boxShadow:'4px 4px 0 var(--v2-ink)'}}>
          <svg viewBox="0 0 80 80" width="80" height="80">
            <rect width="80" height="80" fill="var(--v2-sand-soft)"/>
            <rect x="10" y="35" width="60" height="3" fill="#FFD400"/>
            <rect x="64" y="30" width="8" height="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
            <line x1="40" y1="0" x2="40" y2="80" stroke="#0F0E0C" strokeWidth="1" opacity="0.5"/>
            <line x1="0" y1="40" x2="80" y2="40" stroke="#0F0E0C" strokeWidth="1" opacity="0.5"/>
          </svg>
        </div>
      </div>

      {/* Length entry strip */}
      <div style={{padding:'18px 20px', background:'var(--v2-ink)', color:'var(--v2-sand)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-accent)'}}>REAL-WORLD LENGTH OF THIS LINE</div>
        <div style={{display:'flex', alignItems:'center', gap:10, marginTop:8}}>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:52, color:'var(--v2-sand)', fontVariantNumeric:'tabular-nums', lineHeight:0.9}}>24<span style={{fontSize:24, color:'var(--v2-ink-4)', marginLeft:6}}>FT</span></div>
          <div style={{flex:1, textAlign:'right'}}>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-4)', fontWeight:600}}>= 1:48 SCALE</div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-accent)', fontWeight:700, marginTop:3}}>● PROVISIONAL</div>
          </div>
        </div>
      </div>

      <div style={{padding:'12px 20px 20px', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>RE-TAP</button>
        <button className="v2-btn primary" style={{flex:2}}>VERIFY · APPLY TO A-201</button>
      </div>
    </div>
  );
}

// =====================================================================
// 6 · SCALE CALIBRATION · AI autoscale + verify gate
// =====================================================================
function V2EstScaleAuto() {
  const sheets = [
    { n:'A-101', l:'FLOOR PLAN',  scale:'1/4"=1\'',  conf:'HIGH', verified:true },
    { n:'A-201', l:'ELEV. EAST',  scale:'1/4"=1\'',  conf:'HIGH', verified:true },
    { n:'A-202', l:'ELEV. SOUTH', scale:'1/4"=1\'',  conf:'HIGH', verified:false },
    { n:'A-203', l:'ELEV. WEST',  scale:'1/8"=1\'',  conf:'MED',  verified:false, flag:true },
    { n:'A-501', l:'DETAILS',     scale:'NTS',       conf:'LOW',  verified:false, flag:true },
  ];
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>AI AUTOSCALE</div>
          <div className="v2-appbar-title" style={{marginTop:4}}>VERIFY SCALES</div>
        </div>
      </div>

      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:42, lineHeight:0.9, letterSpacing:'-0.025em'}}>2<span style={{color:'var(--v2-ink-3)'}}> / 22</span></div>
        <div className="v2-mono" style={{marginTop:6, fontWeight:600, color:'var(--v2-ink-2)'}}>VERIFIED · 20 TO REVIEW</div>
        <div style={{padding:'10px 12px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', marginTop:14, fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:600, lineHeight:1.45}}>
          Tap each sheet to confirm. Takeoff quantities won't be trusted until every sheet is verified.
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {sheets.map(s => (
          <div key={s.n} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:14}}>
            <div style={{
              width:36, height:36,
              background: s.verified ? 'var(--v2-good)' : s.flag ? 'var(--v2-bad)' : 'transparent',
              color: s.verified || s.flag ? '#fff' : 'var(--v2-ink-3)',
              border:'2px solid var(--v2-ink)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:16,
              flexShrink:0,
            }}>{s.verified ? '✓' : s.flag ? '!' : '○'}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                <div className="v2-mono" style={{fontSize:10, fontWeight:700, color:'var(--v2-ink-3)'}}>{s.n}</div>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{s.l}</div>
              </div>
              <div className="v2-mono" style={{fontSize:11, fontWeight:700, marginTop:3, color: s.flag ? 'var(--v2-bad)' : 'var(--v2-ink)'}}>{s.scale} · {s.conf} CONFIDENCE</div>
            </div>
            {!s.verified && <button style={{padding:'8px 12px', background:'var(--v2-ink)', color:'var(--v2-sand)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.04em'}}>CHECK</button>}
          </div>
        ))}
      </div>

      <div style={{padding:'16px 20px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn ghost" style={{borderColor:'var(--v2-line-soft)', color:'var(--v2-ink-3)'}} disabled>OPEN TAKEOFF · 20 SHEETS LEFT</button>
      </div>
    </div>
  );
}

// =====================================================================
// 7 · TAKEOFF CANVAS · manual trace mode
// =====================================================================
function V2EstCanvasManual() {
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">A-201 · EAST ELEV.</div>
          <div className="v2-appbar-title">TAKEOFF</div>
        </div>
        <button className="v2-iconbtn accent">⊕</button>
      </div>

      {/* Tool row */}
      <div style={{display:'flex', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
        {[{l:'POLY', on:true},{l:'RECT'},{l:'LIN'},{l:'PT'},{l:'TAP'}].map((t, i, arr) => (
          <button key={t.l} style={{flex:1, padding:'14px 0', background: t.on ? 'var(--v2-accent)' : 'transparent', color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', border:'none', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:t.on ? 700 : 600, letterSpacing:'0.06em'}}>{t.l}</button>
        ))}
      </div>

      {/* Canvas */}
      <div style={{flex:1, background:'var(--v2-sand-soft)', position:'relative', overflow:'hidden'}}>
        <svg viewBox="0 0 320 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="canvas-grid-1" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" stroke="#C8C0AC" strokeWidth="0.5" fill="none"/></pattern>
            <pattern id="canvas-grid-2" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" stroke="#8B8474" strokeWidth="0.8" fill="none"/></pattern>
          </defs>
          <rect width="320" height="320" fill="url(#canvas-grid-1)"/>
          <rect width="320" height="320" fill="url(#canvas-grid-2)"/>

          {/* Existing polygon (mid-trace) */}
          <polygon points="40,40 280,42 282,140 38,138" fill="rgba(255,212,0,0.32)" stroke="#0F0E0C" strokeWidth="2.5"/>
          <rect x="34" y="34" width="14" height="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="273" y="35" width="14" height="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="275" y="133" width="14" height="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="31" y="131" width="14" height="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>

          {/* Window cutout */}
          <rect x="100" y="65" width="50" height="58" fill="var(--v2-sand)" stroke="#0F0E0C" strokeWidth="2" strokeDasharray="4 3"/>
          <text x="125" y="100" fontFamily="JetBrains Mono" fontSize="9" fill="#0F0E0C" fontWeight="600" textAnchor="middle">WIN</text>

          {/* Active point with loupe */}
          <circle cx="180" cy="180" r="10" fill="#FFD400" stroke="#0F0E0C" strokeWidth="3"/>
        </svg>

        {/* Loupe magnifier (offset from finger) */}
        <div style={{position:'absolute', top:120, right:20, width:88, height:88, background:'var(--v2-sand)', border:'3px solid var(--v2-ink)', borderRadius:'50%', overflow:'hidden', boxShadow:'4px 4px 0 var(--v2-ink)'}}>
          <svg viewBox="0 0 88 88" width="88" height="88">
            <rect width="88" height="88" fill="var(--v2-sand-soft)"/>
            <polygon points="14,38 74,38" stroke="#0F0E0C" strokeWidth="3" fill="none"/>
            <rect x="38" y="32" width="14" height="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
            <line x1="44" y1="0" x2="44" y2="88" stroke="#C7331E" strokeWidth="1" opacity="0.8"/>
            <line x1="0" y1="44" x2="88" y2="44" stroke="#C7331E" strokeWidth="1" opacity="0.8"/>
          </svg>
        </div>

        {/* Zoom + undo cluster */}
        <div style={{position:'absolute', right:8, top:8, display:'flex', flexDirection:'column'}}>
          {['+', '−', '↶'].map((c, i) => (
            <button key={i} style={{width:40, height:40, background:'var(--v2-sand)', border:'2px solid var(--v2-ink)', borderTop: i === 0 ? '2px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18}}>{c}</button>
          ))}
        </div>
      </div>

      {/* Live measurement strip */}
      <div style={{padding:'14px 20px', background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'2px solid var(--v2-ink)'}}>
        <div>
          <div className="v2-eyebrow" style={{color:'var(--v2-accent)'}}>EPS · POLY 4 OF 9</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:34, color:'var(--v2-sand)', marginTop:4, lineHeight:1, fontVariantNumeric:'tabular-nums'}}>1,285<span style={{fontSize:18, color:'var(--v2-ink-4)', marginLeft:6}}> SF</span></div>
        </div>
        <button style={{padding:'10px 14px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', border:'2px solid var(--v2-accent)', fontFamily:'var(--v2-font)', fontWeight:700, fontSize:13}}>SAVE</button>
      </div>

      <div style={{padding:'10px 20px 16px', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{minHeight:48, flex:1}}>DRAFT</button>
        <button className="v2-btn primary" style={{minHeight:48, flex:2}}>DONE · 4,785 SF</button>
      </div>
    </div>
  );
}

// =====================================================================
// 8 · TAKEOFF CANVAS · single-tap auto-detect
// =====================================================================
function V2EstCanvasAutoDetect() {
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>AI · TAP TO DETECT</div>
          <div className="v2-appbar-title" style={{marginTop:4}}>A-201 EAST</div>
        </div>
      </div>

      <div style={{display:'flex', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
        {[{l:'POLY'},{l:'RECT'},{l:'LIN'},{l:'PT'},{l:'TAP', on:true}].map((t, i, arr) => (
          <button key={t.l} style={{flex:1, padding:'14px 0', background: t.on ? 'var(--v2-accent)' : 'transparent', color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', border:'none', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:t.on ? 700 : 600, letterSpacing:'0.06em'}}>{t.l}</button>
        ))}
      </div>

      {/* Canvas with detected fills */}
      <div style={{flex:1, background:'var(--v2-sand-soft)', position:'relative', overflow:'hidden'}}>
        <svg viewBox="0 0 320 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="auto-grid-1" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" stroke="#C8C0AC" strokeWidth="0.5" fill="none"/></pattern>
          </defs>
          <rect width="320" height="320" fill="url(#auto-grid-1)"/>
          {/* Floor plan walls */}
          <rect x="30" y="40" width="260" height="200" fill="none" stroke="#0F0E0C" strokeWidth="3"/>
          <line x1="160" y1="40" x2="160" y2="240" stroke="#0F0E0C" strokeWidth="3"/>
          <line x1="30" y1="140" x2="290" y2="140" stroke="#0F0E0C" strokeWidth="3"/>
          {/* Doors (gaps) */}
          <rect x="155" y="138" width="10" height="4" fill="var(--v2-sand-soft)"/>
          {/* Detected rooms — filled */}
          <rect x="33" y="43" width="124" height="94" fill="rgba(255,212,0,0.5)"/>
          <rect x="163" y="43" width="124" height="94" fill="rgba(255,212,0,0.5)"/>
          <rect x="33" y="143" width="124" height="94" fill="rgba(255,212,0,0.5)"/>
          {/* Active tap-detected room (different highlight) */}
          <rect x="163" y="143" width="124" height="94" fill="rgba(199,51,30,0.32)" stroke="#C7331E" strokeWidth="2.5" strokeDasharray="4 3"/>
          <circle cx="225" cy="190" r="12" fill="#FFD400" stroke="#0F0E0C" strokeWidth="3"/>
          {/* Room labels */}
          <text x="95" y="92" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" textAnchor="middle" fill="#0F0E0C">820 SF</text>
          <text x="225" y="92" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" textAnchor="middle" fill="#0F0E0C">820 SF</text>
          <text x="95" y="192" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" textAnchor="middle" fill="#0F0E0C">820 SF</text>
          <text x="225" y="180" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" textAnchor="middle" fill="#C7331E">LOW CONF</text>
        </svg>

        {/* Confidence callout */}
        <div style={{position:'absolute', bottom:14, left:14, right:14, padding:'10px 12px', background:'var(--v2-ink)', color:'var(--v2-sand)', border:'2px solid var(--v2-ink)'}}>
          <div className="v2-mono" style={{fontSize:10, color:'var(--v2-bad)', fontWeight:700, letterSpacing:'0.06em'}}>● LOW CONFIDENCE</div>
          <div style={{fontSize:12, marginTop:3}}>Boundary is open near doorway. <span style={{color:'var(--v2-accent)', fontWeight:700}}>Add a cut-line</span> to seal it.</div>
        </div>
      </div>

      {/* Reference toggle */}
      <div style={{padding:'10px 20px', borderTop:'2px solid var(--v2-ink)', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)', display:'flex', alignItems:'center', gap:10}}>
        <div className="v2-eyebrow">MEASURES TO</div>
        <div style={{display:'flex', flex:1, border:'2px solid var(--v2-ink)'}}>
          {[{l:'INSIDE'},{l:'CENTER', on:true},{l:'OUTSIDE'}].map((t, i, arr) => (
            <button key={t.l} style={{flex:1, padding:'8px 0', background: t.on ? 'var(--v2-accent)' : 'transparent', color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-2)', border:'none', borderRight: i < arr.length-1 ? '1.5px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:t.on ? 700 : 600, letterSpacing:'0.04em'}}>{t.l}</button>
          ))}
        </div>
      </div>

      <div style={{padding:'12px 20px 16px'}}>
        <button className="v2-btn primary">CONFIRM ROOM 4 · 820 SF</button>
      </div>
    </div>
  );
}

// =====================================================================
// 9 · ITEM PICKER · bottom sheet
// =====================================================================
function V2EstItemPicker() {
  const items = [
    { code:'09 24 00', l:'EPS BOARD · 1.5"',      unit:'SF', sub:'STUCCO · BOARD' },
    { code:'09 24 00', l:'EPS BOARD · 2"',         unit:'SF', sub:'STUCCO · BOARD', hot:true },
    { code:'09 24 00', l:'BASECOAT · POLYMER MOD', unit:'SF', sub:'STUCCO · COAT' },
    { code:'09 24 00', l:'FINISH COAT · ACRYLIC',  unit:'SF', sub:'STUCCO · COAT' },
    { code:'04 73 00', l:'STONE VENEER',           unit:'SF', sub:'MASONRY' },
    { code:'07 90 00', l:'SEALANT JOINT',          unit:'LF', sub:'CAULKING' },
  ];
  return (
    <div className="v2 v2-screen" style={{background:'rgba(0,0,0,0.4)'}}>
      {/* faded canvas behind */}
      <div style={{position:'absolute', inset:0, background:'var(--v2-sand-soft)', opacity:0.3, zIndex:0}}/>

      {/* sheet */}
      <div style={{marginTop:'auto', background:'var(--v2-sand)', border:'2px solid var(--v2-ink)', borderBottom:'none', borderRadius:'0', position:'relative', zIndex:1, display:'flex', flexDirection:'column', maxHeight:'85%'}}>
        <div style={{padding:'10px 20px 6px', borderBottom:'2px solid var(--v2-ink)'}}>
          <div style={{width:40, height:4, background:'var(--v2-ink)', margin:'0 auto 12px'}}/>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
            <h3 className="v2-h3">Pick an item</h3>
            <button style={{background:'transparent', border:'none', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, color:'var(--v2-ink-3)'}}>CANCEL</button>
          </div>
        </div>

        {/* Search */}
        <div style={{padding:'14px 20px'}}>
          <div style={{padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:10}}>
            <span className="v2-mono" style={{fontWeight:700}}>↳</span>
            <span style={{flex:1, color:'var(--v2-ink)', fontSize:15, fontWeight:500}}>eps<span style={{display:'inline-block', width:2, height:14, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:1}}/></span>
          </div>
        </div>

        {/* Browse chips */}
        <div style={{padding:'0 20px 12px', display:'flex', gap:6, flexWrap:'wrap'}}>
          {[{l:'STUCCO', on:true},{l:'MASONRY'},{l:'CAULK'},{l:'ALL CSI'}].map(c => (
            <button key={c.l} style={{padding:'6px 10px', background: c.on ? 'var(--v2-ink)' : 'transparent', color: c.on ? 'var(--v2-sand)' : 'var(--v2-ink-3)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em'}}>{c.l}</button>
          ))}
        </div>

        {/* Item list */}
        <div style={{flex:1, overflow:'auto', borderTop:'1px solid var(--v2-line-soft)'}}>
          {items.map((it, i) => (
            <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'14px 20px', background: it.hot ? 'var(--v2-accent)' : 'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
              <div className="v2-mono" style={{fontSize:9, color: it.hot ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', fontWeight:700, width:60, flexShrink:0}}>{it.code}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15, color: it.hot ? 'var(--v2-accent-ink)' : 'var(--v2-ink)'}}>{it.l}</div>
                <div className="v2-mono" style={{fontSize:10, color: it.hot ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', marginTop:2, fontWeight:600}}>{it.sub}</div>
              </div>
              <div className="v2-mono" style={{fontSize:11, fontWeight:700, color: it.hot ? 'var(--v2-accent-ink)' : 'var(--v2-ink)'}}>{it.unit}</div>
            </button>
          ))}
        </div>

        <div style={{padding:'14px 20px', borderTop:'2px solid var(--v2-ink)'}}>
          <button className="v2-btn primary">USE EPS BOARD · 2"</button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// 10 · ITEM ATTACHED · live quantities + parts/assemblies
// =====================================================================
function V2EstItemAttached() {
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">ITEM · 09 24 00</div>
          <div className="v2-appbar-title">EPS BOARD · 2"</div>
        </div>
      </div>

      {/* Quantity hero */}
      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">LIVE QUANTITY</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:72, lineHeight:0.9, letterSpacing:'-0.035em', marginTop:8, fontVariantNumeric:'tabular-nums'}}>4,785<span style={{fontSize:24, color:'var(--v2-ink-3)', marginLeft:6}}> SF</span></div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600}}>9 POLYGONS · 3 SHEETS · A-201 + A-202 + A-203</div>
      </div>

      {/* Attached parts */}
      <div className="v2-section-bar">
        <div className="v2-eyebrow">PARTS</div>
        <span style={{padding:'2px 8px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>STUCCO ASSEMBLY</span>
      </div>
      {[
        { l:'EPS BOARD 2"',         qty:'4,785 SF', cost:'$3,541' },
        { l:'BASECOAT · POLYMER',   qty:'4,785 SF', cost:'$2,200' },
        { l:'MESH · STD',           qty:'4,785 SF', cost:'$1,388' },
        { l:'LABOR · INSTALL',      qty:'160 HRS',  cost:'$8,000' },
      ].map((p, i) => (
        <div key={i} style={{padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--v2-line-soft)'}}>
          <div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{p.l}</div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{p.qty}</div>
          </div>
          <div className="v2-mono" style={{fontSize:13, fontWeight:700, color:'var(--v2-ink)'}}>{p.cost}</div>
        </div>
      ))}

      <div style={{padding:'14px 20px', background:'var(--v2-sand-soft)', borderTop:'2px solid var(--v2-ink)', borderBottom:'2px solid var(--v2-ink)', display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
        <div className="v2-eyebrow">ASSEMBLY SUBTOTAL</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:28, fontVariantNumeric:'tabular-nums'}}>$15,129</div>
      </div>

      <div style={{padding:'16px 20px', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn ghost">+ ADD PART OR ASSEMBLY</button>
        <button className="v2-btn primary">VIEW ON CANVAS</button>
      </div>
    </div>
  );
}

// =====================================================================
// 11 · AI AUTO-COUNT · review + reject false positives
// =====================================================================
function V2EstAutoCountReview() {
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>AI · AUTO COUNT</div>
          <div className="v2-appbar-title" style={{marginTop:4}}>REVIEW DIFFUSERS</div>
        </div>
      </div>

      {/* Hero count */}
      <div style={{padding:'20px', background:'var(--v2-ink)', color:'var(--v2-sand)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-accent)'}}>FOUND ACROSS 4 SHEETS</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:72, lineHeight:0.9, letterSpacing:'-0.035em', marginTop:6, fontVariantNumeric:'tabular-nums', color:'var(--v2-sand)'}}>214<span style={{fontSize:24, color:'var(--v2-ink-4)', marginLeft:6}}> COUNT</span></div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-4)', fontWeight:600}}>HIGH 196 · MED 14 · LOW 4</div>
      </div>

      {/* Canvas with detected counts */}
      <div style={{flex:1, background:'var(--v2-sand-soft)', position:'relative', overflow:'hidden'}}>
        <svg viewBox="0 0 320 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs><pattern id="ac-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" stroke="#C8C0AC" strokeWidth="0.5" fill="none"/></pattern></defs>
          <rect width="320" height="320" fill="url(#ac-grid)"/>
          {/* Walls outline */}
          <rect x="30" y="40" width="260" height="220" fill="none" stroke="#0F0E0C" strokeWidth="2.5"/>
          <line x1="160" y1="40" x2="160" y2="260" stroke="#0F0E0C" strokeWidth="2"/>
          <line x1="30" y1="150" x2="290" y2="150" stroke="#0F0E0C" strokeWidth="2"/>
          {/* Detected count dots */}
          {[
            [70, 80], [120, 80], [70, 110], [120, 110],
            [200, 80], [250, 80], [200, 110], [250, 110],
            [70, 190], [120, 190], [70, 220], [120, 220],
            [200, 190], [250, 190],
            [200, 220, 'low'], // low confidence
          ].map(([x, y, low], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="9" fill={low === 'low' ? '#C7331E' : '#FFD400'} stroke="#0F0E0C" strokeWidth="2"/>
              {low === 'low' && <text x={x} y={y+2} fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" textAnchor="middle" fill="#fff">?</text>}
            </g>
          ))}
        </svg>

        {/* Low-conf callout */}
        <div style={{position:'absolute', bottom:14, left:14, right:14, padding:'10px 12px', background:'var(--v2-ink)', border:'2px solid var(--v2-bad)'}}>
          <div className="v2-mono" style={{fontSize:10, color:'var(--v2-bad)', fontWeight:700, letterSpacing:'0.06em'}}>● 4 LOW-CONF FLAGGED</div>
          <div style={{fontSize:12, color:'var(--v2-sand)', marginTop:3}}>Tap each red mark to keep or reject.</div>
        </div>
      </div>

      <div style={{padding:'14px 20px', display:'flex', gap:8, borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn ghost" style={{flex:1, minHeight:48}}>REVIEW 4</button>
        <button className="v2-btn primary" style={{flex:2, minHeight:48}}>APPROVE 210</button>
      </div>
    </div>
  );
}

// =====================================================================
// 12 · AI AUTO-TAKEOFF · draft review
// =====================================================================
function V2EstAutoTakeoffReview() {
  const rows = [
    { l:'EPS BOARD · 2"',       qty:'4,785 SF', conf:'HIGH',  status:'ok' },
    { l:'BASECOAT · POLYMER',   qty:'4,785 SF', conf:'HIGH',  status:'ok' },
    { l:'STONE VENEER',         qty:'420 SF',   conf:'HIGH',  status:'ok' },
    { l:'SEALANT JOINT',        qty:'320 LF',   conf:'MED',   status:'review' },
    { l:'DIFFUSER · 24"',       qty:'214 EA',   conf:'HIGH',  status:'ok' },
    { l:'PARAPET FLASHING',     qty:'180 LF',   conf:'LOW',   status:'flag' },
  ];
  const statusColor = { ok:'var(--v2-good)', review:'var(--v2-warn)', flag:'var(--v2-bad)' };
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>AI · AUTO-TAKEOFF</div>
          <div className="v2-appbar-title" style={{marginTop:4}}>DRAFT REVIEW</div>
        </div>
      </div>

      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow accent" style={{background:'var(--v2-good)', color:'#fff'}}>DRAFTED IN 42S</div>
        <h2 className="v2-h2" style={{marginTop:12}}>6 items across 22 sheets.</h2>
        <div className="v2-mono" style={{marginTop:10, color:'var(--v2-ink-2)', fontWeight:600}}>4 OK · 1 NEEDS REVIEW · 1 FLAGGED</div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {rows.map((r, i) => (
          <div key={i} style={{padding:'14px 20px', display:'flex', alignItems:'center', gap:14, borderBottom:'1px solid var(--v2-line-soft)'}}>
            <div style={{width:8, alignSelf:'stretch', background:statusColor[r.status]}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{r.l}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.conf} CONFIDENCE</div>
            </div>
            <div className="v2-mono" style={{fontSize:14, fontWeight:700, textAlign:'right'}}>{r.qty}</div>
          </div>
        ))}
      </div>

      <div style={{padding:'14px 20px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>REVIEW 2</button>
        <button className="v2-btn primary" style={{flex:2}}>ACCEPT DRAFT</button>
      </div>
    </div>
  );
}

// =====================================================================
// 13 · CROSS-SHEET REFERENCE · callout jump
// =====================================================================
function V2EstSheetRef() {
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>AI · CROSS-LINKED</div>
          <div className="v2-appbar-title" style={{marginTop:4}}>A-201 EAST</div>
        </div>
      </div>

      {/* Drawing with hotspots */}
      <div style={{flex:1, background:'var(--v2-sand-soft)', position:'relative', overflow:'hidden'}}>
        <svg viewBox="0 0 320 380" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs><pattern id="ref-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" stroke="#C8C0AC" strokeWidth="0.5" fill="none"/></pattern></defs>
          <rect width="320" height="380" fill="url(#ref-grid)"/>
          {/* East elevation drawing */}
          <rect x="30" y="60" width="260" height="220" fill="none" stroke="#0F0E0C" strokeWidth="3"/>
          {/* Roof */}
          <polygon points="30,60 290,60 250,30 70,30" fill="none" stroke="#0F0E0C" strokeWidth="3"/>
          {/* Windows */}
          <rect x="60" y="100" width="40" height="50" fill="none" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="140" y="100" width="40" height="50" fill="none" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="220" y="100" width="40" height="50" fill="none" stroke="#0F0E0C" strokeWidth="2"/>
          {/* Door */}
          <rect x="140" y="180" width="40" height="100" fill="none" stroke="#0F0E0C" strokeWidth="2"/>

          {/* Cross-sheet hotspots (clickable callouts) */}
          <g>
            <circle cx="60" cy="50" r="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2.5"/>
            <text x="60" y="55" fontFamily="JetBrains Mono" fontSize="10" fontWeight="800" textAnchor="middle" fill="#0F0E0C">A1</text>
          </g>
          <g>
            <circle cx="160" cy="125" r="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2.5"/>
            <text x="160" y="130" fontFamily="JetBrains Mono" fontSize="10" fontWeight="800" textAnchor="middle" fill="#0F0E0C">B3</text>
          </g>
          <g>
            <circle cx="260" cy="125" r="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2.5"/>
            <text x="260" y="130" fontFamily="JetBrains Mono" fontSize="10" fontWeight="800" textAnchor="middle" fill="#0F0E0C">B3</text>
          </g>
        </svg>

        {/* Active jump tooltip */}
        <div style={{position:'absolute', top:96, left:180, padding:'8px 12px', background:'var(--v2-ink)', color:'var(--v2-sand)', border:'2px solid var(--v2-ink)', boxShadow:'4px 4px 0 var(--v2-sand-2)'}}>
          <div className="v2-mono" style={{fontSize:9, color:'var(--v2-accent)', fontWeight:700, letterSpacing:'0.06em'}}>JUMPS TO</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14, marginTop:2}}>A-501 · DETAIL B3</div>
        </div>
      </div>

      <div style={{padding:'14px 20px', borderTop:'2px solid var(--v2-ink)', background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', gap:12}}>
        <span className="v2-eyebrow" style={{color:'var(--v2-accent)'}}>● 8 CALLOUTS LINKED</span>
        <span className="v2-mono" style={{flex:1, color:'var(--v2-ink-4)', fontSize:11, fontWeight:600}}>TAP A CIRCLE TO JUMP</span>
      </div>

      <div style={{padding:'12px 20px 16px'}}>
        <button className="v2-btn ghost">BACK TO A-201</button>
      </div>
    </div>
  );
}

// =====================================================================
// 14 · QUANTITIES SUMMARY · takeoff result
// =====================================================================
function V2EstSummary() {
  const items = [
    { l:'EPS BOARD · 2"',     qty:'4,785', unit:'SF', sheets:'A-201–203' },
    { l:'BASECOAT · POLYMER', qty:'4,785', unit:'SF', sheets:'A-201–203' },
    { l:'FINISH · ACRYLIC',   qty:'4,785', unit:'SF', sheets:'A-201–203' },
    { l:'STONE VENEER',       qty:'420',   unit:'SF', sheets:'A-201, 204' },
    { l:'SEALANT JOINT',      qty:'320',   unit:'LF', sheets:'A-201–204' },
    { l:'DIFFUSER · 24"',     qty:'214',   unit:'EA', sheets:'M-101–104' },
    { l:'PARAPET FLASHING',   qty:'180',   unit:'LF', sheets:'A-501' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SUMMARY · HILLCREST PH4</div>
          <div className="v2-appbar-title">QUANTITIES</div>
        </div>
        <button className="v2-iconbtn">⇪</button>
      </div>

      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">TOTAL LINE ITEMS</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:72, lineHeight:0.9, letterSpacing:'-0.035em', marginTop:8, fontVariantNumeric:'tabular-nums'}}>7</div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600}}>22 SHEETS · ALL VERIFIED ✓ · READY FOR ESTIMATE</div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {items.map((it, i) => (
          <div key={i} style={{padding:'16px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:14}}>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{it.l}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{it.sheets}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:22, fontVariantNumeric:'tabular-nums', lineHeight:1}}>{it.qty}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:700}}>{it.unit}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{padding:'16px 20px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>EDIT</button>
        <button className="v2-btn primary" style={{flex:2}}>GENERATE PDF</button>
      </div>
    </div>
  );
}

// =====================================================================
// 15 · PDF DELIVERABLE PREVIEW
// =====================================================================
function V2EstPdfPreview() {
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">DELIVERABLE · PDF</div>
          <div className="v2-appbar-title">HILLCREST-PH4-TO.PDF</div>
        </div>
      </div>

      {/* Content mode toggle */}
      <div style={{display:'flex', borderBottom:'2px solid var(--v2-ink)'}}>
        {[{l:'PLAN ONLY'},{l:'WITH TAKEOFF', on:true},{l:'CURRENT VIEW'}].map((t, i, arr) => (
          <button key={t.l} style={{flex:1, padding:'12px 0', background: t.on ? 'var(--v2-accent)' : 'transparent', color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', border:'none', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:t.on ? 700 : 600, letterSpacing:'0.06em'}}>{t.l}</button>
        ))}
      </div>

      {/* PDF preview surface */}
      <div style={{flex:1, background:'#2E2A23', padding:'24px 20px', display:'flex', justifyContent:'center', alignItems:'flex-start', overflow:'auto'}}>
        <div style={{width:'100%', maxWidth:240, background:'#fff', border:'2px solid var(--v2-ink)', boxShadow:'8px 8px 0 var(--v2-sand-2)'}}>
          <div style={{padding:'14px', borderBottom:'2px solid var(--v2-ink)'}}>
            <div style={{fontFamily:'JetBrains Mono', fontSize:8, fontWeight:700, color:'#0F0E0C'}}>HILLCREST MEWS PHASE 4 · TAKEOFF</div>
            <div style={{fontFamily:'Inter Tight', fontWeight:800, fontSize:14, marginTop:4, color:'#0F0E0C'}}>QUANTITIES SUMMARY</div>
          </div>
          <div style={{padding:'14px', borderBottom:'1px solid #C8C0AC'}}>
            <svg viewBox="0 0 200 100" width="100%" height="100">
              <rect width="200" height="100" fill="#F4EFE3"/>
              <rect x="20" y="20" width="160" height="60" fill="rgba(255,212,0,0.4)" stroke="#0F0E0C" strokeWidth="1"/>
              <text x="100" y="55" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" fontWeight="700">4,785 SF · EPS</text>
            </svg>
          </div>
          <div style={{padding:'10px 14px'}}>
            {['EPS · 4,785 SF','BASECOAT · 4,785 SF','FINISH · 4,785 SF','STONE · 420 SF'].map((r, i) => (
              <div key={i} style={{fontFamily:'JetBrains Mono', fontSize:8, padding:'4px 0', borderBottom:'1px dashed #C8C0AC', color:'#0F0E0C'}}>{r}</div>
            ))}
          </div>
          <div style={{padding:'8px 14px', background:'#FFD400', color:'#1F1900', fontFamily:'Inter', fontSize:8, fontWeight:700}}>
            DAVIS STUCCO LLC · 5/26/26
          </div>
        </div>
      </div>

      <div style={{padding:'14px 20px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>DOWNLOAD</button>
        <button className="v2-btn primary" style={{flex:2}}>SEND TO CLIENT</button>
      </div>
    </div>
  );
}

// =====================================================================
// 16 · SEND TO CLIENT · attach + share link
// =====================================================================
function V2EstSendClient() {
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">✕</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SHARE</div>
          <div className="v2-appbar-title">SEND TO CLIENT</div>
        </div>
      </div>

      {/* Client card */}
      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)', display:'flex', gap:14, alignItems:'center'}}>
        <div style={{width:52, height:52, background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18, flexShrink:0}}>JM</div>
        <div style={{flex:1}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>CLIENT</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:18, marginTop:2}}>JOHN MARCHETTI</div>
          <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:2, fontWeight:600}}>HILLCREST HOMES CO</div>
        </div>
      </div>

      {/* Deliverable card */}
      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>ATTACHING</div>
        <div style={{marginTop:8, padding:'12px 14px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:44, height:52, background:'#fff', border:'2px solid var(--v2-ink)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0}}>
            <div className="v2-mono" style={{fontSize:8, fontWeight:800}}>PDF</div>
          </div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>HILLCREST-PH4-TO.PDF</div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>2.1 MB · 7 LINE ITEMS</div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div style={{padding:'18px 20px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>NOTE (OPTIONAL)</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', minHeight:80, fontSize:14, lineHeight:1.45, color:'var(--v2-ink)'}}>
          John — takeoff finished for Phase 4. 7 line items, all sheets verified. Estimate to follow.<span style={{display:'inline-block', width:2, height:14, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:1}}/>
        </div>
      </div>

      <div style={{padding:'12px 20px', background:'var(--v2-sand-soft)', borderTop:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.45}}>
          ➜ Generates a private share link. Auto-attaches the deliverable to John's profile.
        </div>
      </div>

      <div style={{padding:'14px 20px 18px'}}>
        <button className="v2-btn primary">SEND · NOTIFY JOHN</button>
      </div>
    </div>
  );
}

// =====================================================================
// 17 · CLIENT PROFILE · DEPRECATED
// Estimator now deep-links into V2ClientProfile (cross-role canonical)
// with ?tab=takeoffs. Keeping a shim here so any legacy callers still
// render the canonical profile instead of a divergent estimator copy.
// =====================================================================
function V2EstClientProfile() {
  if (typeof window !== 'undefined' && window.V2ClientProfile) {
    const Canonical = window.V2ClientProfile;
    return <Canonical tab="takeoffs"/>;
  }
  return _V2EstClientProfileLegacy();
}
function _V2EstClientProfileLegacy() {
  const projects = [
    { name:'HILLCREST MEWS PH 4', state:'TO SENT',    deliv:'2 DAYS AGO' },
    { name:'HILLCREST MEWS PH 3', state:'BID WON',    deliv:'$184K · MAR' },
    { name:'HILLCREST MEWS PH 2', state:'COMPLETE',   deliv:'$152K · 2024' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2EstStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">CLIENT PROFILE</div>
          <div className="v2-appbar-title">JOHN MARCHETTI</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      {/* Hero */}
      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{width:72, height:72, background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:26}}>JM</div>
        <h2 className="v2-h2" style={{marginTop:14}}>John Marchetti</h2>
        <div className="v2-mono" style={{marginTop:6, color:'var(--v2-ink-2)', fontWeight:600}}>HILLCREST HOMES CO · CLIENT SINCE 2023</div>
      </div>

      {/* KPI strip */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'16px 14px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>PROJECTS</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1, fontVariantNumeric:'tabular-nums'}}>4</div>
        </div>
        <div style={{padding:'16px 14px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>BID WON</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1, fontVariantNumeric:'tabular-nums', color:'var(--v2-good)'}}>$524K</div>
        </div>
        <div style={{padding:'16px 14px'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>WIN RATE</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1, fontVariantNumeric:'tabular-nums'}}>75<span style={{fontSize:18, color:'var(--v2-ink-3)'}}>%</span></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex', borderBottom:'2px solid var(--v2-ink)'}}>
        {[{l:'PROJECTS · 4', on:true},{l:'TAKEOFFS · 6'},{l:'CONTACT'}].map((t, i, arr) => (
          <button key={t.l} style={{flex:1, padding:'14px 0', background: t.on ? 'var(--v2-accent)' : 'transparent', color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', border:'none', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:t.on ? 700 : 600, letterSpacing:'0.06em'}}>{t.l}</button>
        ))}
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {projects.map((p, i) => (
          <div key={i} style={{padding:'16px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:14}}>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{p.name}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{p.deliv}</div>
            </div>
            <span style={{padding:'4px 8px', background:'var(--v2-ink)', color:'var(--v2-sand)', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.06em'}}>{p.state}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  V2EstTabs, V2EstStatusBar,
  V2EstHome, V2EstNewProject,
  V2EstPlanIngest, V2EstSheetNav,
  V2EstScaleManual, V2EstScaleAuto,
  V2EstCanvasManual, V2EstCanvasAutoDetect,
  V2EstItemPicker, V2EstItemAttached,
  V2EstAutoCountReview, V2EstAutoTakeoffReview,
  V2EstSheetRef, V2EstSummary,
  V2EstPdfPreview, V2EstSendClient,
  V2EstClientProfile,
});
