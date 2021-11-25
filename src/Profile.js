import React, {useState, useEffect} from 'react';
import './Col1.css';
import profilepic from './profilepic.jpg'
import { getToken, getURL, getUsername } from './utils';
import { useParams } from 'react-router';

import axios from 'axios';
function Profile(props) 
{
    const { profileusername } = useParams();
    const [userprofile, setuserprofile] = useState([]);
    const [thisProfile, setthisProfile] = useState([]);
    let profileURL;
    let getprofileURL;
    useEffect(()=>{
        console.log("im in main");
        const token = getToken();
        
            
                console.log(profileusername);
                getprofileURL = getURL()+"profile/"+profileusername;
                axios.get(getprofileURL,
                    {headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
                }})
                .then(res => {
                    console.log(res.data);
                    console.log("run");
                    setthisProfile(res.data);
                    
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
                
        
        
    },[]);

 
    


    
        return(
            <>
            <div class="col1">
                <div class="profile-card"><center>
                    <img src={thisProfile.profile_picture} alt="profilepic"></img>
                    
                    
                        { thisProfile.acc_type=="student" ? 
                    <>
                    <h5>{thisProfile["first_name"]} {thisProfile["last_name"]}</h5>
                    <div><p>{thisProfile["username"]} | Student</p></div>
                    <div class="info">
                    <div><h6>Branch</h6><p>{thisProfile["branch"]}</p></div>
                    <div><h6>PRN</h6><p>{thisProfile["PRN"]}</p></div>
                    </div>
                    <p>{thisProfile.bio}</p>
                    </>
                        : ""}

                        { thisProfile.acc_type=="faculty" ? 
                    <>
                    <h5>{thisProfile.first_name} {thisProfile.last_name}</h5>
                    <div><p>{thisProfile.username} | Teacher</p></div>
                    <p>{thisProfile.bio}</p>
                    
                    </>
                        : ""}

                        { thisProfile.acc_type=="club" ? 
                    <>
                    <h5>{thisProfile.name}</h5>
                    <div><p>{thisProfile.username} | Club</p></div>
                    <p>{thisProfile.bio}</p>
                    
                    </>
                        : ""}
                    </center>
                </div>
                
               
            </div>
            </>
        )
}

export default Profile;