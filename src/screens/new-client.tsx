import { Pad, Stack, Eyebrow, H1, Field, Button } from "@/components/ui";
import { createClient } from "@/server/actions";

/** Add a client to the book of business. */
export function NewClient() {
  return (
    <form action={createClient}>
      <Pad>
        <Stack>
          <Eyebrow>Book of business</Eyebrow>
          <H1>New client.</H1>
          <div className="v2-quiet v2-body">Add a builder, GC, owner, or architect to bid for.</div>

          <Field label="Name" name="name" placeholder="Cardinal Group" required />

          <label style={{ display: "block" }}>
            <div className="v2-eyebrow" style={{ marginBottom: 6 }}>Type</div>
            <select className="v2-field" name="kind" defaultValue="BUILDER">
              <option value="BUILDER">Builder</option>
              <option value="GC">General contractor</option>
              <option value="OWNER">Owner</option>
              <option value="ARCHITECT">Architect</option>
            </select>
          </label>

          <Field label="Email (optional)" name="email" type="email" placeholder="ops@cardinalgroup.ca" />
          <Field label="Phone (optional)" name="phone" inputMode="tel" placeholder="+1 403 555 0144" />

          <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input type="checkbox" name="isLead" style={{ width: 18, height: 18 }} />
            <span className="v2-body">Lead — not yet won</span>
          </label>

          <Button variant="primary" type="submit" style={{ width: "100%" }}>Add client</Button>
        </Stack>
      </Pad>
    </form>
  );
}
