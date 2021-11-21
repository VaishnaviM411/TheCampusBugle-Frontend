import React, {useState, useEffect} from 'react';
import './Col1.css';
import profilepic from './profilepic.jpg'
import { getToken, getURL, getUsername } from './utils';
import axios from 'axios';
function Col1() 
{
    const [userprofile, setuserprofile] = useState([]);
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
        
    });


    
        return(
            <>
            <div class="col1">
                <div class="profile-card"><center>
                
                    <img src={userprofile["profile_picture"]} alt="profilepic"></img>
                    <h5>{userprofile["username"]}</h5>
                    <div><p>{userprofile["first_name"]} {userprofile["last_name"]}</p></div>
                    <div class="info">
                    <div><h6>Branch</h6><p>{userprofile["branch"]}</p></div>
                    <div><h6>PRN</h6><p>{userprofile["PRN"]}</p></div>
                    </div>
                    </center>
                </div>
                <div class="settings">

                </div>
                <div class="Row">
                    <a href="#" class="logout-round">

                    </a>
                    <a href="#" class="view-profile">

                    </a>
                </div>
            </div>
            </>
        )
    
}

export default Col1;