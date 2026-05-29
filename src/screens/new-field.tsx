import { Pad, Stack, Eyebrow, H1, Button, FormSelect, FormTextarea } from "@/components/ui";
import { getActiveProjectOptions } from "@/server/projects";
import { createFieldReport } from "@/server/actions";

/** Log a field report from a job — blocker, note, or photo. */
export async function NewField() {
  const projects = await getActiveProjectOptions();

  if (projects.length === 0) {
    return (
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Field</Eyebrow>
          <H1>No active jobs.</H1>
          <div className="v2-quiet v2-body">Field reports attach to a running job.</div>
        </Stack>
      </Pad>
    );
  }

  return (
    <form action={createFieldReport}>
      <Pad>
        <Stack>
          <Eyebrow>Field</Eyebrow>
          <H1>Log a report.</H1>
          <div className="v2-quiet v2-body">Flag a blocker, drop a note, or mark a photo for the office.</div>

          <FormSelect label="Job" name="projectId" defaultValue="" required>
            <option value="">— Select —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </FormSelect>

          <FormSelect label="Type" name="kind" defaultValue="NOTE">
            <option value="NOTE">Note</option>
            <option value="BLOCKER">Blocker</option>
            <option value="PHOTO">Photo</option>
          </FormSelect>

          <FormTextarea
            label="Detail"
            name="detail"
            required
            rows={4}
            placeholder="Out of EPS 1.5&quot; — 12 sheets to finish the east wall"
            style={{ resize: "vertical" }}
          />

          <Button variant="primary" type="submit" style={{ width: "100%" }}>Log report</Button>
        </Stack>
      </Pad>
    </form>
  );
}
