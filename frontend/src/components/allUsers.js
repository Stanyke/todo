import React from 'react';

import axios from 'axios';

class CreateUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullname:""
        }
      }

      render(){
        return (
          <div class="container-fluid">
            <div class="row">

              <div class="form-group col-md-12">
                <label for="inputEmail4">Full Name</label>
                <input type="email" class="form-control"  placeholder="Full Name" value={this.state.email} onChange={(value)=> this.setState({fullname:value.target.value})}/>
              </div>

              <button type="submit" class="col-md-12 btn btn-primary" onClick={()=>this.sendSave()}>Save</button>

            <br/>

            <div id="boxx" class="col-sm-12"></div>

            </div>
          </div>
        );
      }


      sendSave()
      {
        if (this.state.fullname==="") {
           alert("Full Name Is Empty")
        }
        else {
     
          const baseUrl = "https://todobud.herokuapp.com/api/users"
     
          const datapost = {
            fullname : this.state.fullname
          }
     
          axios.post(baseUrl,datapost)
          .then(result=>{

            if (!result.data.data)
            {
              document.getElementById("boxx").innerHTML = result.data;
            }
          }).catch(error=>{
             if (error)
             {
                document.getElementById("boxx").innerHTML = error;
             }
            
            console.log(error);
          })
     
        }
     

      }
}


export default CreateUser;