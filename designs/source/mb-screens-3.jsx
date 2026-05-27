/* global React, MI, MTopBar, MLargeHead, MSectionH, MRow, MKpi, MPill, MBottomTabs, MQA, MAvatarGroup, MBanner, MStage */

// ============================================================
// SECTION 7 — SCHEDULE (mobile)
// ============================================================

function ScheduleDay() {
  return (
    <div className="m">
      <div style={{padding:'14px 20px 6px'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <div style={{display:'flex', alignItems:'baseline', gap:10}}>
              <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em'}}>Schedule</div>
            </div>
            <div style={{fontSize:13, color:'#5b544c', marginTop:2}}>Mon, Apr 28 · 3 jobs · 18 crew</div>
          </div>
          {/* Day/Week toggle — default "Day" for foreman role */}
          <div style={{display:'inline-flex', padding:2, background:'#ece7df', borderRadius:9}}>
            <button style={{padding:'5px 12px', fontFamily:'inherit', fontSize:12, fontWeight:600, border:'none', borderRadius:7, background:'#fff', color:'#1c1816', cursor:'pointer'}}>Day</button>
            <button style={{padding:'5px 12px', fontFamily:'inherit', fontSize:12, fontWeight:500, border:'none', background:'transparent', color:'#5b544c', cursor:'pointer'}}>Week</button>
          </div>
        </div>
      </div>
      {/* day picker */}
      <div style={{display:'flex', gap:6, padding:'8px 16px 12px', overflow:'auto', borderBottom:'1px solid #e8e3db'}}>
        {[
          {d:'Sun', n:27, off:true},
          {d:'Mon', n:28, on:true},
          {d:'Tue', n:29},
          {d:'Wed', n:30},
          {d:'Thu', n:1},
          {d:'Fri', n:2},
          {d:'Sat', n:3, off:true},
        ].map(d => (
          <button key={d.d} style={{minWidth:46, padding:'8px 4px', border:'none', borderRadius:10, background: d.on ? '#1c1816' : 'transparent', color: d.on ? '#fff' : (d.off ? '#aea69a' : '#1c1816'), fontFamily:'inherit', textAlign:'center'}}>
            <div style={{fontSize:10, fontWeight:500, opacity:.7}}>{d.d}</div>
            <div style={{fontSize:18, fontWeight:600, marginTop:2, fontFeatureSettings:'"tnum"'}}>{d.n}</div>
          </button>
        ))}
      </div>
      <div className="m-body" style={{padding:'12px 0'}}>
        <div style={{padding:'0 16px', display:'grid', gap:10}}>
          {[
            {p:'Hillcrest Mews', t:'#E8A86B', sc:'EPS east elevation', cw:[{n:'AC',t:1},{n:'ML',t:2},{n:'TR',t:5}], time:'7:00 AM – 3:30 PM', conf:true, hrs:'25.5h'},
            {p:'Aspen Ridge', t:'#A05A33', sc:'Block A basecoat', cw:[{n:'PS',t:4},{n:'DF',t:3},{n:'HM',t:6},{n:'SB',t:7}], time:'7:00 AM – 4:00 PM', conf:true, hrs:'34h'},
            {p:'Greenwillow', t:'#7A8C6F', sc:'Punch list — south facade', cw:[{n:'JO',t:8}], time:'8:00 AM – 2:00 PM', conf:false, hrs:'5h'},
          ].map(j => (
            <div key={j.p} style={{padding:0, background:'#fff', border:'1px solid #e8e3db', borderRadius:14, overflow:'hidden'}}>
              <div style={{height:4, background:j.t}}/>
              <div style={{padding:'12px 14px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div>
                    <div style={{fontSize:15, fontWeight:600}}>{j.p}</div>
                    <div style={{fontSize:12, color:'#5b544c', marginTop:2}}>{j.sc}</div>
                  </div>
                  {j.conf ? <span className="m-pill" data-tone="green" data-dot="true">confirmed</span> : <span className="m-pill" data-tone="amber" data-dot="true">pending</span>}
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:12}}>
                  <div style={{display:'flex'}}>
                    {j.cw.map((c, i) => (
                      <div key={i} className="m-avatar" data-size="sm" data-tone={c.t} style={{marginLeft: i === 0 ? 0 : -8, border:'2px solid #fff'}}>{c.n}</div>
                    ))}
                  </div>
                  <div style={{fontSize:12, color:'#5b544c', fontFeatureSettings:'"tnum"'}}>{j.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="m-fab">{MI.plus}</button>
      <MBottomTabs active="sched"/>
    </div>
  );
}

function ScheduleWeek() {
  return (
    <div className="m">
      <div style={{padding:'14px 20px 6px'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <div style={{display:'flex', alignItems:'baseline', gap:10}}>
              <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em'}}>Schedule</div>
            </div>
            <div style={{fontSize:13, color:'#5b544c', marginTop:2}}>Apr 27 – May 3 · 47 assignments</div>
          </div>
          {/* Day/Week toggle — default "Week" for owner role */}
          <div style={{display:'inline-flex', padding:2, background:'#ece7df', borderRadius:9}}>
            <button style={{padding:'5px 12px', fontFamily:'inherit', fontSize:12, fontWeight:500, border:'none', background:'transparent', color:'#5b544c', cursor:'pointer'}}>Day</button>
            <button style={{padding:'5px 12px', fontFamily:'inherit', fontSize:12, fontWeight:600, border:'none', borderRadius:7, background:'#fff', color:'#1c1816', cursor:'pointer'}}>Week</button>
          </div>
        </div>
      </div>
      <div style={{padding:'8px 16px 10px', borderBottom:'1px solid #e8e3db', fontSize:12, color:'#8a8278'}}>3 projects · 18 crew · 92% utilization</div>
      <div className="m-body">
        {/* Pending requests strip — from foremen */}
        <div style={{margin:'10px 16px', padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderLeft:'3px solid #d9904a', borderRadius:11, display:'flex', alignItems:'center', gap:11}}>
          <span style={{width:34, height:34, background:'rgba(217,144,74,.10)', color:'#d9904a', borderRadius:8, display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{MI.cal}</span>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontSize:12.5, fontWeight:600}}>2 schedule requests from foremen</div>
            <div style={{fontSize:11, color:'#8a8278', marginTop:1}}>Ana: confirm Thu · Marco: swap Tue with Aspen</div>
          </div>
          <button className="m-btn m-btn-sm" data-variant="primary">Review</button>
        </div>
        <div style={{padding:'10px 0'}}>
          {/* weekly grid: rows are days, columns are projects */}
          <div style={{padding:'0 16px', display:'grid', gridTemplateColumns:'48px 1fr 1fr 1fr', gap:6, fontSize:9, fontWeight:600, color:'#aea69a', textTransform:'uppercase', letterSpacing:'.06em', paddingBottom:8, borderBottom:'1px solid #e8e3db'}}>
            <span/>
            <span style={{textAlign:'center'}}>Hillcrest</span>
            <span style={{textAlign:'center'}}>Aspen</span>
            <span style={{textAlign:'center'}}>Greenwl.</span>
          </div>
          {[
            {d:'MON', n:28, today:true, h:[3, 4, 1]},
            {d:'TUE', n:29, h:[2, 3, 0]},
            {d:'WED', n:30, h:[3, 3, 0]},
            {d:'THU', n:1,  h:[2, 4, 0]},
            {d:'FRI', n:2,  h:[2, 4, 0]},
            {d:'SAT', n:3,  h:[0, 0, 0]},
            {d:'SUN', n:4,  h:[0, 0, 0]},
          ].map((r, i) => (
            <div key={i} style={{padding:'10px 16px', display:'grid', gridTemplateColumns:'48px 1fr 1fr 1fr', gap:6, alignItems:'center', borderBottom:'1px solid #f5f1ec', background: r.today ? 'rgba(217,144,74,.06)' : 'transparent'}}>
              <div>
                <div style={{fontSize:10, color:'#8a8278', fontWeight:600}}>{r.d}</div>
                <div style={{fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"', color: r.today ? '#d9904a' : '#1c1816'}}>{r.n}</div>
              </div>
              {r.h.map((n, j) => {
                const colors = ['#E8A86B', '#A05A33', '#7A8C6F'];
                return (
                  <div key={j} style={{height:48, borderRadius:8, background: n > 0 ? colors[j] + '22' : '#f7f4ef', border: n > 0 ? `1px solid ${colors[j]}55` : '1px solid #e8e3db', padding:'6px 8px', position:'relative'}}>
                    {n > 0 ? (
                      <>
                        <div style={{display:'flex', alignItems:'center', gap:3, marginBottom:3}}>
                          {Array.from({length: n}).map((_, k) => (
                            <span key={k} style={{width:6, height:6, borderRadius:3, background:colors[j]}}/>
                          ))}
                        </div>
                        <div style={{fontSize:9, color:'#5b544c', fontWeight:500, lineHeight:1.2}}>{n} crew</div>
                      </>
                    ) : <div style={{fontSize:9, color:'#aea69a', textAlign:'center', paddingTop:14}}>—</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="m-section-h">Capacity</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:6}}>
              <span style={{fontSize:13, fontWeight:600}}>Crew utilization</span>
              <span style={{fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"', color:'#2c8a55'}}>92%</span>
            </div>
            <div style={{height:8, background:'#f5f1ec', borderRadius:4, overflow:'hidden', marginBottom:8}}>
              <div style={{width:'92%', background:'#2c8a55', height:'100%'}}/>
            </div>
            <div style={{fontSize:11, color:'#8a8278'}}>14 of 16 slots filled · 2 crew available Tue/Wed</div>
          </div>
        </div>
      </div>
      <MBottomTabs active="sched"/>
    </div>
  );
}

function ScheduleCreateAssignment() {
  return (
    <div className="m">
      <div style={{height:52, padding:'8px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #e8e3db'}}>
        <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:14, color:'#5b544c'}}>Cancel</button>
        <div style={{flex:1, fontSize:17, fontWeight:600, textAlign:'center'}}>New assignment</div>
        <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:14, color:'#d9904a', fontWeight:600}}>Save</button>
      </div>
      <div className="m-body">
        <div className="m-section-h" style={{paddingTop:14}}>Project</div>
        <div className="m-list-inset">
          <div style={{padding:'12px 14px', background:'#fff', display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:32, height:32, borderRadius:8, background:'#E8A86B', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:700}}>HC</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:500}}>Hillcrest Mews — Phase 4</div>
              <div style={{fontSize:11, color:'#8a8278'}}>4820 Crestline Dr</div>
            </div>
            <span className="m-chev" style={{color:'#aea69a'}}>{MI.chev}</span>
          </div>
        </div>

        <div className="m-section-h">When</div>
        <div className="m-list-inset">
          <MRow leading={MI.cal} headline="Date" trailing="Tue, Apr 29"/>
          <MRow leading={MI.time} headline="Start" trailing="7:00 AM"/>
          <MRow leading={MI.time} headline="End" trailing="3:30 PM"/>
        </div>

        <div className="m-section-h">Scope</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12}}>
            <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>From takeoff</div>
            <div style={{fontSize:14, fontWeight:500, marginTop:6}}>EPS — East elevation</div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8, fontSize:12, color:'#5b544c'}}>
              <span>1,284.5 sf @ 145 sf/hr</span>
              <strong style={{color:'#2c8a55', fontFeatureSettings:'"tnum"'}}>≈ 8.9 crew-hrs</strong>
            </div>
            <div style={{padding:'10px', background:'#f7f4ef', borderRadius:8, marginTop:10, fontSize:11, color:'#5b544c', display:'flex', alignItems:'flex-start', gap:8}}>
              <span style={{color:'#d9904a', flexShrink:0}}>{MI.spark}</span>
              <span>Suggesting <strong>3 crew × 3 hours</strong> based on past pace at this elevation type. Adjust if you've got reasons to push harder.</span>
            </div>
          </div>
        </div>

        <div className="m-section-h">Crew (3)</div>
        <div className="m-list-inset">
          <div style={{padding:'10px 14px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #e8e3db'}}>
            <div className="m-avatar" data-tone="1">AC</div>
            <div style={{flex:1}}><strong style={{fontSize:14}}>Ana Castillo</strong><div style={{fontSize:11, color:'#8a8278'}}>Lead · 32.5h this week</div></div>
            <button style={{background:'transparent', border:'none', color:'#c0463d'}}>{MI.close}</button>
          </div>
          <div style={{padding:'10px 14px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #e8e3db'}}>
            <div className="m-avatar" data-tone="2">ML</div>
            <div style={{flex:1}}><strong style={{fontSize:14}}>Marcus Lee</strong><div style={{fontSize:11, color:'#8a8278'}}>Crew · 30h this week</div></div>
            <button style={{background:'transparent', border:'none', color:'#c0463d'}}>{MI.close}</button>
          </div>
          <div style={{padding:'10px 14px', display:'flex', alignItems:'center', gap:10}}>
            <div className="m-avatar" data-tone="5">TR</div>
            <div style={{flex:1}}><strong style={{fontSize:14}}>Tomás Reyes</strong><div style={{fontSize:11, color:'#8a8278'}}>Crew · 24h this week · light week</div></div>
            <button style={{background:'transparent', border:'none', color:'#c0463d'}}>{MI.close}</button>
          </div>
        </div>
        <div style={{padding:'8px 16px'}}>
          <button className="m-btn" data-variant="ghost">+ Add crew</button>
        </div>

        <div className="m-section-h">Notify</div>
        <div className="m-list-inset">
          <MRow leading={MI.bell} headline="Push notification" supporting="Tonight at 5 PM" trailing={<span className="m-pill" data-tone="accent">on</span>} chev={false}/>
          <MRow leading={MI.send} headline="SMS fallback" supporting="If push fails" trailing={<span className="m-pill" data-tone="accent">on</span>} chev={false}/>
        </div>
        <div style={{height:24}}/>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 8 — TIME (mobile)
// ============================================================

// TimeApprovalQueue removed — superseded by ProjectCrewOwner (project-scoped)
// and TimeQueueAllProjects (cross-project). Both live in mb-screens-crew.jsx.

function TimeBurden() {
  return (
    <div className="m">
      <MTopBar back title="Labor cost" sub="this week"/>
      {/* Scope picker — portfolio or single project */}
      <div style={{display:'flex', gap:6, padding:'10px 16px', borderBottom:'1px solid #e8e3db', overflowX:'auto', background:'#fff'}}>
        {[
          {l:'Portfolio', v:'$54.20', avg:true},
          {l:'Hillcrest', c:'#E8A86B', v:'$54.20', on:true},
          {l:'Aspen Ridge', c:'#A05A33', v:'$56.10'},
          {l:'Greenwillow', c:'#7A8C6F', v:'$51.80'},
        ].map(c => (
          <button key={c.l} style={{
            flex:'0 0 auto', padding:'6px 11px', borderRadius:18,
            background: c.on ? '#1c1816' : '#fff',
            color: c.on ? '#fff' : '#5b544c',
            border: c.on ? 'none' : '1px solid #e8e3db',
            fontFamily:'inherit', fontSize:12, fontWeight:500,
            display:'inline-flex', alignItems:'center', gap:6,
            whiteSpace:'nowrap',
          }}>
            {c.c && <span style={{width:6, height:6, borderRadius:3, background:c.c}}/>}
            {c.avg && <span style={{color:c.on?'#aea69a':'#aea69a', fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em'}}>avg</span>}
            {c.l}
          </button>
        ))}
      </div>
      <div className="m-body">
        {/* Hero */}
        <div style={{padding:'18px 20px 18px', textAlign:'center', borderBottom:'1px solid #e8e3db'}}>
          <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase'}}>True hourly cost</div>
          <div style={{fontSize:42, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1, marginTop:6, fontFeatureSettings:'"tnum"'}}>$54.20</div>
          <div style={{fontSize:13, color:'#5b544c', marginTop:6}}>vs base rate $38.00 · <span style={{color:'#c0463d', fontWeight:600}}>+42.6% loaded</span></div>
        </div>

        {/* Stack visualization */}
        <div style={{padding:'18px 16px 8px'}}>
          <div style={{display:'flex', flexDirection:'column-reverse', gap:0, borderRadius:10, overflow:'hidden', border:'1px solid #e8e3db'}}>
            {[
              {l:'Base wage', v:38.00, c:'#1c1816'},
              {l:'Payroll tax (FICA, FUTA)', v:4.85, c:'#5b544c'},
              {l:'Workers comp', v:3.42, c:'#c98a2e'},
              {l:'Health + benefits', v:5.20, c:'#2f6fb5'},
              {l:'PTO accrual', v:1.55, c:'#7A8C6F'},
              {l:'Truck/tools per hr', v:1.18, c:'#A05A33'},
            ].map((b, i) => (
              <div key={i} style={{display:'flex', alignItems:'center', padding:'10px 14px', background:'#fff', borderTop: i > 0 ? '1px solid #e8e3db' : 'none'}}>
                <span style={{width:6, height:24, background:b.c, borderRadius:3, marginRight:12}}/>
                <div style={{flex:1, fontSize:13}}>{b.l}</div>
                <div style={{fontSize:13, fontWeight:600, fontFeatureSettings:'"tnum"'}}>${b.v.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Project rollup */}
        <div className="m-section-h">This week's totals</div>
        <div className="m-list-inset">
          <MRow leading={MI.users} headline="Crew-hours" trailing={<strong style={{fontFeatureSettings:'"tnum"'}}>187.5h</strong>} chev={false}/>
          <MRow leading={MI.$} headline="Base labor" trailing={<span style={{fontFeatureSettings:'"tnum"'}}>$7,125</span>} chev={false}/>
          <MRow leading={MI.layers} headline="Loaded add-ons" trailing={<span style={{fontFeatureSettings:'"tnum"', color:'#c0463d'}}>+$3,038</span>} chev={false}/>
          <MRow leading={MI.bolt} leadingTone="accent" headline="Loaded total" trailing={<strong style={{fontFeatureSettings:'"tnum"'}}>$10,163</strong>} chev={false}/>
        </div>

        <div style={{margin:'14px 16px', padding:'14px', background:'#f7f4ef', borderRadius:12, fontSize:12, color:'#5b544c', lineHeight:1.5}}>
          <strong style={{color:'#1c1816'}}>Why this matters:</strong> bidding at base $38/hr leaves you 30% short on margin. Loaded $54/hr is the number to use in estimates.
        </div>
      </div>
    </div>
  );
}

function TimeLiveVsBudget() {
  return (
    <div className="m">
      <MTopBar back title="Live vs budget" sub="this week"/>
      {/* Scope picker — portfolio or single project */}
      <div style={{display:'flex', gap:6, padding:'10px 16px', borderBottom:'1px solid #e8e3db', overflowX:'auto', background:'#fff'}}>
        {[
          {l:'Portfolio', avg:true, on:true},
          {l:'Hillcrest', c:'#E8A86B'},
          {l:'Aspen Ridge', c:'#A05A33'},
          {l:'Greenwillow', c:'#7A8C6F'},
        ].map(c => (
          <button key={c.l} style={{
            flex:'0 0 auto', padding:'6px 11px', borderRadius:18,
            background: c.on ? '#1c1816' : '#fff',
            color: c.on ? '#fff' : '#5b544c',
            border: c.on ? 'none' : '1px solid #e8e3db',
            fontFamily:'inherit', fontSize:12, fontWeight:500,
            display:'inline-flex', alignItems:'center', gap:6,
            whiteSpace:'nowrap',
          }}>
            {c.c && <span style={{width:6, height:6, borderRadius:3, background:c.c}}/>}
            {c.avg && <span style={{color:c.on?'#aea69a':'#aea69a', fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em'}}>all</span>}
            {c.l}
          </button>
        ))}
      </div>
      <div className="m-body">
        <div className="m-kpi-row" style={{paddingTop:14}}>
          <MKpi label="Spent" value="$10,163" meta="of $24,500" metaTone=""/>
          <MKpi label="Pace" value="1.18×" unit="" meta="ahead of plan" metaTone="green"/>
        </div>

        {/* Burndown */}
        <div style={{padding:'18px 16px 8px'}}>
          <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:14}}>
            <div style={{fontSize:13, fontWeight:600, marginBottom:14}}>Hours burndown</div>
            <svg viewBox="0 0 280 120" style={{width:'100%', height:120}}>
              {/* grid */}
              <line x1="0" y1="20" x2="280" y2="20" stroke="#e8e3db" strokeDasharray="2,3" strokeWidth=".5"/>
              <line x1="0" y1="60" x2="280" y2="60" stroke="#e8e3db" strokeDasharray="2,3" strokeWidth=".5"/>
              <line x1="0" y1="100" x2="280" y2="100" stroke="#e8e3db" strokeWidth=".5"/>
              {/* planned (dashed) */}
              <polyline points="10,100 60,84 110,68 160,52 210,36 260,20" fill="none" stroke="#aea69a" strokeWidth="1.5" strokeDasharray="4,3"/>
              {/* actual */}
              <polyline points="10,100 60,80 110,58 160,38" fill="none" stroke="#d9904a" strokeWidth="2.5"/>
              <circle cx="160" cy="38" r="4" fill="#d9904a"/>
              {/* ribbon */}
              <polygon points="10,100 60,80 110,58 160,38 160,52 110,68 60,84 10,100" fill="rgba(217,144,74,.10)"/>
              {/* labels */}
              <text x="10" y="116" fill="#aea69a" fontSize="9">Day 1</text>
              <text x="160" y="116" fill="#d9904a" fontSize="9" fontWeight="600">Today · 18</text>
              <text x="260" y="116" fill="#aea69a" fontSize="9" textAnchor="end">Day 32</text>
            </svg>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10, paddingTop:10, borderTop:'1px solid #e8e3db', fontSize:11}}>
              <div style={{display:'flex', alignItems:'center', gap:6}}>
                <span style={{width:12, height:2, background:'#d9904a'}}/><span style={{color:'#5b544c'}}>Actual</span>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:6}}>
                <span style={{width:12, height:1, background:'#aea69a', borderTop:'1px dashed'}}/><span style={{color:'#5b544c'}}>Planned</span>
              </div>
              <strong style={{color:'#2c8a55', fontFeatureSettings:'"tnum"'}}>+24h ahead</strong>
            </div>
          </div>
        </div>

        {/* By scope */}
        <div className="m-section-h">By scope</div>
        <div style={{padding:'0 16px', display:'grid', gap:8}}>
          {[
            {s:'EPS — East', a:84, b:96, t:'green'},
            {s:'EPS — South', a:68, b:72, t:'green'},
            {s:'Basecoat', a:24, b:50, t:'amber'},
            {s:'Stone feature', a:11.5, b:14, t:'green'},
          ].map(s => {
            const pct = (s.a / s.b) * 100;
            return (
              <div key={s.s} style={{padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                  <span style={{fontSize:13, fontWeight:500}}>{s.s}</span>
                  <span style={{fontSize:12, color:'#5b544c', fontFeatureSettings:'"tnum"'}}>{s.a}h / {s.b}h plan</span>
                </div>
                <div style={{height:6, background:'#f5f1ec', borderRadius:3, overflow:'hidden'}}>
                  <div style={{width:`${pct}%`, height:'100%', background: s.t === 'green' ? '#2c8a55' : '#c98a2e'}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MBottomTabs active="sched"/>
    </div>
  );
}

function TimeForemanEntry() {
  return (
    <div className="m">
      <div style={{height:52, padding:'8px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #e8e3db'}}>
        <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:14, color:'#5b544c'}}>Cancel</button>
        <div style={{flex:1, fontSize:17, fontWeight:600, textAlign:'center'}}>Crew time · Mon</div>
        <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:14, color:'#d9904a', fontWeight:600}}>Submit</button>
      </div>
      <div className="m-body">
        <div style={{padding:'14px 20px 4px'}}>
          <div style={{fontSize:13, color:'#8a8278'}}>Hillcrest Mews — Phase 4</div>
          <div style={{fontSize:18, fontWeight:600, marginTop:2}}>4 crew · 8.5h day · 7:00–15:30</div>
        </div>

        {/* Bulk-confirm banner — does the work for the foreman */}
        <div style={{margin:'10px 16px 4px', padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:11, display:'flex', alignItems:'center', gap:11}}>
          <span style={{width:34, height:34, borderRadius:8, background:'rgba(44,138,85,0.12)', color:'#2c8a55', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{MI.bolt}</span>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontSize:13, fontWeight:600}}>3 match GPS · ready to submit</div>
            <div style={{fontSize:11, color:'#8a8278', marginTop:1}}>One needs your eyes (Tomás)</div>
          </div>
          <button className="m-btn m-btn-sm" data-variant="primary">Confirm 3</button>
        </div>

        {/* Tap-to-confirm rows — the captured times are the source of truth */}
        <div className="m-section-h">Crew (4)</div>
        <div style={{padding:'0 16px', display:'grid', gap:8}}>
          {[
            {n:'Ana Castillo', i:'AC', t:1, hrs:'8.4', span:'7:02–15:24 · 30m lunch', match:true},
            {n:'Marcus Lee', i:'ML', t:2, hrs:'8.4', span:'7:04–15:26 · 30m lunch', match:true},
            {n:'Tomás Reyes', i:'TR', t:5, hrs:'8.0', span:'7:08–15:00 · 45m lunch', match:false},
            {n:'Sara Bouchard', i:'SB', t:7, hrs:'7.5', span:'8:00–15:30 · 30m lunch', match:true},
          ].map(p => (
            <div key={p.n} style={{
              padding:'11px 13px',
              background:'#fff',
              border:`1px solid ${p.match ? '#e8e3db' : '#ecd9b8'}`,
              borderRadius:11,
              display:'flex', alignItems:'center', gap:11,
            }}>
              <div className="m-avatar" data-size="sm" data-tone={p.t}>{p.i}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13.5, fontWeight:600, display:'flex', alignItems:'center', gap:6}}>
                  {p.n}
                  {p.match && <span style={{color:'#2c8a55', fontSize:11}}>✓</span>}
                  {!p.match && <span style={{fontSize:9.5, fontWeight:700, padding:'1px 6px', borderRadius:8, background:'#fbeacf', color:'#8a5a1a', textTransform:'uppercase', letterSpacing:'.05em'}}>review</span>}
                </div>
                <div style={{fontSize:11, color:'#8a8278', marginTop:1, fontFeatureSettings:'"tnum"'}}>{p.span}</div>
              </div>
              <div style={{textAlign:'right', flexShrink:0}}>
                <div style={{fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"', letterSpacing:'-0.01em', lineHeight:1}}>{p.hrs}<span style={{fontSize:11, color:'#8a8278', fontWeight:400}}>h</span></div>
                <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:11, color:'#8a8278', padding:0, marginTop:3, cursor:'pointer'}}>Edit</button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals card */}
        <div className="m-section-h">Day total</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'14px 16px', background:'#1c1816', color:'#f3ecdf', borderRadius:14}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
              <span style={{fontSize:13, color:'#aea69a'}}>Crew-hours</span>
              <span style={{fontSize:24, fontWeight:600, fontFeatureSettings:'"tnum"', letterSpacing:'-0.01em'}}>32.3h</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:8, paddingTop:10, borderTop:'1px solid #2a241c'}}>
              <span style={{fontSize:13, color:'#aea69a'}}>Loaded cost</span>
              <span style={{fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"'}}>$1,750</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScheduleDay, ScheduleWeek, ScheduleCreateAssignment,
  TimeBurden, TimeLiveVsBudget, TimeForemanEntry,
});
