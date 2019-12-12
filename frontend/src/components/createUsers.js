import React from 'react';

import axios from 'axios';

var panelStyle = {
	'max-width': '80%',
	margin: '0 auto'
}

class CreateUser extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        name: ""
    }
  }

  render() {
    return(
     <div>
    <div class="panel panel-primary" style={panelStyle}>
      <div class="panel panel-heading">React Forum - Register</div>
      <div class="panel panel-body">
        <div>
        <input type="text" class="form-control"  placeholder="Full Name" value={this.state.name} onChange={(value)=> this.setState({name:value.target.value})}/>
        </div>
        <button type="submit" class="col-md-12 btn btn-primary" onClick={()=>this.sendSave()}>Save</button>
      </div>

      <div id="reply"></div>
    </div>
  </div>

    );
  }

  sendSave()
  {
    if (this.state.name==="") {
      alert("FullName Is Empty")
   }
   else
   {     

    const baseUrl = "https://todobud.herokuapp.com/api/users"
    const newUser = {
      name: this.state.name
    }
    
    var Reply = document.getElementById('reply');
    axios.post(baseUrl,newUser)
     .then(response=>{
       if (response.data.success===true) {
         alert(response.data.message)
       }
       else {
         alert(response.data.message)
       }
     }).catch(error=>{
       alert("Error 34 "+error)
     })
   }

  }
}

export default CreateUser