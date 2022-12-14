import cn from "classnames";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMyGroup, createGroup } from "../../store/reducers/ActionCreators";
import { Group } from "../Group/Group";
import { Input } from "../Input/Input";
import { PopUp } from "../PopUp/PopUp";
import { Button } from "../Button/Button";
import { IGroup } from "../../model/IGroup";

import "./groupwrap.scss";

export const GroupWrap = ({ myId }: any) => {
  const { groups } = useAppSelector((state) => state.myGroupsReduser);
  const [myGroups, setMyGroups] = useState<IGroup[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [formActivate, setFormActivate] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (myId) {
      dispatch(fetchMyGroup(myId));
    }
  }, []);

  useEffect(() => {
    if (groups.length) {
      setMyGroups(groups);
    }
  }, [groups]);

  const sendCreateGroup = () => {
    if (myId && inputValue !== "") {
      dispatch(createGroup(myId, inputValue)).then(() => {
        setFormActivate(false);
      });
    } else {
      alert("авторизуйтесь");
    }
  };

  return (
    <div>
      <div>Группы</div>
      <div className={cn("groupwrap")}>
        {myGroups.map((group) => (
          <Group
            key={group.id}
            id={group.id}
            title={group.title}
            owner_id={group.owner_id}
            clients={group.clients}
          />
        ))}
        <Button
          onClick={() => {
            setFormActivate(!formActivate);
          }}
          text={"Создать группу"}
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
              placeholder={"Title group"}
              value={inputValue}
              setInputValue={setInputValue}
              cb={setInputValue}
            />
            <Button
              onClick={() => {
                sendCreateGroup();
              }}
              text={"Создать"}
            />
          </div>
        </PopUp>
      </div>
    </div>
  );
};
