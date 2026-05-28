/* global React */

// ============================================================
// OWNER · V2 (Section 16)
// Sand + ink + hi-vis yellow. Owner runs the business —
// dashboards, project oversight, money, approvals, team.
// ============================================================

function V2OwnerTabs({ active = 'home', approvalsBadge = 0 }) {
  const tabs = [
    { id:'home',     l:'HOME' },
    { id:'projects', l:'PROJECTS' },
    { id:'money',    l:'MONEY' },
    { id:'team',     l:'TEAM', b: approvalsBadge },
    { id:'more',     l:'MORE' },
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

function V2OwnerStatusBar({ time = '7:48', dark }) {
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
// 1A · DASHBOARD · CALM (default morning view)
// =====================================================================
function V2OwnerDashboardCalm() {
  return (
    <div className="v2 v2-screen">
      <V2OwnerStatusBar/>
      <div style={{padding:'24px 20px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">MON · MAY 4</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:48, letterSpacing:'-0.03em', lineHeight:0.95, marginTop:10}}>Good<br/>morning,<br/>Mike.</div>
        <div className="v2-body" style={{marginTop:14, color:'var(--v2-ink-2)'}}>3 jobs running · 18 crew on the clock · <strong>nothing on fire.</strong></div>
      </div>

      <div className="v2-section-bar">
        <div className="v2-eyebrow">TODAY ON SITE</div>
        <div className="v2-mono" style={{fontWeight:600}}>3</div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {[
          { id:'HC', name:'HILLCREST',    sub:'EPS · 3 CREW',  status:'ON',   color:'var(--v2-good)' },
          { id:'AR', name:'ASPEN',        sub:'BASE · 4 CREW', status:'ON',   color:'var(--v2-good)' },
          { id:'GW', name:'GREENWILLOW',  sub:'STONE · 11 CREW', status:'ON', color:'var(--v2-good)' },
        ].map(p => (
          <div key={p.id} className="v2-row">
            <div style={{width:44, height:44, background:'var(--v2-ink)', color:'var(--v2-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14}}>{p.id}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:17}}>{p.name}</div>
              <div className="v2-mono" style={{color:'var(--v2-ink-3)', marginTop:2, fontSize:11, fontWeight:600}}>{p.sub}</div>
            </div>
            <span className="v2-pill good"><span className="dot"></span>ON</span>
          </div>
        ))}
      </div>

      <V2OwnerTabs active="home"/>
    </div>
  );
}

// =====================================================================
// 1B · DASHBOARD · ATTENTION (project at risk)
// =====================================================================
function V2OwnerDashboardAttention() {
  return (
    <div className="v2 v2-screen">
      <V2OwnerStatusBar/>
      <div style={{padding:'24px 20px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">MON · MAY 4</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:48, letterSpacing:'-0.03em', lineHeight:0.95, marginTop:10}}>Good<br/>morning,<br/>Mike.</div>
        <div className="v2-body" style={{marginTop:14, color:'var(--v2-ink-2)'}}>3 jobs running · 18 crew on the clock · <strong>1 thing needs your eyes.</strong></div>
      </div>

      <div style={{padding:'20px'}}>
        <div style={{border:'3px solid var(--v2-ink)', background:'var(--v2-accent)', padding:'20px'}}>
          <div className="v2-row-spread">
            <span className="v2-pill" style={{background:'var(--v2-ink)', color:'var(--v2-accent)', borderColor:'var(--v2-ink)'}}>AT RISK · 18%</span>
            <button style={{width:32, height:32, background:'transparent', border:'2px solid var(--v2-accent-ink)', color:'var(--v2-accent-ink)', fontFamily:'var(--v2-font)', fontWeight:700, fontSize:14}}>✕</button>
          </div>
          <div className="v2-h2" style={{marginTop:14, color:'var(--v2-accent-ink)'}}>ASPEN RIDGE — labor running hot</div>
          <div className="v2-body" style={{color:'var(--v2-accent-ink)', marginTop:8, fontSize:15}}>Day 12 of 35. Margin recoverable but burning fast.</div>
          <div className="v2-rule" style={{background:'var(--v2-ink)', marginTop:16}}></div>
          <button className="v2-btn" style={{background:'var(--v2-ink)', color:'var(--v2-accent)', border:'none', marginTop:16}}>OPEN PROJECT</button>
        </div>
      </div>

      <div className="v2-section-bar">
        <div className="v2-eyebrow">TODAY ON SITE</div>
        <div className="v2-mono" style={{fontWeight:600}}>3</div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        <div className="v2-row">
          <div style={{width:44, height:44, background:'var(--v2-ink)', color:'var(--v2-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14}}>HC</div>
          <div style={{flex:1}}><div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:17}}>HILLCREST</div><div className="v2-mono" style={{color:'var(--v2-ink-3)', marginTop:2, fontSize:11, fontWeight:600}}>EPS · 3 CREW</div></div>
          <span className="v2-pill good"><span className="dot"></span>ON</span>
        </div>
        <div className="v2-row" style={{background:'var(--v2-sand-soft)'}}>
          <div style={{width:44, height:44, background:'var(--v2-bad)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14}}>AR</div>
          <div style={{flex:1}}><div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:17}}>ASPEN</div><div className="v2-mono" style={{color:'var(--v2-bad)', marginTop:2, fontSize:11, fontWeight:700}}>BASE · 4 CREW · -18%</div></div>
          <span className="v2-pill bad"><span className="dot"></span>OVER</span>
        </div>
      </div>

      <V2OwnerTabs active="home" approvalsBadge={3}/>
    </div>
  );
}

// =====================================================================
// 2 · PROJECTS LIST · all states
// =====================================================================
function V2OwnerProjects() {
  const projects = [
    { id:'HC4', name:'HILLCREST PH 4', client:'JOHN MARCHETTI', state:'IN PROGRESS', stateColor:'var(--v2-good)', meta:'D18 / 32 · $114K SPENT', pct:62 },
    { id:'AR1', name:'ASPEN RIDGE',     client:'CALVERA BUILDERS', state:'AT RISK',  stateColor:'var(--v2-bad)',  meta:'D12 / 35 · -18% MARGIN', pct:34 },
    { id:'GW1', name:'GREENWILLOW',     client:'GREENWILLOW LIVING', state:'IN PROGRESS', stateColor:'var(--v2-good)', meta:'D8 / 22 · $42K SPENT', pct:36 },
    { id:'FH1', name:'FOOTHILLS MED',   client:'FOOTHILLS HEALTH', state:'BID SENT', stateColor:'var(--v2-accent)', meta:'$184K PROPOSAL · 3D AGO', pct:0 },
    { id:'HC3', name:'HILLCREST PH 3',  client:'JOHN MARCHETTI', state:'COMPLETE', stateColor:'var(--v2-ink-3)', meta:'$152K · MAR 2026', pct:100 },
  ];
  return (
    <div className="v2 v2-screen">
      <V2OwnerStatusBar/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">PROJECTS</div>
          <div className="v2-appbar-title">5 ACTIVE</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      {/* Filter strip */}
      <div style={{display:'flex', gap:6, padding:'12px 20px', borderBottom:'2px solid var(--v2-ink)', overflowX:'auto'}}>
        {[{l:'ALL · 5', on:true},{l:'IN PROGRESS · 3'},{l:'BID · 1'},{l:'COMPLETE · 12'}].map(c => (
          <button key={c.l} style={{padding:'8px 12px', background: c.on ? 'var(--v2-ink)' : 'transparent', color: c.on ? 'var(--v2-sand)' : 'var(--v2-ink-3)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', whiteSpace:'nowrap'}}>{c.l}</button>
        ))}
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
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:10, fontWeight:600}}>{p.meta}</div>
            {p.pct > 0 && p.pct < 100 && (
              <div style={{height:4, background:'var(--v2-line-soft)', marginTop:10}}>
                <div style={{width:`${p.pct}%`, height:'100%', background: p.stateColor === 'var(--v2-bad)' ? 'var(--v2-bad)' : 'var(--v2-accent)'}}/>
              </div>
            )}
          </button>
        ))}
      </div>

      <V2OwnerTabs active="projects"/>
    </div>
  );
}

// =====================================================================
// 3A · PROJECT · IN PROGRESS
// =====================================================================
function V2OwnerProjectInProgress() {
  return (
    <div className="v2 v2-screen">
      <V2OwnerStatusBar time="10:12"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">JOHN MARCHETTI</div>
          <div className="v2-appbar-title">HILLCREST PH 4</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div style={{padding:'32px 20px 24px', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
        <span className="v2-eyebrow accent" style={{display:'inline-block'}}>IN PROGRESS · D18 / 32</span>
        <div className="v2-bignum" style={{fontSize:88, marginTop:16}}>62<span className="unit">% DONE</span></div>
        <div style={{height:8, background:'var(--v2-ink)', marginTop:18}}>
          <div style={{width:'62%', height:'100%', background:'var(--v2-accent)'}}/>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'18px 20px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow">MARGIN</div>
          <div className="v2-bignum" style={{fontSize:38, marginTop:4}}>34<span className="unit">%</span></div>
          <div className="v2-mono" style={{color:'var(--v2-good)', fontWeight:700, marginTop:6, fontSize:10}}>+2 VS BID</div>
        </div>
        <div style={{padding:'18px 20px'}}>
          <div className="v2-eyebrow">SPENT</div>
          <div className="v2-bignum" style={{fontSize:38, marginTop:4}}>$114<span className="unit">K</span></div>
          <div className="v2-mono" style={{color:'var(--v2-ink-3)', fontWeight:700, marginTop:6, fontSize:10}}>OF $184K</div>
        </div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">QUICK ACTIONS</div></div>
      <div style={{padding:'16px 20px', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">VIEW CREW · 3 ON SITE</button>
        <button className="v2-btn ghost">DAILY LOGS · 18 SUBMITTED</button>
        <button className="v2-btn ghost">PHOTOS · 142 LOGGED</button>
      </div>

      <div className="v2-flex-1"/>
    </div>
  );
}

// =====================================================================
// 3B · PROJECT · AT RISK
// =====================================================================
function V2OwnerProjectAtRisk() {
  return (
    <div className="v2 v2-screen">
      <V2OwnerStatusBar time="7:52"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">CALVERA BUILDERS</div>
          <div className="v2-appbar-title">ASPEN RIDGE</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      {/* Risk banner */}
      <div style={{padding:'18px 20px', background:'var(--v2-bad)', color:'#fff', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, fontWeight:700, letterSpacing:'0.08em'}}>● LABOR -18% VS PLAN</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:20, marginTop:8, lineHeight:1.1}}>Burn rate is outpacing the plan. Margin recoverable if addressed this week.</div>
      </div>

      <div style={{padding:'24px 20px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <span className="v2-eyebrow" style={{color:'var(--v2-bad)'}}>AT RISK · D12 / 35</span>
        <div className="v2-bignum" style={{fontSize:88, marginTop:14}}>34<span className="unit">% DONE</span></div>
        <div style={{height:8, background:'var(--v2-ink)', marginTop:18}}>
          <div style={{width:'34%', height:'100%', background:'var(--v2-bad)'}}/>
          <div style={{width:'18%', height:'100%', background:'var(--v2-bad)', opacity:0.4, marginTop:-8, marginLeft:'34%'}}/>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'18px 20px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow">MARGIN</div>
          <div className="v2-bignum" style={{fontSize:38, marginTop:4, color:'var(--v2-bad)'}}>-18<span className="unit">%</span></div>
          <div className="v2-mono" style={{color:'var(--v2-bad)', fontWeight:700, marginTop:6, fontSize:10}}>-20 VS BID</div>
        </div>
        <div style={{padding:'18px 20px'}}>
          <div className="v2-eyebrow">SPENT</div>
          <div className="v2-bignum" style={{fontSize:38, marginTop:4}}>$82<span className="unit">K</span></div>
          <div className="v2-mono" style={{color:'var(--v2-ink-3)', fontWeight:700, marginTop:6, fontSize:10}}>BUDGET $69K</div>
        </div>
      </div>

      <div className="v2-section-bar" style={{background:'var(--v2-accent)'}}>
        <div className="v2-eyebrow accent" style={{background:'var(--v2-ink)', color:'var(--v2-accent)'}}>AI · RECOMMENDED</div>
      </div>
      <div style={{padding:'16px 20px'}}>
        <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5}}>1 · Cap OT this week. 2 · Reassign Carlos to Hillcrest (overstaffed). 3 · Renegotiate stone scope w/ Calvera.</div>
        <button className="v2-btn primary" style={{marginTop:14}}>OPEN RECOVERY PLAN</button>
      </div>
    </div>
  );
}

// =====================================================================
// 4A · MONEY · DASHBOARD
// =====================================================================
function V2OwnerMoney() {
  return (
    <div className="v2 v2-screen">
      <V2OwnerStatusBar time="8:24"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">MONEY · MAY</div>
          <div className="v2-appbar-title">CASH FLOW</div>
        </div>
      </div>

      <div style={{padding:'20px 20px 16px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">NET THIS MONTH</div>
        <div className="v2-bignum" style={{fontSize:80, marginTop:8, color:'var(--v2-good)'}}>+$84<span className="unit" style={{color:'var(--v2-ink-3)'}}>K</span></div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600}}>IN $312K · OUT $228K</div>
      </div>

      {/* Bar chart 12-month */}
      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">LAST 12 MONTHS · NET</div>
        <div style={{display:'flex', alignItems:'flex-end', gap:6, marginTop:14, height:100}}>
          {[18, 24, 12, 28, 22, 34, 42, 38, 24, 56, 64, 84].map((v, i) => (
            <div key={i} style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:`${(v/100)*100}%`, background: i === 11 ? 'var(--v2-accent)' : 'var(--v2-ink)'}}/>
            </div>
          ))}
        </div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">PENDING</div><div className="v2-mono" style={{fontWeight:700}}>3</div></div>
      {[
        { l:'HILLCREST · INVOICE #112', sub:'NET 30 · DUE MAY 18', amt:'+$46K', tone:'good' },
        { l:'GREENWILLOW · DEPOSIT', sub:'AWAITING WIRE', amt:'+$28K', tone:'good' },
        { l:'PAYROLL · WEEK 18', sub:'AUTO · MAY 7', amt:'-$32K', tone:'bad' },
      ].map((r, i) => (
        <div key={i} className="v2-row">
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{r.l}</div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.sub}</div>
          </div>
          <div className="v2-mono" style={{fontSize:14, fontWeight:800, color: r.tone === 'good' ? 'var(--v2-good)' : 'var(--v2-bad)'}}>{r.amt}</div>
        </div>
      ))}

      <V2OwnerTabs active="money"/>
    </div>
  );
}

// =====================================================================
// 5 · APPROVALS QUEUE (foreman → owner authorizations)
// =====================================================================
function V2OwnerApprovals() {
  const items = [
    { from:'ANA · HILLCREST', kind:'MATERIALS · OVER LIMIT', amt:'$510', detail:'EPS 1.5" · 12 SHEETS · SUPPLIER', when:'12M', urgent:true },
    { from:'ANA · HILLCREST', kind:'OVERTIME · WEEKEND',     amt:'12 HRS', detail:'SAT MAY 31 · FINISH BASECOAT BEFORE RAIN', when:'2H' },
    { from:'MARCO · GREENWILLOW', kind:'EQUIPMENT RENTAL',   amt:'$840', detail:'SCAFFOLD A EXTENSION · 7 EXTRA DAYS', when:'5H' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2OwnerStatusBar time="11:14"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">APPROVALS</div>
          <div className="v2-appbar-title">3 PENDING</div>
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto', padding:'14px 16px'}}>
        {items.map((it, i) => (
          <div key={i} style={{background:'var(--v2-sand)', border:'2px solid var(--v2-ink)', borderLeft: it.urgent ? '6px solid var(--v2-bad)' : '6px solid var(--v2-ink)', marginBottom:12}}>
            <div style={{padding:'14px 16px 12px'}}>
              <div className="v2-row-spread">
                <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:700, letterSpacing:'0.06em'}}>{it.from}</div>
                <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:600}}>{it.when}</div>
              </div>
              <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginTop:8, gap:8}}>
                <span style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{it.kind}</span>
                <span style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:24, color:'var(--v2-ink)'}}>{it.amt}</span>
              </div>
              <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-2)', marginTop:6, fontWeight:600, letterSpacing:'0.02em'}}>{it.detail}</div>
            </div>
            <div style={{borderTop:'2px solid var(--v2-ink)', display:'flex'}}>
              <button style={{flex:2, padding:'14px 0', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', border:'none', borderRight:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font)', fontWeight:700, fontSize:14}}>APPROVE</button>
              <button style={{flex:1, padding:'14px 0', background:'transparent', color:'var(--v2-ink-3)', border:'none', borderRight:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font)', fontWeight:700, fontSize:14}}>REPLY</button>
              <button style={{flex:1, padding:'14px 0', background:'transparent', color:'var(--v2-bad)', border:'none', fontFamily:'var(--v2-font)', fontWeight:700, fontSize:14}}>DENY</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{padding:'12px 20px', background:'var(--v2-ink)', color:'var(--v2-ink-4)', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:600, textAlign:'center', borderTop:'2px solid var(--v2-ink)'}}>
        AUTO-ESCALATES TO PHONE IF UNATTENDED 30M
      </div>
    </div>
  );
}

// =====================================================================
// 6 · TEAM
// =====================================================================
function V2OwnerTeam() {
  const team = [
    { i:'AC', n:'ANA CASTILLO',   role:'FOREMAN',   rate:'$32/H', status:'ON',  meta:'HILLCREST · 38H WEEK' },
    { i:'MP', n:'MARCO PIETRO',   role:'FOREMAN',   rate:'$32/H', status:'ON',  meta:'GREENWILLOW · 36H' },
    { i:'SD', n:'SARAH DAVIS',    role:'ESTIMATOR', rate:'$45/H', status:'ON',  meta:'OFFICE · 28H' },
    { i:'DA', n:'DIEGO ALDANA',   role:'CREW',      rate:'$24/H', status:'BLOCKED', meta:'ASPEN · 34H' },
    { i:'ML', n:'MARCUS LEE',     role:'CREW',      rate:'$24/H', status:'ON',  meta:'HILLCREST · 38H' },
    { i:'CG', n:'CARLOS GUZMÁN',  role:'CREW',      rate:'$22/H', status:'NOSHOW', meta:'GREENWILLOW · 0H' },
  ];
  const colors = { ON:'var(--v2-good)', BLOCKED:'var(--v2-bad)', NOSHOW:'var(--v2-bad)', OFF:'var(--v2-ink-3)' };
  return (
    <div className="v2 v2-screen">
      <V2OwnerStatusBar time="9:14"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">TEAM</div>
          <div className="v2-appbar-title">18 ACTIVE</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      <div style={{display:'flex', gap:6, padding:'12px 20px', borderBottom:'2px solid var(--v2-ink)', overflowX:'auto'}}>
        {[{l:'ALL · 18', on:true},{l:'FOREMEN · 3'},{l:'CREW · 14'},{l:'ESTIMATORS · 1'}].map(c => (
          <button key={c.l} style={{padding:'8px 12px', background: c.on ? 'var(--v2-ink)' : 'transparent', color: c.on ? 'var(--v2-sand)' : 'var(--v2-ink-3)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', whiteSpace:'nowrap'}}>{c.l}</button>
        ))}
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {team.map(p => (
          <div key={p.n} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:14}}>
            <div style={{width:44, height:44, background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14}}>{p.i}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{p.n}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{p.role} · {p.rate} · {p.meta}</div>
            </div>
            <span style={{padding:'4px 8px', background:colors[p.status], color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>{p.status}</span>
          </div>
        ))}
      </div>

      <V2OwnerTabs active="team" approvalsBadge={3}/>
    </div>
  );
}

// =====================================================================
// 7 · NEW PROJECT KICKOFF (owner authoring)
// =====================================================================
function V2OwnerNewProject() {
  return (
    <div className="v2 v2-screen">
      <V2OwnerStatusBar/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">NEW PROJECT</div>
      </div>

      <div style={{padding:'24px 20px 8px'}}>
        <div className="v2-eyebrow">STEP 1 / 4</div>
        <h2 className="v2-h2" style={{marginTop:8}}>Start a job.</h2>
      </div>

      <div style={{padding:'8px 20px 0'}}>
        {[
          { l:'BID FROM A TAKEOFF',     sub:'Pull from estimator deliverables',  badge:'AI' },
          { l:'CLONE FROM PAST PROJECT', sub:'Same crew, similar scope' },
          { l:'BLANK PROJECT',           sub:'Write the scope from scratch' },
        ].map((o, i) => (
          <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'18px 20px', background: i === 0 ? 'var(--v2-accent)' : 'var(--v2-sand)', border:'2px solid var(--v2-ink)', borderTop: i > 0 ? 'none' : '2px solid var(--v2-ink)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div style={{flex:1}}>
              <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16, color: i === 0 ? 'var(--v2-accent-ink)' : 'var(--v2-ink)'}}>{o.l}</div>
                {o.badge && <span style={{padding:'2px 6px', background:'var(--v2-ink)', color:'var(--v2-accent)', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.06em'}}>{o.badge}</span>}
              </div>
              <div className="v2-mono" style={{fontSize:11, color: i === 0 ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', marginTop:4, fontWeight:600}}>{o.sub}</div>
            </div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:24, color: i === 0 ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)'}}>→</div>
          </button>
        ))}
      </div>

      <div className="v2-flex-1"/>

      <div style={{padding:'14px 20px 16px', borderTop:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-3)', fontWeight:600, textAlign:'center'}}>3 RECENT TAKEOFFS READY · HILLCREST PH 4, ASPEN B, FOOTHILLS</div>
      </div>
    </div>
  );
}

// =====================================================================
// 8 · MORE · SETTINGS
// =====================================================================
function V2OwnerMore() {
  const rows = [
    { l:'COMPANY · DAVIS STUCCO LLC', sub:'OWNER · MIKE DAVIS' },
    { l:'INTEGRATIONS', sub:'QBO · GUSTO · STRIPE · 3 CONNECTED' },
    { l:'PRICING BOOK', sub:'142 ITEMS · LAST UPDATE 2D' },
    { l:'LOADED LABOR RATE', sub:'$54.20 / HR · BURDEN MODEL' },
    { l:'WORKING HOURS + HOLIDAYS', sub:'M-S 7-4 · 8 HOLIDAYS' },
    { l:'PERMISSIONS MATRIX', sub:'3 ROLES · CUSTOM RULES' },
    { l:'NOTIFICATIONS', sub:'PUSH · SMS · EMAIL DEFAULTS' },
    { l:'HELP + SUPPORT', sub:'CHAT · BOOK A CALL' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2OwnerStatusBar/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">MORE</div>
          <div className="v2-appbar-title">SETTINGS + ACCOUNT</div>
        </div>
      </div>

      {/* Profile card */}
      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:14}}>
        <div style={{width:52, height:52, background:'var(--v2-ink)', color:'var(--v2-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18}}>MD</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:18}}>MIKE DAVIS</div>
          <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>OWNER · DAVIS STUCCO LLC</div>
        </div>
        <button style={{padding:'8px 12px', background:'transparent', color:'var(--v2-ink)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:11, fontWeight:700, letterSpacing:'0.04em'}}>EDIT</button>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {rows.map((r, i) => (
          <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'18px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{r.l}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{r.sub}</div>
            </div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:18, color:'var(--v2-ink-3)'}}>→</div>
          </button>
        ))}
        <div style={{padding:'24px 20px', textAlign:'center'}}>
          <button style={{background:'transparent', border:'none', color:'var(--v2-bad)', fontFamily:'var(--v2-font)', fontWeight:700, fontSize:14}}>SIGN OUT</button>
        </div>
      </div>

      <V2OwnerTabs active="more"/>
    </div>
  );
}

Object.assign(window, {
  V2OwnerTabs, V2OwnerStatusBar,
  V2OwnerDashboardCalm, V2OwnerDashboardAttention,
  V2OwnerProjects,
  V2OwnerProjectInProgress, V2OwnerProjectAtRisk,
  V2OwnerMoney,
  V2OwnerApprovals,
  V2OwnerTeam,
  V2OwnerNewProject,
  V2OwnerMore,
});
