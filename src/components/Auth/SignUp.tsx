import axios from "axios";
import { useState } from "react";
import { IMyUserResponse } from "../../model/IUser";
import { Input } from '../Input/Input'


export const SignUp = ( props: any) => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setStateSign } = props;
    const changeSingState = () => {
      setStateSign('signin');
    }
    async function singUpResp(email: string, password: string, errorSet: (err: string) => void, OkSet: () => void) {
      const response = await axios.post<IMyUserResponse>(
        "http://localhost:3001/api/auth/singup",
        {
          email: email,
          password: password,
        }
      ).then(() => {
        OkSet();
        alert('зарегистрирован')
      }).catch((err) => {
        errorSet(err);
      });
      
    }
  
    return (
      <div>
        <h1>Загесистрироваться</h1>
        <Input placeholder={'email'} value={email} cb={setEmail}/>
        <Input placeholder={'password'} value={password} cb={setPassword}/>
        <button
          onClick={() => {
            if (email && password) {
              singUpResp(email, password, (error: string) => {setError(error)}, changeSingState);
            }
          }}
        >
          Зарегаться
        </button>
        {
          error ? (<div>Error : {JSON.stringify(error)}</div>) : null
        }
      </div>
    );
  };