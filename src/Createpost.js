import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router';
import './Login.css';
import axios from 'axios';
import { getToken, getURL, getUsername } from './utils';

function Createpost()
{
    const { section } = useParams();
    console.log(section);
    const [caption, setcaption] = useState("");
    const [filelink, setfilelink] = useState("");
    const [message, setmessage] = useState("");
    var username;
    var token;
    const captionHandler = (e) => {
        setcaption(e.target.value);
    }
    const fileHandler = (e) => {
        setfilelink(e.target.files[0]);
    }

    useEffect(() => {
        username=getUsername();
        token = getToken();
        console.log(token);
        if(username.length==0)
        {
            alert("Login to post");
            window.location="/login";
        }

    }, [])
    
    const submitForm = (e) => {
        e.preventDefault();
        const postsection = "post-to-" + section + "/";
        const postuploadURL = getURL() + postsection + getUsername() ;
        

        if(filelink.type!=="image/png" && filelink.type!=="image/jpg" && filelink.type!=="image/jpeg")
        {
          alert("Invalid File-Type. Post a image of png, jpg or jpeg format.");
          return 0;
        }

        const uploadfileURL = "https://asia-south1-thecampusbugle.cloudfunctions.net/api/" + "upload-file";

        const formData = new FormData();
        formData.append('file', filelink);
        fetch(
                uploadfileURL,
                {
                    method: 'POST',
                    body: formData,
                }
            )
        .then((response) => response.json())
            .then((result) => {
                const token = getToken();
                axios.post(
                    postuploadURL,
                    {
                        caption: caption,
                        file: result.link
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

                        window.location = "/";
                        }
                })
                .catch((err) => {
                    console.log(err.message);
                    if(err.message==="Request failed with status code 401")
                    {
                        setmessage("Login to post!");
                        return 0;
                    }
                    if(err.message==="Request failed with status code 404")
                    {
                        setmessage("You cannot post here!");
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
    };


            

    
        return(
            <>
                <div class="login-form">
                    <center>
                    <form onSubmit={submitForm}>
                    <h3>The Campus Bugle: Post to feed</h3>
                        <p>{message}</p>
                        <label for="file">Share photo:</label><br></br>
                        <input type="file" name="file" onChange={fileHandler} required></input><br></br>
                        <label for='caption'>Caption</label><br></br>
                        <textarea id="caption" name="caption" onChange={captionHandler} required></textarea><br></br>
                        <input type="submit" value="Post"></input>
                    </form>
                    </center>
                </div>
            </>
        )
    
}

export default Createpost;
