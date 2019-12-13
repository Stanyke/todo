import React from 'react';

import axios from 'axios';

import { Link } from "react-router-dom";

const linkTo = "https://todobud.herokuapp.com"

class TodoEdit extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      tid: this.props.match.params.id,
      description: "",
      state: "",
      user_id: ""
    }
  }

  componentDidMount()
  {
    let taskId = this.props.match.params.id;

    const url = linkTo+"/api/todos/"+taskId
    axios.get(url)
    .then(res =>
      {
        if (res.data)
        {
          const taskDescription = res.data.Description;
          const tastStatus = res.data.State;
          const taskUserId = res.data.User_id;

          this.setState({ description : taskDescription, state : tastStatus, user_id : taskUserId })
        }
        else
        {
          alert("We Encoutered An Error While Getting Todo Details")
        }
    })
    .catch(error=>{
      alert("We Encoutered An Error Processing Todo")
    })

  }

  render(){
    return (
      
      <div class="container-fluid">
        <div class="row">
        
        <div class="newT">
          <Link class="btn btn-outline-success" to="/">Homepage</Link>
        </div>

        <table class="table">
          <div class="col-1"></div>
          <div class="form-group col-10">
            <div align="left" class="col-12">Todo's ID</div>
            <input type="text" class="form-control" id="uid" value={this.props.match.params.id} readOnly />
          </div><div class="col-1"></div>


          <div class="col-1"></div>
          <div class="form-group col-10">
            <div align="left" class="col-12">Todo's Description</div>
            <textarea class="form-control" id="describe" rows="3" value={this.state.description} onChange={(value)=> this.setState({description:value.target.value})}></textarea>
          </div><div class="col-1"></div>

          <div class="col-1"></div>
          <div class="form-group col-10">
            <div align="left" class="col-12">Todo's State</div>
            <select class="form-control" id="tstate" onChange={(value)=> this.setState({state:value.target.value})}>
              <option value="todo">Todo</option>
              <option value="done">Done</option>
            </select>
          </div><div class="col-1"></div>

          <div class="col-1"></div>
          <div class="form-group col-10">
            <div align="left" class="col-12">User's ID</div>
            <input type="number" class="form-control" id="uid" value={this.state.user_id} onChange={(value)=> this.setState({user_id:value.target.value})} readOnly />
          </div><div class="col-1"></div>

          <div class="col-3"></div>
          <div class="col-6">
            <button type="submit" class="btn btn-primary col-12" onClick={()=>this.updateTodo()}>Update</button>
          </div>
          <div class="col-3"></div>

          <div class="col-12">
            <div id="reply"></div>
          </div>
        </table>

        </div>
    </div>
    );
  }

  updateTodo()
  {
    if (this.state.description === "")
    {
      alert ("Todo's Description Is Empty")
    }
    else
    {
      let taskId = this.props.match.params.id;

      const linkTo = "https://todobud.herokuapp.com/api/todos/"+taskId;

      let reply = document.getElementById('reply');

      const upadtedTodo = {
            description: this.state.description,
            state: this.state.state,
            user_id: this.state.user_id
      }

      axios.patch(linkTo,upadtedTodo)
      .then(response => 
      {
        if (response.status === 201)
        {
          reply.innerHTML = "Task Successfully Updated";
          window.location.href = '/';
        }

        if (response.status === 400)
        {
          reply.innerHTML = "Error Updating Todo";
        }
      })
      .catch ( error => 
        {
          if (error.response.status === 400)
          {
            reply.innerHTML = "User with such ID does not exist";
          }

          if (error.response.status === 500)
          {
            reply.innerHTML = "We Encoutered An Error Verifying User";
          }
      })
    }

  }


}


export default TodoEdit;