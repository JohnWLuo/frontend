import React from 'react';
import './index.css';

class Login extends React.Component {
    constructor(props) {
        super()
        this.props = props
    }
    render() {

    return(
    <>
    <p className = "welcome"></p>
    <div className="loginBox">
      <div>
        <form className="login" action="#">
          <label htmlFor="fname">First name: </label>
          <input type="text" id="fname" name="fname"></input><br></br>
          <label htmlFor="lname">Last name: </label>
          <input type="text" id="lname" name="lname"></input><br></br>
          <button id = "register" type="button">Register</button>
          <button id = "logIn" type="button">Log In</button>
        </form>
      </div>
      <div>
        <p className ="instructions">This grid of boxes is a 90-year human lifespan in weeks.<br></br> Each row of 52 weeks is a year and 90 years is 4680 weeks in a 90 year lifespan.<br></br> Sometimes life seems really short, and other times it seems impossibly long.<br></br> But this chart helps to emphasize that it’s most certainly finite.<br></br> Those are your weeks and they’re all you’ve got.<br></br> The fact that there are leap years and other calendar anomalies mean <br></br> that not everything will line up perfectly. </p>
      </div>
    </div>
    <label className ="instructionsLabel">Instructions</label>
    <p className ="instructions2"> Enter a valid date of birth before the year 1932. <br></br><b>You can click on a box to either write a journal entry or make a to do list</b><br></br>
    </p>
    </>
  )
}
}

export default Login;
