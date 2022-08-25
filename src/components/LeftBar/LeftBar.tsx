import cn from "classnames";
import { useState, useEffect } from "react";
import { IGroup } from "../../model/IGrous";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMyGroup, createGroup } from "../../store/reducers/ActionCreators";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { PopUp } from "../PopUp/PopUp";
import { Group } from "../Group/Group";
import { GroupWrap } from "../Group/GroupWrap";
import "./style.scss";

export const LeftBar = ({ props }: any) => {
  const { my } = useAppSelector((state) => state.myUserReduser);
  const { groups } = useAppSelector((state) => state.myGroupsReduser);
  const [activate, setActivate] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [formActivate, setFormActivate] = useState(false);
  const [myGroups, setMyGroups] = useState<IGroup[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (my.id) {
      dispatch(fetchMyGroup(my.id));
    }
  }, []);

  useEffect(() => {
    if (groups.length) {
      setMyGroups(groups);
    }
  }, [groups]);

  const sendCreateGroup = () => {
    if (my.id && inputValue !== "") {
      dispatch(createGroup(my.id, inputValue)).then(() => {
        setFormActivate(false);
      });
    } else {
      alert("авторизуйтесь");
    }
  };

  const PopUpChildren = () => {
    return (
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
          cb={setInputValue}
        />
        <Button
          onClick={() => {
            sendCreateGroup();
          }}
          text={"Создать"}
        />
      </div>
    );
  };

  return (
    <div className={cn("leftBar", activate && "leftBar_activate")}>
      <GroupWrap>
        {myGroups.map((group) => (
          <Group key={group.id} title={group.title} />
        ))}
      </GroupWrap>

      <Button
        onClick={() => {
          setActivate(!activate);
        }}
        text={"Открыть"}
      />
      <Button
        onClick={() => {
          setFormActivate(!formActivate);
        }}
        text={"Создать группу"}
      />
      <PopUp activatePopUp={formActivate}>
        <PopUpChildren />
      </PopUp>
    </div>
  );
};
