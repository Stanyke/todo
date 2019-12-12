import React from 'react';

import axios from 'axios';

import { Link } from "react-router-dom";

const linkTo = "https://todobud.herokuapp.com"

class UserView extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name: "",
      todos:[]
    }
  }

  componentDidMount()
  {
    let userId = this.props.match.params.id;

    const url = linkTo+"/api/users/"+userId
    axios.get(url)
    .then(res =>
      {
        if (res.data)
        {
          const userName = res.data.Name;
          this.setState({ name : userName, todos: res.data.todos })
        }
        else
        {
          alert("We Encoutered An Error While Getting User's Data")
        }
    })
    .catch(error=>{
      alert("This User's Todo List Is Empty");
      window.location.href = '/';
    })

  }

  render(){
    const { todos } = this.state
    return (
      <div class="container-fluid">
        <div class="row">
        
            <table class="table">
              {
                todos.length ?
                todos.map(todo => <div key={todo.id}>
                <tbody class="thead-dark">
                    <tr>
                      <th>{todo.id}</th>
                      <td class="col-4">{todo.description}</td>
                      <td class="col-4">{todo.state}</td>
                      <td class="col-2">{todo.user_id}</td>
                      <td class="col-2"><Link class="btn btn-outline-info" to={"/manage/"+todo.id}>Update</Link></td>
                    </tr>
                  </tbody>
                  </div>) : null
                }
                
            </table>
        </div>
    </div>
    );
  }

}

export default UserView;