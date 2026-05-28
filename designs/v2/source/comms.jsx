/* global React */

// ============================================================
// CROSS-ROLE SURFACES · V2 (Section 21)
// Project chat (list + thread) · Notifications (owner / foreman /
// worker inboxes) · Activity log (everyone sees same record) ·
// Owner broadcast · Client profile detail.
// ============================================================

function V2Sb({ time = '10:14', dark }) {
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
// 1 · PROJECT CHAT LIST
// =====================================================================
function V2ChatList() {
  const threads = [
    { p:'HILLCREST PH 4',    last:'ANA: PUSHED BRIEF · EPS EAST', when:'12M',  unread:0, badge:null },
    { p:'ASPEN RIDGE',       last:'DIEGO: OUT OF EPS · NEED 12 SHEETS', when:'9M', unread:2, badge:'BLOCKER' },
    { p:'GREENWILLOW',       last:'MIKE: APPROVED OT FOR SAT',    when:'2H',   unread:1 },
    { p:'FOOTHILLS MED',     last:'SARAH: SENT TAKEOFF',           when:'YEST', unread:0 },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">PROJECT CHATS</div>
          <div className="v2-appbar-title">4 ACTIVE</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {threads.map((t, i) => (
          <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:14, padding:'18px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{t.p}</div>
                {t.badge && <span style={{padding:'2px 6px', background:'var(--v2-bad)', color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:8, fontWeight:700, letterSpacing:'0.06em'}}>{t.badge}</span>}
              </div>
              <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-2)', marginTop:5, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{t.last}</div>
            </div>
            <div style={{textAlign:'right', flexShrink:0}}>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:700}}>{t.when}</div>
              {t.unread > 0 && <div style={{marginTop:6, padding:'2px 6px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:800, display:'inline-block', border:'1.5px solid var(--v2-ink)'}}>{t.unread}</div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 2 · PROJECT CHAT THREAD
// =====================================================================
function V2ChatThread() {
  const msgs = [
    { from:'DIEGO ALDANA', role:'CREW',   t:'9:08', text:"Out of EPS 1.5\" — need 12 more sheets to finish south wall.", attached:{ kind:'BLOCKER', l:'AUTO-LINKED FROM FIELD INTAKE' } },
    { from:'ANA CASTILLO', role:'FOREMAN', t:'9:12', text:'On it. Mike, asking you to authorize $510 with the supplier — 6 over my limit.' },
    { from:'MIKE DAVIS',   role:'OWNER',   t:'9:14', text:'Approved.', highlight:'APPROVED $510' },
    { from:'ANA CASTILLO', role:'FOREMAN', t:'9:16', text:'Order placed. Delivery 11:30. Diego — back to mesh prep till then.' },
  ];
  const roleColor = { OWNER:'var(--v2-good)', FOREMAN:'var(--v2-accent)', CREW:'var(--v2-ink)' };
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">ASPEN RIDGE</div>
          <div className="v2-appbar-title">CHAT · 6 PEOPLE</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto', padding:'14px 16px 8px'}}>
        {msgs.map((m, i) => (
          <div key={i} style={{marginBottom:14}}>
            {m.attached && (
              <div style={{padding:'8px 10px', background:'var(--v2-bad)', color:'#fff', display:'flex', alignItems:'center', gap:8, marginBottom:6, border:'1.5px solid var(--v2-ink)'}}>
                <div style={{width:8, height:8, background:'#fff'}}/>
                <div className="v2-mono" style={{fontSize:10, fontWeight:700, letterSpacing:'0.06em'}}>{m.attached.kind} · {m.attached.l}</div>
              </div>
            )}
            <div style={{display:'flex', alignItems:'baseline', gap:8}}>
              <div className="v2-mono" style={{fontSize:11, fontWeight:800, color:'var(--v2-ink)'}}>{m.from}</div>
              <span style={{padding:'2px 6px', background:roleColor[m.role], color: m.role === 'CREW' ? 'var(--v2-accent)' : '#fff', fontFamily:'var(--v2-font-mono)', fontSize:8, fontWeight:700, letterSpacing:'0.08em'}}>{m.role}</span>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:600, marginLeft:'auto'}}>{m.t}</div>
            </div>
            {m.highlight && (
              <div style={{marginTop:6, padding:'10px 12px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14, letterSpacing:'-0.005em'}}>✓ {m.highlight}</div>
            )}
            {!m.highlight && (
              <div style={{marginTop:6, padding:'12px 14px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontSize:14, lineHeight:1.45}}>{m.text}</div>
            )}
          </div>
        ))}
      </div>

      <div style={{padding:'12px 16px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8, alignItems:'center', background:'var(--v2-sand)'}}>
        <button className="v2-iconbtn">+</button>
        <div style={{flex:1, padding:'14px 14px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontSize:14, color:'var(--v2-ink-3)'}}>Type a message…</div>
        <button className="v2-iconbtn accent">→</button>
      </div>
    </div>
  );
}

// =====================================================================
// 3 · OWNER NOTIFICATIONS INBOX
// =====================================================================
function V2NotifOwner() {
  const groups = [
    { l:'NOW', items:[
      { l:'ANA · NEEDS $510 AUTH',       sub:'ASPEN · EPS MATERIALS',       when:'12M', kind:'AUTH',   live:true },
      { l:'ASPEN · MARGIN -18%',         sub:'GUARDRAIL CROSSED',           when:'2H',  kind:'RISK' },
    ]},
    { l:'TODAY', items:[
      { l:'HILLCREST · DAILY LOG',       sub:'ANA SUBMITTED · 12 PHOTOS',   when:'YEST', kind:'LOG' },
      { l:'GREENWILLOW · INVOICE PAID',  sub:'$28K DEPOSIT CLEARED',        when:'YEST', kind:'PAID' },
    ]},
  ];
  const kindBg = { AUTH:'var(--v2-accent)', RISK:'var(--v2-bad)', LOG:'transparent', PAID:'var(--v2-good)' };
  const kindFg = { AUTH:'var(--v2-accent-ink)', RISK:'#fff', LOG:'var(--v2-ink)', PAID:'#fff' };
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">OWNER · INBOX</div>
          <div className="v2-appbar-title">4 NEW</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {groups.map((g, gi) => (
          <React.Fragment key={gi}>
            <div className="v2-section-bar"><div className="v2-eyebrow">{g.l}</div></div>
            {g.items.map((n, i) => (
              <div key={i} style={{padding:'16px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', gap:12, alignItems:'center'}}>
                <div style={{width:40, padding:'6px 0', background:kindBg[n.kind], color:kindFg[n.kind], border:'2px solid var(--v2-ink)', textAlign:'center', flexShrink:0}}>
                  <div className="v2-mono" style={{fontSize:9, fontWeight:800, letterSpacing:'0.04em'}}>{n.kind}</div>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                    <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{n.l}</div>
                    {n.live && <span style={{width:8, height:8, background:'var(--v2-bad)', display:'inline-block'}}/>}
                  </div>
                  <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{n.sub}</div>
                </div>
                <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:700}}>{n.when}</div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 4 · FOREMAN NOTIFICATIONS INBOX
// =====================================================================
function V2NotifForeman() {
  const items = [
    { l:'DIEGO · EPS BLOCKER',         sub:'ASPEN · TAP TO RESOLVE',    when:'9M',  kind:'BLOCKER' },
    { l:'CARLOS · NO-SHOW',            sub:'GREENWILLOW · 0H TODAY',    when:'1H',  kind:'CREW' },
    { l:'TOMORROW · MAY 5',            sub:'4 CREW · HILLCREST EPS',    when:'5PM', kind:'SCHEDULE' },
    { l:'MIKE APPROVED · $510',         sub:'EPS ORDER · DELIVERY 11:30', when:'YEST', kind:'AUTH' },
  ];
  const kindColor = { BLOCKER:'var(--v2-bad)', CREW:'var(--v2-bad)', SCHEDULE:'var(--v2-accent)', AUTH:'var(--v2-good)' };
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">FOREMAN · INBOX</div>
          <div className="v2-appbar-title">FROM THE FIELD</div>
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {items.map((n, i) => (
          <div key={i} style={{padding:'16px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', gap:14, alignItems:'center'}}>
            <div style={{width:6, alignSelf:'stretch', background:kindColor[n.kind]}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{n.l}</div>
                <span style={{padding:'2px 6px', background:'var(--v2-ink)', color: kindColor[n.kind] === 'var(--v2-good)' ? '#fff' : 'var(--v2-accent)', fontFamily:'var(--v2-font-mono)', fontSize:8, fontWeight:700, letterSpacing:'0.06em'}}>{n.kind}</span>
              </div>
              <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-2)', marginTop:4, fontWeight:600}}>{n.sub}</div>
            </div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:700}}>{n.when}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 5 · WORKER NOTIFICATIONS INBOX (dark)
// =====================================================================
function V2NotifWorker() {
  const items = [
    { l:'TOMORROW · 7 AM',        sub:'HILLCREST · EPS EAST',        when:'5PM', kind:'NEXT' },
    { l:'BRIEF UPDATED',          sub:'ANA · CORNICE LATER',         when:'2H',  kind:'BRIEF' },
    { l:'YOUR HOURS · APPROVED',  sub:'MAY 4 · 8.5H · $238 GROSS',   when:'YEST', kind:'PAY' },
    { l:'NEW PHOTO · KEEP IT UP', sub:'AUTO-TAGGED EPS EAST',        when:'YEST', kind:'LOG' },
  ];
  const kindBg = { NEXT:'var(--v2-accent)', BRIEF:'var(--v2-accent)', PAY:'var(--v2-good)', LOG:'transparent' };
  const kindFg = { NEXT:'var(--v2-accent-ink)', BRIEF:'var(--v2-accent-ink)', PAY:'#fff', LOG:'var(--v2-sand)' };
  return (
    <div className="v2 v2-screen dark">
      <V2Sb dark/>
      <div className="v2-appbar" style={{background:'var(--v2-ink)', borderColor:'var(--v2-sand-2)'}}>
        <button className="v2-iconbtn" style={{background:'var(--v2-ink)', color:'var(--v2-sand)', borderColor:'var(--v2-sand)'}}>←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>CREW · INBOX</div>
          <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>4 NEW</div>
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {items.map((n, i) => (
          <div key={i} style={{padding:'18px 20px', borderBottom:'1px solid var(--v2-ink-2)', display:'flex', gap:14, alignItems:'center'}}>
            <div style={{padding:'4px 8px', background:kindBg[n.kind], color:kindFg[n.kind], border:'1.5px solid var(--v2-sand-2)', minWidth:50, textAlign:'center'}}>
              <div className="v2-mono" style={{fontSize:9, fontWeight:800, letterSpacing:'0.06em'}}>{n.kind}</div>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15, color:'var(--v2-sand)'}}>{n.l}</div>
              <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink-4)', marginTop:4, fontWeight:600}}>{n.sub}</div>
            </div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-4)', fontWeight:700}}>{n.when}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 6 · ACTIVITY LOG (every role sees same record)
// =====================================================================
function V2ActivityLog() {
  const log = [
    { d:'9:14', who:'MIKE',     role:'OWNER',   action:'APPROVED $510 · EPS', tone:'good' },
    { d:'9:12', who:'ANA',      role:'FOREMAN', action:'REQUESTED AUTH · $510', tone:null },
    { d:'9:08', who:'DIEGO',    role:'CREW',    action:'FLAGGED · OUT OF EPS', tone:'bad' },
    { d:'8:32', who:'ANA',      role:'FOREMAN', action:'PUSHED BRIEF · EPS EAST', tone:'accent' },
    { d:'7:18', who:'DIEGO',    role:'CREW',    action:'CLOCKED IN · ASPEN', tone:null },
    { d:'7:14', who:'TOMÁS',    role:'CREW',    action:'CLOCKED IN · ASPEN', tone:null },
    { d:'7:02', who:'ANA',      role:'FOREMAN', action:'CLOCKED IN · ASPEN', tone:null },
  ];
  const roleColor = { OWNER:'var(--v2-good)', FOREMAN:'var(--v2-accent)', CREW:'var(--v2-ink)' };
  const toneColor = { good:'var(--v2-good)', bad:'var(--v2-bad)', accent:'var(--v2-accent)' };
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">ASPEN RIDGE</div>
          <div className="v2-appbar-title">ACTIVITY · TODAY</div>
        </div>
      </div>

      <div style={{display:'flex', gap:6, padding:'12px 20px', borderBottom:'2px solid var(--v2-ink)', overflowX:'auto'}}>
        {[{l:'ALL', on:true},{l:'TIME'},{l:'MONEY'},{l:'FIELD'},{l:'BRIEFS'}].map(c => (
          <button key={c.l} style={{padding:'8px 12px', background: c.on ? 'var(--v2-ink)' : 'transparent', color: c.on ? 'var(--v2-sand)' : 'var(--v2-ink-3)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', whiteSpace:'nowrap'}}>{c.l}</button>
        ))}
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {log.map((e, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', gap:14, alignItems:'center'}}>
            <div className="v2-mono" style={{width:42, fontSize:10, fontWeight:700, color:'var(--v2-ink-3)', fontVariantNumeric:'tabular-nums'}}>{e.d}</div>
            <div style={{width:8, alignSelf:'stretch', background: e.tone ? toneColor[e.tone] : 'var(--v2-line-soft)'}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:6}}>
                <div className="v2-mono" style={{fontSize:11, fontWeight:800}}>{e.who}</div>
                <span style={{padding:'1px 5px', background:roleColor[e.role], color: e.role === 'CREW' ? 'var(--v2-accent)' : '#fff', fontFamily:'var(--v2-font-mono)', fontSize:8, fontWeight:700, letterSpacing:'0.06em'}}>{e.role}</span>
              </div>
              <div className="v2-mono" style={{fontSize:11, color:'var(--v2-ink)', marginTop:4, fontWeight:600}}>{e.action}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 7 · OWNER BROADCAST composer
// =====================================================================
function V2Broadcast() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">✕</button>
        <div className="v2-appbar-title">BROADCAST</div>
      </div>

      <div style={{padding:'24px 20px 8px'}}>
        <h2 className="v2-h2">Send to everyone.</h2>
        <div className="v2-mono" style={{marginTop:10, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5, fontSize:12}}>EMERGENCIES · WEATHER · POLICY UPDATES. THIS IS A ONE-WAY MEGAPHONE — REPLIES OFF.</div>
      </div>

      <div style={{padding:'14px 20px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>TO</div>
        <div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, border:'2px solid var(--v2-ink)'}}>
          {[{l:'ALL · 18', on:true},{l:'FOREMEN · 3'},{l:'CREW · 14'},{l:'BY PROJECT'}].map((t, i) => {
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

      <div style={{padding:'14px 20px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>MESSAGE</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', minHeight:120, fontFamily:'var(--v2-font-tight)', fontSize:18, fontWeight:600, lineHeight:1.4}}>
          Heads up — rain forecast for Wednesday. Wrap exterior coats by lunch Tuesday and shift to interior prep.<span style={{display:'inline-block', width:2, height:18, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:2}}/>
        </div>
        <div className="v2-mono" style={{marginTop:6, fontSize:10, color:'var(--v2-ink-3)', fontWeight:600, textAlign:'right'}}>167 / 280</div>
      </div>

      <div style={{padding:'14px 20px'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>DELIVERY</div>
        <div style={{marginTop:8, padding:'12px 14px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:10}}>
          <span style={{width:14, height:14, background:'var(--v2-accent)', border:'1.5px solid var(--v2-ink)'}}/>
          <div className="v2-mono" style={{flex:1, fontSize:11, fontWeight:600}}>PUSH · SMS · EMAIL · ALL THREE</div>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">BROADCAST TO 18</button>
      </div>
    </div>
  );
}

// =====================================================================
// 8 · CLIENT PROFILE
// =====================================================================
function V2ClientProfile() {
  const projects = [
    { name:'HILLCREST PH 4', state:'IN PROGRESS', meta:'D18/32 · $114K' },
    { name:'HILLCREST PH 3', state:'COMPLETE',     meta:'$152K · MAR 2026' },
    { name:'HILLCREST PH 2', state:'COMPLETE',     meta:'$148K · 2025' },
    { name:'HILLCREST PH 1', state:'COMPLETE',     meta:'$132K · 2024' },
  ];
  const stateColor = { 'IN PROGRESS':'var(--v2-good)', 'COMPLETE':'var(--v2-ink-3)' };
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">CLIENT</div>
          <div className="v2-appbar-title">JOHN MARCHETTI</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{width:72, height:72, background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:26}}>JM</div>
        <h2 className="v2-h2" style={{marginTop:14}}>John Marchetti</h2>
        <div className="v2-mono" style={{marginTop:6, color:'var(--v2-ink-2)', fontWeight:600}}>HILLCREST HOMES CO · SINCE 2023</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'16px 14px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>PROJECTS</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1}}>4</div>
        </div>
        <div style={{padding:'16px 14px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>LIFETIME $</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1, color:'var(--v2-good)'}}>$546K</div>
        </div>
        <div style={{padding:'16px 14px'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>WIN RATE</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1}}>100<span style={{fontSize:16, color:'var(--v2-ink-3)'}}>%</span></div>
        </div>
      </div>

      <div style={{display:'flex', borderBottom:'2px solid var(--v2-ink)'}}>
        {[{l:'PROJECTS · 4', on:true},{l:'TAKEOFFS · 6'},{l:'CONTACT'}].map((t, i, arr) => (
          <button key={t.l} style={{flex:1, padding:'14px 0', background: t.on ? 'var(--v2-accent)' : 'transparent', color: t.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)', border:'none', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:t.on ? 700 : 600, letterSpacing:'0.06em'}}>{t.l}</button>
        ))}
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {projects.map((p, i) => (
          <button key={i} style={{display:'block', width:'100%', textAlign:'left', padding:'16px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{p.name}</div>
              <span style={{padding:'3px 7px', background:stateColor[p.state], color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>{p.state}</span>
            </div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:6, fontWeight:600}}>{p.meta}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  V2ChatList, V2ChatThread,
  V2NotifOwner, V2NotifForeman, V2NotifWorker,
  V2ActivityLog, V2Broadcast, V2ClientProfile,
});
