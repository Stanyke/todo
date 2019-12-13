import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AllUsers from './components/users';
import CreateTodo from './components/new-todo';
import UserEdit from './components/edit-user';
import UserView from './components/view-user';
import TodoEdit from './components/edit-todo';

function App() {
  return (
    <Router>
      <div className="App">      

        <div class="container">
            <div class="row">

              <Route path="/" exact component={AllUsers} />
              <Route path="/new-todo" component={CreateTodo} />
              <Route path="/edit-user/:id" component={UserEdit} />
              <Route path="/view-user/:id" component={UserView} />
              <Route path="/edit-todo/:id" component={TodoEdit} />

            </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
