/* global React, MI, MTopBar, MRow, MKpi, MBottomTabs */

// ============================================================
// OWNER EXTENSIONS — sign in, notifications, clients, files,
// invoice → paid. Added per audit recommendations.
// ============================================================

// ─── 1 · SIGN IN (returning user) ─────────────────────────────
function SignInHome() {
  return (
    <div className="m" style={{background:'#f7f4ef'}}>
      {/* compact brand mark */}
      <div style={{padding:'40px 24px 24px', flexShrink:0}}>
        <div style={{width:40, height:40, background:'#d9904a', borderRadius:10, display:'inline-flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(217,144,74,.35)'}}>
          <span style={{fontSize:18, fontWeight:700, color:'#fff', letterSpacing:'-0.02em', fontFamily:'Geist'}}>SL</span>
        </div>
      </div>
      <div style={{padding:'0 22px', flex:1, overflow:'auto'}}>
        <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.1}}>Welcome back.</div>
        <div style={{fontSize:13, color:'#5b544c', marginTop:6, lineHeight:1.45}}>Sign in to <strong style={{color:'#1c1816', fontWeight:600}}>Hillcrest Homes</strong> or <span style={{color:'#b46e2c', fontWeight:600}}>switch workspace</span>.</div>

        {/* Email + password */}
        <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:10}}>
          <div>
            <div style={{fontSize:11, color:'#8a8278', fontWeight:500, marginBottom:5}}>Email</div>
            <div style={{height:46, padding:'0 12px', background:'#fff', border:'1px solid #d8d2c7', borderRadius:11, display:'flex', alignItems:'center', fontSize:14}}>
              mike@hillcresthomes.co
            </div>
          </div>
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:5}}>
              <div style={{fontSize:11, color:'#8a8278', fontWeight:500}}>Password</div>
              <span style={{fontSize:11, color:'#b46e2c', fontWeight:600, cursor:'pointer'}}>Forgot?</span>
            </div>
            <div style={{height:46, padding:'0 12px', background:'#fff', border:'1.5px solid #d9904a', borderRadius:11, display:'flex', alignItems:'center', fontSize:16, letterSpacing:'.2em', color:'#1c1816'}}>
              <span style={{flex:1}}>•••••••••</span>
              <span style={{fontSize:12, color:'#8a8278', letterSpacing:0, fontWeight:500}}>Show</span>
            </div>
          </div>
          <button style={{height:48, marginTop:6, background:'#d9904a', color:'#fff', border:'none', borderRadius:12, fontFamily:'inherit', fontSize:15, fontWeight:600}}>Sign in</button>
        </div>

        {/* divider */}
        <div style={{display:'flex', alignItems:'center', gap:10, padding:'22px 0 14px'}}>
          <div style={{flex:1, height:1, background:'#e8e3db'}}/>
          <span style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.10em'}}>OR</span>
          <div style={{flex:1, height:1, background:'#e8e3db'}}/>
        </div>

        {/* SSO row */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
          <button style={{height:44, background:'#000', color:'#fff', border:'none', borderRadius:11, fontFamily:'inherit', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
            <svg width="13" height="15" viewBox="0 0 17 20" fill="currentColor"><path d="M13.6 10.6a4.4 4.4 0 012.1-3.7 4.6 4.6 0 00-3.6-2c-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9a4.8 4.8 0 00-4 2.5c-1.7 3-.4 7.4 1.3 9.8.8 1.2 1.7 2.5 3 2.4 1.2-.05 1.6-.8 3.1-.8s1.9.8 3.2.8c1.3-.02 2.2-1.2 3-2.4a10.5 10.5 0 001.4-2.8 4.3 4.3 0 01-2.4-3.8zM11 3.3A4.3 4.3 0 0012 0a4.4 4.4 0 00-2.9 1.5A4 4 0 008 4.7a3.6 3.6 0 003-1.4z"/></svg>
            Apple
          </button>
          <button style={{height:44, background:'#fff', color:'#1c1816', border:'1px solid #d8d2c7', borderRadius:11, fontFamily:'inherit', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
            <svg width="13" height="13" viewBox="0 0 18 18"><path d="M17.6 9.2c0-.6-.05-1.2-.15-1.7H9v3.4h4.8a4 4 0 01-1.8 2.7v2.2h2.9a8.7 8.7 0 002.7-6.6z" fill="#4285F4"/><path d="M9 18a8.6 8.6 0 005.95-2.2l-2.9-2.2a5.4 5.4 0 01-3.05.85 5.4 5.4 0 01-5-3.7H1v2.3A9 9 0 009 18z" fill="#34A853"/><path d="M4 10.75a5.4 5.4 0 010-3.5V4.95H1a9 9 0 000 8.1l3-2.3z" fill="#FBBC05"/><path d="M9 3.6a4.9 4.9 0 013.45 1.35l2.6-2.6A8.7 8.7 0 009 0 9 9 0 001 4.95l3 2.3A5.4 5.4 0 019 3.6z" fill="#EA4335"/></svg>
            Google
          </button>
        </div>

        <button style={{marginTop:8, height:42, width:'100%', background:'transparent', border:'1px solid #e8e3db', borderRadius:11, fontFamily:'inherit', fontSize:13, fontWeight:500, color:'#5b544c', display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7l9 6 9-6"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>
          Send a magic link instead
        </button>

        <div style={{marginTop:24, paddingTop:18, borderTop:'1px solid #e8e3db', textAlign:'center', fontSize:12, color:'#8a8278'}}>
          New to Sitelayer? <span style={{color:'#b46e2c', fontWeight:600}}>Create a workspace</span>
        </div>
      </div>
    </div>
  );
}

function SignInMagicSent() {
  return (
    <div className="m" style={{background:'#f7f4ef'}}>
      <div style={{padding:'10px 16px', flexShrink:0, display:'flex'}}>
        <button style={{width:36, height:36, background:'transparent', border:'none', color:'#1c1816', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.back}</button>
      </div>
      <div style={{flex:1, padding:'20px 22px', overflow:'auto'}}>
        <div style={{width:54, height:54, background:'rgba(217,144,74,.10)', borderRadius:14, display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:18, color:'#d9904a'}}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7l9 6 9-6"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>
        </div>
        <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.15}}>Open the link.</div>
        <div style={{fontSize:13.5, color:'#5b544c', lineHeight:1.5, marginTop:8}}>We sent a one-tap sign-in link to</div>
        <div style={{padding:'14px 16px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, marginTop:12, fontSize:14, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <span>mike@hillcresthomes.co</span>
          <button style={{background:'transparent', border:'none', color:'#b46e2c', fontSize:12, fontWeight:600, fontFamily:'inherit'}}>Edit</button>
        </div>
        <div style={{padding:'12px 14px', background:'#fff', border:'1px dashed #e8e3db', borderRadius:10, marginTop:14, fontSize:12, color:'#5b544c', lineHeight:1.5, display:'flex', gap:8}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5b544c" strokeWidth="1.6" style={{flexShrink:0, marginTop:1}}><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
          <span>Open on this device to sign in here. Link valid for 15 min.</span>
        </div>
        <div style={{marginTop:24, fontSize:11, color:'#8a8278'}}>Didn't get it?</div>
        <div style={{marginTop:6, display:'flex', gap:14, fontSize:13, fontWeight:600}}>
          <span style={{color:'#b46e2c'}}>Resend</span>
          <span style={{color:'#5b544c'}}>Use password instead</span>
        </div>
      </div>
    </div>
  );
}

// ─── 2 · NOTIFICATIONS INBOX ───────────────────────────────────
function NotificationsInbox() {
  const groups = [
    { label:'Now', items:[
      { who:'Aspen Ridge', sub:'Margin guardrail · 18% over plan', when:'12m', kind:'alert',  unread:true, action:'Open project' },
      { who:'Diego Aldana', sub:'Field blocker · out of EPS 1.5"', when:'1h', kind:'field', unread:true,  action:'Reply' },
    ]},
    { label:'Today', items:[
      { who:'Ana Castillo', sub:'Daily log submitted · Hillcrest', when:'3h', kind:'log',  unread:true },
      { who:'John Marchetti', sub:'Read estimate EST-2026-184', when:'5h', kind:'doc', unread:false },
      { who:'Time queue', sub:'12 entries ready for your review', when:'8h', kind:'time', unread:false, action:'Approve' },
    ]},
    { label:'Yesterday', items:[
      { who:'Greenwillow', sub:'Project marked Done · final variance −2.4%', when:'1d', kind:'done', unread:false },
      { who:'QuickBooks', sub:'Synced 14 transactions', when:'1d', kind:'sync',  unread:false },
    ]},
  ];
  const kindIcon = {
    alert: { i:MI.alert, fg:'#c98a2e', bg:'rgba(201,138,46,.12)' },
    field: { i:MI.users, fg:'#c0463d', bg:'rgba(192,70,61,.10)' },
    log:   { i:MI.cam,   fg:'#5b8aa8', bg:'rgba(91,138,168,.10)' },
    doc:   { i:MI.doc,   fg:'#5b544c', bg:'#f5f1ec' },
    time:  { i:MI.time,  fg:'#2c8a55', bg:'rgba(44,138,85,.12)' },
    done:  { i:MI.check, fg:'#2c8a55', bg:'rgba(44,138,85,.12)' },
    sync:  { i:MI.sync,  fg:'#5b544c', bg:'#f5f1ec' },
  };
  return (
    <div className="m">
      <div style={{padding:'14px 20px 8px', display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em'}}>Notifications</div>
          <div style={{fontSize:12, color:'#8a8278', marginTop:2}}>3 unread · this week</div>
        </div>
        <button style={{fontSize:12, color:'#b46e2c', fontWeight:600, background:'transparent', border:'none', fontFamily:'inherit'}}>Mark all read</button>
      </div>

      {/* Filter chips */}
      <div style={{display:'flex', gap:6, padding:'8px 16px 12px', overflowX:'auto', borderBottom:'1px solid #e8e3db'}}>
        {[{l:'All', n:7, on:true},{l:'Approvals', n:1},{l:'Schedule', n:2},{l:'Field', n:2},{l:'Money', n:1}].map(c => (
          <button key={c.l} style={{
            flex:'0 0 auto', padding:'6px 11px', borderRadius:18,
            background: c.on ? '#1c1816' : '#fff',
            color: c.on ? '#fff' : '#5b544c',
            border: c.on ? 'none' : '1px solid #e8e3db',
            fontFamily:'inherit', fontSize:12, fontWeight:500,
            display:'inline-flex', alignItems:'center', gap:6, whiteSpace:'nowrap',
          }}>
            {c.l}<span style={{fontSize:10, opacity:.65, fontFeatureSettings:'"tnum"'}}>{c.n}</span>
          </button>
        ))}
      </div>

      <div className="m-body">
        {groups.map(g => (
          <React.Fragment key={g.label}>
            <div className="m-section-h">{g.label}</div>
            <div style={{padding:'0 16px', display:'flex', flexDirection:'column', gap:6}}>
              {g.items.map((n, i) => {
                const k = kindIcon[n.kind];
                return (
                  <div key={i} style={{padding:'12px 12px', background: n.unread ? '#fff' : '#fafaf6', border:'1px solid #e8e3db', borderRadius:11, display:'flex', gap:11, alignItems:'flex-start', position:'relative'}}>
                    {n.unread && <span style={{position:'absolute', left:-4, top:'50%', transform:'translateY(-50%)', width:3, height:24, background:'#d9904a', borderRadius:2}}/>}
                    <div style={{width:34, height:34, borderRadius:8, background:k.bg, color:k.fg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{React.cloneElement(k.i, {width:18, height:18})}</div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8}}>
                        <span style={{fontSize:13, fontWeight: n.unread ? 600 : 500, color:'#1c1816'}}>{n.who}</span>
                        <span style={{fontSize:10.5, color:'#8a8278', fontFeatureSettings:'"tnum"', flexShrink:0}}>{n.when}</span>
                      </div>
                      <div style={{fontSize:12, color:'#5b544c', marginTop:2, lineHeight:1.4}}>{n.sub}</div>
                      {n.action && <button style={{marginTop:8, padding:'4px 10px', background:'#1c1816', color:'#fff', border:'none', borderRadius:6, fontSize:11, fontWeight:600, fontFamily:'inherit'}}>{n.action}</button>}
                    </div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ))}
        <div style={{padding:'18px 16px', textAlign:'center', fontSize:11, color:'#aea69a'}}>
          Older notifications · <span style={{color:'#b46e2c', fontWeight:600}}>view archive</span>
        </div>
      </div>
      <MBottomTabs active="more"/>
    </div>
  );
}

// ─── 3 · CLIENTS LIST ─────────────────────────────────────────
function ClientsList() {
  const clients = [
    { i:'HH', n:'Hillcrest Homes Co', tone:'1', sub:'Builder · 4 projects', last:'2 days ago', ltv:'$684k', active:3, status:'active' },
    { i:'CB', n:'Calvera Builders', tone:'2', sub:'GC · 6 projects', last:'today', ltv:'$1.2m', active:2, status:'active' },
    { i:'GW', n:'Greenwillow Senior Living', tone:'3', sub:'Owner · 1 project', last:'1 week ago', ltv:'$184k', active:1, status:'active' },
    { i:'FH', n:'Foothills Medical', tone:'4', sub:'Architect · awaiting bid', last:'9 days ago', ltv:'$0', active:0, status:'lead' },
    { i:'RB', n:'Riverbend Retail', tone:'5', sub:'Owner · awaiting bid', last:'12 days ago', ltv:'$0', active:0, status:'lead' },
    { i:'AS', n:'Aspen Heights LLC', tone:'1', sub:'Builder · 2 archived', last:'3 mo ago', ltv:'$420k', active:0, status:'past' },
  ];
  return (
    <div className="m">
      <div style={{padding:'14px 20px 6px', display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
        <div>
          <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em'}}>Clients</div>
          <div style={{fontSize:12, color:'#8a8278', marginTop:2}}>14 total · $2.5m lifetime · 3 leads warm</div>
        </div>
        <button style={{width:36, height:36, background:'#1c1816', color:'#fff', borderRadius:18, border:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.plus}</button>
      </div>
      <div style={{padding:'8px 16px 12px'}}>
        <div style={{height:42, padding:'0 12px', background:'#f7f4ef', borderRadius:12, display:'flex', alignItems:'center', gap:8}}>
          <span style={{color:'#8a8278'}}>{MI.search}</span>
          <span style={{flex:1, fontSize:14, color:'#aea69a'}}>Name, project, or address</span>
        </div>
      </div>
      <div style={{display:'flex', gap:8, padding:'0 16px 12px', overflow:'auto', borderBottom:'1px solid #e8e3db'}}>
        {[{l:'All', n:14, on:true},{l:'Active', n:3},{l:'Leads', n:5},{l:'Past', n:6}].map(t => (
          <button key={t.l} className="m-chip" data-active={t.on}>{t.l}<span style={{opacity:.7, fontSize:11, marginLeft:5, fontFeatureSettings:'"tnum"'}}>{t.n}</span></button>
        ))}
      </div>
      <div className="m-body">
        {clients.map(c => (
          <button key={c.n} style={{
            padding:'14px 16px', background:'#fff',
            border:'none', borderBottom:'1px solid #f0ebe2',
            textAlign:'left', fontFamily:'inherit', cursor:'pointer',
            display:'flex', alignItems:'center', gap:12, width:'100%',
          }}>
            <div className="m-avatar" data-tone={c.tone} data-size="lg">{c.i}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <span style={{fontSize:14, fontWeight:600, letterSpacing:'-0.005em'}}>{c.n}</span>
                {c.status === 'lead' && <span className="m-pill" data-tone="blue" data-dot="true">lead</span>}
                {c.status === 'past' && <span className="m-pill">archived</span>}
              </div>
              <div style={{fontSize:11.5, color:'#8a8278', marginTop:2}}>{c.sub}</div>
              <div style={{display:'flex', alignItems:'center', gap:8, marginTop:6, fontSize:11, color:'#5b544c', fontFeatureSettings:'"tnum"'}}>
                <span><strong style={{color:'#1c1816', fontWeight:600}}>{c.ltv}</strong> lifetime</span>
                {c.active > 0 && <><span style={{color:'#aea69a'}}>·</span><span>{c.active} active</span></>}
                <span style={{color:'#aea69a'}}>·</span><span>{c.last}</span>
              </div>
            </div>
            <span style={{color:'#aea69a'}}>{MI.chev}</span>
          </button>
        ))}
      </div>
      <MBottomTabs active="more"/>
    </div>
  );
}

function ClientDetail() {
  return (
    <div className="m">
      <MTopBar back title="Hillcrest Homes Co" sub="Builder · since Jan 2024" action="more" actionIcon={MI.more}/>

      <div className="m-body">
        {/* Header card */}
        <div style={{padding:'14px 16px 6px'}}>
          <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:14, display:'flex', alignItems:'center', gap:12}}>
            <div className="m-avatar" data-tone="1" data-size="lg">HH</div>
            <div style={{flex:1}}>
              <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase'}}>Primary contact</div>
              <div style={{fontSize:14, fontWeight:600, marginTop:2}}>John Marchetti</div>
              <div style={{fontSize:11, color:'#8a8278'}}>john@hillcresthomes.co · (403) 555-1840</div>
            </div>
            <button style={{width:36, height:36, background:'rgba(217,144,74,.10)', color:'#b46e2c', border:'none', borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.send}</button>
          </div>
        </div>

        {/* KPIs */}
        <div className="m-kpi-row m-kpi-row-3" style={{marginTop:12}}>
          <MKpi label="Lifetime" value="$684k" meta="4 projects" metaTone=""/>
          <MKpi label="Active" value="3" meta="all on track" metaTone="green"/>
          <MKpi label="Avg margin" value="36" unit="%" meta="vs 32% target" metaTone="green"/>
        </div>

        {/* Tabs */}
        <div style={{display:'flex', borderBottom:'1px solid #e8e3db', padding:'10px 8px 0', marginTop:6}}>
          {[{l:'Projects', n:4, on:true},{l:'Contacts', n:3},{l:'Invoices', n:7},{l:'Notes', n:2}].map(t => (
            <button key={t.l} style={{padding:'10px 14px', background:'transparent', border:'none', fontFamily:'inherit', fontSize:13, fontWeight: t.on ? 600 : 400, color: t.on ? '#1c1816' : '#8a8278', borderBottom: t.on ? '2px solid #d9904a' : '2px solid transparent'}}>
              {t.l}<span style={{opacity:.6, marginLeft:5}}>{t.n}</span>
            </button>
          ))}
        </div>

        {/* Projects under this client */}
        <div className="m-section-h">Active projects</div>
        <div style={{padding:'0 16px', display:'flex', flexDirection:'column', gap:8}}>
          {[
            { n:'Hillcrest Mews — Phase 4', a:'4820 Crestline Dr', state:'In progress', tone:'#E8A86B', pct:62 },
            { n:'Hillcrest Mews — Phase 3', a:'4810 Crestline Dr', state:'Closeout', tone:'#7A8C6F', pct:96 },
            { n:'Crestline North Annex', a:'4900 Crestline Dr', state:'Drafting', tone:'#5B8AA8', pct:8 },
          ].map(p => (
            <div key={p.n} style={{padding:'12px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, display:'flex', gap:12, alignItems:'center'}}>
              <span style={{width:3, alignSelf:'stretch', background:p.tone, borderRadius:2, flexShrink:0}}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:600}}>{p.n}</div>
                <div style={{fontSize:11, color:'#8a8278', marginTop:1}}>{p.a} · {p.state}</div>
                <div style={{height:3, background:'#f0ebe2', borderRadius:2, marginTop:6, overflow:'hidden'}}>
                  <div style={{width:`${p.pct}%`, height:'100%', background:p.tone}}/>
                </div>
              </div>
              <span style={{color:'#aea69a'}}>{MI.chev}</span>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="m-section-h">Recent</div>
        <div className="m-list-inset">
          <MRow leading={MI.doc} headline="Read EST-2026-184" supporting="2 days ago"/>
          <MRow leading={MI.send} leadingTone="green" headline="Invoice #INV-184 sent" supporting="5 days ago · $42,300"/>
          <MRow leading={MI.cam} headline="Daily log shared" supporting="1 week ago · 8 photos"/>
        </div>

        <div className="m-btn-stack" style={{margin:'14px 0 24px'}}>
          <button className="m-btn" data-variant="primary">New estimate for Hillcrest</button>
          <button className="m-btn" data-variant="ghost">Log a call / note</button>
        </div>
      </div>
    </div>
  );
}

// ─── 4 · PROJECT FILES TAB ─────────────────────────────────────
function ProjectFiles() {
  const files = [
    { kind:'photo', tone:'#E8A86B', name:'East elev · day 18', date:'today', tag:'EPS' },
    { kind:'photo', tone:'#C77B4F', name:'Mesh detail · top', date:'today', tag:'EPS' },
    { kind:'photo', tone:'#7A8C6F', name:'Stone veneer · south', date:'yesterday', tag:'STONE' },
    { kind:'photo', tone:'#9C7A5B', name:'Foundation flag', date:'yesterday', tag:'ISSUE' },
    { kind:'drawing', tone:'#5B8AA8', name:'floor-plan-east.pdf', date:'Apr 10', tag:'PDF' },
    { kind:'drawing', tone:'#5B8AA8', name:'elevations-final.pdf', date:'Apr 10', tag:'PDF' },
    { kind:'contract', tone:'#1c1816', name:'Hillcrest contract · signed', date:'Apr 22', tag:'EXEC' },
    { kind:'contract', tone:'#1c1816', name:'Change order #2', date:'May 1', tag:'CO' },
  ];
  return (
    <div className="m">
      <MTopBar back title="Hillcrest Mews" sub="Phase 4 · Files" action="add" actionIcon={MI.plus}/>

      {/* sub-nav showing Files active */}
      <div style={{display:'flex', borderBottom:'1px solid #e8e3db', padding:'0 8px', overflow:'auto', flexShrink:0}}>
        {['Overview', 'Measurements', 'Schedule', 'Time', 'Logs', 'Files', 'Rentals'].map(t => {
          const on = t === 'Files';
          return <button key={t} style={{padding:'12px 12px', background:'transparent', border:'none', fontFamily:'inherit', fontSize:13, fontWeight: on ? 600 : 400, color: on ? '#1c1816' : '#8a8278', borderBottom: on ? '2px solid #d9904a' : '2px solid transparent', whiteSpace:'nowrap'}}>{t}</button>;
        })}
      </div>

      {/* type chips */}
      <div style={{display:'flex', gap:6, padding:'10px 16px 12px', overflowX:'auto'}}>
        {[{l:'All', n:48, on:true},{l:'Photos', n:42},{l:'Drawings', n:4},{l:'Contracts', n:2}].map(c => (
          <button key={c.l} className="m-chip" data-active={c.on}>{c.l}<span style={{opacity:.7, fontSize:11, marginLeft:5, fontFeatureSettings:'"tnum"'}}>{c.n}</span></button>
        ))}
      </div>

      <div className="m-body">
        {/* AI auto-tag stripe */}
        <div style={{margin:'0 16px 12px', padding:'10px 12px', background:'rgba(217,144,74,.06)', borderRadius:10, fontSize:11.5, color:'#5b544c', display:'flex', gap:8, alignItems:'center'}}>
          <span style={{color:'#d9904a'}}>{MI.spark}</span>
          <span style={{flex:1}}>40 photos auto-tagged by elevation + scope.</span>
          <span style={{color:'#b46e2c', fontWeight:600, fontSize:11}}>Review</span>
        </div>

        {/* Photo grid */}
        <div className="m-section-h">Photos · today (8)</div>
        <div style={{padding:'0 16px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6}}>
          {files.filter(f => f.kind === 'photo').map((f, i) => (
            <div key={i} style={{aspectRatio:'1', background:`linear-gradient(135deg, ${f.tone} 0%, ${f.tone}aa 100%)`, borderRadius:8, position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:4, left:4, padding:'2px 6px', background:'rgba(0,0,0,.5)', borderRadius:5, color:'#fff', fontSize:9, fontWeight:600}}>{f.tag}</div>
              <div style={{position:'absolute', bottom:4, right:6, fontSize:9, color:'rgba(255,255,255,.85)', textShadow:'0 1px 2px rgba(0,0,0,.4)'}}>{f.date}</div>
            </div>
          ))}
        </div>

        {/* Drawings + contracts list */}
        <div className="m-section-h">Drawings + contracts</div>
        <div className="m-list-inset">
          {files.filter(f => f.kind !== 'photo').map(f => (
            <div key={f.name} className="m-list-row">
              <div className="m-l-leading" style={{background: f.kind === 'contract' ? 'rgba(28,24,22,.08)' : 'rgba(91,138,168,.10)', color: f.kind === 'contract' ? '#1c1816' : '#5B8AA8'}}>
                {f.kind === 'contract' ? MI.lock : MI.doc}
              </div>
              <div className="m-l-body">
                <div className="m-l-headline">{f.name}</div>
                <div className="m-l-supporting">{f.tag} · {f.date}</div>
              </div>
              <span className="m-l-trailing"><span className="m-chev">{MI.chev}</span></span>
            </div>
          ))}
        </div>
        <div style={{height:24}}/>
      </div>
      <MBottomTabs active="proj"/>
    </div>
  );
}

// ─── 5 · INVOICE DRAFT ─────────────────────────────────────────
function ProjectInvoiceDraft() {
  return (
    <div className="m">
      <MTopBar back title="New invoice" sub="Hillcrest Mews · Phase 4"/>
      <div className="m-body">
        {/* Hero — final number */}
        <div style={{padding:'18px 20px 16px', borderBottom:'1px solid #e8e3db'}}>
          <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>Final · billable</div>
          <div style={{fontSize:40, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1, marginTop:4, fontFeatureSettings:'"tnum"'}}>$184,250</div>
          <div style={{fontSize:13, color:'#5b544c', marginTop:6}}>Contract $180,000 · change orders +$4,250 · final variance −2.4%</div>
        </div>

        {/* Already billed */}
        <div className="m-section-h">Already billed (3 progress payments)</div>
        <div className="m-list-inset">
          <MRow leading={MI.check} leadingTone="green" headline="Deposit · 25%" trailing={<span style={{fontFeatureSettings:'"tnum"'}}>$45,000</span>} supporting="Apr 22 · paid 4 days" chev={false}/>
          <MRow leading={MI.check} leadingTone="green" headline="Midpoint · 35%" trailing={<span style={{fontFeatureSettings:'"tnum"'}}>$63,000</span>} supporting="May 10 · paid 3 days" chev={false}/>
          <MRow leading={MI.check} leadingTone="green" headline="At substantial completion · 30%" trailing={<span style={{fontFeatureSettings:'"tnum"'}}>$54,000</span>} supporting="May 24 · paid 2 days" chev={false}/>
        </div>

        {/* Final balance */}
        <div className="m-section-h">Final balance due</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'14px 16px', background:'#fff', border:'1.5px solid #d9904a', borderRadius:12}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8}}>
              <span style={{fontSize:13, fontWeight:600}}>Balance · 10% + change orders</span>
              <span style={{fontSize:22, fontWeight:700, fontFeatureSettings:'"tnum"', letterSpacing:'-0.01em'}}>$22,250</span>
            </div>
            <div style={{height:1, background:'#e8e3db', margin:'8px 0'}}/>
            {[
              { l:'Retainage release', v:'$18,000' },
              { l:'Change order #1', v:'$2,800' },
              { l:'Change order #2', v:'$1,450' },
            ].map(r => (
              <div key={r.l} style={{display:'flex', justifyContent:'space-between', padding:'4px 0', fontSize:12, color:'#5b544c'}}>
                <span>{r.l}</span><span style={{fontFeatureSettings:'"tnum"', color:'#1c1816'}}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terms + payment */}
        <div className="m-section-h">Terms</div>
        <div className="m-list-inset">
          <MRow leading={MI.cal} headline="Due" trailing="Net 30 · Jun 25"/>
          <MRow leading={MI.bolt} leadingTone="accent" headline="Stripe payment link" supporting="Card, ACH, or wire" trailing={<span className="m-pill" data-tone="accent">on</span>}/>
          <MRow leading={MI.edit} headline="Cover note" supporting="Final billing for Hillcrest Mews Phase 4…"/>
        </div>

        {/* Send to */}
        <div className="m-section-h">Send to</div>
        <div className="m-list-inset">
          <MRow leading="JM" leadingTone="blue" headline="John Marchetti" supporting="john@hillcresthomes.co"/>
          <MRow leading={MI.plus} headline="Add recipient" chev={false}/>
        </div>

        <div className="m-btn-stack" style={{margin:'14px 0'}}>
          <button className="m-btn" data-variant="primary">Send invoice · $22,250</button>
          <button className="m-btn" data-variant="ghost">Save as draft</button>
          <button className="m-btn" data-variant="quiet">Preview PDF</button>
        </div>
      </div>
    </div>
  );
}

function ProjectInvoiceSent() {
  return (
    <div className="m">
      <MTopBar back title="INV-2026-184" sub="Sent · today"/>
      <div className="m-body">
        {/* Status timeline */}
        <div style={{padding:'18px 20px 12px'}}>
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:14}}>
            <span style={{width:10, height:10, background:'#d9904a', borderRadius:5, boxShadow:'0 0 0 4px rgba(217,144,74,.18)'}}/>
            <span style={{fontSize:14, fontWeight:600, color:'#b46e2c'}}>Awaiting payment</span>
            <span style={{fontSize:11, color:'#8a8278', marginLeft:'auto', fontFeatureSettings:'"tnum"'}}>Due Jun 25</span>
          </div>
          <div style={{borderLeft:'2px dashed #e8e3db', marginLeft:5, paddingLeft:18, paddingBottom:14}}>
            {[
              { t:'Sent to john@hillcresthomes.co', d:'Today · 9:14 AM', c:'#2c8a55' },
              { t:'Stripe link generated', d:'Today · 9:14 AM', c:'#5b544c' },
              { t:'Generated from project completion', d:'Today · 9:13 AM', c:'#aea69a' },
            ].map((e, i) => (
              <div key={i} style={{marginBottom:12, position:'relative'}}>
                <span style={{position:'absolute', left:-25, top:4, width:8, height:8, borderRadius:4, background:'#fff', border:`2px solid ${e.c}`}}/>
                <div style={{fontSize:13, fontWeight:500}}>{e.t}</div>
                <div style={{fontSize:11, color:'#8a8278'}}>{e.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{padding:'4px 20px 14px', textAlign:'center', borderBottom:'1px solid #e8e3db'}}>
          <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>Outstanding</div>
          <div style={{fontSize:38, fontWeight:700, fontFeatureSettings:'"tnum"', letterSpacing:'-0.025em', lineHeight:1, marginTop:4}}>$22,250</div>
          <div style={{fontSize:12, color:'#8a8278', marginTop:6}}>of $184,250 total contract</div>
        </div>

        {/* Actions */}
        <div className="m-section-h">Actions</div>
        <div className="m-list-inset">
          <MRow leading={MI.send} headline="Send a reminder" supporting="John was emailed 4h ago"/>
          <MRow leading={MI.bolt} leadingTone="accent" headline="Copy payment link"/>
          <MRow leading={MI.$} leadingTone="green" headline="Mark paid manually" supporting="Cash, check, or wire received"/>
          <MRow leading={MI.doc} headline="Open PDF"/>
        </div>

        <div style={{margin:'14px 16px', padding:'12px 14px', background:'rgba(47,111,181,.06)', border:'1px dashed rgba(47,111,181,.25)', borderRadius:12, fontSize:12, color:'#5b544c', lineHeight:1.45, display:'flex', gap:8}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6fb5" strokeWidth="1.6" style={{flexShrink:0, marginTop:1}}><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
          <span>We'll auto-nudge in <strong style={{color:'#1c1816'}}>3 days</strong> if unpaid. Then again in 7. <span style={{color:'#b46e2c', fontWeight:600}}>Change schedule</span></span>
        </div>
      </div>
    </div>
  );
}

function ProjectPaid() {
  return (
    <div className="m">
      <MTopBar back title="Hillcrest Mews" sub="Closed · paid" action="more" actionIcon={MI.more}/>
      <div className="m-body">
        {/* Celebration top */}
        <div style={{padding:'18px 20px 14px', position:'relative', background:'linear-gradient(180deg, rgba(44,138,85,.10) 0%, rgba(44,138,85,0) 100%)'}}>
          {[
            {l:'18%', t:'18px', s:6, c:'#2c8a55'},
            {l:'72%', t:'12px', s:5, c:'#d9904a'},
            {l:'85%', t:'40px', s:7, c:'#7A8C6F'},
            {l:'8%',  t:'46px', s:4, c:'#5B8AA8'},
          ].map((d, i) => (
            <div key={i} style={{position:'absolute', left:d.l, top:d.t, width:d.s, height:d.s, background:d.c, borderRadius:d.s/2, opacity:.85}}/>
          ))}
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
            <div style={{width:36, height:36, background:'#2c8a55', borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12l5 5L20 7"/></svg>
            </div>
            <div>
              <div style={{fontSize:10, fontWeight:700, color:'#2c8a55', letterSpacing:'.10em', textTransform:'uppercase'}}>Paid in full</div>
              <div style={{fontSize:11, color:'#8a8278'}}>Jun 19 · 6 days early</div>
            </div>
          </div>
          <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.1}}>
            $184,250 collected.<br/>Margin: <span style={{color:'#2c8a55'}}>36.4%</span>
          </div>
        </div>

        {/* Variance table */}
        <div className="m-section-h">Closeout summary</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'14px 16px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12}}>
            {[
              {l:'Contract value', v:'$184,250', strong:true},
              {l:'Actual cost', v:'$117,180'},
              {l:'Loaded labor', v:'$54,260'},
              {l:'Materials', v:'$48,420'},
              {l:'Equipment + overhead', v:'$14,500'},
            ].map(r => (
              <div key={r.l} style={{display:'flex', justifyContent:'space-between', padding:'7px 0', fontSize:13, color:'#5b544c', borderBottom:'1px dashed #e8e3db'}}>
                <span>{r.l}</span>
                <span style={{fontFeatureSettings:'"tnum"', color:'#1c1816', fontWeight: r.strong ? 600 : 500}}>{r.v}</span>
              </div>
            ))}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', paddingTop:10, marginTop:6, borderTop:'2px solid #1c1816'}}>
              <span style={{fontSize:14, fontWeight:600, color:'#2c8a55'}}>Gross profit</span>
              <span style={{fontSize:22, fontWeight:700, fontFeatureSettings:'"tnum"', color:'#2c8a55'}}>$67,070</span>
            </div>
          </div>
        </div>

        {/* What's next */}
        <div className="m-section-h">Wrap up</div>
        <div className="m-list-inset">
          <MRow leading={MI.layers} leadingTone="accent" headline="Send post-job report to client" supporting="Includes photos, daily logs, final variance"/>
          <MRow leading={MI.users} leadingTone="green" headline="Crew bonus payouts" supporting="3 crew earned performance bonus"/>
          <MRow leading={MI.spark} headline="Add Hillcrest to portfolio" supporting="Marketing reference · ask client"/>
        </div>

        <div className="m-btn-stack" style={{margin:'14px 0 24px'}}>
          <button className="m-btn" data-variant="primary">Send post-job report</button>
          <button className="m-btn" data-variant="ghost">Archive project</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  SignInHome, SignInMagicSent,
  NotificationsInbox,
  ClientsList, ClientDetail,
  ProjectFiles,
  ProjectInvoiceDraft, ProjectInvoiceSent, ProjectPaid,
});
