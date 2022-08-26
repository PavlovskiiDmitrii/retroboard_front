import { useState } from "react";
import cn from "classnames";
import "./style.scss";
import { Link } from "react-router-dom";
import { PopUp } from "../PopUp/PopUp";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export const RoomButton = ({ id, title, type }: any) => {
  const [formActivate, setFormActivate] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const PopUpChildren = () => {
    return (
      <div>
        <Button onClick={() => { setFormActivate(false); }} text={"X"} />
        <Input
          placeholder={"Client email"}
          value={inputValue}
          cb={setInputValue}
        />
        <Button
          onClick={() => {
            
          }}
          text={"Добавить"}
        />
      </div>
    );
  };

  return (
    <div className={cn("roomButton")}>
      <Link to={`/${id}`}>
        <button>__{title}__</button>
      </Link>
      {type && (
        <div>
          <button
            onClick={() => {
              setFormActivate(!formActivate);
            }}
          >
            Добавить клиента
          </button>
        </div>
      )}
      <PopUp activatePopUp={formActivate}>
        <PopUpChildren />
      </PopUp>
    </div>
  );
};
