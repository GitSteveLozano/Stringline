/* global React */

// ============================================================
// WORKER SECTION · v2 propagation
// Industrial brutalist · sand + ink + hi-vis yellow
// 16px min body · 56px tap targets · big numbers · imperatives
// ============================================================

// Shared bottom nav (4 tabs · dark variant)
function V2WorkerTabs({ active = 'today' }) {
  const tabs = [
    { id:'today', l:'TODAY' },
    { id:'scope', l:'SCOPE' },
    { id:'hours', l:'HOURS' },
    { id:'log',   l:'LOG' },
  ];
  return (
    <div className="v2-bottombar">
      {tabs.map(t => (
        <button key={t.id} className={'v2-bottombar-tab' + (t.id === active ? ' active' : '')}>{t.l}</button>
      ))}
    </div>
  );
}

// Mock status bar (dark or light)
function V2StatusBar({ time = '9:41', dark }) {
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

// ─── 1 · WORKER TODAY ────────────────────────────────────────
function V2WorkerToday() {
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar dark/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">CREW · MARCUS</div>
          <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>MON · APR 28</div>
        </div>
        <button className="v2-iconbtn accent">!</button>
      </div>

      <div className="v2-pad v2-flex-1" style={{display:'flex', flexDirection:'column', gap:20}}>
        <div>
          <div className="v2-eyebrow accent">ON SITE · HILLCREST</div>
          <div className="v2-h3" style={{marginTop:10, color:'var(--v2-sand)'}}>EPS · East elevation</div>
        </div>

        <div className="v2-status-block">
          <div className="v2-eyebrow" style={{color:'var(--v2-sand-2)'}}>CLOCKED IN</div>
          <div className="v2-bignum" style={{fontSize:96, color:'var(--v2-sand)', marginTop:8}}>4:24</div>
          <div className="v2-mono" style={{color:'var(--v2-ink-4)', marginTop:8, fontSize:11}}>Started 7:02 AM</div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, border:'2px solid var(--v2-sand-2)'}}>
          <button className="v2-btn ghost" style={{border:'none', borderRight:'2px solid var(--v2-sand-2)', minHeight:64}}>BREAK</button>
          <button className="v2-btn danger" style={{border:'none', minHeight:64}}>CLOCK OUT</button>
        </div>
      </div>

      <V2WorkerTabs active="today"/>
    </div>
  );
}

// ─── 2 · WORKER CLOCK-IN SUCCESS ─────────────────────────────
function V2WorkerClockInSuccess() {
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar time="7:02" dark/>
      <div style={{padding:'32px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-accent)'}}>YOU'RE ON SITE</div>
        <div className="v2-bignum" style={{fontSize:72, color:'var(--v2-sand)', marginTop:14, lineHeight:0.9}}>Clocked<br/>in.</div>
      </div>

      <div style={{margin:'24px 20px', height:220, border:'2px solid var(--v2-sand-2)', background:'var(--v2-ink-2)', position:'relative', overflow:'hidden'}}>
        <svg viewBox="0 0 280 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="gridd" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" stroke="#3A3528" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="280" height="220" fill="url(#gridd)"/>
          <path d="M0 100 L280 80" stroke="#3A3528" strokeWidth="14"/>
          <path d="M180 0 L165 220" stroke="#3A3528" strokeWidth="10"/>
          <rect x="50" y="120" width="50" height="40" fill="#3A3528" stroke="#5F584C" strokeWidth="1"/>
          <rect x="200" y="100" width="46" height="40" fill="#3A3528" stroke="#5F584C" strokeWidth="1"/>
          <rect x="90" y="80" width="100" height="100" fill="none" stroke="#FFD400" strokeWidth="2" strokeDasharray="4 4"/>
          <circle cx="140" cy="130" r="28" fill="#FFD400" opacity="0.25"/>
          <rect x="132" y="122" width="16" height="16" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          <text x="200" y="195" fontFamily="JetBrains Mono" fontSize="9" fill="#FFD400" fontWeight="600">HILLCREST · 150ft</text>
        </svg>
      </div>

      <div style={{padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', borderTop:'2px solid var(--v2-sand-2)', borderBottom:'2px solid var(--v2-sand-2)'}}>
        <div style={{padding:'14px 0', borderRight:'1px solid var(--v2-ink-2)'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)', fontSize:10}}>SCOPE</div>
          <div className="v2-mono" style={{marginTop:4, fontWeight:600, color:'var(--v2-sand)'}}>EPS · E</div>
        </div>
        <div style={{padding:'14px 14px', borderRight:'1px solid var(--v2-ink-2)'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)', fontSize:10}}>RATE</div>
          <div className="v2-mono" style={{marginTop:4, fontWeight:600, color:'var(--v2-sand)'}}>$28/h</div>
        </div>
        <div style={{padding:'14px 0 14px 14px'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)', fontSize:10}}>CREW</div>
          <div className="v2-mono" style={{marginTop:4, fontWeight:600, color:'var(--v2-sand)'}}>3 OF 3</div>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'20px 20px 24px'}}>
        <button className="v2-btn primary">SEE TODAY'S SCOPE</button>
      </div>
    </div>
  );
}

// ─── 3 · WORKER SCOPE TODAY ──────────────────────────────────
function V2WorkerScopeToday() {
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar time="11:08" dark/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SCOPE · TODAY</div>
          <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>EPS · EAST ELEV.</div>
        </div>
      </div>

      {/* Goal slab */}
      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-sand-2)'}}>
        <div className="v2-eyebrow accent" style={{display:'inline-block'}}>FROM ANA · 6:42 AM</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:24, lineHeight:1.1, letterSpacing:'-0.015em', marginTop:12, color:'var(--v2-sand)'}}>
          Anchor + plate east wall, top to bottom. Leave the cornice for tomorrow.
        </div>
      </div>

      {/* Progress slab */}
      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-sand-2)', background:'var(--v2-ink-2)'}}>
        <div className="v2-row-spread">
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>720 SF DONE</div>
          <div className="v2-mono" style={{color:'var(--v2-accent)', fontWeight:700}}>56% TODAY</div>
        </div>
        <div style={{height:8, background:'var(--v2-ink)', marginTop:10}}>
          <div style={{width:'56%', height:'100%', background:'var(--v2-accent)'}}/>
        </div>
      </div>

      {/* Steps */}
      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {[
          { n:'EPS BOARDS · 24 SHEETS', t:'7:00 → 9:30', state:'done' },
          { n:'PLATE FASTENERS · 620', t:'9:30 → 11:00', state:'done' },
          { n:'MESH + CORNER BEAD', t:'NOW → 14:00', state:'active' },
          { n:'CLEANUP + COVER', t:'14:30 → 15:00', state:'queued' },
        ].map((s, i) => (
          <div key={i} style={{
            padding:'16px 20px', display:'flex', alignItems:'center', gap:14,
            borderBottom:'1px solid var(--v2-ink-2)',
            background: s.state === 'active' ? 'var(--v2-accent)' : 'transparent',
            color: s.state === 'active' ? 'var(--v2-accent-ink)' : 'var(--v2-sand)',
          }}>
            <div style={{
              width:36, height:36,
              background: s.state === 'done' ? 'var(--v2-good)' : s.state === 'active' ? 'var(--v2-ink)' : 'transparent',
              color: s.state === 'queued' ? 'var(--v2-ink-4)' : '#fff',
              border: s.state === 'queued' ? '2px solid var(--v2-sand-2)' : '2px solid var(--v2-ink)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:16,
            }}>
              {s.state === 'done' ? '✓' : i+1}
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:600, fontSize:15, letterSpacing:'-0.005em'}}>{s.n}</div>
              <div className="v2-mono" style={{marginTop:3, color: s.state === 'active' ? 'var(--v2-accent-ink)' : 'var(--v2-ink-4)', fontWeight:600}}>{s.t}</div>
            </div>
            {s.state === 'active' && <div className="v2-mono" style={{fontWeight:800, color:'var(--v2-accent-ink)'}}>NOW</div>}
          </div>
        ))}
      </div>

      {/* Materials note */}
      <div style={{padding:'14px 20px', borderTop:'2px solid var(--v2-sand-2)', background:'var(--v2-ink)', display:'flex', alignItems:'center', gap:10}}>
        <span style={{width:8, height:8, background:'var(--v2-good)'}}/>
        <div className="v2-mono" style={{flex:1, color:'var(--v2-sand)', fontWeight:600, textTransform:'uppercase', fontSize:11}}>MATERIALS STAGED · SOUTH GATE</div>
      </div>

      <V2WorkerTabs active="scope"/>
    </div>
  );
}

// ─── 4 · WORKER HOURS WEEK ───────────────────────────────────
function V2WorkerHoursWeek() {
  const days = [
    { d:'M', h:8.2 }, { d:'T', h:8.0 }, { d:'W', h:8.4 }, { d:'T', h:4.4, today:true },
    { d:'F', h:0, planned:8 }, { d:'S', h:0 }, { d:'S', h:0 },
  ];
  const max = 10;
  return (
    <div className="v2 v2-screen">
      <V2StatusBar time="2:14"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">WEEK · APR 27 → MAY 3</div>
          <div className="v2-appbar-title">MY HOURS</div>
        </div>
      </div>

      {/* Hero number */}
      <div style={{padding:'24px 20px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">HOURS SO FAR</div>
        <div className="v2-bignum" style={{fontSize:96, marginTop:10}}>29.0<span className="unit">H</span></div>
        <div className="v2-mono" style={{marginTop:8, fontWeight:600, color:'var(--v2-ink-2)'}}>
          $1,108 GROSS · ~$875 TAKE-HOME
        </div>
      </div>

      {/* Bar chart */}
      <div style={{padding:'24px 20px 16px', display:'flex', alignItems:'flex-end', gap:10, height:160}}>
        {days.map((d, i) => {
          const h = (d.h / max) * 110;
          const planH = d.planned ? (d.planned / max) * 110 : 0;
          return (
            <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:8, height:'100%'}}>
              <div style={{flex:1, width:'100%', display:'flex', alignItems:'flex-end', justifyContent:'center', position:'relative'}}>
                {planH > 0 && <div style={{width:'80%', height:planH, border:'2px dashed var(--v2-line-soft)', position:'absolute', bottom:0}}/>}
                {h > 0 && (
                  <div style={{
                    width:'80%', height:h,
                    background: d.today ? 'var(--v2-accent)' : 'var(--v2-ink)',
                    position:'relative',
                  }}>
                    {d.today && (
                      <div style={{
                        position:'absolute', top:-22, left:'50%', transform:'translateX(-50%)',
                        fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700,
                        color:'var(--v2-ink)',
                      }}>{d.h}</div>
                    )}
                  </div>
                )}
              </div>
              <div className="v2-mono" style={{fontSize:11, fontWeight: d.today ? 700 : 500, color: d.today ? 'var(--v2-ink)' : 'var(--v2-ink-3)'}}>{d.d}</div>
            </div>
          );
        })}
      </div>

      {/* Entries */}
      <div className="v2-section-bar">
        <div className="v2-eyebrow">ENTRIES</div>
        <div className="v2-mono" style={{fontWeight:600}}>4</div>
      </div>
      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {[
          { d:'THU APR 30', s:'7:04', e:'IN PROGRESS', h:'4:24', live:true },
          { d:'WED APR 29', s:'7:02', e:'15:14', h:'8.2' },
          { d:'TUE APR 28', s:'7:00', e:'15:00', h:'8.0' },
          { d:'MON APR 27', s:'7:04', e:'15:28', h:'8.4' },
        ].map(e => (
          <div key={e.d} className="v2-row">
            <div style={{width:6, alignSelf:'stretch', background: e.live ? 'var(--v2-accent)' : 'var(--v2-ink)'}}/>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{e.d}</div>
              <div className="v2-mono" style={{color:'var(--v2-ink-3)', fontWeight:500}}>{e.s} → {e.e}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontSize:22, fontWeight:700, fontVariantNumeric:'tabular-nums', color: e.live ? 'var(--v2-accent-ink)' : 'var(--v2-ink)', background: e.live ? 'var(--v2-accent)' : 'transparent', padding: e.live ? '2px 8px' : 0}}>{e.h}{!e.live && 'h'}</div>
              {e.live && <div className="v2-mono" style={{fontSize:9, color:'var(--v2-ink-3)', fontWeight:700, marginTop:3}}>LIVE</div>}
            </div>
          </div>
        ))}
      </div>

      <V2WorkerTabs active="hours"/>
    </div>
  );
}

// ─── 5 · WORKER ISSUE · 2x3 glove grid ──────────────────────
function V2WorkerIssue() {
  const tiles = [
    { l:'MATL',  s:'Out of materials', tone:'accent', selected:true },
    { l:'TOOL',  s:'Equipment broken', tone:'dark' },
    { l:'STOP',  s:'Safety concern',   tone:'danger' },
    { l:'WX',    s:'Weather hold',     tone:'dark' },
    { l:'?',     s:'Scope question',   tone:'dark' },
    { l:'···',   s:'Other',            tone:'dark' },
  ];
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar time="1:14" dark/>
      <div className="v2-appbar">
        <button className="v2-iconbtn" style={{background:'var(--v2-ink)', color:'var(--v2-sand)', borderColor:'var(--v2-sand)'}}>✕</button>
        <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>FLAG IT</div>
      </div>

      <div style={{padding:'24px 20px 8px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>WHAT'S WRONG</div>
      </div>

      <div style={{padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, borderTop:'2px solid var(--v2-sand-2)', borderLeft:'2px solid var(--v2-sand-2)', borderRight:'2px solid var(--v2-sand-2)'}}>
        {tiles.map((t, i) => {
          const isRight = i % 2 === 1;
          const isLastRow = i >= tiles.length - 2;
          return (
            <button key={t.l} className={'v2-tile ' + t.tone} style={{
              border:'none',
              borderRight: isRight ? 'none' : '2px solid var(--v2-ink)',
              borderBottom: isLastRow ? 'none' : '2px solid var(--v2-sand-2)',
              minHeight: 120,
              cursor:'pointer',
            }}>
              <div style={{fontSize:36, fontWeight:800, fontFamily:'var(--v2-font-tight)', lineHeight:1, color: t.tone === 'accent' ? 'var(--v2-accent-ink)' : t.tone === 'danger' ? '#fff' : 'var(--v2-sand)'}}>{t.l}</div>
              <div style={{fontSize:13, fontWeight:600, marginTop:'auto', color: t.tone === 'accent' ? 'var(--v2-accent-ink)' : t.tone === 'danger' ? '#fff' : 'var(--v2-ink-4)'}}>{t.s}</div>
            </button>
          );
        })}
      </div>

      <div style={{padding:'20px'}}>
        <div className="v2-mono" style={{color:'var(--v2-ink-4)', fontSize:12}}>
          SELECTED · MATL · ANA GETS THE PING
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'0 20px 24px'}}>
        <button className="v2-btn primary">SEND TO ANA</button>
      </div>
    </div>
  );
}

// ─── 6 · WORKER LOG PHOTO ────────────────────────────────────
function V2WorkerLogPhoto() {
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar time="3:08" dark/>
      <div className="v2-appbar">
        <button className="v2-iconbtn" style={{background:'var(--v2-ink)', color:'var(--v2-sand)', borderColor:'var(--v2-sand)'}}>✕</button>
        <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>NEW PHOTO</div>
      </div>

      {/* photo area · fake wall */}
      <div style={{flex:1, position:'relative', overflow:'hidden', borderBottom:'2px solid var(--v2-sand-2)'}}>
        <svg viewBox="0 0 320 380" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect width="320" height="380" fill="#a89070"/>
          <rect x="0" y="0" width="320" height="240" fill="#e8a86b"/>
          <line x1="80" y1="0" x2="80" y2="240" stroke="#A05A33" strokeWidth="2" opacity="0.4"/>
          <line x1="160" y1="0" x2="160" y2="240" stroke="#A05A33" strokeWidth="2" opacity="0.4"/>
          <line x1="240" y1="0" x2="240" y2="240" stroke="#A05A33" strokeWidth="2" opacity="0.4"/>
          <rect x="0" y="240" width="320" height="20" fill="#5f584c"/>
        </svg>

        {/* Hi-vis auto-tag */}
        <div style={{position:'absolute', top:16, left:16, right:16, padding:'12px 14px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', display:'flex', alignItems:'center', gap:10, border:'2px solid var(--v2-ink)'}}>
          <div style={{width:12, height:12, background:'var(--v2-ink)', flexShrink:0}}/>
          <div style={{flex:1}}>
            <div className="v2-mono" style={{fontWeight:700, fontSize:10, letterSpacing:'0.08em'}}>AUTO-TAGGED</div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15, marginTop:2}}>EPS · East elevation</div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div style={{padding:'14px 20px 8px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>NOTE (OPTIONAL)</div>
        <div style={{marginTop:8, padding:'12px 14px', background:'var(--v2-ink-2)', border:'2px solid var(--v2-sand-2)', minHeight:56, color:'var(--v2-sand)', fontSize:14, lineHeight:1.45}}>
          Finished anchoring east wall — ~80% done with EPS today<span style={{display:'inline-block', width:2, height:14, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:2}}/>
        </div>
      </div>

      <div style={{padding:'12px 20px 20px', display:'flex', gap:10}}>
        <button className="v2-iconbtn" style={{background:'var(--v2-ink)', color:'var(--v2-sand)', borderColor:'var(--v2-sand)', width:56, height:56}}>♪</button>
        <button className="v2-btn primary" style={{flex:1}}>SAVE TO LOG</button>
      </div>
    </div>
  );
}

// ─── 7 · CLOCK OUT SUCCESS ───────────────────────────────────
function V2WorkerClockOutSuccess() {
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar time="3:32" dark/>
      <div style={{padding:'40px 20px 24px', textAlign:'center', borderBottom:'2px solid var(--v2-sand-2)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-accent)'}}>TODAY · HILLCREST</div>
        <div className="v2-bignum" style={{fontSize:110, color:'var(--v2-sand)', marginTop:14}}>8.5<span className="unit" style={{color:'var(--v2-ink-4)'}}>H</span></div>
        <div className="v2-mono" style={{color:'var(--v2-ink-4)', marginTop:10, fontWeight:600}}>7:02 → 3:32 · 30 MIN LUNCH</div>
        <div style={{display:'inline-block', marginTop:18, padding:'6px 14px', background:'var(--v2-good)', color:'#fff'}}>
          <span className="v2-mono" style={{fontWeight:700, letterSpacing:'0.06em'}}>✓ CLOCKED OUT</span>
        </div>
      </div>

      <div style={{padding:'20px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:0, border:'2px solid var(--v2-sand-2)', margin:'20px'}}>
        <div style={{padding:'14px', borderRight:'2px solid var(--v2-sand-2)'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)', fontSize:10}}>PHOTOS</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, color:'var(--v2-sand)'}}>8</div>
        </div>
        <div style={{padding:'14px', borderRight:'2px solid var(--v2-sand-2)'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)', fontSize:10}}>STEPS</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, color:'var(--v2-good)'}}>3/4</div>
        </div>
        <div style={{padding:'14px'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)', fontSize:10}}>GROSS</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, color:'var(--v2-sand)'}}>$238</div>
        </div>
      </div>

      <div style={{padding:'0 20px 16px'}}>
        <div style={{padding:'14px 16px', border:'2px dashed var(--v2-sand-2)', display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:8, height:8, background:'var(--v2-warn)'}}/>
          <div className="v2-mono" style={{flex:1, color:'var(--v2-ink-4)', fontWeight:600, fontSize:11}}>ANYTHING TO FLAG BEFORE YOU LEAVE?</div>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'0 20px 24px'}}>
        <button className="v2-btn primary">SEE YOU TOMORROW · 7 AM</button>
      </div>
    </div>
  );
}

// ─── 8 · MANUAL CLOCK-IN FALLBACK ────────────────────────────
function V2WorkerClockInManual() {
  const projects = [
    { l:'HILLCREST MEWS', s:'PHASE 4 · YOUR USUAL', d:'2.1 MI', selected:true },
    { l:'ASPEN RIDGE',    s:'PHASE 1',              d:'8.4 MI' },
    { l:'GREENWILLOW',    s:'DAY 1',                d:'12 MI' },
  ];
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar time="7:14" dark/>
      <div className="v2-appbar">
        <button className="v2-iconbtn" style={{background:'var(--v2-ink)', color:'var(--v2-sand)', borderColor:'var(--v2-sand)'}}>✕</button>
        <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>MANUAL CLOCK-IN</div>
      </div>

      {/* Reason banner */}
      <div style={{margin:'16px 20px 0', padding:'14px', border:'2px solid var(--v2-warn)', background:'var(--v2-ink-2)', display:'flex', gap:12, alignItems:'flex-start'}}>
        <div style={{width:24, height:24, background:'var(--v2-warn)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, flexShrink:0}}>!</div>
        <div style={{flex:1}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-warn)'}}>AUTO CLOCK-IN MISSED</div>
          <div style={{fontSize:14, marginTop:6, lineHeight:1.45, color:'var(--v2-sand)'}}>GPS still warming up or you're outside the fence. Ana reviews this entry.</div>
        </div>
      </div>

      {/* Project picker */}
      <div style={{padding:'20px 20px 8px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>WHERE ARE YOU?</div>
      </div>
      <div style={{padding:'0 20px', display:'flex', flexDirection:'column', gap:0, border:'2px solid var(--v2-sand-2)'}}>
        {projects.map((p, i) => (
          <button key={p.l} style={{
            padding:'18px 16px', display:'flex', alignItems:'center', gap:12,
            background: p.selected ? 'var(--v2-accent)' : 'transparent',
            color: p.selected ? 'var(--v2-accent-ink)' : 'var(--v2-sand)',
            border:'none', borderBottom: i < projects.length-1 ? '2px solid var(--v2-sand-2)' : 'none',
            fontFamily:'var(--v2-font)', cursor:'pointer', textAlign:'left',
          }}>
            <div style={{width:18, height:18, border:'2px solid', borderColor: p.selected ? 'var(--v2-accent-ink)' : 'var(--v2-sand-2)', background: p.selected ? 'var(--v2-accent-ink)' : 'transparent', flexShrink:0}}>
              {p.selected && <div style={{width:'100%', height:'100%', background:'var(--v2-accent-ink)'}}/>}
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16, letterSpacing:'-0.01em'}}>{p.l}</div>
              <div className="v2-mono" style={{fontSize:10, marginTop:3, fontWeight:600, opacity:0.75}}>{p.s}</div>
            </div>
            <div className="v2-mono" style={{fontWeight:700, fontSize:12}}>{p.d}</div>
          </button>
        ))}
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>WHY MANUAL?</div>
        <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:10}}>
          {['Early', 'No GPS', 'Outside', 'Other'].map((r, i) => (
            <button key={r} style={{
              padding:'8px 14px', fontFamily:'var(--v2-font-mono)', fontWeight: i === 1 ? 700 : 600, fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase',
              background: i === 1 ? 'var(--v2-accent)' : 'transparent', color: i === 1 ? 'var(--v2-accent-ink)' : 'var(--v2-sand)',
              border: '2px solid', borderColor: i === 1 ? 'var(--v2-accent-ink)' : 'var(--v2-sand-2)',
              cursor:'pointer',
            }}>{r}</button>
          ))}
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'20px', borderTop:'2px solid var(--v2-sand-2)'}}>
        <button className="v2-btn primary">CLOCK IN · HILLCREST · 7:14 AM</button>
        <div className="v2-mono" style={{marginTop:10, textAlign:'center', color:'var(--v2-ink-4)', fontSize:11, fontWeight:500}}>
          ANA GETS A PING TO APPROVE
        </div>
      </div>
    </div>
  );
}

// ─── 1B · TODAY · PRE CLOCK-IN (off-site, scheduled job shown) ────
function V2WorkerTodayPreClockIn() {
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar time="6:38" dark/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">CREW · MARCUS</div>
          <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>MON · APR 28</div>
        </div>
        <button className="v2-iconbtn accent">!</button>
      </div>

      <div className="v2-pad v2-flex-1" style={{display:'flex', flexDirection:'column', gap:20}}>
        <div>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>SCHEDULED · 7:00 AM</div>
          <div className="v2-h3" style={{marginTop:10, color:'var(--v2-sand)'}}>Hillcrest · EPS East</div>
        </div>

        <div className="v2-status-block">
          <div className="v2-eyebrow" style={{color:'var(--v2-sand-2)'}}>NOT CLOCKED IN</div>
          <div className="v2-bignum" style={{fontSize:80, color:'var(--v2-sand)', marginTop:8}}>—:——</div>
          <div className="v2-mono" style={{color:'var(--v2-ink-4)', marginTop:10, fontSize:11, fontWeight:600}}>WALK TO SITE · 0.4 MI AWAY</div>
        </div>

        <div style={{padding:'14px 16px', border:'2px dashed var(--v2-sand-2)', display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:8, height:8, background:'var(--v2-warn)'}}/>
          <div className="v2-mono" style={{flex:1, color:'var(--v2-ink-4)', fontSize:11, fontWeight:600}}>AUTO CLOCK-IN ON ARRIVAL</div>
        </div>

        <button className="v2-btn ghost" style={{minHeight:64}}>CLOCK IN MANUALLY</button>
      </div>

      <V2WorkerTabs active="today"/>
    </div>
  );
}

// ─── 1C · TODAY · CLOCKED OUT for the day ─────────────────────
function V2WorkerTodayOff() {
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar time="4:14" dark/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">CREW · MARCUS</div>
          <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>MON · APR 28</div>
        </div>
        <button className="v2-iconbtn accent">!</button>
      </div>

      <div className="v2-pad v2-flex-1" style={{display:'flex', flexDirection:'column', gap:20}}>
        {/* Day done banner */}
        <div style={{padding:'8px 12px', background:'var(--v2-good)', color:'#fff', display:'flex', alignItems:'center', gap:10}}>
          <span style={{width:10, height:10, background:'#fff'}}/>
          <div className="v2-mono" style={{fontWeight:700, fontSize:11, letterSpacing:'0.06em'}}>DAY COMPLETE · SEE YOU TOMORROW</div>
        </div>

        <div>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>HILLCREST · EPS EAST</div>
          <div className="v2-h3" style={{marginTop:10, color:'var(--v2-sand)'}}>You wrapped up clean.</div>
        </div>

        <div className="v2-status-block">
          <div className="v2-eyebrow" style={{color:'var(--v2-sand-2)'}}>TODAY · LOGGED</div>
          <div className="v2-bignum" style={{fontSize:96, color:'var(--v2-sand)', marginTop:8}}>8.5<span className="unit" style={{color:'var(--v2-ink-4)'}}>H</span></div>
          <div className="v2-mono" style={{color:'var(--v2-ink-4)', marginTop:8, fontSize:11, fontWeight:600}}>7:02 AM → 3:32 PM</div>
        </div>

        {/* Tomorrow preview */}
        <div style={{padding:'14px 16px', border:'2px solid var(--v2-sand-2)'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>TOMORROW</div>
          <div className="v2-row-spread" style={{marginTop:10}}>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:18, color:'var(--v2-sand)'}}>Hillcrest · 7 AM</div>
            <div className="v2-mono" style={{color:'var(--v2-accent)', fontWeight:700}}>SAME CREW</div>
          </div>
        </div>
      </div>

      <V2WorkerTabs active="today"/>
    </div>
  );
}

// ─── 3B · WORKER SCOPE · DONE state ─────────────────────────
function V2WorkerScopeDone() {
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar time="2:48" dark/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SCOPE · TODAY</div>
          <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>EPS · EAST ELEV.</div>
        </div>
      </div>

      <div style={{padding:'8px 20px 0', background:'var(--v2-good)', color:'#fff'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, padding:'10px 0'}}>
          <span style={{width:10, height:10, background:'#fff'}}/>
          <div className="v2-mono" style={{fontWeight:700, fontSize:11, letterSpacing:'0.06em'}}>SCOPE COMPLETE · ANA NOTIFIED</div>
        </div>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-sand-2)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>1,284 SF DONE</div>
        <div className="v2-bignum" style={{fontSize:84, color:'var(--v2-sand)', marginTop:10}}>100<span className="unit" style={{color:'var(--v2-ink-4)'}}>%</span></div>
        <div style={{height:10, background:'var(--v2-ink)', marginTop:14}}>
          <div style={{width:'100%', height:'100%', background:'var(--v2-good)'}}/>
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {[
          { n:'EPS BOARDS · 24 SHEETS', t:'7:00 → 9:30' },
          { n:'PLATE FASTENERS · 620', t:'9:30 → 11:00' },
          { n:'MESH + CORNER BEAD', t:'11:00 → 14:00' },
          { n:'CLEANUP + COVER', t:'14:30 → 14:48' },
        ].map((s, i) => (
          <div key={i} style={{
            padding:'16px 20px', display:'flex', alignItems:'center', gap:14,
            borderBottom:'1px solid var(--v2-ink-2)',
            opacity: 0.6,
          }}>
            <div style={{width:36, height:36, background:'var(--v2-good)', color:'#fff', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:16}}>✓</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:600, fontSize:15, color:'var(--v2-sand)', textDecoration:'line-through', textDecorationColor:'var(--v2-ink-3)'}}>{s.n}</div>
              <div className="v2-mono" style={{marginTop:3, color:'var(--v2-ink-4)', fontWeight:600}}>{s.t}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{padding:'16px 20px', borderTop:'2px solid var(--v2-sand-2)'}}>
        <button className="v2-btn primary">CLOCK OUT EARLY · WRAPPED UP</button>
      </div>

      <V2WorkerTabs active="scope"/>
    </div>
  );
}

// ─── 5B · WORKER ISSUE · EMPTY state ─────────────────────────
function V2WorkerIssueEmpty() {
  const tiles = [
    { l:'MATL',  s:'Out of materials' },
    { l:'TOOL',  s:'Equipment broken' },
    { l:'STOP',  s:'Safety concern', danger:true },
    { l:'WX',    s:'Weather hold' },
    { l:'?',     s:'Scope question' },
    { l:'···',   s:'Other' },
  ];
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar time="1:14" dark/>
      <div className="v2-appbar">
        <button className="v2-iconbtn" style={{background:'var(--v2-ink)', color:'var(--v2-sand)', borderColor:'var(--v2-sand)'}}>✕</button>
        <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>FLAG IT</div>
      </div>

      <div style={{padding:'24px 20px 8px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>WHAT'S WRONG · PICK ONE</div>
      </div>

      <div style={{padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, borderTop:'2px solid var(--v2-sand-2)', borderLeft:'2px solid var(--v2-sand-2)', borderRight:'2px solid var(--v2-sand-2)'}}>
        {tiles.map((t, i) => {
          const isRight = i % 2 === 1;
          const isLastRow = i >= tiles.length - 2;
          return (
            <button key={t.l} className="v2-tile" style={{
              background: t.danger ? 'var(--v2-bad)' : 'var(--v2-ink)',
              color: t.danger ? '#fff' : 'var(--v2-sand)',
              border:'none',
              borderRight: isRight ? 'none' : '2px solid var(--v2-ink)',
              borderBottom: isLastRow ? 'none' : '2px solid var(--v2-sand-2)',
              minHeight: 120,
              cursor:'pointer',
            }}>
              <div style={{fontSize:36, fontWeight:800, fontFamily:'var(--v2-font-tight)', lineHeight:1, color: t.danger ? '#fff' : 'var(--v2-sand)'}}>{t.l}</div>
              <div style={{fontSize:13, fontWeight:600, marginTop:'auto', color: t.danger ? '#fff' : 'var(--v2-ink-4)'}}>{t.s}</div>
            </button>
          );
        })}
      </div>

      <div style={{padding:'20px'}}>
        <div className="v2-mono" style={{color:'var(--v2-ink-4)', fontSize:12}}>
          NONE SELECTED · TAP A TILE TO PICK
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'0 20px 24px'}}>
        <button className="v2-btn ghost" style={{borderColor:'var(--v2-ink-4)', color:'var(--v2-ink-4)'}}>SEND TO ANA</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  V2WorkerTabs, V2StatusBar,
  V2WorkerToday, V2WorkerTodayPreClockIn, V2WorkerTodayOff,
  V2WorkerClockInSuccess, V2WorkerClockInManual,
  V2WorkerScopeToday, V2WorkerScopeDone, V2WorkerHoursWeek,
  V2WorkerIssue, V2WorkerIssueEmpty, V2WorkerLogPhoto, V2WorkerClockOutSuccess,
});
