import cn from "classnames";
import { useState, useEffect } from "react";
import { LeftBar } from "../LeftBar/LeftBar";
import { IRoom } from "../../model/IRoom";
import { Routes, Route } from "react-router-dom";
import { Input } from "../Input/Input";
import { PopUp } from "../PopUp/PopUp";
import { Button } from "../Button/Button";
import { RoomButton } from "../RoomButton/RoomButton";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMyRoom, createRoom } from "../../store/reducers/ActionCreators";

import "./style.scss";

export const Main = ({ props }: any) => {
  const { my } = useAppSelector((state) => state.myUserReduser);
  const { rooms } = useAppSelector((state) => state.myRoomSlice);
  const [myRoomsAdmin, setMyRoomsAdmin] = useState<IRoom[]>([]);
  const [myRooms, setMyRooms] = useState<IRoom[]>([]);
  const [formActivate, setFormActivate] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (my.id) {
      dispatch(fetchMyRoom(my.id));
    }
  }, []);

  useEffect(() => {
    if (rooms.length) {
      const adminRoom: IRoom[] = [];
      const simpleRoom: IRoom[] = [];
      rooms.forEach((room) => {
        if (room.owner_id === my.id) {
          adminRoom.push(room);
        } else {
          simpleRoom.push(room);
        }
      });
      setMyRoomsAdmin(adminRoom);
      setMyRooms(simpleRoom);
    }
  }, [rooms]);

  const PopUpChildren = () => {
    return (
      <div>
        <div
          onClick={() => {
            setFormActivate(false);
          }}
        >
          X
        </div>
        <Input
          placeholder={"Title romm"}
          value={inputValue}
          cb={setInputValue}
        />
        <button
          onClick={() => {
            if (my.id) {
              dispatch(createRoom(my.id, inputValue)).then(() => {
                setFormActivate(false);
              });
            } else {
              alert("авторизуйтесь");
            }
          }}
        >
          Создать
        </button>
      </div>
    );
  };

  return (
    <div className={cn("main__wrap")}>
      <LeftBar />
      <div className={cn("main__main")}>
        <div>Админ</div>
        {myRoomsAdmin.map((room) => (
          <RoomButton
            key={room.id}
            id={room.id}
            title={room.title}
            type={"admin"}
          />
        ))}
        <div>Мембер</div>
        {myRooms.map((room) => (
          <RoomButton key={room.id} id={room.id} title={room.title} />
        ))}
        <Button
          onClick={() => {
            setFormActivate(!formActivate);
          }}
          text={"Создать комнату"}
        />
        <PopUp activatePopUp={formActivate}>
          <PopUpChildren />
        </PopUp>

        <Routes>
          {myRooms.concat(myRoomsAdmin).map((room) => (
            <Route key={room.id} path={`/${room.id}`} element={<div>{room.title}</div>} />
          ))}
        </Routes>
      </div>
    </div>
  );
};
