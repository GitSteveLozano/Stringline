/* global React */

// ============================================================
// REMAINING ROLE GAPS · V2 (Section 22)
// Schedule (owner authors → foreman/crew sees) ·
// Time approvals queue (owner cross-project) · Clients list ·
// Project lifecycle states (drafting → sent → accepted → done →
// paid → archived) · Attention snooze sheet.
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
// 1 · SCHEDULE · WEEK (owner authors)
// =====================================================================
function V2ScheduleWeek() {
  const days = [
    { d:'MON 5', cells:[{c:'HC', t:'EPS · 3 CREW'},{c:'AR', t:'BASE · 4'}] },
    { d:'TUE 6', cells:[{c:'HC', t:'EPS · 3 CREW'},{c:'AR', t:'BASE · 4'}] },
    { d:'WED 7', cells:[{c:'HC', t:'EPS · 3 CREW'},{c:'GW', t:'STONE · 5'}], rain:true },
    { d:'THU 8', cells:[{c:'GW', t:'STONE · 11'}] },
    { d:'FRI 9', cells:[{c:'GW', t:'STONE · 11'}] },
  ];
  const colors = { HC:'var(--v2-accent)', AR:'var(--v2-bad)', GW:'var(--v2-good)' };
  return (
    <div className="v2 v2-screen">
      <V2Sb time="6:42"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">WEEK · MAY 5 → 9</div>
          <div className="v2-appbar-title">SCHEDULE</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      <div style={{display:'flex', gap:0, borderBottom:'2px solid var(--v2-ink)'}}>
        {[{l:'DAY'},{l:'WEEK', on:true},{l:'4 WK'}].map((t, i, arr) => (
          <button key={t.l} style={{flex:1, padding:'14px 0', background: t.on ? 'var(--v2-ink)' : 'transparent', color: t.on ? 'var(--v2-sand)' : 'var(--v2-ink-3)', border:'none', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.06em'}}>{t.l}</button>
        ))}
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {days.map((d, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)'}}>
            <div style={{display:'flex', alignItems:'baseline', gap:10}}>
              <div className="v2-mono" style={{fontSize:12, fontWeight:800, color:'var(--v2-ink)'}}>{d.d}</div>
              {d.rain && <span style={{padding:'2px 6px', background:'var(--v2-bad)', color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.06em'}}>● RAIN</span>}
            </div>
            <div style={{marginTop:8, display:'flex', flexDirection:'column', gap:6}}>
              {d.cells.map((c, j) => (
                <div key={j} style={{padding:'10px 12px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', borderLeft:`6px solid ${colors[c.c]}`, display:'flex', alignItems:'center', gap:10}}>
                  <div className="v2-mono" style={{fontSize:11, fontWeight:800, width:24}}>{c.c}</div>
                  <div className="v2-mono" style={{fontSize:11, fontWeight:600, flex:1}}>{c.t}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 2 · NEW ASSIGNMENT SHEET
// =====================================================================
function V2NewAssignment() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">✕</button>
        <div className="v2-appbar-title">NEW ASSIGNMENT</div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>PROJECT</div>
        <div style={{marginTop:8, padding:'16px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:10}}>
          <div style={{flex:1, fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16}}>HILLCREST PH 4</div>
          <span className="v2-mono" style={{fontSize:14, fontWeight:800}}>▾</span>
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>WHEN</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)'}}>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:22, fontVariantNumeric:'tabular-nums'}}>WED MAY 7 · 7AM</div>
          <div className="v2-mono" style={{marginTop:4, color:'var(--v2-ink-3)', fontWeight:600, fontSize:11}}>RAIN FORECAST · WRAP BY LUNCH</div>
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>CREW · 3 PEOPLE</div>
        <div style={{marginTop:8, display:'flex', gap:6, flexWrap:'wrap'}}>
          {[{l:'ANA C.', on:true},{l:'MARCUS L.', on:true},{l:'TOMÁS R.', on:true},{l:'+ ADD'}].map((p, i) => (
            <button key={i} style={{padding:'10px 14px', background: p.on ? 'var(--v2-ink)' : 'transparent', color: p.on ? 'var(--v2-sand)' : 'var(--v2-ink-3)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.06em'}}>{p.l}</button>
          ))}
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>SCOPE</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontSize:14, lineHeight:1.45}}>
          EPS East — anchor + plate top to bottom.<span style={{display:'inline-block', width:2, height:14, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:2}}/>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">SAVE · NOTIFY CREW</button>
      </div>
    </div>
  );
}

// =====================================================================
// 3 · TIME APPROVALS QUEUE (cross-project)
// =====================================================================
function V2TimeApprovals() {
  const week = [
    { who:'ANA CASTILLO',  proj:'HILLCREST', hrs:'40.0',  status:'PEND', flag:null },
    { who:'MARCUS LEE',    proj:'HILLCREST', hrs:'40.0',  status:'PEND', flag:null },
    { who:'TOMÁS REYES',   proj:'HILLCREST', hrs:'42.5',  status:'PEND', flag:'OT 2.5H' },
    { who:'DIEGO ALDANA',  proj:'ASPEN',     hrs:'37.0',  status:'PEND', flag:null },
    { who:'SARA VEGA',     proj:'ASPEN',     hrs:'40.0',  status:'PEND', flag:null },
    { who:'CARLOS GUZMÁN', proj:'GREENWILLOW', hrs:'0',  status:'NOSHOW', flag:'NO SHOW' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb time="14:48"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">WEEK · APR 27 → MAY 3</div>
          <div className="v2-appbar-title">TIME · 6 PENDING</div>
        </div>
      </div>

      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">TOTAL HOURS</div>
        <div className="v2-bignum" style={{fontSize:72, marginTop:10}}>199<span className="unit">.5 H</span></div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5}}>BURDEN: $10,813 · 2 FLAGS</div>
      </div>

      <div style={{display:'flex', gap:6, padding:'12px 20px', borderBottom:'2px solid var(--v2-ink)', overflowX:'auto'}}>
        {[{l:'ALL · 6', on:true},{l:'FLAGGED · 2'},{l:'PER PROJECT'}].map(c => (
          <button key={c.l} style={{padding:'8px 12px', background: c.on ? 'var(--v2-ink)' : 'transparent', color: c.on ? 'var(--v2-sand)' : 'var(--v2-ink-3)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', whiteSpace:'nowrap'}}>{c.l}</button>
        ))}
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {week.map((r, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:6, alignSelf:'stretch', background: r.flag ? 'var(--v2-bad)' : 'var(--v2-line-soft)'}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{r.who}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.proj}{r.flag && ` · ${r.flag}`}</div>
            </div>
            <div className="v2-mono" style={{fontSize:14, fontWeight:800, fontVariantNumeric:'tabular-nums'}}>{r.hrs}</div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:16, color:'var(--v2-ink-3)'}}>→</div>
          </div>
        ))}
      </div>

      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>REVIEW FLAGGED</button>
        <button className="v2-btn primary" style={{flex:2}}>APPROVE ALL CLEAN · 4</button>
      </div>
    </div>
  );
}

// =====================================================================
// 4 · CLIENTS LIST
// =====================================================================
function V2ClientsList() {
  const clients = [
    { i:'JM', n:'JOHN MARCHETTI',     org:'HILLCREST HOMES CO',   ltv:'$546K', proj:4, hot:true },
    { i:'CB', n:'CALVERA BUILDERS',   org:'COMMERCIAL GC',         ltv:'$420K', proj:6 },
    { i:'GW', n:'GREENWILLOW LIVING', org:'SR CARE',               ltv:'$118K', proj:1 },
    { i:'FH', n:'FOOTHILLS HEALTH',   org:'MEDICAL · PENDING BID', ltv:'$0',    proj:0 },
    { i:'RB', n:'RIVER BEND HOMES',   org:'RESIDENTIAL · ARCHIVED', ltv:'$84K', proj:0 },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">CLIENTS</div>
          <div className="v2-appbar-title">5 ACCOUNTS</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      <div style={{padding:'14px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:10}}>
          <span className="v2-mono" style={{fontWeight:700}}>↳</span>
          <span style={{flex:1, color:'var(--v2-ink-4)', fontSize:15}}>Search clients…</span>
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {clients.map((c, i) => (
          <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'14px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div style={{width:44, height:44, background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14, flexShrink:0}}>{c.i}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:6}}>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{c.n}</div>
                {c.hot && <span style={{padding:'2px 5px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', fontFamily:'var(--v2-font-mono)', fontSize:8, fontWeight:800, letterSpacing:'0.06em'}}>HOT</span>}
              </div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{c.org}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="v2-mono" style={{fontSize:13, fontWeight:800, color: c.ltv === '$0' ? 'var(--v2-ink-3)' : 'var(--v2-good)'}}>{c.ltv}</div>
              <div className="v2-mono" style={{fontSize:9, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{c.proj} PROJ</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 5 · PROJECT LIFECYCLE — STATE SET on one project
// =====================================================================
function V2ProjectState({ state }) {
  const states = {
    DRAFTING: { color:'var(--v2-ink-3)', bigLabel:'DRAFTING', sub:'TAKEOFF + PRICE', body:'No proposal sent yet. Finish the takeoff, set your margin, send to John.', btn:'OPEN TAKEOFF · PRICE & SEND', secondary:'PREVIEW PDF' },
    SENT:     { color:'var(--v2-accent)', bigLabel:'SENT',     sub:'AWAITING RESPONSE',     body:'John was emailed the proposal 3 days ago. Last opened yesterday.', btn:'NUDGE JOHN', secondary:'WITHDRAW' },
    ACCEPTED: { color:'var(--v2-good)', bigLabel:'ACCEPTED',   sub:'CONTRACT SIGNED',       body:'$184K contract signed 5/1. Kick off next Monday.', btn:'KICK OFF · MAY 5', secondary:'AMEND' },
    PAID:     { color:'var(--v2-good)', bigLabel:'PAID',       sub:'CLOSED · MAY 28',       body:'Final invoice cleared. Margin: 34%. Project archived.', btn:'OPEN POST-MORTEM', secondary:'ARCHIVE' },
  };
  const s = states[state];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">JOHN MARCHETTI</div>
          <div className="v2-appbar-title">HILLCREST PH 4</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div style={{padding:'32px 20px', borderBottom:'2px solid var(--v2-ink)', background: s.color === 'var(--v2-accent)' ? 'var(--v2-accent)' : 'transparent'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:700, color: s.color === 'var(--v2-accent)' ? 'var(--v2-accent-ink)' : s.color, letterSpacing:'0.08em'}}>● {s.bigLabel}</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:48, lineHeight:0.92, letterSpacing:'-0.03em', marginTop:14, color: s.color === 'var(--v2-accent)' ? 'var(--v2-accent-ink)' : 'var(--v2-ink)'}}>{s.sub}</div>
        <div className="v2-body" style={{marginTop:12, color: s.color === 'var(--v2-accent)' ? 'var(--v2-accent-ink)' : 'var(--v2-ink-2)'}}>{s.body}</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'18px 20px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow">VALUE</div>
          <div className="v2-bignum" style={{fontSize:36, marginTop:4}}>$184<span className="unit">K</span></div>
        </div>
        <div style={{padding:'18px 20px'}}>
          <div className="v2-eyebrow">{state === 'PAID' ? 'MARGIN' : 'EST. MARGIN'}</div>
          <div className="v2-bignum" style={{fontSize:36, marginTop:4, color: state === 'PAID' ? 'var(--v2-good)' : 'var(--v2-ink)'}}>34<span className="unit">%</span></div>
        </div>
      </div>

      {/* Lifecycle indicator */}
      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>LIFECYCLE</div>
        <div style={{marginTop:10, display:'flex', gap:0, border:'2px solid var(--v2-ink)'}}>
          {['DRAFT','SENT','ACCEPTED','PROGRESS','PAID'].map((step, i, arr) => {
            const idx = ['DRAFTING','SENT','ACCEPTED','PROGRESS','PAID'].indexOf(state);
            const stepIdx = i;
            const active = stepIdx === idx || (state === 'PAID' && step === 'PAID');
            const done = stepIdx < idx || (state === 'PAID' && stepIdx <= 4);
            return (
              <div key={step} style={{flex:1, padding:'10px 0', textAlign:'center', background: active ? 'var(--v2-accent)' : done ? 'var(--v2-ink)' : 'transparent', color: active ? 'var(--v2-accent-ink)' : done ? 'var(--v2-accent)' : 'var(--v2-ink-3)', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none'}}>
                <div className="v2-mono" style={{fontSize:9, fontWeight:800, letterSpacing:'0.04em'}}>{step}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">{s.btn}</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-ink-3)', borderColor:'var(--v2-line-soft)'}}>{s.secondary}</button>
      </div>
    </div>
  );
}

// =====================================================================
// 6 · ATTENTION SNOOZE SHEET
// =====================================================================
function V2SnoozeSheet() {
  const opts = [
    { l:'TOMORROW MORNING', sub:'DEFAULT', on:true },
    { l:'THIS AFTERNOON',   sub:'IN 4H' },
    { l:'NEXT MONDAY',      sub:'5 DAYS' },
    { l:'CUSTOM…',          sub:'PICK A TIME' },
  ];
  return (
    <div className="v2 v2-screen" style={{background:'rgba(0,0,0,0.55)'}}>
      <div style={{position:'absolute', inset:0, background:'var(--v2-sand)', opacity:0.3, zIndex:0}}/>

      <div style={{marginTop:'auto', background:'var(--v2-sand)', border:'2px solid var(--v2-ink)', borderBottom:'none', position:'relative', zIndex:1, display:'flex', flexDirection:'column'}}>
        <div style={{padding:'10px 20px 6px', borderBottom:'2px solid var(--v2-ink)'}}>
          <div style={{width:40, height:4, background:'var(--v2-ink)', margin:'0 auto 12px'}}/>
          <h3 className="v2-h3">Snooze "Aspen — labor hot"</h3>
          <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-3)', marginTop:8, fontWeight:600, lineHeight:1.45}}>SURFACES AGAIN WHEN SNOOZE ENDS · OR IF IT GETS WORSE.</div>
        </div>

        {opts.map((o, i) => (
          <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'18px 20px', background: o.on ? 'var(--v2-accent)' : 'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16, color: o.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink)'}}>{o.l}</div>
              <div className="v2-mono" style={{fontSize:10, marginTop:4, fontWeight:600, color: o.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)'}}>{o.sub}</div>
            </div>
            {o.on && <span className="v2-mono" style={{fontSize:14, fontWeight:800, color:'var(--v2-accent-ink)'}}>●</span>}
          </button>
        ))}

        <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
          <button className="v2-btn ghost" style={{color:'var(--v2-bad)', borderColor:'var(--v2-bad)'}}>DISMISS · NOT A PROBLEM</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  V2ScheduleWeek, V2NewAssignment,
  V2TimeApprovals,
  V2ClientsList,
  V2ProjectState,
  V2SnoozeSheet,
});
