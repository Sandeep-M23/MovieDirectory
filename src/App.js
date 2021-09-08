import React, { useContext } from 'react';
import {Switch,Redirect,Route} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Home from './container/Home/Home';
import Info from './container/Info/Info';
import Search from './container/Search/Search';
import WatchList from './container/WatchList/WatchList';
import Login from './container/Login/Login';
import Logout from './container/Login/Logout/Logout';
import AuthContext from './context/AuthContext';

const  App = () => {
  const authctx = useContext(AuthContext);
  const isAuthenticated = authctx.isLoggedIn;


    let routes=(
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/Info/:id" component={Info}/>
        <Route path="/Search" component={Search}/>
        <Route path="/Login" component={Login}/>
        <Redirect to="/"/>
      </Switch>
    )

    if(isAuthenticated){
      routes =(
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/Search" component={Search}/>
        <Route path="/WatchList" component={WatchList}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Logout" component={Logout}/>
        <Route path="/Info/:id" component={Info}/>
        <Redirect to="/"/>
        </Switch>
      )
    }

    return (
       <div className="App">
         <Layout>
          {routes}
        </Layout>
      </div>
    )
}

export default App