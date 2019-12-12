import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AllUsers from './components/allUsers';
import CreateTodo from './components/newTodo';
import UserEdit from './components/edit';
import UserView from './components/view';

function App() {
  return (
    <Router>
      <div className="App">
        <AllUsers />
      

        <div class="container">
            <div class="row">

              <Route path="/newTodo" component={CreateTodo} />
              <Route path="/edit/:id" component={UserEdit} />
              <Route path="/view/:id" component={UserView} />

            </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
