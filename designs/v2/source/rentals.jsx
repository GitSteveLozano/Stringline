/* global React */

// ============================================================
// RENTALS · V2 (Section 20)
// Inventory management — equipment as a side-revenue line.
// Catalog · Asset detail · Scan · Dispatch · Return ·
// Utilization · Maintenance · Service log.
// ============================================================

function V2Sb({ time = '10:14' }) {
  return (
    <div style={{height:32, padding:'10px 18px 0', display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'JetBrains Mono, monospace', fontSize:12, fontWeight:500, flexShrink:0, color:'var(--v2-ink)'}}>
      <span>{time}</span>
      <span style={{display:'flex', gap:6, alignItems:'center'}}>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor"><rect x="0" y="6" width="3" height="4"/><rect x="5" y="4" width="3" height="6"/><rect x="10" y="2" width="3" height="8"/><rect x="15" y="0" width="3" height="10"/></svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="20" height="8"/><rect x="23" y="4" width="2" height="4" fill="currentColor"/><rect x="3" y="4" width="14" height="4" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

// =====================================================================
// 1 · CATALOG
// =====================================================================
function V2RentCatalog() {
  const items = [
    { tag:'SCF-001', l:'SCAFFOLD A · 24×8',  cat:'SCAFFOLDING', status:'OUT',     where:'HILLCREST · D12/32',  rate:'$85/D' },
    { tag:'SCF-003', l:'SCAFFOLD C · 18×8',  cat:'SCAFFOLDING', status:'AVAIL',   where:'YARD',                 rate:'$65/D' },
    { tag:'MIX-184', l:'MIXER M-184',         cat:'POWER',       status:'OUT',     where:'ASPEN · D8/18',        rate:'$120/D' },
    { tag:'MIX-090', l:'MIXER M-090',         cat:'POWER',       status:'AVAIL',   where:'YARD',                 rate:'$120/D' },
    { tag:'SPR-005', l:'HVLP SPRAYER',        cat:'TOOLS',       status:'SERVICE', where:'MAINTENANCE · 2D',     rate:'$40/D' },
    { tag:'TRL-002', l:'TRAILER 16FT',        cat:'TRANSPORT',   status:'OUT',     where:'GREENWILLOW',          rate:'$95/D' },
  ];
  const statusColor = { AVAIL:'var(--v2-good)', OUT:'var(--v2-accent)', SERVICE:'var(--v2-bad)' };
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <div style={{flex:1}}>
          <div className="v2-eyebrow">INVENTORY</div>
          <div className="v2-appbar-title">14 ASSETS</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      {/* Stat strip */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'14px 14px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>OUT</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1}}>9</div>
        </div>
        <div style={{padding:'14px 14px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>REVENUE/D</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1}}>$1,184</div>
        </div>
        <div style={{padding:'14px 14px'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>UTIL · 30D</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1, color:'var(--v2-good)'}}>92<span style={{fontSize:16, color:'var(--v2-ink-3)'}}>%</span></div>
        </div>
      </div>

      <div style={{display:'flex', gap:6, padding:'12px 20px', borderBottom:'2px solid var(--v2-ink)', overflowX:'auto'}}>
        {[{l:'ALL · 14', on:true},{l:'OUT · 9'},{l:'AVAIL · 4'},{l:'SERVICE · 1'}].map(c => (
          <button key={c.l} style={{padding:'8px 12px', background: c.on ? 'var(--v2-ink)' : 'transparent', color: c.on ? 'var(--v2-sand)' : 'var(--v2-ink-3)', border:'2px solid var(--v2-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', whiteSpace:'nowrap'}}>{c.l}</button>
        ))}
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {items.map((it, i) => (
          <button key={i} style={{display:'flex', width:'100%', alignItems:'center', gap:12, padding:'14px 20px', background:'transparent', border:'none', borderBottom:'1px solid var(--v2-line-soft)', textAlign:'left', fontFamily:'var(--v2-font)', cursor:'pointer'}}>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{it.l}</div>
              <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{it.tag} · {it.where} · {it.rate}</div>
            </div>
            <span style={{padding:'4px 8px', background:statusColor[it.status], color: it.status === 'OUT' ? 'var(--v2-accent-ink)' : '#fff', fontFamily:'var(--v2-font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)'}}>{it.status}</span>
          </button>
        ))}
      </div>

      <div style={{padding:'14px 20px', borderTop:'2px solid var(--v2-ink)', display:'flex', gap:8}}>
        <button className="v2-btn ghost" style={{flex:1}}>SCAN TAG</button>
        <button className="v2-btn primary" style={{flex:2}}>SELECT MULTI</button>
      </div>
    </div>
  );
}

// =====================================================================
// 2 · ASSET DETAIL
// =====================================================================
function V2RentAsset() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">SCF-001</div>
          <div className="v2-appbar-title">SCAFFOLD A · 24×8</div>
        </div>
        <button className="v2-iconbtn">⋯</button>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <span style={{padding:'4px 10px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', fontFamily:'var(--v2-font-mono)', fontSize:10, fontWeight:700, letterSpacing:'0.06em', border:'1.5px solid var(--v2-ink)', display:'inline-block'}}>● OUT · DAY 12 OF 32</span>
        <h2 className="v2-h2" style={{marginTop:14}}>Currently at Hillcrest.</h2>
        <div className="v2-mono" style={{marginTop:10, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5, fontSize:12}}>DISPATCHED 4/15 · DUE BACK 5/17 · ANA CASTILLO</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'18px 20px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow">REVENUE TO DATE</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:36, marginTop:4, lineHeight:1}}>$1,020</div>
          <div className="v2-mono" style={{marginTop:6, color:'var(--v2-ink-3)', fontWeight:600, fontSize:10}}>12 DAYS × $85</div>
        </div>
        <div style={{padding:'18px 20px'}}>
          <div className="v2-eyebrow">UTIL · YTD</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:36, marginTop:4, lineHeight:1, color:'var(--v2-good)'}}>87<span style={{fontSize:16, color:'var(--v2-ink-3)'}}>%</span></div>
          <div className="v2-mono" style={{marginTop:6, color:'var(--v2-ink-3)', fontWeight:600, fontSize:10}}>148 OF 170 DAYS</div>
        </div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">QUICK ACTIONS</div></div>
      <div style={{padding:'14px 20px', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">DISPATCH ELSEWHERE</button>
        <button className="v2-btn ghost">RETURN TO YARD</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-bad)', borderColor:'var(--v2-bad)'}}>FLAG FOR SERVICE</button>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">RECENT</div></div>
      {[
        { d:'4/15', l:'DISPATCHED TO HILLCREST', who:'ANA C.' },
        { d:'4/14', l:'RETURNED FROM ASPEN',    who:'MARCO P.' },
        { d:'3/28', l:'SERVICED · NEW PINS',     who:'YARD' },
      ].map((e, i) => (
        <div key={i} className="v2-row">
          <div className="v2-mono" style={{width:42, fontSize:10, fontWeight:700, color:'var(--v2-ink-3)'}}>{e.d}</div>
          <div style={{flex:1}}>
            <div className="v2-mono" style={{fontSize:11, fontWeight:600}}>{e.l}</div>
            <div className="v2-mono" style={{fontSize:9, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{e.who}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// =====================================================================
// 3 · SCAN TAG
// =====================================================================
function V2RentScan() {
  return (
    <div className="v2 v2-screen dark">
      <V2Sb time="10:24"/>
      <div className="v2-appbar" style={{background:'var(--v2-ink)', borderColor:'var(--v2-sand-2)'}}>
        <button className="v2-iconbtn" style={{background:'var(--v2-ink)', color:'var(--v2-sand)', borderColor:'var(--v2-sand)'}}>✕</button>
        <div className="v2-appbar-title" style={{color:'var(--v2-sand)'}}>SCAN TAG</div>
      </div>

      {/* Viewfinder */}
      <div style={{flex:1, background:'#1a1814', position:'relative', overflow:'hidden'}}>
        {/* Frame brackets */}
        <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:200, height:200}}>
          <div style={{position:'absolute', top:0, left:0, width:32, height:32, borderTop:'3px solid var(--v2-accent)', borderLeft:'3px solid var(--v2-accent)'}}/>
          <div style={{position:'absolute', top:0, right:0, width:32, height:32, borderTop:'3px solid var(--v2-accent)', borderRight:'3px solid var(--v2-accent)'}}/>
          <div style={{position:'absolute', bottom:0, left:0, width:32, height:32, borderBottom:'3px solid var(--v2-accent)', borderLeft:'3px solid var(--v2-accent)'}}/>
          <div style={{position:'absolute', bottom:0, right:0, width:32, height:32, borderBottom:'3px solid var(--v2-accent)', borderRight:'3px solid var(--v2-accent)'}}/>
          {/* Mock QR */}
          <div style={{position:'absolute', inset:30, background:'var(--v2-sand)', display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gridTemplateRows:'repeat(8, 1fr)'}}>
            {Array.from({length:64}).map((_, i) => {
              const fill = Math.random() > 0.55;
              return <div key={i} style={{background: fill ? 'var(--v2-ink)' : 'var(--v2-sand)'}}/>;
            })}
          </div>
        </div>

        {/* Hint top */}
        <div style={{position:'absolute', top:24, left:0, right:0, textAlign:'center'}}>
          <div className="v2-mono" style={{fontSize:11, fontWeight:700, color:'var(--v2-sand)', letterSpacing:'0.06em'}}>POINT AT TAG ON ASSET</div>
        </div>
      </div>

      {/* Recognized strip */}
      <div style={{padding:'14px 20px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', borderTop:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:12}}>
        <div style={{width:14, height:14, background:'var(--v2-ink)'}}/>
        <div style={{flex:1}}>
          <div className="v2-mono" style={{fontSize:10, fontWeight:700, letterSpacing:'0.06em'}}>RECOGNIZED · SCF-001</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14, marginTop:3}}>SCAFFOLD A · 24×8</div>
        </div>
      </div>

      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)', background:'var(--v2-ink)', display:'flex', flexDirection:'column', gap:10}}>
        <button className="v2-btn primary">DISPATCH FROM HERE</button>
        <button className="v2-btn ghost" style={{color:'var(--v2-sand)', borderColor:'var(--v2-sand)'}}>RETURN TO YARD</button>
      </div>
    </div>
  );
}

// =====================================================================
// 4 · DISPATCH
// =====================================================================
function V2RentDispatch() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">DISPATCH</div>
      </div>

      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">ASSET</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:24, marginTop:6}}>SCAFFOLD A · 24×8</div>
        <div className="v2-mono" style={{marginTop:4, color:'var(--v2-ink-3)', fontWeight:600, fontSize:11}}>SCF-001 · $85/DAY</div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>TO PROJECT</div>
        <div style={{marginTop:8, padding:'18px 16px', background:'var(--v2-accent)', color:'var(--v2-accent-ink)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:12}}>
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:16}}>HILLCREST PH 4</div>
            <div className="v2-mono" style={{fontSize:11, marginTop:3, fontWeight:600}}>JOHN MARCHETTI · D18/32</div>
          </div>
          <span className="v2-mono" style={{fontSize:14, fontWeight:800}}>▾</span>
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>HANDOFF TO</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:36, height:36, background:'var(--v2-ink)', color:'var(--v2-sand)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:13}}>AC</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:15}}>ANA CASTILLO</div>
            <div className="v2-mono" style={{fontSize:10, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>FOREMAN</div>
          </div>
          <span className="v2-mono" style={{fontSize:14, fontWeight:800}}>▾</span>
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>ESTIMATED RETURN</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)'}}>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:24, fontVariantNumeric:'tabular-nums'}}>MAY 17</div>
          <div className="v2-mono" style={{marginTop:4, color:'var(--v2-ink-3)', fontWeight:600, fontSize:11}}>32 DAYS · ~$2,720 REVENUE</div>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">CONFIRM · DISPATCH NOW</button>
      </div>
    </div>
  );
}

// =====================================================================
// 5 · RETURN (with condition check)
// =====================================================================
function V2RentReturn() {
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div className="v2-appbar-title">RETURN</div>
      </div>

      <div style={{padding:'18px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">RETURNING</div>
        <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:24, marginTop:6}}>SCAFFOLD A · 24×8</div>
        <div className="v2-mono" style={{marginTop:4, color:'var(--v2-ink-3)', fontWeight:600, fontSize:11}}>FROM HILLCREST · 32 DAYS OUT · $2,720</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">CONDITION</div></div>
      <div style={{padding:'18px 20px 0'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:0, border:'2px solid var(--v2-ink)'}}>
          {[
            { l:'GOOD',     desc:'CLEAN · READY' },
            { l:'WEAR',     desc:'NORMAL', on:true },
            { l:'DAMAGE',   desc:'REPAIR NEEDED' },
          ].map((c, i, arr) => (
            <button key={c.l} style={{
              padding:'18px 0',
              background: c.on ? 'var(--v2-accent)' : 'transparent',
              color: c.on ? 'var(--v2-accent-ink)' : 'var(--v2-ink-3)',
              border:'none', borderRight: i < arr.length-1 ? '2px solid var(--v2-ink)' : 'none',
              fontFamily:'var(--v2-font)', cursor:'pointer',
            }}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:15}}>{c.l}</div>
              <div className="v2-mono" style={{fontSize:9, marginTop:4, fontWeight:600, opacity:0.7}}>{c.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>PHOTOS · OPTIONAL</div>
        <div style={{marginTop:8, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8}}>
          {[1,2,3].map(i => (
            <button key={i} style={{aspectRatio:'1', background:'var(--v2-sand-soft)', border:'2px dashed var(--v2-line-soft)', fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:24, color:'var(--v2-ink-3)'}}>+</button>
          ))}
        </div>
      </div>

      <div style={{padding:'18px 20px 0'}}>
        <div className="v2-eyebrow" style={{color:'var(--v2-ink-3)'}}>NOTE</div>
        <div style={{marginTop:8, padding:'14px 16px', background:'var(--v2-sand-soft)', border:'2px solid var(--v2-ink)', minHeight:64, fontSize:14, lineHeight:1.45}}>
          Top rail bent slightly. Still usable.<span style={{display:'inline-block', width:2, height:14, background:'var(--v2-accent)', verticalAlign:'middle', marginLeft:2}}/>
        </div>
      </div>

      <div className="v2-flex-1"/>
      <div style={{padding:'14px 20px 18px', borderTop:'2px solid var(--v2-ink)'}}>
        <button className="v2-btn primary">RETURN TO YARD</button>
      </div>
    </div>
  );
}

// =====================================================================
// 6 · UTILIZATION report
// =====================================================================
function V2RentUtilization() {
  const assets = [
    { l:'SCAFFOLD A',  util:87, rev:'$8,160' },
    { l:'SCAFFOLD B',  util:72, rev:'$6,240' },
    { l:'SCAFFOLD C',  util:54, rev:'$4,680' },
    { l:'MIXER M-184', util:64, rev:'$8,440' },
    { l:'MIXER M-090', util:42, rev:'$5,180' },
    { l:'HVLP SPRAY',  util:18, rev:'$880', flag:true },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">INVENTORY</div>
          <div className="v2-appbar-title">UTILIZATION · YTD</div>
        </div>
      </div>

      <div style={{padding:'24px 20px', borderBottom:'2px solid var(--v2-ink)'}}>
        <div className="v2-eyebrow">FLEET AVG</div>
        <div className="v2-bignum" style={{fontSize:84, marginTop:10, color:'var(--v2-good)'}}>92<span className="unit" style={{color:'var(--v2-ink-3)'}}>%</span></div>
        <div className="v2-mono" style={{marginTop:10, color:'var(--v2-ink-2)', fontWeight:600, lineHeight:1.5}}>$72K REVENUE · 14 ASSETS · 30 DAYS</div>
      </div>

      <div className="v2-section-bar"><div className="v2-eyebrow">BY ASSET</div></div>
      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {assets.map((a, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)'}}>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:8}}>
              <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:700, fontSize:14}}>{a.l}</div>
              <div className="v2-mono" style={{fontSize:12, fontWeight:800, color: a.flag ? 'var(--v2-bad)' : 'var(--v2-ink)'}}>{a.util}%</div>
            </div>
            <div style={{height:6, background:'var(--v2-line-soft)', marginTop:8}}>
              <div style={{width:`${a.util}%`, height:'100%', background: a.flag ? 'var(--v2-bad)' : 'var(--v2-accent)'}}/>
            </div>
            <div className="v2-mono" style={{fontSize:10, color: a.flag ? 'var(--v2-bad)' : 'var(--v2-ink-3)', marginTop:6, fontWeight:600}}>
              {a.rev}{a.flag && ' · UNDERUTILIZED · CONSIDER SELLING'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 7 · MAINTENANCE / SERVICE LOG
// =====================================================================
function V2RentService() {
  const log = [
    { d:'5/24', l:'HVLP SPRAYER · NOZZLE REPLACED',  who:'YARD',     cost:'$120',  status:'DONE' },
    { d:'5/18', l:'MIXER M-090 · OIL CHANGE',         who:'YARD',     cost:'$45',   status:'DONE' },
    { d:'5/14', l:'SCAFFOLD A · RAILS BENT',         who:'ANA C.',   cost:'PEND',  status:'OPEN' },
    { d:'4/28', l:'TRAILER · BRAKE INSPECT',          who:'CARLOS G.', cost:'$280', status:'DONE' },
  ];
  return (
    <div className="v2 v2-screen">
      <V2Sb/>
      <div className="v2-appbar">
        <button className="v2-iconbtn">←</button>
        <div style={{flex:1}}>
          <div className="v2-eyebrow">INVENTORY</div>
          <div className="v2-appbar-title">SERVICE LOG</div>
        </div>
        <button className="v2-iconbtn accent">+</button>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'2px solid var(--v2-ink)'}}>
        <div style={{padding:'14px 14px', borderRight:'2px solid var(--v2-ink)'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>OPEN</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1, color:'var(--v2-bad)'}}>1</div>
        </div>
        <div style={{padding:'14px 14px'}}>
          <div className="v2-eyebrow" style={{fontSize:10}}>SPENT · YTD</div>
          <div style={{fontFamily:'var(--v2-font-tight)', fontWeight:800, fontSize:32, marginTop:4, lineHeight:1}}>$2,180</div>
        </div>
      </div>

      <div className="v2-flex-1" style={{overflow:'auto'}}>
        {log.map((e, i) => (
          <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--v2-line-soft)', display:'flex', alignItems:'center', gap:14}}>
            <div className="v2-mono" style={{width:42, fontSize:10, fontWeight:700, color:'var(--v2-ink-3)'}}>{e.d}</div>
            <div style={{flex:1, minWidth:0}}>
              <div className="v2-mono" style={{fontSize:11, fontWeight:600}}>{e.l}</div>
              <div className="v2-mono" style={{fontSize:9, color:'var(--v2-ink-3)', marginTop:3, fontWeight:600}}>{e.who}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="v2-mono" style={{fontSize:12, fontWeight:800}}>{e.cost}</div>
              <span style={{padding:'2px 6px', background: e.status === 'OPEN' ? 'var(--v2-bad)' : 'var(--v2-good)', color:'#fff', fontFamily:'var(--v2-font-mono)', fontSize:8, fontWeight:700, letterSpacing:'0.06em', display:'inline-block', marginTop:4}}>{e.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  V2RentCatalog, V2RentAsset,
  V2RentScan, V2RentDispatch, V2RentReturn,
  V2RentUtilization, V2RentService,
});
