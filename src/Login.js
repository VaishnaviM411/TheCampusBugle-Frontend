import * as React from 'react';
import './Login.css';
import axios from 'axios';
import { getURL } from './utils';

class Login extends React.Component
{
    constructor() {
        super();
        this.state = {
         username: '',
         password: '',
         message:''
        };
      }

    setInput = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
    }

    submitForm = e => {
        e.preventDefault();
        const thatURL = getURL() + "login";

        axios.post(
            thatURL,
            {
                username: this.state.username,
                password: this.state.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => {
           if (response.status === 200) {
                const data = response.data;
                localStorage.setItem("username", data.username);
                localStorage.setItem("token", data.token);
                window.location = "/";
                }
        })
        .catch((err) => {
            console.log(err.message);
            if(err.message==="Request failed with status code 404")
            {
                this.setState({
                    open: true,
                    message: "Username does not exist",
                    });
                    return 0;
            }
            if(err.message==="Request failed with status code 401")
            {
                this.setState({
                    open: true,
                    message: "Invalid password",
                    });
                    return 0; 
            }
        });
    };
    
    render(){
        return(
            <>
                <div class="page-body">
                <div class="login-form">
                    <center>
                    <form onSubmit={this.submitForm}>
                        <h2>The Campus Bugle</h2>
                        <p>{this.state.message}</p>
                        <input type="text" name="username" placeholder="Username" onChange={this.setInput} value={this.state.username} required></input>
                        <input type="password" name="password" placeholder="Password" onChange={this.setInput} value={this.state.password} required></input>
                        <input type="submit" value="Login"></input>
                        
                    </form>
                    </center>
                </div>
                </div>
            </>
        )
    }
}

export default Login;
