import { Pad, Stack, Eyebrow, H1, Field, Button, FormSelect } from "@/components/ui";
import { getDispatchResources } from "@/server/dispatch";
import { createDispatch } from "@/server/actions";

/** Send an asset out to a job. */
export async function NewDispatch() {
  const { assets, projects } = await getDispatchResources();

  if (projects.length === 0 || assets.length === 0) {
    return (
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Dispatch</Eyebrow>
          <H1>Nothing to dispatch.</H1>
          <div className="v2-quiet v2-body">
            {assets.length === 0 ? "Add equipment to the yard first." : "Accept a bid first — then you can send gear to it."}
          </div>
        </Stack>
      </Pad>
    );
  }

  return (
    <form action={createDispatch}>
      <Pad>
        <Stack>
          <Eyebrow>Dispatch</Eyebrow>
          <H1>Send gear out.</H1>
          <div className="v2-quiet v2-body">Track equipment from the yard onto a job.</div>

          <FormSelect label="Asset" name="assetId" defaultValue="" required>
            <option value="">— Select —</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>{a.name} · {a.available} available</option>
            ))}
          </FormSelect>

          <Field label="Quantity" name="qty" type="number" min={1} defaultValue={1} required />

          <FormSelect label="Project" name="projectId" defaultValue="" required>
            <option value="">— Select —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </FormSelect>

          <Field label="Due back (optional)" name="dueBack" type="date" />

          <Button variant="primary" type="submit" style={{ width: "100%" }}>Dispatch gear</Button>
        </Stack>
      </Pad>
    </form>
  );
}
