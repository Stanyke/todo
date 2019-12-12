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
              <button type="button" class="btn-success">New Todo</button>
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
                      <td class="col-2"><Link class="btn btn-outline-info" to={"/view/"+names.id}>View</Link></td>
                      <td class="col-2"><Link class="btn btn-outline-info" to={"/edit/"+names.id}>Update</Link></td>
                      <td class="col-2"><button type="button" class="btn-danger">Delete</button></td>
                    </tr>
                  </tbody>
                  </div>) : null
                }
                {
                  erroMsg ? <div col="12">{erroMsg}</div> : null
                }
                
               </table>
            </div>
          </div>
        );
      }
    }

export default AllUsers;