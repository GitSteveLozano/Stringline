/* global React, MI, MTopBar, MLargeHead, MSectionH, MRow, MKpi, MPill, MBottomTabs, MQA, MAvatarGroup, MBanner, MStage, IOSDevice, AndroidDevice */

// ============================================================
// SHELL — cold-start splash (now rendered in Section 13 · System states)
// PWA install + permission primers were removed: Onboarding (sec14)
// owns first-run end-to-end. Permission primers live there as steps 4 + 9.
// ============================================================

function PWASplash() {
  return (
    <div className="m" style={{background:'#1c1816', color:'#f3ecdf', alignItems:'center', justifyContent:'center'}}>
      <div style={{flex:1}}/>
      <div style={{textAlign:'center'}}>
        <div style={{width:80, height:80, background:'#d9904a', borderRadius:20, display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:20, boxShadow:'0 8px 32px rgba(217,144,74,.5)'}}>
          <span style={{fontSize:36, fontWeight:700, color:'#fff', letterSpacing:'-0.02em'}}>SL</span>
        </div>
        <div style={{fontSize:18, fontWeight:600, letterSpacing:'-0.01em'}}>Stringline</div>
        <div style={{fontSize:12, color:'#8a8278', marginTop:4}}>Construction operations</div>
      </div>
      <div style={{flex:1, display:'flex', alignItems:'flex-end', paddingBottom:40}}>
        <div style={{width:120, margin:'0 auto'}}>
          <div style={{height:2, background:'rgba(255,255,255,.10)', borderRadius:2, overflow:'hidden'}}>
            <div style={{width:'45%', height:'100%', background:'#d9904a', borderRadius:2}}/>
          </div>
          <div style={{textAlign:'center', fontSize:10, color:'#5a5346', marginTop:10}}>Syncing 18 projects · offline ready</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 2 — NAVIGATION SYSTEM
// ============================================================

function NavBottomIOS() {
  return (
    <div className="m">
      <div style={{padding:'14px 20px 12px', borderBottom:'1px solid #e8e3db'}}>
        <div style={{fontSize:13, color:'#8a8278', fontWeight:500}}>Mon, Apr 28</div>
        <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em', marginTop:2}}>Today</div>
      </div>
      <div className="m-body" style={{padding:'12px 0'}}>
        <div style={{padding:'0 16px', display:'grid', gap:12}}>
          {['Hillcrest Mews', 'Aspen Ridge', 'Greenwillow'].map(p => (
            <div key={p} style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:36, height:36, background:'#f7f4ef', borderRadius:8}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:14, fontWeight:600}}>{p}</div>
                <div style={{fontSize:11, color:'#8a8278'}}>3 crew · EPS east</div>
              </div>
              <div style={{fontSize:11, color:'#8a8278', fontFeatureSettings:'"tnum"'}}>4.2h</div>
            </div>
          ))}
        </div>
      </div>
      <MBottomTabs active="home"/>
    </div>
  );
}

function NavTopAppBar() {
  return (
    <div className="m">
      {/* compact app bar */}
      <div style={{height:56, padding:'0 8px 0 4px', display:'flex', alignItems:'center', borderBottom:'1px solid #e8e3db'}}>
        <button className="m-topbar-back">{MI.back}</button>
        <div style={{flex:1, fontSize:17, fontWeight:600}}>Hillcrest Mews</div>
        <button className="m-topbar-back">{MI.search}</button>
        <button className="m-topbar-back" style={{color:'#d9904a'}}>{MI.more}</button>
      </div>
      {/* tabs */}
      <div style={{display:'flex', borderBottom:'1px solid #e8e3db', padding:'0 8px'}}>
        {['Overview', 'Measurements', 'Schedule', 'Time'].map((t, i) => (
          <button key={t} style={{flex:1, padding:'12px 4px', background:'transparent', border:'none', fontFamily:'inherit', fontSize:13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#1c1816' : '#8a8278', borderBottom: i === 0 ? '2px solid #d9904a' : '2px solid transparent', position:'relative'}}>{t}</button>
        ))}
      </div>
      <div className="m-body">
        <div className="m-kpi-row" style={{paddingTop:14}}>
          <MKpi label="Done" value="62" unit="%" meta="↑ 8 yesterday" metaTone="green"/>
          <MKpi label="Margin" value="34" unit="%" meta="vs 32% bid" metaTone="green"/>
        </div>
      </div>
      <MBottomTabs active="proj"/>
    </div>
  );
}

function NavDrawerOverflow() {
  return (
    <div className="m" style={{position:'relative'}}>
      {/* obscured base */}
      <div style={{flex:1, opacity:.4, pointerEvents:'none'}}>
        <MTopBar title="Today"/>
        <div className="m-body"/>
        <MBottomTabs active="home"/>
      </div>
      {/* scrim */}
      <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.4)'}}/>
      {/* drawer */}
      <div style={{position:'absolute', left:0, top:0, bottom:0, width:'82%', background:'#fff', boxShadow:'4px 0 24px rgba(0,0,0,.15)', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'24px 20px 20px', background:'#1c1816', color:'#f3ecdf'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:44, height:44, background:'#d9904a', borderRadius:22, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:600}}>MR</div>
            <div>
              <div style={{fontSize:15, fontWeight:600}}>Mike Reynolds</div>
              <div style={{fontSize:11, color:'#aea69a'}}>Project Mgr · Stringline Co</div>
            </div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:6, marginTop:12, fontSize:11, color:'#aea69a'}}>
            <span style={{width:6, height:6, borderRadius:3, background:'#2c8a55'}}/>Synced · 2 min ago
          </div>
        </div>
        <div style={{padding:'8px 0', flex:1}}>
          {[
            {i:MI.home, l:'Today', active:true},
            {i:MI.proj, l:'Projects', sub:'18 active'},
            {i:MI.cal,  l:'Schedule'},
            {i:MI.time, l:'Time', sub:'5 to approve', badge:'5'},
            {i:MI.layers, l:'Measurements'},
            {i:MI.receipt, l:'Estimates'},
            {i:MI.box, l:'Rentals'},
          ].map(it => (
            <button key={it.l} style={{width:'100%', padding:'12px 20px', background:it.active ? '#f7f4ef' : 'transparent', border:'none', display:'flex', alignItems:'center', gap:14, fontFamily:'inherit', textAlign:'left', borderRight: it.active ? '3px solid #d9904a' : 'none'}}>
              <span style={{width:24, color: it.active ? '#d9904a' : '#5b544c'}}>{it.i}</span>
              <span style={{flex:1, fontSize:14, fontWeight: it.active ? 600 : 500, color:'#1c1816'}}>{it.l}</span>
              {it.badge && <span className="m-pill" data-tone="amber">{it.badge}</span>}
              {it.sub && !it.badge && <span style={{fontSize:11, color:'#aea69a'}}>{it.sub}</span>}
            </button>
          ))}
          <div style={{height:1, background:'#e8e3db', margin:'8px 20px'}}/>
          {[
            {i:MI.cog, l:'Settings'},
            {i:MI.user, l:'Profile'},
            {i:MI.bell, l:'Notifications'},
          ].map(it => (
            <button key={it.l} style={{width:'100%', padding:'12px 20px', background:'transparent', border:'none', display:'flex', alignItems:'center', gap:14, fontFamily:'inherit', textAlign:'left'}}>
              <span style={{width:24, color:'#5b544c'}}>{it.i}</span>
              <span style={{flex:1, fontSize:14, color:'#1c1816'}}>{it.l}</span>
            </button>
          ))}
        </div>
        <div style={{padding:'12px 20px', borderTop:'1px solid #e8e3db', fontSize:11, color:'#8a8278'}}>
          v3.2.1 · Build 4280
        </div>
      </div>
    </div>
  );
}

function NavSwitcher() {
  return (
    <div className="m" style={{background:'rgba(0,0,0,.45)', position:'relative'}}>
      <div style={{flex:1}}/>
      <div className="m-sheet" style={{position:'relative', maxHeight:'70%'}}>
        <div className="m-sheet-grabber"/>
        <div className="m-sheet-header">
          <div className="m-sheet-title">Switch project or workspace</div>
          <button style={{background:'#f7f4ef', border:'none', width:32, height:32, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.close}</button>
        </div>
        <div className="m-sheet-body">
          {/* Workspace row — for owners who run more than one LLC */}
          <div className="m-section-h" style={{paddingTop:14}}>Workspace</div>
          <div className="m-list-inset">
            <div style={{padding:'12px 14px', borderBottom:'1px solid #e8e3db', display:'flex', alignItems:'center', gap:12, background:'rgba(217,144,74,.06)'}}>
              <div style={{width:36, height:36, background:'#d9904a', color:'#fff', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, letterSpacing:'-.01em'}}>DS</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14, fontWeight:600}}>Davis Stucco LLC</div>
                <div style={{fontSize:11, color:'#8a8278'}}>16 active · Owner</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d9904a" strokeWidth="2.4"><path d="M5 12l5 5L20 7"/></svg>
            </div>
            <div style={{padding:'12px 14px', borderBottom:'1px solid #e8e3db', display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:36, height:36, background:'#5B8AA8', color:'#fff', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12}}>RP</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14, fontWeight:600}}>Ridge Partners (with Tom)</div>
                <div style={{fontSize:11, color:'#8a8278'}}>3 active · Co-owner</div>
              </div>
              <span className="m-chev" style={{color:'#aea69a'}}>{MI.chev}</span>
            </div>
            <div style={{padding:'10px 14px', display:'flex', alignItems:'center', gap:10, fontSize:13, color:'#b46e2c', fontWeight:500}}>
              {MI.plus}
              <span>Join or create another workspace</span>
            </div>
          </div>

          <div style={{padding:'14px 16px 12px'}}>
            <div style={{height:42, padding:'0 12px', background:'#f7f4ef', borderRadius:12, display:'flex', alignItems:'center', gap:8}}>
              <span style={{color:'#8a8278'}}>{MI.search}</span>
              <span style={{flex:1, fontSize:14, color:'#aea69a'}}>Search projects, addresses…</span>
            </div>
          </div>
          <div className="m-section-h">Pinned</div>
          <div className="m-list-inset">
            <MRow leading="HC" leadingTone="accent" headline="Hillcrest Mews" supporting="62% · 18 days · 4 crew" trailing={<span className="m-pill" data-tone="green" data-dot="true">on track</span>}/>
            <MRow leading="AR" leadingTone="amber" headline="Aspen Ridge Townhomes" supporting="34% · 12 days · 6 crew" trailing={<span className="m-pill" data-tone="red" data-dot="true">over budget</span>}/>
          </div>
          <div className="m-section-h">All active (16)</div>
          <div className="m-list-inset">
            <MRow leading="GW" leadingTone="green" headline="Greenwillow Senior Living" supporting="96% · closeout"/>
            <MRow leading="FH" leadingTone="blue" headline="Foothills Medical" supporting="Bid pending"/>
            <MRow leading="RB" leadingTone="blue" headline="Riverbend Retail" supporting="Bid pending"/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 3 — DASHBOARD / TODAY
// ============================================================

function NavMore() {
  const primary = [
    { i: MI.box,     l: 'Rentals',        sub: '14 active · 92% util', tone: 'accent' },
    { i: MI.layers,  l: 'Measurements',   sub: '4 in progress', tone: 'amber' },
    { i: MI.receipt, l: 'Estimates',      sub: '7 sent · 2 awaiting', tone: 'blue' },
    { i: MI.users,   l: 'Crews',          sub: '14 active', tone: 'green' },
  ];
  const workspace = [
    { i: MI.cog,     l: 'Settings',      sub: 'Workspace, integrations' },
    { i: MI.$,       l: 'Pricing book',  sub: '142 line items' },
    { i: MI.sync,    l: 'Integrations',  sub: 'QBO · Gusto · Stripe' },
    { i: MI.bell,    l: 'Notifications', sub: 'On · push + email' },
  ];
  const personal = [
    { i: MI.user,    l: 'Profile',       sub: 'Mike Reynolds' },
    { i: MI.lock,    l: 'Privacy & data' },
    { i: MI.alert,   l: 'Help & feedback' },
  ];
  const Section = ({ title, items }) => (
    <>
      <div className="m-section-h">{title}</div>
      <div className="m-list-inset">
        {items.map((it, i) => (
          <div key={i} className="m-list-row">
            <span className="m-l-leading" data-tone={it.tone}>{it.i}</span>
            <div className="m-l-body">
              <div className="m-l-headline">{it.l}</div>
              {it.sub && <div className="m-l-supporting">{it.sub}</div>}
            </div>
            <span className="m-l-trailing"><span className="m-chev">{MI.chev}</span></span>
          </div>
        ))}
      </div>
    </>
  );
  return (
    <div className="m">
      <div className="m-largehead">
        <div className="m-largehead-row">
          <div>
            <div className="m-h-display">More</div>
            <div className="m-h-sub">Everything else</div>
          </div>
          <button style={{background:'#f7f4ef', border:'none', width:36, height:36, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.search}</button>
        </div>
      </div>
      <div className="m-body" style={{paddingTop:6}}>
        {/* User chip */}
        <div style={{margin:'12px 16px 4px', padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, display:'flex', alignItems:'center', gap:12}}>
          <div className="m-avatar" data-size="lg">MR</div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontSize:15, fontWeight:600}}>Mike Reynolds</div>
            <div style={{fontSize:12, color:'#8a8278'}}>Owner · Stringline Co</div>
          </div>
          <span className="m-pill" data-tone="green"><span className="m-dot"/>synced</span>
        </div>

        <Section title="Workflow" items={primary}/>
        <Section title="Workspace" items={workspace}/>
        <Section title="You" items={personal}/>

        <div style={{padding:'18px 20px 24px', textAlign:'center', fontSize:11, color:'#aea69a', letterSpacing:'.04em'}}>
          Stringline · v3.2.1 · Build 4280
        </div>
      </div>
      <MBottomTabs active="more"/>
    </div>
  );
}

// ============================================================
// SECTION 3 — DASHBOARD / TODAY
// ============================================================

function DashboardPM() {
  return (
    <div className="m">
      {/* Hero — date, big greeting, status sentence */}
      <div style={{padding:'18px 20px 20px', borderBottom:'1px solid #e8e3db'}}>
        <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>Mon · May 4</div>
        <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.05, marginTop:6}}>Good morning,<br/>Mike.</div>
        <div style={{fontSize:13, color:'#5b544c', marginTop:10, lineHeight:1.45}}>3 jobs running · 18 crew on the clock · 1 thing needs your eyes.</div>
      </div>

      <div className="m-body" style={{paddingTop:14}}>
        {/* Single attention card — the 1 thing that needs eyes */}
        <div style={{margin:'0 16px 14px'}}>
          <div className="m-ai-stripe" data-tone="warn" style={{padding:'14px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6}}>
              <MAiEyebrow tone="warn">At risk · 18% over labor</MAiEyebrow>
              <button className="m-ai-dismiss" aria-label="Dismiss"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
            </div>
            <div style={{fontSize:14.5, fontWeight:600, lineHeight:1.3, letterSpacing:'-0.005em'}}>Aspen Ridge — labor running hot</div>
            <div style={{fontSize:12, color:'#5b544c', marginTop:4, lineHeight:1.45}}>Day 12 of 35. Margin still recoverable but burning fast.</div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, marginTop:10, paddingTop:10, borderTop:'1px dashed var(--m-line-2)'}}>
              <MAttribution sparkState="muted">Why this card?</MAttribution>
              <button className="m-btn m-btn-sm" data-variant="primary">Open project</button>
            </div>
          </div>
        </div>

        <div className="m-section-h">Today on site</div>
        <div className="m-list-inset">
          <MRow leading="HC" leadingTone="accent" headline="Hillcrest Mews" supporting="EPS east elev. · Ana · 3 crew" trailing={<><span className="m-pill" data-tone="green" data-dot="true">on</span></>}/>
          <MRow leading="AR" leadingTone="amber" headline="Aspen Ridge" supporting="Block A basecoat · Priya · 4 crew" trailing={<><span className="m-pill" data-tone="red" data-dot="true">over</span></>}/>
          <MRow leading="GW" leadingTone="green" headline="Greenwillow" supporting="Punch list · Jamal · 1 crew" trailing={<><span className="m-pill" data-tone="green">96%</span></>}/>
        </div>

        <div style={{height:18}}/>
      </div>
      <MBottomTabs active="home"/>
    </div>
  );
}

// ============================================================
// SECTION 4 — PROJECTS
// ============================================================

function ProjectsList() {
  const tabs = [
    { l: 'Yours to move', n: 3 },     // drafting + accepted + in progress
    { l: 'Awaiting client', n: 2 },   // sent
    { l: 'Closeout', n: 1 },          // done — pending final billing
    { l: 'Archived' },
  ];
  // state → token map matches StateChip in mb-screens-project-detail.jsx
  const stateMap = {
    drafting:  { l:'Drafting',     dot:'#d9904a' },
    sent:      { l:'Sent · awaiting', dot:'#2f6fb5' },
    accepted:  { l:'Accepted',     dot:'#2c8a55' },
    progress:  { l:'In progress',  dot:'#2c8a55' },
    closeout:  { l:'Closeout',     dot:'#2f6fb5' },
  };
  const projects = [
    { n:'Hillcrest Mews — Phase 4',  a:'4820 Crestline Dr · Calgary',  state:'progress',  meta:'Day 18 of 32 · 4 crew', percent: 62, accent:'#E8A86B' },
    { n:'Aspen Ridge Townhomes',     a:'88 Aspen Ridge Bv · Canmore',  state:'progress',  meta:'$1.2k over plan · 6 crew', percent: 34, accent:'#A05A33', warn:true },
    { n:'Greenwillow Senior Living', a:'1100 Greenwillow Cr · Edmonton', state:'closeout', meta:'Final invoice pending', percent: 96, accent:'#7A8C6F' },
    { n:'Foothills Medical Annex',   a:'1403 29 St NW · Calgary',      state:'sent',      meta:'Sent 9 days ago · viewed 2×', accent:'#5B8AA8' },
    { n:'Riverbend Retail Shell',    a:'212 Riverbend Way · Calgary',  state:'sent',      meta:'Sent 12 days ago · not viewed', accent:'#8A6F9C' },
  ];
  return (
    <div className="m">
      <div style={{padding:'14px 20px 8px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em'}}>Projects</div>
          <button style={{width:36, height:36, background:'#1c1816', color:'#fff', borderRadius:18, border:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.plus}</button>
        </div>
        <div style={{height:42, marginTop:12, padding:'0 12px', background:'#f7f4ef', borderRadius:12, display:'flex', alignItems:'center', gap:8}}>
          <span style={{color:'#8a8278'}}>{MI.search}</span>
          <span style={{flex:1, fontSize:14, color:'#aea69a'}}>Search projects, clients…</span>
          <span style={{color:'#8a8278'}}>{MI.filter}</span>
        </div>
      </div>
      <div style={{display:'flex', gap:8, padding:'8px 16px 12px', overflow:'auto', borderBottom:'1px solid #e8e3db'}}>
        {tabs.map((t, i) => (
          <button key={t.l} className="m-chip" data-active={i === 0}>
            {t.l}
            {t.n != null && <span style={{opacity:.7, fontSize:11, marginLeft:5, fontFeatureSettings:'"tnum"'}}>{t.n}</span>}
          </button>
        ))}
      </div>
      <div className="m-body">
        <div style={{display:'flex', flexDirection:'column'}}>
          {projects.map((p, i) => {
            const s = stateMap[p.state];
            return (
              <button key={p.n} style={{
                padding:'14px 16px', background:'#fff',
                borderTop: i === 0 ? 'none' : '1px solid #f0ebe2',
                border:'none', textAlign:'left', fontFamily:'inherit', cursor:'pointer',
                display:'flex', alignItems:'center', gap:12,
              }}>
                <span style={{width:3, alignSelf:'stretch', background:p.accent, borderRadius:2, flexShrink:0}}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:6, fontSize:10.5, fontWeight:700, color:'#5b544c', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:3}}>
                    <span style={{width:6, height:6, borderRadius:3, background:s.dot}}/>
                    <span>{s.l}</span>
                  </div>
                  <div style={{fontSize:14.5, fontWeight:600, lineHeight:1.25, letterSpacing:'-0.005em'}}>{p.n}</div>
                  <div style={{fontSize:11.5, color:'#8a8278', marginTop:2}}>{p.a}</div>
                  <div style={{fontSize:11.5, color: p.warn ? '#c98a2e' : '#5b544c', marginTop:5, fontFeatureSettings:'"tnum"'}}>{p.meta}</div>
                  {p.percent != null && (
                    <div style={{height:3, background:'#f0ebe2', borderRadius:2, overflow:'hidden', marginTop:8}}>
                      <div style={{width:`${p.percent}%`, height:'100%', background:p.accent}}/>
                    </div>
                  )}
                </div>
                <span style={{color:'#aea69a', flexShrink:0}}>{MI.chev}</span>
              </button>
            );
          })}
        </div>
      </div>
      <MBottomTabs active="proj"/>
    </div>
  );
}

function ProjectDetail() {
  return (
    <div className="m">
      <div style={{height:140, background:'linear-gradient(135deg, #E8A86B 0%, #C77B4F 100%)', position:'relative', padding:'12px 16px', color:'#fff'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <button style={{width:36, height:36, background:'rgba(255,255,255,.25)', borderRadius:18, border:'none', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)'}}>{MI.back}</button>
          <button style={{width:36, height:36, background:'rgba(255,255,255,.25)', borderRadius:18, border:'none', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)'}}>{MI.more}</button>
        </div>
        <div style={{position:'absolute', bottom:12, left:16, right:16}}>
          <div style={{fontSize:11, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', opacity:.85}}>Active · D4 Exterior</div>
          <div style={{fontSize:22, fontWeight:700, letterSpacing:'-0.01em', lineHeight:1.1, marginTop:2}}>Hillcrest Mews — Phase 4</div>
          <div style={{fontSize:12, opacity:.8, marginTop:2}}>4820 Crestline Dr · Hillcrest Homes</div>
        </div>
      </div>
      {/* sub-nav */}
      <div style={{display:'flex', borderBottom:'1px solid #e8e3db', padding:'0 8px', overflow:'auto'}}>
        {['Overview', 'Measurements', 'Schedule', 'Time', 'Logs', 'Files', 'Rentals'].map((t, i) => (
          <button key={t} style={{padding:'12px 14px', background:'transparent', border:'none', fontFamily:'inherit', fontSize:13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#1c1816' : '#8a8278', borderBottom: i === 0 ? '2px solid #d9904a' : '2px solid transparent', whiteSpace:'nowrap'}}>{t}</button>
        ))}
      </div>
      <div className="m-body">
        <div className="m-kpi-row m-kpi-row-3" style={{marginTop:14}}>
          <MKpi label="Done" value="62" unit="%"/>
          <MKpi label="Margin" value="34" unit="%" meta="vs 32% bid" metaTone="green"/>
          <MKpi label="Days" value="18" meta="of 32"/>
        </div>

        <div className="m-section-h">Today on site</div>
        <div className="m-list-inset">
          <MRow leading="AC" leadingTone="accent" headline="Ana Castillo · Lead" supporting="Clocked in 7:02 AM · EPS east"/>
          <MRow leading="ML" leadingTone="blue" headline="Marcus Lee · Crew" supporting="Clocked in 7:04 AM · EPS east"/>
          <MRow leading="TR" leadingTone="amber" headline="Tomás Reyes · Crew" supporting="Clocked in 7:08 AM · EPS east"/>
        </div>

        <div className="m-section-h">Recent activity</div>
        <div className="m-list-inset">
          <MRow leading={MI.cam} headline="6 site photos · Ana" supporting="Today 14:48"/>
          <MRow leading={MI.doc} headline="Daily log submitted" supporting="Yesterday · 8 photos · sent to owner"/>
          <MRow leading={MI.layers} headline="Takeoff updated · +120 sf" supporting="South elev. extra · Mike"/>
        </div>

        <div className="m-btn-stack" style={{margin:'14px 0'}}>
          <button className="m-btn" data-variant="primary">Add daily log</button>
        </div>
      </div>
      <MBottomTabs active="proj"/>
    </div>
  );
}

function ProjectOverview() {
  return (
    <div className="m">
      <MTopBar back title="Hillcrest Mews" sub="Phase 4 · D4" action="more" actionIcon={MI.more}/>
      <div className="m-body">
        {/* Health card */}
        <div style={{padding:'14px 16px 8px'}}>
          <div style={{padding:'16px', background:'#fff', border:'1px solid #e8e3db', borderRadius:14}}>
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
              <span style={{width:8, height:8, borderRadius:4, background:'#2c8a55'}}/>
              <span style={{fontSize:12, fontWeight:600, color:'#2c8a55', textTransform:'uppercase', letterSpacing:'.06em'}}>On track</span>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
              <div>
                <div style={{fontSize:10, color:'#8a8278', textTransform:'uppercase', fontWeight:600, letterSpacing:'.06em'}}>Bid</div>
                <div style={{fontSize:18, fontWeight:600, marginTop:2, fontFeatureSettings:'"tnum"'}}>$184,250</div>
                <div style={{fontSize:11, color:'#8a8278', marginTop:1}}>4,785 sf @ $38.50</div>
              </div>
              <div>
                <div style={{fontSize:10, color:'#8a8278', textTransform:'uppercase', fontWeight:600, letterSpacing:'.06em'}}>Forecast</div>
                <div style={{fontSize:18, fontWeight:600, marginTop:2, fontFeatureSettings:'"tnum"', color:'#2c8a55'}}>+$5,200</div>
                <div style={{fontSize:11, color:'#8a8278', marginTop:1}}>vs plan</div>
              </div>
            </div>
            <div style={{height:6, background:'#f5f1ec', borderRadius:3, marginTop:14, overflow:'hidden', display:'flex'}}>
              <div style={{width:'62%', background:'#d9904a'}}/>
              <div style={{width:'8%', background:'#d9904a', opacity:.4}}/>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:6, fontSize:11, color:'#8a8278'}}>
              <span>62% billed · 70% complete</span>
              <span>Day 18 of 32</span>
            </div>
          </div>
        </div>

        <div className="m-section-h">By scope</div>
        <div className="m-list-inset">
          {[
            {c:'EPS', n:'EPS Insulation', q:'2,226 sf', p:0.78, t:'#E8A86B'},
            {c:'BASE', n:'Basecoat', q:'2,226 sf', p:0.42, t:'#C77B4F'},
            {c:'STONE', n:'Cultured Stone', q:'184 sf', p:0.95, t:'#7A8C6F'},
            {c:'CAULK', n:'Caulking', q:'310 lf', p:0.20, t:'#6FA8A0'},
          ].map(s => (
            <div key={s.c} style={{padding:'12px 14px', borderBottom:'1px solid #e8e3db', display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:36, height:36, background:s.t, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:10, fontWeight:700, letterSpacing:'.04em'}}>{s.c}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:14, fontWeight:500}}>{s.n}</div>
                <div style={{fontSize:11, color:'#8a8278'}}>{s.q}</div>
                <div style={{height:4, background:'#f5f1ec', borderRadius:2, marginTop:6, overflow:'hidden'}}>
                  <div style={{width:`${s.p*100}%`, height:'100%', background:s.t}}/>
                </div>
              </div>
              <div style={{fontSize:13, fontWeight:600, fontFeatureSettings:'"tnum"', minWidth:38, textAlign:'right'}}>{Math.round(s.p*100)}%</div>
            </div>
          ))}
        </div>
      </div>
      <MBottomTabs active="proj"/>
    </div>
  );
}

Object.assign(window, {
  PWASplash,
  NavBottomIOS, NavTopAppBar, NavDrawerOverflow, NavSwitcher, NavMore,
  DashboardPM,
  ProjectsList, ProjectDetail, ProjectOverview,
});
