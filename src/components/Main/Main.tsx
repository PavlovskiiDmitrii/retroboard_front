import cn from "classnames";
import { useState, useEffect } from "react";
import { LeftBar } from "../LeftBar/LeftBar";
import { Link } from "react-router-dom";
import { IRoom } from "../../model/IRoom"
import { Routes, Route } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMyRoom } from "../../store/reducers/ActionCreators";

import "./style.scss";

export const Main = ({ props }: any) => {
  const { my } = useAppSelector((state) => state.myUserReduser);
  const { rooms } = useAppSelector((state) => state.myRoomSlice);
  const [myRooms, setMyRooms] = useState<IRoom[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (my.id) {
      dispatch(fetchMyRoom(my.id));
    }
  }, []);

  useEffect(() => {
    if (rooms.length) {
      setMyRooms(rooms);
    }
  }, [rooms]);

  return (
    <div className={cn("main__wrap")}>
      <LeftBar />
      <div className={cn("main__main")}>
        {
          myRooms.map((room) => (
            <div key={room.id}>
              <Link to={`/${room.id}`}><button>__{room.title}__</button></Link>
            </div>
          ))
        }
        
        <Routes>
          {
            myRooms.map((room) => (
              <Route path={`/${room.id}`} element={ <div>{room.title}</div> } />
            ))
          }
        </Routes>
      </div>
    </div>
  );
};
