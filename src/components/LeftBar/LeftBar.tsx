import cn from "classnames";
import { useState, useEffect } from "react";
import { IGroup } from "../../model/IGrous"
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMyGroup } from "../../store/reducers/ActionCreators";
import "./style.scss";

export const LeftBar = ({ props }: any) => {
  const { my } = useAppSelector((state) => state.myUserReduser);
  const { groups } = useAppSelector((state) => state.myGroupsReduser);
  const [activate, setActivate] = useState(false);
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
      }}>'asdasd'</button>
    </div>
  );
};
