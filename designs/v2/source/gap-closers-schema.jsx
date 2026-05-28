/* global React */

// ============================================================
// AUDIT FIXES · V2 (Section 23)
// Top 4 critical + 5 important fixes from the V2 audit.
// Plus a schema spec block at the end.
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
// FIX 1 (CRIT) · Pricing item edit
// =====================================================================
function V2PricingItemEdit() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">PRICING · 09 24 00</div>
          <div className="v2-appbar-title">EPS BOARD · 2"</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">CURRENT COST</div>
        <div style={{display:'flex', alignItems:'baseline', gap:14, marginTop:10}}>
          <div className="v2-bignum" style={{fontSize:64, lineHeight:1}}>$3<span className="unit">.45</span></div>
          <div style={{padding:'4px 10px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:800, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>/ SF</div>
        </div>
        <div className="v2-mono" style={{marginTop:10, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5, fontSize:12}}>WAS $3.20 (MAR) · $2.95 (JAN) · UP 17% YTD</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">EDIT</div></div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>NEW COST</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:28, fontVariantNumeric:'tabular-nums'}}>$3.62<span style={{display:'inline-block', width:2, height:24, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:4}}/></div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>LABOR MULTIPLIER</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:10}}>
          <span style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:22, fontVariantNumeric:'tabular-nums'}}>1.25×</span>
          <div className="v2-mono" style={{flex:1, fontSize:10, color:'var(--v2-ink-3)', fontWeight:600}}>STD INSTALL</div>
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>STATUS</div>
        <div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:0, border:'2px solid var(--v2-ink)'}}>
          {[{l:'ACTIVE', on:true},{l:'SEASONAL'},{l:'RETIRED'}].map((t, i, arr) => (
            <button key={t.l} style={{padding:'14px 0', background: t.on ? 'var(--v2-accent)' : 'transparent', color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', border:'none', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.06em'}}>{t.l}</button>
          ))}
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1, color:'var(--v2-bad)', borderColor:'var(--v2-bad)'}}>DELETE</button>
        <button className="v2-btn primary" style={{flex:2}}>SAVE · 142 BIDS UPDATED</button>
      </div>
    </div>
  );
}

// =====================================================================
// FIX 2 (CRIT) · Project LOST state
// =====================================================================
function V2ProjectLost() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">FOOTHILLS HEALTH</div>
          <div className="v2-appbar-title">MEDICAL OFFICE · BID</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div style={{padding:'24px 20px', background:'var(--v2-bad)', color:'#fff', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:800, letterSpacing:'0.08em'}}>● LOST</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:42, lineHeight:0.92, letterSpacing:'-0.03em', marginTop:14}}>Bid lost.</div>
        <div className="v2-body" style={{marginTop:10, color:'rgba(255,255,255,.85)'}}>Sent $184K. Client went with another contractor 3 days after the proposal.</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">REASON</div></div>
      <div style={{padding:'14px 20px 0'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, border:'2px solid var(--v2-ink)'}}>
          {[
            { l:'PRICE',    on:true },
            { l:'TIMING' },
            { l:'SCOPE' },
            { l:'GHOSTED' },
            { l:'COMPETITOR' },
            { l:'OTHER' },
          ].map((t, i) => {
            const isRight = i % 2 === 1;
            const isLastRow = i >= 4;
            return (
              <button key={t.l} style={{
                padding:'16px 0', background: t.on ? 'var(--v2-accent)' : 'transparent',
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

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>NOTES</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', minHeight:80, fontSize:14, lineHeight:1.45}}>
          Hill Construction came in 12% lower. Architect indicated they have prior relationship.<span style={{display:'inline-block', width:2, height:14, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:2}}/>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderTop:'2px solid var(--v2-ink)', marginTop:18}}>
        <div style={{padding:'16px 20px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>WIN RATE · YTD</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1}}>73<span style={{fontSize:16, color:'var(--v2-ink-3)'}}>%</span></div>
        </div>
        <div style={{padding:'16px 20px'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>LOST · PRICE</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1, color:'var(--v2-bad)'}}>4 of 6</div>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">ARCHIVE · TRACK FOR NEXT TIME</button>
      </div>
    </div>
  );
}

// =====================================================================
// FIX 3 (CRIT) · Worker offline · dark variant
// =====================================================================
function V2StateOfflineWorker() {
  return (
    <div className="v2 v2-screen dark">
      <V2Sb dark/>
      <div style={{padding:'14px 20px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', display:'flex', alignItems:'center', gap:12, borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{width:14, height:14, background:'var(--v2-ink)'}}/>
        <div style={{flex:1}}>
          <div className="v2-mono" style={{fontSize:11, fontWeight:800, letterSpacing:'0.06em'}}>OFFLINE</div>
          <div className="v2-mono" style={{fontSize:11, fontWeight:600, marginTop:3}}>WORK QUEUED · SYNCS WHEN BACK ON</div>
        </div>
      </div>

      <div style={{padding:'32px 20px', borderBottom:'2px solid var(--v2-sand-2)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>QUEUED</div>
        <div className="v2-bignum" style={{fontSize:96, color:'var(--v2-accent)', marginTop:10, lineHeight:0.9}}>3</div>
        <div className="v2-mono" style={{marginTop:10, color:'var(--v2-ink-4)', fontWeight:600, lineHeight:1.5}}>CLOCK-IN · 2 PHOTOS · 1 BLOCKER FLAG</div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {[
          { l:'CLOCKED IN · HILLCREST', t:'7:02 AM' },
          { l:'PHOTO · EPS EAST',       t:'8:14 AM' },
          { l:'PHOTO · EPS EAST',       t:'10:32 AM' },
          { l:'FLAG · OUT OF EPS',      t:'11:08 AM' },
        ].map((r, i) => (
          <div key={i} style={{padding:'16px 20px', borderBottom:'1px solid var(--v2-ink-2)', display:'flex', alignItems:'center', gap:14}}>
            <span style={{width:6, alignSelf:'stretch', background:'var(--v2-accent)'}}/>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14, color:'var(--v2-sand)'}}>{r.l}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-4)', marginTop:3, fontWeight:600}}>{r.t} · WAITING</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-sand-2)'}}>
        <button className="v2-btn ghost" style={{color:'var(--v2-sand)', borderColor:'var(--v2-sand)'}}>RETRY SYNC NOW</button>
      </div>
    </div>
  );
}

// =====================================================================
// FIX 4 (IMP) · Burden line item edit
// =====================================================================
function V2BurdenLineEdit() {
  return (
    <div className="v2 v2-screen" style={{background:'rgba(0,0,0,0.55)'}}>
      <div style={{position:'absolute', inset:0, background:'var(--v2-sand)', opacity:0.3, zIndex:0}}/>

      <div style={{marginTop:'auto', background:'var(--v2-sand)', border:'2px solid var(--v2-ink)', borderBottom:'none', position:'relative', zIndex:1, display:'flex', flexDirection:'column'}}>
        <div style={{padding:'10px 20px 6px', borderBottom:'2px solid var(--v2-ink)'}}>
          <div style={{width:40, height:4, background:'var(--v2-ink)', margin:'0 auto 12px'}}/>
          <div className="v2-eyebrow">LOADED LABOR · EDIT</div>
          <h3 className="v2-h3" style={{marginTop:6}}>Workers Comp</h3>
        </div>

        <div style={{padding:'24px 20px 0'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>RATE</div>
          <div style={{display:'flex', alignItems:'baseline', gap:12, marginTop:10}}>
            <div className="v2-bignum" style={{fontSize:64, lineHeight:0.9}}>17.5<span className="unit">%</span></div>
            <button className="v2-iconbtn">−</button>
            <button className="v2-iconbtn accent">+</button>
          </div>
          <div className="v2-mono" style={{marginTop:12, color:'var(--v2-ink-3)', fontWeight:600, fontSize:11}}>OF $32/H BASE = $5.60/H</div>
        </div>

        <div style={{padding:'20px'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>SOURCE</div>
          <div style={{marginTop:8, padding:'12px 14px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)'}}>
            <div className="v2-mono" style={{fontSize:11, fontWeight:600, color:'var(--v2-ink)'}}>WCB ALBERTA · CONSTRUCTION CODE 4202</div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:4, fontWeight:600}}>UPDATED ANNUALLY · NEXT REVIEW JAN 2027</div>
          </div>
        </div>

        <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
          <button className="v2-btn ghost" style={{flex:1}}>CANCEL</button>
          <button className="v2-btn primary" style={{flex:2}}>SAVE · RECALC ALL BIDS</button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// FIX 5 (IMP) · Custom role editor
// =====================================================================
function V2CustomRoleEditor() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">CUSTOM ROLE</div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>NAME</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:18}}>
          LEAD FOREMAN<span style={{display:'inline-block', width:2, height:18, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:2}}/>
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>INHERIT FROM</div>
        <div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, border:'2px solid var(--v2-ink)'}}>
          {[{l:'OWNER'},{l:'ESTIMATOR'},{l:'FOREMAN', on:true},{l:'CREW'}].map((t, i) => {
            const isRight = i % 2 === 1;
            const isLastRow = i >= 2;
            return (
              <button key={t.l} style={{
                padding:'16px 0', background: t.on ? 'var(--v2-accent)' : 'transparent',
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

      <div className="v2-section-bar"><div className="v2-eyebrow">EXTRA POWERS · ON TOP OF FOREMAN</div></div>
      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {[
          { l:'AUTH MATERIALS · UP TO $', sub:'CUSTOM LIMIT', toggle:true, on:true, v:'$1,000' },
          { l:'EDIT PRICING BOOK',         sub:'',             toggle:true, on:false },
          { l:'APPROVE OT',                sub:'PER WEEK',    toggle:true, on:true, v:'≤ 8H' },
          { l:'CREATE PROJECT',             sub:'',             toggle:true, on:false },
        ].map((r, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:14}}>
            <div style={{width:24, height:24, background: r.on ? 'var(--v2-accent)' : 'transparent', border:'2px solid var(--v2-ink)', flexShrink:0}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{r.l}</div>
              {(r.sub || r.v) && <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.sub}{r.sub && r.v && ' · '}{r.v}</div>}
            </div>
            {r.v && <div className="v2-mono" style={{fontSize:13, fontWeight:800}}>{r.v}</div>}
          </div>
        ))}
      </div>

      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">CREATE · ASSIGN TO 2 FOREMEN</button>
      </div>
    </div>
  );
}

// =====================================================================
// FIX 6 (IMP) · Multi-anomaly crew row
// =====================================================================
function V2CrewRowMultiAnomaly() {
  const crew = [
    { who:'TOMÁS REYES', proj:'HILLCREST', hrs:'42.5', flags:['OT 2.5H','LUNCH SKIP','LATE CLOCK-OUT'] },
    { who:'ANA CASTILLO', proj:'HILLCREST', hrs:'40.0', flags:[] },
    { who:'DIEGO ALDANA', proj:'ASPEN',     hrs:'37.0', flags:['BLOCKED 2H'] },
    { who:'CARLOS GUZMÁN', proj:'GREENWILLOW', hrs:'0', flags:['NO SHOW','PRIOR ABSENCE'] },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">WEEK · MAY 4</div>
          <div className="v2-appbar-title">TIME · FLAG STACKS</div>
        </div>
      </div>

      <div style={{padding:'14px 20px', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
        <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5}}>● MULTI-FLAG STACK — TAP A ROW WITH STACKED FLAGS TO RESOLVE EACH ONE.</div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {crew.map((r, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)'}}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:6, alignSelf:'stretch', minHeight:32, background: r.flags.length > 1 ? 'var(--v2-bad)' : r.flags.length === 1 ? 'var(--v2-warn)' : 'var(--v2-line-soft)'}}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{r.who}</div>
                <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.proj}</div>
              </div>
              <div className="v2-mono" style={{fontSize:14, fontWeight:800}}>{r.hrs}</div>
            </div>
            {r.flags.length > 0 && (
              <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:10, marginLeft:18}}>
                {r.flags.map((f, j) => (
                  <span key={j} style={{padding:'3px 8px', background: f.includes('NO SHOW') || f.includes('LATE') || f.includes('SKIP') ? 'var(--v2-bad)' : 'var(--v2-warn)', color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:800, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>{f}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// FIX 7 (IMP) · WEARING pill in app bar · propagated demo
// =====================================================================
function V2WearingAppbarDemo() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar" style={{justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:12, flex:1}}>
          <div style={{flex:1}}>
            <div className="v2-eyebrow">MON · MAY 4</div>
            <div className="v2-appbar-title">DASHBOARD</div>
          </div>
        </div>
        <button style={{display:'inline-flex', alignItems:'center', gap:6, padding:'6px 10px', background:'var(--v2-ink)', color:'var(--v2-accent)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', cursor:'pointer'}}>
          <span style={{opacity:0.6}}>WEARING</span>
          <span>OWNER</span>
          <span style={{fontFamily:'var(--v2-font-tight)', fontSize:14, lineHeight:1}}>▾</span>
        </button>
      </div>

      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5}}>● THE WEARING ▾ PILL NOW LIVES IN EVERY APP BAR. PROPAGATES TO OWNER/EST/FOREMAN/WORKER VARIANTS. AUTO-HIDES FOR 1-ROLE USERS.</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">PLACEMENT RULES</div></div>
      <div style={{padding:'14px 20px', display:'flex', flexDirection:'column', gap:12}}>
        {[
          { l:'TOP-RIGHT OF APP BAR',        sub:'AFTER TITLE · BEFORE MENU BUTTONS' },
          { l:'INK FILL · ACCENT TEXT',      sub:'ON LIGHT THEME (OWNER/EST/FOREMAN)' },
          { l:'ACCENT FILL · INK TEXT',      sub:'ON DARK THEME (WORKER)' },
          { l:'HIDDEN IF SINGLE ROLE',        sub:'AUTO-RESOLVE FROM USER PERMISSIONS' },
        ].map((r, i) => (
          <div key={i} style={{padding:'12px 14px', border:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:13}}>{r.l}</div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.sub}</div>
          </div>
        ))}
      </div>

      <div className="v2-flex-1"/>
    </div>
  );
}

// =====================================================================
// FIX 8 (IMP) · Foreman DENIED feedback
// =====================================================================
function V2ForemanDenied() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">FROM MIKE</div>
      </div>

      <div style={{padding:'24px 20px', background:'var(--v2-bad)', color:'#fff', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:800, letterSpacing:'0.08em'}}>● DENIED</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, lineHeight:0.92, letterSpacing:'-0.03em', marginTop:14}}>$510 EPS order — not yet.</div>
      </div>

      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>WHY</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontSize:14, lineHeight:1.5}}>
          Aspen is already over budget. Pull what you can from yard + delay the rest till Friday after I talk to Calvera.
        </div>
        <div className="v2-mono" style={{marginTop:8, fontSize:10, color:'var(--v2-ink-3)', fontWeight:600}}>9:14 AM · MIKE DAVIS</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">SUGGESTED ALTERNATIVES</div></div>
      <div style={{padding:'14px 20px', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">PULL 4 SHEETS FROM YARD</button>
        <button className="v2-btn ghost">REPLY TO MIKE</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-ink-3)', borderColor:'var(--v2-line-soft)'}}>UPDATE DIEGO</button>
      </div>

      <div className="v2-flex-1"/>
    </div>
  );
}

// =====================================================================
// FIX 9 (CRIT-IA) · Schema spec block
// =====================================================================
function V2SchemaSpec() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">SCHEMA · NEW</div>
      </div>

      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">3 ENTITIES TO ADD</div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5, fontSize:11}}>BACKEND CONTRACT FOR THE 3 CRITICAL SCHEMA GAPS.</div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto', padding:'14px 20px'}}>
        {[
          { l:'Guardrail', sub:'+ Snooze', fields:'id · projectId · type (MARGIN|SCHEDULE|SAFETY) · threshold · currentValue · status (ARMED|TRIGGERED|SNOOZED|MUTED) · snoozedUntil · mutedReason' },
          { l:'ChangeOrder', sub:'project addendum', fields:'id · projectId · number · description · valueDelta · status (DRAFT|SENT|ACCEPTED|REJECTED) · createdBy · approvedBy' },
          { l:'LostReason', sub:'enum + freeform', fields:'PRICE · TIMING · SCOPE · GHOSTED · COMPETITOR · OTHER · note (optional)' },
        ].map((e, i) => (
          <div key={i} style={{padding:'14px', border:'2px solid var(--v2-ink)', marginBottom:12, background:'var(--v2-sand-soft)'}}>
            <div style={{display:'flex', alignItems:'baseline', gap:8}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:16}}>{e.l}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:600}}>{e.sub}</div>
            </div>
            <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-2)', marginTop:8, fontWeight:500, lineHeight:1.5, wordBreak:'break-word'}}>{e.fields}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  V2PricingItemEdit, V2ProjectLost, V2StateOfflineWorker,
  V2BurdenLineEdit, V2CustomRoleEditor,
  V2CrewRowMultiAnomaly, V2WearingAppbarDemo, V2ForemanDenied,
  V2SchemaSpec,
});
