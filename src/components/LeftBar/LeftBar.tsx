import cn from "classnames";
import { useState, useEffect } from "react";
import { IGroup } from "../../model/IGrous"
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMyGroup, createGroup } from "../../store/reducers/ActionCreators";
import { Input } from '../Input/Input'
import "./style.scss";
import "./formCreateGroud.scss";

export const LeftBar = ({ props }: any) => {
  const { my } = useAppSelector((state) => state.myUserReduser);
  const { groups } = useAppSelector((state) => state.myGroupsReduser);
  const [activate, setActivate] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
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

  return (
    <div className={cn("leftBar", activate && "leftBar_activate")}>
      {
        myGroups.map((group) => (
          <div key={group.id}>
            {group.title}
          </div>
        ))
      }
      <button onClick={() => {
        setActivate(!activate);
      }}>Открыть</button>
      <button onClick={() => {
        setFormActivate(true);
      }}>Слздать группу</button>

      <div className={cn("formCreateGroud", formActivate ? 'formCreateGroud__open' : '')}>
        <div onClick={() => {
          setFormActivate(false);
        }}>
          X
        </div>
        <Input placeholder={'Title group'} value={inputValue} cb={setInputValue}/>
        <button onClick={() => {
          if (my.id) {
            dispatch(createGroup(my.id, inputValue)).then(() => {
              setFormActivate(false);
            });
          } else {
            alert('авторизуйтесь')
          }
        }}>Создать</button>
      </div>
    </div>
  );
};
