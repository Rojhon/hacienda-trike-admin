/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Account from "./pages/Account";
import ActiveRides from "./pages/ActiveRides/index";
import Rides from "./pages/Rides/index";
import ManageDriver from "./pages/ManageDriver";
import Profile from "./pages/Profile";
// import Help from "./pages/Help";

import Billing from "./pages/Billing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Main>
          <Route exact path="/home" component={Home} />
          <Route exact path="/accounts" component={Account} />
          <Route exact path="/active-rides" component={ActiveRides} />
          <Route exact path="/rides" component={Rides} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/manage-driver" component={ManageDriver} />
          <Route exact path="/profile" component={Profile} />
          {/* <Route exact path="/help" component={Help} /> */}
        </Main>
      </Switch>
    </div>
  );
}

export default App;