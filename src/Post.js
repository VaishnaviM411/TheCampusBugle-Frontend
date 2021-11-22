import React, {useState, useEffect} from 'react';
import './Feed.css';
import profilepic from './profilepic.jpg';
import solidclap from './solid-clap.png';
import outlineclap from './outline-clap.png';
import { getToken, getURL, getUsername } from './utils';
import axios from 'axios';
function Post(props)
{
    const URL=getURL();
    const likeURL=URL+"like/"+ props.section + "/" + props.data.title;
    const [message, setmessage] = useState("");
    const likeHandler = (e) => {
        e.preventDefault();
        const token = getToken();
        const username = getUsername();
        if(username.length>0)
        {
            axios.put(likeURL, 
                {headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
            }})
            .then(res => {
                console.log(res.data);
                setmessage(res.data.message);
                
            })
            .catch((err) => {
                console.log(err.message);
                if(err.message==="Request failed with status code 401"||err.message==="Request failed with status code 404")
                {
                    alert("Login to access TheCampusBugle");
                    window.location="/login";
                    return;
                }
            });
        }
    }
    /*const [userprofile, setuserprofile] = useState([]);
    let profileURL;
    useEffect(()=>{
        try{
            const token = getToken();
            //console.log(token);
            const username = getUsername();
            if(username.length>0)
            {
                profileURL = getURL()+"profile/"+getUsername();
                axios.get(profileURL,
                    {headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
                }})
                .then(res => {
                    setuserprofile(res.data);
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

                )
            }
        }
        catch{
            alert("Login to access TheCampusBugle");
            window.location="/login";
            return;
        }
        
    });*/

    
    
    
              



        return(
            <>
                
            <div class="post">
                <div class="author-pic">
                    <img src={profilepic}></img>
                </div>
                <div class="post-content">
                    <div class="text-content">
                        <h6>{props.data.author}</h6>
                        <p>{props.data.caption}</p>
                    </div>
                    <div class="file-content">
                        <img src={props.data.file}></img>
                    </div>
                </div>

                <div class="comments">
                    <div class="like-btn">
                        <a href="#" onClick={likeHandler}>
                            { message=="Liked" ?
                        <img src={solidclap}></img>
                            :
                        <img src={outlineclap}></img>
                            }
                        </a>
                    </div>
                </div>


            </div>

                    
                        
                    
            </>
        )
    
}

export default Post;