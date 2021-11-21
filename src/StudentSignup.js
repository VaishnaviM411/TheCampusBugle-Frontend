import * as React from 'react';
import './Login.css';
import axios from 'axios';
import { getURL } from './utils';

class StudentSignup extends React.Component
{
    constructor() {
        super();
        this.state = {
         email: '',
         PRN: '',
         first_name: '',
         last_name: '',
         branch: '',
         bio: '',
         password: '',
         profile_picture: '',
         message:''
        };
      }

      

    setInput = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
    }

    setFileInput = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
        }

    submitForm = e => {
        e.preventDefault();
        const thatURL = getURL() + "student-signup";
        
        if(this.state.profile_picture.type!=="image/png" && this.state.profile_picture.type!=="image/jpg" && this.state.profile_picture.type!=="image/jpeg")
        {
          alert("Invalid File-Type. Profile picture should be image of png, jpg or jpeg format.");
          return 0;
        }

        const uploadfileURL = "https://asia-south1-thecampusbugle.cloudfunctions.net/api/" + "upload-file";

        const formData = new FormData();
        formData.append('file', this.state.profile_picture);
        fetch(
                uploadfileURL,
                {
                    method: 'POST',
                    body: formData,
                }
            )
        .then((response) => response.json())
            .then((result) => {

                axios.post(
                    thatURL,
                    {
                        email: this.state.email,
                        PRN: this.state.PRN,
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        branch: this.state.branch,
                        bio: this.state.bio,
                        password: this.state.password,
                        profile_picture: result.link
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                if (response.status === 200) {
                        window.location = "/login";
                        }
                })
                .catch((err) => {
                    console.log(err.message);
                    if(err.message==="Request failed with status code 403")
                    {
                        this.setState({
                            open: true,
                            message: "Username already exists, try with different email id.",
                            });
                            return 0;
                    }
                    else
                    {
                        console.log(err);
                    }
                    
                });
            })
        .catch((error) => {
            alert("Problem with Image Upload");
            return 0;
        });
    }
    

    render(){
        return(
            <>
                <div class="login-form">
                    <center>
                    <form onSubmit={this.submitForm}>
                        <h3>The Campus Bugle</h3>
                        <p>{this.state.message}</p>
                        <input type="email" name="email" placeholder="Email" onChange={this.setInput} value={this.state.email}  required></input><br></br>
                        <input type="text" name="PRN" placeholder="PRN" onChange={this.setInput} value={this.state.PRN}  required></input><br></br>
                        <input type="text" name="first_name" placeholder="First Name" onChange={this.setInput} value={this.state.first_name}  required></input><br></br>
                        <input type="text" name="last_name" placeholder="Last Name" onChange={this.setInput} value={this.state.last_name}  required></input><br></br>
                        
                        <select name="branch" id="branch"  onChange={this.setInput} value={this.state.branch} required>
                            <option value="Branch">Branch</option>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="MECH">MECH</option>
                            <option value="CIVIL">CIVIL</option>
                            <option value="ELECTRICAL">ELECTRICAL</option>
                            <option value="ELECTRONICS">ELECTRONICS</option>
                        </select><br></br>
                        <label for='bio'>Bio</label><br></br>
                        <textarea id="bio" name="bio" onChange={this.setInput} value={this.state.bio}  required></textarea><br></br>
                        <label for="profile_picture">Profile Picture</label><br></br>
                        <input type="file" name="profile_picture" onChange={this.setFileInput} required></input><br></br>
                        <input type="password" name="password" placeholder="Password" onChange={this.setInput} value={this.state.password}  required></input><br></br>
                        <input type="submit" value="Signup"></input>
                    </form>
                    </center>
                </div>
            </>
        )
    }
}

export default StudentSignup;
