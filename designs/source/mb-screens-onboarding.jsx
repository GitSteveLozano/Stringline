/* global React, MI, MTopBar, MRow, MKpi, ForemanTabs */

// ============================================================
// FOREMAN EXTENSIONS — round 1.
// Closes the foreman audit: invite accept + first run,
// materials request, project chat (list + thread),
// foreman project detail, time week, daily log submitted,
// brief preview, crew member sheet, foreman profile.
// ============================================================

// ─── 1 · INVITE ACCEPT ────────────────────────────────────────
function ForemanInviteAccept() {
  return (
    <div className="m" style={{background:'#1c1816', color:'#f3ecdf', overflow:'hidden'}}>
      {/* warm brand wash */}
      <div style={{position:'relative', flex:'0 0 220px', overflow:'hidden', background:'linear-gradient(160deg, #2a1e14 0%, #1c1816 55%)'}}>
        <div style={{position:'absolute', top:-60, right:-40, width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle, rgba(217,144,74,.38) 0%, rgba(217,144,74,0) 70%)'}}/>
        <div style={{position:'relative', padding:'30px 24px 16px', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          {/* SL mark */}
          <div style={{width:42, height:42, background:'#d9904a', borderRadius:11, display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
            <span style={{fontSize:18, fontWeight:700, color:'#fff', letterSpacing:'-0.02em', fontFamily:'Geist'}}>SL</span>
          </div>
          <div>
            {/* Inviter card */}
            <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'5px 10px 5px 5px', background:'rgba(243,236,223,.08)', border:'1px solid rgba(243,236,223,.10)', borderRadius:999, marginBottom:10}}>
              <div className="m-avatar" data-tone="accent" data-size="sm" style={{width:22, height:22, fontSize:9}}>SD</div>
              <span style={{fontSize:11, color:'#aea69a'}}>Sarah Davis invited you</span>
            </div>
            <div style={{fontSize:22, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.1}}>
              Join the crew at<br/>
              <span style={{color:'#d9904a'}}>Davis Stucco LLC</span>
            </div>
            <div style={{fontSize:12, color:'rgba(243,236,223,.6)', marginTop:6}}>
              Foreman · 14 sites · 28 active crew
            </div>
          </div>
        </div>
      </div>
      {/* CTAs */}
      <div style={{flex:1, padding:'18px 16px 16px', display:'flex', flexDirection:'column', gap:8, overflow:'auto'}}>
        <button style={{height:46, background:'#d9904a', color:'#fff', border:'none', borderRadius:12, fontFamily:'inherit', fontSize:14, fontWeight:600}}>
          Accept · set up password
        </button>
        <div style={{display:'flex', gap:8}}>
          <button style={{flex:1, height:42, background:'#000', color:'#fff', border:'none', borderRadius:11, fontFamily:'inherit', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
            <svg width="13" height="15" viewBox="0 0 17 20" fill="currentColor"><path d="M13.6 10.6a4.4 4.4 0 012.1-3.7 4.6 4.6 0 00-3.6-2c-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9a4.8 4.8 0 00-4 2.5c-1.7 3-.4 7.4 1.3 9.8.8 1.2 1.7 2.5 3 2.4 1.2-.05 1.6-.8 3.1-.8s1.9.8 3.2.8c1.3-.02 2.2-1.2 3-2.4a10.5 10.5 0 001.4-2.8 4.3 4.3 0 01-2.4-3.8zM11 3.3A4.3 4.3 0 0012 0a4.4 4.4 0 00-2.9 1.5A4 4 0 008 4.7a3.6 3.6 0 003-1.4z"/></svg>
            Apple
          </button>
          <button style={{flex:1, height:42, background:'#f3ecdf', color:'#1c1816', border:'none', borderRadius:11, fontFamily:'inherit', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
            <svg width="13" height="13" viewBox="0 0 18 18"><path d="M17.6 9.2c0-.6-.05-1.2-.15-1.7H9v3.4h4.8a4 4 0 01-1.8 2.7v2.2h2.9a8.7 8.7 0 002.7-6.6z" fill="#4285F4"/><path d="M9 18a8.6 8.6 0 005.95-2.2l-2.9-2.2a5.4 5.4 0 01-3.05.85 5.4 5.4 0 01-5-3.7H1v2.3A9 9 0 009 18z" fill="#34A853"/><path d="M4 10.75a5.4 5.4 0 010-3.5V4.95H1a9 9 0 000 8.1l3-2.3z" fill="#FBBC05"/><path d="M9 3.6a4.9 4.9 0 013.45 1.35l2.6-2.6A8.7 8.7 0 009 0 9 9 0 001 4.95l3 2.3A5.4 5.4 0 019 3.6z" fill="#EA4335"/></svg>
            Google
          </button>
        </div>

        <div style={{marginTop:14, padding:'10px 12px', background:'rgba(243,236,223,.05)', border:'1px dashed rgba(243,236,223,.10)', borderRadius:10, fontSize:11.5, color:'rgba(243,236,223,.65)', lineHeight:1.5}}>
          Your phone number <strong style={{color:'#f3ecdf'}}>(403) 555-0142</strong> is pre-filled from Sarah's invite. You'll verify it next.
        </div>

        <div style={{marginTop:'auto', fontSize:10.5, color:'#5a5346', textAlign:'center', lineHeight:1.5}}>
          By continuing you accept <span style={{color:'#aea69a', textDecoration:'underline'}}>Terms</span> · <span style={{color:'#aea69a', textDecoration:'underline'}}>Privacy</span>
        </div>
      </div>
    </div>
  );
}

// ─── 2 · FIRST RUN (post-invite) ─────────────────────────────
function ForemanFirstRun() {
  const steps = [
    { l:'Verify phone', s:'Code sent to (403) 555-0142', done:true,  i:MI.check },
    { l:'Allow location', s:'For auto clock-in on arrival', done:true,  i:MI.pin },
    { l:'Allow notifications', s:'Schedule, blockers, approvals', done:false, active:true, i:MI.bell },
    { l:'Set your profile photo', s:'So crew can spot you', done:false, i:MI.cam },
  ];
  return (
    <div className="m">
      <div style={{padding:'40px 22px 16px'}}>
        <div style={{fontSize:11, fontWeight:700, color:'#b46e2c', letterSpacing:'.10em', textTransform:'uppercase', marginBottom:6}}>You're in</div>
        <div style={{fontSize:26, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.1}}>Welcome, Ana.</div>
        <div style={{fontSize:13.5, color:'#5b544c', marginTop:8, lineHeight:1.45}}>Four quick setup steps. We'll start with what affects your day most.</div>
      </div>

      <div className="m-body" style={{padding:'0 16px'}}>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {steps.map((s, i) => (
            <div key={i} style={{padding:'14px', background: s.active ? '#fff' : (s.done ? '#fafaf6' : '#fff'), border: s.active ? '1.5px solid #d9904a' : '1px solid #e8e3db', borderRadius:12, display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:32, height:32, borderRadius:8, background: s.done ? 'rgba(44,138,85,.14)' : s.active ? 'rgba(217,144,74,.10)' : '#f7f4ef', color: s.done ? '#2c8a55' : s.active ? '#d9904a' : '#8a8278', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                {s.done ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg> : React.cloneElement(s.i, {width:16, height:16})}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13.5, fontWeight:600, color: s.done ? '#5b544c' : '#1c1816'}}>{s.l}</div>
                <div style={{fontSize:11.5, color:'#8a8278', marginTop:1}}>{s.s}</div>
              </div>
              {s.active && <button style={{padding:'6px 12px', background:'#d9904a', color:'#fff', border:'none', borderRadius:7, fontFamily:'inherit', fontSize:12, fontWeight:600}}>Do it</button>}
              {s.done && <span style={{fontSize:10, color:'#2c8a55', fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase'}}>Done</span>}
            </div>
          ))}
        </div>

        <div style={{marginTop:14, padding:'10px 12px', background:'rgba(217,144,74,.06)', borderRadius:10, fontSize:11.5, color:'#5b544c', display:'flex', gap:8, lineHeight:1.5}}>
          <span style={{color:'#d9904a'}}>{MI.spark}</span>
          <span>Sarah pre-assigned you 3 sites. We'll show them when you're done here.</span>
        </div>
      </div>

      <div style={{padding:'10px 16px calc(env(safe-area-inset-bottom, 0) + 14px)', borderTop:'1px solid #e8e3db'}}>
        <button className="m-btn" data-variant="primary" style={{height:48}}>Continue to your day</button>
        <div style={{textAlign:'center', marginTop:8, fontSize:11.5, color:'#8a8278'}}>
          Skip remaining setup · finish later in <span style={{color:'#b46e2c', fontWeight:600}}>Profile</span>
        </div>
      </div>
    </div>
  );
}

// ─── 3 · MATERIALS REQUEST (sheet over Field) ────────────────
function MaterialsRequest() {
  return (
    <div className="m" style={{position:'relative', background:'#f5f1ec'}}>
      <div style={{flex:1, opacity:.3, padding:'14px 20px'}}>
        <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.02em'}}>From the field</div>
      </div>
      <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.45)'}}/>
      <div className="m-sheet" style={{position:'absolute', left:0, right:0, bottom:0, maxHeight:'90%'}}>
        <div className="m-sheet-grabber"/>
        <div className="m-sheet-header" style={{flexDirection:'column', alignItems:'flex-start', gap:4}}>
          <div style={{fontSize:10, fontWeight:700, color:'#c0463d', letterSpacing:'.08em', textTransform:'uppercase'}}>Materials needed · blocker</div>
          <div className="m-sheet-title">EPS Insulation 1.5"</div>
          <div style={{fontSize:11, color:'#8a8278', display:'flex', alignItems:'center', gap:5}}>
            <div className="m-avatar" data-tone="3" data-size="sm" style={{width:18, height:18, fontSize:9}}>DA</div>
            <span>Diego flagged · Aspen Ridge · 12m ago</span>
          </div>
        </div>
        <div className="m-sheet-body" style={{padding:'14px 16px'}}>

          {/* Quantity stepper */}
          <div style={{display:'flex', alignItems:'center', gap:14, padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, marginBottom:12}}>
            <div style={{flex:1}}>
              <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>How many sheets</div>
              <div style={{fontSize:28, fontWeight:700, fontFeatureSettings:'"tnum"', letterSpacing:'-0.02em', marginTop:2, lineHeight:1}}>12</div>
              <div style={{fontSize:11, color:'#8a8278', marginTop:2}}>Diego asked for 12</div>
            </div>
            <div style={{display:'flex', gap:6}}>
              <button style={{width:36, height:36, background:'#f7f4ef', border:'1px solid #e8e3db', borderRadius:9, fontSize:18, fontWeight:700, color:'#5b544c'}}>−</button>
              <button style={{width:36, height:36, background:'#1c1816', color:'#fff', border:'none', borderRadius:9, fontSize:18, fontWeight:700}}>+</button>
            </div>
          </div>

          {/* Yard stock */}
          <div style={{padding:'12px 14px', background:'rgba(44,138,85,.06)', border:'1px solid rgba(44,138,85,.18)', borderRadius:11, marginBottom:10, display:'flex', alignItems:'center', gap:10}}>
            <span style={{color:'#2c8a55'}}>{MI.box}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12.5, fontWeight:600, color:'#1c1816'}}>4 sheets at the yard</div>
              <div style={{fontSize:11, color:'#5b544c'}}>SE corner · last counted Mon</div>
            </div>
            <span className="m-pill" data-tone="green">avail</span>
          </div>

          {/* Action options */}
          <div className="m-section-h" style={{paddingLeft:0}}>How to fulfill</div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <button style={{padding:'14px', background:'#fff', border:'1.5px solid #d9904a', borderRadius:12, textAlign:'left', fontFamily:'inherit', display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:32, height:32, borderRadius:8, background:'rgba(217,144,74,.10)', color:'#d9904a', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{MI.truck}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13.5, fontWeight:600}}>Pull 4 from yard, order 8 more</div>
                <div style={{fontSize:11, color:'#8a8278', marginTop:1}}>Best mix · Sarah's regular supplier · ~$340</div>
              </div>
              <span style={{width:18, height:18, borderRadius:9, border:'1.5px solid #d9904a', background:'#d9904a', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
              </span>
            </button>
            <button style={{padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, textAlign:'left', fontFamily:'inherit', display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:32, height:32, borderRadius:8, background:'#f5f1ec', color:'#5b544c', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{MI.receipt}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13.5, fontWeight:600}}>Order 12 from supplier</div>
                <div style={{fontSize:11, color:'#8a8278', marginTop:1}}>Don't touch yard · ~$510</div>
              </div>
              <span style={{width:18, height:18, borderRadius:9, border:'1.5px solid #d6cdbe'}}/>
            </button>
            <button style={{padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, textAlign:'left', fontFamily:'inherit', display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:32, height:32, borderRadius:8, background:'rgba(47,111,181,.10)', color:'#2f6fb5', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{MI.send}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13.5, fontWeight:600}}>Ask Sarah to authorize</div>
                <div style={{fontSize:11, color:'#8a8278', marginTop:1}}>Cost is over your $400 limit</div>
              </div>
              <span style={{width:18, height:18, borderRadius:9, border:'1.5px solid #d6cdbe'}}/>
            </button>
          </div>

          <div style={{marginTop:14, fontSize:11.5, color:'#5b544c', lineHeight:1.45, padding:'10px 12px', background:'#f7f4ef', borderRadius:10, display:'flex', gap:8}}>
            <span style={{color:'#8a8278'}}>{MI.spark}</span>
            <span>Diego is auto-notified the moment you tap Confirm. He sees yard ETA and ordered count.</span>
          </div>

          <div className="m-btn-stack" style={{marginTop:14}}>
            <button className="m-btn" data-variant="primary">Confirm · $340</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4 · PROJECT CHAT LIST ───────────────────────────────────
function ProjectChatList() {
  const threads = [
    { p:'Hillcrest Mews', tone:'#E8A86B', last:'Tomás: "Posted 4 photos · east wall"', when:'34m', unread:0, you:false },
    { p:'Aspen Ridge', tone:'#A05A33', last:'Diego: "Out of EPS — need 12 sheets"', when:'12m', unread:2, you:false, kind:'blocker' },
    { p:'Greenwillow', tone:'#7A8C6F', last:'You: "Scaffold sign-off needed before tomorrow"', when:'1h', unread:0, you:true },
    { p:'Hillcrest Mews · client', tone:'#E8A86B', last:'John M.: "Got it, thanks for the update"', when:'4h', unread:0, you:false, kind:'client' },
  ];
  return (
    <div className="m">
      <div style={{padding:'14px 20px 8px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em'}}>Chat</div>
            <div style={{fontSize:12, color:'#8a8278', marginTop:2}}>4 threads · 2 unread</div>
          </div>
          <button style={{width:36, height:36, background:'#1c1816', color:'#fff', borderRadius:18, border:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.plus}</button>
        </div>
      </div>

      <div className="m-body">
        {threads.map(t => (
          <button key={t.p} style={{
            padding:'14px 16px', background:'#fff',
            border:'none', borderBottom:'1px solid #f0ebe2',
            textAlign:'left', fontFamily:'inherit', cursor:'pointer',
            display:'flex', alignItems:'center', gap:12, width:'100%', position:'relative',
          }}>
            {t.unread > 0 && <span style={{position:'absolute', left:0, top:'50%', transform:'translateY(-50%)', width:3, height:30, background:'#d9904a', borderRadius:2}}/>}
            <div style={{width:42, height:42, background:t.tone, borderRadius:10, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, flexShrink:0, letterSpacing:'-.01em'}}>
              {t.p.split(' ').map(w => w[0]).slice(0, 2).join('')}
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8}}>
                <span style={{fontSize:14, fontWeight: t.unread > 0 ? 700 : 600, letterSpacing:'-0.005em', display:'flex', alignItems:'center', gap:6}}>
                  {t.p}
                  {t.kind === 'blocker' && <span style={{padding:'1px 6px', background:'rgba(192,70,61,.10)', color:'#c0463d', fontSize:9, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', borderRadius:4}}>blocker</span>}
                  {t.kind === 'client' && <span style={{padding:'1px 6px', background:'rgba(47,111,181,.10)', color:'#2f6fb5', fontSize:9, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', borderRadius:4}}>client</span>}
                </span>
                <span style={{fontSize:10.5, color:'#8a8278', fontFeatureSettings:'"tnum"'}}>{t.when}</span>
              </div>
              <div style={{fontSize:12, color: t.unread > 0 ? '#1c1816' : '#8a8278', marginTop:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontWeight: t.unread > 0 ? 500 : 400}}>{t.last}</div>
            </div>
            {t.unread > 0 && <span style={{padding:'2px 7px', background:'#d9904a', color:'#fff', borderRadius:999, fontSize:10, fontWeight:700, fontFeatureSettings:'"tnum"'}}>{t.unread}</span>}
          </button>
        ))}
      </div>
      {typeof ForemanTabs !== 'undefined' ? <ForemanTabs active="field"/> : null}
    </div>
  );
}

// ─── 5 · PROJECT CHAT THREAD ─────────────────────────────────
function ProjectChatThread() {
  const messages = [
    { who:'Diego A.', tone:'3', side:'left', t:'9:14 AM', text:'Out of EPS 1.5" — need 12 more sheets to finish south wall.', context:{ k:'blocker', l:'Materials blocker · auto-attached' } },
    { who:'You', tone:'accent', side:'right', t:'9:18 AM', text:'On it. Pulling 4 from yard + ordering 8 — supplier ETA Wed AM.' },
    { who:'Diego A.', tone:'3', side:'left', t:'9:21 AM', text:'Cool. Can pivot to mesh prep till then. Thanks 👍' },
    { who:'Sarah (PM)', tone:'1', side:'left', t:'9:34 AM', text:'Authorized the order — receipt in QBO.' },
    { who:'Diego A.', tone:'3', side:'left', t:'12:48 PM', text:'Yard pull done — 4 sheets on site. Burning down nicely.', photos:2 },
  ];
  return (
    <div className="m">
      <div style={{height:64, padding:'8px 12px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #e8e3db', background:'#fff'}}>
        <button style={{width:36, height:36, background:'transparent', border:'none', color:'#1c1816', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.back}</button>
        <div style={{width:34, height:34, background:'#A05A33', color:'#fff', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:11}}>AR</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:14, fontWeight:600}}>Aspen Ridge</div>
          <div style={{fontSize:11, color:'#8a8278'}}>You · Diego · Sara · Sarah · Hank</div>
        </div>
        <button style={{width:36, height:36, background:'transparent', border:'none', color:'#1c1816'}}>{MI.more}</button>
      </div>

      <div className="m-body" style={{background:'#fafaf6', padding:'14px 12px 8px'}}>
        <div style={{textAlign:'center', fontSize:10, color:'#aea69a', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:10}}>Today · May 26</div>
        {messages.map((m, i) => {
          const isYou = m.side === 'right';
          return (
            <div key={i} style={{display:'flex', flexDirection: isYou ? 'row-reverse' : 'row', gap:8, marginBottom:12, alignItems:'flex-end'}}>
              {!isYou && <div className="m-avatar" data-tone={m.tone} data-size="sm" style={{width:26, height:26, fontSize:10, flexShrink:0}}>{m.who.split(' ').map(w => w[0]).join('').slice(0,2)}</div>}
              <div style={{maxWidth:'72%'}}>
                {!isYou && <div style={{fontSize:10, color:'#8a8278', marginBottom:3, fontWeight:600, paddingLeft:2}}>{m.who} · {m.t}</div>}
                {m.context && (
                  <div style={{marginBottom:5, padding:'5px 9px', background:'rgba(192,70,61,.08)', border:'1px solid rgba(192,70,61,.16)', borderRadius:7, fontSize:10, color:'#c0463d', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:5}}>
                    <span style={{width:5, height:5, borderRadius:3, background:'#c0463d'}}/>{m.context.l}
                  </div>
                )}
                <div style={{padding:'10px 12px', background: isYou ? '#d9904a' : '#fff', color: isYou ? '#fff' : '#1c1816', borderRadius:14, fontSize:13.5, lineHeight:1.45, border: isYou ? 'none' : '1px solid #e8e3db', boxShadow: isYou ? 'none' : '0 1px 2px rgba(0,0,0,.03)'}}>
                  {m.text}
                </div>
                {m.photos && (
                  <div style={{display:'flex', gap:4, marginTop:5}}>
                    {Array.from({length: m.photos}).map((_, j) => (
                      <div key={j} style={{width:58, height:58, background:`linear-gradient(135deg, #A05A33 0%, #6f3d24 100%)`, borderRadius:8}}/>
                    ))}
                  </div>
                )}
                {isYou && <div style={{fontSize:10, color:'#8a8278', marginTop:3, textAlign:'right', paddingRight:2}}>{m.t} · read</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input bar */}
      <div style={{padding:'10px 12px calc(env(safe-area-inset-bottom, 0) + 12px)', borderTop:'1px solid #e8e3db', background:'#fff', display:'flex', alignItems:'flex-end', gap:8, flexShrink:0}}>
        <button style={{width:38, height:38, background:'#f5f1ec', border:'1px solid #e8e3db', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', color:'#5b544c'}}>{MI.cam}</button>
        <div style={{flex:1, minHeight:38, padding:'9px 12px', background:'#f7f4ef', borderRadius:14, fontSize:13.5, color:'#aea69a'}}>Reply…</div>
        <button style={{width:38, height:38, background:'#d9904a', color:'#fff', border:'none', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.send}</button>
      </div>
    </div>
  );
}

// ─── 6 · FOREMAN PROJECT DETAIL (no margin numbers) ─────────
function ForemanProjectDetail() {
  return (
    <div className="m">
      <div style={{height:140, background:'linear-gradient(135deg, #E8A86B 0%, #C77B4F 100%)', position:'relative', padding:'12px 16px', color:'#fff', flexShrink:0}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <button style={{width:36, height:36, background:'rgba(255,255,255,.25)', borderRadius:18, border:'none', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.back}</button>
          <button style={{width:36, height:36, background:'rgba(255,255,255,.25)', borderRadius:18, border:'none', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.share}</button>
        </div>
        <div style={{position:'absolute', bottom:12, left:16, right:16}}>
          <div style={{fontSize:11, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', opacity:.85}}>D18 · You're foreman</div>
          <div style={{fontSize:20, fontWeight:700, letterSpacing:'-0.01em', lineHeight:1.1, marginTop:2}}>Hillcrest Mews — Phase 4</div>
          <div style={{fontSize:12, opacity:.8, marginTop:2}}>4820 Crestline Dr · 3 crew on site</div>
        </div>
      </div>

      <div className="m-body">
        {/* Today's brief — the foreman's authorial output */}
        <div style={{padding:'14px 16px 0'}}>
          <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderLeft:'3px solid #d9904a', borderRadius:12}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:6}}>
              <span style={{fontSize:10, fontWeight:700, color:'#b46e2c', letterSpacing:'.08em', textTransform:'uppercase'}}>Today's brief</span>
              <span style={{fontSize:11, color:'#8a8278'}}>Pushed 6:42 AM</span>
            </div>
            <div style={{fontSize:13.5, fontWeight:600, lineHeight:1.3, color:'#1c1816'}}>
              "Anchor + plate east wall, top to bottom — leave the cornice for tomorrow."
            </div>
            <div style={{display:'flex', gap:8, marginTop:10, paddingTop:10, borderTop:'1px solid #f5f1ec'}}>
              <button className="m-btn m-btn-sm" data-variant="ghost" style={{flex:1}}>Edit brief</button>
              <button className="m-btn m-btn-sm" data-variant="quiet" style={{flex:1}}>Push update</button>
            </div>
          </div>
        </div>

        {/* Crew on site — no margin/budget */}
        <div className="m-section-h">Crew on site (3)</div>
        <div className="m-list-inset">
          <MRow leading="AC" leadingTone="accent" headline="Ana Castillo · Lead" supporting="Clocked in 7:02 · on Mesh + bead"/>
          <MRow leading="ML" leadingTone="blue" headline="Marcus Lee" supporting="Clocked in 7:04 · on Mesh + bead"/>
          <MRow leading="TR" leadingTone="amber" headline="Tomás Reyes" supporting="On break since 12:30 · back at 1:00"/>
        </div>

        {/* Materials staged */}
        <div className="m-section-h">Materials</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:11}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
              <span style={{fontSize:13, fontWeight:600}}>South gate · staged</span>
              <span style={{fontSize:11, color:'#2c8a55', fontWeight:600}}>● ready</span>
            </div>
            <div style={{fontSize:12, color:'#5b544c', lineHeight:1.5}}>24 EPS sheets · 8 rolls mesh · 4 corner bead boxes · Scaffold A</div>
          </div>
        </div>

        {/* Today's photos */}
        <div className="m-section-h">Photos today (6)</div>
        <div style={{padding:'0 16px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6}}>
          {['#E8A86B', '#C77B4F', '#A05A33', '#E8A86B', '#C77B4F', '#7A8C6F'].map((c, i) => (
            <div key={i} style={{aspectRatio:'1', background:`linear-gradient(135deg, ${c} 0%, ${c}aa 100%)`, borderRadius:7, position:'relative'}}>
              {i === 5 && <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.4)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:12, fontWeight:600, borderRadius:7}}>+6</div>}
            </div>
          ))}
        </div>

        <div className="m-btn-stack" style={{margin:'18px 0 24px'}}>
          <button className="m-btn" data-variant="primary">Open today's log draft</button>
        </div>
      </div>
      {typeof ForemanTabs !== 'undefined' ? <ForemanTabs active="today"/> : null}
    </div>
  );
}

// ─── 7 · FOREMAN TIME WEEK ───────────────────────────────────
function ForemanTimeWeek() {
  const crew = [
    { i:'AC', n:'Ana Castillo', tone:'1', hrs:'38h', flag:null },
    { i:'ML', n:'Marcus Lee', tone:'2', hrs:'40h', flag:'OT 2h · approved' },
    { i:'TR', n:'Tomás Reyes', tone:'5', hrs:'37h', flag:'long lunch · 1 flag' },
    { i:'DA', n:'Diego Aldana', tone:'4', hrs:'34h', flag:null },
    { i:'SV', n:'Sara Vega', tone:'3', hrs:'40h', flag:null },
  ];
  return (
    <div className="m">
      <div style={{padding:'14px 20px 8px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em'}}>Time</div>
            <div style={{fontSize:12, color:'#8a8278', marginTop:2}}>Week of May 25 · 5 crew · 189h total</div>
          </div>
        </div>
        {/* Week pills */}
        <div style={{display:'flex', gap:6, marginTop:12}}>
          <button className="m-chip" data-active="true">This week</button>
          <button className="m-chip">Last week</button>
          <button className="m-chip">May</button>
        </div>
      </div>

      {/* Day strip */}
      <div style={{display:'flex', gap:6, padding:'10px 16px 14px', borderBottom:'1px solid #e8e3db'}}>
        {['M','T','W','T','F','S','S'].map((d, i) => (
          <div key={i} style={{flex:1, padding:'8px 4px', borderRadius:10, background: i < 4 ? '#1c1816' : i === 4 ? '#d9904a' : '#f7f4ef', color: i < 5 ? '#fff' : '#aea69a', textAlign:'center'}}>
            <div style={{fontSize:10, fontWeight:500, opacity:.6}}>{d}</div>
            <div style={{fontSize:13, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:2}}>{i < 4 ? '8h' : i === 4 ? '6h' : '—'}</div>
          </div>
        ))}
      </div>

      <div className="m-body">
        {/* Status banner */}
        <div style={{margin:'10px 16px', padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, display:'flex', alignItems:'center', gap:11}}>
          <span style={{width:34, height:34, background:'rgba(201,138,46,.12)', color:'#c98a2e', borderRadius:8, display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{MI.alert}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13, fontWeight:600}}>1 entry needs your attention</div>
            <div style={{fontSize:11, color:'#8a8278'}}>Tomás · long lunch · 42 min over</div>
          </div>
          <button className="m-btn m-btn-sm" data-variant="primary">Review</button>
        </div>

        <div className="m-section-h">My crew · this week</div>
        <div className="m-list-inset">
          {crew.map(c => (
            <div key={c.n} style={{padding:'12px 14px', borderBottom:'1px solid #e8e3db', display:'flex', alignItems:'center', gap:12}}>
              <div className="m-avatar" data-tone={c.tone} data-size="sm">{c.i}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13.5, fontWeight:600}}>{c.n}</div>
                {c.flag && <div style={{fontSize:11, color: c.flag.includes('flag') ? '#c98a2e' : '#5b544c', marginTop:1}}>{c.flag}</div>}
              </div>
              <div style={{fontSize:15, fontWeight:600, fontFeatureSettings:'"tnum"'}}>{c.hrs}</div>
              <span style={{color:'#aea69a'}}>{MI.chev}</span>
            </div>
          ))}
        </div>

        {/* My own hours */}
        <div className="m-section-h">My hours</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, display:'flex', alignItems:'center', gap:12}}>
            <div className="m-avatar" data-tone="1" data-size="lg">AC</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13.5, fontWeight:600}}>You · Ana Castillo</div>
              <div style={{fontSize:11, color:'#8a8278'}}>4 sites this week · 6h supervision</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:18, fontWeight:700, fontFeatureSettings:'"tnum"'}}>40h</div>
              <div style={{fontSize:10, color:'#2c8a55'}}>● clocked in</div>
            </div>
          </div>
        </div>

        <div className="m-btn-stack" style={{margin:'14px 0 24px'}}>
          <button className="m-btn" data-variant="primary">Submit week for owner approval</button>
          <button className="m-btn" data-variant="ghost">+ Add an exception</button>
        </div>
      </div>
      {typeof ForemanTabs !== 'undefined' ? <ForemanTabs active="time"/> : null}
    </div>
  );
}

// ─── 8 · DAILY LOG SUBMITTED ─────────────────────────────────
function ForemanDailyLogSubmitted() {
  const timeline = [
    { d:'Mon', dt:'5/19', state:'done' }, { d:'Tue', dt:'5/20', state:'done' },
    { d:'Wed', dt:'5/21', state:'done' }, { d:'Thu', dt:'5/22', state:'done' },
    { d:'Fri', dt:'5/23', state:'done' }, { d:'Mon', dt:'5/26', state:'today' },
  ];
  return (
    <div className="m">
      <MTopBar back title="Daily log" sub="Mon Apr 28 · submitted" action="share" actionIcon={MI.share}/>
      <div className="m-body">
        {/* Confirmation banner */}
        <div style={{margin:'14px 16px 8px', padding:'14px 16px', background:'#fff', border:'1px solid #e8e3db', borderLeft:'3px solid #2c8a55', borderRadius:12, display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:34, height:34, background:'rgba(44,138,85,.14)', color:'#2c8a55', borderRadius:17, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><path d="M5 12l5 5L20 7"/></svg>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13, fontWeight:600}}>Submitted at 3:42 PM</div>
            <div style={{fontSize:11, color:'#8a8278'}}>Waiting on PM review · usually within 2h</div>
          </div>
          <button className="m-btn m-btn-sm" data-variant="ghost">Edit + resubmit</button>
        </div>

        {/* Read-only stat strip */}
        <div className="m-stat-strip">
          <div><div className="m-stat-strip-l">Photos</div><div className="m-stat-strip-v num">12</div></div>
          <div><div className="m-stat-strip-l">Hours</div><div className="m-stat-strip-v num">32.3</div></div>
          <div><div className="m-stat-strip-l">Issues</div><div className="m-stat-strip-v num" style={{color:'#c98a2e'}}>1</div></div>
        </div>

        {/* Read-only narrative summary */}
        <div className="m-section-h">Narrative</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:11, fontSize:13, color:'#5b544c', lineHeight:1.55}}>
            Started East elevation EPS at 7:00. All 4 crew clocked in by 7:08. Made good progress — about 80% of east wall anchored by lunch. After lunch ran into a soft spot on the foundation flashing — flagged for review. Wrapped at 3:30, materials staged for basecoat tomorrow.
          </div>
        </div>

        {/* Last 7 days timeline */}
        <div className="m-section-h">Recent submissions</div>
        <div style={{padding:'0 16px'}}>
          <div style={{display:'flex', gap:6, padding:'12px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12}}>
            {timeline.map((d, i) => (
              <div key={i} style={{flex:1, textAlign:'center'}}>
                <div style={{fontSize:9, color:'#8a8278', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase', marginBottom:5}}>{d.d}</div>
                <div style={{margin:'0 auto', width:26, height:26, borderRadius:13, background: d.state === 'done' ? 'rgba(44,138,85,.12)' : d.state === 'today' ? '#d9904a' : '#f5f1ec', color: d.state === 'done' ? '#2c8a55' : d.state === 'today' ? '#fff' : '#aea69a', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  {d.state === 'done' ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><path d="M5 12l5 5L20 7"/></svg> : <span style={{fontSize:9, fontWeight:700, fontFeatureSettings:'"tnum"'}}>5/26</span>}
                </div>
                <div style={{fontSize:9, color:'#aea69a', marginTop:4, fontFeatureSettings:'"tnum"'}}>{d.dt}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{padding:'10px 16px 24px', fontSize:11, color:'#aea69a', textAlign:'center'}}>
          The PM is also pinged on flagged issues automatically.
        </div>
      </div>
    </div>
  );
}

// ─── 9 · BRIEF PREVIEW (what the crew sees) ──────────────────
function ForemanBriefPreview() {
  return (
    <div className="m" style={{position:'relative', background:'#1c1816'}}>
      {/* Top frame · preview chrome */}
      <div style={{padding:'10px 14px', background:'#0e0c0a', display:'flex', alignItems:'center', gap:10, flexShrink:0, borderBottom:'1px solid #2a241c'}}>
        <button style={{background:'transparent', border:'1px solid #3a3329', color:'#f3ecdf', borderRadius:8, padding:'5px 10px', fontFamily:'inherit', fontSize:11, fontWeight:500}}>← Back to edit</button>
        <div style={{flex:1, textAlign:'center', fontSize:10.5, color:'#aea69a', letterSpacing:'.06em', textTransform:'uppercase', fontWeight:600}}>Preview · what crew sees</div>
        <button style={{background:'#d9904a', border:'none', color:'#fff', borderRadius:8, padding:'5px 10px', fontFamily:'inherit', fontSize:11, fontWeight:600}}>Push now</button>
      </div>

      {/* Mock worker scope screen */}
      <div className="m-body" style={{background:'#0e0c0a', color:'#f3ecdf'}}>
        <div style={{padding:'14px 20px 8px'}}>
          <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>Today · Hillcrest Mews</div>
          <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.1, marginTop:4}}>Your scope</div>
        </div>

        <div style={{padding:'10px 16px 0'}}>
          <div style={{padding:'14px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:14}}>
            <div style={{fontSize:11, color:'#d9904a', fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:6}}>Today's goal</div>
            <div style={{fontSize:14, fontWeight:600, color:'#f3ecdf', lineHeight:1.45}}>
              "Anchor + plate east wall, top to bottom — leave the cornice for tomorrow."
            </div>
            <div style={{fontSize:11, color:'#8a8278', marginTop:8, paddingTop:8, borderTop:'1px solid #2a241c', display:'flex', alignItems:'center', gap:6}}>
              <div className="m-avatar" data-size="sm" data-tone="1" style={{width:18, height:18, fontSize:9}}>AC</div>
              <span>Ana C. · 6:42 AM</span>
            </div>
          </div>
        </div>

        <div style={{padding:'14px 20px 6px', fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>Step plan · 4</div>
        <div style={{padding:'0 16px', display:'flex', flexDirection:'column', gap:6}}>
          {[
            { l:'Insulation board · 24 sheets', t:'7:00–9:30' },
            { l:'Plate fasteners · ~620 anchors', t:'9:30–11:00' },
            { l:'Mesh + corner bead · East + jambs', t:'11:00–14:00', active:true, you:true },
            { l:'Cleanup + cover', t:'14:30–15:00' },
          ].map((s, i) => (
            <div key={i} style={{padding:'10px 12px', background: s.active ? '#1c1816' : '#0e0c0a', border: s.active ? '1.5px solid #d9904a' : '1px solid #2a241c', borderRadius:10, display:'flex', alignItems:'center', gap:10}}>
              <span style={{width:18, height:18, borderRadius:9, border: s.active ? 'none' : '1.5px solid #3a3329', background: s.active ? '#d9904a' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', flexShrink:0, fontSize:11}}>{s.active ? '●' : ''}</span>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:12, fontWeight: s.active ? 600 : 500, color:'#f3ecdf'}}>{s.l}</div>
                <div style={{fontSize:10, color:'#8a8278', marginTop:1, fontFeatureSettings:'"tnum"'}}>{s.t}{s.you && <span style={{color:'#d9904a', fontWeight:600}}> · you</span>}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{margin:'14px 16px 16px', padding:'10px 12px', background:'#1c1816', border:'1px solid #2a241c', borderRadius:10, fontSize:11.5, color:'#aea69a', lineHeight:1.45}}>
          <strong style={{color:'#f3ecdf'}}>Note:</strong> Materials staged at south gate · scaffold A is yours.
        </div>
      </div>
    </div>
  );
}

// ─── 10 · FOREMAN CREW MEMBER SHEET ──────────────────────────
function ForemanCrewMemberSheet() {
  return (
    <div className="m" style={{position:'relative', background:'#f5f1ec'}}>
      <div style={{flex:1, opacity:.3, padding:'14px 20px'}}>
        <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.02em'}}>Crew</div>
      </div>
      <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.45)'}}/>
      <div className="m-sheet" style={{position:'absolute', left:0, right:0, bottom:0, maxHeight:'88%'}}>
        <div className="m-sheet-grabber"/>
        <div className="m-sheet-header" style={{flexDirection:'column', alignItems:'flex-start', gap:6}}>
          <div style={{display:'flex', alignItems:'center', gap:12, width:'100%'}}>
            <div className="m-avatar" data-tone="3" data-size="lg">DA</div>
            <div style={{flex:1}}>
              <div className="m-sheet-title">Diego Aldana</div>
              <div style={{fontSize:11, color:'#8a8278', display:'flex', alignItems:'center', gap:6}}>
                <span style={{width:6, height:6, borderRadius:3, background:'#c0463d'}}/>Blocker flagged · Aspen Ridge
              </div>
            </div>
            <button style={{background:'#f7f4ef', border:'none', width:32, height:32, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.close}</button>
          </div>
        </div>
        <div className="m-sheet-body" style={{padding:'12px 0 16px'}}>
          {/* Today */}
          <div style={{padding:'0 16px', marginBottom:12}}>
            <div style={{padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:11}}>
              <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase'}}>Today</div>
              <div style={{fontSize:13.5, fontWeight:600, marginTop:4}}>Clocked in 7:02 AM · Aspen Ridge</div>
              <div style={{fontSize:11, color:'#5b544c', marginTop:2}}>On Mesh + corner bead · south wall · ~5h on task</div>
            </div>
          </div>

          {/* Week */}
          <div style={{padding:'0 16px 14px'}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
              <div style={{padding:'10px', background:'#fff', border:'1px solid #e8e3db', borderRadius:10, textAlign:'center'}}>
                <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase'}}>Week</div>
                <div style={{fontSize:16, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:2}}>34h</div>
              </div>
              <div style={{padding:'10px', background:'#fff', border:'1px solid #e8e3db', borderRadius:10, textAlign:'center'}}>
                <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase'}}>Rate</div>
                <div style={{fontSize:16, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:2}}>$32/h</div>
              </div>
              <div style={{padding:'10px', background:'#fff', border:'1px solid #e8e3db', borderRadius:10, textAlign:'center'}}>
                <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase'}}>Tenure</div>
                <div style={{fontSize:16, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:2}}>3y</div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="m-list-inset">
            <MRow leading={MI.send} leadingTone="accent" headline="Chat with Diego" supporting="Last message 12m ago" />
            <MRow leading={MI.time} headline="Override clock-in" supporting="If they forgot to clock in manually"/>
            <MRow leading={MI.cal} headline="See assignments" supporting="3 days this week · all Aspen"/>
            <MRow leading={MI.alert} leadingTone="amber" headline="Resolve open blocker" supporting={'EPS 1.5" materials · 12m'}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 11 · FOREMAN PROFILE ────────────────────────────────────
function ForemanProfile() {
  return (
    <div className="m">
      <MTopBar back title="Profile" action="edit" actionIcon={MI.edit}/>
      <div className="m-body">
        {/* Avatar */}
        <div style={{padding:'18px 20px 14px', textAlign:'center', borderBottom:'1px solid #e8e3db'}}>
          <div className="m-avatar" data-tone="1" data-size="lg" style={{width:80, height:80, fontSize:24, margin:'0 auto 12px'}}>AC</div>
          <div style={{fontSize:20, fontWeight:700, letterSpacing:'-0.01em'}}>Ana Castillo</div>
          <div style={{fontSize:13, color:'#8a8278', marginTop:2}}>Foreman · Davis Stucco LLC</div>
          <div style={{marginTop:10, display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', background:'rgba(217,144,74,.10)', borderRadius:999}}>
            <span style={{width:6, height:6, borderRadius:3, background:'#d9904a'}}/>
            <span style={{fontSize:11, color:'#b46e2c', fontWeight:600}}>3 sites · 8 crew under you</span>
          </div>
        </div>

        <div className="m-section-h">Your sites</div>
        <div className="m-list-inset">
          <MRow leading="HC" leadingTone="accent" headline="Hillcrest Mews — Phase 4" supporting="Lead foreman · 3 crew"/>
          <MRow leading="AR" leadingTone="amber" headline="Aspen Ridge Townhomes" supporting="Lead foreman · 2 crew"/>
          <MRow leading="GW" leadingTone="green" headline="Greenwillow" supporting="Supporting · 1 crew"/>
        </div>

        <div className="m-section-h">Account</div>
        <div className="m-list-inset">
          <MRow leading={MI.user} headline="Name + contact" trailing="Ana Castillo"/>
          <MRow leading={MI.lock} headline="Password" trailing="Last changed 2mo ago"/>
          <MRow leading={MI.bell} headline="Notifications"/>
          <MRow leading={MI.pin} leadingTone="accent" headline="Location · auto clock-in" trailing={<span className="m-pill" data-tone="green" data-dot="true">on</span>}/>
          <MRow leading={MI.qr} headline="Devices" trailing="2 active"/>
          <MRow leading={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>} headline="Help + support"/>
        </div>

        <div style={{padding:'16px', textAlign:'center'}}>
          <button style={{background:'transparent', border:'none', color:'#c0463d', fontSize:13, fontWeight:600, fontFamily:'inherit'}}>Sign out</button>
        </div>

        <div style={{padding:'4px 20px 20px', textAlign:'center', fontSize:10, color:'#aea69a'}}>
          v3.3.0 · Build 4317
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ForemanInviteAccept, ForemanFirstRun,
  MaterialsRequest,
  ProjectChatList, ProjectChatThread,
  ForemanProjectDetail,
  ForemanTimeWeek,
  ForemanDailyLogSubmitted,
  ForemanBriefPreview,
  ForemanCrewMemberSheet,
  ForemanProfile,
});
