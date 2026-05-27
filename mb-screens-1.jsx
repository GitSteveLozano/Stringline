/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard, DCPostIt,
   PWASplash,
   NavBottomIOS, NavTopAppBar, NavDrawerOverflow, NavSwitcher, NavMore,
   DashboardPM,
   ProjectsList,
   ScheduleDay, ScheduleWeek, ScheduleCreateAssignment,
   TimeBurden, TimeLiveVsBudget, TimeForemanEntry,
   RentalsCatalog, RentalsScan, RentalsDispatch, RentalsUtilization, RentalsReturn,
   SettingsHome, SettingsPricing, SettingsTeam, SettingsHours,
   WorkerToday, WorkerHoursWeek, WorkerLogPhoto,
   WorkerClockInSuccess, WorkerScopeToday, WorkerIssue,
   ForemanToday, ForemanDailyLog, ForemanScheduleAhead,
   ForemanCrewMap, ForemanField, ForemanBriefCrew, ForemanCrew,
   GeofenceProjectSetup,
   ProjectCreateEntry, ProjectCreateSheet,
   ProjectCreateQBDedupe,
   ProjectDrafting, BlueprintCanvasFull, ShareProposalSheet,
   ProjectSent, ProjectAccepted, ProjectInProgress, ProjectDone, ProjectArchiveSheet,
   ProjectCrewOwner, ProjectCrewForeman, TimeQueueAllProjects,
   DashboardCalmDefault, DashboardCalmFiltered,
   StateOffline, StateError, StateEmpty, StateLoading, StatePermissionDenied,
   OnbCtx, OnbSignUp, OnbEmailMagic, OnbPhoneSMS, OnbCompany, OnbTrade, OnbHours,
   OnbPermLocation, OnbPermNotif,
   OnbQBO, OnbAgentSetup, OnbPricing, OnbTeam, OnbProject, OnbChecklist,
   SignInHome, SignInMagicSent,
   NotificationsInbox, ClientsList, ClientDetail,
   ProjectFiles, ProjectInvoiceDraft, ProjectInvoiceSent, ProjectPaid,
   AttentionSnoozeSheet, SettingsEstimates,
   ScheduleEmptyCreate, ScheduleAssignmentEdit,
   RentalsCatalogSelect,
   SettingsConnect, SettingsPricingItemNew, SettingsTeamMember,
   StateStale, OnbPricingTemplate, OnbProjectSample,
   ProfileAccount, HelpSupport,
   ForemanInviteAccept, ForemanFirstRun,
   MaterialsRequest, ProjectChatList, ProjectChatThread,
   ForemanProjectDetail, ForemanTimeWeek,
   ForemanDailyLogSubmitted, ForemanBriefPreview,
   ForemanCrewMemberSheet, ForemanProfile,
   WorkerInviteAccept, WorkerFirstRun,
   WorkerClockInManual, WorkerClockOutSuccess,
   WorkerIssueSubmitted, WorkerHoursCorrection, WorkerTimeOff,
   WorkerLogHistory, WorkerNotifications, WorkerProfile,
   SafetyInterrupt, OwnerAuthorizations,
   ForemanDailyLogReview, ForemanNotifications,
   OwnerBroadcast, ProjectActivityLog, SettingsPermissions,
   TweaksPanel, TweakSection, TweakRadio, TweakSelect, useTweaks
*/

const PHONE_W = 290;
const PHONE_H = 600;

function Phone({ children }) {
  return (
    <div style={{
      width:'100%', height:'100%', borderRadius: 32, overflow:'hidden',
      background: '#f7f4ef',
      boxShadow: '0 1px 0 rgba(0,0,0,0.06), 0 30px 60px rgba(50,40,30,0.10), 0 0 0 1px rgba(60,50,40,0.10)',
      display:'flex', flexDirection:'column',
      position:'relative',
    }}>
      {/* fake notch */}
      <div style={{position:'absolute', top:8, left:'50%', transform:'translateX(-50%)', width:90, height:22, borderRadius:14, background:'#0e0c0a', zIndex:50}}/>
      {/* status bar */}
      <div style={{height:30, padding:'8px 18px 0', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0, fontSize:11, fontWeight:600, fontFamily:'Geist, system-ui, sans-serif', position:'relative', zIndex:5}}>
        <span style={{fontFeatureSettings:'"tnum"'}}>9:41</span>
        <span style={{display:'flex', gap:5, alignItems:'center'}}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4" rx="0.5"/><rect x="4" y="4" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="8" rx="0.5"/><rect x="12" y="0" width="3" height="10" rx="0.5"/></svg>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 4a8 8 0 0112 0M3.5 6.5a4 4 0 017 0M6 9h2"/></svg>
          <svg width="22" height="10" viewBox="0 0 22 10" fill="none"><rect x="0.5" y="0.5" width="18" height="9" rx="2.5" stroke="currentColor"/><rect x="2" y="2" width="14" height="6" rx="1" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="3" rx="0.5" fill="currentColor"/></svg>
        </span>
      </div>
      {/* content */}
      <div style={{flex:1, minHeight:0, display:'flex', flexDirection:'column', overflow:'hidden'}}>
        {children}
      </div>
      {/* home indicator */}
      <div style={{position:'absolute', bottom:6, left:'50%', transform:'translateX(-50%)', width:90, height:4, borderRadius:2, background:'rgba(0,0,0,0.25)', zIndex:60}}/>
    </div>
  );
}

function Frame({ children, w = PHONE_W, h = PHONE_H }) {
  return (
    <div style={{ width: w, height: h }}>
      <Phone>{children}</Phone>
    </div>
  );
}

function App() {
  const [tw, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "onbBg": "sand",
    "onbLayout": "stacked",
    "onbLength": "full"
  }/*EDITMODE-END*/);
  const showAll = tw.onbLength === 'full';

  return (
    <OnbCtx.Provider value={{ bg: tw.onbBg, layout: tw.onbLayout, length: tw.onbLength }}>
    <DesignCanvas backgroundColor="#f0eee9" initialScale={0.55}>
      <div style={{padding: '50px 60px 8px', maxWidth: 880}}>
        <div style={{fontSize:11, fontWeight:600, color:'rgba(60,50,40,0.55)', letterSpacing:'.10em', textTransform:'uppercase'}}>Sitelayer · Mobile</div>
        <h1 style={{fontSize:46, fontWeight:700, letterSpacing:'-0.025em', margin:'8px 0 12px', color:'rgba(20,16,10,0.92)'}}>Run the day from your pocket.</h1>
        <p style={{fontSize:16, color:'rgba(60,50,40,0.70)', lineHeight:1.55, margin:0, maxWidth:680}}>
          A complete mobile design pass for Sitelayer — every screen a contractor, foreman, or crew member touches on phone. Install + permissions, role-aware home, project flows (bid → estimate → schedule → time), rentals, settings, dedicated worker and foreman apps, and the system states that hold it all together.
        </p>
      </div>

      {/* ===== 1. SIGN IN · returning user ===== */}
      <DCSection id="sec1" title="1 · Sign in" subtitle="Returning users land here when they open the app. New users go to Onboarding (sec14). Same auth providers as sign-up but with email/password as the primary, since most contractors will sign in this way.">
        <DCArtboard id="si-home"  label="Sign in · home"         width={PHONE_W} height={PHONE_H}><Phone><SignInHome/></Phone></DCArtboard>
        <DCArtboard id="si-magic" label="Magic link · sent"      width={PHONE_W} height={PHONE_H}><Phone><SignInMagicSent/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 2. NAV ===== */}
      <DCSection id="sec2" title="2 · Navigation system" subtitle="The chassis: tabs, top app bar, account switcher, and the More tab as the 5th slot. iOS and Android share the same model — bottom-nav primary, More for overflow. (We explored a hamburger drawer but standardized on More-tab; drawer artboard removed per audit.)">
        <DCArtboard id="nav-ios" label="iOS · tabs (variant)" width={PHONE_W} height={PHONE_H}><Phone><NavBottomIOS/></Phone></DCArtboard>
        <DCArtboard id="nav-top" label="Top app bar" width={PHONE_W} height={PHONE_H}><Phone><NavTopAppBar/></Phone></DCArtboard>
        <DCArtboard id="nav-switch" label="Workspace + project switcher" width={PHONE_W} height={PHONE_H}><Phone><NavSwitcher/></Phone></DCArtboard>
        <DCArtboard id="nav-more" label="More tab · 5th slot" width={PHONE_W} height={PHONE_H}><Phone><NavMore/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 3. DASHBOARD ===== */}
      <DCSection id="sec3" title="3 · Owner / PM home" subtitle="Calm by default. Default state is the morning view — only project list, no metric walls. The attention card appears when a project crosses a guardrail (margin, schedule, blocker). User can toggle 'What needs me?' for a focused list. Dismissing the attention card opens a snooze sheet so the dismiss has a real model behind it.">
        <DCArtboard id="db-calm-default" label="Default — calm" width={PHONE_W} height={PHONE_H}><Phone><DashboardCalmDefault/></Phone></DCArtboard>
        <DCArtboard id="db-calm-filtered" label="What needs me?" width={PHONE_W} height={PHONE_H}><Phone><DashboardCalmFiltered/></Phone></DCArtboard>
        <DCArtboard id="db-pm" label="With attention card" width={PHONE_W} height={PHONE_H}><Phone><DashboardPM/></Phone></DCArtboard>
        <DCArtboard id="db-snooze" label="Snooze sheet · dismiss model" width={PHONE_W} height={PHONE_H}><Phone><AttentionSnoozeSheet/></Phone></DCArtboard>
        <DCArtboard id="db-auth" label="Owner approvals · queue" width={PHONE_W} height={PHONE_H}><Phone><OwnerAuthorizations/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 4. PROJECT LIFECYCLE — one record, one page, many states ===== */}
      <DCSection id="sec4" title="4 · Projects · one record, one page" subtitle="A project is the only durable record. There is no separate bid, estimate, takeoff, or contract — those are just states of the same thing. Read this row left to right: it's the literal journey of a project from creation to close, with the alt-paths (QB dedupe, drill-ins, archive) sitting next to the screen they branch from.">

        {/* === ENTRY === */}
        <DCArtboard id="prj-list" label="① Projects list" width={PHONE_W} height={PHONE_H}><Phone><ProjectsList/></Phone></DCArtboard>
        <DCArtboard id="prj-create-entry" label="② Tap + New" width={PHONE_W} height={PHONE_H}><Phone><ProjectCreateEntry/></Phone></DCArtboard>
        <DCArtboard id="prj-create-sheet" label="③ Create sheet · 2 required fields" width={PHONE_W} height={PHONE_H}><Phone><ProjectCreateSheet/></Phone></DCArtboard>
        <DCArtboard id="prj-create-qb" label="③ alt · QB name conflict" width={PHONE_W} height={PHONE_H}><Phone><ProjectCreateQBDedupe/></Phone></DCArtboard>

        {/* === DRAFTING === */}
        <DCArtboard id="prj-drafting" label="④ State · Drafting" width={PHONE_W} height={PHONE_H}><Phone><ProjectDrafting/></Phone></DCArtboard>
        <DCArtboard id="prj-blueprint" label="④ drill-in · Blueprint canvas" width={PHONE_W} height={PHONE_H}><Phone><BlueprintCanvasFull/></Phone></DCArtboard>
        <DCArtboard id="prj-share" label="⑤ Tap Send → share sheet" width={PHONE_W} height={PHONE_H}><Phone><ShareProposalSheet/></Phone></DCArtboard>

        {/* === CLIENT-FACING === */}
        <DCArtboard id="prj-sent" label="⑥ State · Sent" width={PHONE_W} height={PHONE_H}><Phone><ProjectSent/></Phone></DCArtboard>
        <DCArtboard id="prj-archive" label="⑥ alt · Lost / archived" width={PHONE_W} height={PHONE_H}><Phone><ProjectArchiveSheet/></Phone></DCArtboard>
        <DCArtboard id="prj-accepted" label="⑦ State · Accepted" width={PHONE_W} height={PHONE_H}><Phone><ProjectAccepted/></Phone></DCArtboard>
        <DCArtboard id="prj-geofence" label="⑦ Setup · draw site geofence" width={PHONE_W} height={PHONE_H}><Phone><GeofenceProjectSetup/></Phone></DCArtboard>

        {/* === IN FLIGHT === */}
        <DCArtboard id="prj-progress" label="⑧ State · In progress" width={PHONE_W} height={PHONE_H}><Phone><ProjectInProgress/></Phone></DCArtboard>
        <DCArtboard id="prj-crew-owner" label="⑧ drill-in · Crew (owner)" width={PHONE_W} height={PHONE_H}><Phone><ProjectCrewOwner/></Phone></DCArtboard>
        <DCArtboard id="prj-crew-foreman" label="⑧ drill-in · Crew (foreman)" width={PHONE_W} height={PHONE_H}><Phone><ProjectCrewForeman/></Phone></DCArtboard>

        {/* === CLOSE === */}
        <DCArtboard id="prj-done" label="⑨ State · Done" width={PHONE_W} height={PHONE_H}><Phone><ProjectDone/></Phone></DCArtboard>
        <DCArtboard id="prj-files" label="drill-in · Files tab" width={PHONE_W} height={PHONE_H}><Phone><ProjectFiles/></Phone></DCArtboard>
        <DCArtboard id="prj-invoice" label="⑩ Invoice · draft" width={PHONE_W} height={PHONE_H}><Phone><ProjectInvoiceDraft/></Phone></DCArtboard>
        <DCArtboard id="prj-invoice-sent" label="⑪ Invoice · sent" width={PHONE_W} height={PHONE_H}><Phone><ProjectInvoiceSent/></Phone></DCArtboard>
        <DCArtboard id="prj-paid" label="⑫ State · Paid + closed" width={PHONE_W} height={PHONE_H}><Phone><ProjectPaid/></Phone></DCArtboard>

        {/* === LIVE METRICS · drill-in === */}
        <DCArtboard id="prj-live-vs-budget" label="drill-in · Live vs budget" width={PHONE_W} height={PHONE_H}><Phone><TimeLiveVsBudget/></Phone></DCArtboard>
        <DCArtboard id="prj-log-review" label="drill-in · Foreman log review (owner)" width={PHONE_W} height={PHONE_H}><Phone><ForemanDailyLogReview/></Phone></DCArtboard>
        <DCArtboard id="prj-activity" label="drill-in · Activity log (all roles)" width={PHONE_W} height={PHONE_H}><Phone><ProjectActivityLog/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 5. CLIENTS · lightweight CRM ===== */}
      <DCSection id="sec5" title="5 · Clients" subtitle="Lightweight CRM. Builder / GC / owner records that projects, estimates, and invoices hang off of. New per audit — previously clients only existed as names on estimate recipients.">
        <DCArtboard id="cli-list"   label="Clients list"        width={PHONE_W} height={PHONE_H}><Phone><ClientsList/></Phone></DCArtboard>
        <DCArtboard id="cli-detail" label="Client · detail"      width={PHONE_W} height={PHONE_H}><Phone><ClientDetail/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 6. NOTIFICATIONS · inbox ===== */}
      <DCSection id="sec6" title="6 · Notifications" subtitle="Where pushed nudges land persistently. Reachable from More tab + bell icon. Grouped by recency, filtered by domain, with read/unread state and inline actions for the common follow-ups. Owner can also compose a broadcast to all field staff.">
        <DCArtboard id="nf-inbox" label="Inbox · grouped + unread" width={PHONE_W} height={PHONE_H}><Phone><NotificationsInbox/></Phone></DCArtboard>
        <DCArtboard id="nf-broadcast" label="Owner · broadcast compose" width={PHONE_W} height={PHONE_H}><Phone><OwnerBroadcast/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 7. SCHEDULE ===== */}
      <DCSection id="sec7" title="7 · Schedule" subtitle="Where bodies meet jobs. Daily stream for foremen and PMs; weekly grid for capacity planning; a focused sheet for assigning a crew with smart defaults. Tap an existing assignment to edit or cancel.">
        <DCArtboard id="sch-day" label="Today · day stream" width={PHONE_W} height={PHONE_H}><Phone><ScheduleDay/></Phone></DCArtboard>
        <DCArtboard id="sch-week" label="Week · capacity grid" width={PHONE_W} height={PHONE_H}><Phone><ScheduleWeek/></Phone></DCArtboard>
        <DCArtboard id="sch-empty" label="New assignment · empty state" width={PHONE_W} height={PHONE_H}><Phone><ScheduleEmptyCreate/></Phone></DCArtboard>
        <DCArtboard id="sch-create" label="New assignment · filled" width={PHONE_W} height={PHONE_H}><Phone><ScheduleCreateAssignment/></Phone></DCArtboard>
        <DCArtboard id="sch-edit" label="Tap-to-edit · move + cancel" width={PHONE_W} height={PHONE_H}><Phone><ScheduleAssignmentEdit/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 8. TIME — cross-project queue only.
           TimeBurden moved → Section 10 (Settings) · it's loaded-rate config.
           TimeLiveVsBudget moved → Section 4 drill-in · it's per-project analytics.
           TimeForemanEntry moved → Section 12 (Foreman) · it's a foreman screen. ===== */}
      <DCSection id="sec8" title="8 · Time · approvals queue" subtitle="Cross-project approval queue. The only standalone Time view — the math and the foreman entry now live in the sections they belong to. Reached from the Time tab in the bottom nav.">
        <DCArtboard id="t-cross" label="Time queue · all projects" width={PHONE_W} height={PHONE_H}><Phone><TimeQueueAllProjects/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 9. RENTALS ===== */}
      <DCSection id="sec9" title="9 · Rentals" subtitle="Equipment as a side-revenue line. Tag-scan an asset to dispatch or return; multi-select from the catalog for an office-side bulk dispatch; track utilization to find dead weight in the fleet.">
        <DCArtboard id="rent-cat" label="Catalog · 14 assets" width={PHONE_W} height={PHONE_H}><Phone><RentalsCatalog/></Phone></DCArtboard>
        <DCArtboard id="rent-select" label="Catalog · multi-select" width={PHONE_W} height={PHONE_H}><Phone><RentalsCatalogSelect/></Phone></DCArtboard>
        <DCArtboard id="rent-scan" label="Scan · QR found" width={PHONE_W} height={PHONE_H}><Phone><RentalsScan/></Phone></DCArtboard>
        <DCArtboard id="rent-dispatch" label="Dispatch sheet" width={PHONE_W} height={PHONE_H}><Phone><RentalsDispatch/></Phone></DCArtboard>
        <DCArtboard id="rent-return" label="Return + condition" width={PHONE_W} height={PHONE_H}><Phone><RentalsReturn/></Phone></DCArtboard>
        <DCArtboard id="rent-util" label="Utilization · 30d" width={PHONE_W} height={PHONE_H}><Phone><RentalsUtilization/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 10. SETTINGS ===== */}
      <DCSection id="sec10" title="10 · Settings" subtitle="The workspace's home. Integrations (QBO, Gusto, Stripe), the pricing book, the team, hours, estimates + invoicing defaults, loaded-rate config (the lever that fixes margins), and the account / profile / help screens that hang off the bottom of every settings tree.">
        <DCArtboard id="set-home" label="Settings home" width={PHONE_W} height={PHONE_H}><Phone><SettingsHome/></Phone></DCArtboard>
        <DCArtboard id="set-pricing" label="Pricing book" width={PHONE_W} height={PHONE_H}><Phone><SettingsPricing/></Phone></DCArtboard>
        <DCArtboard id="set-pricing-new" label="Pricing item · new / edit" width={PHONE_W} height={PHONE_H}><Phone><SettingsPricingItemNew/></Phone></DCArtboard>
        <DCArtboard id="set-team" label="Team · 14 + invites" width={PHONE_W} height={PHONE_H}><Phone><SettingsTeam/></Phone></DCArtboard>
        <DCArtboard id="set-team-member" label="Team member · detail sheet" width={PHONE_W} height={PHONE_H}><Phone><SettingsTeamMember/></Phone></DCArtboard>
        <DCArtboard id="set-hours" label="Working hours + holidays" width={PHONE_W} height={PHONE_H}><Phone><SettingsHours/></Phone></DCArtboard>
        <DCArtboard id="set-estimates" label="Estimates + invoices · defaults" width={PHONE_W} height={PHONE_H}><Phone><SettingsEstimates/></Phone></DCArtboard>
        <DCArtboard id="set-burden" label="Loaded labor cost · burden" width={PHONE_W} height={PHONE_H}><Phone><TimeBurden/></Phone></DCArtboard>
        <DCArtboard id="set-connect" label="Connect vendor · Stripe / Xero" width={PHONE_W} height={PHONE_H}><Phone><SettingsConnect/></Phone></DCArtboard>
        <DCArtboard id="set-profile" label="Profile · account" width={PHONE_W} height={PHONE_H}><Phone><ProfileAccount/></Phone></DCArtboard>
        <DCArtboard id="set-help" label="Help + support" width={PHONE_W} height={PHONE_H}><Phone><HelpSupport/></Phone></DCArtboard>
        <DCArtboard id="set-perm" label="Roles + permissions matrix" width={PHONE_W} height={PHONE_H}><Phone><SettingsPermissions/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 11. WORKER APP ===== */}
      <DCSection id="sec11" title="11 · Worker app" subtitle="The crew member's view: dark, minimal, glove-friendly. Big clock, today's job, this week's hours, photo logging with auto-tag. Round 2 closes the worker audit: invite + first-run, manual clock-in fallback, clock-out success, issue-submitted state, hours correction + time off, log history, notifications, profile.">
        {/* === ENTRY === */}
        <DCArtboard id="wk-invite"     label="① Invite accept · phone-first" width={PHONE_W} height={PHONE_H}><Phone><WorkerInviteAccept/></Phone></DCArtboard>
        <DCArtboard id="wk-firstrun"   label="② First run · 3 toggles"     width={PHONE_W} height={PHONE_H}><Phone><WorkerFirstRun/></Phone></DCArtboard>

        {/* === DAY === */}
        <DCArtboard id="wk-today"      label="Today · clocked in"                width={PHONE_W} height={PHONE_H}><Phone><WorkerToday/></Phone></DCArtboard>
        <DCArtboard id="wk-clockin"    label="Auto clock-in success"            width={PHONE_W} height={PHONE_H}><Phone><WorkerClockInSuccess/></Phone></DCArtboard>
        <DCArtboard id="wk-clockin-manual" label="Manual clock-in · fallback"   width={PHONE_W} height={PHONE_H}><Phone><WorkerClockInManual/></Phone></DCArtboard>
        <DCArtboard id="wk-clockout"   label="Clock-out success"                width={PHONE_W} height={PHONE_H}><Phone><WorkerClockOutSuccess/></Phone></DCArtboard>

        {/* === SCOPE === */}
        <DCArtboard id="wk-scope"      label="Today's scope"                    width={PHONE_W} height={PHONE_H}><Phone><WorkerScopeToday/></Phone></DCArtboard>

        {/* === ISSUE === */}
        <DCArtboard id="wk-issue"      label="Flag a problem"                   width={PHONE_W} height={PHONE_H}><Phone><WorkerIssue/></Phone></DCArtboard>
        <DCArtboard id="wk-issue-sent" label="Issue submitted · live status"    width={PHONE_W} height={PHONE_H}><Phone><WorkerIssueSubmitted/></Phone></DCArtboard>

        {/* === HOURS === */}
        <DCArtboard id="wk-hours"      label="My week · hours"                  width={PHONE_W} height={PHONE_H}><Phone><WorkerHoursWeek/></Phone></DCArtboard>
        <DCArtboard id="wk-correction" label="Hours correction · sheet"         width={PHONE_W} height={PHONE_H}><Phone><WorkerHoursCorrection/></Phone></DCArtboard>
        <DCArtboard id="wk-timeoff"    label="Time off request"                 width={PHONE_W} height={PHONE_H}><Phone><WorkerTimeOff/></Phone></DCArtboard>

        {/* === LOG === */}
        <DCArtboard id="wk-log"        label="Photo + note"                      width={PHONE_W} height={PHONE_H}><Phone><WorkerLogPhoto/></Phone></DCArtboard>
        <DCArtboard id="wk-log-history" label="Log history · grid"               width={PHONE_W} height={PHONE_H}><Phone><WorkerLogHistory/></Phone></DCArtboard>

        {/* === PROFILE + NOTIFICATIONS === */}
        <DCArtboard id="wk-notif"      label="Notifications · inbox"            width={PHONE_W} height={PHONE_H}><Phone><WorkerNotifications/></Phone></DCArtboard>
        <DCArtboard id="wk-profile"    label="Profile · minimal"                width={PHONE_W} height={PHONE_H}><Phone><WorkerProfile/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 12. FOREMAN APP ===== */}
      <DCSection id="sec12" title="12 · Foreman app" subtitle="Field lead: oversees the crew across all sites, receives field pings, owns the daily log, and authors the brief that crew sees. New per the foreman audit: invite + first-run, materials request, project chat (the missing cross-role comms channel), brief preview, time week, foreman-flavored project detail, and crew member sheet.">
        {/* === ENTRY · invite + first-run === */}
        <DCArtboard id="fm-invite"  label="① Invite accept"               width={PHONE_W} height={PHONE_H}><Phone><ForemanInviteAccept/></Phone></DCArtboard>
        <DCArtboard id="fm-firstrun" label="② First run · 4 steps"        width={PHONE_W} height={PHONE_H}><Phone><ForemanFirstRun/></Phone></DCArtboard>

        {/* === DAILY · today + drill-ins === */}
        <DCArtboard id="fm-today" label="Today · multi-site home" width={PHONE_W} height={PHONE_H}><Phone><ForemanToday/></Phone></DCArtboard>
        <DCArtboard id="fm-proj-detail" label="Project detail · foreman view" width={PHONE_W} height={PHONE_H}><Phone><ForemanProjectDetail/></Phone></DCArtboard>

        {/* === AUTHORING · brief + preview === */}
        <DCArtboard id="fm-brief" label="Brief crew · authoring" width={PHONE_W} height={PHONE_H}><Phone><ForemanBriefCrew/></Phone></DCArtboard>
        <DCArtboard id="fm-brief-preview" label="Brief · preview (what crew sees)" width={PHONE_W} height={PHONE_H}><Phone><ForemanBriefPreview/></Phone></DCArtboard>

        {/* === CREW tab + drill-ins === */}
        <DCArtboard id="fm-crew" label="Crew tab · roster today" width={PHONE_W} height={PHONE_H}><Phone><ForemanCrew/></Phone></DCArtboard>
        <DCArtboard id="fm-crew-member" label="Crew member · sheet" width={PHONE_W} height={PHONE_H}><Phone><ForemanCrewMemberSheet/></Phone></DCArtboard>
        <DCArtboard id="fm-map" label="Live crew map" width={PHONE_W} height={PHONE_H}><Phone><ForemanCrewMap/></Phone></DCArtboard>

        {/* === FIELD · intake → materials → chat === */}
        <DCArtboard id="fm-field" label="Field intake · from the crew" width={PHONE_W} height={PHONE_H}><Phone><ForemanField/></Phone></DCArtboard>
        <DCArtboard id="fm-materials" label="Materials request · sheet" width={PHONE_W} height={PHONE_H}><Phone><MaterialsRequest/></Phone></DCArtboard>
        <DCArtboard id="fm-chat-list" label="Project chat · list" width={PHONE_W} height={PHONE_H}><Phone><ProjectChatList/></Phone></DCArtboard>
        <DCArtboard id="fm-chat-thread" label="Project chat · thread" width={PHONE_W} height={PHONE_H}><Phone><ProjectChatThread/></Phone></DCArtboard>

        {/* === LOG === */}
        <DCArtboard id="fm-log" label="Daily log · drafted" width={PHONE_W} height={PHONE_H}><Phone><ForemanDailyLog/></Phone></DCArtboard>
        <DCArtboard id="fm-log-submitted" label="Daily log · submitted" width={PHONE_W} height={PHONE_H}><Phone><ForemanDailyLogSubmitted/></Phone></DCArtboard>

        {/* === SCHEDULE === */}
        <DCArtboard id="fm-sched" label="Schedule · 2 wks" width={PHONE_W} height={PHONE_H}><Phone><ForemanScheduleAhead/></Phone></DCArtboard>

        {/* === TIME · week landing + entry sheet === */}
        <DCArtboard id="fm-time-week" label="Time tab · week landing" width={PHONE_W} height={PHONE_H}><Phone><ForemanTimeWeek/></Phone></DCArtboard>
        <DCArtboard id="fm-time-entry" label="Foreman time entry · sheet" width={PHONE_W} height={PHONE_H}><Phone><TimeForemanEntry/></Phone></DCArtboard>

        {/* === PROFILE === */}
        <DCArtboard id="fm-profile" label="Foreman profile" width={PHONE_W} height={PHONE_H}><Phone><ForemanProfile/></Phone></DCArtboard>
        <DCArtboard id="fm-notif" label="Foreman notifications · inbox" width={PHONE_W} height={PHONE_H}><Phone><ForemanNotifications/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 14. ONBOARDING ===== */}
      <DCSection id="sec14" title="14 · Onboarding" subtitle="Owner / PM workspace setup. Picks up right after the splash and ends at the first project. Tone is fast and utilitarian — most contractors won't read past the first sentence. The AI agent does the data-heavy work (pricing book + team) so the user is just reviewing, not authoring. Tweak the background, length, and layout from the Tweaks panel.">
        <DCArtboard id="onb-signup"  label="① Sign up · brand moment"        width={PHONE_W} height={PHONE_H}><Phone><OnbSignUp/></Phone></DCArtboard>
        {showAll && <DCArtboard id="onb-email" label="① alt · email magic link"  width={PHONE_W} height={PHONE_H}><Phone><OnbEmailMagic/></Phone></DCArtboard>}
        {showAll && <DCArtboard id="onb-sms"   label="① alt · phone SMS code"     width={PHONE_W} height={PHONE_H}><Phone><OnbPhoneSMS/></Phone></DCArtboard>}
        <DCArtboard id="onb-company" label="② Company · name, region, logo"   width={PHONE_W} height={PHONE_H}><Phone><OnbCompany/></Phone></DCArtboard>
        <DCArtboard id="onb-trade"   label="③ Trade + crew size"              width={PHONE_W} height={PHONE_H}><Phone><OnbTrade/></Phone></DCArtboard>
        <DCArtboard id="onb-hours"     label="④ Days + hours + timezone"        width={PHONE_W} height={PHONE_H}><Phone><OnbHours/></Phone></DCArtboard>
        <DCArtboard id="onb-perm-loc"  label="⑤ Permission · location"           width={PHONE_W} height={PHONE_H}><Phone><OnbPermLocation/></Phone></DCArtboard>
        <DCArtboard id="onb-qbo"       label="⑥ Connect QuickBooks"              width={PHONE_W} height={PHONE_H}><Phone><OnbQBO/></Phone></DCArtboard>
        <DCArtboard id="onb-agent"     label="⑦ Agent · building workspace"      width={PHONE_W} height={PHONE_H}><Phone><OnbAgentSetup/></Phone></DCArtboard>
        <DCArtboard id="onb-pricing"   label="⑧ Pricing book · agent draft"     width={PHONE_W} height={PHONE_H}><Phone><OnbPricing/></Phone></DCArtboard>
        {showAll && <DCArtboard id="onb-pricing-tmpl" label="alt · pricing template (skipped QBO)" width={PHONE_W} height={PHONE_H}><Phone><OnbPricingTemplate/></Phone></DCArtboard>}
        <DCArtboard id="onb-team"      label="⑨ Team · invite from QBO"         width={PHONE_W} height={PHONE_H}><Phone><OnbTeam/></Phone></DCArtboard>
        <DCArtboard id="onb-perm-notif" label="⑩ Permission · notifications"    width={PHONE_W} height={PHONE_H}><Phone><OnbPermNotif/></Phone></DCArtboard>
        <DCArtboard id="onb-project"   label="⑪ First project"                  width={PHONE_W} height={PHONE_H}><Phone><OnbProject/></Phone></DCArtboard>
        {showAll && <DCArtboard id="onb-sample" label="alt · sample project tour" width={PHONE_W} height={PHONE_H}><Phone><OnbProjectSample/></Phone></DCArtboard>}
        <DCArtboard id="onb-done"      label="⑫ You're in · what's next"         width={PHONE_W} height={PHONE_H}><Phone><OnbChecklist/></Phone></DCArtboard>
      </DCSection>

      {/* ===== 13. SYSTEM STATES ===== */}
      <DCSection id="sec13" title="13 · System states" subtitle="Offline (job sites have no signal), error (QBO/auth), empty (new account), loading (skeletons that match real layout), and permissions denied (location off).">
        <DCArtboard id="st-offline" label="Offline · 4 queued" width={PHONE_W} height={PHONE_H}><Phone><StateOffline/></Phone></DCArtboard>
        <DCArtboard id="st-error" label="Error · QBO 401" width={PHONE_W} height={PHONE_H}><Phone><StateError/></Phone></DCArtboard>
        <DCArtboard id="st-empty" label="Empty · no projects" width={PHONE_W} height={PHONE_H}><Phone><StateEmpty/></Phone></DCArtboard>
        <DCArtboard id="st-loading" label="Loading · skeleton" width={PHONE_W} height={PHONE_H}><Phone><StateLoading/></Phone></DCArtboard>
        <DCArtboard id="st-perm" label="Permission denied" width={PHONE_W} height={PHONE_H}><Phone><StatePermissionDenied/></Phone></DCArtboard>
        <DCArtboard id="st-splash" label="Cold start · splash" width={PHONE_W} height={PHONE_H}><Phone><PWASplash/></Phone></DCArtboard>
        <DCArtboard id="st-stale" label="Version stale · reload" width={PHONE_W} height={PHONE_H}><Phone><StateStale/></Phone></DCArtboard>
        <DCArtboard id="st-safety" label="SAFETY · stop work interrupt" width={PHONE_W} height={PHONE_H}><Phone><SafetyInterrupt/></Phone></DCArtboard>
      </DCSection>

      <div style={{padding:'40px 60px 80px', maxWidth:880, fontSize:13, color:'rgba(60,50,40,0.6)', lineHeight:1.6}}>
        13 sections · ~85 screens · designed mobile-first against the existing Sitelayer brand and the desktop portal in <code style={{padding:'2px 6px', background:'rgba(60,50,40,0.06)', borderRadius:4}}>index.html</code>. Every screen sized to a 290×600 viewport (iPhone-class) with the same 4px grid, color tokens, and type stack as the desktop product.
      </div>
    </DesignCanvas>

    <TweaksPanel title="Onboarding tweaks">
      <TweakSection label="Background">
        <TweakRadio label="BG tone" value={tw.onbBg} options={[{value:'sand', label:'Sand'}, {value:'white', label:'White'}, {value:'dark', label:'Dark'}]} onChange={v => setTweak('onbBg', v)}/>
      </TweakSection>
      <TweakSection label="Length">
        <TweakRadio label="Flow length" value={tw.onbLength} options={[{value:'full', label:'Full'}, {value:'minimal', label:'Minimal'}]} onChange={v => setTweak('onbLength', v)}/>
      </TweakSection>
      <TweakSection label="Layout">
        <TweakRadio label="Title align" value={tw.onbLayout} options={[{value:'stacked', label:'Stacked'}, {value:'hero', label:'Hero'}]} onChange={v => setTweak('onbLayout', v)}/>
      </TweakSection>
    </TweaksPanel>
    </OnbCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
