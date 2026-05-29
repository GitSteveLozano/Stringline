import { Pad, Stack, Eyebrow, H1, Field, Button, FormSelect } from "@/components/ui";
import { money0 } from "@/lib/demo-data";
import { getProject } from "@/server/projects";
import { billDraw } from "@/server/actions";

/** Bill a progress draw (a % of the contract) on an active project. */
export async function BillDraw({ id }: { id: string }) {
  const p = await getProject(id);
  if (!p) {
    return <Pad><div className="v2-quiet v2-body">Project not found.</div></Pad>;
  }
  if (!["ACCEPTED", "IN_PROGRESS", "DONE"].includes(p.status)) {
    return (
      <Pad>
        <Stack gap="tight">
          <Eyebrow>Billing</Eyebrow>
          <H1>Not billable yet.</H1>
          <div className="v2-quiet v2-body">You can bill a draw once the bid is accepted.</div>
        </Stack>
      </Pad>
    );
  }

  return (
    <form action={billDraw.bind(null, id)}>
      <Pad>
        <Stack>
          <Eyebrow>{p.name}</Eyebrow>
          <H1>Bill a draw.</H1>
          <div className="v2-quiet v2-body">
            Contract {money0(p.contractValue)}. Invoice a percentage as a progress draw — it lands in A/R.
          </div>

          <FormSelect label="Draw" name="label" defaultValue="Progress">
            <option value="Deposit">Deposit</option>
            <option value="Progress">Progress</option>
            <option value="Substantial completion">Substantial completion</option>
            <option value="Final">Final / retention</option>
          </FormSelect>

          <Field label="Percent of contract" name="percent" type="number" min={1} max={100} defaultValue={30} required />

          <Button variant="primary" type="submit" style={{ width: "100%" }}>Send invoice</Button>
        </Stack>
      </Pad>
    </form>
  );
}
