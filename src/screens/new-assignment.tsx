import { Pad, Stack, Eyebrow, H1, Field, Button, SectionBar, FormSelect } from "@/components/ui";
import { getAssignableResources } from "@/server/schedule";
import { createAssignment } from "@/server/actions";

/** Schedule a crew to a job for a day. */
export async function NewAssignment() {
  const { projects, crew } = await getAssignableResources();

  if (projects.length === 0) {
    return (
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Schedule</Eyebrow>
          <H1>No active jobs.</H1>
          <div className="v2-quiet v2-body">Accept a bid first — then you can schedule crew onto it.</div>
        </Stack>
      </Pad>
    );
  }

  return (
    <form action={createAssignment}>
      <Pad>
        <Stack>
          <Eyebrow>Schedule</Eyebrow>
          <H1>Assign crew.</H1>
          <div className="v2-quiet v2-body">Send a crew to a job for the day.</div>

          <FormSelect label="Project" name="projectId" defaultValue="" required>
            <option value="">— Select —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </FormSelect>

          <Field label="Date" name="date" type="date" required />
          <Field label="Scope" name="scope" placeholder="EPS · East elevation" />
          <Field label="Sqft goal (optional)" name="sqft" inputMode="numeric" placeholder="1200" />
          <Field label="Planned hours (optional)" name="plannedHr" inputMode="decimal" placeholder="8" />
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>Crew</Eyebrow>
      </SectionBar>
      <Pad>
        <Stack>
          {crew.length === 0 ? (
            <div className="v2-quiet v2-body">No field crew on the roster yet.</div>
          ) : (
            crew.map((c) => (
              <label key={c.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="checkbox" name="crew" value={c.id} style={{ width: 18, height: 18 }} />
                <span className="v2-body">{c.name}</span>
              </label>
            ))
          )}
          <Button variant="primary" type="submit" style={{ width: "100%" }}>Assign crew</Button>
        </Stack>
      </Pad>
    </form>
  );
}
