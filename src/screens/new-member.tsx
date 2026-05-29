import { Pad, Stack, Eyebrow, H1, Field, Button, FormSelect } from "@/components/ui";
import { createMember } from "@/server/actions";

/** Invite a teammate — lands as a pending member the roster can confirm. */
export function NewMember() {
  return (
    <form action={createMember}>
      <Pad>
        <Stack>
          <Eyebrow>Team</Eyebrow>
          <H1>Invite a teammate.</H1>
          <div className="v2-quiet v2-body">They land as invited — confirm them from the roster.</div>

          <Field label="Name" name="name" placeholder="Jordan Pike" required />

          <FormSelect label="Role" name="role" defaultValue="WORKER">
            <option value="OWNER">Owner</option>
            <option value="ESTIMATOR">Estimator</option>
            <option value="FOREMAN">Foreman</option>
            <option value="WORKER">Crew</option>
          </FormSelect>

          <Field label="Hourly rate (optional)" name="rate" inputMode="decimal" placeholder="32" />
          <Field label="Email (optional)" name="email" type="email" placeholder="jordan@davisstucco.com" />
          <Field label="Phone (optional)" name="phone" inputMode="tel" placeholder="+1 403 555 0188" />

          <Button variant="primary" type="submit" style={{ width: "100%" }}>Send invite</Button>
        </Stack>
      </Pad>
    </form>
  );
}
