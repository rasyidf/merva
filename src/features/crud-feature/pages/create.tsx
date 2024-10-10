import { FormBuilder, FormFields } from "@/components/forms";
import { PageHeader } from "@/components/groups/main-header";
import { z } from "zod";

type Props = {
  onCancel: () => void;
};

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().int(),
  password: z.string().min(6),
});

export const EntityCreate = (props: Props) => {
  return (
    <>
      <FormBuilder schema={schema}>
        <FormFields
          meta={[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "age", label: "Age", type: "number" },
            { name: "password", label: "Password", type: "password" },
          ]}
          onCancel={props.onCancel}
          gridColumn={1}
        />
      </FormBuilder>
    </>
  );
};

export default EntityCreate;
