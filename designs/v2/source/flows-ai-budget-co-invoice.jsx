/* global React */

// ============================================================
// AUDIT FIXES ROUND 2 · V2 (Section 24)
// Closes the second audit. 17 screens.
// All cuts agreed: AIA bid builder → just price & send.
// Owner project tabs → just budget. Schedule → tap-to-edit.
// ============================================================

function V2Sb({ time = '9:14', dark }) {
  return (
    <div style={{height:32, padding:'10px 18px 0', display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'JetBrains Mono, monospace', fontSize:12, fontWeight:500, flexShrink:0, color: dark ? 'var(--v2-sand)' : 'var(--v2-ink)'}}>
      <span>{time}</span>
      <span style={{display:'flex', gap:6, alignItems:'center'}}>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor"><rect x="0" y="6" width="3" height="4"/><rect x="5" y="4" width="3" height="6"/><rect x="10" y="2" width="3" height="8"/><rect x="15" y="0" width="3" height="10"/></svg>
      </span>
    </div>
  );
}

// =====================================================================
// B1 · PRICE & SEND — margin + sell total + client-detail toggle
// =====================================================================
function V2PriceAndSend() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">HILLCREST PH 4 · BID</div>
          <div className="v2-appbar-title">PRICE &amp; SEND</div>
        </div>
      </div>

      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>YOUR COST · INTERNAL</div>
        <div className="v2-bignum" style={{fontSize:36, marginTop:6, color:'var(--v2-ink-2)'}}>$96<span className="unit">,420</span></div>
        <div className="v2-mono" style={{marginTop:6, color:'var(--v2-ink-3)', fontWeight:600, fontSize:11}}>MATERIALS + LABOR + RENTALS + BURDEN</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">MARGIN</div></div>
      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{display:'flex', alignItems:'baseline', gap:12}}>
          <div className="v2-bignum" style={{fontSize:52, lineHeight:0.9}}>34<span className="unit">%</span></div>
          <div style={{display:'flex', gap:6, marginLeft:'auto'}}>
            <button className="v2-iconbtn">−</button>
            <button className="v2-iconbtn accent">+</button>
          </div>
        </div>
        {/* Slider */}
        <div style={{height:8, background:'var(--v2-ink)', marginTop:18, position:'relative'}}>
          <div style={{position:'absolute', left:'34%', top:-4, width:16, height:16, background:'var(--v2-accent)', border:'2px solid var(--v2-ink)'}}/>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:10}} className="v2-mono">
          <span style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:700}}>0%</span>
          <span style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:700}}>20%</span>
          <span style={{fontSize:10, color:'var(--v2-accent-ink)', background:'var(--v2-accent)', padding:'1px 5px', fontWeight:800}}>34%</span>
          <span style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:700}}>50%</span>
        </div>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-accent)'}}>
        <div className="v2-eyebrow accent" style={{background:'var(--v2-ink)', color:'var(--v2-accent)', display:'inline-block'}}>SELL TOTAL · TO JOHN</div>
        <div className="v2-bignum" style={{fontSize:64, marginTop:12, color:'var(--v2-accent-ink)'}}>$146<span className="unit">,090</span></div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-accent-ink)', fontWeight:600, fontSize:11}}>PROFIT $49,670 · COST $96,420 · ROUNDED UP $90</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">CLIENT SEES</div></div>
      {[
        { l:'QUANTITIES + UNITS', sub:'4,785 SF EPS · 320 LF ETC.', on:true, locked:true },
        { l:'COST BREAKDOWN',     sub:'YOUR MATERIALS + LABOR DOLLARS', on:false },
        { l:'LINE-ITEM PRICES',   sub:'EXTENDED PRICE PER ITEM',       on:false },
        { l:'ONE SELL TOTAL',     sub:'ONLY THE BIG NUMBER',             on:true },
      ].map((r, i) => (
        <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:14}}>
          <div style={{width:24, height:24, background: r.on ? 'var(--v2-accent)' : 'transparent', border:'2px solid var(--v2-ink)', flexShrink:0, opacity: r.locked ? 0.7 : 1}}/>
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{r.l}</div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.sub}{r.locked && ' · ALWAYS ON'}</div>
          </div>
        </div>
      ))}

      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>PREVIEW PDF</button>
        <button className="v2-btn primary" style={{flex:2}}>SEND TO JOHN</button>
      </div>
    </div>
  );
}

// =====================================================================
// A1 · EDIT COMMITTED MEASUREMENT — selected polygon + action bar
// =====================================================================
function V2EditMeasurement() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">A-201 · EAST ELEV.</div>
          <div className="v2-appbar-title">EDIT MEASUREMENT</div>
        </div>
      </div>

      {/* Canvas with selected polygon */}
      <div style={{flex:1, background:'var(--v2-sand-soft)', position:'relative', overflow:'hidden'}}>
        <svg viewBox="0 0 320 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs><pattern id="em-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" stroke="#C8C0AC" strokeWidth="0.5" fill="none"/></pattern></defs>
          <rect width="320" height="320" fill="url(#em-grid)"/>
          {/* Two committed polys — one selected */}
          <polygon points="40,40 160,42 162,140 38,138" fill="rgba(91,138,168,0.20)" stroke="#5B8AA8" strokeWidth="2"/>
          {/* Selected polygon (hi-vis + handles) */}
          <polygon points="170,40 280,42 282,140 172,140" fill="rgba(255,212,0,0.45)" stroke="#0F0E0C" strokeWidth="3"/>
          <rect x="164" y="34" width="14" height="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="274" y="35" width="14" height="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="276" y="133" width="14" height="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="166" y="133" width="14" height="14" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          {/* Selection label */}
          <g transform="translate(225 96)">
            <rect x="-36" y="-12" width="72" height="22" fill="#0F0E0C"/>
            <text x="0" y="3" fontFamily="JetBrains Mono" fontSize="10" fill="#FFD400" fontWeight="700" textAnchor="middle">EPS · 820 SF</text>
          </g>
        </svg>
      </div>

      {/* Action bar */}
      <div style={{background:'var(--v2-ink)', color:'var(--v2-sand)', padding:'14px 20px', borderTop:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-accent)'}}>SELECTED · POLY 4 OF 9 · EPS</div>
        <div className="v2-bignum" style={{fontSize:32, color:'var(--v2-sand)', marginTop:6, lineHeight:1}}>820<span style={{fontSize:16, color:'var(--v2-ink-4)', marginLeft:6}}> SF</span></div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', borderTop:'2px solid var(--v2-ink)'}}>
        {[
          { l:'REASSIGN',   sub:'CHANGE ITEM' },
          { l:'EDIT GEOM',  sub:'MOVE VERTICES' },
          { l:'DUPLICATE',  sub:'NEW POLY' },
          { l:'DELETE',     sub:'REMOVE',       danger:true },
        ].map((b, i, arr) => (
          <button key={b.l} style={{
            padding:'14px 0',
            background:'var(--v2-ink)', color: b.danger ? 'var(--v2-bad)' : 'var(--v2-sand)',
            border:'none', borderRight: i < arr.length-1 ? '1px solid var(--v2-ink-2)' : 'none',
            fontFamily:'var(--v2-font)', cursor:'pointer',
          }}>
            <div style={{fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:800, letterSpacing:'0.06em'}}>{b.l}</div>
            <div style={{fontFamily:'var(--v2-font-mono)', fontSize:8, fontWeight:600, marginTop:4, color: b.danger ? 'var(--v2-bad)' : 'var(--v2-ink-4)'}}>{b.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// A2a · AI LAUNCH · CHOOSER
// =====================================================================
function V2AILaunchChooser() {
  return (
    <div className="v2 v2-screen" style={{background:'rgba(0,0,0,0.55)'}}>
      <div style={{position:'absolute', inset:0, background:'var(--v2-sand)', opacity:0.3, zIndex:0}}/>
      <div style={{marginTop:'auto', background:'var(--v2-sand)', border:'2px solid var(--v2-ink)', borderBottom:'none', position:'relative', zIndex:1, display:'flex', flexDirection:'column'}}>
        <div style={{padding:'10px 20px 16px', borderBottom:'2px solid var(--v2-ink)'}}>
          <div style={{width:40, height:4, background:'var(--v2-ink)', margin:'0 auto 14px'}}/>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>AI · WHAT'S THE JOB?</div>
          <h3 className="v2-h2" style={{marginTop:12, fontSize:32}}>Pick one.</h3>
        </div>

        {[
          { l:'COUNT ONE THING EVERYWHERE', sub:'TAP A SYMBOL → AI FINDS ALL OF THEM ACROSS SHEETS', icon:'×214', accent:true },
          { l:'DRAFT THE WHOLE TAKEOFF',     sub:'DEFINE TARGETS → AI MEASURES ALL OF IT',          icon:'AUTO' },
        ].map((o, i) => (
          <button key={i} style={{
            display:'flex', width:'100%', alignItems:'center', gap:18, padding:'24px 20px',
            background: o.accent ? 'var(--v2-accent)' : 'transparent',
            color: o.accent ? 'var(--v2-accent-ink)' : 'var(--v2-ink)',
            border:'none', borderBottom:'2px solid var(--v2-ink)',
            textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer',
          }}>
            <div style={{width:64, padding:'8px 0', background: o.accent ? 'var(--v2-ink)' : 'var(--v2-ink)', color: o.accent ? 'var(--v2-accent)' : 'var(--v2-accent)', textAlign:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:16, flexShrink:0}}>{o.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18, letterSpacing:'-0.015em'}}>{o.l}</div>
              <div className="v2-mono" style={{fontSize:11, marginTop:5, fontWeight:600, lineHeight:1.4}}>{o.sub}</div>
            </div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:20}}>→</div>
          </button>
        ))}

        <div style={{padding:'16px 20px', textAlign:'center'}}>
          <button style={{background:'transparent', border:'none', color:'var(--v2-ink-3)', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.06em'}}>CANCEL</button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// A2b · AI COUNT SETUP
// =====================================================================
function V2AICountSetup() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>AI · AUTO-COUNT</div>
          <div className="v2-appbar-title" style={{marginTop:4}}>TAP A SYMBOL</div>
        </div>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>TAPPED · A-104 SHEET</div>
        <div style={{marginTop:12, display:'flex', alignItems:'center', gap:14}}>
          <div style={{width:64, height:64, background:'var(--v2-accent)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:24}}>◯</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16}}>DIFFUSER · 24" ROUND</div>
            <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-3)', marginTop:4, fontWeight:600}}>OR: <span style={{textDecoration:'underline'}}>PICK DIFFERENT</span></div>
          </div>
        </div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">MATCH SENSITIVITY</div></div>
      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{display:'flex', gap:6, border:'2px solid var(--v2-ink)'}}>
          {[{l:'STRICT'},{l:'NORMAL', on:true},{l:'LOOSE'}].map((t, i, arr) => (
            <button key={t.l} style={{flex:1, padding:'16px 0', background: t.on ? 'var(--v2-accent)' : 'transparent', color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', border:'none', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.06em'}}>{t.l}</button>
          ))}
        </div>
        <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-3)', marginTop:10, fontWeight:600, lineHeight:1.45}}>NORMAL = HIGH-CONF AUTO + REVIEW THE EDGES.</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">SCAN WHICH SHEETS</div></div>
      <div style={{padding:'14px 20px'}}>
        {[
          { l:'M-101 · MECH PLAN',       on:true },
          { l:'M-102 · MECH UPPER',      on:true },
          { l:'M-103 · MECH LOWER',      on:true },
          { l:'M-104 · MECH ROOF',       on:true },
          { l:'A-201 · EAST ELEV.',      on:false, dim:true, sub:'NOT A MECH SHEET' },
        ].map((s, i) => (
          <div key={i} style={{padding:'12px 0', display:'flex', alignItems:'center', gap:12, borderBottom: i < 4 ? '1px solid var(--v2-line-soft)' : 'none'}}>
            <div style={{width:20, height:20, background: s.on ? 'var(--v2-accent)' : 'transparent', border:'2px solid var(--v2-ink)', opacity: s.dim ? 0.4 : 1, flexShrink:0}}/>
            <div style={{flex:1, opacity: s.dim ? 0.4 : 1}}>
              <div className="v2-mono" style={{fontSize:11, fontWeight:700}}>{s.l}</div>
              {s.sub && <div className="v2-mono" style={{fontSize:9, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{s.sub}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">RUN · SCAN 4 SHEETS · ~30S</button>
      </div>
    </div>
  );
}

// =====================================================================
// A2c · AI TAKEOFF SETUP
// =====================================================================
function V2AITakeoffSetup() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>AI · AUTO-TAKEOFF</div>
          <div className="v2-appbar-title" style={{marginTop:4}}>DEFINE TARGETS</div>
        </div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">WHAT TO MEASURE</div></div>
      <div style={{padding:'14px 20px'}}>
        {[
          { l:'EXTERIOR WALLS · EPS',    sub:'AS NET AREA · 8FT DEFAULT HEIGHT', on:true },
          { l:'BASECOAT',                 sub:'MATCH EPS AREA',                  on:true },
          { l:'FINISH COAT',              sub:'MATCH EPS AREA',                  on:true },
          { l:'STONE VENEER',             sub:'FOOTPRINT FROM HATCH FILL',       on:true },
          { l:'WINDOW + DOOR DEDUCT',     sub:'CUT FROM WALL AREA',              on:true },
          { l:'SEALANT JOINTS',           sub:'LINEAR · PERIMETER',              on:false },
        ].map((s, i, arr) => (
          <div key={i} style={{padding:'12px 0', display:'flex', alignItems:'center', gap:12, borderBottom: i < arr.length-1 ? '1px solid var(--v2-line-soft)' : 'none'}}>
            <div style={{width:20, height:20, background: s.on ? 'var(--v2-accent)' : 'transparent', border:'2px solid var(--v2-ink)', flexShrink:0}}/>
            <div style={{flex:1}}>
              <div className="v2-mono" style={{fontSize:11, fontWeight:700}}>{s.l}</div>
              <div className="v2-mono" style={{fontSize:9, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">SHEETS</div></div>
      <div style={{padding:'14px 20px'}}>
        <div style={{padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)'}}>
          <div className="v2-mono" style={{fontSize:11, fontWeight:700}}>ALL VERIFIED SHEETS · 22</div>
          <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:4, fontWeight:600}}>A-101 · A-201..204 · M-101..104 · S-101..103 · …</div>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">RUN · DRAFT 22 SHEETS · ~3M</button>
      </div>
    </div>
  );
}

// =====================================================================
// C1a · CHANGE ORDER · NEW
// =====================================================================
function V2ChangeOrderNew() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">✕</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">HILLCREST PH 4</div>
          <div className="v2-appbar-title">CHANGE ORDER · NEW</div>
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>CO NUMBER</div>
        <div className="v2-mono" style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontSize:14, fontWeight:700}}>CO-003 · AUTO</div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>WHAT CHANGED</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', minHeight:80, fontSize:14, lineHeight:1.45}}>
          Added stone veneer on south wall — 320 SF · client request.<span style={{display:'inline-block', width:2, height:14, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:2}}/>
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>VALUE DELTA</div>
        <div style={{display:'flex', alignItems:'baseline', gap:12, marginTop:8}}>
          <div className="v2-bignum" style={{fontSize:56, lineHeight:0.9, color:'var(--v2-good)'}}>+$5<span className="unit">,280</span></div>
          <div style={{display:'flex', gap:6, marginLeft:'auto'}}>
            <button className="v2-iconbtn">−</button>
            <button className="v2-iconbtn accent">+</button>
          </div>
        </div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-3)', fontWeight:600, fontSize:11}}>320 SF × $16.50 · INCLUDES 34% MARGIN</div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>SCHEDULE IMPACT</div>
        <div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:0, border:'2px solid var(--v2-ink)'}}>
          {[{l:'NONE'},{l:'+1-2 DAYS', on:true},{l:'+1 WEEK'}].map((t, i, arr) => (
            <button key={t.l} style={{padding:'14px 0', background: t.on ? 'var(--v2-accent)' : 'transparent', color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', border:'none', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.04em'}}>{t.l}</button>
          ))}
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>SAVE DRAFT</button>
        <button className="v2-btn primary" style={{flex:2}}>SEND TO JOHN</button>
      </div>
    </div>
  );
}

// =====================================================================
// C1b · CHANGE ORDER · DETAIL (states: DRAFT / SENT / ACCEPTED / REJECTED)
// =====================================================================
function V2ChangeOrderDetail({ state = 'SENT' }) {
  const states = {
    DRAFT:    { color:'var(--v2-ink-3)', l:'DRAFT',    sub:'NOT SENT YET',         btn:'SEND TO JOHN' },
    SENT:     { color:'var(--v2-accent)', l:'SENT',    sub:'AWAITING JOHN · 2 DAYS', btn:'NUDGE JOHN' },
    ACCEPTED: { color:'var(--v2-good)', l:'ACCEPTED', sub:'JOHN SIGNED · 3:14 PM',   btn:'PROCEED · ADD TO BUDGET' },
    REJECTED: { color:'var(--v2-bad)',  l:'REJECTED', sub:'JOHN DECLINED',           btn:'AMEND · TRY AGAIN' },
  };
  const s = states[state];
  const isAccent = s.color === 'var(--v2-accent)';
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">HILLCREST PH 4</div>
          <div className="v2-appbar-title">CO-003</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div style={{padding:'24px 20px', background: isAccent ? 'var(--v2-accent)' : (s.color === 'var(--v2-bad)' ? 'var(--v2-bad)' : 'transparent'), color: isAccent ? 'var(--v2-accent-ink)' : (s.color === 'var(--v2-bad)' ? '#fff' : 'var(--v2-ink)'), borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:800, letterSpacing:'0.08em'}}>● {s.l}</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:36, lineHeight:0.92, letterSpacing:'-0.025em', marginTop:14}}>+$5,280</div>
        <div className="v2-mono" style={{marginTop:10, fontWeight:600, fontSize:12, opacity: 0.85}}>{s.sub}</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">SCOPE</div></div>
      <div style={{padding:'14px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:13, fontWeight:600, lineHeight:1.5, color:'var(--v2-ink)'}}>Added stone veneer on south wall — 320 SF · client request.</div>
        <div className="v2-mono" style={{marginTop:10, fontSize:11, color:'var(--v2-ink-3)', fontWeight:600}}>SCHEDULE · +1-2 DAYS</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">LIFECYCLE</div></div>
      <div style={{padding:'14px 20px'}}>
        <div style={{display:'flex', gap:0, border:'2px solid var(--v2-ink)'}}>
          {['DRAFT','SENT','ACCEPTED','REJECTED'].map((step, i, arr) => {
            const order = ['DRAFT','SENT','ACCEPTED','REJECTED'];
            const idx = order.indexOf(state);
            const active = step === state;
            const done = order.indexOf(step) < idx && step !== 'REJECTED';
            return (
              <div key={step} style={{flex:1, padding:'10px 0', textAlign:'center', background: active ? (step === 'REJECTED' ? 'var(--v2-bad)' : 'var(--v2-accent)') : done ? 'var(--v2-ink)' : 'transparent', color: active ? (step === 'REJECTED' ? '#fff' : 'var(--v2-accent-ink)') : done ? 'var(--v2-sand)' : 'var(--v2-ink-3)', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none'}}>
                <div className="v2-mono" style={{fontSize:9, fontWeight:800, letterSpacing:'0.04em'}}>{step}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">{s.btn}</button>
      </div>
    </div>
  );
}

// =====================================================================
// D1 · BUDGET TAB (added to owner project detail)
// =====================================================================
function V2BudgetTab() {
  const lines = [
    { l:'LABOR · EPS INSTALL',       bid:'$28,400', spent:'$22,180', pct:78, status:'on' },
    { l:'LABOR · BASECOAT',           bid:'$14,200', spent:'$8,540',  pct:60, status:'on' },
    { l:'EPS BOARD · 2"',             bid:'$16,500', spent:'$15,420', pct:93, status:'risk' },
    { l:'BASECOAT · POLYMER',         bid:'$10,030', spent:'$5,820',  pct:58, status:'on' },
    { l:'STONE VENEER',                bid:'$6,930',  spent:'$7,140',  pct:103, status:'over' },
    { l:'RENTALS · SCAFFOLD',         bid:'$2,720',  spent:'$1,840',  pct:67, status:'on' },
  ];
  const statusColor = { on:'var(--v2-good)', risk:'var(--v2-warn)', over:'var(--v2-bad)' };
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">HILLCREST PH 4</div>
          <div className="v2-appbar-title">BUDGET · LIVE</div>
        </div>
      </div>

      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">SPENT VS BID</div>
        <div style={{display:'flex', alignItems:'baseline', gap:12, marginTop:8}}>
          <div className="v2-bignum" style={{fontSize:48, lineHeight:0.9}}>$60<span className="unit">,940</span></div>
          <div className="v2-mono" style={{color:'var(--v2-ink-3)', fontWeight:700, fontSize:14}}>OF $78,780</div>
        </div>
        <div style={{height:8, background:'var(--v2-ink)', marginTop:14, position:'relative'}}>
          <div style={{width:'77%', height:'100%', background:'var(--v2-accent)'}}/>
        </div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600, fontSize:11}}>77% SPENT · 62% COMPLETE · MARGIN 32%</div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {lines.map((l, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)'}}>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:8}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:13}}>{l.l}</div>
              <div className="v2-mono" style={{fontSize:12, fontWeight:800, color: l.status === 'over' ? 'var(--v2-bad)' : 'var(--v2-ink)'}}>{l.spent}</div>
            </div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:4, fontWeight:600}}>BID {l.bid} · {l.pct}% SPENT</div>
            <div style={{height:4, background:'var(--v2-line-soft)', marginTop:8}}>
              <div style={{width:`${Math.min(l.pct, 100)}%`, height:'100%', background: statusColor[l.status]}}/>
              {l.pct > 100 && <div style={{width:`${l.pct - 100}%`, height:'100%', background:'var(--v2-bad)', marginTop:-4, marginLeft:'100%'}}/>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// D2a · INVOICE CREATE (simple + milestones)
// =====================================================================
function V2InvoiceCreate() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">HILLCREST PH 4</div>
          <div className="v2-appbar-title">INVOICE #113</div>
        </div>
      </div>

      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">CONTRACT VALUE</div>
        <div className="v2-bignum" style={{fontSize:36, marginTop:6}}>$146<span className="unit">,090</span></div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">MILESTONES · UP TO 3</div></div>
      <div style={{padding:'14px 20px'}}>
        {[
          { l:'DEPOSIT · 30%',          v:'$43,827', invoiced:true,  paid:true },
          { l:'PROGRESS · 50% @ EPS DONE', v:'$73,045', invoiced:true,  active:true,  paid:false },
          { l:'FINAL · 20% AT CLOSE',    v:'$29,218', invoiced:false },
        ].map((m, i) => (
          <div key={i} style={{padding:'12px 14px', border:'2px solid var(--v2-ink)', marginBottom:8, background: m.active ? 'var(--v2-accent)' : 'transparent', color: m.active ? 'var(--v2-accent-ink)' : 'var(--v2-ink)'}}>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:8}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{m.l}</div>
              <div className="v2-mono" style={{fontSize:13, fontWeight:800}}>{m.v}</div>
            </div>
            <div className="v2-mono" style={{fontSize:10, marginTop:6, fontWeight:600, letterSpacing:'0.06em', opacity:0.75}}>
              {m.paid ? '✓ PAID' : m.invoiced ? '● INVOICED · NOT PAID' : '○ NOT YET INVOICED'}
            </div>
          </div>
        ))}
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">THIS INVOICE</div></div>
      <div style={{padding:'18px 20px', background:'var(--v2-sand-soft)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:700, color:'var(--v2-ink-3)'}}>BILLING NOW · MILESTONE 2 OF 3</div>
        <div className="v2-bignum" style={{fontSize:52, marginTop:8, lineHeight:0.9}}>$73<span className="unit">,045</span></div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600, fontSize:11}}>NET 30 · STRIPE LINK INCLUDED</div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>PREVIEW</button>
        <button className="v2-btn primary" style={{flex:2}}>SEND TO JOHN</button>
      </div>
    </div>
  );
}

// =====================================================================
// D2b · INVOICE SENT
// =====================================================================
function V2InvoiceSent() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">HILLCREST PH 4</div>
          <div className="v2-appbar-title">INVOICE #113</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div style={{padding:'24px 20px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:800, letterSpacing:'0.08em'}}>● SENT · AWAITING PAYMENT</div>
        <div className="v2-bignum" style={{fontSize:64, marginTop:14, lineHeight:0.9, color:'var(--v2-accent-ink)'}}>$73<span className="unit" style={{color:'var(--v2-accent-ink)'}}>,045</span></div>
        <div className="v2-mono" style={{marginTop:10, fontWeight:600, fontSize:12, color:'var(--v2-accent-ink)'}}>DUE JUN 26 · 28 DAYS</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">TIMELINE</div></div>
      {[
        { d:'TODAY · 3:14 PM', l:'SENT · EMAIL + STRIPE LINK',  current:true },
        { d:'JUN 02',           l:'AUTO-REMINDER #1 · NUDGE' },
        { d:'JUN 26',           l:'NET-30 DUE DATE' },
        { d:'JUL 03',           l:'AUTO-REMINDER #2 · ESCALATE' },
      ].map((t, i, arr) => (
        <div key={i} style={{padding:'14px 20px', display:'flex', alignItems:'center', gap:14, borderBottom: i < arr.length-1 ? '1px solid var(--v2-line-soft)' : 'none'}}>
          <div style={{width:24, height:24, background: t.current ? 'var(--v2-accent)' : 'transparent', border:'2px solid var(--v2-ink)', flexShrink:0}}/>
          <div style={{flex:1}}>
            <div className="v2-mono" style={{fontSize:11, fontWeight:700, color:'var(--v2-ink-3)'}}>{t.d}</div>
            <div className="v2-mono" style={{fontSize:12, fontWeight:600, marginTop:3}}>{t.l}</div>
          </div>
        </div>
      ))}

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>NUDGE NOW</button>
        <button className="v2-btn primary" style={{flex:2}}>MARK PAID MANUALLY</button>
      </div>
    </div>
  );
}

// =====================================================================
// C2 · RECOVERY PLAN
// =====================================================================
function V2RecoveryPlan() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">ASPEN RIDGE · AT RISK</div>
          <div className="v2-appbar-title">RECOVERY PLAN</div>
        </div>
      </div>

      <div style={{padding:'24px 20px', background:'var(--v2-bad)', color:'#fff', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:800, letterSpacing:'0.08em'}}>● LABOR -18% · 23 DAYS LEFT</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, lineHeight:0.95, marginTop:14}}>AI ranked 3 actions to recover.</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow accent" style={{display:'inline-block'}}>AI · DO THESE THIS WEEK</div></div>
      <div style={{padding:'14px 20px'}}>
        {[
          { n:1, l:'CAP OT THIS WEEK',           sub:'EST. SAVE: $1,840', done:false, impact:'+7%' },
          { n:2, l:'REASSIGN CARLOS TO HILLCREST', sub:'OVERSTAFFED CREW',  done:false, impact:'+3%' },
          { n:3, l:'RENEGOTIATE STONE WITH CALVERA', sub:'CO-003 OPPORTUNITY · CHECK SCOPE', done:false, impact:'+8%' },
        ].map((a, i, arr) => (
          <div key={i} style={{padding:'14px', border:'2px solid var(--v2-ink)', marginBottom:8, display:'flex', alignItems:'flex-start', gap:14}}>
            <div style={{width:36, height:36, background:'var(--v2-accent)', color:'var(--v2-accent-ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:16, flexShrink:0}}>{a.n}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{a.l}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:4, fontWeight:600}}>{a.sub}</div>
              <div className="v2-mono" style={{fontSize:11, color:'var(--v2-good)', marginTop:6, fontWeight:800}}>MARGIN {a.impact}</div>
            </div>
            <button style={{padding:'6px 10px', background:'var(--v2-ink)', color:'var(--v2-sand)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.04em', flexShrink:0}}>DO IT</button>
          </div>
        ))}
      </div>

      <div style={{padding:'14px 20px', background:'var(--v2-sand-soft)', borderTop:'2px solid var(--v2-ink)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5}}>● ALL 3 = MARGIN RECOVERS TO 32%. NOTHING = -18% AT CLOSE.</div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">ACCEPT PLAN · TRACK PROGRESS</button>
      </div>
    </div>
  );
}

// =====================================================================
// C3 · POST-MORTEM
// =====================================================================
function V2PostMortem() {
  const lines = [
    { l:'LABOR',     bid:'$42,600', actual:'$48,920', delta:'+$6,320', pct:'+15%', bad:true },
    { l:'EPS BOARD', bid:'$16,500', actual:'$17,140', delta:'+$640',    pct:'+4%',  bad:true },
    { l:'BASECOAT',  bid:'$10,030', actual:'$9,400',  delta:'−$630',    pct:'−6%',  bad:false },
    { l:'STONE',     bid:'$6,930',  actual:'$7,140',  delta:'+$210',    pct:'+3%',  bad:false },
    { l:'RENTALS',   bid:'$2,720',  actual:'$2,180',  delta:'−$540',    pct:'−20%', bad:false },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">HILLCREST PH 4 · CLOSED</div>
          <div className="v2-appbar-title">POST-MORTEM</div>
        </div>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">FINAL MARGIN</div>
        <div className="v2-bignum" style={{fontSize:64, marginTop:8, color:'var(--v2-good)'}}>34<span className="unit">%</span></div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600, fontSize:12}}>BID 34% · DELIVERED 34% · DEAD ON</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">BID VS ACTUAL · BY LINE</div></div>
      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {lines.map((l, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)'}}>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{l.l}</div>
              <div className="v2-mono" style={{fontSize:13, fontWeight:800, color: l.bad ? 'var(--v2-bad)' : 'var(--v2-good)'}}>{l.pct}</div>
            </div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:4, fontWeight:600}}>BID {l.bid} · ACTUAL {l.actual} · {l.delta}</div>
          </div>
        ))}
        <div style={{padding:'18px 20px', background:'var(--v2-accent)', borderTop:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow accent" style={{background:'var(--v2-ink)', color:'var(--v2-accent)', display:'inline-block'}}>AI · NEXT TIME</div>
          <div className="v2-mono" style={{marginTop:12, fontSize:12, color:'var(--v2-accent-ink)', fontWeight:600, lineHeight:1.5}}>EPS LABOR HOURS RAN 15% OVER. CONSIDER +12% LABOR BUFFER ON SIMILAR HILLCREST PROJECTS.</div>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// F1 · FOREMAN TIME APPROVAL (first-line)
// =====================================================================
function V2ForemanTimeApprove() {
  const crew = [
    { who:'MARCUS LEE',     hrs:'40.0', flags:[],                       ok:true },
    { who:'TOMÁS REYES',    hrs:'42.5', flags:['OT 2.5H','LUNCH SKIP'], ok:false },
    { who:'DIEGO ALDANA',   hrs:'37.0', flags:[],                       ok:true },
    { who:'SARA VEGA',      hrs:'40.0', flags:[],                       ok:true },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb time="16:48"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">FOREMAN · ANA · WEEK 18</div>
          <div className="v2-appbar-title">APPROVE CREW HOURS</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div style={{padding:'18px 20px', background:'var(--v2-sand-soft)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5}}>● FIRST-LINE APPROVAL · YOU SEE 4 CREW ACROSS YOUR SITES. MIKE FINALIZES PAYROLL AFTER.</div>
      </div>

      <div style={{padding:'14px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">TOTAL · YOUR CREW</div>
        <div className="v2-bignum" style={{fontSize:48, marginTop:6, lineHeight:0.9}}>159<span className="unit">.5 H</span></div>
        <div className="v2-mono" style={{marginTop:6, color:'var(--v2-ink-2)', fontWeight:600, fontSize:11}}>2.5H OT · 1 FLAG · $4,180 PAYROLL</div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {crew.map((r, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)'}}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:6, alignSelf:'stretch', minHeight:32, background: r.flags.length > 0 ? 'var(--v2-warn)' : 'var(--v2-line-soft)'}}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{r.who}</div>
              </div>
              <div className="v2-mono" style={{fontSize:14, fontWeight:800}}>{r.hrs}</div>
              {r.ok && <span style={{padding:'4px 8px', background:'var(--v2-good)', color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:800, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>OK</span>}
            </div>
            {r.flags.length > 0 && (
              <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:8, marginLeft:18}}>
                {r.flags.map((f, j) => (
                  <span key={j} style={{padding:'3px 8px', background:'var(--v2-warn)', color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:800, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>{f}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>REVIEW TOMÁS</button>
        <button className="v2-btn primary" style={{flex:2}}>APPROVE 3 · SEND TO MIKE</button>
      </div>
    </div>
  );
}

// =====================================================================
// E1 · SCHEDULE TAP-EDIT SHEET
// =====================================================================
function V2ScheduleEditSheet() {
  return (
    <div className="v2 v2-screen" style={{background:'rgba(0,0,0,0.55)'}}>
      <div style={{position:'absolute', inset:0, background:'var(--v2-sand)', opacity:0.3, zIndex:0}}/>
      <div style={{marginTop:'auto', background:'var(--v2-sand)', border:'2px solid var(--v2-ink)', borderBottom:'none', position:'relative', zIndex:1, display:'flex', flexDirection:'column'}}>
        <div style={{padding:'10px 20px 14px', borderBottom:'2px solid var(--v2-ink)'}}>
          <div style={{width:40, height:4, background:'var(--v2-ink)', margin:'0 auto 12px'}}/>
          <div className="v2-eyebrow">EDIT · WED MAY 7</div>
          <h3 className="v2-h3" style={{marginTop:6}}>HILLCREST · EPS · 3 crew</h3>
        </div>

        <div style={{padding:'14px 20px 0', display:'flex', gap:8, alignItems:'center'}}>
          <span style={{padding:'3px 8px', background:'var(--v2-bad)', color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:800, letterSpacing:'0.06em'}}>● RAIN FORECAST</span>
        </div>

        <div style={{padding:'14px 20px 0'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>DATE</div>
          <div className="v2-mono" style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontSize:15, fontWeight:700}}>WED MAY 7 · 7AM–4PM</div>
        </div>

        <div style={{padding:'14px 20px 0'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>CREW</div>
          <div style={{marginTop:8, display:'flex', gap:6, flexWrap:'wrap'}}>
            {['ANA C.','MARCUS L.','TOMÁS R.'].map(p => (
              <button key={p} style={{padding:'10px 14px', background:'var(--v2-ink)', color:'var(--v2-sand)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.06em'}}>{p}<span style={{marginLeft:6, opacity:0.5}}>✕</span></button>
            ))}
            <button style={{padding:'10px 14px', background:'transparent', color:'var(--v2-ink-3)', border:'2px dashed var(--v2-line-soft)', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.06em'}}>+ ADD</button>
          </div>
        </div>

        <div style={{padding:'18px 20px 0'}}>
          <button className="v2-btn ghost" style={{borderColor:'var(--v2-bad)', color:'var(--v2-bad)'}}>MOVE TO THU MAY 8 · RAIN AVOIDANCE</button>
        </div>

        <div style={{padding:'14px 20px 18px', display:'flex', gap:8}}>
          <button className="v2-btn ghost" style={{flex:1, color:'var(--v2-bad)', borderColor:'var(--v2-bad)'}}>CANCEL DAY</button>
          <button className="v2-btn primary" style={{flex:2}}>SAVE · NOTIFY CREW</button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// A5 · INGEST FAILURE
// =====================================================================
function V2IngestFailure() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">PLAN INGEST FAILED</div>
      </div>

      <div style={{padding:'24px 20px', background:'var(--v2-bad)', color:'#fff', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:800, letterSpacing:'0.08em'}}>● COULDN'T PARSE</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, lineHeight:0.95, marginTop:14}}>This PDF has no text layer.</div>
        <div className="v2-mono" style={{marginTop:10, color:'rgba(255,255,255,.85)', fontWeight:600, fontSize:12, lineHeight:1.5}}>SCANNED OR IMAGE-ONLY · WE CAN'T READ TITLE BLOCKS OR SCALES AUTOMATICALLY.</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">WHAT NOW</div></div>
      <div style={{padding:'14px 20px', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">PROCEED · I'LL ENTER SCALES MANUALLY</button>
        <button className="v2-btn ghost">UPLOAD A BETTER FILE</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-ink-3)', borderColor:'var(--v2-line-soft)'}}>EMAIL THE ARCHITECT</button>
      </div>

      <div style={{padding:'14px 20px', background:'var(--v2-sand-soft)', borderTop:'2px solid var(--v2-ink)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>OTHER FAILURE MODES</div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600, fontSize:11, lineHeight:1.6}}>· CORRUPT / TRUNCATED<br/>· ENCRYPTED (NEEDS PASSWORD)<br/>· OVERSIZED (&gt; 200MB)<br/>· UNSUPPORTED FORMAT</div>
      </div>

      <div className="v2-flex-1"/>
    </div>
  );
}

// =====================================================================
// A3 · LIN HEIGHT CAPTURE (canvas state)
// =====================================================================
function V2LinHeightCapture() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">LIN · WALL TRACE</div>
          <div className="v2-appbar-title">SET HEIGHT</div>
        </div>
      </div>

      {/* Canvas with linear measure */}
      <div style={{flex:1, background:'var(--v2-sand-soft)', position:'relative', overflow:'hidden', maxHeight:280}}>
        <svg viewBox="0 0 320 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs><pattern id="lh-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" stroke="#C8C0AC" strokeWidth="0.5" fill="none"/></pattern></defs>
          <rect width="320" height="200" fill="url(#lh-grid)"/>
          <line x1="30" y1="100" x2="290" y2="100" stroke="#FFD400" strokeWidth="4"/>
          <rect x="26" y="96" width="8" height="8" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          <rect x="286" y="96" width="8" height="8" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/>
          <g transform="translate(160 80)">
            <rect x="-30" y="-12" width="60" height="22" fill="#0F0E0C"/>
            <text x="0" y="3" fontFamily="JetBrains Mono" fontSize="11" fill="#FFD400" fontWeight="700" textAnchor="middle">120 LF</text>
          </g>
        </svg>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">WALL HEIGHT</div></div>
      <div style={{padding:'20px 20px'}}>
        <div style={{display:'flex', alignItems:'baseline', gap:14}}>
          <div className="v2-bignum" style={{fontSize:56, lineHeight:0.9}}>9<span className="unit">FT</span></div>
          <div style={{display:'flex', gap:6, marginLeft:'auto'}}>
            <button className="v2-iconbtn">−</button>
            <button className="v2-iconbtn accent">+</button>
          </div>
        </div>
        <div style={{display:'flex', gap:6, marginTop:14, flexWrap:'wrap'}}>
          {['8FT','9FT','10FT','12FT'].map((h, i) => (
            <button key={h} style={{padding:'10px 14px', background: i === 1 ? 'var(--v2-accent)' : 'transparent', color: i === 1 ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.06em'}}>{h}</button>
          ))}
        </div>
      </div>

      <div style={{padding:'14px 20px', background:'var(--v2-accent)', borderTop:'2px solid var(--v2-ink)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow accent" style={{background:'var(--v2-ink)', color:'var(--v2-accent)', display:'inline-block'}}>YIELDS AREA</div>
        <div className="v2-bignum" style={{fontSize:40, marginTop:8, color:'var(--v2-accent-ink)', lineHeight:0.9}}>1,080<span className="unit" style={{color:'var(--v2-accent-ink)'}}> SF</span></div>
        <div className="v2-mono" style={{marginTop:6, fontSize:11, color:'var(--v2-accent-ink)', fontWeight:600}}>120 LF × 9 FT</div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px'}}>
        <button className="v2-btn primary">USE · ATTACH TO ITEM</button>
      </div>
    </div>
  );
}

// =====================================================================
// A4 · BULK SELECT on canvas
// =====================================================================
function V2BulkSelect() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar" style={{background:'var(--v2-ink)', color:'var(--v2-sand)', borderColor:'var(--v2-sand-2)'}}>
        <button className="v2-iconbtn" style={{background:'var(--v2-ink)', color:'var(--v2-sand)', borderColor:'var(--v2-sand)'}}>✕</button>
        <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>3 SELECTED</div>
        <button style={{padding:'6px 10px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', border:'2px solid var(--v2-accent)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.04em'}}>SELECT ALL · 9</button>
      </div>

      <div style={{flex:1, background:'var(--v2-sand-soft)', position:'relative', overflow:'hidden'}}>
        <svg viewBox="0 0 320 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs><pattern id="bs-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" stroke="#C8C0AC" strokeWidth="0.5" fill="none"/></pattern></defs>
          <rect width="320" height="320" fill="url(#bs-grid)"/>
          {/* Selected polygons */}
          <polygon points="30,40 140,42 142,140 28,138" fill="rgba(255,212,0,0.45)" stroke="#0F0E0C" strokeWidth="3"/>
          <polygon points="170,40 290,42 292,140 168,140" fill="rgba(255,212,0,0.45)" stroke="#0F0E0C" strokeWidth="3"/>
          <polygon points="30,170 140,172 142,270 28,268" fill="rgba(255,212,0,0.45)" stroke="#0F0E0C" strokeWidth="3"/>
          {/* Unselected */}
          <polygon points="170,170 290,172 292,270 168,270" fill="rgba(91,138,168,0.20)" stroke="#5B8AA8" strokeWidth="2"/>
          {/* Rubber band */}
          <rect x="20" y="30" width="280" height="250" fill="none" stroke="#FFD400" strokeWidth="2" strokeDasharray="6 4"/>
        </svg>
      </div>

      <div style={{padding:'14px 20px', background:'var(--v2-ink)', color:'var(--v2-sand)', borderTop:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-accent)'}}>SELECTION · 3 POLYS · TOTAL</div>
        <div className="v2-bignum" style={{fontSize:32, marginTop:6, color:'var(--v2-sand)', lineHeight:1}}>3,940<span style={{fontSize:16, color:'var(--v2-ink-4)', marginLeft:6}}> SF</span></div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderTop:'2px solid var(--v2-ink)'}}>
        <button style={{padding:'18px 0', background:'var(--v2-ink)', color:'var(--v2-sand)', border:'none', borderRight:'1px solid var(--v2-ink-2)', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:800, letterSpacing:'0.06em'}}>REASSIGN ITEM</button>
        <button style={{padding:'18px 0', background:'var(--v2-ink)', color:'var(--v2-bad)', border:'none', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:800, letterSpacing:'0.06em'}}>DELETE 3</button>
      </div>
    </div>
  );
}

// =====================================================================
// F2 · GENERIC BLOCKER RESOLVE
// =====================================================================
function V2GenericBlockerResolve() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">FIELD · BLOCKER</div>
          <div className="v2-appbar-title">SCAFFOLD SIGN-OFF</div>
        </div>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:800, letterSpacing:'0.08em', color:'var(--v2-bad)'}}>● BLOCKED · DIEGO · 11:08 AM</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:22, lineHeight:1.1, marginTop:12, color:'var(--v2-ink)'}}>"Inspector hasn't signed off on the scaffold yet. Can't go above level 2."</div>
        <div className="v2-mono" style={{marginTop:10, color:'var(--v2-ink-3)', fontWeight:600, fontSize:11}}>ASPEN RIDGE · D6/35</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">RESOLVE</div></div>
      <div style={{padding:'14px 20px', display:'flex', flexDirection:'column', gap:10}}>
        {[
          { l:'CALL INSPECTOR',           sub:'TONY R · 555-0218',   primary:true },
          { l:'REASSIGN CREW LOWER',      sub:'KEEP WORKING LEVEL 1-2' },
          { l:'SEND TO MIKE FOR HELP',    sub:'ESCALATE TO OWNER' },
          { l:'MARK BLOCKER ACKNOWLEDGED', sub:'I\u2019M HANDLING IT MANUALLY' },
        ].map((b, i) => (
          <button key={i} style={{
            display:'flex', width:'100%', alignItems:'center', gap:14, padding:'16px 18px',
            background: b.primary ? 'var(--v2-accent)' : 'var(--v2-sand)',
            color: b.primary ? 'var(--v2-accent-ink)' : 'var(--v2-ink)',
            border:'2px solid var(--v2-ink)',
            textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer',
          }}>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{b.l}</div>
              <div className="v2-mono" style={{fontSize:10, marginTop:4, fontWeight:600, opacity: b.primary ? 1 : 0.7}}>{b.sub}</div>
            </div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18}}>→</div>
          </button>
        ))}
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', textAlign:'center', fontWeight:600}}>● ALL ACTIONS NOTIFY DIEGO AUTOMATICALLY</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  V2PriceAndSend, V2EditMeasurement,
  V2AILaunchChooser, V2AICountSetup, V2AITakeoffSetup,
  V2ChangeOrderNew, V2ChangeOrderDetail,
  V2BudgetTab,
  V2InvoiceCreate, V2InvoiceSent,
  V2RecoveryPlan, V2PostMortem,
  V2ForemanTimeApprove, V2ScheduleEditSheet,
  V2IngestFailure, V2LinHeightCapture,
  V2BulkSelect, V2GenericBlockerResolve,
});
