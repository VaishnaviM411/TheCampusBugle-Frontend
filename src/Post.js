import React, {useState, useEffect} from 'react';
import './Feed.css';
import profilepic from './profilepic.jpg';
import post1 from './post1.png';
import { getToken, getURL, getUsername } from './utils';
import axios from 'axios';
function Post(props)
{
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
        
        <p>{props.data.caption}
        </p>
    </div>
    <div class="file-content">
        
        <img src={props.data.file}></img>
        
    </div>
    
    
    
</div>
<div class="comments">

    </div>


</div>

                    
                        
                    
            </>
        )
    
}

export default Post;