import MMBoard from "./components/MMBoard/MMBoard.component";
import ContextForm from "./components/ContextForm/ContextForm";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App" onDragStart={(event) => event.preventDefault()}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/form">form</Link>
              </li>
              <li>
                <Link to="/board">board</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/form">
              <ContextForm />
            </Route>
            <Route path="/board">
              <MMBoard />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
