import { Pad, Stack, Eyebrow, H1, Field, Button, FormSelect } from "@/components/ui";
import { getClientProfile } from "@/server/estimator";
import { updateClient } from "@/server/actions";

/** Edit an existing client's details. */
export async function EditClient({ id }: { id: string }) {
  const c = await getClientProfile(id);
  if (!c) {
    return <Pad><div className="v2-quiet v2-body">Client not found.</div></Pad>;
  }

  return (
    <form action={updateClient.bind(null, id)}>
      <Pad>
        <Stack>
          <Eyebrow>Client</Eyebrow>
          <H1>Edit {c.name}.</H1>

          <Field label="Name" name="name" defaultValue={c.name} required />

          <FormSelect label="Type" name="kind" defaultValue={c.kind}>
            <option value="BUILDER">Builder</option>
            <option value="GC">General contractor</option>
            <option value="OWNER">Owner</option>
            <option value="ARCHITECT">Architect</option>
          </FormSelect>

          <Field label="Email" name="email" type="email" defaultValue={c.email ?? ""} />
          <Field label="Phone" name="phone" inputMode="tel" defaultValue={c.phone ?? ""} />

          <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input type="checkbox" name="isLead" defaultChecked={c.isLead} style={{ width: 18, height: 18 }} />
            <span className="v2-body">Lead — not yet won</span>
          </label>

          <Button variant="primary" type="submit" style={{ width: "100%" }}>Save changes</Button>
        </Stack>
      </Pad>
    </form>
  );
}
