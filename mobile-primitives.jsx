/* global React, MI, MTopBar, MRow, WorkerTabs */

// ============================================================
// WORKER EXTENSIONS — closes the worker audit:
// invite + first-run, manual clock-in, clock-out success,
// issue submitted, hours correction, time off, log history,
// notifications, profile.
// All dark-theme, glove-friendly, low-decision-density.
// ============================================================

// Local fallback if WorkerTabs isn't yet defined when this file parses.
function _WorkerTabs(props) {
  if (typeof WorkerTabs !== 'undefined') return <WorkerTabs {...props}/>;
  return null;
}

// ─── 1 · WORKER INVITE ACCEPT (phone-first) ───────────────────
function WorkerInviteAccept() {
  return (
    <div className="m" style={{background:'#0e0c0a', color:'#f3ecdf', overflow:'hidden'}}>
      <div style={{position:'relative', flex:'0 0 230px', overflow:'hidden', background:'linear-gradient(160deg, #2a1e14 0%, #0e0c0a 60%)'}}>
        <div style={{position:'absolute', top:-60, right:-40, width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle, rgba(217,144,74,.42) 0%, rgba(217,144,74,0) 70%)'}}/>
        <div style={{position:'relative', padding:'30px 24px 16px', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div style={{width:42, height:42, background:'#d9904a', borderRadius:11, display:'inline-flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 18px rgba(217,144,74,.35)'}}>
            <span style={{fontSize:18, fontWeight:700, color:'#fff', fontFamily:'Geist'}}>SL</span>
          </div>
          <div>
            <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'5px 10px 5px 5px', background:'rgba(243,236,223,.08)', border:'1px solid rgba(243,236,223,.10)', borderRadius:999, marginBottom:10}}>
              <div className="m-avatar" data-tone="1" data-size="sm" style={{width:22, height:22, fontSize:9}}>AC</div>
              <span style={{fontSize:11, color:'#aea69a'}}>Ana added you to the crew</span>
            </div>
            <div style={{fontSize:22, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.1}}>
              Join <span style={{color:'#d9904a'}}>Davis Stucco</span><br/>on your phone.
            </div>
            <div style={{fontSize:12, color:'rgba(243,236,223,.62)', marginTop:6}}>Auto clock-in · today's scope · daily photos.</div>
          </div>
        </div>
      </div>
      <div style={{flex:1, padding:'18px 16px', display:'flex', flexDirection:'column', gap:8}}>
        <div style={{padding:'12px 14px', background:'rgba(243,236,223,.05)', border:'1px solid rgba(243,236,223,.10)', borderRadius:12}}>
          <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:4}}>Your phone</div>
          <div style={{fontSize:16, fontWeight:600, fontFeatureSettings:'"tnum"', letterSpacing:'-.005em'}}>(403) 555-0142</div>
          <div style={{fontSize:11, color:'#8a8278', marginTop:2}}>Pre-filled by Ana · you'll verify with a 6-digit code</div>
        </div>

        <button style={{height:50, background:'#d9904a', color:'#fff', border:'none', borderRadius:13, fontFamily:'inherit', fontSize:15, fontWeight:600, marginTop:6}}>
          Send code via text
        </button>
        <button style={{height:44, background:'transparent', color:'#aea69a', border:'1px solid #2a241c', borderRadius:11, fontFamily:'inherit', fontSize:13, fontWeight:500}}>
          Use a different number
        </button>

        <div style={{marginTop:'auto', fontSize:10.5, color:'#5a5346', textAlign:'center', lineHeight:1.5}}>
          By continuing you accept <span style={{color:'#aea69a', textDecoration:'underline'}}>Terms</span> · <span style={{color:'#aea69a', textDecoration:'underline'}}>Privacy</span>
        </div>
      </div>
    </div>
  );
}

// ─── 2 · WORKER FIRST RUN (3-step setup) ──────────────────────
function WorkerFirstRun() {
  const steps = [
    { l:'Phone verified', s:'(403) 555-0142', done:true,  i:MI.check },
    { l:'Allow location',  s:'For auto clock-in when you arrive', done:false, active:true, i:MI.pin },
    { l:'Allow notifications', s:'Schedule changes only', done:false, i:MI.bell },
  ];
  return (
    <div className="m" style={{background:'#0e0c0a', color:'#f3ecdf'}}>
      <div style={{padding:'46px 24px 18px'}}>
        <div style={{fontSize:11, fontWeight:700, color:'#d9904a', letterSpacing:'.10em', textTransform:'uppercase'}}>You're in</div>
        <div style={{fontSize:26, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.1, marginTop:6}}>Welcome, Marcus.</div>
        <div style={{fontSize:13.5, color:'#aea69a', marginTop:8, lineHeight:1.45}}>Two more things, then your day starts.</div>
      </div>

      <div className="m-body" style={{padding:'0 16px'}}>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {steps.map((s, i) => (
            <div key={i} style={{padding:'14px', background: s.active ? '#1c1816' : (s.done ? '#15110d' : '#1c1816'), border: s.active ? '1.5px solid #d9904a' : '1px solid #2a241c', borderRadius:12, display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:34, height:34, borderRadius:9, background: s.done ? 'rgba(44,138,85,.14)' : s.active ? 'rgba(217,144,74,.12)' : '#2a241c', color: s.done ? '#7adba0' : s.active ? '#d9904a' : '#8a8278', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                {s.done ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><path d="M5 12l5 5L20 7"/></svg> : React.cloneElement(s.i, {width:17, height:17})}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:14, fontWeight:600, color: s.done ? '#aea69a' : '#f3ecdf'}}>{s.l}</div>
                <div style={{fontSize:11.5, color:'#8a8278', marginTop:1}}>{s.s}</div>
              </div>
              {s.active && <button style={{padding:'8px 14px', background:'#d9904a', color:'#fff', border:'none', borderRadius:8, fontSize:13, fontWeight:600, fontFamily:'inherit'}}>Allow</button>}
              {s.done && <span style={{fontSize:10, color:'#7adba0', fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase'}}>Done</span>}
            </div>
          ))}
        </div>

        <div style={{marginTop:18, padding:'12px 14px', background:'rgba(217,144,74,.08)', borderLeft:'3px solid #d9904a', borderRadius:10, fontSize:12, color:'#aea69a', lineHeight:1.5}}>
          <strong style={{color:'#f3ecdf'}}>About location:</strong> only checked when you're clocking in or out. No background tracking. Coords never leave your phone.
        </div>
      </div>

      <div style={{padding:'14px 16px calc(env(safe-area-inset-bottom, 0) + 16px)', borderTop:'1px solid #2a241c'}}>
        <button style={{width:'100%', height:50, background:'#d9904a', color:'#fff', border:'none', borderRadius:13, fontFamily:'inherit', fontSize:15, fontWeight:600}}>Skip for now \u00b7 go to Today</button>
      </div>
    </div>
  );
}

// ─── 3 · MANUAL CLOCK-IN (fallback) ───────────────────────────
function WorkerClockInManual() {
  return (
    <div className="m" style={{background:'#0e0c0a', color:'#f3ecdf', position:'relative'}}>
      <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'center', gap:10}}>
        <button style={{width:36, height:36, background:'#1c1816', border:'1px solid #2a241c', borderRadius:18, color:'#f3ecdf', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.close}</button>
        <div style={{flex:1, fontSize:17, fontWeight:600}}>Clock in manually</div>
      </div>

      {/* Reason banner */}
      <div style={{padding:'10px 20px 8px'}}>
        <div style={{padding:'10px 12px', background:'rgba(201,138,46,.10)', border:'1px solid rgba(201,138,46,.25)', borderRadius:10, fontSize:12, color:'#f2c97b', lineHeight:1.45, display:'flex', gap:8}}>
          <span style={{color:'#c98a2e', flexShrink:0}}>{MI.alert}</span>
          <span>Auto clock-in didn't fire. Likely: GPS still warming up, or you're outside the fence. Ana will review this entry.</span>
        </div>
      </div>

      {/* Project picker */}
      <div style={{padding:'14px 20px 6px'}}>
        <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8}}>Where are you?</div>
        <div style={{display:'flex', flexDirection:'column', gap:6}}>
          {[
            { l:'Hillcrest Mews', s:'Phase 4 \u00b7 your usual', d:'2.1 mi away', selected:true, t:'#E8A86B' },
            { l:'Aspen Ridge',     s:'Phase 1',                 d:'8.4 mi away', t:'#A05A33' },
            { l:'Greenwillow',     s:'Day 1',                   d:'12 mi away',  t:'#7A8C6F' },
          ].map(p => (
            <button key={p.l} style={{padding:'12px 14px', background:'#1c1816', border: p.selected ? '1.5px solid #d9904a' : '1px solid #2a241c', borderRadius:12, display:'flex', alignItems:'center', gap:10, fontFamily:'inherit', textAlign:'left'}}>
              <span style={{width:5, height:36, background:p.t, borderRadius:3, flexShrink:0}}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:14, fontWeight:600, color:'#f3ecdf'}}>{p.l}</div>
                <div style={{fontSize:11, color:'#8a8278'}}>{p.s}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:11, color: p.selected ? '#d9904a' : '#8a8278', fontFeatureSettings:'"tnum"', fontWeight: p.selected ? 600 : 500}}>{p.d}</div>
                {p.selected && <div style={{fontSize:9, color:'#d9904a', fontWeight:700, letterSpacing:'.06em', marginTop:2}}>SELECTED</div>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reason */}
      <div style={{padding:'14px 20px 6px'}}>
        <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8}}>Why manual? (optional)</div>
        <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
          {['Arrived early', 'GPS not working', 'Outside fence', 'Other'].map((r, i) => (
            <button key={r} style={{padding:'7px 11px', background: i === 1 ? 'rgba(217,144,74,.10)' : '#1c1816', border: i === 1 ? '1.5px solid #d9904a' : '1px solid #2a241c', borderRadius:999, fontSize:12, fontWeight:500, color: i === 1 ? '#d9904a' : '#aea69a', fontFamily:'inherit'}}>{r}</button>
          ))}
        </div>
      </div>

      <div style={{flex:1}}/>

      {/* Action */}
      <div style={{padding:'14px 20px calc(env(safe-area-inset-bottom, 0) + 14px)', borderTop:'1px solid #2a241c'}}>
        <button style={{width:'100%', height:50, background:'#d9904a', color:'#fff', border:'none', borderRadius:13, fontFamily:'inherit', fontSize:15, fontWeight:600}}>Clock in \u2014 Hillcrest \u00b7 7:14 AM</button>
        <div style={{textAlign:'center', marginTop:8, fontSize:11, color:'#5a5346'}}>Ana gets a ping to approve this entry.</div>
      </div>
    </div>
  );
}

// ─── 4 · CLOCK OUT SUCCESS ────────────────────────────────────
function WorkerClockOutSuccess() {
  return (
    <div className="m" style={{background:'#0e0c0a', color:'#f3ecdf'}}>
      {/* Hero — big numbers */}
      <div style={{padding:'40px 24px 24px', textAlign:'center', borderBottom:'1px solid #2a241c', position:'relative'}}>
        <div style={{width:64, height:64, margin:'0 auto 14px', background:'rgba(217,144,74,.14)', borderRadius:32, display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d9904a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        </div>
        <div style={{fontSize:11, color:'#aea69a', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>Today \u00b7 Hillcrest</div>
        <div style={{fontSize:54, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1, marginTop:6, fontFeatureSettings:'"tnum"'}}>8.5<span style={{fontSize:24, color:'#aea69a'}}>h</span></div>
        <div style={{fontSize:13, color:'#aea69a', marginTop:6}}>7:02 AM \u2192 3:32 PM \u00b7 30 min lunch</div>
        <div style={{marginTop:14, display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', background:'rgba(44,138,85,.14)', borderRadius:999}}>
          <span style={{color:'#7adba0'}}>{MI.check}</span>
          <span style={{fontSize:11.5, fontWeight:600, color:'#7adba0'}}>Clocked out</span>
        </div>
      </div>

      {/* Day's contribution */}
      <div style={{padding:'16px 20px 8px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
          <div style={{padding:'10px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:10, textAlign:'center'}}>
            <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase'}}>Photos</div>
            <div style={{fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"', color:'#f3ecdf', marginTop:2}}>8</div>
          </div>
          <div style={{padding:'10px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:10, textAlign:'center'}}>
            <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase'}}>Steps</div>
            <div style={{fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"', color:'#7adba0', marginTop:2}}>3/4</div>
          </div>
          <div style={{padding:'10px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:10, textAlign:'center'}}>
            <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase'}}>Gross</div>
            <div style={{fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"', color:'#f3ecdf', marginTop:2}}>$238</div>
          </div>
        </div>
      </div>

      {/* Prompt */}
      <div style={{padding:'10px 20px 12px'}}>
        <div style={{padding:'14px', background:'#1c1816', border:'1px dashed #4a3f33', borderRadius:12, display:'flex', alignItems:'center', gap:12}}>
          <span style={{color:'#c98a2e'}}>{MI.alert}</span>
          <div style={{flex:1, fontSize:12.5, color:'#aea69a'}}>Anything to flag from today before you leave?</div>
          <button style={{padding:'6px 12px', background:'transparent', border:'1px solid #4a3f33', borderRadius:7, color:'#f3ecdf', fontFamily:'inherit', fontSize:11, fontWeight:600}}>Add note</button>
        </div>
      </div>

      {/* Week so far */}
      <div style={{padding:'10px 20px 0'}}>
        <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8}}>Week so far</div>
        <div style={{display:'flex', gap:6}}>
          {[{d:'M', h:8.2}, {d:'T', h:8.0}, {d:'W', h:8.4}, {d:'T', h:8.5, today:true}, {d:'F', h:0, plan:8}, {d:'S', h:0}, {d:'S', h:0}].map((d, i) => (
            <div key={i} style={{flex:1, textAlign:'center'}}>
              <div style={{fontSize:9, color:'#8a8278', fontWeight:600, marginBottom:5}}>{d.d}</div>
              <div style={{height:38, background: d.today ? 'rgba(217,144,74,.20)' : d.h > 0 ? '#1c1816' : 'transparent', border: d.today ? '1.5px solid #d9904a' : d.h > 0 ? '1px solid #2a241c' : '1px dashed #2a241c', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:600, color: d.today ? '#d9904a' : d.h > 0 ? '#f3ecdf' : '#5a5346', fontFeatureSettings:'"tnum"'}}>
                {d.h > 0 ? d.h : d.plan ? `${d.plan}p` : '—'}
              </div>
            </div>
          ))}
        </div>
        <div style={{fontSize:11, color:'#aea69a', textAlign:'center', marginTop:8}}>
          <strong style={{color:'#f3ecdf', fontFeatureSettings:'"tnum"'}}>33.1h</strong> so far \u00b7 8h scheduled Friday
        </div>
      </div>

      <div style={{flex:1}}/>

      {/* CTA */}
      <div style={{padding:'14px 20px 16px'}}>
        <button style={{width:'100%', height:50, background:'#d9904a', color:'#fff', border:'none', borderRadius:13, fontFamily:'inherit', fontSize:15, fontWeight:600}}>See you tomorrow at 7 AM</button>
      </div>
      <_WorkerTabs active="today"/>
    </div>
  );
}

// ─── 5 · ISSUE SUBMITTED ──────────────────────────────────────
function WorkerIssueSubmitted() {
  return (
    <div className="m" style={{background:'#0e0c0a', color:'#f3ecdf'}}>
      <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'center', gap:12}}>
        <button style={{width:36, height:36, background:'#1c1816', border:'1px solid #2a241c', borderRadius:18, color:'#f3ecdf', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.close}</button>
        <div style={{flex:1, fontSize:17, fontWeight:600}}>Flag sent</div>
      </div>

      {/* Confirmation card */}
      <div style={{padding:'18px 20px 12px'}}>
        <div style={{padding:'18px 16px', background:'#1c1816', border:'1px solid #2a241c', borderLeft:'3px solid #7adba0', borderRadius:14, textAlign:'center'}}>
          <div style={{width:52, height:52, margin:'0 auto 10px', background:'rgba(44,138,85,.20)', borderRadius:26, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7adba0" strokeWidth="2.6" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
          </div>
          <div style={{fontSize:18, fontWeight:700, letterSpacing:'-0.01em'}}>Ana got it · 2s ago</div>
          <div style={{fontSize:12, color:'#aea69a', marginTop:6, lineHeight:1.45}}>Out of EPS 1.5" · 12 sheets · Aspen Ridge</div>
        </div>
      </div>

      {/* Live timeline */}
      <div style={{padding:'4px 20px 4px'}}>
        <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:10}}>Live status</div>
        <div style={{borderLeft:'2px dashed #2a241c', marginLeft:6, paddingLeft:18, paddingBottom:6}}>
          {[
            { t:'You flagged \u00b7 EPS materials', d:'12:48 PM \u00b7 just now', c:'#d9904a', live:true },
            { t:'Foreman is on it', d:'Pulling yard stock + ordering', c:'#7adba0' },
          ].map((e, i) => (
            <div key={i} style={{marginBottom:14, position:'relative'}}>
              <span style={{position:'absolute', left:-25, top:5, width:10, height:10, borderRadius:5, background: e.live ? e.c : '#1c1816', border:`2px solid ${e.c}`, boxShadow: e.live ? `0 0 0 4px ${e.c}33` : 'none'}}/>
              <div style={{fontSize:13, fontWeight:600, color:'#f3ecdf'}}>{e.t}</div>
              <div style={{fontSize:11, color:'#aea69a', marginTop:2}}>{e.d}</div>
            </div>
          ))}
          <div style={{padding:'10px 12px', background:'#1c1816', borderRadius:9, marginLeft:-2}}>
            <div style={{fontSize:11, color:'#8a8278', display:'flex', alignItems:'center', gap:6}}>
              <span style={{width:6, height:6, borderRadius:3, background:'#aea69a', animation:'blink 1.5s infinite'}}/>
              waiting on resolution
            </div>
          </div>
        </div>
      </div>

      {/* What you can do */}
      <div style={{padding:'14px 20px 8px'}}>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          <button style={{padding:'12px 14px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:11, color:'#f3ecdf', display:'flex', alignItems:'center', gap:12, fontFamily:'inherit', textAlign:'left', fontSize:13, fontWeight:500}}>
            <span style={{color:'#d9904a'}}>{MI.send}</span>
            <span style={{flex:1}}>Open thread with Ana</span>
            <span style={{color:'#5a5346'}}>{MI.chev}</span>
          </button>
          <button style={{padding:'12px 14px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:11, color:'#aea69a', display:'flex', alignItems:'center', gap:12, fontFamily:'inherit', textAlign:'left', fontSize:13, fontWeight:500}}>
            <span style={{color:'#aea69a'}}>{MI.layers}</span>
            <span style={{flex:1}}>What can I do while waiting?</span>
            <span style={{color:'#5a5346'}}>{MI.chev}</span>
          </button>
        </div>
      </div>

      <div style={{flex:1}}/>

      <div style={{padding:'10px 20px 16px'}}>
        <button style={{width:'100%', height:48, background:'transparent', color:'#aea69a', border:'1px solid #2a241c', borderRadius:12, fontFamily:'inherit', fontSize:14, fontWeight:500}}>Back to scope</button>
      </div>
    </div>
  );
}

// ─── 6 · HOURS CORRECTION (sheet from Hours) ──────────────────
function WorkerHoursCorrection() {
  return (
    <div className="m" style={{position:'relative', background:'#0e0c0a', color:'#f3ecdf'}}>
      <div style={{flex:1, opacity:.3, padding:'14px 20px'}}>
        <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em'}}>32.8h</div>
      </div>
      <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.55)'}}/>
      <div className="m-sheet" style={{position:'absolute', left:0, right:0, bottom:0, background:'#0e0c0a', maxHeight:'85%'}}>
        <div className="m-sheet-grabber" style={{background:'#3a3329'}}/>
        <div className="m-sheet-header" style={{borderBottom:'1px solid #2a241c'}}>
          <div>
            <div className="m-sheet-title" style={{color:'#f3ecdf'}}>Looks off?</div>
            <div style={{fontSize:11, color:'#8a8278', marginTop:2}}>Tue, Apr 28 \u00b7 Hillcrest \u00b7 8.0h</div>
          </div>
          <button style={{background:'#1c1816', border:'1px solid #2a241c', width:32, height:32, borderRadius:16, color:'#f3ecdf', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.close}</button>
        </div>
        <div className="m-sheet-body" style={{padding:'14px 16px'}}>
          {/* What's wrong picker */}
          <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8}}>What's wrong?</div>
          <div style={{display:'flex', flexDirection:'column', gap:6}}>
            {[
              { l:'Hours are short', s:'Worked longer than logged', selected:true },
              { l:'Hours are long',  s:'Logged more than actual' },
              { l:'Wrong project',   s:'Charged the wrong site' },
              { l:'Missing punch',   s:'Forgot to clock in or out' },
            ].map((o, i) => (
              <button key={o.l} style={{padding:'12px 14px', background:'#1c1816', border: o.selected ? '1.5px solid #d9904a' : '1px solid #2a241c', borderRadius:11, color:'#f3ecdf', display:'flex', alignItems:'center', gap:12, fontFamily:'inherit', textAlign:'left'}}>
                <span style={{width:18, height:18, borderRadius:9, border: o.selected ? 'none' : '1.5px solid #4a3f33', background: o.selected ? '#d9904a' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', flexShrink:0, fontSize:10}}>{o.selected && '●'}</span>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13.5, fontWeight:600}}>{o.l}</div>
                  <div style={{fontSize:11, color:'#8a8278'}}>{o.s}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div style={{marginTop:14, fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8}}>What was right?</div>
          <div style={{padding:'12px 14px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:11, fontSize:13, color:'#f3ecdf', minHeight:64, lineHeight:1.5}}>
            Worked till 4:30 \u2014 stayed late to finish corner bead.
            <span style={{display:'inline-block', width:1.5, height:14, background:'#d9904a', verticalAlign:'middle', marginLeft:1, animation:'blink 1s infinite'}}/>
          </div>

          <div style={{marginTop:14, fontSize:11, color:'#aea69a', lineHeight:1.5, padding:'10px 12px', background:'rgba(217,144,74,.06)', borderRadius:10, display:'flex', gap:8}}>
            <span style={{color:'#d9904a'}}>{MI.spark}</span>
            <span>Ana reviews and updates. You'll see the corrected hours within ~2h.</span>
          </div>

          <div className="m-btn-stack" style={{marginTop:14}}>
            <button className="m-btn" data-variant="primary">Send to Ana</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 7 · TIME OFF REQUEST ─────────────────────────────────────
function WorkerTimeOff() {
  return (
    <div className="m" style={{background:'#0e0c0a', color:'#f3ecdf'}}>
      <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'center', gap:12}}>
        <button style={{width:36, height:36, background:'#1c1816', border:'1px solid #2a241c', borderRadius:18, color:'#f3ecdf', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.close}</button>
        <div style={{flex:1, fontSize:17, fontWeight:600}}>Time off</div>
      </div>

      <div style={{padding:'8px 20px'}}>
        <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:10}}>When</div>
        {/* Quick options */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14}}>
          {[
            { l:'Out today',    s:'Tue, Apr 28',          selected:true },
            { l:'Out tomorrow', s:'Wed, Apr 29' },
            { l:'Out this Fri', s:'Fri, May 2' },
            { l:'Pick a range', s:'Multi-day' },
          ].map(o => (
            <button key={o.l} style={{padding:'12px', background:'#1c1816', border: o.selected ? '1.5px solid #d9904a' : '1px solid #2a241c', borderRadius:11, color:'#f3ecdf', textAlign:'left', fontFamily:'inherit'}}>
              <div style={{fontSize:13, fontWeight:600}}>{o.l}</div>
              <div style={{fontSize:10.5, color:'#8a8278', marginTop:2}}>{o.s}</div>
            </button>
          ))}
        </div>

        <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8}}>Reason</div>
        <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:14}}>
          {[
            { l:'Sick', selected:true },
            { l:'Doctor' },
            { l:'Personal' },
            { l:'PTO' },
            { l:'Other' },
          ].map(r => (
            <button key={r.l} style={{padding:'8px 12px', background: r.selected ? 'rgba(217,144,74,.10)' : '#1c1816', border: r.selected ? '1.5px solid #d9904a' : '1px solid #2a241c', borderRadius:999, fontSize:13, fontWeight:500, color: r.selected ? '#d9904a' : '#aea69a', fontFamily:'inherit'}}>{r.l}</button>
          ))}
        </div>

        <div style={{padding:'10px 12px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:10, fontSize:12, color:'#aea69a', lineHeight:1.5, minHeight:60}}>
          Felt fever last night, taking a sick day to rest up.
        </div>

        <div style={{marginTop:14, padding:'12px 14px', background:'rgba(217,144,74,.06)', borderLeft:'3px solid #d9904a', borderRadius:10, fontSize:12, color:'#aea69a', lineHeight:1.5, display:'flex', gap:8}}>
          <span style={{color:'#d9904a', flexShrink:0}}>{MI.bell}</span>
          <span>Ana gets a ping. Schedule auto-adjusts for today. You can come back early by clocking in tomorrow.</span>
        </div>
      </div>

      <div style={{flex:1}}/>

      <div style={{padding:'14px 20px calc(env(safe-area-inset-bottom, 0) + 14px)', borderTop:'1px solid #2a241c'}}>
        <button style={{width:'100%', height:50, background:'#d9904a', color:'#fff', border:'none', borderRadius:13, fontFamily:'inherit', fontSize:15, fontWeight:600}}>Send to Ana \u00b7 today</button>
      </div>
    </div>
  );
}

// ─── 8 · LOG HISTORY ──────────────────────────────────────────
function WorkerLogHistory() {
  const sections = [
    { l:'Today \u00b7 Apr 28', items:[
      { c:'#E8A86B', tag:'EPS', t:'2:18 PM' },
      { c:'#C77B4F', tag:'BASE', t:'1:42 PM' },
      { c:'#A05A33', tag:'EPS', t:'11:08 AM' },
      { c:'#E8A86B', tag:'EPS', t:'10:32 AM' },
      { c:'#C77B4F', tag:'BASE', t:'9:14 AM' },
      { c:'#7A8C6F', tag:'STONE', t:'8:48 AM' },
    ]},
    { l:'Yesterday \u00b7 Apr 27', items:[
      { c:'#E8A86B', tag:'EPS' },
      { c:'#A05A33', tag:'EPS' },
      { c:'#C77B4F', tag:'BASE' },
    ]},
    { l:'Mon \u00b7 Apr 26', items:[
      { c:'#A05A33', tag:'EPS' },
      { c:'#A05A33', tag:'EPS' },
    ]},
  ];
  return (
    <div className="m" style={{background:'#0e0c0a', color:'#f3ecdf'}}>
      <div style={{padding:'14px 20px 6px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>Log history</div>
            <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.02em', marginTop:2}}>11 photos this week</div>
          </div>
          <button style={{width:36, height:36, background:'#d9904a', color:'#fff', borderRadius:18, border:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.cam}</button>
        </div>
      </div>

      <div className="m-body">
        {sections.map(sec => (
          <React.Fragment key={sec.l}>
            <div style={{padding:'14px 20px 8px', fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>{sec.l}</div>
            <div style={{padding:'0 16px', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:6}}>
              {sec.items.map((p, i) => (
                <div key={i} style={{aspectRatio:'1', background:`linear-gradient(135deg, ${p.c} 0%, ${p.c}88 100%)`, borderRadius:8, position:'relative', overflow:'hidden'}}>
                  <div style={{position:'absolute', top:4, left:4, padding:'2px 6px', background:'rgba(0,0,0,.55)', borderRadius:5, color:'#fff', fontSize:9, fontWeight:600}}>{p.tag}</div>
                  {p.t && <div style={{position:'absolute', bottom:4, right:6, fontSize:9, color:'#fff', textShadow:'0 1px 2px rgba(0,0,0,.5)'}}>{p.t}</div>}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
        <div style={{height:24}}/>
      </div>
      <_WorkerTabs active="log"/>
    </div>
  );
}

// ─── 9 · WORKER NOTIFICATIONS ─────────────────────────────────
function WorkerNotifications() {
  const items = [
    { who:'Ana C.', sub:'Got your EPS flag · ordering 12 sheets', when:'1m', kind:'reply', unread:true },
    { who:'Schedule', sub:'Tomorrow: Hillcrest 7 AM · same as today', when:'5h', kind:'sched', unread:true },
    { who:'Ana C.', sub:"Approved Tuesday's correction · +1.5h", when:'1d', kind:'time', unread:false },
    { who:'Pay stub', sub:'Apr 22 pay deposited · $1,138', when:'3d', kind:'pay', unread:false },
  ];
  const kindMeta = {
    reply: { i:MI.send, fg:'#d9904a', bg:'rgba(217,144,74,.14)' },
    sched: { i:MI.cal,  fg:'#5b8aa8', bg:'rgba(91,138,168,.14)' },
    time:  { i:MI.time, fg:'#7adba0', bg:'rgba(44,138,85,.16)' },
    pay:   { i:MI.$,    fg:'#7adba0', bg:'rgba(44,138,85,.16)' },
  };
  return (
    <div className="m" style={{background:'#0e0c0a', color:'#f3ecdf'}}>
      <div style={{padding:'14px 20px 6px', display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.02em'}}>Notifications</div>
          <div style={{fontSize:12, color:'#8a8278', marginTop:2}}>2 unread</div>
        </div>
        <button style={{fontSize:12, color:'#d9904a', fontWeight:600, background:'transparent', border:'none', fontFamily:'inherit'}}>Mark all read</button>
      </div>

      <div className="m-body" style={{padding:'10px 16px 16px', display:'flex', flexDirection:'column', gap:8}}>
        {items.map((n, i) => {
          const k = kindMeta[n.kind];
          return (
            <div key={i} style={{padding:'12px', background: n.unread ? '#1c1816' : '#15110d', border:'1px solid #2a241c', borderRadius:11, display:'flex', gap:10, alignItems:'flex-start', position:'relative'}}>
              {n.unread && <span style={{position:'absolute', left:-4, top:'50%', transform:'translateY(-50%)', width:3, height:24, background:'#d9904a', borderRadius:2}}/>}
              <div style={{width:32, height:32, borderRadius:8, background:k.bg, color:k.fg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{React.cloneElement(k.i, {width:16, height:16})}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8}}>
                  <span style={{fontSize:13, fontWeight: n.unread ? 600 : 500, color:'#f3ecdf'}}>{n.who}</span>
                  <span style={{fontSize:10, color:'#5a5346', fontFeatureSettings:'"tnum"'}}>{n.when}</span>
                </div>
                <div style={{fontSize:12, color: n.unread ? '#aea69a' : '#8a8278', marginTop:2, lineHeight:1.4}}>{n.sub}</div>
              </div>
            </div>
          );
        })}
        <div style={{padding:'12px', textAlign:'center', fontSize:11, color:'#5a5346'}}>Older · <span style={{color:'#aea69a', fontWeight:600}}>view archive</span></div>
      </div>
      <_WorkerTabs active="today"/>
    </div>
  );
}

// ─── 10 · WORKER PROFILE ──────────────────────────────────────
function WorkerProfile() {
  return (
    <div className="m" style={{background:'#0e0c0a', color:'#f3ecdf'}}>
      <div style={{padding:'14px 20px 6px', display:'flex', alignItems:'center', gap:12}}>
        <button style={{width:36, height:36, background:'#1c1816', border:'1px solid #2a241c', borderRadius:18, color:'#f3ecdf', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.back}</button>
        <div style={{flex:1, fontSize:17, fontWeight:600}}>Profile</div>
        <button style={{background:'transparent', border:'none', color:'#d9904a', fontSize:13, fontWeight:600, fontFamily:'inherit'}}>Edit</button>
      </div>

      {/* Avatar block */}
      <div style={{padding:'18px 20px 14px', textAlign:'center', borderBottom:'1px solid #2a241c'}}>
        <div className="m-avatar" data-tone="2" data-size="lg" style={{width:80, height:80, fontSize:24, margin:'0 auto 12px'}}>ML</div>
        <div style={{fontSize:20, fontWeight:700, letterSpacing:'-0.01em'}}>Marcus Lee</div>
        <div style={{fontSize:12, color:'#aea69a', marginTop:2}}>Crew · Davis Stucco · 2y 4mo</div>
        <div style={{marginTop:10, display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', background:'rgba(217,144,74,.10)', borderRadius:999}}>
          <span style={{width:6, height:6, borderRadius:3, background:'#d9904a'}}/>
          <span style={{fontSize:11, color:'#d9904a', fontWeight:600}}>Hillcrest · clocked in</span>
        </div>
      </div>

      {/* Account */}
      <div style={{padding:'14px 20px 0', fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>Account</div>
      <div style={{padding:'8px 16px', display:'flex', flexDirection:'column', gap:6}}>
        {[
          { l:'Name', v:'Marcus Lee', i:MI.user },
          { l:'Phone', v:'(403) 555\u20110142', i:MI.bell },
          { l:'Emergency contact', v:'Beth Lee \u00b7 (403) 555\u20111811', i:MI.alert },
          { l:'Notifications', v:'Push + SMS', i:MI.bell },
          { l:'Location · auto clock-in', v:'On', i:MI.pin },
        ].map(r => (
          <div key={r.l} style={{padding:'12px 14px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:10, display:'flex', alignItems:'center', gap:12}}>
            <span style={{color:'#aea69a'}}>{r.i}</span>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:11, color:'#8a8278'}}>{r.l}</div>
              <div style={{fontSize:13, color:'#f3ecdf', fontWeight:500, marginTop:1}}>{r.v}</div>
            </div>
            <span style={{color:'#5a5346'}}>{MI.chev}</span>
          </div>
        ))}
      </div>

      {/* Pay summary */}
      <div style={{padding:'14px 20px 0', fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>Pay</div>
      <div style={{padding:'8px 16px'}}>
        <div style={{padding:'14px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:11, display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:34, height:34, background:'rgba(44,138,85,.16)', color:'#7adba0', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.$}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13, fontWeight:600}}>Pay stubs</div>
            <div style={{fontSize:11, color:'#8a8278'}}>Last deposit Apr 22 · $1,138</div>
          </div>
          <span style={{color:'#5a5346'}}>{MI.chev}</span>
        </div>
      </div>

      <div style={{padding:'20px 20px 18px', textAlign:'center'}}>
        <button style={{background:'transparent', border:'none', color:'#c0463d', fontSize:13, fontWeight:600, fontFamily:'inherit'}}>Sign out</button>
      </div>
      <div style={{padding:'0 20px 24px', textAlign:'center', fontSize:10, color:'#5a5346'}}>v3.3.0 · Build 4317</div>
    </div>
  );
}

Object.assign(window, {
  WorkerInviteAccept, WorkerFirstRun,
  WorkerClockInManual, WorkerClockOutSuccess,
  WorkerIssueSubmitted,
  WorkerHoursCorrection, WorkerTimeOff,
  WorkerLogHistory, WorkerNotifications,
  WorkerProfile,
});
