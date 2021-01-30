import MMBoard from "./components/MMBoard/MMBoard.component";

import "./App.css";

function App() {
  return (
    <div className="App" onDragStart={(event) => event.preventDefault()}>
      <MMBoard />
    </div>
  );
}

export default App;
