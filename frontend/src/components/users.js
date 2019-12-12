import React, { Component } from 'react';

import { Link } from "react-router-dom";

import axios from 'axios';

class AllUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            fullname:[],
            erroMsg:""
       }
      }

      componentDidMount()
      {
        axios.get('https://todobud.herokuapp.com/api/users')
        .then(response =>
          {
            console.log(response)
            this.setState({fullname: response.data.users})
          })
          .catch(error =>
            {
              console.log(error)
              this.setState({erroMsg: 'Error Getting Users'})
            })
      }

      render(){

        const { fullname, erroMsg } = this.state
        return (
          <div class="container-fluid">
            <div class="row">

              <div class="newT">
                <Link class="btn btn-outline-success" to="/new-todo">New Todo</Link>
              </div>

              <br/>
              <table class="table">
                  
                  
              {
                fullname.length ?
                fullname.map(names => <div key={names.id}>
                <tbody class="thead-dark">
                    <tr>
                      <th>{names.id}</th>
                      <td class="col-4">{names.name}</td>
                      <td class="col-2"><Link class="btn btn-outline-info" to={"/view-user/"+names.id}>View</Link></td>
                      <td class="col-2"><Link class="btn btn-outline-info" to={"/edit-user/"+names.id}>Update</Link></td>
                      <td class="col-2"><button class="btn-danger" onClick={()=>this.onDelete(names.id)}>Delete</button></td>
                    </tr>
                  </tbody>
                  </div>) : null
                }
                {
                  erroMsg ? <div col="12">{erroMsg}</div> : null
                }
                
               </table>

               <div class="col-12">
                <div id="reply"></div>
              </div>

            </div>
          </div>
        );
      }
      onDelete(id)
      {
        let deleteNotice = window.confirm("You Are About To Delete This User");
        if (deleteNotice === true)
        {
          let userId = id;

          const linkTo = "https://todobud.herokuapp.com/api/users/"+userId;

          let reply = document.getElementById('reply');
    
          axios.delete(linkTo)
          .then(response => 
          {
            if (response.status === 201)
            {
              reply.innerHTML = "User Deleted Successfully";
              window.location.href = '/';
            }
    
            if (response.status === 400)
            {
              reply.innerHTML = "We Encountered An Issue Deleting This User";
              window.location.href = '/';
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
        else
        {
          return
        }
      }
    }

export default AllUsers;