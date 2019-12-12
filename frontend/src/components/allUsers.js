import React, { Component } from 'react';

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

              <center>List of Users</center>
              <br/>

              <div class="col-12">
              {
                fullname.length ?
                fullname.map(names => <div key={names.id}>{names.name}</div>) : null
              }
              {
                erroMsg ? <div>{erroMsg}</div> : null
              }
              </div>
            </div>
          </div>
        );
      }
    }

export default AllUsers;