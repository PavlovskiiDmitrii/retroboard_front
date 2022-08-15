import cn from "classnames";
import { LeftBar } from "../LeftBar/LeftBar";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import { rooms } from './data';

import "./style.scss";

export const Main = ({ props }: any) => {
  return (
    <div className={cn("main__wrap")}>
      <LeftBar />
      <div className={cn("main__main")}>
        {
          rooms.map((room) => (
            <div>
              <Link to={`/${room.id}`}><button>__{room.id}__</button></Link>
            </div>
          ))
        }
        
        <Routes>
          <Route path="/1" element={ <div>1</div> } />
          <Route path="/2" element={ <div>2</div>} />
          <Route path="3" element={ <div>3</div> } />
        </Routes>
      </div>
    </div>
  );
};
