import { Pad, Stack, Eyebrow, H1, Field, Button, SectionBar } from "@/components/ui";
import { listClients } from "@/server/projects";
import { createProject } from "@/server/actions";

/** New-bid form. Pick an existing client or type a new one (new name wins). */
export async function NewProject() {
  const clients = await listClients();

  return (
    <form action={createProject}>
      <Pad>
        <Stack>
          <Eyebrow>New bid</Eyebrow>
          <H1>Start a project.</H1>
          <div className="v2-quiet v2-body">It lands in Drafting, ready for takeoff.</div>

          <Field label="Project name" name="name" placeholder="Foothills Medical Annex" required />
          <Field label="Address" name="address" placeholder="1403 29 St NW, Calgary AB" />
          <Field
            label="Estimate value (optional)"
            name="contractValue"
            inputMode="decimal"
            placeholder="$156,400"
          />
        </Stack>
      </Pad>

      <SectionBar>
        <Eyebrow>Client</Eyebrow>
      </SectionBar>
      <Pad>
        <Stack>
          {clients.length > 0 && (
            <label style={{ display: "block" }}>
              <div className="v2-eyebrow" style={{ marginBottom: 6 }}>Existing client</div>
              <select className="v2-field" name="clientId" defaultValue="">
                <option value="">— Select —</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          )}

          <Field
            label={clients.length > 0 ? "Or add a new client" : "New client"}
            name="newClient"
            placeholder="Cardinal Group"
          />
          <label style={{ display: "block" }}>
            <div className="v2-eyebrow" style={{ marginBottom: 6 }}>New client type</div>
            <select className="v2-field" name="clientKind" defaultValue="BUILDER">
              <option value="BUILDER">Builder</option>
              <option value="GC">General contractor</option>
              <option value="OWNER">Owner</option>
              <option value="ARCHITECT">Architect</option>
            </select>
          </label>

          <Button variant="primary" type="submit" style={{ width: "100%" }}>Create project</Button>
        </Stack>
      </Pad>
    </form>
  );
}
