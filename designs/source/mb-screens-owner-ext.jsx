/* global React, MI, MTopBar, MRow */

// ============================================================
// SECTION 14 — ONBOARDING
// New workspace setup for owners. Post-splash → first project.
// Fast/utilitarian, AI-assisted on the data-heavy steps.
// ============================================================

// ---- Onboarding tweak context (background / length / layout)
// Provider lives in mb-app.jsx via OnbCtxProvider. Default is "sand · full · stacked".
const OnbCtx = React.createContext({ bg: 'sand', layout: 'stacked', length: 'full' });
const useOnb = () => React.useContext(OnbCtx);

const ONB_BG = {
  sand:  { bg: '#f7f4ef', card: '#ffffff', line: '#e8e3db', ink: '#1c1816', ink2: '#5b544c', ink3: '#8a8278', ink4: '#aea69a' },
  white: { bg: '#ffffff', card: '#faf8f4', line: '#ebe6df', ink: '#1c1816', ink2: '#5b544c', ink3: '#8a8278', ink4: '#aea69a' },
  dark:  { bg: '#0e0c0a', card: '#18140f', line: '#2a241c', ink: '#f3ecdf', ink2: '#c0b8a8', ink3: '#8e8676', ink4: '#5a5346' },
};

// ---- Shared shell: progress bar + skip + sticky CTAs
function OnbShell({ step, total, onSkip, children, primary, secondary, primaryLabel = 'Continue', secondaryLabel, hideProgress, narrow }) {
  const { bg, layout } = useOnb();
  const C = ONB_BG[bg];
  return (
    <div className="m" style={{background:C.bg, color:C.ink}}>
      {!hideProgress && (
        <div style={{padding:'10px 16px 8px', display:'flex', alignItems:'center', gap:10, flexShrink:0}}>
          <div style={{flex:1, height:3, background:C.line, borderRadius:2, overflow:'hidden'}}>
            <div style={{width:`${(step/total)*100}%`, height:'100%', background:'#d9904a', borderRadius:2, transition:'width .3s'}}/>
          </div>
          <span className="num" style={{fontSize:11, color:C.ink3, fontWeight:600, fontFeatureSettings:'"tnum"', letterSpacing:'.04em'}}>
            {step}<span style={{opacity:.45}}> / {total}</span>
          </span>
          {onSkip ? (
            <button style={{background:'transparent', border:'none', color:C.ink3, fontFamily:'inherit', fontSize:12, fontWeight:500, padding:'4px 0', cursor:'pointer'}}>Skip</button>
          ) : null}
        </div>
      )}
      <div style={{flex:1, minHeight:0, overflow:'auto', display:'flex', flexDirection:'column', justifyContent: layout === 'hero' ? 'center' : 'flex-start'}}>
        <div style={{padding: narrow ? '8px 20px 20px' : '12px 16px 20px'}}>
          {children}
        </div>
      </div>
      {(primary || secondary) && (
        <div style={{padding:'10px 16px calc(env(safe-area-inset-bottom, 0) + 14px)', borderTop:`1px solid ${C.line}`, background:C.bg, display:'flex', flexDirection:'column', gap:8, flexShrink:0}}>
          {primary && (
            <button className="m-btn" data-variant="primary" style={{height:48}}>
              {primaryLabel}
            </button>
          )}
          {secondary && (
            <button style={{background:'transparent', border:'none', color:C.ink2, fontFamily:'inherit', fontSize:13, fontWeight:500, padding:'6px 0', cursor:'pointer'}}>
              {secondaryLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Title block used in most screens
function OnbTitle({ eyebrow, title, sub, dark }) {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  return (
    <div style={{paddingBottom:14}}>
      {eyebrow && (
        <div style={{fontSize:10, fontWeight:700, color:'#b46e2c', letterSpacing:'.10em', textTransform:'uppercase', marginBottom:8}}>
          {eyebrow}
        </div>
      )}
      <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.1, color:C.ink}}>
        {title}
      </div>
      {sub && (
        <div style={{fontSize:13.5, color:C.ink2, lineHeight:1.45, marginTop:7}}>{sub}</div>
      )}
    </div>
  );
}

// AI eyebrow micro-component
function OnbAiBadge({ tone, children }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:5,
      fontSize:9.5, fontWeight:700, color: tone === 'warn' ? '#8a5a14' : '#b46e2c',
      letterSpacing:'.08em', textTransform:'uppercase',
      padding:'2px 7px', borderRadius:999,
      background:'rgba(217,144,74,0.10)',
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="9" height="9"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z"/></svg>
      {children}
    </span>
  );
}

// ============================================================
// 1. SIGN UP — welcome + auth providers
// ============================================================
function OnbSignUp() {
  return (
    <div className="m" style={{background:'#1c1816', color:'#f3ecdf', overflow:'hidden'}}>
      {/* Brand hero — textured warm wash */}
      <div style={{position:'relative', flex:'0 0 240px', overflow:'hidden', background:'linear-gradient(160deg, #2a1e14 0%, #1c1816 55%)'}}>
        {/* subtle radial accent */}
        <div style={{position:'absolute', top:-60, right:-40, width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle, rgba(217,144,74,.38) 0%, rgba(217,144,74,0) 70%)'}}/>
        <div style={{position:'absolute', bottom:-50, left:-30, width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle, rgba(217,144,74,.18) 0%, rgba(217,144,74,0) 70%)'}}/>
        {/* dotted texture */}
        <svg width="100%" height="100%" style={{position:'absolute', inset:0, opacity:.06}}>
          <defs><pattern id="onb-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.5" fill="#fff"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#onb-dots)"/>
        </svg>
        <div style={{position:'relative', padding:'34px 24px 18px', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div style={{width:54, height:54, background:'#d9904a', borderRadius:14, display:'inline-flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 24px rgba(217,144,74,.45)'}}>
            <span style={{fontSize:24, fontWeight:700, color:'#fff', letterSpacing:'-0.02em', fontFamily:'Geist, system-ui'}}>SL</span>
          </div>
          <div>
            <div style={{fontSize:22, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.1}}>
              Run the day from<br/>your pocket.
            </div>
            <div style={{fontSize:12, color:'rgba(243,236,223,.62)', marginTop:8, lineHeight:1.45}}>
              Construction operations for crews of 4&nbsp;to&nbsp;40.
            </div>
          </div>
        </div>
      </div>

      {/* Auth providers */}
      <div style={{flex:1, padding:'18px 16px 8px', display:'flex', flexDirection:'column', gap:8, overflow:'auto'}}>
        {/* Apple — pure black */}
        <button style={{height:46, background:'#000', color:'#fff', border:'none', borderRadius:12, fontFamily:'inherit', fontSize:14, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer'}}>
          <svg width="15" height="17" viewBox="0 0 17 20" fill="currentColor"><path d="M13.6 10.6a4.4 4.4 0 012.1-3.7 4.6 4.6 0 00-3.6-2c-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9a4.8 4.8 0 00-4 2.5c-1.7 3-.4 7.4 1.3 9.8.8 1.2 1.7 2.5 3 2.4 1.2-.05 1.6-.8 3.1-.8s1.9.8 3.2.8c1.3-.02 2.2-1.2 3-2.4a10.5 10.5 0 001.4-2.8 4.3 4.3 0 01-2.4-3.8zM11 3.3A4.3 4.3 0 0012 0a4.4 4.4 0 00-2.9 1.5A4 4 0 008 4.7a3.6 3.6 0 003-1.4z"/></svg>
          Continue with Apple
        </button>
        {/* Google — light */}
        <button style={{height:46, background:'#f3ecdf', color:'#1c1816', border:'none', borderRadius:12, fontFamily:'inherit', fontSize:14, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer'}}>
          <svg width="15" height="15" viewBox="0 0 18 18"><path d="M17.6 9.2c0-.6-.05-1.2-.15-1.7H9v3.4h4.8a4 4 0 01-1.8 2.7v2.2h2.9a8.7 8.7 0 002.7-6.6z" fill="#4285F4"/><path d="M9 18a8.6 8.6 0 005.95-2.2l-2.9-2.2a5.4 5.4 0 01-3.05.85 5.4 5.4 0 01-5-3.7H1v2.3A9 9 0 009 18z" fill="#34A853"/><path d="M4 10.75a5.4 5.4 0 010-3.5V4.95H1a9 9 0 000 8.1l3-2.3z" fill="#FBBC05"/><path d="M9 3.6a4.9 4.9 0 013.45 1.35l2.6-2.6A8.7 8.7 0 009 0 9 9 0 001 4.95l3 2.3A5.4 5.4 0 019 3.6z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        {/* Email + Phone — quieter */}
        <div style={{display:'flex', gap:8, marginTop:2}}>
          <button style={{flex:1, height:44, background:'transparent', color:'#f3ecdf', border:'1px solid #3a3329', borderRadius:12, fontFamily:'inherit', fontSize:13, fontWeight:500, display:'flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
            Email
          </button>
          <button style={{flex:1, height:44, background:'transparent', color:'#f3ecdf', border:'1px solid #3a3329', borderRadius:12, fontFamily:'inherit', fontSize:13, fontWeight:500, display:'flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>
            Phone
          </button>
        </div>

        <div style={{marginTop:'auto', paddingTop:14, fontSize:10.5, color:'#5a5346', textAlign:'center', lineHeight:1.5}}>
          By continuing you accept <span style={{color:'#aea69a', textDecoration:'underline'}}>Terms</span> and <span style={{color:'#aea69a', textDecoration:'underline'}}>Privacy</span>.<br/>
          Already a user? <span style={{color:'#d9904a', fontWeight:600}}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 2. EMAIL MAGIC LINK SENT — alt sign-up path
// ============================================================
function OnbEmailMagic() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  return (
    <div className="m" style={{background:C.bg, color:C.ink}}>
      {/* compact top: just back */}
      <div style={{padding:'10px 16px', flexShrink:0, display:'flex'}}>
        <button style={{width:36, height:36, background:'transparent', border:'none', color:C.ink, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>{MI.back}</button>
      </div>
      <div style={{flex:1, padding:'20px 22px', overflow:'auto'}}>
        <div style={{width:54, height:54, background:'rgba(217,144,74,.10)', borderRadius:14, display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:18, color:'#d9904a'}}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7l9 6 9-6"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>
        </div>
        <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.15}}>
          Check your email.
        </div>
        <div style={{fontSize:13.5, color:C.ink2, lineHeight:1.5, marginTop:8}}>
          We sent a sign-in link to
        </div>
        <div style={{padding:'14px 16px', background:C.card, border:`1px solid ${C.line}`, borderRadius:12, marginTop:12, fontSize:14, fontWeight:600, letterSpacing:'-0.005em', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <span>mike@hillcresthomes.co</span>
          <button style={{background:'transparent', border:'none', color:'#b46e2c', fontFamily:'inherit', fontSize:12, fontWeight:600, cursor:'pointer'}}>Edit</button>
        </div>
        <div style={{fontSize:12, color:C.ink3, lineHeight:1.5, marginTop:18, padding:'10px 12px', background:C.card, borderRadius:10, border:`1px dashed ${C.line}`}}>
          Tap the link on this phone to come right back. The link expires in 15 minutes.
        </div>
        <div style={{marginTop:24, display:'flex', flexDirection:'column', gap:6}}>
          <div style={{fontSize:11, color:C.ink3}}>Didn't get it?</div>
          <div style={{display:'flex', gap:14, fontSize:13, fontWeight:600}}>
            <span style={{color:'#b46e2c', cursor:'pointer'}}>Resend</span>
            <span style={{color:C.ink2, cursor:'pointer'}}>Try a different way</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 3. PHONE SMS — alt sign-up path
// ============================================================
function OnbPhoneSMS() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  const digits = ['7','2','4',null,null,null];
  return (
    <div className="m" style={{background:C.bg, color:C.ink}}>
      <div style={{padding:'10px 16px', flexShrink:0, display:'flex'}}>
        <button style={{width:36, height:36, background:'transparent', border:'none', color:C.ink, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>{MI.back}</button>
      </div>
      <div style={{flex:1, padding:'14px 22px', overflow:'auto'}}>
        <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.15}}>
          Enter the code.
        </div>
        <div style={{fontSize:13.5, color:C.ink2, lineHeight:1.5, marginTop:8}}>
          Sent to <strong style={{color:C.ink, fontWeight:600}}>(403) 555-0142</strong>
        </div>
        {/* 6 boxes */}
        <div style={{display:'flex', gap:8, marginTop:24, fontFeatureSettings:'"tnum"'}}>
          {digits.map((d, i) => (
            <div key={i} style={{
              flex:1, height:54, borderRadius:12,
              background: d ? C.card : 'transparent',
              border:`1.5px solid ${i === 3 ? '#d9904a' : C.line}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:22, fontWeight:600, color:C.ink,
              position:'relative',
            }}>
              {d}
              {i === 3 && <span style={{position:'absolute', width:1.5, height:24, background:'#d9904a', animation:'none'}}/>}
            </div>
          ))}
        </div>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:18, fontSize:12.5}}>
          <span style={{color:C.ink3}}>Code expires in <span style={{color:C.ink, fontWeight:600, fontFeatureSettings:'"tnum"'}}>0:58</span></span>
          <span style={{color:'#b46e2c', fontWeight:600, cursor:'pointer'}}>Resend</span>
        </div>

        {/* Fake numpad preview */}
        <div style={{marginTop:28, padding:'10px 0', background:C.card, border:`1px solid ${C.line}`, borderRadius:14}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:0}}>
            {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k, i) => (
              <div key={i} style={{padding:'12px 0', textAlign:'center', fontSize:18, fontWeight:500, color: k === '⌫' ? C.ink3 : C.ink, fontFeatureSettings:'"tnum"'}}>{k}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 4. COMPANY — name, region, logo
// ============================================================
function OnbCompany() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  return (
    <OnbShell step={1} total={10} onSkip primary primaryLabel="Continue">
      <OnbTitle eyebrow="Step 1 · Workspace" title="Let's set up your shop." sub="Two minutes. We pre-fill what we can."/>

      <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:6}}>
        {/* Logo + name row */}
        <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
          <div style={{width:68, height:68, borderRadius:14, background:C.card, border:`1.5px dashed ${C.line}`, display:'flex', alignItems:'center', justifyContent:'center', color:C.ink3, flexShrink:0, position:'relative'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
            <div style={{position:'absolute', bottom:-6, right:-6, width:24, height:24, background:'#d9904a', color:'#fff', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${C.bg}`}}>{MI.plus}</div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:11, color:C.ink3, fontWeight:500, marginBottom:5}}>Company name</div>
            <div style={{height:44, padding:'0 12px', background:C.card, border:`1.5px solid #d9904a`, borderRadius:10, display:'flex', alignItems:'center', fontSize:15, fontWeight:500}}>
              Hillcrest Homes Co
            </div>
          </div>
        </div>

        {/* Region — auto-detected */}
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:5}}>
            <div style={{fontSize:11, color:C.ink3, fontWeight:500}}>Region</div>
            <OnbAiBadge>Auto-detected</OnbAiBadge>
          </div>
          <div style={{height:44, padding:'0 12px', background:C.card, border:`1px solid ${C.line}`, borderRadius:10, display:'flex', alignItems:'center', gap:8, fontSize:14}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="1.5"><path d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></svg>
            <span>Calgary, AB · Canada</span>
            <span style={{marginLeft:'auto', color:C.ink3}}>{MI.chev}</span>
          </div>
        </div>

        {/* Subdomain — gentle */}
        <div>
          <div style={{fontSize:11, color:C.ink3, fontWeight:500, marginBottom:5}}>Workspace URL</div>
          <div style={{height:44, padding:'0 12px', background:C.card, border:`1px solid ${C.line}`, borderRadius:10, display:'flex', alignItems:'center', fontSize:14, fontFeatureSettings:'"tnum"'}}>
            <span style={{flex:1, color:C.ink}}>hillcrest</span>
            <span style={{color:C.ink3}}>.stringline.co</span>
            <span style={{marginLeft:8, color:'#2c8a55'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12l5 5L20 7"/></svg>
            </span>
          </div>
        </div>
      </div>
    </OnbShell>
  );
}

// ============================================================
// 5. TRADE + CREW SIZE — combined to save a step
// ============================================================
function OnbTrade() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  const trades = [
    { l:'Stucco / EIFS', sub:'Exterior coating', accent:'#E8A86B', active:true },
    { l:'Framing', sub:'Wood + steel', accent:'#A05A33', active:true },
    { l:'Drywall', sub:'Hang, tape, finish', accent:'#7A8C6F' },
    { l:'Painting', sub:'Interior + ext.', accent:'#5B8AA8' },
    { l:'Roofing', sub:'Shingle, membrane', accent:'#8A6F9C' },
    { l:'General', sub:'Multi-trade GC', accent:'#6FA8A0' },
  ];
  const selectedCount = trades.filter(t => t.active).length;
  return (
    <OnbShell step={2} total={10} onSkip primary primaryLabel="Continue">
      <OnbTitle eyebrow="Step 2 · Trade" title="What do you build?" sub="We use this to tune the pricing book and default scopes. Pick all that apply."/>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
        {trades.map(t => (
          <button key={t.l} style={{
            padding:'12px 12px',
            background: t.active ? 'rgba(217,144,74,0.10)' : C.card,
            border: `1.5px solid ${t.active ? '#d9904a' : C.line}`,
            borderRadius:12,
            textAlign:'left', cursor:'pointer', fontFamily:'inherit',
            position:'relative',
            display:'flex', flexDirection:'column', gap:6,
            color:C.ink,
          }}>
            <div style={{width:24, height:24, borderRadius:6, background:t.accent, opacity: t.active ? 1 : .65}}/>
            <div style={{fontSize:13, fontWeight:600, lineHeight:1.15}}>{t.l}</div>
            <div style={{fontSize:11, color:C.ink3, lineHeight:1.3}}>{t.sub}</div>
            {t.active && (
              <div style={{position:'absolute', top:8, right:8, width:18, height:18, background:'#d9904a', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Crew size */}
      <div style={{marginTop:18, padding:'14px', background:C.card, border:`1px solid ${C.line}`, borderRadius:12}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
          <div style={{fontSize:12, fontWeight:600, color:C.ink}}>Crew size</div>
          <div style={{fontSize:18, fontWeight:700, fontFeatureSettings:'"tnum"', color:'#b46e2c'}}>14</div>
        </div>
        {/* slider */}
        <div style={{position:'relative', height:6, background:C.line, borderRadius:3}}>
          <div style={{position:'absolute', left:0, width:'32%', height:'100%', background:'#d9904a', borderRadius:3}}/>
          <div style={{position:'absolute', left:'32%', top:'50%', transform:'translate(-50%,-50%)', width:20, height:20, borderRadius:10, background:'#fff', border:'2px solid #d9904a', boxShadow:'0 2px 6px rgba(217,144,74,.30)'}}/>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:8, fontSize:10.5, color:C.ink3, fontFeatureSettings:'"tnum"'}}>
          <span>1</span><span>10</span><span>25</span><span>50+</span>
        </div>
        <div style={{fontSize:11, color:C.ink3, marginTop:8, lineHeight:1.4}}>
          Sets defaults for capacity planning. You can change this later.
        </div>
      </div>
    </OnbShell>
  );
}

// ============================================================
// 6. HOURS + TIMEZONE
// ============================================================
function OnbHours() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  const days = [
    { l:'M', on:true }, { l:'T', on:true }, { l:'W', on:true },
    { l:'T', on:true }, { l:'F', on:true }, { l:'S', on:true }, { l:'S', on:false }
  ];
  return (
    <OnbShell step={3} total={10} onSkip primary primaryLabel="Continue">
      <OnbTitle eyebrow="Step 3 · Schedule" title="When do you work?" sub="We'll auto clock-in your crew within these windows."/>

      {/* TZ card — auto */}
      <div style={{padding:'14px', background:C.card, border:`1px solid ${C.line}`, borderRadius:12, display:'flex', alignItems:'center', gap:12, marginBottom:14}}>
        <div style={{width:38, height:38, borderRadius:10, background:'rgba(217,144,74,.10)', color:'#d9904a', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5 6c2 2 4 3 7 3s5-1 7-3M5 18c2-2 4-3 7-3s5 1 7 3"/></svg>
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:13.5, fontWeight:600}}>Mountain Time · UTC−7</div>
          <div style={{fontSize:11, color:C.ink3, marginTop:1, display:'flex', alignItems:'center', gap:5}}>
            <OnbAiBadge>Auto</OnbAiBadge>
            <span>· from device</span>
          </div>
        </div>
        <span style={{color:C.ink3}}>{MI.chev}</span>
      </div>

      {/* Days */}
      <div style={{fontSize:11, color:C.ink3, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8}}>Working days</div>
      <div style={{display:'flex', gap:6, marginBottom:18}}>
        {days.map((d, i) => (
          <div key={i} style={{
            flex:1, height:40, borderRadius:10,
            background: d.on ? '#d9904a' : C.card,
            border: d.on ? '1.5px solid #d9904a' : `1.5px solid ${C.line}`,
            color: d.on ? '#fff' : C.ink3,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:13, fontWeight:600,
          }}>
            {d.l}
          </div>
        ))}
      </div>

      {/* Hours range */}
      <div style={{fontSize:11, color:C.ink3, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8}}>Typical hours</div>
      <div style={{display:'flex', gap:8}}>
        <div style={{flex:1, padding:'10px 14px', background:C.card, border:`1px solid ${C.line}`, borderRadius:10}}>
          <div style={{fontSize:10, color:C.ink3, textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600}}>Start</div>
          <div style={{fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:2}}>7:00 <span style={{fontSize:12, color:C.ink3, fontWeight:500}}>AM</span></div>
        </div>
        <div style={{flex:1, padding:'10px 14px', background:C.card, border:`1px solid ${C.line}`, borderRadius:10}}>
          <div style={{fontSize:10, color:C.ink3, textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600}}>End</div>
          <div style={{fontSize:18, fontWeight:600, fontFeatureSettings:'"tnum"', marginTop:2}}>5:00 <span style={{fontSize:12, color:C.ink3, fontWeight:500}}>PM</span></div>
        </div>
      </div>

      <div style={{marginTop:14, padding:'10px 12px', background:'rgba(47,111,181,.06)', border:'1px dashed rgba(47,111,181,.25)', borderRadius:10, fontSize:11.5, color:C.ink2, lineHeight:1.45, display:'flex', gap:8}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6fb5" strokeWidth="1.6" style={{flexShrink:0, marginTop:1}}><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
        <span>Outside these hours we log time but skip auto clock-in. Per-project overrides come later.</span>
      </div>
    </OnbShell>
  );
}

// ============================================================
// 7. CONNECT QBO — AI pitch
// ============================================================
function OnbQBO() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  return (
    <OnbShell step={5} total={10} onSkip primary primaryLabel="Connect QuickBooks" secondary secondaryLabel="I'll set up pricing manually">
      <OnbTitle eyebrow="Step 5 · Pricing data" title="Pull in your past jobs." sub="Connect QuickBooks Online and we'll build your pricing book, loaded rates, and team list."/>

      {/* Hero connector visual */}
      <div style={{margin:'6px 0 14px', padding:'18px 14px', background:C.card, border:`1px solid ${C.line}`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
        <div style={{width:48, height:48, background:'#0c733e', borderRadius:11, color:'#fff', fontSize:13, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', letterSpacing:'-.01em'}}>qb</div>
        <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:4, color:'#d9904a'}}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{width:5, height:5, borderRadius:3, background:'#d9904a', opacity: 0.25 + (i*0.2)}}/>
          ))}
        </div>
        <div style={{width:48, height:48, background:'#d9904a', borderRadius:11, color:'#fff', fontSize:14, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', letterSpacing:'-.02em'}}>SL</div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {[
          { i: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z"/></svg>, t:'Pricing book, drafted', s:'Items, costs, and unit rates from your last 12 months' },
          { i: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12l3 3 9-9M9 18l3 3 9-9"/></svg>, t:'Loaded labor rates', s:'Burdened cost from payroll lines, not best-guess' },
          { i: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="8" r="3.5"/><path d="M3 19a6 6 0 0112 0"/></svg>, t:'Team list', s:'14 employees + 6 vendors found' },
          { i: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M9 6V4h6v2"/></svg>, t:'Active projects', s:'8 jobs in progress, pre-imported' },
        ].map(b => (
          <div key={b.t} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
            <div style={{width:24, height:24, borderRadius:6, background:'rgba(217,144,74,.10)', color:'#b46e2c', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1}}>{b.i}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:600, color:C.ink}}>{b.t}</div>
              <div style={{fontSize:11.5, color:C.ink3, marginTop:1, lineHeight:1.4}}>{b.s}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:14, padding:'10px 12px', background:'rgba(217,144,74,.06)', borderRadius:10, fontSize:11, color:C.ink2, lineHeight:1.45, display:'flex', gap:8}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b46e2c" strokeWidth="1.6" style={{flexShrink:0, marginTop:1}}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
        <span>Read-only. We never write to your books unless you turn on sync.</span>
      </div>
    </OnbShell>
  );
}

// ============================================================
// 8. AGENT SETUP — AI processing screen
// ============================================================
function OnbAgentSetup() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  const steps = [
    { l:'Reading 1,284 transactions', state:'done', meta:'12 months' },
    { l:'Found 142 distinct items', state:'done', meta:'across 6 scopes' },
    { l:'Calculating loaded rates', state:'done', meta:'from payroll burden' },
    { l:'Matching scopes to your trade', state:'active', meta:'Stucco / EIFS' },
    { l:'Drafting your pricing book',   state:'queued', meta:null },
    { l:'Mapping team from QBO',        state:'queued', meta:null },
  ];
  return (
    <div className="m" style={{background:C.bg, color:C.ink}}>
      <div style={{padding:'10px 16px 8px', display:'flex', alignItems:'center', gap:10, flexShrink:0}}>
        <div style={{flex:1, height:3, background:C.line, borderRadius:2, overflow:'hidden'}}>
          <div style={{width:`${(6/10)*100}%`, height:'100%', background:'#d9904a', borderRadius:2}}/>
        </div>
        <span className="num" style={{fontSize:11, color:C.ink3, fontWeight:600}}>6<span style={{opacity:.45}}> / 10</span></span>
      </div>
      <div style={{flex:1, padding:'18px 22px', overflow:'auto'}}>
        {/* AI mark */}
        <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', background:'rgba(217,144,74,.10)', borderRadius:999, marginBottom:14}}>
          <span style={{width:6, height:6, borderRadius:3, background:'#d9904a', animation:'pulse 1.5s ease-in-out infinite'}}/>
          <span style={{fontSize:10, fontWeight:700, color:'#b46e2c', letterSpacing:'.08em', textTransform:'uppercase'}}>Agent · working</span>
        </div>

        <div style={{fontSize:22, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.15}}>
          Building your<br/>workspace.
        </div>
        <div style={{fontSize:13, color:C.ink2, lineHeight:1.5, marginTop:8}}>
          We're pulling and cleaning data from QuickBooks. About 15 seconds.
        </div>

        {/* Step list */}
        <div style={{marginTop:20, display:'flex', flexDirection:'column', gap:2}}>
          {steps.map((s, i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:11, padding:'10px 0', borderBottom: i < steps.length-1 ? `1px solid ${C.line}` : 'none'}}>
              <div style={{width:20, height:20, borderRadius:10, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
                background: s.state === 'done' ? 'rgba(44,138,85,.14)' : s.state === 'active' ? 'rgba(217,144,74,.12)' : 'transparent',
                color: s.state === 'done' ? '#2c8a55' : s.state === 'active' ? '#d9904a' : C.ink4,
                border: s.state === 'queued' ? `1.5px dashed ${C.line}` : 'none',
              }}>
                {s.state === 'done' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>}
                {s.state === 'active' && <div style={{width:7, height:7, borderRadius:4, background:'#d9904a', boxShadow:'0 0 0 4px rgba(217,144,74,.18)'}}/>}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight: s.state === 'queued' ? 400 : 500, color: s.state === 'queued' ? C.ink3 : C.ink, lineHeight:1.3}}>{s.l}</div>
                {s.meta && <div style={{fontSize:10.5, color:C.ink3, marginTop:1}}>{s.meta}</div>}
              </div>
              {s.state === 'active' && (
                <div style={{fontSize:10, fontWeight:600, color:'#b46e2c', fontFeatureSettings:'"tnum"'}}>0:08</div>
              )}
            </div>
          ))}
        </div>

        <div style={{marginTop:18, fontSize:11, color:C.ink3, textAlign:'center', lineHeight:1.5}}>
          Feel free to set this aside.<br/>We'll notify you when it's ready to review.
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }`}</style>
    </div>
  );
}

// ============================================================
// 9. PRICING BOOK REVIEW — agent draft
// ============================================================
function OnbPricing() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  const items = [
    { c:'EPS', n:'2" EPS Insulation Board', u:'sf', cost:'$2.14', sell:'$4.10', conf:'high', tone:'#E8A86B' },
    { c:'EPS', n:'1.5" EPS Insulation Board', u:'sf', cost:'$1.78', sell:'$3.45', conf:'high', tone:'#E8A86B' },
    { c:'BASE', n:'Basecoat · standard mix', u:'sf', cost:'$1.92', sell:'$3.85', conf:'med', tone:'#C77B4F' },
    { c:'BASE', n:'Mesh embedment', u:'sf', cost:'$0.42', sell:'$0.95', conf:'high', tone:'#C77B4F' },
    { c:'STONE', n:'Cultured stone veneer', u:'sf', cost:'$8.20', sell:'$16.50', conf:'low', tone:'#7A8C6F' },
  ];
  return (
    <OnbShell step={7} total={10} onSkip primary primaryLabel="Approve all · 142 items" secondary secondaryLabel="Review individually">
      <OnbTitle eyebrow="Step 7 · Pricing book" title="Your pricing book — drafted." sub="From 1,284 QBO transactions. Edit anything later in Settings."/>

      {/* Agent stripe — confidence summary */}
      <div style={{padding:'12px 13px', background:C.card, border:`1px solid ${C.line}`, borderLeft:'3px solid #d9904a', borderRadius:10, marginBottom:14}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8}}>
          <OnbAiBadge>Agent draft · review before approve</OnbAiBadge>
          <span style={{fontSize:10, color:C.ink3, fontFeatureSettings:'"tnum"'}}>142 items</span>
        </div>
        <div style={{display:'flex', gap:14, marginTop:8, fontSize:11, color:C.ink2}}>
          <div><strong style={{color:'#2c8a55', fontWeight:600, fontFeatureSettings:'"tnum"'}}>118</strong> high confidence</div>
          <div><strong style={{color:'#c98a2e', fontWeight:600, fontFeatureSettings:'"tnum"'}}>17</strong> needs review</div>
          <div><strong style={{color:C.ink3, fontWeight:600, fontFeatureSettings:'"tnum"'}}>7</strong> excluded</div>
        </div>
      </div>

      {/* Items preview */}
      <div style={{background:C.card, border:`1px solid ${C.line}`, borderRadius:12, overflow:'hidden'}}>
        {items.map((it, i) => (
          <div key={i} style={{padding:'11px 12px', borderBottom: i < items.length-1 ? `1px solid ${C.line}` : 'none', display:'flex', alignItems:'center', gap:10}}>
            <div style={{width:36, background:it.tone, color:'#fff', fontSize:9, fontWeight:700, letterSpacing:'.05em', padding:'4px 0', borderRadius:5, textAlign:'center', flexShrink:0}}>{it.c}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:12.5, fontWeight:500, lineHeight:1.25, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{it.n}</div>
              <div style={{fontSize:10.5, color:C.ink3, marginTop:2, fontFeatureSettings:'"tnum"'}}>
                cost {it.cost} · sell {it.sell} / {it.u}
              </div>
            </div>
            <span style={{
              width:8, height:8, borderRadius:4, flexShrink:0,
              background: it.conf === 'high' ? '#2c8a55' : it.conf === 'med' ? '#c98a2e' : '#c0463d',
            }}/>
          </div>
        ))}
      </div>

      <div style={{marginTop:8, fontSize:11, color:C.ink3, textAlign:'center'}}>
        + 137 more · <span style={{color:'#b46e2c', fontWeight:600}}>view all</span>
      </div>
    </OnbShell>
  );
}

// ============================================================
// 10. INVITE TEAM — from QBO + manual
// ============================================================
function OnbTeam() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  const people = [
    { i:'AC', n:'Ana Castillo', sub:'Lead · field', role:'Foreman', tone:'accent', selected:true },
    { i:'ML', n:'Marcus Lee', sub:'Crew · 2 yrs', role:'Worker', tone:'2', selected:true },
    { i:'PR', n:'Priya Ravi', sub:'Lead · field', role:'Foreman', tone:'5', selected:true },
    { i:'TR', n:'Tomás Reyes', sub:'Crew · 4 yrs', role:'Worker', tone:'3', selected:true },
    { i:'JS', n:'Jamal Soto', sub:'Lead · field', role:'Foreman', tone:'4', selected:false },
    { i:'DK', n:'Devon Kim', sub:'Crew · 1 yr', role:'Worker', tone:'2', selected:true },
  ];
  return (
    <OnbShell step={8} total={10} onSkip primary primaryLabel="Send 5 invites" secondary secondaryLabel="Skip — I'll invite later">
      <OnbTitle eyebrow="Step 8 · Team" title="Bring the crew." sub="14 people found in your QBO. Pick who's on the app."/>

      {/* AI badge + filter row */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
        <OnbAiBadge>From QuickBooks</OnbAiBadge>
        <div style={{display:'flex', gap:6}}>
          <button style={{height:26, padding:'0 10px', background:'#d9904a', color:'#fff', border:'none', borderRadius:999, fontFamily:'inherit', fontSize:11, fontWeight:600}}>All on</button>
          <button style={{height:26, padding:'0 10px', background:C.card, color:C.ink2, border:`1px solid ${C.line}`, borderRadius:999, fontFamily:'inherit', fontSize:11, fontWeight:500}}>Leads only</button>
        </div>
      </div>

      <div style={{background:C.card, border:`1px solid ${C.line}`, borderRadius:12, overflow:'hidden'}}>
        {people.map((p, i) => (
          <div key={i} style={{padding:'11px 12px', borderBottom: i < people.length-1 ? `1px solid ${C.line}` : 'none', display:'flex', alignItems:'center', gap:10}}>
            <div className="m-avatar" data-tone={p.tone} style={{width:32, height:32, fontSize:11.5}}>{p.i}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, fontWeight:600, lineHeight:1.2}}>{p.n}</div>
              <div style={{fontSize:10.5, color:C.ink3, marginTop:1}}>{p.sub}</div>
            </div>
            {/* Role chip */}
            <div style={{
              fontSize:10, fontWeight:600,
              padding:'3px 7px', borderRadius:999,
              background: p.role === 'Foreman' ? 'rgba(217,144,74,.12)' : C.bg,
              color: p.role === 'Foreman' ? '#b46e2c' : C.ink3,
              border: p.role === 'Foreman' ? 'none' : `1px solid ${C.line}`,
            }}>{p.role}</div>
            {/* Toggle */}
            <div style={{
              width:34, height:20, borderRadius:10, flexShrink:0,
              background: p.selected ? '#d9904a' : C.line,
              position:'relative',
            }}>
              <div style={{position:'absolute', top:2, left: p.selected ? 16 : 2, width:16, height:16, borderRadius:8, background:'#fff', boxShadow:'0 1px 2px rgba(0,0,0,.12)', transition:'left .2s'}}/>
            </div>
          </div>
        ))}
      </div>

      <button style={{marginTop:12, padding:'12px', background:'transparent', border:`1.5px dashed ${C.line}`, borderRadius:12, color:C.ink2, fontFamily:'inherit', fontSize:13, fontWeight:500, width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer'}}>
        {MI.plus} Add someone manually
      </button>
    </OnbShell>
  );
}

// ============================================================
// 11. FIRST PROJECT — paste or sample
// ============================================================
function OnbProject() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  return (
    <OnbShell step={10} total={10} onSkip primary primaryLabel="Create project" secondary secondaryLabel="Use a sample to explore">
      <OnbTitle eyebrow="Step 10 · Go live" title="Start your first project." sub="Just two fields. Everything else is optional — fill in as you go."/>

      {/* Project name */}
      <div style={{marginBottom:12}}>
        <div style={{fontSize:11, color:C.ink3, fontWeight:500, marginBottom:5}}>Project name</div>
        <div style={{height:46, padding:'0 12px', background:C.card, border:`1.5px solid #d9904a`, borderRadius:12, display:'flex', alignItems:'center', fontSize:15, fontWeight:500}}>
          Hillcrest Mews — Phase 4
        </div>
      </div>

      {/* Address */}
      <div style={{marginBottom:14}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:5}}>
          <div style={{fontSize:11, color:C.ink3, fontWeight:500}}>Site address</div>
          <span style={{fontSize:10, color:C.ink3}}>· optional</span>
        </div>
        <div style={{height:46, padding:'0 12px', background:C.card, border:`1px solid ${C.line}`, borderRadius:12, display:'flex', alignItems:'center', gap:8, fontSize:14}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="1.5"><path d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></svg>
          <span>4820 Crestline Dr · Calgary</span>
        </div>
      </div>

      {/* Mini map placeholder */}
      <div style={{height:90, background:'#ebe6df', borderRadius:12, position:'relative', overflow:'hidden', marginBottom:14}}>
        {/* fake map */}
        <svg viewBox="0 0 290 90" width="100%" height="90">
          <rect width="290" height="90" fill="#e8e3db"/>
          <path d="M0 50 L80 30 L160 60 L290 40" stroke="#d8d2c7" strokeWidth="3" fill="none"/>
          <path d="M0 70 L120 60 L200 80 L290 60" stroke="#d8d2c7" strokeWidth="2" fill="none"/>
          <rect x="40" y="20" width="22" height="14" fill="#d8d2c7"/>
          <rect x="70" y="55" width="18" height="12" fill="#d8d2c7"/>
          <rect x="200" y="30" width="20" height="16" fill="#d8d2c7"/>
        </svg>
        <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{width:20, height:20, background:'#d9904a', borderRadius:10, border:'3px solid #fff', boxShadow:'0 2px 6px rgba(0,0,0,.18)'}}/>
          <div style={{width:1, height:8, background:'rgba(217,144,74,.6)'}}/>
        </div>
      </div>

      {/* Sample escape hatch */}
      <button style={{padding:'14px', background:C.card, border:`1.5px dashed ${C.line}`, borderRadius:12, textAlign:'left', fontFamily:'inherit', cursor:'pointer', width:'100%', display:'flex', alignItems:'center', gap:12, color:C.ink}}>
        <div style={{width:32, height:32, background:'rgba(122,140,111,.18)', color:'#5e7058', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:12.5, fontWeight:600}}>Try a sample project</div>
          <div style={{fontSize:11, color:C.ink3, marginTop:1, lineHeight:1.35}}>Pre-loaded with takeoff, schedule, and logs.</div>
        </div>
        <span style={{color:C.ink3, flexShrink:0}}>{MI.chev}</span>
      </button>
    </OnbShell>
  );
}

// ============================================================
// 12. CHECKLIST — you're in, here's what's next
// ============================================================
function OnbChecklist() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  const done = [
    { l:'Workspace · Hillcrest Homes Co' },
    { l:'Trade · Stucco / EIFS' },
    { l:'QuickBooks · connected' },
    { l:'Pricing book · 142 items approved' },
    { l:'Team · 5 invites sent' },
  ];
  const next = [
    { l:'Set up payroll burden rate', sub:'For loaded labor cost · 1 min', icon:MI.$ },
    { l:'Draw a site geofence', sub:'Auto clock-in around your first job', icon:MI.pin },
    { l:'Connect Stripe', sub:'Accept payments on accepted bids', icon:MI.bolt },
    { l:'Invite remaining 9 from QBO', sub:'You skipped them earlier', icon:MI.users },
  ];
  return (
    <div className="m" style={{background:C.bg, color:C.ink}}>
      {/* Celebration top */}
      <div style={{padding:'18px 20px 14px', position:'relative', background:'linear-gradient(180deg, rgba(217,144,74,.10) 0%, rgba(217,144,74,0) 100%)'}}>
        {/* confetti dots */}
        {[
          {l:'18%', t:'20px', s:6, c:'#d9904a'},
          {l:'72%', t:'14px', s:5, c:'#7A8C6F'},
          {l:'85%', t:'40px', s:7, c:'#2c8a55'},
          {l:'8%',  t:'48px', s:4, c:'#5B8AA8'},
          {l:'50%', t:'8px',  s:5, c:'#C77B4F'},
        ].map((d, i) => (
          <div key={i} style={{position:'absolute', left:d.l, top:d.t, width:d.s, height:d.s, background:d.c, borderRadius:d.s/2, opacity:.85}}/>
        ))}
        <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
          <div style={{width:36, height:36, background:'#2c8a55', borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12l5 5L20 7"/></svg>
          </div>
          <div>
            <div style={{fontSize:10, fontWeight:700, color:'#2c8a55', letterSpacing:'.10em', textTransform:'uppercase'}}>You're in</div>
            <div style={{fontSize:11, color:C.ink3, marginTop:1}}>Took 1 min 48 sec.</div>
          </div>
        </div>
        <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.1}}>
          Open the app.<br/>Or finish setting up.
        </div>
      </div>

      <div style={{flex:1, overflow:'auto', padding:'4px 16px 20px'}}>
        {/* Done summary */}
        <div style={{display:'flex', flexDirection:'column', gap:0, padding:'4px 0 8px'}}>
          {done.map((d, i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:8, padding:'5px 0'}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2c8a55" strokeWidth="2.6"><path d="M5 12l5 5L20 7"/></svg>
              <span style={{fontSize:12, color:C.ink2}}>{d.l}</span>
            </div>
          ))}
        </div>

        <div style={{fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:'.06em', textTransform:'uppercase', margin:'14px 0 8px'}}>
          What's next · 4 ambient tasks
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {next.map((n, i) => (
            <div key={i} style={{padding:'12px', background:C.card, border:`1px solid ${C.line}`, borderRadius:12, display:'flex', alignItems:'center', gap:11}}>
              <div style={{width:18, height:18, borderRadius:9, border:`1.5px solid ${C.line}`, flexShrink:0}}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:600, lineHeight:1.25}}>{n.l}</div>
                <div style={{fontSize:11, color:C.ink3, marginTop:1}}>{n.sub}</div>
              </div>
              <div style={{width:30, height:30, background:'rgba(217,144,74,.10)', color:'#b46e2c', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{n.icon}</div>
            </div>
          ))}
        </div>

        <div style={{marginTop:14, fontSize:11, color:C.ink3, textAlign:'center', lineHeight:1.5}}>
          These will live in <span style={{color:C.ink2, fontWeight:600}}>Settings → Setup</span>.<br/>You won't see this screen again.
        </div>
      </div>

      <div style={{padding:'10px 16px calc(env(safe-area-inset-bottom, 0) + 14px)', borderTop:`1px solid ${C.line}`, flexShrink:0}}>
        <button className="m-btn" data-variant="primary" style={{height:48}}>Open Stringline</button>
      </div>
    </div>
  );
}

// ============================================================
// PERMISSION PRIMERS — folded into onboarding (replace old Section 1)
// ============================================================
function OnbPermLocation() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  return (
    <OnbShell step={4} total={10} onSkip primary primaryLabel="Allow location" secondary secondaryLabel="Not now — set up manual clock-in">
      <OnbTitle eyebrow="Step 4 · Permission" title="Auto clock-in on arrival." sub="When your crew shows up at a site, Stringline can clock them in without anyone reaching for their phone."/>

      {/* Geofence visual */}
      <div style={{margin:'4px 0 16px', padding:'14px 14px 10px', background:C.card, border:`1px solid ${C.line}`, borderRadius:14, position:'relative', overflow:'hidden'}}>
        <svg viewBox="0 0 280 110" width="100%" height="110">
          <defs>
            <radialGradient id="onb-geo-grad" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#d9904a" stopOpacity="0.32"/>
              <stop offset="60%" stopColor="#d9904a" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#d9904a" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <path d="M0 30 L280 50" stroke={C.line} strokeWidth="1.5"/>
          <path d="M0 85 L280 70" stroke={C.line} strokeWidth="1.5"/>
          <path d="M90 0 L100 110" stroke={C.line} strokeWidth="1.5"/>
          <path d="M210 0 L200 110" stroke={C.line} strokeWidth="1.5"/>
          <rect x="40" y="14" width="22" height="14" fill={C.line}/>
          <rect x="130" y="80" width="20" height="12" fill={C.line}/>
          <rect x="220" y="20" width="22" height="14" fill={C.line}/>
          <circle cx="140" cy="55" r="42" fill="url(#onb-geo-grad)"/>
          <circle cx="140" cy="55" r="42" stroke="#d9904a" strokeWidth="1.5" strokeDasharray="4,3" fill="none"/>
          <circle cx="140" cy="55" r="6" fill="#d9904a" stroke="#fff" strokeWidth="2"/>
        </svg>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:6, fontSize:10, color:C.ink3, fontFeatureSettings:'"tnum"'}}>
          <span>~150 ft radius · auto</span>
          <OnbAiBadge>From your site address</OnbAiBadge>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {[
          { ok:true,  t:'Used only when clocking in or out',  s:'No background tracking between shifts.' },
          { ok:true,  t:'Stays on your phone',                s:'Coords never leave your device. We store only the in/out event.' },
          { ok:false, t:'Required for auto clock-in',         s:'Skip and your crew has to tap to clock in manually.' },
        ].map((b, i) => (
          <div key={i} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
            <div style={{width:20, height:20, borderRadius:10, flexShrink:0, marginTop:1, background: b.ok ? 'rgba(44,138,85,.14)' : 'rgba(201,138,46,.14)', color: b.ok ? '#2c8a55' : '#c98a2e', display:'flex', alignItems:'center', justifyContent:'center'}}>
              {b.ok
                ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
                : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/></svg>}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:600, color:C.ink, lineHeight:1.3}}>{b.t}</div>
              <div style={{fontSize:11.5, color:C.ink3, marginTop:1, lineHeight:1.4}}>{b.s}</div>
            </div>
          </div>
        ))}
      </div>
    </OnbShell>
  );
}

function OnbPermNotif() {
  const { bg } = useOnb();
  const C = ONB_BG[bg];
  const channels = [
    { l:'Tomorrow\u2019s assignment', s:'At 5 PM the day before',     on:true,  i:MI.cal,   tone:'accent' },
    { l:'Schedule changes',           s:'If your day moves day-of',    on:true,  i:MI.alert, tone:'amber' },
    { l:'Approval requests',          s:'Time + logs that need review',on:true,  i:MI.bell,  tone:'blue' },
    { l:'Tips & feature drops',       s:'Once a month, if at all',     on:false, i:MI.spark, tone:null },
  ];
  return (
    <OnbShell step={9} total={10} onSkip primary primaryLabel="Allow notifications" secondary secondaryLabel="Maybe later">
      <OnbTitle eyebrow="Step 9 · Permission" title="Stay ahead of the day." sub="We only ping you for things that should interrupt. Toggle off anything you'd rather not see."/>

      <div style={{background:C.card, border:`1px solid ${C.line}`, borderRadius:12, overflow:'hidden'}}>
        {channels.map((c, i) => (
          <div key={c.l} style={{padding:'11px 12px', borderBottom: i < channels.length-1 ? `1px solid ${C.line}` : 'none', display:'flex', alignItems:'center', gap:10}}>
            <div style={{
              width:32, height:32, borderRadius:8,
              background: c.tone === 'accent' ? 'rgba(217,144,74,.10)' :
                          c.tone === 'amber'  ? 'rgba(201,138,46,.12)' :
                          c.tone === 'blue'   ? 'rgba(47,111,181,.10)' : C.line,
              color: c.tone === 'accent' ? '#b46e2c' :
                     c.tone === 'amber'  ? '#c98a2e' :
                     c.tone === 'blue'   ? '#2f6fb5' : C.ink3,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>{React.cloneElement(c.i, {width:16, height:16})}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, fontWeight:600, lineHeight:1.2}}>{c.l}</div>
              <div style={{fontSize:11, color:C.ink3, marginTop:1}}>{c.s}</div>
            </div>
            <div style={{
              width:34, height:20, borderRadius:10, flexShrink:0,
              background: c.on ? '#d9904a' : C.line, position:'relative',
            }}>
              <div style={{position:'absolute', top:2, left: c.on ? 16 : 2, width:16, height:16, borderRadius:8, background:'#fff', boxShadow:'0 1px 2px rgba(0,0,0,.12)'}}/>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:12, fontSize:11, color:C.ink3, textAlign:'center', lineHeight:1.5}}>
        Change these anytime in <span style={{color:C.ink2, fontWeight:600}}>Settings \u00b7 Notifications</span>.
      </div>
    </OnbShell>
  );
}

Object.assign(window, {
  OnbCtx,
  OnbSignUp, OnbEmailMagic, OnbPhoneSMS,
  OnbCompany, OnbTrade, OnbHours,
  OnbPermLocation, OnbPermNotif,
  OnbQBO, OnbAgentSetup, OnbPricing,
  OnbTeam, OnbProject, OnbChecklist,
});
