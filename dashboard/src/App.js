import React, { useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Axios from "axios";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Conf from "./config";

const config = Conf[process.env.NODE_ENV];
const ScanResults = React.lazy(() => import('./components/ScanResults'));
const CreateScanResult = React.lazy(() => import('./components/CreateScanResult'));

function App() {
  let [scanResults, setScanResults] = useState(),
    [searchText, setSearchText] = useState("");

  const search = () => {
    Axios.get(`${config.webserver.uri}/api/results/${searchText}`)
      .then(res => res.data && res.data.data)
      .then(data => data.items)
      .then(results => {
        console.log(results);
        setScanResults(results);
      });
  };

  return (
    <Router>
      <div className="App">
        <NavBar search={search} searchText={searchText} setSearchText={setSearchText} />
        <Switch>
          <Route path="/CreateScanResult">
            <Suspense fallback={<div>Loading...</div>}>
              <CreateScanResult config={config} />
            </Suspense>
          </Route>
          <Route path="/">
            <Suspense fallback={<div>Loading...</div>}>
              <ScanResults scanResults={scanResults} config={config} />
            </Suspense>
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
