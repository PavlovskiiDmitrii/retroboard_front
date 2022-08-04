import { useState } from "react";
import { SignIn } from "../Auth/SignIn";
import { SignUp } from "../Auth/SignUp";

type ISign = "signin" | "signup";

export const Auth = (props: any) => {
  const [state, setState] = useState<ISign>("signin");
  return (
    <div>
      {state === "signin" ? <SignIn /> : <SignUp setStateSign={setState} />}
      <div>
        <button
          onClick={() => {
            setState("signin");
          }}
        >
          Авторизоваться
        </button>
        <button
          onClick={() => {
            setState("signup");
          }}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};
