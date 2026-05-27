/* global React, MI, MTopBar, MRow, MKpi, MBottomTabs, ForemanTabs */

// ============================================================
// CROSS-ROLE EXTENSIONS — closes the handoff audit.
// SafetyInterrupt, OwnerAuthorizations, ForemanDailyLogReview,
// ForemanNotifications, OwnerBroadcast, ProjectActivityLog,
// SettingsPermissions.
// ============================================================

// ─── 1 · SAFETY INTERRUPT (full-screen, urgent) ─────────────
function SafetyInterrupt() {
  return (
    <div className="m" style={{background:'#7a2018', color:'#fff', overflow:'hidden'}}>
      {/* Pulsing hatch background */}
      <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(135deg, transparent 0 28px, rgba(0,0,0,.12) 28px 30px)', pointerEvents:'none'}}/>

      <div style={{padding:'28px 22px 12px', position:'relative', zIndex:1}}>
        <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', background:'rgba(0,0,0,.30)', borderRadius:999, marginBottom:14}}>
          <span style={{width:8, height:8, borderRadius:4, background:'#fff', animation:'pulse 1s ease-in-out infinite'}}/>
          <span style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase'}}>Stop Work · live</span>
        </div>
        <div style={{fontSize:34, fontWeight:800, letterSpacing:'-0.03em', lineHeight:.95}}>Safety stop<br/>at Aspen Ridge.</div>
        <div style={{fontSize:13.5, color:'rgba(255,255,255,.78)', marginTop:10, lineHeight:1.45}}>
          Diego Aldana raised a STOP WORK 24 seconds ago. All 6 crew on site have been auto-paused. Foreman is on the way.
        </div>
      </div>

      {/* Map glance */}
      <div style={{margin:'14px 16px 0', position:'relative', height:130, borderRadius:14, overflow:'hidden', background:'#5a1812', border:'1px solid rgba(255,255,255,.10)', zIndex:1}}>
        <svg viewBox="0 0 290 130" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <rect width="290" height="130" fill="#5a1812"/>
          <g opacity=".25" stroke="#fff" strokeWidth=".8" fill="none">
            <path d="M0 50 Q72 30 145 55 T290 40"/>
            <path d="M0 100 Q90 88 180 110 T290 100"/>
          </g>
          <g fill="rgba(0,0,0,.30)"><rect x="55" y="55" width="44" height="32" rx="2"/><rect x="200" y="45" width="38" height="36" rx="2"/></g>
          <circle cx="120" cy="70" r="44" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.40)" strokeWidth="1.5" strokeDasharray="3,2"/>
          <g transform="translate(120 70)">
            <circle r="20" fill="rgba(255,255,255,.20)">
              <animate attributeName="r" values="12;26;12" dur="1.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values=".55;.05;.55" dur="1.4s" repeatCount="indefinite"/>
            </circle>
            <circle r="8" fill="#fff" stroke="#7a2018" strokeWidth="2"/>
          </g>
        </svg>
      </div>

      {/* Details */}
      <div style={{padding:'14px 16px 0', position:'relative', zIndex:1}}>
        <div style={{padding:'12px 14px', background:'rgba(0,0,0,.20)', border:'1px solid rgba(255,255,255,.14)', borderRadius:12}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:0}}>
            <div>
              <div style={{fontSize:9, color:'rgba(255,255,255,.6)', fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase'}}>Reporter</div>
              <div style={{fontSize:13, fontWeight:600, marginTop:3}}>Diego A.</div>
            </div>
            <div style={{borderLeft:'1px solid rgba(255,255,255,.14)', borderRight:'1px solid rgba(255,255,255,.14)', paddingLeft:12}}>
              <div style={{fontSize:9, color:'rgba(255,255,255,.6)', fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase'}}>Crew paused</div>
              <div style={{fontSize:13, fontWeight:600, marginTop:3, fontFeatureSettings:'"tnum"'}}>6 on site</div>
            </div>
            <div style={{paddingLeft:12}}>
              <div style={{fontSize:9, color:'rgba(255,255,255,.6)', fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase'}}>Time</div>
              <div style={{fontSize:13, fontWeight:600, marginTop:3, fontFeatureSettings:'"tnum"'}}>0:24</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{flex:1}}/>

      {/* Actions */}
      <div style={{padding:'14px 16px calc(env(safe-area-inset-bottom, 0) + 16px)', position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:10}}>
        <button style={{width:'100%', height:56, background:'#fff', color:'#7a2018', border:'none', borderRadius:14, fontFamily:'inherit', fontSize:16, fontWeight:700, letterSpacing:'-.005em'}}>
          Acknowledge · I see this
        </button>
        <div style={{display:'flex', gap:10}}>
          <button style={{flex:1, height:46, background:'rgba(0,0,0,.30)', color:'#fff', border:'1px solid rgba(255,255,255,.20)', borderRadius:12, fontFamily:'inherit', fontSize:13, fontWeight:600}}>Call site</button>
          <button style={{flex:1, height:46, background:'rgba(0,0,0,.30)', color:'#fff', border:'1px solid rgba(255,255,255,.20)', borderRadius:12, fontFamily:'inherit', fontSize:13, fontWeight:600}}>Open thread</button>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }`}</style>
    </div>
  );
}

// ─── 2 · OWNER AUTHORIZATIONS QUEUE ──────────────────────────
function OwnerAuthorizations() {
  const items = [
    { who:'Ana C.', tone:'1', site:'Aspen Ridge', kind:'Materials · over limit', amt:'$510', detail:'EPS 1.5" · 12 sheets · from supplier', when:'12m', urgent:true },
    { who:'Ana C.', tone:'1', site:'Hillcrest', kind:'Overtime · weekend', amt:'12 hrs', detail:'Sat May 31 · finish basecoat before rain Mon', when:'2h' },
    { who:'Marco P.', tone:'6', site:'Greenwillow', kind:'Equipment rental', amt:'$840', detail:'Scaffold A extension · 7 extra days', when:'5h' },
  ];
  return (
    <div className="m">
      <MTopBar back title="Approvals" sub="3 pending"/>
      <div className="m-body">
        {/* Filter chips */}
        <div style={{display:'flex', gap:6, padding:'10px 16px 12px', overflow:'auto', borderBottom:'1px solid #e8e3db'}}>
          {[{l:'All', n:3, on:true}, {l:'Materials', n:1}, {l:'Time / OT', n:1}, {l:'Equipment', n:1}].map(c => (
            <button key={c.l} className="m-chip" data-active={c.on}>{c.l}<span style={{opacity:.7, marginLeft:5, fontFeatureSettings:'"tnum"'}}>{c.n}</span></button>
          ))}
        </div>

        <div style={{padding:'12px 16px', display:'flex', flexDirection:'column', gap:10}}>
          {items.map((it, i) => (
            <div key={i} style={{background:'#fff', border:'1px solid #e8e3db', borderLeft: it.urgent ? '3px solid #d9904a' : '3px solid #e8e3db', borderRadius:12, overflow:'hidden'}}>
              <div style={{padding:'12px 14px 10px', display:'flex', alignItems:'flex-start', gap:10}}>
                <div className="m-avatar" data-tone={it.tone} data-size="sm" style={{flexShrink:0}}>{it.who.split(' ').map(w => w[0]).join('').slice(0,2)}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#8a8278'}}>
                    <span style={{fontWeight:600, color:'#1c1816'}}>{it.who}</span>
                    <span style={{color:'#aea69a'}}>·</span>
                    <span>{it.site}</span>
                    <span style={{color:'#aea69a'}}>·</span>
                    <span style={{fontFeatureSettings:'"tnum"'}}>{it.when}</span>
                  </div>
                  <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:3}}>
                    <span style={{fontSize:14, fontWeight:600, letterSpacing:'-0.005em'}}>{it.kind}</span>
                    <span style={{fontSize:14, fontWeight:700, fontFeatureSettings:'"tnum"', color:'#b46e2c', marginLeft:'auto'}}>{it.amt}</span>
                  </div>
                  <div style={{fontSize:12, color:'#5b544c', marginTop:4, lineHeight:1.45}}>{it.detail}</div>
                </div>
              </div>
              <div style={{padding:'8px 12px', borderTop:'1px solid #f5f1ec', background:'#fafaf6', display:'flex', gap:6}}>
                <button style={{flex:1, padding:'8px 12px', background:'#2c8a55', color:'#fff', border:'none', borderRadius:8, fontFamily:'inherit', fontSize:12, fontWeight:600}}>Approve</button>
                <button style={{padding:'8px 12px', background:'transparent', border:'1px solid #e8e3db', borderRadius:8, fontFamily:'inherit', fontSize:12, color:'#5b544c'}}>Modify</button>
                <button style={{padding:'8px 12px', background:'transparent', border:'1px solid #e8e3db', borderRadius:8, fontFamily:'inherit', fontSize:12, color:'#5b544c'}}>Reply</button>
                <button style={{padding:'8px 12px', background:'transparent', border:'none', color:'#c0463d', fontFamily:'inherit', fontSize:12, fontWeight:500}}>Deny</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{padding:'14px 16px 24px', textAlign:'center', fontSize:11, color:'#aea69a'}}>
          Auto-escalates to your phone after 30m if unattended.
        </div>
      </div>
    </div>
  );
}

// ─── 3 · OWNER-SIDE DAILY LOG REVIEW ────────────────────────
function ForemanDailyLogReview() {
  return (
    <div className="m">
      <MTopBar back title="Hillcrest Mews" sub="Daily log · Mon Apr 28" action="more" actionIcon={MI.more}/>
      <div className="m-body">
        {/* Foreman attribution */}
        <div style={{padding:'14px 16px 0'}}>
          <div style={{padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, display:'flex', alignItems:'center', gap:11}}>
            <div className="m-avatar" data-tone="1" data-size="lg">AC</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13.5, fontWeight:600}}>Submitted by Ana Castillo</div>
              <div style={{fontSize:11, color:'#8a8278'}}>3:42 PM · awaiting your review</div>
            </div>
            <span className="m-pill" data-tone="amber">pending</span>
          </div>
        </div>

        <div className="m-stat-strip">
          <div><div className="m-stat-strip-l">Photos</div><div className="m-stat-strip-v num">12</div></div>
          <div><div className="m-stat-strip-l">Hours</div><div className="m-stat-strip-v num">32.3</div></div>
          <div><div className="m-stat-strip-l">Issues</div><div className="m-stat-strip-v num" style={{color:'#c98a2e'}}>1</div></div>
        </div>

        <div className="m-section-h">Narrative</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, fontSize:13, color:'#5b544c', lineHeight:1.55}}>
            Started East elevation EPS at 7:00. All 4 crew clocked in by 7:08. Made good progress — about 80% of east wall anchored by lunch. After lunch ran into a soft spot on the foundation flashing — flagged for review. Wrapped at 3:30, materials staged for basecoat tomorrow.
          </div>
        </div>

        {/* Photos preview */}
        <div className="m-section-h">Photos (12)</div>
        <div style={{padding:'0 16px', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:5}}>
          {['#E8A86B','#C77B4F','#A05A33','#7A8C6F','#9C7A5B','#6FA8A0','#c98a2e','#5b544c'].map((c, i) => (
            <div key={i} style={{aspectRatio:'1', background:`linear-gradient(135deg, ${c} 0%, ${c}aa 100%)`, borderRadius:6}}/>
          ))}
        </div>

        {/* Flagged issue */}
        <div className="m-section-h">Flagged issue</div>
        <div style={{margin:'0 16px 14px', padding:'14px', background:'rgba(201,138,46,.08)', border:'1px solid rgba(201,138,46,.25)', borderRadius:12}}>
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
            <span style={{color:'#c98a2e'}}>{MI.alert}</span>
            <strong style={{fontSize:13}}>Soft spot · foundation flashing</strong>
          </div>
          <div style={{fontSize:12, color:'#5b544c', lineHeight:1.5, paddingLeft:24}}>
            2'×3' area on north corner. Ana needs PM call before basecoating.
          </div>
        </div>

        {/* Actions */}
        <div style={{padding:'0 16px 24px', display:'flex', flexDirection:'column', gap:8}}>
          <button className="m-btn" data-variant="primary">Approve · acknowledged</button>
          <div style={{display:'flex', gap:8}}>
            <button className="m-btn" data-variant="ghost" style={{flex:1}}>Reply to Ana</button>
            <button className="m-btn" data-variant="quiet" style={{flex:1}}>Forward to client</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4 · FOREMAN NOTIFICATIONS INBOX ─────────────────────────
function ForemanNotifications() {
  const items = [
    { who:'Sarah (PM)', sub:'Approved your $510 EPS order · supplier ETA Wed', when:'2m', kind:'auth', unread:true },
    { who:'Schedule', sub:'Tomorrow added · Aspen Block B · 4 crew', when:'18m', kind:'sched', unread:true },
    { who:'System', sub:'Daily log auto-drafted · review before submit', when:'1h', kind:'sys', unread:true },
    { who:'Sarah (PM)', sub:"Approved Tomás's hours correction (+1.5h Tue)", when:'4h', kind:'time', unread:false },
    { who:'Workspace', sub:'New holiday added · Sept 1 (Labour Day)', when:'2d', kind:'sys', unread:false },
  ];
  const kindMeta = {
    auth:  { i:MI.$,     fg:'#2c8a55', bg:'rgba(44,138,85,.12)' },
    sched: { i:MI.cal,   fg:'#5b8aa8', bg:'rgba(91,138,168,.10)' },
    sys:   { i:MI.spark, fg:'#b46e2c', bg:'rgba(217,144,74,.10)' },
    time:  { i:MI.time,  fg:'#2c8a55', bg:'rgba(44,138,85,.12)' },
  };
  return (
    <div className="m">
      <div style={{padding:'14px 20px 8px', display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
        <div>
          <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.02em'}}>Notifications</div>
          <div style={{fontSize:12, color:'#8a8278', marginTop:2}}>3 unread · from the office</div>
        </div>
        <button style={{fontSize:12, color:'#b46e2c', fontWeight:600, background:'transparent', border:'none', fontFamily:'inherit'}}>Mark all read</button>
      </div>

      <div style={{padding:'4px 16px 12px', borderBottom:'1px solid #e8e3db', fontSize:11, color:'#5b544c', lineHeight:1.45}}>
        <strong style={{color:'#1c1816'}}>Office notifications · informational.</strong> Field pings + worker blockers live on the <span style={{color:'#b46e2c', fontWeight:600}}>Field tab</span> instead.
      </div>

      <div className="m-body" style={{padding:'10px 16px 16px', display:'flex', flexDirection:'column', gap:6}}>
        {items.map((n, i) => {
          const k = kindMeta[n.kind];
          return (
            <div key={i} style={{padding:'11px 12px', background: n.unread ? '#fff' : '#fafaf6', border:'1px solid #e8e3db', borderRadius:11, display:'flex', gap:11, position:'relative', alignItems:'flex-start'}}>
              {n.unread && <span style={{position:'absolute', left:-4, top:'50%', transform:'translateY(-50%)', width:3, height:24, background:'#d9904a', borderRadius:2}}/>}
              <div style={{width:32, height:32, borderRadius:8, background:k.bg, color:k.fg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{React.cloneElement(k.i, {width:16, height:16})}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8}}>
                  <span style={{fontSize:13, fontWeight: n.unread ? 600 : 500}}>{n.who}</span>
                  <span style={{fontSize:10, color:'#8a8278', fontFeatureSettings:'"tnum"'}}>{n.when}</span>
                </div>
                <div style={{fontSize:12, color:'#5b544c', marginTop:2, lineHeight:1.4}}>{n.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
      {typeof ForemanTabs !== 'undefined' ? <ForemanTabs active="today"/> : null}
    </div>
  );
}

// ─── 5 · OWNER BROADCAST ─────────────────────────────────────
function OwnerBroadcast() {
  return (
    <div className="m">
      <div style={{height:52, padding:'8px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #e8e3db'}}>
        <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:14, color:'#5b544c'}}>Cancel</button>
        <div style={{flex:1, fontSize:17, fontWeight:600, textAlign:'center'}}>Announce</div>
        <button style={{background:'#d9904a', color:'#fff', border:'none', borderRadius:8, padding:'6px 12px', fontFamily:'inherit', fontSize:12, fontWeight:600}}>Send</button>
      </div>
      <div className="m-body">
        {/* Audience */}
        <div className="m-section-h">To</div>
        <div className="m-list-inset">
          {[
            { l:'All field staff', sub:'14 active · foremen + crew', selected:true, i:MI.users },
            { l:'Foremen only',    sub:'3 foremen',                    i:MI.user },
            { l:'One project',     sub:'Pick a site',                  i:MI.proj },
          ].map(o => (
            <div key={o.l} className="m-list-row">
              <div className="m-l-leading" data-tone={o.selected ? 'accent' : null}>{o.i}</div>
              <div className="m-l-body">
                <div className="m-l-headline">{o.l}</div>
                <div className="m-l-supporting">{o.sub}</div>
              </div>
              <span className="m-l-trailing">
                <span style={{width:18, height:18, borderRadius:9, border: o.selected ? 'none' : '1.5px solid #d6cdbe', background: o.selected ? '#d9904a' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'}}>
                  {o.selected && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Type */}
        <div className="m-section-h">Type</div>
        <div style={{padding:'0 16px', display:'flex', gap:8}}>
          {[
            { l:'Heads-up', sub:'Informational', tone:'#5b8aa8', selected:true },
            { l:'Urgent',   sub:'Push + SMS',    tone:'#c0463d' },
            { l:'Holiday',  sub:'Schedule it',   tone:'#d9904a' },
          ].map(t => (
            <button key={t.l} style={{flex:1, padding:'12px', background:'#fff', border: t.selected ? `1.5px solid ${t.tone}` : '1px solid #e8e3db', borderRadius:11, textAlign:'left', fontFamily:'inherit'}}>
              <div style={{width:16, height:4, background:t.tone, borderRadius:2, marginBottom:6}}/>
              <div style={{fontSize:12, fontWeight:600}}>{t.l}</div>
              <div style={{fontSize:10, color:'#8a8278', marginTop:1}}>{t.sub}</div>
            </button>
          ))}
        </div>

        {/* Message */}
        <div className="m-section-h">Message</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'12px 14px', background:'#fff', border:'1.5px solid #d9904a', borderRadius:12, fontSize:13.5, color:'#1c1816', lineHeight:1.5, minHeight:108}}>
            Heads up — rain forecast Wed afternoon. Plan to wrap exterior coats by lunch on Tuesday and shift to interior prep Wed. Sites Hillcrest + Aspen affected.
            <span style={{display:'inline-block', width:1.5, height:14, background:'#d9904a', verticalAlign:'middle', marginLeft:1, animation:'blink 1s infinite'}}/>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:6, fontSize:11, color:'#8a8278'}}>
            <span>184 / 280</span>
            <span style={{color:'#b46e2c', fontWeight:600}}>Replies disabled</span>
          </div>
        </div>

        <div style={{margin:'14px 16px', padding:'10px 12px', background:'rgba(217,144,74,.06)', borderRadius:10, fontSize:11.5, color:'#5b544c', lineHeight:1.5, display:'flex', gap:8}}>
          <span style={{color:'#d9904a'}}>{MI.bell}</span>
          <span>Goes to <strong style={{color:'#1c1816'}}>14 inboxes</strong> + push. Foremen see it on their Notifications tab. Workers see it pinned at the top of Today.</span>
        </div>
      </div>
    </div>
  );
}

// ─── 6 · PROJECT ACTIVITY LOG (cross-role audit log) ────────
function ProjectActivityLog() {
  const groups = [
    { label:'Today · May 26', items:[
      { who:'Diego A.', tone:'3', role:'Worker', act:'flagged blocker', detail:'Out of EPS 1.5" · 12 sheets', t:'12:48 PM', i:MI.alert, fg:'#c98a2e' },
      { who:'Ana C.',   tone:'1', role:'Foreman', act:'authorized order', detail:'Pull 4 from yard + order 8 · $340', t:'12:54 PM', i:MI.$, fg:'#2c8a55' },
      { who:'Sarah D.', tone:'accent', role:'Owner', act:'approved · $510 over limit', detail:'EPS · Aspen', t:'1:02 PM', i:MI.check, fg:'#2c8a55' },
      { who:'Marcus L.', tone:'2', role:'Worker', act:'logged 4 photos', detail:'East wall · auto-tagged EPS', t:'2:18 PM', i:MI.cam, fg:'#5b8aa8' },
      { who:'Tomás R.', tone:'5', role:'Worker', act:'requested time correction', detail:'Tue · stayed late · +1.5h', t:'3:08 PM', i:MI.time, fg:'#c98a2e' },
      { who:'Ana C.',   tone:'1', role:'Foreman', act:'submitted daily log', detail:'12 photos · 1 issue', t:'3:42 PM', i:MI.doc, fg:'#5b544c' },
    ]},
    { label:'Yesterday · May 25', items:[
      { who:'Sarah D.', tone:'accent', role:'Owner', act:'updated schedule', detail:'Added Thu · Aspen Block B', t:'4:14 PM', i:MI.cal, fg:'#5b8aa8' },
      { who:'Marco P.', tone:'6', role:'Foreman', act:'manual clocked in Carlos', detail:'GPS lag · approved', t:'7:18 AM', i:MI.pin, fg:'#c98a2e' },
    ]},
  ];
  const roleColor = { Owner:'#2f6fb5', Foreman:'#b46e2c', Worker:'#5b544c' };
  return (
    <div className="m">
      <MTopBar back title="Activity" sub="Hillcrest Mews · all roles" action="filter" actionIcon={MI.filter}/>
      <div className="m-body">
        {/* Filter pills */}
        <div style={{display:'flex', gap:6, padding:'10px 16px 12px', overflow:'auto', borderBottom:'1px solid #e8e3db'}}>
          {[{l:'All', n:38, on:true}, {l:'Decisions', n:7}, {l:'Photos', n:18}, {l:'Time', n:4}, {l:'Money', n:3}].map(c => (
            <button key={c.l} className="m-chip" data-active={c.on}>{c.l}<span style={{opacity:.7, marginLeft:5, fontFeatureSettings:'"tnum"'}}>{c.n}</span></button>
          ))}
        </div>

        {groups.map(g => (
          <React.Fragment key={g.label}>
            <div className="m-section-h">{g.label}</div>
            <div style={{padding:'0 16px 4px'}}>
              <div style={{borderLeft:'2px dashed #e8e3db', marginLeft:6, paddingLeft:18, paddingBottom:6}}>
                {g.items.map((e, i) => (
                  <div key={i} style={{position:'relative', paddingBottom:14}}>
                    <span style={{position:'absolute', left:-26, top:4, width:14, height:14, borderRadius:7, background:'#fff', border:`2px solid ${e.fg}`, display:'flex', alignItems:'center', justifyContent:'center', color:e.fg}}>{React.cloneElement(e.i, {width:8, height:8})}</span>
                    <div style={{display:'flex', alignItems:'baseline', gap:6, flexWrap:'wrap'}}>
                      <span style={{fontSize:13, fontWeight:600, color:'#1c1816'}}>{e.who}</span>
                      <span style={{padding:'1px 6px', borderRadius:4, background:`${roleColor[e.role]}1a`, color:roleColor[e.role], fontSize:9, fontWeight:700, letterSpacing:'.04em', textTransform:'uppercase'}}>{e.role}</span>
                      <span style={{fontSize:12, color:'#5b544c'}}>{e.act}</span>
                      <span style={{marginLeft:'auto', fontSize:10.5, color:'#8a8278', fontFeatureSettings:'"tnum"'}}>{e.t}</span>
                    </div>
                    <div style={{fontSize:11.5, color:'#8a8278', marginTop:2, lineHeight:1.4}}>{e.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}

        <div style={{padding:'12px 16px 24px', textAlign:'center', fontSize:11, color:'#aea69a'}}>
          Worker · Foreman · Owner — everyone sees the same record. Different actions are read-only based on role.
        </div>
      </div>
    </div>
  );
}

// ─── 7 · SETTINGS · PERMISSIONS MATRIX ──────────────────────
function SettingsPermissions() {
  const roles = [
    { l:'Owner',   color:'#2f6fb5', count:1 },
    { l:'Foreman', color:'#b46e2c', count:3 },
    { l:'Crew',    color:'#5b544c', count:10 },
  ];
  const sections = [
    { l:'Projects', rows:[
      { l:'Create project',       perm:[true, false, false] },
      { l:'Edit project details', perm:[true, true,  false] },
      { l:'Archive project',      perm:[true, false, false] },
    ]},
    { l:'Schedule + crew', rows:[
      { l:'Author schedule',  perm:[true, false, false] },
      { l:'Brief crew',       perm:[true, true,  false] },
      { l:'Override clock-in',perm:[true, true,  false] },
    ]},
    { l:'Money', rows:[
      { l:'Send invoice',          perm:[true, false, false] },
      { l:'Approve OT / materials',perm:[true, false, false] },
      { l:'View pricing book',     perm:[true, true,  false] },
    ]},
    { l:'Time', rows:[
      { l:'Approve time',     perm:[true, true,  false] },
      { l:'Edit own hours',   perm:[true, true,  false] },
      { l:'Request correction',perm:[true, true, true] },
    ]},
  ];
  return (
    <div className="m">
      <MTopBar back title="Roles + permissions"/>
      <div className="m-body">
        {/* Role legend */}
        <div style={{padding:'14px 16px 8px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
          {roles.map(r => (
            <div key={r.l} style={{padding:'10px', background:'#fff', border:'1px solid #e8e3db', borderRadius:10, textAlign:'center'}}>
              <div style={{display:'flex', justifyContent:'center', gap:5, alignItems:'center'}}>
                <span style={{width:8, height:8, borderRadius:4, background:r.color}}/>
                <span style={{fontSize:11, fontWeight:600, color:'#1c1816'}}>{r.l}</span>
              </div>
              <div style={{fontSize:13, fontWeight:700, fontFeatureSettings:'"tnum"', marginTop:3, color:r.color}}>{r.count}</div>
            </div>
          ))}
        </div>

        <div style={{padding:'4px 16px 12px', fontSize:11.5, color:'#5b544c', lineHeight:1.5}}>
          System roles. Custom roles + per-row overrides come later — these are the rules everyone runs on today.
        </div>

        {sections.map(sec => (
          <React.Fragment key={sec.l}>
            <div className="m-section-h">{sec.l}</div>
            <div style={{padding:'0 16px'}}>
              <div style={{background:'#fff', border:'1px solid #e8e3db', borderRadius:12, overflow:'hidden'}}>
                {/* Header */}
                <div style={{display:'grid', gridTemplateColumns:'1.4fr repeat(3, 1fr)', padding:'8px 12px', background:'#fafaf6', borderBottom:'1px solid #e8e3db'}}>
                  <span/>
                  {roles.map(r => (
                    <span key={r.l} style={{textAlign:'center', fontSize:9, fontWeight:700, color:'#8a8278', letterSpacing:'.06em', textTransform:'uppercase'}}>{r.l[0]}</span>
                  ))}
                </div>
                {sec.rows.map((row, i) => (
                  <div key={i} style={{display:'grid', gridTemplateColumns:'1.4fr repeat(3, 1fr)', padding:'10px 12px', borderBottom: i < sec.rows.length-1 ? '1px solid #f5f1ec' : 'none', alignItems:'center'}}>
                    <span style={{fontSize:12.5, color:'#1c1816'}}>{row.l}</span>
                    {row.perm.map((p, j) => (
                      <div key={j} style={{display:'flex', justifyContent:'center'}}>
                        {p
                          ? <span style={{width:18, height:18, borderRadius:9, background:roles[j].color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg></span>
                          : <span style={{width:18, height:1.5, background:'#d8d2c7'}}/>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}

        <div style={{padding:'18px 16px 24px'}}>
          <button className="m-btn" data-variant="ghost">+ Create custom role</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  SafetyInterrupt, OwnerAuthorizations,
  ForemanDailyLogReview, ForemanNotifications,
  OwnerBroadcast, ProjectActivityLog,
  SettingsPermissions,
});
