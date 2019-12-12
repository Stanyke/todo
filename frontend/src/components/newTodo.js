import React, { Component } from 'react';

import axios from 'axios';

import '../App.css';

class CreateTodo extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        description: "",
        state: "",
        user_id: ""
    }
  }

  render() {
    return(
      <div class="container-fluid">
        <div class="row">
        
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
          <input type="number" class="form-control" id="uid" value={this.state.user_id} onChange={(value)=> this.setState({user_id:value.target.value})} />
        </div><div class="col-1"></div>

        <div class="col-3"></div>
        <div class="col-6">
          <button type="submit" class="btn btn-primary col-12" onClick={()=>this.saveIn()}>Submit</button>
        </div>
        <div class="col-3"></div>

        <div class="col-12">
          <div id="reply"></div>
        </div>
        </div>
    </div>

    );
  }

  saveIn()
  {
    const reply = document.getElementById("reply");

    if (this.state.description === "")
    {
      alert("Todo's Description is empty")
    }
    else if (this.state.user_id === "")
    {
      alert("User's Id is empty")
    }
    else
    {     
      const linkTo = "https://todobud.herokuapp.com/api/todos"
      
      const newTodo = {
        description: this.state.description,
        state: this.state.state,
        user_id: this.state.user_id
      }
    
      axios.post(linkTo,newTodo)
      .then(response =>
      {
          if (response.status === 500)
          {
            reply.innerHTML = "We Encoutered An Error Creating Todo";
          }
          if (response.status === 201)
          {
            reply.innerHTML = "Task successfully Created";
          }
        console.log(response);
      })
      .catch(error =>
      {
        if (error.response.status === 400)
        {
          reply.innerHTML = "User with such ID does not exist";
        }
        if (error.response.status === 500)
        {
          reply.innerHTML = "We Encoutered An Error Verifying User";
        }
        console.log(error);
      })
   }

  }
}

export default CreateTodo