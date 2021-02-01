import MMBoard from "./components/MMBoard/MMBoard.component";
import ContextForm from "./components/ContextForm/ContextForm";

import "./App.css";

function App() {
  return (
    <div className="App" onDragStart={(event) => event.preventDefault()}>
      {/* <MMBoard /> */}
      <ContextForm />
    </div>
  );
}

export default App;
