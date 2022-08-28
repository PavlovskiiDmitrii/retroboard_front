import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  fetchAddClientToGroup,
  fetchRemoveClientToGroup,
} from "../../store/reducers/ActionCreators";
import { PopUp } from "../PopUp/PopUp";
import { Input } from "../Input/Input";
import cn from "classnames";
import "./style.scss";

export const Group = ({
  title,
  clients,
  owner_id,
  id,
}: {
  title: string;
  id: number;
  owner_id: number;
  clients: any[];
}) => {
  const group = useAppSelector((state) =>
    state.myGroupsReduser.groups.find((group) => group.id === id)
  );
  const [activate, setActivate] = useState(false);
  const [formActivate, setFormActivate] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleAddClient = (email: string, id: number | undefined) => {
    if (email && id) {
      dispatch(fetchAddClientToGroup(id, email)).then((data) => {
        setFormActivate(false);
        alert(`пользователь добавлен`);
      });
    }
  };

  const handleRemoveClient = (id: number | undefined, userId: number) => {
    if (id) {
      dispatch(fetchRemoveClientToGroup(id, userId)).then((data) => {
        setFormActivate(false);
        alert(`пользователь удалён`);
      });
    }
  };

  return (
    <div className={cn({ group: true, group_open: activate })}>
      {title} _ +{clients.length}
      <div
        onClick={() => {
          setActivate(!activate);
        }}
      >
        {"/>/"}
      </div>
      {activate && (
        <div>
          {clients.map((client) => (
            <div key={client.id}>
              <span>{client.email}</span>
              {owner_id !== client.id && (
                <Button
                  onClick={() => {
                    handleRemoveClient(id, client.id);
                  }}
                  text={"--"}
                />
              )}
            </div>
          ))}
          <div>
            <Button
              onClick={() => {
                setFormActivate(!formActivate);
              }}
              text={"++"}
            />
            <PopUp activatePopUp={formActivate}>
              <div>
                <Button
                  onClick={() => {
                    setFormActivate(false);
                  }}
                  text={"X"}
                />
                <Input
                  placeholder={"email user"}
                  value={inputValue}
                  setInputValue={setInputValue}
                  cb={setInputValue}
                />
                <Button
                  onClick={() => {
                    handleAddClient(inputValue, group?.id);
                  }}
                  text={"Добавить пользователя"}
                />
              </div>
            </PopUp>
          </div>
        </div>
      )}
    </div>
  );
};
