import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router';
import Nav from './Nav';
import Col1 from './Col1';
import Feed from './Feed';
import Col3 from './Col3';
import Broadcast from './Broadcast';
import NoticeBoard from './NoticeBoard';

import { getToken, getURL, getUsername } from './utils';
import axios from 'axios';

function Main()
{
    const { section } = useParams();
    const [userprofile, setuserprofile] = useState([]);
    let profileURL;
    useEffect(()=>{
        console.log("im in main");
        try{
            const token = getToken();
            console.log(token);
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
                    console.log("run");
                    setuserprofile(res.data);
                    console.log(res.data);
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
        
    },[]);

    if(section=="feed")
    {
        return(
            <>
            
                <div class="main-panel">
                    <Nav  user={userprofile}/>
                    <Col1 user={userprofile}/>
                    <Feed user={userprofile}/>
                </div>
            </>
        );
    }
    else if(section=="club-broadcast")
    {
        return(
            <>
            
                <div class="main-panel">
                    <Nav  user={userprofile}/>
                    <Col1 user={userprofile}/>
                    <Broadcast user={userprofile.acc_type}/>
                </div>
            </>
        );
    }
    else
    {
        return(
            <>
            
                <div class="main-panel">
                    <Nav  user={userprofile}/>
                    <Col1 user={userprofile}/>
                    <NoticeBoard user={userprofile.acc_type}/>
                </div>
            </>
        );
    }
   
        
    
}

export default Main;