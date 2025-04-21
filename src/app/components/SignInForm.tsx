import React from "react";

type Props = {
  setAuthMethod: React.Dispatch<React.SetStateAction<string | null>>;
};

function SignInForm({ setAuthMethod }: Props) {
  return <div>SignInForm</div>;
}

export default SignInForm;
