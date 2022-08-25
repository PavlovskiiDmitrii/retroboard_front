import { useState } from "react";
import cn from "classnames";
import "./style.scss";
import { Link } from "react-router-dom";
import { PopUp } from "../PopUp/PopUp";

// const AdminPanel = ({} : any) => {
//   return (
//     <div>
//       <button onClick={() => {
//             setFormActivate(!formActivate);
//           }}>
//         Добавить клиента
//       </button>
//     </div>
//   )
// }

const PopUpChildren = () => {
  return <div>123</div>;
};

export const RoomButton = ({ id, title, type }: any) => {
  const [formActivate, setFormActivate] = useState(false);

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
