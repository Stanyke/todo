import React from 'react';

import axios from 'axios';

import { Link } from "react-router-dom";

const linkTo = "https://todobud.herokuapp.com"

class UserEdit extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      uid: this.props.match.params.id,
      name: ""
    }
  }

  componentDidMount()
  {
    let userId = this.props.match.params.id;

    const url = linkTo+"/api/user/"+userId
    axios.get(url)
    .then(res =>
      {
        if (res.data)
        {
          const userName = res.data.Name;
          this.setState({ name : userName })
        }
        else
        {
          alert("We Encoutered An Error While Getting User's Data")
        }
    })
    .catch(error=>{
      alert("We Encoutered An Error Getting User")
    })

  }

  render(){
    return (
      
      <div class="container-fluid">
        <div class="row">
        
        <div class="newT">
          <Link class="btn btn-outline-success" to="/">Homepage</Link>
        </div>

        <div class="col-1"></div>
        <div class="form-group col-10">
          <div align="left" class="col-12">User's ID</div>
          <input type="text" class="form-control" id="uid" value={this.state.uid} readOnly />
        </div><div class="col-1"></div>


        <div class="col-1"></div>
        <div class="form-group col-10">
          <div align="left" class="col-12">User's Name</div>
          <input type="text" class="form-control" id="uid" value={this.state.name} onChange={(value)=> this.setState({name:value.target.value})} />
        </div><div class="col-1"></div>

        <div class="col-3"></div>
        <div class="col-6">
          <button type="submit" class="btn btn-primary col-12" onClick={()=>this.updateMe()}>Update</button>
        </div>
        <div class="col-3"></div>

        <div class="col-12">
          <div id="reply"></div>
        </div>

        </div>
    </div>
    );
  }

  updateMe()
  {
    if (this.state.name === "")
    {
      alert ("Full Name Is Empty")
    }
    else
    {
      let userId = this.props.match.params.id;

      const linkTo = "https://todobud.herokuapp.com/api/users/"+userId;

      let reply = document.getElementById('reply');

      const upadtedName = {
        name: this.state.name
      }

      axios.patch(linkTo,upadtedName)
      .then(response => 
      {
        if (response.status === 201)
        {
          reply.innerHTML = "Name Successfully Updated";
          window.location.href = '/';
        }

        if (response.status === 400)
        {
          reply.innerHTML = "Error updating Name";
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
            reply.innerHTML = "We Encoutered An Error Getting User";
          }
      })
    }

  }


}


export default UserEdit;