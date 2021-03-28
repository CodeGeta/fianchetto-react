import React from 'react';
import {createBrowserHistory} from "history";
import RoutingComponent from "./components/routing/routing";

const history = createBrowserHistory();

function App() {
  return (
      <RoutingComponent history = {history}/>
  );
}

export default App;
