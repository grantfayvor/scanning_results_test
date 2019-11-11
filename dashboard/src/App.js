import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ScanResults from './components/ScanResults';
import CreateScanResult from './components/CreateScanResult';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/CreateScanResult">
            <CreateScanResult />
          </Route>
          <Route path="/">
            <ScanResults />
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
