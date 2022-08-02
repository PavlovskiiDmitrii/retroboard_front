import "./style.scss";
import { Carcas } from "./components/Carcas/Carcas";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const store = setupStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Carcas />
      </Provider>
    </div>
  );
}

export default App;
