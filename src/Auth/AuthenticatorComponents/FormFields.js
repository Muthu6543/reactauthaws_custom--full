import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { CheckboxField, TextField } from "@aws-amplify/ui-react";

// https://ui.docs.amplify.aws/components/authenticator?platform=react#headers--footers

export function FormFields() {
  const { validationErrors } = useAuthenticator();

  return (
    <>
      {/* Re-use default `Authenticator.SignUp.FormFields` */}
      <Authenticator.SignUp.FormFields />
      {/* Enter app-specific standard attributes here 
            e.g. address, gender, birthdate` */}
      <TextField
        isRequired
        //key="name"
        name="gender"
        label="Gender"
        placeholder="Gender"
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
