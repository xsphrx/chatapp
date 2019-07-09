import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css';
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateChat from './components/chat/CreateChat'
import Dashboard from './components/dashboard/Dashboard'
import Chat from './components/chat/Chat'
import EosTest from './components/EosTest'
import EosKnights from './components/EosKnights'
import Profile from './components/profile/Profile'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/chat/:id' component={Chat} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/createchat' component={CreateChat} />
          <Route path='/test' component={EosTest} />
          <Route path='/profile' component={Profile} />
          <Route path='/eosKnights' component={EosKnights} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
