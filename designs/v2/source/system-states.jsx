/* global React */

// ============================================================
// SYSTEM STATES · V2 (Section 18)
// Offline · Error · Empty · Loading · Perm denied · Stale ·
// Splash · Safety interrupt.
// Brutalist · hard-edge · no decoration that doesn't earn its keep.
// ============================================================

function V2SbLight() {
  return (
    <div style={{height:32, padding:'10px 18px 0', display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'JetBrains Mono, monospace', fontSize:12, fontWeight:500, flexShrink:0, color:'var(--v2-ink)'}}>
      <span>9:41</span>
      <span style={{display:'flex', gap:6, alignItems:'center'}}>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor"><rect x="0" y="6" width="3" height="4"/><rect x="5" y="4" width="3" height="6"/><rect x="10" y="2" width="3" height="8"/><rect x="15" y="0" width="3" height="10"/></svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="20" height="8"/><rect x="23" y="4" width="2" height="4" fill="currentColor"/><rect x="3" y="4" width="14" height="4" fill="currentColor"/></svg>
      </span>
    </div>
  );
}
function V2SbDark() {
  return (
    <div style={{height:32, padding:'10px 18px 0', display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'JetBrains Mono, monospace', fontSize:12, fontWeight:500, flexShrink:0, color:'var(--v2-sand)'}}>
      <span>9:41</span>
      <span style={{display:'flex', gap:6, alignItems:'center'}}>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor"><rect x="0" y="6" width="3" height="4"/><rect x="5" y="4" width="3" height="6"/><rect x="10" y="2" width="3" height="8"/><rect x="15" y="0" width="3" height="10"/></svg>
      </span>
    </div>
  );
}

// =====================================================================
// 1 · OFFLINE
// =====================================================================
function V2StateOffline() {
  return (
    <div className="v2 v2-screen">
      <V2SbLight/>
      {/* Banner */}
      <div style={{padding:'14px 20px', background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', gap:12, borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{width:14, height:14, background:'var(--v2-bad)'}}/>
        <div style={{flex:1}}>
          <div className="v2-mono" style={{fontSize:11, fontWeight:700, letterSpacing:'0.06em', color:'var(--v2-bad)'}}>OFFLINE</div>
          <div className="v2-mono" style={{fontSize:11, fontWeight:600, color:'var(--v2-ink-4)', marginTop:3}}>NO SIGNAL · WORK QUEUED LOCALLY</div>
        </div>
      </div>

      {/* Big number */}
      <div style={{padding:'32px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">ACTIONS QUEUED</div>
        <div className="v2-bignum" style={{fontSize:96, marginTop:10, lineHeight:0.9}}>4</div>
        <div className="v2-mono" style={{marginTop:12, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5}}>SYNC AUTOMATICALLY WHEN YOU\u2019RE BACK ON.</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">QUEUED</div></div>
      {[
        { l:'CLOCKED IN · HILLCREST', t:'7:02 AM' },
        { l:'PHOTO LOGGED · EPS EAST', t:'8:14 AM' },
        { l:'PHOTO LOGGED · EPS EAST', t:'10:32 AM' },
        { l:'BLOCKER FLAGGED · OUT OF EPS', t:'11:08 AM' },
      ].map((r, i) => (
        <div key={i} className="v2-row">
          <span style={{width:6, alignSelf:'stretch', background:'var(--v2-accent)'}}/>
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{r.l}</div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.t} · WAITING</div>
          </div>
        </div>
      ))}

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn ghost">RETRY SYNC NOW</button>
      </div>
    </div>
  );
}

// =====================================================================
// 2 · ERROR
// =====================================================================
function V2StateError() {
  return (
    <div className="v2 v2-screen">
      <V2SbLight/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">SOMETHING BROKE</div>
      </div>

      <div style={{padding:'32px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{width:72, height:72, background:'var(--v2-bad)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:42, border:'2px solid var(--v2-ink)'}}>!</div>
        <h2 className="v2-h2" style={{marginTop:24, color:'var(--v2-bad)'}}>Couldn't load.</h2>
        <div className="v2-body" style={{marginTop:12, color:'var(--v2-ink-2)'}}>The server didn't answer. Your changes are safe locally.</div>
      </div>

      <div style={{padding:'18px 20px', background:'var(--v2-sand-soft)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">ERROR CODE</div>
        <div className="v2-mono" style={{marginTop:8, fontSize:14, fontWeight:700}}>SLR_504 · GATEWAY TIMEOUT</div>
        <div className="v2-mono" style={{marginTop:6, fontSize:11, color:'var(--v2-ink-3)', fontWeight:600}}>3:24 PM · projects/hillcrest/photos</div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">TRY AGAIN</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-ink-3)', borderColor:'var(--v2-line-soft)'}}>SEND ERROR REPORT</button>
      </div>
    </div>
  );
}

// =====================================================================
// 3 · EMPTY (no projects yet)
// =====================================================================
function V2StateEmpty() {
  return (
    <div className="v2 v2-screen">
      <V2SbLight/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">PROJECTS</div>
          <div className="v2-appbar-title">NOTHING YET</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      <div className="v2-flex-1" style={{padding:'48px 24px', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
        {/* Big graphic mark */}
        <div style={{display:'flex', gap:0, marginBottom:32}}>
          <div style={{width:60, height:60, background:'var(--v2-accent)', border:'2px solid var(--v2-ink)'}}/>
          <div style={{width:60, height:60, background:'var(--v2-sand)', border:'2px solid var(--v2-ink)', borderLeft:'none'}}/>
          <div style={{width:60, height:60, background:'var(--v2-ink)', border:'2px solid var(--v2-ink)', borderLeft:'none'}}/>
        </div>
        <h2 className="v2-h2">No projects yet.</h2>
        <div className="v2-body" style={{marginTop:14, color:'var(--v2-ink-2)', maxWidth:280}}>Start with a takeoff or jump in with a blank project. Either way, this is where the work lives.</div>

        <div style={{marginTop:32, display:'flex', flexDirection:'column', gap:12, width:'100%'}}>
          <button className="v2-btn primary">START A TAKEOFF</button>
          <button className="v2-btn ghost">BLANK PROJECT</button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// 4 · LOADING
// =====================================================================
function V2StateLoading() {
  return (
    <div className="v2 v2-screen">
      <V2SbLight/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">LOADING</div>
          <div className="v2-appbar-title">HILLCREST</div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{height:16, background:'var(--v2-line-soft)', width:'40%'}}/>
        <div style={{height:60, background:'var(--v2-ink-3)', marginTop:14, opacity:0.3}}/>
        <div style={{height:8, background:'var(--v2-line-soft)', marginTop:14}}/>
      </div>

      {/* KPI skeleton */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'18px 20px', borderRight:'2px solid var(--v2-ink)'}}>
          <div style={{height:10, background:'var(--v2-line-soft)', width:'50%'}}/>
          <div style={{height:32, background:'var(--v2-ink-3)', marginTop:8, opacity:0.3, width:'70%'}}/>
        </div>
        <div style={{padding:'18px 20px'}}>
          <div style={{height:10, background:'var(--v2-line-soft)', width:'50%'}}/>
          <div style={{height:32, background:'var(--v2-ink-3)', marginTop:8, opacity:0.3, width:'80%'}}/>
        </div>
      </div>

      <div className="v2-flex-1" style={{padding:'14px 20px'}}>
        {[1,2,3].map(i => (
          <div key={i} style={{padding:'16px 0', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:14}}>
            <div style={{width:44, height:44, background:'var(--v2-ink-3)', opacity:0.3}}/>
            <div style={{flex:1}}>
              <div style={{height:14, background:'var(--v2-line-soft)', width:'60%'}}/>
              <div style={{height:10, background:'var(--v2-line-soft)', marginTop:6, width:'40%'}}/>
            </div>
          </div>
        ))}
      </div>

      {/* Indicator strip */}
      <div style={{padding:'12px 20px', background:'var(--v2-accent)', borderTop:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:14, height:14, background:'var(--v2-ink)', animation:'pulse 1s infinite'}}/>
        <div className="v2-mono" style={{fontSize:11, fontWeight:700, color:'var(--v2-accent-ink)', letterSpacing:'0.06em'}}>LOADING · HOLD TIGHT</div>
      </div>
    </div>
  );
}

// =====================================================================
// 5 · PERMISSION DENIED
// =====================================================================
function V2StatePermDenied() {
  return (
    <div className="v2 v2-screen">
      <V2SbLight/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">PERMISSION NEEDED</div>
      </div>

      <div style={{padding:'32px 20px 20px'}}>
        <div style={{width:72, height:72, background:'var(--v2-accent)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32}}>📍</div>
        <h2 className="v2-h2" style={{marginTop:24}}>Location is off.</h2>
        <div className="v2-body" style={{marginTop:12, color:'var(--v2-ink-2)', lineHeight:1.5}}>
          We can\u2019t auto clock-in or show the crew map without it. You can still log time manually.
        </div>
      </div>

      <div style={{padding:'0 20px'}}>
        <div style={{padding:'16px', border:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>WHEN ENABLED</div>
          <div className="v2-mono" style={{fontSize:12, marginTop:8, fontWeight:600, lineHeight:1.5, color:'var(--v2-ink-2)'}}>
            · AUTO CLOCK-IN ON ARRIVAL<br/>
            · LIVE CREW MAP<br/>
            · OUT-OF-FENCE ALERTS
          </div>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">OPEN SETTINGS</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-ink-3)', borderColor:'var(--v2-line-soft)'}}>CLOCK IN MANUALLY</button>
      </div>
    </div>
  );
}

// =====================================================================
// 6 · STALE / VERSION MISMATCH
// =====================================================================
function V2StateStale() {
  return (
    <div className="v2 v2-screen">
      <V2SbLight/>
      <div style={{padding:'24px 20px', background:'var(--v2-accent)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:700, color:'var(--v2-accent-ink)', letterSpacing:'0.08em'}}>● NEW VERSION</div>
        <h2 className="v2-h2" style={{marginTop:10, color:'var(--v2-accent-ink)'}}>Sitelayer got an update.</h2>
        <div className="v2-body" style={{marginTop:10, color:'var(--v2-accent-ink)'}}>Reload to keep using. Your work is safe.</div>
      </div>

      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">WHAT'S NEW</div>
        <div className="v2-mono" style={{marginTop:10, fontSize:12, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.6}}>
          + AI auto-takeoff drafts<br/>
          + Cross-sheet reference jumps<br/>
          + Faster offline sync
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">RELOAD APP</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-ink-3)', borderColor:'var(--v2-line-soft)'}}>LATER</button>
      </div>
    </div>
  );
}

// =====================================================================
// 7 · SPLASH · cold start
// =====================================================================
function V2StateSplash() {
  return (
    <div className="v2 v2-screen" style={{background:'var(--v2-accent)'}}>
      <V2SbLight/>
      <div className="v2-flex-1" style={{display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 32px', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, opacity:0.08, backgroundImage:'repeating-linear-gradient(135deg, transparent 0 22px, var(--v2-ink) 22px 26px)'}}/>
        <div style={{position:'relative'}}>
          <div style={{width:72, height:72, background:'var(--v2-ink)', color:'var(--v2-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:900, fontSize:32, letterSpacing:'-0.04em'}}>SL</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:64, lineHeight:0.85, letterSpacing:'-0.04em', color:'var(--v2-accent-ink)', marginTop:36}}>SITELAYER.</div>
          <div className="v2-mono" style={{fontSize:13, marginTop:16, color:'var(--v2-accent-ink)', fontWeight:700, letterSpacing:'0.06em'}}>RUN THE DAY.</div>
        </div>
      </div>
      <div style={{padding:'20px 24px', display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:10, height:10, background:'var(--v2-ink)', animation:'pulse 1s infinite'}}/>
        <div className="v2-mono" style={{fontSize:11, fontWeight:700, color:'var(--v2-accent-ink)', letterSpacing:'0.06em'}}>LOADING…</div>
      </div>
    </div>
  );
}

// =====================================================================
// 8 · SAFETY INTERRUPT · full-screen STOP WORK
// =====================================================================
function V2StateSafetyInterrupt() {
  return (
    <div className="v2 v2-screen" style={{background:'var(--v2-bad)', color:'#fff', overflow:'hidden'}}>
      <V2SbDark/>
      <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(135deg, transparent 0 28px, rgba(0,0,0,.14) 28px 32px)', pointerEvents:'none'}}/>

      <div style={{padding:'28px 22px 12px', position:'relative', zIndex:1}}>
        <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'6px 12px', background:'rgba(0,0,0,.4)'}}>
          <span style={{width:10, height:10, background:'#fff', animation:'pulse 1s infinite'}}/>
          <span className="v2-mono" style={{fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'#fff'}}>STOP WORK · LIVE</span>
        </div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:48, lineHeight:0.9, letterSpacing:'-0.03em', marginTop:16, color:'#fff'}}>Safety stop<br/>at Aspen Ridge.</div>
        <div className="v2-body" style={{marginTop:12, color:'rgba(255,255,255,.85)', lineHeight:1.45}}>Diego Aldana raised STOP WORK 24 seconds ago. 6 crew paused. Foreman moving in.</div>
      </div>

      <div style={{margin:'12px 16px 0', height:130, border:'2px solid #fff', background:'rgba(0,0,0,.25)', position:'relative', overflow:'hidden', zIndex:1}}>
        <svg viewBox="0 0 290 130" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect x="90" y="20" width="100" height="90" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 3"/>
          <g transform="translate(140 65)">
            <circle r="22" fill="rgba(255,255,255,.30)"><animate attributeName="r" values="12;28;12" dur="1.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;.05;.5" dur="1.2s" repeatCount="indefinite"/></circle>
            <rect x="-8" y="-8" width="16" height="16" fill="#fff"/>
          </g>
        </svg>
      </div>

      <div style={{padding:'14px 16px 0', position:'relative', zIndex:1}}>
        <div style={{padding:'12px 14px', background:'rgba(0,0,0,.30)', border:'1.5px solid rgba(255,255,255,.3)', display:'grid', gridTemplateColumns:'1fr 1fr 1fr'}}>
          <div><div style={{fontFamily:'JetBrains Mono', fontSize:9, fontWeight:700, opacity:.65}}>REPORTER</div><div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:13, marginTop:4}}>DIEGO A.</div></div>
          <div style={{borderLeft:'1px solid rgba(255,255,255,.25)', borderRight:'1px solid rgba(255,255,255,.25)', paddingLeft:10}}><div style={{fontFamily:'JetBrains Mono', fontSize:9, fontWeight:700, opacity:.65}}>PAUSED</div><div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:13, marginTop:4}}>6 ON SITE</div></div>
          <div style={{paddingLeft:10}}><div style={{fontFamily:'JetBrains Mono', fontSize:9, fontWeight:700, opacity:.65}}>SINCE</div><div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:13, marginTop:4, fontVariantNumeric:'tabular-nums'}}>0:24</div></div>
        </div>
      </div>

      <div className="v2-flex-1" style={{position:'relative', zIndex:1}}/>

      <div style={{padding:'14px 16px 18px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn" style={{background:'#fff', color:'var(--v2-bad)', border:'2px solid #fff', minHeight:60, fontSize:18, fontWeight:800}}>ACKNOWLEDGE · I SEE THIS</button>
        <div style={{display:'flex', gap:8}}>
          <button className="v2-btn" style={{flex:1, background:'rgba(0,0,0,.3)', color:'#fff', border:'1.5px solid rgba(255,255,255,.4)', minHeight:48, fontSize:14}}>CALL SITE</button>
          <button className="v2-btn" style={{flex:1, background:'rgba(0,0,0,.3)', color:'#fff', border:'1.5px solid rgba(255,255,255,.4)', minHeight:48, fontSize:14}}>OPEN THREAD</button>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100% {opacity:1;} 50% {opacity:.4;} }`}</style>
    </div>
  );
}

Object.assign(window, {
  V2StateOffline, V2StateError, V2StateEmpty, V2StateLoading,
  V2StatePermDenied, V2StateStale, V2StateSplash, V2StateSafetyInterrupt,
});
