/* global React */

// ============================================================
// FOREMAN SECTION · v2 propagation
// Industrial brutalist · sand + ink + hi-vis yellow
// Multi-site oversight, brief authoring, field intake, daily log
// ============================================================

function V2ForemanTabs({ active = 'today', fieldBadge = 0 }) {
  const tabs = [
    { id:'today', l:'TODAY' },
    { id:'crew',  l:'CREW' },
    { id:'field', l:'FIELD', badge: fieldBadge },
    { id:'log',   l:'LOG' },
    { id:'time',  l:'TIME' },
  ];
  return (
    <div className="v2-bottombar">
      {tabs.map(t => (
        <button key={t.id} className={'v2-bottombar-tab' + (t.id === active ? ' active' : '')} style={{position:'relative'}}>
          {t.l}
          {t.badge > 0 && (
            <span style={{position:'absolute', top:8, right:'24%', minWidth:16, height:16, padding:'0 4px', background:'var(--v2-bad)', color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', border:'1.5px solid var(--v2-ink)'}}>{t.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}

function V2StatusBarLight({ time = '9:41' }) {
  return (
    <div style={{
      height: 32, padding: '10px 18px 0',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: 'var(--v2-font-mono)', fontSize: 12, fontWeight: 500,
      flexShrink: 0, color: 'var(--v2-ink)',
    }}>
      <span>{time}</span>
      <span style={{display:'flex', gap:6, alignItems:'center'}}>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor"><rect x="0" y="6" width="3" height="4"/><rect x="5" y="4" width="3" height="6"/><rect x="10" y="2" width="3" height="8"/><rect x="15" y="0" width="3" height="10"/></svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="20" height="8"/><rect x="23" y="4" width="2" height="4" fill="currentColor"/><rect x="3" y="4" width="14" height="4" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

// ─── 1 · FOREMAN TODAY · multi-site home ────────────────────
function V2ForemanToday() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="9:14"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">FOREMAN · ANA</div>
          <div className="v2-appbar-title">3 SITES · 6 CREW</div>
        </div>
      </div>

      {/* Pings hi-vis strip */}
      <div style={{padding:'14px 20px', background:'var(--v2-accent)', borderBottom:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div className="v2-mono" style={{fontWeight:700, fontSize:10, letterSpacing:'0.08em', color:'var(--v2-accent-ink)'}}>2 NEED YOU · 12m AGO</div>
          <div className="v2-h3" style={{marginTop:4, color:'var(--v2-accent-ink)'}}>From the field</div>
        </div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontSize:28, fontWeight:800, color:'var(--v2-accent-ink)'}}>→</div>
      </div>

      <div style={{flex:1, overflow:'auto'}}>
        {/* Hillcrest */}
        <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
          <div className="v2-row-spread">
            <div className="v2-h3">HILLCREST</div>
            <span className="v2-pill good"><span className="dot"/>ON</span>
          </div>
          <div className="v2-mono" style={{color:'var(--v2-ink-3)', marginTop:6}}>DAY 18 · EPS EAST · 3 CREW</div>
          <div style={{marginTop:14}}>
            <div className="v2-eyebrow" style={{fontSize:10}}>SPENT TODAY</div>
            <div className="v2-bignum" style={{fontSize:40, lineHeight:1, marginTop:2}}>$724</div>
            <div className="v2-mono" style={{color:'var(--v2-good)', fontWeight:700, marginTop:4}}>— 9% UNDER PLAN</div>
          </div>
        </div>

        {/* Aspen — blocked */}
        <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
          <div className="v2-row-spread">
            <div className="v2-h3">ASPEN RIDGE</div>
            <span className="v2-pill bad"><span className="dot"/>BLOCKED</span>
          </div>
          <div className="v2-mono" style={{color:'var(--v2-ink-3)', marginTop:6}}>DIEGO FLAGGED · OUT OF EPS</div>
          <button className="v2-btn" style={{marginTop:14, minHeight:52, fontSize:16}}>RESOLVE · ORDER 12 SHEETS</button>
        </div>

        {/* Greenwillow */}
        <div style={{padding:'18px 20px'}}>
          <div className="v2-row-spread">
            <div className="v2-h3" style={{color:'var(--v2-ink-3)'}}>GREENWILLOW</div>
            <span className="v2-pill"><span className="dot" style={{background:'var(--v2-warn)'}}/>UNBRIEFED</span>
          </div>
          <div className="v2-mono" style={{color:'var(--v2-ink-3)', marginTop:6}}>DAY 1 · CARLOS NO-SHOW</div>
        </div>
      </div>

      <V2ForemanTabs active="today" fieldBadge={2}/>
    </div>
  );
}

// ─── 1B · FOREMAN TODAY · QUIET (early morning, no pings) ───
function V2ForemanTodayQuiet() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="6:38"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">FOREMAN · ANA</div>
          <div className="v2-appbar-title">3 SITES · 6 CREW</div>
        </div>
      </div>

      <div style={{padding:'14px 20px', background:'var(--v2-sand-soft)', borderBottom:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div className="v2-mono" style={{fontWeight:700, fontSize:10, letterSpacing:'0.08em', color:'var(--v2-ink-3)'}}>QUIET · NO PINGS</div>
          <div className="v2-h3" style={{marginTop:4, color:'var(--v2-ink-2)'}}>Field is clear</div>
        </div>
        <span className="v2-pill good"><span className="dot"/>CLEAR</span>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">TODAY · 3 SITES OPENING</div>
        <div className="v2-bignum" style={{fontSize:64, marginTop:10}}>6:42</div>
        <div className="v2-mono" style={{color:'var(--v2-ink-3)', marginTop:6, fontWeight:600}}>AVG CREW ARRIVAL · ~18 MIN</div>
      </div>

      <div style={{flex:1, padding:'20px', display:'flex', flexDirection:'column', gap:14}}>
        <div style={{padding:'14px 16px', border:'2px dashed var(--v2-line-soft)', display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:8, height:8, background:'var(--v2-warn)'}}/>
          <div className="v2-mono" style={{flex:1, color:'var(--v2-ink-3)', fontSize:11, fontWeight:600}}>GREENWILLOW UNBRIEFED · TAP TO AUTHOR</div>
        </div>
        <button className="v2-btn" style={{minHeight:60}}>BRIEF GREENWILLOW CREW</button>
      </div>

      <V2ForemanTabs active="today" fieldBadge={0}/>
    </div>
  );
}

// ─── 2 · FOREMAN FIELD · incoming from crew ─────────────────
function V2ForemanField() {
  const items = [
    { who:'DIEGO A.', site:'ASPEN', kind:'BLOCKER', text:'Out of EPS 1.5" — need 12 more sheets. Crew can pivot 2hrs, then stuck.', when:'12m' },
    { who:'MARCO P.', site:'GREENWILLOW', kind:'BLOCKER', text:'Scaffold sign-off needed before crew tomorrow.', when:'1h' },
    { who:'TOMÁS R.', site:'HILLCREST', kind:'PHOTO', text:'4 photos · east wall progress.', when:'34m', photos:4 },
  ];
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="11:24"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">FIELD · TODAY</div>
          <div className="v2-appbar-title">3 INCOMING · 2 NEED YOU</div>
        </div>
      </div>

      <div style={{flex:1, overflow:'auto'}}>
        {items.map((it, i) => (
          <div key={i} style={{padding:'16px 20px', borderBottom:'2px solid var(--v2-ink)', background: it.kind === 'BLOCKER' ? 'var(--v2-sand)' : 'var(--v2-sand-soft)'}}>
            <div className="v2-row-spread" style={{marginBottom:8}}>
              <div className="v2-mono" style={{fontWeight:700, fontSize:11, letterSpacing:'0.06em'}}>
                {it.who} · {it.site}
              </div>
              <span className={'v2-pill ' + (it.kind === 'BLOCKER' ? 'bad' : '')}>{it.kind}</span>
            </div>
            <div style={{fontSize:15, lineHeight:1.45, color:'var(--v2-ink)'}}>{it.text}</div>
            {it.photos && (
              <div style={{display:'flex', gap:6, marginTop:10}}>
                {Array.from({length: it.photos}).map((_, j) => (
                  <div key={j} style={{width:54, height:54, background:'linear-gradient(135deg, #E8A86B 0%, #A05A33 100%)', border:'2px solid var(--v2-ink)'}}/>
                ))}
              </div>
            )}
            <div className="v2-row-spread" style={{marginTop:12, gap:8}}>
              {it.kind === 'BLOCKER'
                ? <button className="v2-btn primary" style={{flex:2, minHeight:48, fontSize:14}}>ORDER MATERIALS</button>
                : <button className="v2-btn ghost" style={{flex:2, minHeight:48, fontSize:14}}>REPLY</button>}
              <div className="v2-mono" style={{fontWeight:700, color:'var(--v2-ink-3)', fontSize:12}}>{it.when}</div>
            </div>
          </div>
        ))}
      </div>

      <V2ForemanTabs active="field" fieldBadge={2}/>
    </div>
  );
}

// ─── 2B · FOREMAN FIELD · EMPTY (no incoming) ───────────────
function V2ForemanFieldEmpty() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="7:14"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">FIELD · TODAY</div>
          <div className="v2-appbar-title">NOTHING IN YET</div>
        </div>
      </div>

      <div style={{flex:1, padding:'56px 20px', textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <div style={{width:64, height:64, border:'3px solid var(--v2-ink)', background:'var(--v2-sand-soft)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24}}>
          <div style={{width:8, height:8, background:'var(--v2-good)'}}/>
        </div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:30, letterSpacing:'-0.025em', lineHeight:0.95, color:'var(--v2-ink)'}}>
          All quiet.
        </div>
        <div className="v2-mono" style={{marginTop:14, color:'var(--v2-ink-3)', fontWeight:600, maxWidth:240, lineHeight:1.5}}>
          NO BLOCKERS, NO PHOTOS, NO NOTES YET. CREW JUST CLOCKED IN AT ALL 3 SITES.
        </div>
      </div>

      <V2ForemanTabs active="field" fieldBadge={0}/>
    </div>
  );
}

// ─── 3 · FOREMAN BRIEF CREW · authoring ─────────────────────
function V2ForemanBriefCrew() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="6:38"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">BRIEF CREW</div>
          <div className="v2-appbar-title">HILLCREST · D18</div>
        </div>
      </div>

      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">TODAY'S GOAL</div>
        <div style={{marginTop:10, padding:'14px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', fontSize:16, lineHeight:1.45, minHeight:80}}>
          Anchor + plate east wall, top to bottom. Leave the cornice for tomorrow.<span style={{display:'inline-block', width:2, height:14, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:2}}/>
        </div>
        <div className="v2-mono" style={{marginTop:6, color:'var(--v2-ink-3)', fontSize:11}}>72 / 280 · VOICE MEMO AVAILABLE</div>
      </div>

      <div style={{flex:1, overflow:'auto'}}>
        <div className="v2-section-bar">
          <div className="v2-eyebrow">STEP PLAN · 4</div>
          <button style={{fontFamily:'var(--v2-font-mono)', fontWeight:700, fontSize:11, color:'var(--v2-accent-ink)', background:'var(--v2-accent)', border:'1.5px solid var(--v2-ink)', padding:'3px 8px', cursor:'pointer', letterSpacing:'0.06em'}}>+ ADD</button>
        </div>
        {[
          { n:'EPS BOARDS · 24 SHEETS', t:'7:00 → 9:30', who:'ALL' },
          { n:'PLATE FASTENERS · ~620', t:'9:30 → 11:00', who:'ALL' },
          { n:'MESH + CORNER BEAD', t:'11:00 → 14:00', who:'MARCUS · TOMÁS', active:true },
          { n:'CLEANUP + COVER', t:'14:30 → 15:00', who:'ANA' },
        ].map((s, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:12, background: s.active ? 'rgba(255,212,0,0.15)' : 'transparent'}}>
            <div className="v2-mono" style={{color:'var(--v2-ink-3)', fontWeight:700, fontSize:11}}>⋮⋮</div>
            <div style={{flex:1}}>
              <div className="v2-row-spread">
                <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:600, fontSize:14}}>{s.n}</div>
                <div className="v2-mono" style={{fontSize:11, fontWeight:700, color:'var(--v2-ink-3)'}}>{s.t}</div>
              </div>
              <div className="v2-mono" style={{color:'var(--v2-ink-3)', marginTop:3, fontSize:10, fontWeight:600}}>WHO · {s.who}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{padding:'14px 20px', borderTop:'2px solid var(--v2-ink)', background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', gap:10}}>
        <span style={{width:8, height:8, background:'var(--v2-good)'}}/>
        <div className="v2-mono" style={{flex:1, fontSize:11, fontWeight:600}}>3 CREW WILL SEE THIS ON SCOPE TAB</div>
      </div>

      <div style={{padding:'12px 20px', display:'flex', gap:8, borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn ghost" style={{flex:1, fontSize:14}}>PREVIEW</button>
        <button className="v2-btn primary" style={{flex:2, fontSize:14}}>PUSH TO CREW</button>
      </div>
    </div>
  );
}

// ─── 4 · FOREMAN CREW · roster ──────────────────────────────
function V2ForemanCrew() {
  const sites = [
    { name:'HILLCREST', briefed:true, briefedBy:'YOU', when:'6:42 AM', crew:[
      { n:'ANA CASTILLO', i:'AC', role:'LEAD', status:'ON', clock:'7:02' },
      { n:'MARCUS LEE',   i:'ML', role:'CREW', status:'ON', clock:'7:04' },
      { n:'TOMÁS REYES',  i:'TR', role:'CREW', status:'BREAK', clock:'7:08' },
    ]},
    { name:'ASPEN RIDGE', briefed:true, briefedBy:'ANA C.', when:'6:51 AM', crew:[
      { n:'DIEGO ALDANA', i:'DA', role:'CREW', status:'BLOCKED', clock:'7:02' },
    ]},
  ];
  const statusColor = { ON:'var(--v2-good)', BREAK:'var(--v2-warn)', BLOCKED:'var(--v2-bad)', NOSHOW:'var(--v2-bad)' };
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="10:48"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">CREW · ACROSS SITES</div>
          <div className="v2-appbar-title">7 OF 8 ON SITE</div>
        </div>
      </div>

      {/* View toggle */}
      <div style={{display:'flex', borderBottom:'2px solid var(--v2-ink)'}}>
        <button style={{flex:1, padding:'12px 0', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', border:'none', borderRight:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontWeight:700, fontSize:11, letterSpacing:'0.06em'}}>BY SITE</button>
        <button style={{flex:1, padding:'12px 0', background:'transparent', border:'none', borderRight:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontWeight:600, fontSize:11, letterSpacing:'0.06em', color:'var(--v2-ink-3)'}}>BY PERSON</button>
        <button style={{flex:1, padding:'12px 0', background:'transparent', border:'none', fontFamily:'var(--v2-font-mono)', fontWeight:600, fontSize:11, letterSpacing:'0.06em', color:'var(--v2-ink-3)'}}>MAP</button>
      </div>

      <div style={{flex:1, overflow:'auto'}}>
        {sites.map((s, i) => (
          <div key={i} style={{borderBottom:'2px solid var(--v2-ink)'}}>
            <div className="v2-section-bar">
              <div>
                <div className="v2-eyebrow">{s.name}</div>
                <div className="v2-mono" style={{marginTop:3, fontSize:10, color:'var(--v2-ink-3)'}}>BRIEFED BY {s.briefedBy} · {s.when}</div>
              </div>
              <button style={{padding:'6px 10px', background:'transparent', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontWeight:700, fontSize:10, letterSpacing:'0.06em'}}>EDIT BRIEF</button>
            </div>
            {s.crew.map((c, j) => (
              <div key={j} style={{padding:'14px 20px', borderBottom: j < s.crew.length-1 ? '1px solid var(--v2-line-soft)' : 'none', display:'flex', alignItems:'center', gap:12}}>
                <div style={{width:40, height:40, background:'var(--v2-ink)', color:'var(--v2-sand)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14}}>{c.i}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{c.n}</div>
                  <div className="v2-mono" style={{color:'var(--v2-ink-3)', marginTop:2, fontSize:10, fontWeight:600}}>{c.role} · CLOCKED {c.clock}</div>
                </div>
                <span style={{padding:'4px 8px', background:statusColor[c.status], color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>{c.status}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <V2ForemanTabs active="crew" fieldBadge={2}/>
    </div>
  );
}

// ─── 5 · DAILY LOG · DRAFT state ────────────────────────────
function V2ForemanDailyLogDraft() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="3:24"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">DAILY LOG · DRAFT</div>
          <div className="v2-appbar-title">HILLCREST · APR 28</div>
        </div>
      </div>

      {/* Stat strip */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'16px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>PHOTOS</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4}}>12</div>
        </div>
        <div style={{padding:'16px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>HOURS</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4}}>32</div>
        </div>
        <div style={{padding:'16px', background:'var(--v2-warn)', color:'#fff'}}>
          <div className="v2-mono" style={{fontWeight:700, fontSize:10, letterSpacing:'0.06em'}}>ISSUES</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4}}>1</div>
        </div>
      </div>

      <div style={{flex:1, overflow:'auto'}}>
        {/* AI draft */}
        <div className="v2-section-bar">
          <div className="v2-eyebrow accent">AGENT DRAFT</div>
          <button style={{padding:'4px 10px', background:'transparent', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontWeight:700, fontSize:10, letterSpacing:'0.06em'}}>EDIT</button>
        </div>
        <div style={{padding:'16px 20px', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
          <div style={{fontSize:14, lineHeight:1.55, color:'var(--v2-ink-2)'}}>
            Started East elevation EPS at 7:00. All 4 crew clocked in by 7:08. About 80% of east wall anchored by lunch. Ran into a soft spot on foundation flashing — flagged for review. Wrapped at 3:30.
          </div>
          <div className="v2-mono" style={{marginTop:10, fontSize:10, color:'var(--v2-ink-3)', fontWeight:600}}>FROM · 12 PHOTOS + 2 MEMOS + CLOCK DATA</div>
        </div>

        {/* Photo grid */}
        <div style={{padding:'14px 20px', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:4}}>
          {['#E8A86B', '#C77B4F', '#A05A33', '#7A8C6F', '#E8A86B', '#9C7A5B', '#C77B4F', '#FFD400'].map((c, i) => (
            <div key={i} style={{aspectRatio:'1', background:c, border:'2px solid var(--v2-ink)', position:'relative'}}>
              {i === 7 && <div style={{position:'absolute', inset:0, background:'var(--v2-ink)', color:'var(--v2-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14}}>+4</div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'12px 20px', display:'flex', gap:8, borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn ghost" style={{flex:1, fontSize:14}}>SAVE DRAFT</button>
        <button className="v2-btn primary" style={{flex:2, fontSize:14}}>SUBMIT TO PM</button>
      </div>
    </div>
  );
}

// ─── 5B · DAILY LOG · SUBMITTED state ───────────────────────
function V2ForemanDailyLogSubmitted() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="3:42"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">DAILY LOG · SUBMITTED</div>
          <div className="v2-appbar-title">HILLCREST · APR 28</div>
        </div>
      </div>

      <div style={{padding:'18px 20px', background:'var(--v2-good)', color:'#fff', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-mono" style={{fontSize:10, fontWeight:700, letterSpacing:'0.08em'}}>✓ SUBMITTED · 3:42 PM</div>
        <div className="v2-h3" style={{marginTop:6, color:'#fff'}}>Sarah will review.</div>
        <div className="v2-mono" style={{marginTop:6, fontSize:11, fontWeight:600, opacity:0.85}}>USUALLY WITHIN 2 HOURS</div>
      </div>

      <div style={{flex:1, padding:'20px', overflow:'auto'}}>
        <div className="v2-eyebrow">WEEK OF APR 27 · LOGS</div>
        <div style={{display:'flex', gap:6, marginTop:12}}>
          {[
            { d:'M', state:'done' }, { d:'T', state:'done' }, { d:'W', state:'done' },
            { d:'T', state:'done' }, { d:'F', state:'today' }, { d:'S', state:'off' }, { d:'S', state:'off' },
          ].map((d, i) => (
            <div key={i} style={{flex:1, textAlign:'center'}}>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', fontWeight:700}}>{d.d}</div>
              <div style={{margin:'8px auto 0', width:34, height:34, border:'2px solid var(--v2-ink)', background: d.state === 'done' ? 'var(--v2-good)' : d.state === 'today' ? 'var(--v2-accent)' : 'var(--v2-sand)', color: d.state === 'done' ? '#fff' : 'var(--v2-ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14}}>
                {d.state === 'done' ? '✓' : d.state === 'today' ? '●' : '—'}
              </div>
            </div>
          ))}
        </div>
        <div className="v2-mono" style={{marginTop:18, fontSize:11, color:'var(--v2-ink-3)', textAlign:'center', fontWeight:600}}>5 OF 5 SUBMITTED ON TIME THIS WEEK</div>
      </div>

      <div style={{padding:'12px 20px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn ghost" style={{fontSize:14}}>EDIT + RESUBMIT</button>
      </div>
    </div>
  );
}

// ─── 6 · MATERIALS REQUEST · sheet ──────────────────────────
function V2MaterialsRequest() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="11:36"/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow accent" style={{background:'var(--v2-bad)', color:'#fff', display:'inline-block'}}>BLOCKER · ASPEN</div>
          <div className="v2-appbar-title" style={{marginTop:4}}>ORDER MATERIALS</div>
        </div>
      </div>

      <div style={{padding:'20px', borderBottom:'2px solid var(--v2-ink)', background:'var(--v2-sand-soft)'}}>
        <div className="v2-eyebrow">DIEGO NEEDS · 12m AGO</div>
        <div className="v2-bignum" style={{fontSize:60, marginTop:10}}>12<span className="unit" style={{fontSize:20}}>SHEETS</span></div>
        <div className="v2-mono" style={{marginTop:8, color:'var(--v2-ink-2)', fontWeight:600}}>EPS INSULATION · 1.5" · 4'×8'</div>
      </div>

      <div style={{flex:1, overflow:'auto'}}>
        {/* Yard stock */}
        <div style={{padding:'14px 20px', background:'var(--v2-good)', color:'#fff', display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:10, height:10, background:'#fff'}}/>
          <div style={{flex:1}}>
            <div className="v2-mono" style={{fontSize:10, fontWeight:700, letterSpacing:'0.06em'}}>YARD STOCK</div>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:18, marginTop:2}}>4 sheets on hand</div>
          </div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:28}}>4</div>
        </div>

        <div className="v2-section-bar">
          <div className="v2-eyebrow">HOW TO FULFILL · PICK ONE</div>
        </div>

        {[
          { l:'PULL 4 + ORDER 8', s:'BEST MIX · ~$340 · WED ETA', selected:true },
          { l:'ORDER 12 FROM SUPPLIER', s:'KEEP YARD STOCK · ~$510' },
          { l:'ASK SARAH TO AUTHORIZE', s:'OVER YOUR $400 LIMIT' },
        ].map((o, i) => (
          <button key={i} style={{
            padding:'16px 20px', display:'flex', alignItems:'center', gap:12,
            background: o.selected ? 'var(--v2-accent)' : 'var(--v2-sand)',
            color: o.selected ? 'var(--v2-accent-ink)' : 'var(--v2-ink)',
            border:'none', borderBottom:'2px solid var(--v2-ink)', borderRight:'none', borderLeft:'none', borderTop:'none',
            width:'100%', textAlign:'left', cursor:'pointer', fontFamily:'var(--v2-font)',
          }}>
            <div style={{width:20, height:20, border:'2px solid', borderColor: o.selected ? 'var(--v2-accent-ink)' : 'var(--v2-ink)', background: o.selected ? 'var(--v2-accent-ink)' : 'transparent', flexShrink:0}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16}}>{o.l}</div>
              <div className="v2-mono" style={{fontSize:10, marginTop:3, fontWeight:600, opacity:0.75}}>{o.s}</div>
            </div>
          </button>
        ))}
      </div>

      <div style={{padding:'14px 20px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">CONFIRM · $340</button>
        <div className="v2-mono" style={{marginTop:10, textAlign:'center', fontSize:11, color:'var(--v2-ink-3)', fontWeight:600}}>
          DIEGO AUTO-NOTIFIED ON TAP
        </div>
      </div>
    </div>
  );
}

// ─── 4B · CREW · BY PERSON (cross-site flat list) ───────────
function V2ForemanCrewByPerson() {
  const crew = [
    { n:'ANA CASTILLO',   i:'AC', role:'LEAD', site:'HILLCREST', status:'ON',      hrs:'4:24' },
    { n:'DIEGO ALDANA',   i:'DA', role:'CREW', site:'ASPEN',     status:'BLOCKED', hrs:'3:48' },
    { n:'MARCUS LEE',     i:'ML', role:'CREW', site:'HILLCREST', status:'ON',      hrs:'4:22' },
    { n:'PRIYA RAVI',     i:'PR', role:'LEAD', site:'GREENW.',   status:'OFF',     hrs:'—' },
    { n:'TOMÁS REYES',    i:'TR', role:'CREW', site:'HILLCREST', status:'BREAK',   hrs:'4:18' },
    { n:'SARA VEGA',      i:'SV', role:'CREW', site:'ASPEN',     status:'ON',      hrs:'3:48' },
    { n:'CARLOS GUZMÁN',  i:'CG', role:'CREW', site:'GREENW.',   status:'NOSHOW',  hrs:'—' },
  ];
  const statusColor = { ON:'var(--v2-good)', BREAK:'var(--v2-warn)', BLOCKED:'var(--v2-bad)', NOSHOW:'var(--v2-bad)', OFF:'var(--v2-ink-3)' };
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="10:48"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">CREW · ACROSS SITES</div>
          <div className="v2-appbar-title">7 OF 8 ON SITE</div>
        </div>
      </div>

      <div style={{display:'flex', borderBottom:'2px solid var(--v2-ink)'}}>
        <button style={{flex:1, padding:'12px 0', background:'transparent', border:'none', borderRight:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontWeight:600, fontSize:11, letterSpacing:'0.06em', color:'var(--v2-ink-3)'}}>BY SITE</button>
        <button style={{flex:1, padding:'12px 0', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', border:'none', borderRight:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontWeight:700, fontSize:11, letterSpacing:'0.06em'}}>BY PERSON</button>
        <button style={{flex:1, padding:'12px 0', background:'transparent', border:'none', fontFamily:'var(--v2-font-mono)', fontWeight:600, fontSize:11, letterSpacing:'0.06em', color:'var(--v2-ink-3)'}}>MAP</button>
      </div>

      <div style={{flex:1, overflow:'auto'}}>
        {crew.map((c, j) => (
          <div key={j} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:40, height:40, background:'var(--v2-ink)', color:'var(--v2-sand)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:14}}>{c.i}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>{c.n}</div>
              <div className="v2-mono" style={{color:'var(--v2-ink-3)', marginTop:2, fontSize:10, fontWeight:600}}>{c.role} · {c.site}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <span style={{padding:'4px 8px', background:statusColor[c.status], color: c.status === 'OFF' ? 'var(--v2-sand)' : '#fff', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>{c.status}</span>
              <div className="v2-mono" style={{marginTop:6, fontSize:11, fontWeight:700, color: c.status === 'OFF' || c.status === 'NOSHOW' ? 'var(--v2-ink-3)' : 'var(--v2-ink)'}}>{c.hrs}</div>
            </div>
          </div>
        ))}
      </div>

      <V2ForemanTabs active="crew" fieldBadge={2}/>
    </div>
  );
}

// ─── 4C · CREW · MAP (live geofence) ────────────────────────
function V2ForemanCrewMap() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="10:48"/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">CREW · LIVE MAP</div>
          <div className="v2-appbar-title">7 OF 8 ON SITE</div>
        </div>
      </div>

      <div style={{display:'flex', borderBottom:'2px solid var(--v2-ink)'}}>
        <button style={{flex:1, padding:'12px 0', background:'transparent', border:'none', borderRight:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontWeight:600, fontSize:11, letterSpacing:'0.06em', color:'var(--v2-ink-3)'}}>BY SITE</button>
        <button style={{flex:1, padding:'12px 0', background:'transparent', border:'none', borderRight:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontWeight:600, fontSize:11, letterSpacing:'0.06em', color:'var(--v2-ink-3)'}}>BY PERSON</button>
        <button style={{flex:1, padding:'12px 0', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', border:'none', fontFamily:'var(--v2-font-mono)', fontWeight:700, fontSize:11, letterSpacing:'0.06em'}}>MAP</button>
      </div>

      {/* Map */}
      <div style={{flex:1, position:'relative', background:'var(--v2-sand-soft)', borderBottom:'2px solid var(--v2-ink)', overflow:'hidden'}}>
        <svg viewBox="0 0 320 380" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" stroke="#C8C0AC" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="320" height="380" fill="url(#map-grid)"/>
          <path d="M0 130 L320 110" stroke="#0F0E0C" strokeWidth="12" opacity="0.18"/>
          <path d="M0 280 L320 260" stroke="#0F0E0C" strokeWidth="10" opacity="0.18"/>
          <path d="M120 0 L100 380" stroke="#0F0E0C" strokeWidth="10" opacity="0.18"/>
          <path d="M250 0 L240 380" stroke="#0F0E0C" strokeWidth="8" opacity="0.18"/>

          {/* Hillcrest geofence + crew */}
          <rect x="40" y="50" width="80" height="80" fill="none" stroke="#FFD400" strokeWidth="2.5" strokeDasharray="6 3"/>
          <text x="44" y="46" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" fill="#0F0E0C">HILLCREST</text>
          <g><rect x="55" y="70" width="20" height="20" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/><text x="65" y="84" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" textAnchor="middle" fill="#0F0E0C">AC</text></g>
          <g><rect x="80" y="78" width="20" height="20" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/><text x="90" y="92" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" textAnchor="middle" fill="#0F0E0C">ML</text></g>
          <g><rect x="62" y="100" width="20" height="20" fill="#C58A14" stroke="#0F0E0C" strokeWidth="2"/><text x="72" y="114" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" textAnchor="middle" fill="#0F0E0C">TR</text></g>

          {/* Aspen Ridge geofence + crew (blocked) */}
          <rect x="190" y="170" width="80" height="80" fill="none" stroke="#C7331E" strokeWidth="2.5" strokeDasharray="6 3"/>
          <text x="194" y="166" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" fill="#C7331E">ASPEN ● BLOCKED</text>
          <g><rect x="205" y="190" width="20" height="20" fill="#C7331E" stroke="#0F0E0C" strokeWidth="2"/><text x="215" y="204" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" textAnchor="middle" fill="#fff">DA</text></g>
          <g><rect x="232" y="200" width="20" height="20" fill="#FFD400" stroke="#0F0E0C" strokeWidth="2"/><text x="242" y="214" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" textAnchor="middle" fill="#0F0E0C">SV</text></g>

          {/* Greenwillow geofence (priya off-site, carlos no-show) */}
          <rect x="60" y="270" width="80" height="80" fill="none" stroke="#0F0E0C" strokeWidth="2" strokeDasharray="6 3" opacity="0.5"/>
          <text x="64" y="266" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" fill="#0F0E0C" opacity="0.7">GREENWILLOW · OFF</text>
        </svg>

        {/* Floating callout for Sara out-of-fence */}
        <div style={{position:'absolute', top:160, right:14, background:'var(--v2-ink)', color:'var(--v2-accent)', padding:'8px 10px', border:'2px solid var(--v2-ink)', maxWidth:140}}>
          <div className="v2-mono" style={{fontSize:9, fontWeight:700, letterSpacing:'0.06em', color:'var(--v2-accent)'}}>● SV OUT OF FENCE</div>
          <div className="v2-mono" style={{fontSize:10, color:'var(--v2-sand)', marginTop:3}}>120 FT NORTH</div>
        </div>
      </div>

      {/* Bottom legend */}
      <div style={{padding:'10px 16px', display:'flex', gap:14, flexWrap:'wrap', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:10, height:10, background:'var(--v2-accent)', border:'1.5px solid var(--v2-ink)'}}/><span className="v2-mono" style={{fontSize:10, fontWeight:600}}>ON</span></div>
        <div style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:10, height:10, background:'var(--v2-warn)', border:'1.5px solid var(--v2-ink)'}}/><span className="v2-mono" style={{fontSize:10, fontWeight:600}}>BREAK</span></div>
        <div style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:10, height:10, background:'var(--v2-bad)', border:'1.5px solid var(--v2-ink)'}}/><span className="v2-mono" style={{fontSize:10, fontWeight:600}}>BLOCKED</span></div>
      </div>

      <V2ForemanTabs active="crew" fieldBadge={2}/>
    </div>
  );
}

// ─── 3B · BRIEF · PREVIEW (what crew sees) ──────────────────
function V2ForemanBriefPreview() {
  return (
    <div className="v2 v2-screen">
      <V2StatusBarLight time="6:48"/>
      {/* Preview chrome */}
      <div style={{padding:'10px 14px', background:'var(--v2-ink)', color:'var(--v2-accent)', display:'flex', alignItems:'center', gap:10, flexShrink:0, borderBottom:'2px solid var(--v2-ink)'}}>
        <button style={{background:'transparent', border:'1.5px solid var(--v2-accent)', color:'var(--v2-accent)', padding:'5px 10px', fontFamily:'var(--v2-font-mono)', fontWeight:700, fontSize:10, letterSpacing:'0.06em'}}>← EDIT</button>
        <div style={{flex:1, textAlign:'center'}} className="v2-mono">
          <div style={{fontSize:9, color:'var(--v2-sand-2)', letterSpacing:'0.08em'}}>PREVIEW</div>
          <div style={{fontSize:11, fontWeight:700, color:'var(--v2-accent)', marginTop:2}}>WHAT CREW SEES</div>
        </div>
        <button style={{background:'var(--v2-accent)', border:'none', color:'var(--v2-accent-ink)', padding:'6px 12px', fontFamily:'var(--v2-font), system-ui', fontWeight:700, fontSize:12}}>PUSH</button>
      </div>

      {/* Mock worker scope */}
      <div style={{background:'var(--v2-ink)', color:'var(--v2-sand)', flex:1, display:'flex', flexDirection:'column', overflow:'hidden'}}>
        <div style={{padding:'18px 20px'}}>
          <div className="v2-eyebrow accent" style={{display:'inline-block'}}>FROM ANA · 6:42 AM</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:22, lineHeight:1.1, letterSpacing:'-0.015em', marginTop:12, color:'var(--v2-sand)'}}>
            Anchor + plate east wall, top to bottom. Leave the cornice for tomorrow.
          </div>
        </div>

        <div style={{padding:'14px 20px 8px'}}>
          <div className="v2-eyebrow" style={{color:'var(--v2-ink-4)'}}>STEP PLAN · 4</div>
        </div>
        {[
          { l:'EPS BOARDS · 24 SHEETS', t:'7:00 → 9:30' },
          { l:'PLATE FASTENERS · 620',  t:'9:30 → 11:00' },
          { l:'MESH + CORNER BEAD',     t:'11:00 → 14:00' },
          { l:'CLEANUP + COVER',        t:'14:30 → 15:00' },
        ].map((s, i) => (
          <div key={i} style={{padding:'12px 20px', display:'flex', alignItems:'center', gap:12, borderTop:'1px solid var(--v2-ink-2)'}}>
            <div style={{width:28, height:28, border:'2px solid var(--v2-sand-2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:13, color:'var(--v2-sand)'}}>{i+1}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:600, fontSize:14, color:'var(--v2-sand)'}}>{s.l}</div>
              <div className="v2-mono" style={{marginTop:2, color:'var(--v2-ink-4)', fontSize:10, fontWeight:600}}>{s.t}</div>
            </div>
          </div>
        ))}

        <div style={{padding:'14px 20px', borderTop:'1px solid var(--v2-ink-2)', display:'flex', alignItems:'center', gap:10}}>
          <span style={{width:8, height:8, background:'var(--v2-good)'}}/>
          <div className="v2-mono" style={{flex:1, fontSize:11, fontWeight:600, color:'var(--v2-sand)', letterSpacing:'0.04em'}}>MATERIALS STAGED · SOUTH GATE</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  V2ForemanTabs, V2StatusBarLight,
  V2ForemanToday, V2ForemanTodayQuiet,
  V2ForemanField, V2ForemanFieldEmpty,
  V2ForemanBriefCrew, V2ForemanBriefPreview,
  V2ForemanCrew, V2ForemanCrewByPerson, V2ForemanCrewMap,
  V2ForemanDailyLogDraft, V2ForemanDailyLogSubmitted,
  V2MaterialsRequest,
});
