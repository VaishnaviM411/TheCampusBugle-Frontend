import * as React from 'react';
import './Login.css';
import axios from 'axios';
import { getURL } from './utils';

class Settings extends React.Component
{
    constructor() {
        super();
        this.state = {
         first_name: '',
         last_name: '',
         bio: '',
         profile_picture: '',
         message:''
        };
      }

    setBio = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
    }

    setFileInput = e => {
    this.setState({
        [e.target.name]: e.target.files[0]
    });
    }

    

    render(){
        return(
            <>
                <div class="page-body">
                <div class="login-form">
                    <center>
                        <h3>The Campus Bugle</h3>
                        <p>{this.state.message}</p>
                        <h4>FirstName LastName</h4>
                        <p>username | role</p>
                        <img src=""></img>
                        <form onSubmit={this.submitForm}>
                            <label for='bio'>About</label><br></br>
                            <textarea id="bio" name="bio" onChange={this.setInput} value={this.state.bio}  required>hey there</textarea><br></br>
                            <input type="submit" value="Update Bio"></input>
                        </form>
                        <form onSubmit={this.submitForm}>
                            <label for="profile_picture">Profile Picture</label><br></br>
                            <input type="file" name="profile_picture" onChange={this.setFileInput} required></input><br></br>
                            <br></br>
                            <input type="submit" value="Update"></input>
                        </form>
                    </center>
                </div>
                </div>
            </>
        )
    }
}

export default Settings;
