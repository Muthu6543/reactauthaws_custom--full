import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { CheckboxField, TextField, SelectField } from "@aws-amplify/ui-react";

// https://ui.docs.amplify.aws/components/authenticator?platform=react#headers--footers

export function FormFields() {
  const { validationErrors } = useAuthenticator();

  return (
    <>
      {/* Re-use default `Authenticator.SignUp.FormFields` */}
      <Authenticator.SignUp.FormFields />
      {/* Enter APP-SPECIFIC STANDARD ATTRIBUTES here e.g. address, gender, birthdate` */}
      <TextField
        isRequired
        //key="name"
        name="gender"
        label="Gender"
        placeholder="Gender"
        type="text"
      />
      {/* Enter CUSTOM ATTRIBUTES here` */}
      <SelectField
        isRequired
        label="Category"
        name="custom:category"
        descriptiveText="What's your designation?"
      >
        <option value="student">Student</option>
        <option value="lecturer">Lecturer</option>
        <option value="driver">Driver</option>
      </SelectField>
      <TextField
        isRequired={false}
        name="custom:schoolid"
        label="School ID"
        placeholder="ID"
        type="text"
      />
      {/* Append & require Terms & Conditions field to sign up  */}
      <CheckboxField
        errorMessage={validationErrors.acknowledgement}
        hasError={!!validationErrors.acknowledgement}
        name="acknowledgement"
        value="yes"
        label="I agree with the Terms & Conditions"
      />
    </>
  );
}
