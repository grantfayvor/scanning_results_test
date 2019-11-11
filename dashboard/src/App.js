import React, { useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Axios from "axios";
import NavBar from "./components/NavBar";
import Spinner from "./components/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Conf from "./config";

const config = Conf[process.env.NODE_ENV];
const ScanResults = React.lazy(() => import('./components/ScanResults'));
const CreateScanResult = React.lazy(() => import('./components/CreateScanResult'));

function App() {
  let [scanResults, setScanResults] = useState([]),
    [searchText, setSearchText] = useState("");

  const search = () => {
    Axios.get(`${config.webserver.uri}/api/results/${searchText}`)
      .then(res => res.data && res.data.data)
      .then(data => data.items)
      .then(results => {
        setScanResults(results);
      });
  };

  const getScans = () => {
    Axios.get(`${config.webserver.uri}/api/results`)
      .then(res => res.data && res.data.data)
      .then(data => data && data.items ? data.items : data)
      .then(results => {
        setScanResults(results);
      });
  };

  return (
    <Router>
      <div className="App">
        <NavBar search={search} searchText={searchText} setSearchText={setSearchText} />
        <Switch>
          <Route path="/CreateScanResult">
            <Suspense fallback={<Spinner />}>
              <CreateScanResult config={config} />
            </Suspense>
          </Route>
          <Route path="/">
            <Suspense fallback={<Spinner />}>
              <ScanResults scanResults={scanResults} getScans={getScans} config={config} />
            </Suspense>
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
