import { Pad, Stack, Eyebrow, H1, Field, Button } from "@/components/ui";
import { getProject } from "@/server/projects";
import { updateProject } from "@/server/actions";

/** Edit a project's basic details. */
export async function EditProject({ id }: { id: string }) {
  const p = await getProject(id);
  if (!p) {
    return <Pad><div className="v2-quiet v2-body">Project not found.</div></Pad>;
  }

  return (
    <form action={updateProject.bind(null, id)}>
      <Pad>
        <Stack>
          <Eyebrow>Project</Eyebrow>
          <H1>Edit {p.name}.</H1>
          <div className="v2-quiet v2-body">{p.client}</div>

          <Field label="Project name" name="name" defaultValue={p.name} required />
          <Field label="Address" name="address" defaultValue={p.address} placeholder="1403 29 St NW, Calgary AB" />
          <Field
            label="Contract value"
            name="contractValue"
            inputMode="decimal"
            defaultValue={p.contractValue > 0 ? `$${p.contractValue.toLocaleString("en-US")}` : ""}
            placeholder="$156,400"
          />

          <Button variant="primary" type="submit" style={{ width: "100%" }}>Save changes</Button>
        </Stack>
      </Pad>
    </form>
  );
}
