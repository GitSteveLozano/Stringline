/* global React */

// ============================================================
// SIGN-IN + ONBOARDING · V2 (Section 17)
// Includes role switcher pill + sheet (used across all roles).
// ============================================================

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

// =====================================================================
// PRIMITIVE · "WEARING" ROLE PILL (top-right of app bar when >1 role)
// =====================================================================
function V2WearingPill({ role = 'OWNER', dark }) {
  return (
    <button style={{
      display:'inline-flex', alignItems:'center', gap:6,
      padding:'6px 10px',
      background: dark ? 'var(--v2-accent)' : 'var(--v2-ink)',
      color: dark ? 'var(--v2-accent-ink)' : 'var(--v2-accent)',
      border: dark ? '2px solid var(--v2-accent)' : '2px solid var(--v2-ink)',
      fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700,
      letterSpacing:'0.06em', cursor:'pointer',
    }}>
      <span style={{opacity:.6}}>WEARING</span>
      <span>{role}</span>
      <span style={{fontFamily:'var(--v2-font-tight)', fontSize:14, lineHeight:1}}>▾</span>
    </button>
  );
}

// =====================================================================
// 1 · ROLE SWITCHER SHEET — for solo operators
// =====================================================================
function V2RoleSwitcher() {
  const roles = [
    { id:'owner',     name:'OWNER',     sub:'BUSINESS · MONEY · APPROVALS', dark:false, active:true },
    { id:'estimator', name:'ESTIMATOR', sub:'TAKEOFF · BIDS · CLIENTS',     dark:false },
    { id:'foreman',   name:'FOREMAN',   sub:'CREW · BRIEFS · DAILY LOG',    dark:false },
    { id:'worker',    name:'CREW',      sub:'CLOCK IN · SCOPE · LOG',       dark:true },
  ];
  return (
    <div className="v2 v2-screen" style={{background:'rgba(0,0,0,0.55)'}}>
      <div style={{position:'absolute', inset:0, background:'var(--v2-sand)', opacity:0.3, zIndex:0}}/>

      {/* sheet */}
      <div style={{marginTop:'auto', background:'var(--v2-sand)', border:'2px solid var(--v2-ink)', borderBottom:'none', position:'relative', zIndex:1, display:'flex', flexDirection:'column'}}>
        <div style={{padding:'10px 20px 6px', borderBottom:'2px solid var(--v2-ink)'}}>
          <div style={{width:40, height:4, background:'var(--v2-ink)', margin:'0 auto 12px'}}/>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
            <div>
              <div className="v2-eyebrow">SWITCH HAT</div>
              <h3 className="v2-h3" style={{marginTop:6}}>Which view?</h3>
            </div>
            <button style={{background:'transparent', border:'none', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, color:'var(--v2-ink-3)'}}>CANCEL</button>
          </div>
          <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-3)', marginTop:8, fontWeight:600, lineHeight:1.45}}>
            You wear 4 hats. Switch any time — the app reshapes around the role.
          </div>
        </div>

        {roles.map(r => (
          <button key={r.id} style={{
            display:'flex', alignItems:'center', gap:14,
            padding:'18px 20px',
            background: r.active ? 'var(--v2-accent)' : r.dark ? 'var(--v2-ink)' : 'var(--v2-sand)',
            color: r.dark ? 'var(--v2-sand)' : 'var(--v2-ink)',
            border:'none', borderBottom:'1px solid var(--v2-line-soft)',
            textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer',
          }}>
            <div style={{
              width:48, height:48,
              background: r.active ? 'var(--v2-ink)' : r.dark ? 'var(--v2-accent)' : 'var(--v2-ink)',
              color:  r.active ? 'var(--v2-accent)' : r.dark ? 'var(--v2-accent-ink)' : 'var(--v2-sand)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18,
              flexShrink:0,
            }}>{r.name[0]}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:18, letterSpacing:'-0.015em', color: r.dark ? 'var(--v2-sand)' : r.active ? 'var(--v2-accent-ink)' : 'var(--v2-ink)'}}>{r.name}</div>
              <div className="v2-mono" style={{fontSize:10, marginTop:3, fontWeight:600, letterSpacing:'0.04em', color: r.dark ? 'var(--v2-ink-4)' : r.active ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)'}}>{r.sub}</div>
            </div>
            {r.active && <span className="v2-mono" style={{fontSize:14, fontWeight:800, color:'var(--v2-accent-ink)'}}>●</span>}
          </button>
        ))}

        <div style={{padding:'16px 20px', borderTop:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
          <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-3)', fontWeight:600, lineHeight:1.45}}>
            ➜ Roles + permissions live in <strong style={{color:'var(--v2-ink)'}}>SETTINGS · ROLES</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// 2 · SIGN IN · ENTRY
// =====================================================================
function V2SignIn() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBar time="6:54"/>
      {/* Hi-vis hero */}
      <div style={{background:'var(--v2-accent)', padding:'48px 24px 32px', borderBottom:'2px solid var(--v2-ink)', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, opacity:0.10, backgroundImage:'repeating-linear-gradient(135deg, transparent 0 18px, var(--v2-ink) 18px 22px)', pointerEvents:'none'}}/>
        <div style={{position:'relative'}}>
          <div style={{width:54, height:54, background:'var(--v2-ink)', color:'var(--v2-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:900, fontSize:24, letterSpacing:'-0.03em'}}>SL</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:42, lineHeight:0.9, letterSpacing:'-0.03em', color:'var(--v2-accent-ink)', marginTop:24}}>SITELAYER.</div>
          <div className="v2-mono" style={{fontSize:12, fontWeight:600, color:'var(--v2-accent-ink)', marginTop:10, letterSpacing:'0.04em'}}>RUN THE DAY FROM YOUR POCKET.</div>
        </div>
      </div>

      <div style={{padding:'24px 20px', display:'flex', flexDirection:'column', gap:12}}>
        <button className="v2-btn" style={{background:'var(--v2-ink)', color:'var(--v2-sand)', borderColor:'var(--v2-ink)', minHeight:60, fontSize:18}}>CONTINUE WITH APPLE</button>
        <button className="v2-btn ghost" style={{minHeight:60, fontSize:18}}>CONTINUE WITH GOOGLE</button>
        <div style={{display:'flex', gap:8}}>
          <button className="v2-btn ghost" style={{minHeight:52, fontSize:15, flex:1}}>EMAIL</button>
          <button className="v2-btn ghost" style={{minHeight:52, fontSize:15, flex:1}}>PHONE</button>
        </div>
      </div>

      <div className="v2-flex-1"/>

      <div style={{padding:'20px', borderTop:'2px solid var(--v2-ink)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div className="v2-mono" style={{color:'var(--v2-ink-3)', fontSize:11, fontWeight:600}}>NEW HERE?</div>
        <button style={{background:'transparent', border:'none', fontFamily:'var(--v2-font)', fontWeight:700, color:'var(--v2-ink)', fontSize:14, textDecoration:'underline'}}>CREATE COMPANY →</button>
      </div>
    </div>
  );
}

// =====================================================================
// 3 · SIGN IN · MAGIC LINK SENT
// =====================================================================
function V2MagicLinkSent() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBar time="6:55"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">CHECK YOUR EMAIL</div>
      </div>
      <div className="v2-flex-1" style={{padding:'40px 24px', display:'flex', flexDirection:'column'}}>
        <div style={{width:72, height:72, background:'var(--v2-accent)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:36}}>✉</div>
        <h2 className="v2-h2" style={{marginTop:24}}>Link sent.</h2>
        <div className="v2-body" style={{marginTop:12, color:'var(--v2-ink-2)'}}>We sent a one-tap sign-in link to <strong>mike@davis.co</strong>. Tap it from this device.</div>

        <div style={{marginTop:24, padding:'16px', border:'2px dashed var(--v2-line-soft)', background:'var(--v2-sand-soft)'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>WAITING</div>
          <div className="v2-mono" style={{fontSize:12, marginTop:8, fontWeight:600, color:'var(--v2-ink-2)'}}>Link expires in 15 min. Didn't get it? <span style={{color:'var(--v2-ink)', textDecoration:'underline'}}>RESEND</span></div>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// 4 · OWNER ONBOARDING · COMPANY
// =====================================================================
function V2OnbCompany() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBar time="7:02"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">COMPANY</div>
      </div>

      <div style={{padding:'24px 20px 8px'}}>
        <div className="v2-eyebrow">STEP 1 / 4</div>
        <h2 className="v2-h2" style={{marginTop:8}}>What do we call it?</h2>
      </div>

      <div style={{padding:'14px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>COMPANY NAME</div>
        <div style={{marginTop:8, padding:'18px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:22}}>
          Davis Stucco LLC<span style={{display:'inline-block', width:2, height:24, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:2}}/>
        </div>
      </div>

      <div style={{padding:'20px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>TRADE</div>
        <div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, border:'2px solid var(--v2-ink)'}}>
          {[{l:'STUCCO', on:true},{l:'DRYWALL'},{l:'PAINT'},{l:'FRAMING'},{l:'GENERAL'},{l:'OTHER'}].map((t, i) => {
            const isRight = i % 2 === 1;
            const isLastRow = i >= 4;
            return (
              <button key={t.l} style={{
                padding:'18px 0', background: t.on ? 'var(--v2-accent)' : 'transparent',
                color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)',
                border:'none',
                borderRight: isRight ? 'none' : '2px solid var(--v2-ink)',
                borderBottom: isLastRow ? 'none' : '2px solid var(--v2-ink)',
                fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.06em',
                cursor:'pointer',
              }}>{t.l}</button>
            );
          })}
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'16px 20px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">NEXT · CREW SIZE</button>
      </div>
    </div>
  );
}

// =====================================================================
// 5 · OWNER ONBOARDING · JUST YOU? / CREW?
// =====================================================================
function V2OnbCrewSize() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBar time="7:03"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">YOUR CREW</div>
      </div>

      <div style={{padding:'24px 20px 8px'}}>
        <div className="v2-eyebrow">STEP 2 / 4</div>
        <h2 className="v2-h2" style={{marginTop:8}}>Just you, or a crew?</h2>
      </div>

      <div style={{padding:'14px 20px 0'}}>
        {[
          { l:'JUST ME · SOLO',          sub:'YOU\u2019LL WEAR ALL 4 HATS. SWITCH ANY TIME.', selected:true },
          { l:'2 - 5 PEOPLE',            sub:'INVITE FOREMEN + CREW NEXT' },
          { l:'6 - 15 PEOPLE',           sub:'MULTI-CREW · MULTI-SITE' },
          { l:'15+ PEOPLE',              sub:'WE\u2019LL ADD ROLES + PERMISSIONS RULES' },
        ].map((o, i) => (
          <button key={i} style={{
            display:'block', width:'100%', textAlign:'left',
            padding:'18px 20px',
            background: o.selected ? 'var(--v2-accent)' : 'var(--v2-sand)',
            color: o.selected ? 'var(--v2-accent-ink)' : 'var(--v2-ink)',
            border:'2px solid var(--v2-ink)', borderTop: i > 0 ? 'none' : '2px solid var(--v2-ink)',
            fontFamily:'var(--v2-font)', cursor:'pointer',
          }}>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:18, letterSpacing:'-0.015em'}}>{o.l}</div>
            <div className="v2-mono" style={{fontSize:11, marginTop:6, fontWeight:600, opacity: o.selected ? 1 : 0.7}}>{o.sub}</div>
          </button>
        ))}
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'16px 20px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">NEXT · INTEGRATIONS</button>
      </div>
    </div>
  );
}

// =====================================================================
// 6 · OWNER ONBOARDING · INTEGRATIONS (skip-able)
// =====================================================================
function V2OnbIntegrations() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBar time="7:04"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">CONNECT</div>
      </div>

      <div style={{padding:'24px 20px 8px'}}>
        <div className="v2-eyebrow">STEP 3 / 4 · OPTIONAL</div>
        <h2 className="v2-h2" style={{marginTop:8}}>Hook up your books.</h2>
        <div className="v2-mono" style={{fontSize:12, marginTop:14, color:'var(--v2-ink-3)', fontWeight:600, lineHeight:1.45}}>WE\u2019LL PULL YOUR PRICING BOOK + PAYROLL BURDEN AUTOMATICALLY.</div>
      </div>

      <div style={{padding:'14px 20px 0'}}>
        {[
          { l:'QUICKBOOKS ONLINE', sub:'BOOKS + INVOICES', tag:'AI', selected:true },
          { l:'GUSTO',             sub:'PAYROLL + BURDEN',   tag:'AI' },
          { l:'STRIPE',            sub:'COLLECT PAYMENTS' },
          { l:'XERO',              sub:'ALTERNATIVE TO QBO' },
        ].map((o, i) => (
          <button key={i} style={{
            display:'flex', alignItems:'center', gap:14, width:'100%',
            padding:'16px 20px',
            background: o.selected ? 'var(--v2-accent)' : 'var(--v2-sand)',
            border:'2px solid var(--v2-ink)', borderTop: i > 0 ? 'none' : '2px solid var(--v2-ink)',
            textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer',
          }}>
            <div style={{flex:1}}>
              <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16, color: o.selected ? 'var(--v2-accent-ink)' : 'var(--v2-ink)'}}>{o.l}</div>
                {o.tag && <span style={{padding:'2px 6px', background:'var(--v2-ink)', color:'var(--v2-accent)', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.06em'}}>{o.tag}</span>}
              </div>
              <div className="v2-mono" style={{fontSize:11, color: o.selected ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', marginTop:4, fontWeight:600}}>{o.sub}</div>
            </div>
            <span className="v2-mono" style={{fontSize:11, fontWeight:700, color: o.selected ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)'}}>
              {o.selected ? '✓' : '+'}
            </span>
          </button>
        ))}
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'12px 20px 16px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>SKIP</button>
        <button className="v2-btn primary" style={{flex:2}}>CONNECT QBO</button>
      </div>
    </div>
  );
}

// =====================================================================
// 7 · OWNER ONBOARDING · READY (checklist)
// =====================================================================
function V2OnbReady() {
  const tasks = [
    { l:'COMPANY · DAVIS STUCCO LLC', done:true },
    { l:'STUCCO TRADE',               done:true },
    { l:'SOLO CREW · ALL 4 HATS',     done:true },
    { l:'QBO CONNECTED',              done:true },
    { l:'CREATE FIRST PROJECT',       done:false, active:true },
    { l:'INVITE TEAMMATES',           done:false, optional:true },
  ];
  return (
    <div className="v2 v2-screen">
      <V2StatusBar time="7:08"/>
      <div className="v2-appbar">
        <div className="v2-appbar-title">YOU\u2019RE IN</div>
      </div>

      <div style={{padding:'32px 20px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow accent" style={{display:'inline-block'}}>STEP 4 / 4 · READY</div>
        <h2 className="v2-h2" style={{marginTop:14}}>Davis Stucco is set up.</h2>
        <div className="v2-body" style={{marginTop:10, color:'var(--v2-ink-2)'}}>One job created and you\u2019re live. Solo means you wear all 4 hats — switch any time with the <strong style={{background:'var(--v2-accent)', padding:'1px 5px'}}>WEARING ▾</strong> pill.</div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {tasks.map((t, i) => (
          <div key={i} style={{padding:'16px 20px', display:'flex', alignItems:'center', gap:14, borderBottom:'1px solid var(--v2-line-soft)', background: t.active ? 'var(--v2-accent)' : 'transparent'}}>
            <div style={{
              width:32, height:32,
              background: t.done ? 'var(--v2-good)' : t.active ? 'var(--v2-ink)' : 'transparent',
              color: t.done ? '#fff' : t.active ? 'var(--v2-accent)' : 'var(--v2-ink-3)',
              border:'2px solid var(--v2-ink)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14,
            }}>{t.done ? '✓' : t.active ? '●' : ''}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14, color: t.active ? 'var(--v2-accent-ink)' : 'var(--v2-ink)'}}>{t.l}</div>
              {t.optional && <div className="v2-mono" style={{fontSize:10, marginTop:3, color:'var(--v2-ink-3)', fontWeight:600}}>OPTIONAL · DO LATER</div>}
            </div>
          </div>
        ))}
      </div>

      <div style={{padding:'16px 20px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">CREATE FIRST PROJECT</button>
      </div>
    </div>
  );
}

// =====================================================================
// 8 · FOREMAN ACCEPT INVITE
// =====================================================================
function V2ForemanInvite() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBar/>
      <div style={{padding:'48px 24px 32px', background:'var(--v2-accent)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow accent" style={{background:'var(--v2-ink)', color:'var(--v2-accent)', display:'inline-block'}}>INVITED · FOREMAN</div>
        <h1 style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:42, lineHeight:0.9, letterSpacing:'-0.03em', marginTop:18, color:'var(--v2-accent-ink)'}}>Mike's<br/>asking you<br/>to run<br/>the crew.</h1>
      </div>

      <div style={{padding:'24px 20px'}}>
        <div style={{padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>FROM</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16, marginTop:4}}>MIKE DAVIS · DAVIS STUCCO LLC</div>
          <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-3)', marginTop:6, fontWeight:600}}>YOUR PHONE: (403) 555-0142</div>
        </div>

        <div className="v2-mono" style={{fontSize:12, color:'var(--v2-ink-2)', marginTop:18, fontWeight:600, lineHeight:1.5}}>
          AS FOREMAN YOU\u2019LL:<br/>
          · BRIEF CREW EACH MORNING<br/>
          · HANDLE FIELD BLOCKERS<br/>
          · SUBMIT THE DAILY LOG
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">ACCEPT · SET PASSWORD</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-ink-3)', borderColor:'var(--v2-line-soft)'}}>DECLINE</button>
      </div>
    </div>
  );
}

// =====================================================================
// 9 · FOREMAN FIRST RUN
// =====================================================================
function V2ForemanFirstRun() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBar/>
      <div className="v2-appbar">
        <div className="v2-appbar-title">SETUP · 1 OF 3</div>
      </div>

      <div style={{padding:'32px 20px 20px'}}>
        <div className="v2-eyebrow">PERMISSION</div>
        <h2 className="v2-h2" style={{marginTop:10}}>Let the app know where you are.</h2>
        <div className="v2-body" style={{marginTop:14, color:'var(--v2-ink-2)'}}>So we can clock you in automatically when you arrive on site. We only check at clock-in.</div>
      </div>

      <div style={{padding:'0 20px'}}>
        <div style={{padding:'18px', border:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>NEEDED FOR</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16, marginTop:10, lineHeight:1.3}}>Geofence auto clock-in · Showing the crew map · Out-of-fence alerts</div>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">ALLOW LOCATION</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-ink-3)', borderColor:'var(--v2-line-soft)'}}>NOT NOW</button>
      </div>
    </div>
  );
}

// =====================================================================
// 10 · WORKER ACCEPT INVITE
// =====================================================================
function V2WorkerInvite() {
  return (
    <div className="v2 v2-screen dark">
      <V2StatusBar dark/>
      <div style={{padding:'48px 24px 36px', borderBottom:'2px solid var(--v2-sand-2)'}}>
        <div className="v2-eyebrow accent" style={{display:'inline-block'}}>INVITED · CREW</div>
        <h1 style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:42, lineHeight:0.9, letterSpacing:'-0.03em', marginTop:18, color:'var(--v2-sand)'}}>Ana added<br/>you to the<br/>Davis Stucco<br/>crew.</h1>
      </div>

      <div style={{padding:'24px 20px'}}>
        <div style={{padding:'14px 16px', background:'var(--v2-ink-2)', border:'2px solid var(--v2-sand-2)'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>YOUR NUMBER</div>
          <div className="v2-mono" style={{fontSize:18, marginTop:6, fontWeight:700, color:'var(--v2-sand)'}}>(403) 555-0142</div>
        </div>

        <div className="v2-mono" style={{fontSize:12, color:'var(--v2-ink-4)', marginTop:18, fontWeight:600, lineHeight:1.5}}>
          THE APP DOES:<br/>
          · AUTO CLOCK-IN · TAP TO FLAG · DAILY PHOTOS<br/>
          NOTHING ELSE TO LEARN.
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-sand-2)'}}>
        <button className="v2-btn primary">SEND ME A CODE</button>
      </div>
    </div>
  );
}

// =====================================================================
// 11 · ESTIMATOR ACCEPT INVITE
// =====================================================================
function V2EstimatorInvite() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBar/>
      <div style={{padding:'48px 24px 32px', background:'var(--v2-accent)', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow accent" style={{background:'var(--v2-ink)', color:'var(--v2-accent)', display:'inline-block'}}>INVITED · ESTIMATOR</div>
        <h1 style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:42, lineHeight:0.9, letterSpacing:'-0.03em', marginTop:18, color:'var(--v2-accent-ink)'}}>You\u2019re<br/>doing the<br/>takeoffs.</h1>
      </div>

      <div style={{padding:'24px 20px'}}>
        <div style={{padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>FROM</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16, marginTop:4}}>MIKE DAVIS · DAVIS STUCCO LLC</div>
        </div>

        <div className="v2-mono" style={{fontSize:12, color:'var(--v2-ink-2)', marginTop:18, fontWeight:600, lineHeight:1.5}}>
          AS ESTIMATOR YOU\u2019LL:<br/>
          · INGEST PLAN SETS<br/>
          · RUN TAKEOFFS (AI ASSISTED)<br/>
          · DELIVER PDFS TO CLIENTS
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">ACCEPT · SET PASSWORD</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-ink-3)', borderColor:'var(--v2-line-soft)'}}>DECLINE</button>
      </div>
    </div>
  );
}

// =====================================================================
// 12 · SAMPLE DASHBOARD WITH WEARING PILL (demo)
// =====================================================================
function V2WearingDemo() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBar time="9:14"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">MON · MAY 4</div>
          <div className="v2-appbar-title">DASHBOARD</div>
        </div>
        <V2WearingPill role="OWNER"/>
      </div>

      <div style={{padding:'24px 20px'}}>
        <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-3)', fontWeight:600, letterSpacing:'0.04em', lineHeight:1.5}}>
          ➜ THE <strong style={{color:'var(--v2-ink)'}}>WEARING ▾</strong> PILL APPEARS WHEN YOU HAVE MORE THAN ONE ROLE.<br/>
          TAP IT → ROLE SWITCHER SHEET. SOLO OPERATORS LIVE IN THIS PILL.
        </div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">EXAMPLE · DASHBOARD AS OWNER</div></div>

      <div style={{padding:'20px'}}>
        <div style={{border:'3px solid var(--v2-ink)', background:'var(--v2-accent)', padding:'18px'}}>
          <div className="v2-mono" style={{fontSize:10, fontWeight:700, color:'var(--v2-accent-ink)'}}>● AT RISK · 18%</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:20, marginTop:8, color:'var(--v2-accent-ink)'}}>ASPEN — labor hot</div>
        </div>
      </div>

      <div className="v2-flex-1"/>
    </div>
  );
}

Object.assign(window, {
  V2StatusBar, V2WearingPill,
  V2RoleSwitcher,
  V2SignIn, V2MagicLinkSent,
  V2OnbCompany, V2OnbCrewSize, V2OnbIntegrations, V2OnbReady,
  V2ForemanInvite, V2ForemanFirstRun,
  V2WorkerInvite,
  V2EstimatorInvite,
  V2WearingDemo,
});
