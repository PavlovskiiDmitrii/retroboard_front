import { useState } from "react";
import { fetchMyUser } from "../../store/reducers/ActionCreators";
import { useAppDispatch } from "../../hooks/redux";
import { Input } from '../Input/Input'

export const SignIn = (props: any) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    return (
      <div>
      <h1>Авторизоваться</h1>
      <Input placeholder={'email'} value={email} cb={setEmail}/>
      <Input placeholder={'password'} value={password} cb={setPassword}/>
        <button
          onClick={() => {
            dispatch(fetchMyUser(email, password));
          }}
        >
          Авторизоваться
        </button>
      </div>
    );
  };