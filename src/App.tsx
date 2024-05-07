import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./views/home/index";
import User from "./views/user/index";
import Form from "./views/form/index";
import Table from "./views/table/index";
import Hooks from "./views/hooks/index";
import StateManage from "./views/stateManage2/index";
import "@arco-design/web-react/dist/css/arco.css";

// const routesConfig = ['home', 'user', 'form', 'table'];

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            path="/home/:teamId"
            Component={Home}
            action={async ({ params, request }) => {
              console.log("action 执行：", params, request);
              return true;
            }}
          ></Route>
          {/* {routesConfig.map((key) => {
                        return <Route path={'/' + key} lazy={() => import(`./views/${key}/index`)}></Route>;
                    })} */}
          <Route path="/user" Component={User}></Route>
          <Route path="/form" Component={Form}></Route>
          <Route path="/hooks" Component={Hooks}></Route>
          <Route path="/table" Component={Table}></Route>
          <Route path="/stateManage" Component={StateManage}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
