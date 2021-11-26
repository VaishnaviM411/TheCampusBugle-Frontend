import * as React from 'react';
import './Login.css';
import axios from 'axios';
import { getToken, getURL, getUsername } from './utils';
import $ from 'jquery';
class Settings extends React.Component
{
    constructor() {
        super();
        this.state = {
         first_name: '',
         last_name: '',
         bio: '',
         displaybio: '',
         profile_picture: '',
         update_photo: '',
         acc_type: '',
         username: '',
         message:'',
         email: '',
         club_subscribed: '',
         feed_subscribed: '',
         board_subscribed: '',
         screenready: false
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

  

    componentDidMount() {
            console.log("im in main");
        try{
            const token = getToken();
            console.log(token);
            const username = getUsername();
            if(username.length>0)
            {
                const profileURL = getURL()+"profile/"+getUsername();
                axios.get(profileURL,
                    {headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
                }})
                .then(res => {
                    console.log("run");
                    this.setState({
                        first_name: res.data.first_name,
                        last_name: res.data.last_name,
                        profile_picture: res.data.profile_picture,
                        username: res.data.username,
                        acc_type: res.data.acc_type,
                        bio: res.data.bio,
                        displaybio: res.data.bio,
                        email: res.data.email
                    });
                    console.log(res.data);

                    //subscription thing
                    const email = this.state.email;
                const getSubscriptionURL= getURL()+"subscription/"+email;
                console.log(getSubscriptionURL);
                axios.get(getSubscriptionURL,
                    {headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
                }})
                .then(res => {
                    console.log("run");
                    this.setState({
                        club_subscribed: res.data["club-broadcast"],
                        feed_subscribed: res.data["feed"],
                        board_subscribed: res.data["notice-board"]
                    });
                    console.log(res);
                    this.setState({screenready:true});

                })
                .catch((err) => {
                    console.log(err.message);
                    if(err.message==="Request failed with status code 401")
                    {
                        alert("Login to access TheCampusBugle");
            window.location="/login";
            return;
                    }
                }

                );
                    //close

                })
                .catch((err) => {
                    console.log(err.message);
                    if(err.message==="Request failed with status code 401")
                    {
                        alert("Login to access TheCampusBugle");
            window.location="/login";
            return;
                    }
                }

                );
                

            }
        }
        catch{
            alert("Login to access TheCampusBugle");
            window.location="/login";
            return;
        }
        }
        
        bioForm = e => {
            e.preventDefault();
            $('#bio').val('');
            const token = getToken();
            const updateURL = getURL() + "profile/" + this.state.username;
            axios.put(
                updateURL,
                {
                    bio: this.state.bio,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `${token}`
                    },
                }
            )
            .then((response) => {
               if (response.status === 200) {
                    const message = response.data;
                    console.log(message);
                    this.setState({
                        bio: message.data.bio,
                        displaybio: message.data.bio,
                        message: "Bio updated."
                    });
                }
            })
            .catch((err) => {
                console.log(err.message);
                if(err.message==="Request failed with status code 404")
                {
                    this.setState({
                        open: true,
                        message: "Login required!",
                        });
                        return 0;
                }
                
            });
        };

        photoForm = e => {
            e.preventDefault();
            const token = getToken();
            const updateURL = getURL() + "profile/" + this.state.username;
            if(this.state.update_photo.type!=="image/png" && this.state.update_photo.type!=="image/jpg" && this.state.update_photo.type!=="image/jpeg")
            {
              alert("Invalid File-Type. Profile picture should be image of png, jpg or jpeg format.");
              return 0;
            }
    
            const uploadfileURL = "https://asia-south1-thecampusbugle.cloudfunctions.net/api/" + "upload-file";
    
            const formData = new FormData();
            formData.append('file', this.state.update_photo);
            fetch(
                    uploadfileURL,
                    {
                        method: 'POST',
                        body: formData,
                    }
                )
            .then((response) => response.json())
                .then((result) => {
    
                    axios.put(
                        updateURL,
                        {
                            profile_picture: result.link
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "authorization": `${token}`
                            },
                        }
                    )
                    .then((response) => {
                    if (response.status === 200) {
                            this.setState({
                                profile_picture: response.data.data.profile_picture,
                                message: "Photo updated",
                                update_photo: ""
                            });
                            console.log(response.data);
                            }
                    })
                    .catch((err) => {
                        console.log(err.message);
                        if(err.message==="Request failed with status code 404")
                        {
                            this.setState({
                                
                                message: "Login reqiured!",
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
        

        subscribeHandler = section => e => {
            e.preventDefault();
            console.log(section);
            const token = getToken();
            console.log(token);
            const subscribeURL = getURL() + "subscribe/" + section;
            /*axios.put(
                subscribeURL,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `${token}`
                    },
                }
            )*/
            fetch(
                subscribeURL,
                {
                    method: 'PUT',
                    headers:{'authorization':`${token}`}
                }
            )
            .then((response) => {
               if (response.status === 200) {
                    const message = response.data;
                    console.log(message);
                    if(section==="Feed")
                    {
                        this.setState({
                            feed_subscribed: "true"
                        });
                    }
                    else if(section==="Club-broadcast")
                    {
                        this.setState({
                            club_subscribed: "true"
                        });
                    }
                    else if(section==="Notice-board")
                    {
                        this.setState({
                            board_subscribed: "true"
                        });
                    }
                    
                }
            })
            .catch((err) => {
                console.log(err.message);
                if(err.message==="Request failed with status code 404")
                {
                    this.setState({
                        open: true,
                        message: "Login required!",
                        });
                        return 0;
                }
                
            });
        }

        unsubscribeHandler = section => e => {
            e.preventDefault();
            console.log(section);
            const token = getToken();
            console.log(token);
            const unsubscribeURL = getURL() + "unsubscribe/" + section;
            /*axios.put(
                subscribeURL,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `${token}`
                    },
                }
            )*/
            fetch(
                unsubscribeURL,
                {
                    method: 'PUT',
                    headers:{'authorization':`${token}`}
                }
            )
            .then((response) => {
               if (response.status === 200) {
                    const message = response.data;
                    console.log(message);
                    if(section==="Feed")
                    {
                        this.setState({
                            feed_subscribed: "false"
                        });
                    }
                    else if(section==="Club-broadcast")
                    {
                        this.setState({
                            club_subscribed: "false"
                        });
                    }
                    else if(section==="Notice-board")
                    {
                        this.setState({
                            board_subscribed: "false"
                        });
                    }
                    
                }
            })
            .catch((err) => {
                console.log(err.message);
                if(err.message==="Request failed with status code 404")
                {
                    this.setState({
                        open: true,
                        message: "Login required!",
                        });
                        return 0;
                }
                
            });
        }
      
    

    render(){
        return(
            <>
            { this.state.screenready ?
                <div class="page-body">
                <div class="login-form">
                    <center>
                        <h3>The Campus Bugle</h3>
                        <p>{this.state.message}</p>
                        <h5>{this.state.first_name} {this.state.last_name}</h5>
                        <p>{this.state.username} | {this.state.acc_type}</p>
                        <img src={this.state.profile_picture}></img>
                        <form onSubmit={this.bioForm}>
                            <label for='bio'>About</label><br></br>
                            <p>{this.state.displaybio}</p>
                            <textarea id="bio" name="bio" onChange={this.setInput} required></textarea><br></br>
                            <input type="submit" value="Update Bio"></input>
                        </form>
                        <br></br>
                        <form onSubmit={this.photoForm}>
                            <label for="update_photo">Profile Picture</label><br></br>
                            <input type="file" name="update_photo" onChange={this.setFileInput} required></input><br></br>
                            <br></br>
                            <input type="submit" value="Update"></input>
                        </form>
                        
                    </center>
                    <br></br>
                    <div class="list">Email Notification<br></br>
                            <p>Notice Board
                                { this.state.board_subscribed==="true" ?
                                <a href="#" onClick={this.unsubscribeHandler("Notice-board")}>Unsubscribe</a> 
                                    :
                                <a href="#" onClick={this.subscribeHandler("Notice-board")}>Subscribe</a>
                                }
                            </p><br></br>
                            <p>Club Broadcast
                                { this.state.club_subscribed==="true" ?
                                <a href="#" onClick={this.unsubscribeHandler("Club-broadcast")}>Unsubscribe</a> 
                                    :
                                <a href="#" onClick={this.subscribeHandler("Club-broadcast")}>Subscribe</a>
                                }
                            </p><br></br>
                            <p>Feed
                                { this.state.feed_subscribed==="true" ?
                                <a href="#" onClick={this.unsubscribeHandler("Feed")}>Unsubscribe</a> 
                                    :
                                <a href="#" onClick={this.subscribeHandler("Feed")}>Subscribe</a>
                                }
                            </p><br></br>
                        </div>
                </div>
                </div>
                :""}
            </>
        );
    }
}

export default Settings;
