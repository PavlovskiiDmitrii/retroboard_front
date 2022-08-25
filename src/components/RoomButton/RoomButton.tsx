import cn from "classnames";
import "./style.scss";
import { Link } from "react-router-dom";

export const RoomButton = ({ id, title }: any) => {
  return (
    <div className={cn()}>
      <Link to={`/${id}`}>
        <button>__{title}__</button>
      </Link>
    </div>
  );
};
