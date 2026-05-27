/* global React, MI, MTopBar, MRow, MKpi, MBottomTabs */

// ============================================================
// OWNER EXTENSIONS — round 2.
// Closes the remaining audit items: dashboard snooze, share-sheet
// defaults, schedule edit + empty, rentals dispatch entry,
// generic connect, pricing item edit, team member sheet, stale
// state, onboarding pricing template + sample project, profile,
// help.
// ============================================================

// ─── A · Dashboard attention card · snooze sheet ──────────────
function AttentionSnoozeSheet() {
  return (
    <div className="m" style={{position:'relative', background:'#f5f1ec'}}>
      {/* dim base */}
      <div style={{flex:1, padding:'18px 20px', opacity:.3}}>
        <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.05}}>Good morning,<br/>Mike.</div>
      </div>
      <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.45)'}}/>
      {/* sheet */}
      <div className="m-sheet" style={{position:'absolute', left:0, right:0, bottom:0}}>
        <div className="m-sheet-grabber"/>
        <div className="m-sheet-header">
          <div>
            <div className="m-sheet-title">Acknowledge alert</div>
            <div style={{fontSize:11, color:'#8a8278', marginTop:2}}>Aspen Ridge — 18% over labor</div>
          </div>
          <button style={{background:'#f7f4ef', border:'none', width:32, height:32, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.close}</button>
        </div>
        <div className="m-sheet-body" style={{padding:'8px 0 16px'}}>
          <div className="m-list-inset">
            <div className="m-list-row">
              <div className="m-l-leading" data-tone="accent">{MI.time}</div>
              <div className="m-l-body">
                <div className="m-l-headline">Snooze 1 day</div>
                <div className="m-l-supporting">Re-surface tomorrow morning if still off-track</div>
              </div>
              <span className="m-l-trailing"><span className="m-chev">{MI.chev}</span></span>
            </div>
            <div className="m-list-row">
              <div className="m-l-leading" data-tone="amber">{MI.cal}</div>
              <div className="m-l-body">
                <div className="m-l-headline">Snooze until Friday</div>
                <div className="m-l-supporting">Tied to weekly margin review</div>
              </div>
              <span className="m-l-trailing"><span className="m-chev">{MI.chev}</span></span>
            </div>
            <div className="m-list-row">
              <div className="m-l-leading" data-tone="green">{MI.check}</div>
              <div className="m-l-body">
                <div className="m-l-headline">Not a problem</div>
                <div className="m-l-supporting">Mark resolved without changing the guardrail</div>
              </div>
              <span className="m-l-trailing"><span className="m-chev">{MI.chev}</span></span>
            </div>
            <div className="m-list-row">
              <div className="m-l-leading">{MI.sliders}</div>
              <div className="m-l-body">
                <div className="m-l-headline">Adjust the rule</div>
                <div className="m-l-supporting">Currently: flag when labor &gt; 15% of plan</div>
              </div>
              <span className="m-l-trailing"><span className="m-chev">{MI.chev}</span></span>
            </div>
          </div>
          <div style={{padding:'14px 16px 0', fontSize:11, color:'#8a8278', lineHeight:1.5}}>
            We use what you pick to tune future alerts. "Not a problem" twice in a row asks if the rule should change.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── B · Settings · estimates defaults ────────────────────────
function SettingsEstimates() {
  return (
    <div className="m">
      <MTopBar back title="Estimates"/>
      <div className="m-body">
        <div style={{padding:'14px 20px 8px', fontSize:13, color:'#5b544c', lineHeight:1.5}}>
          What we pre-fill when you tap <strong style={{color:'#1c1816'}}>Send</strong> on a new estimate. Edit per-bid before sending.
        </div>

        <div className="m-section-h">Default cover note</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12}}>
            <div style={{fontSize:13, color:'#1c1816', lineHeight:1.55}}>
              Hi <span style={{padding:'1px 6px', background:'rgba(217,144,74,.10)', color:'#b46e2c', borderRadius:4, fontSize:12, fontWeight:600}}>{'{first_name}'}</span>, here's the estimate for <span style={{padding:'1px 6px', background:'rgba(217,144,74,.10)', color:'#b46e2c', borderRadius:4, fontSize:12, fontWeight:600}}>{'{project_name}'}</span>. Happy to walk through line by line — text or call any time.
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:10, paddingTop:8, borderTop:'1px solid #f5f1ec', fontSize:11}}>
              <span style={{color:'#8a8278'}}>2 tokens · 188 chars</span>
              <span style={{color:'#b46e2c', fontWeight:600}}>Edit</span>
            </div>
          </div>
        </div>

        <div className="m-section-h">Follow-ups</div>
        <div className="m-list-inset">
          <MRow leading={MI.bell} leadingTone="accent" headline="Auto-nudge schedule" supporting="3 days · then 7 days" trailing={<span className="m-pill" data-tone="accent">on</span>}/>
          <MRow leading={MI.send} headline="Read-receipt notifications" supporting="Push me when the client opens it" trailing={<span className="m-pill" data-tone="accent">on</span>}/>
          <MRow leading={MI.cal} headline="Auto-expire after" supporting="30 days · then status \u2192 lost" trailing="30d"/>
        </div>

        <div className="m-section-h">PDF</div>
        <div className="m-list-inset">
          <MRow leading={MI.lock} headline="Password protection" supporting="Required for institutional clients" trailing={<span className="m-pill">off</span>}/>
          <MRow leading={MI.layers} headline="Include line-item breakdown" supporting="Materials, labor, overhead, margin" trailing={<span className="m-pill" data-tone="accent">on</span>}/>
          <MRow leading={MI.cam} headline="Cover image" supporting="Default: company logo on warm header"/>
        </div>

        <div className="m-section-h">Numbering</div>
        <div className="m-list-inset">
          <MRow leading={MI.doc} headline="Estimate number" supporting="EST-2026-184 (auto)" trailing="Auto"/>
          <MRow leading={MI.$} headline="Invoice number" supporting="INV-2026-184 (auto)" trailing="Auto"/>
        </div>

        <div className="m-btn-stack" style={{margin:'18px 0 24px'}}>
          <button className="m-btn" data-variant="primary">Save defaults</button>
        </div>
      </div>
    </div>
  );
}

// ─── C · Schedule · empty new-assignment + edit existing ─────
function ScheduleEmptyCreate() {
  return (
    <div className="m">
      <div style={{height:52, padding:'8px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #e8e3db'}}>
        <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:14, color:'#5b544c'}}>Cancel</button>
        <div style={{flex:1, fontSize:17, fontWeight:600, textAlign:'center'}}>New assignment</div>
        <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:14, color:'#aea69a', fontWeight:600}}>Save</button>
      </div>

      {/* Step indicator */}
      <div style={{display:'flex', gap:6, padding:'10px 16px 6px'}}>
        {['Project', 'Crew', 'Time'].map((s, i) => (
          <div key={s} style={{flex:1}}>
            <div style={{height:3, background: i === 0 ? '#d9904a' : '#e8e3db', borderRadius:2}}/>
            <div style={{fontSize:10, color: i === 0 ? '#b46e2c' : '#8a8278', fontWeight:600, marginTop:4, textTransform:'uppercase', letterSpacing:'.06em'}}>{s}</div>
          </div>
        ))}
      </div>

      {/* Project picker active */}
      <div className="m-body">
        <div className="m-section-h">Pick a project</div>
        <div style={{padding:'0 16px 8px'}}>
          <div style={{height:42, padding:'0 12px', background:'#f7f4ef', borderRadius:12, display:'flex', alignItems:'center', gap:8}}>
            <span style={{color:'#8a8278'}}>{MI.search}</span>
            <span style={{flex:1, fontSize:14, color:'#aea69a'}}>Search active projects</span>
          </div>
        </div>

        <div className="m-section-h">Recent</div>
        <div style={{padding:'0 16px', display:'flex', flexDirection:'column', gap:6}}>
          {[
            { n:'Hillcrest Mews — Phase 4', a:'4820 Crestline · Day 18', t:'#E8A86B', hot:true },
            { n:'Aspen Ridge Townhomes',     a:'88 Aspen Ridge · Day 6',  t:'#A05A33' },
            { n:'Greenwillow Senior Living', a:'1100 Greenwillow · Day 1',t:'#7A8C6F' },
          ].map(p => (
            <button key={p.n} style={{padding:'12px 14px', background:'#fff', border:`1.5px solid ${p.hot ? '#d9904a' : '#e8e3db'}`, borderRadius:12, display:'flex', alignItems:'center', gap:12, fontFamily:'inherit', textAlign:'left'}}>
              <span style={{width:3, alignSelf:'stretch', background:p.t, borderRadius:2}}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13.5, fontWeight:600}}>{p.n}</div>
                <div style={{fontSize:11.5, color:'#8a8278', marginTop:1}}>{p.a}</div>
              </div>
              {p.hot && <span style={{fontSize:9, fontWeight:700, color:'#b46e2c', letterSpacing:'.06em'}}>SELECTED</span>}
            </button>
          ))}
        </div>

        <div style={{padding:'14px 16px 0'}}>
          <button style={{padding:'12px', background:'transparent', border:'1.5px dashed #d6cdbe', borderRadius:12, color:'#5b544c', fontFamily:'inherit', fontSize:13, fontWeight:500, width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
            {MI.plus} Create new project
          </button>
        </div>

        <div style={{margin:'14px 16px 0', padding:'10px 12px', background:'rgba(217,144,74,.06)', borderRadius:10, fontSize:11.5, color:'#5b544c', display:'flex', gap:8}}>
          <span style={{color:'#d9904a'}}>{MI.spark}</span>
          <span>We'll pre-fill the rest from the project's takeoff and Friday's capacity. Adjust on the next step.</span>
        </div>
      </div>
    </div>
  );
}

function ScheduleAssignmentEdit() {
  return (
    <div className="m" style={{position:'relative', background:'#f5f1ec'}}>
      {/* dim base */}
      <div style={{flex:1, padding:'18px 20px', opacity:.3}}>
        <div style={{fontSize:30, fontWeight:700, letterSpacing:'-0.02em'}}>Schedule</div>
      </div>
      <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.45)'}}/>
      {/* sheet */}
      <div className="m-sheet" style={{position:'absolute', left:0, right:0, bottom:0}}>
        <div className="m-sheet-grabber"/>
        <div className="m-sheet-header" style={{flexDirection:'column', alignItems:'flex-start', gap:4}}>
          <div style={{fontSize:11, fontWeight:600, color:'#b46e2c', letterSpacing:'.08em', textTransform:'uppercase'}}>Tue Apr 29 · 7:00 \u2013 3:30</div>
          <div className="m-sheet-title">Hillcrest \u00b7 EPS east</div>
        </div>
        <div className="m-sheet-body" style={{padding:'8px 0 16px'}}>
          {/* Inline crew summary */}
          <div style={{padding:'0 16px 10px'}}>
            <div style={{padding:'12px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, display:'flex', alignItems:'center', gap:10}}>
              <div style={{display:'flex'}}>
                {[{n:'AC', t:'1'},{n:'ML', t:'2'},{n:'TR', t:'5'}].map((c, i) => (
                  <div key={c.n} className="m-avatar" data-tone={c.t} data-size="sm" style={{marginLeft: i === 0 ? 0 : -8, border:'2px solid #fff'}}>{c.n}</div>
                ))}
              </div>
              <div style={{flex:1, fontSize:12, color:'#5b544c'}}>3 crew \u00b7 ~8.9 crew-hrs</div>
              <button style={{padding:'5px 10px', background:'transparent', border:'1px solid #e8e3db', borderRadius:7, fontSize:11, color:'#5b544c', fontFamily:'inherit'}}>Edit crew</button>
            </div>
          </div>

          <div className="m-list-inset">
            <MRow leading={MI.edit} leadingTone="accent" headline="Edit details" supporting="Crew, scope, time"/>
            <MRow leading={MI.cal} leadingTone="blue" headline="Move to another day" supporting="Drag on the week view or pick"/>
            <MRow leading={MI.bell} headline="Notify crew of change" supporting="Push + SMS to 3"/>
            <MRow leading={MI.layers} headline="Duplicate to Wed Apr 30"/>
          </div>

          <div style={{padding:'12px 16px 0'}}>
            <div className="m-list-inset" style={{margin:0}}>
              <MRow leading={MI.close} leadingTone="red" headline="Cancel assignment" supporting="Frees the crew \u2014 they're notified"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── D · Rentals catalog · select mode ────────────────────────
function RentalsCatalogSelect() {
  const items = [
    { n:'Scaffold A \u2014 24\u00d78', tag:'SCF-001', cat:'Scaffolding', s:'available', selected:true },
    { n:'Scaffold C \u2014 18\u00d78', tag:'SCF-003', cat:'Scaffolding', s:'available', selected:true },
    { n:'Mixer M-184',              tag:'MIX-184', cat:'Power',       s:'available', selected:true },
    { n:'Mixer M-090',              tag:'MIX-090', cat:'Power',       s:'available', selected:false },
    { n:'Sprayer (HVLP)',           tag:'SPR-005', cat:'Tools',       s:'available', selected:false },
  ];
  return (
    <div className="m">
      {/* Select-mode top bar */}
      <div style={{height:52, padding:'8px 12px 8px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #e8e3db', background:'#fff'}}>
        <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:14, color:'#5b544c'}}>Cancel</button>
        <div style={{flex:1, fontSize:15, fontWeight:600}}>3 selected</div>
        <button style={{background:'#f7f4ef', border:'none', borderRadius:8, padding:'6px 10px', fontFamily:'inherit', fontSize:12, fontWeight:600, color:'#5b544c'}}>Select all 3</button>
      </div>

      {/* Available only filter chip — implicit */}
      <div style={{padding:'8px 16px 8px', borderBottom:'1px solid #e8e3db', fontSize:11, color:'#8a8278'}}>
        Showing 5 available assets \u00b7 9 in use hidden
      </div>

      <div className="m-body">
        {items.map(it => (
          <div key={it.tag} style={{margin:'10px 16px 0', background:'#fff', border: it.selected ? '1.5px solid #d9904a' : '1px solid #e8e3db', borderRadius:12, padding:'12px 14px', display:'flex', alignItems:'center', gap:12}}>
            {/* checkbox */}
            <div style={{width:22, height:22, borderRadius:6, flexShrink:0, background: it.selected ? '#d9904a' : 'transparent', border: it.selected ? 'none' : '1.5px solid #d6cdbe', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'}}>
              {it.selected && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>}
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:14, fontWeight:600}}>{it.n}</div>
              <div style={{fontSize:11, color:'#8a8278', marginTop:1, fontFeatureSettings:'"tnum"'}}>{it.tag} \u00b7 {it.cat}</div>
            </div>
            <span className="m-pill" data-tone="green" data-dot="true">avail</span>
          </div>
        ))}
        <div style={{height:80}}/>
      </div>

      {/* Sticky bottom action */}
      <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'12px 16px calc(env(safe-area-inset-bottom, 0) + 14px)', background:'#fff', borderTop:'1px solid #e8e3db', display:'flex', gap:10, alignItems:'center'}}>
        <div style={{flex:1}}>
          <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase'}}>Bill estimate</div>
          <div style={{fontSize:18, fontWeight:700, fontFeatureSettings:'"tnum"', marginTop:1}}>$5,442 <span style={{fontSize:11, color:'#8a8278', fontWeight:500}}>\u00b7 27d</span></div>
        </div>
        <button style={{padding:'12px 18px', background:'#d9904a', color:'#fff', border:'none', borderRadius:11, fontFamily:'inherit', fontSize:14, fontWeight:600}}>Dispatch 3</button>
      </div>
    </div>
  );
}

// ─── E · Settings · generic Connect screen ────────────────────
function SettingsConnect() {
  return (
    <div className="m" style={{background:'#fff'}}>
      <div style={{padding:'10px 16px', flexShrink:0, display:'flex'}}>
        <button style={{width:36, height:36, background:'transparent', border:'none', color:'#1c1816', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.back}</button>
      </div>
      <div className="m-body" style={{padding:'8px 20px 20px'}}>
        {/* Header */}
        <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:18}}>
          <div style={{width:56, height:56, background:'#635bff', borderRadius:13, color:'#fff', fontSize:14, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', letterSpacing:'-.02em'}}>S</div>
          <div>
            <div style={{fontSize:11, color:'#8a8278', fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase'}}>Integration</div>
            <div style={{fontSize:20, fontWeight:700, letterSpacing:'-0.02em', marginTop:2}}>Connect Stripe</div>
          </div>
        </div>

        <div style={{fontSize:14, color:'#5b544c', lineHeight:1.55, marginBottom:16}}>
          Accept card, ACH, and wire payments on accepted bids and final invoices. We never see card numbers.
        </div>

        {/* Benefits */}
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {[
            { i: MI.bolt,   t:'Pay buttons on invoices',  s:'Embedded in the PDF + web link \u2014 one tap pays.' },
            { i: MI.$,      t:'Auto deposit collection',  s:'25/35/30/10 schedules \u2014 client pays each milestone.' },
            { i: MI.sync,   t:'Synced to QuickBooks',     s:'Each paid invoice books as cash + matches the deposit.' },
            { i: MI.lock,   t:'Read-only on your end',    s:'Stripe holds the funds; we only see status events.' },
          ].map(b => (
            <div key={b.t} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
              <div style={{width:26, height:26, borderRadius:7, background:'rgba(99,91,255,.10)', color:'#635bff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>{React.cloneElement(b.i, {width:14, height:14})}</div>
              <div>
                <div style={{fontSize:13, fontWeight:600, color:'#1c1816'}}>{b.t}</div>
                <div style={{fontSize:11.5, color:'#8a8278', marginTop:1, lineHeight:1.4}}>{b.s}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Fees disclosure */}
        <div style={{marginTop:16, padding:'10px 12px', background:'#f7f4ef', borderRadius:10, fontSize:11, color:'#5b544c', lineHeight:1.5}}>
          <strong style={{color:'#1c1816'}}>Fees:</strong> 2.9% + 30\u00a2 per card payment, 0.8% on ACH (capped at $5). No platform fee from Sitelayer.
        </div>

        <div className="m-btn-stack" style={{marginTop:18}}>
          <button className="m-btn" style={{background:'#635bff'}}>Continue to Stripe</button>
          <button className="m-btn" data-variant="ghost">Learn more</button>
        </div>

        <div style={{marginTop:14, fontSize:11, color:'#aea69a', textAlign:'center'}}>
          You'll be redirected to Stripe to sign in or create an account.
        </div>
      </div>
    </div>
  );
}

// ─── F · Settings · pricing item · new / edit ────────────────
function SettingsPricingItemNew() {
  return (
    <div className="m">
      <div style={{height:52, padding:'8px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #e8e3db'}}>
        <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:14, color:'#5b544c'}}>Cancel</button>
        <div style={{flex:1, fontSize:17, fontWeight:600, textAlign:'center'}}>New item</div>
        <button style={{background:'transparent', border:'none', fontFamily:'inherit', fontSize:14, color:'#d9904a', fontWeight:600}}>Save</button>
      </div>
      <div className="m-body">
        <div className="m-section-h">Basics</div>
        <div className="m-list-inset">
          <div style={{padding:'12px 14px', borderBottom:'1px solid #e8e3db'}}>
            <div style={{fontSize:11, color:'#8a8278', fontWeight:500, marginBottom:4}}>Code</div>
            <div style={{fontSize:14, fontWeight:500, color:'#1c1816', fontFamily:'"Geist Mono", monospace'}}>STN-LIME</div>
          </div>
          <div style={{padding:'12px 14px', borderBottom:'1px solid #e8e3db'}}>
            <div style={{fontSize:11, color:'#8a8278', fontWeight:500, marginBottom:4}}>Name</div>
            <div style={{fontSize:14, fontWeight:500, color:'#1c1816'}}>Limestone veneer · split-face</div>
          </div>
          <div style={{padding:'12px 14px', display:'flex', gap:14}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11, color:'#8a8278', fontWeight:500, marginBottom:4}}>Scope</div>
              <div style={{fontSize:14, fontWeight:500, color:'#1c1816'}}>Stone</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:11, color:'#8a8278', fontWeight:500, marginBottom:4}}>Unit</div>
              <div style={{fontSize:14, fontWeight:500, color:'#1c1816'}}>sf</div>
            </div>
          </div>
        </div>

        <div className="m-section-h">Pricing</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14}}>
              <div>
                <div style={{fontSize:10, color:'#8a8278', textTransform:'uppercase', fontWeight:600, letterSpacing:'.06em'}}>Cost</div>
                <div style={{height:44, padding:'0 10px', background:'#f7f4ef', borderRadius:10, display:'flex', alignItems:'center', fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:5}}>$ <span style={{flex:1, marginLeft:4}}>18.40</span></div>
              </div>
              <div>
                <div style={{fontSize:10, color:'#8a8278', textTransform:'uppercase', fontWeight:600, letterSpacing:'.06em'}}>Sell</div>
                <div style={{height:44, padding:'0 10px', background:'#fff', border:'1.5px solid #d9904a', borderRadius:10, display:'flex', alignItems:'center', fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:5}}>$ <span style={{flex:1, marginLeft:4}}>29.80</span></div>
              </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 12px', background:'rgba(44,138,85,.06)', borderRadius:8}}>
              <span style={{fontSize:11, color:'#5b544c'}}>Auto-calc margin</span>
              <span style={{fontSize:18, fontWeight:700, color:'#2c8a55', fontFeatureSettings:'"tnum"'}}>38.3%</span>
            </div>
          </div>
        </div>

        <div className="m-section-h">Suggestion</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'12px 14px', background:'#fff', border:'1px solid #e8e3db', borderLeft:'3px solid #d9904a', borderRadius:10}}>
            <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:4}}>
              <span style={{color:'#d9904a'}}>{MI.spark}</span>
              <span style={{fontSize:10, fontWeight:700, color:'#b46e2c', letterSpacing:'.08em', textTransform:'uppercase'}}>From past wins</span>
            </div>
            <div style={{fontSize:13, color:'#1c1816', lineHeight:1.45}}>
              Two stucco shops in your region sell limestone veneer at <strong>$32.50/sf</strong>. Want to match?
            </div>
            <button style={{marginTop:8, padding:'6px 12px', background:'#1c1816', color:'#fff', border:'none', borderRadius:7, fontSize:12, fontWeight:600, fontFamily:'inherit'}}>Apply $32.50</button>
          </div>
        </div>

        <div style={{height:24}}/>
      </div>
    </div>
  );
}

// ─── G · Settings · team member sheet ────────────────────────
function SettingsTeamMember() {
  return (
    <div className="m" style={{position:'relative', background:'#f5f1ec'}}>
      <div style={{flex:1, opacity:.3, padding:'14px 20px'}}>
        <div style={{fontSize:18, fontWeight:600}}>Team</div>
      </div>
      <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.45)'}}/>
      <div className="m-sheet" style={{position:'absolute', left:0, right:0, bottom:0, maxHeight:'85%'}}>
        <div className="m-sheet-grabber"/>
        <div className="m-sheet-header">
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div className="m-avatar" data-tone="1" data-size="lg">AC</div>
            <div>
              <div className="m-sheet-title">Ana Castillo</div>
              <div style={{fontSize:11, color:'#8a8278'}}>Foreman \u00b7 2y 3mo</div>
            </div>
          </div>
          <button style={{background:'#f7f4ef', border:'none', width:32, height:32, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.close}</button>
        </div>
        <div className="m-sheet-body" style={{padding:'12px 0 16px'}}>
          {/* Quick stats */}
          <div style={{padding:'0 16px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:14}}>
            <div style={{padding:'10px', background:'#fff', border:'1px solid #e8e3db', borderRadius:10, textAlign:'center'}}>
              <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase'}}>Rate</div>
              <div style={{fontSize:14, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:2}}>$42/h</div>
            </div>
            <div style={{padding:'10px', background:'#fff', border:'1px solid #e8e3db', borderRadius:10, textAlign:'center'}}>
              <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase'}}>This week</div>
              <div style={{fontSize:14, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:2}}>38h</div>
            </div>
            <div style={{padding:'10px', background:'#fff', border:'1px solid #e8e3db', borderRadius:10, textAlign:'center'}}>
              <div style={{fontSize:10, color:'#8a8278', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase'}}>YTD</div>
              <div style={{fontSize:14, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:2}}>584h</div>
            </div>
          </div>

          <div className="m-list-inset">
            <MRow leading={MI.user} headline="Edit profile" supporting="Name, email, phone"/>
            <MRow leading={MI.users} leadingTone="accent" headline="Role + permissions" supporting="Foreman \u00b7 own crew + own time"/>
            <MRow leading={MI.$} leadingTone="green" headline="Pay rate" supporting="$42/h \u00b7 OT 1.5\u00d7"/>
            <MRow leading={MI.bell} headline="Notification preferences" supporting="Schedule pushes \u00b7 SMS fallback"/>
            <MRow leading={MI.proj} headline="Assigned projects" supporting="3 active \u00b7 lead on Hillcrest"/>
          </div>

          <div style={{padding:'14px 16px 0'}}>
            <div className="m-list-inset" style={{margin:0}}>
              <MRow leading={MI.alert} leadingTone="amber" headline="Suspend access" supporting="Keeps record, blocks login"/>
              <MRow leading={MI.trash} leadingTone="red" headline="Remove from team" supporting="Permanent \u00b7 archives all data"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── H · System state · version stale ─────────────────────────
function StateStale() {
  return (
    <div className="m" style={{background:'#f7f4ef', padding:'40px 28px 24px', display:'flex', flexDirection:'column'}}>
      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
        <div style={{width:80, height:80, background:'rgba(47,111,181,.10)', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18}}>
          <span style={{color:'#2f6fb5'}}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a9 9 0 11-3-6.7M21 4v5h-5"/></svg></span>
        </div>
        <div style={{fontSize:20, fontWeight:600, letterSpacing:'-0.01em', marginBottom:6}}>New version available</div>
        <div style={{fontSize:13, color:'#5b544c', lineHeight:1.55, maxWidth:280, marginBottom:22}}>
          Sitelayer updated while you had this page open. Reload to get the latest \u2014 we'll save your draft.
        </div>
        <div className="m-btn-stack" style={{width:'100%', maxWidth:300}}>
          <button className="m-btn" data-variant="primary">Reload now</button>
          <button className="m-btn" data-variant="ghost">Read what's new</button>
        </div>
      </div>
      <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12, fontSize:11, color:'#5b544c', display:'flex', alignItems:'flex-start', gap:8, fontFamily:'"Geist Mono", monospace'}}>
        <span style={{flex:1}}>v3.2.1 \u2192 v3.3.0 \u00b7 invoicing + crew chat</span>
        <span style={{color:'#aea69a'}}>build 4280</span>
      </div>
    </div>
  );
}

// ─── I · Onboarding · pricing template fallback ──────────────
function OnbPricingTemplate() {
  const templates = [
    { c:'STUCCO', t:'Stucco / EIFS', n:47, sample:['EPS 1.5"', 'Basecoat', 'Finish coat', 'Stone'], tone:'#E8A86B', selected:true },
    { c:'FRAME',  t:'Framing',       n:38, sample:['Studs', 'Sheathing', 'Headers', 'Joists'], tone:'#A05A33' },
    { c:'DRY',    t:'Drywall',       n:32, sample:['Hang', 'Tape', 'Mud', 'Texture'], tone:'#7A8C6F' },
  ];
  return (
    <div className="m" style={{background:'#f7f4ef'}}>
      {/* progress */}
      <div style={{padding:'10px 16px 8px', display:'flex', alignItems:'center', gap:10}}>
        <div style={{flex:1, height:3, background:'#e8e3db', borderRadius:2, overflow:'hidden'}}>
          <div style={{width:'60%', height:'100%', background:'#d9904a', borderRadius:2}}/>
        </div>
        <span style={{fontSize:11, color:'#8a8278', fontWeight:600, fontFeatureSettings:'"tnum"'}}>6<span style={{opacity:.45}}> / 10</span></span>
        <button style={{background:'transparent', border:'none', color:'#8a8278', fontSize:12, fontWeight:500}}>Skip</button>
      </div>

      <div style={{flex:1, padding:'14px 22px 20px', overflow:'auto'}}>
        <div style={{fontSize:10, fontWeight:700, color:'#b46e2c', letterSpacing:'.10em', textTransform:'uppercase', marginBottom:8}}>Step 6 \u00b7 Pricing</div>
        <div style={{fontSize:22, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.15}}>Start with a template.</div>
        <div style={{fontSize:13, color:'#5b544c', marginTop:8, lineHeight:1.5}}>Since you skipped QuickBooks, here are starter pricing books by trade. Pick one and edit later \u2014 better than an empty list.</div>

        <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:10}}>
          {templates.map(t => (
            <div key={t.c} style={{padding:'14px', background:'#fff', border: t.selected ? '1.5px solid #d9904a' : '1px solid #e8e3db', borderRadius:12, position:'relative'}}>
              <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
                <span style={{width:36, background:t.tone, color:'#fff', fontSize:9, fontWeight:700, letterSpacing:'.05em', padding:'4px 0', borderRadius:5, textAlign:'center'}}>{t.c}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13.5, fontWeight:600}}>{t.t}</div>
                  <div style={{fontSize:11, color:'#8a8278', fontFeatureSettings:'"tnum"'}}>{t.n} items \u00b7 priced at AB regional median</div>
                </div>
                {t.selected && (
                  <div style={{width:22, height:22, borderRadius:11, background:'#d9904a', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
                  </div>
                )}
              </div>
              <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                {t.sample.map(s => (
                  <span key={s} style={{padding:'3px 8px', background:'#f7f4ef', borderRadius:999, fontSize:10.5, color:'#5b544c'}}>{s}</span>
                ))}
                <span style={{padding:'3px 8px', fontSize:10.5, color:'#8a8278'}}>+{t.n - t.sample.length} more</span>
              </div>
            </div>
          ))}
        </div>

        <button style={{marginTop:12, padding:'12px', background:'transparent', border:'1.5px dashed #d6cdbe', borderRadius:12, color:'#5b544c', fontFamily:'inherit', fontSize:13, fontWeight:500, width:'100%'}}>
          Start from scratch instead
        </button>
      </div>

      <div style={{padding:'10px 16px calc(env(safe-area-inset-bottom, 0) + 14px)', borderTop:'1px solid #e8e3db', background:'#f7f4ef'}}>
        <button className="m-btn" data-variant="primary" style={{height:48}}>Use Stucco template \u00b7 47 items</button>
      </div>
    </div>
  );
}

// ─── J · Onboarding · sample project landing ─────────────────
function OnbProjectSample() {
  return (
    <div className="m">
      {/* Sample mode banner */}
      <div style={{padding:'8px 16px', background:'#1c1816', color:'#f3ecdf', fontSize:11, fontWeight:500, display:'flex', alignItems:'center', gap:8, flexShrink:0}}>
        <span style={{padding:'2px 7px', background:'#d9904a', color:'#fff', borderRadius:4, fontSize:9, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase'}}>Sample</span>
        <span style={{flex:1}}>Maple Lane Townhomes \u00b7 pre-loaded so you can poke around</span>
        <button style={{padding:'4px 8px', background:'transparent', border:'1px solid #4a3f33', color:'#f3ecdf', borderRadius:6, fontSize:10, fontFamily:'inherit'}}>Exit</button>
      </div>

      {/* Header */}
      <div style={{height:140, background:'linear-gradient(135deg, #E8A86B 0%, #C77B4F 100%)', position:'relative', padding:'12px 16px', color:'#fff', flexShrink:0}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <button style={{width:36, height:36, background:'rgba(255,255,255,.25)', borderRadius:18, border:'none', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.back}</button>
          <button style={{width:36, height:36, background:'rgba(255,255,255,.25)', borderRadius:18, border:'none', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>{MI.more}</button>
        </div>
        <div style={{position:'absolute', bottom:12, left:16, right:16}}>
          <div style={{fontSize:11, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', opacity:.85}}>Active \u00b7 D11 of D28</div>
          <div style={{fontSize:20, fontWeight:700, letterSpacing:'-0.01em', lineHeight:1.1, marginTop:2}}>Maple Lane Townhomes</div>
          <div style={{fontSize:12, opacity:.8, marginTop:2}}>418 Maple Ln \u00b7 Davis Stucco LLC (sample)</div>
        </div>
      </div>

      <div className="m-body">
        {/* Sample tour stripe */}
        <div style={{margin:'14px 16px 0', padding:'12px 14px', background:'rgba(217,144,74,.10)', borderLeft:'3px solid #d9904a', borderRadius:10, fontSize:12, color:'#5b544c', lineHeight:1.5, display:'flex', gap:10}}>
          <span style={{color:'#d9904a', flexShrink:0}}>{MI.spark}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:11, fontWeight:700, color:'#b46e2c', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:2}}>Tour 1 of 6</div>
            <span>This is what a project record looks like. Everything below is read-only \u2014 nothing here saves.</span>
          </div>
        </div>

        <div className="m-kpi-row m-kpi-row-3" style={{marginTop:14}}>
          <MKpi label="Done" value="62" unit="%"/>
          <MKpi label="Margin" value="34" unit="%" meta="vs 32% bid" metaTone="green"/>
          <MKpi label="Days" value="11" meta="of 28"/>
        </div>

        <div className="m-section-h">Today on site \u00b7 demo crew</div>
        <div className="m-list-inset">
          <MRow leading="AC" leadingTone="accent" headline="Ana Castillo" supporting="Sample lead \u00b7 EPS east"/>
          <MRow leading="ML" leadingTone="blue" headline="Marcus Lee" supporting="Sample crew"/>
          <MRow leading="TR" leadingTone="amber" headline="Tom\u00e1s Reyes" supporting="Sample crew"/>
        </div>

        <div style={{padding:'18px 16px 8px', display:'flex', flexDirection:'column', gap:8}}>
          <button className="m-btn" data-variant="primary">Next tour stop \u2192 Today on site</button>
          <button className="m-btn" data-variant="ghost">Exit sample \u00b7 create my first project</button>
        </div>
      </div>
    </div>
  );
}

// ─── K · Profile · account ───────────────────────────────────
function ProfileAccount() {
  return (
    <div className="m">
      <MTopBar back title="Profile" action="edit" actionIcon={MI.edit}/>
      <div className="m-body">
        {/* Avatar block */}
        <div style={{padding:'18px 20px 14px', textAlign:'center', borderBottom:'1px solid #e8e3db'}}>
          <div className="m-avatar" data-size="lg" data-tone="accent" style={{width:80, height:80, fontSize:24, margin:'0 auto 12px'}}>SD</div>
          <div style={{fontSize:20, fontWeight:700, letterSpacing:'-0.01em'}}>Sarah Davis</div>
          <div style={{fontSize:13, color:'#8a8278', marginTop:2}}>Owner \u00b7 Davis Stucco LLC</div>
          <div style={{marginTop:10, display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', background:'rgba(44,138,85,.10)', borderRadius:999}}>
            <span style={{width:6, height:6, borderRadius:3, background:'#2c8a55'}}/>
            <span style={{fontSize:11, color:'#2c8a55', fontWeight:600}}>Pro plan \u00b7 billed yearly</span>
          </div>
        </div>

        <div className="m-section-h">Account</div>
        <div className="m-list-inset">
          <MRow leading={MI.user} headline="Name" trailing="Sarah Davis"/>
          <MRow leading={MI.bell} headline="Email" trailing="sarah@daviss.co"/>
          <MRow leading={MI.users} leadingTone="blue" headline="Phone" trailing="(403) 555\u20111840"/>
          <MRow leading={MI.lock} headline="Password" trailing="Last changed 4mo ago"/>
          <MRow leading={MI.qr} leadingTone="accent" headline="Two-factor auth" trailing={<span className="m-pill" data-tone="green" data-dot="true">on</span>}/>
        </div>

        <div className="m-section-h">Devices (3 signed in)</div>
        <div className="m-list-inset">
          <MRow leading={MI.proj} leadingTone="accent" headline="iPhone 15 \u00b7 this device" supporting="Calgary \u00b7 now"/>
          <MRow leading={MI.box} headline="iPad Pro" supporting="Office \u00b7 2 days ago"/>
          <MRow leading={MI.layers} headline="Desktop \u00b7 Chrome" supporting="Office \u00b7 4 hours ago"/>
        </div>

        <div className="m-section-h">Billing</div>
        <div className="m-list-inset">
          <MRow leading={MI.$} leadingTone="green" headline="Plan" supporting="Pro \u00b7 $89/mo billed yearly" trailing="Manage"/>
          <MRow leading={MI.receipt} headline="Invoices" supporting="9 paid \u00b7 all current"/>
          <MRow leading={MI.doc} headline="Payment method" supporting="Visa \u22ef 4218"/>
        </div>

        <div style={{padding:'16px', textAlign:'center'}}>
          <button style={{background:'transparent', border:'none', color:'#c0463d', fontSize:13, fontWeight:600, fontFamily:'inherit'}}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

// ─── L · Help + support ───────────────────────────────────────
function HelpSupport() {
  return (
    <div className="m">
      <MTopBar back title="Help"/>
      <div className="m-body">
        {/* Search */}
        <div style={{padding:'10px 16px 14px'}}>
          <div style={{height:46, padding:'0 14px', background:'#f7f4ef', borderRadius:12, display:'flex', alignItems:'center', gap:10}}>
            <span style={{color:'#8a8278'}}>{MI.search}</span>
            <span style={{flex:1, fontSize:14, color:'#aea69a'}}>Ask anything \u2014 we answer with examples from your data</span>
          </div>
        </div>

        {/* Top issues */}
        <div className="m-section-h">Top this week</div>
        <div className="m-list-inset">
          <MRow leading={MI.spark} leadingTone="accent" headline="How does loaded labor cost work?" supporting="Burdened \$/hr in your bids"/>
          <MRow leading={MI.cal} leadingTone="blue" headline="Setting up a geofence" supporting="Auto clock-in around a site"/>
          <MRow leading={MI.$} leadingTone="green" headline="Sending an invoice from a project" supporting="When + how to bill"/>
          <MRow leading={MI.sync} headline="QBO not syncing today" supporting="Common auth fix"/>
        </div>

        {/* Contact */}
        <div className="m-section-h">Talk to a human</div>
        <div className="m-list-inset">
          <MRow leading={MI.send} leadingTone="accent" headline="Chat \u00b7 Pro support" supporting="Avg reply 8 min \u00b7 6 AM \u2013 8 PM MT"/>
          <MRow leading={MI.cam} headline="Book a 20-min screen share" supporting="Available Tuesdays + Thursdays"/>
          <MRow leading={MI.doc} headline="Email \u00b7 help@sitelayer.co" supporting="Reply within one business day"/>
        </div>

        {/* What's new */}
        <div className="m-section-h">What's new</div>
        <div style={{padding:'0 16px'}}>
          <div style={{padding:'14px', background:'#fff', border:'1px solid #e8e3db', borderRadius:12}}>
            <div style={{fontSize:10, fontWeight:700, color:'#b46e2c', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:4}}>v3.3.0 \u00b7 May 26</div>
            <div style={{fontSize:13.5, fontWeight:600, marginBottom:6}}>Invoicing + crew chat</div>
            <div style={{fontSize:12, color:'#5b544c', lineHeight:1.5}}>Send final invoices straight from Done. New crew chat thread per project \u2014 photos auto-attach to the right log.</div>
            <button style={{marginTop:10, fontSize:12, color:'#b46e2c', fontWeight:600, background:'transparent', border:'none', fontFamily:'inherit', padding:0}}>Read changelog \u2192</button>
          </div>
        </div>

        <div style={{padding:'18px 20px 30px', textAlign:'center', fontSize:11, color:'#aea69a'}}>
          v3.3.0 \u00b7 Build 4317 \u00b7 <span style={{color:'#8a8278', textDecoration:'underline'}}>System status</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  AttentionSnoozeSheet, SettingsEstimates,
  ScheduleEmptyCreate, ScheduleAssignmentEdit,
  RentalsCatalogSelect,
  SettingsConnect, SettingsPricingItemNew, SettingsTeamMember,
  StateStale,
  OnbPricingTemplate, OnbProjectSample,
  ProfileAccount, HelpSupport,
});
