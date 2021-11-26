import React, {useState, useEffect, Component} from 'react';
import './Profile.css';
import './Feed.css';
import profilepic from './profilepic.jpg'
import { getToken, getURL, getUsername } from './utils';
import { useParams } from 'react-router';
import Post from './Post';

import axios from 'axios';
function Profile()
{
    const {profileusername} = useParams();
    const [thisProfile, setthisProfile] = useState([]);
    const [post_components, setpost_components] = useState([]);
    const [screenready, setscreenready] = useState(false);

    useEffect(()=>{
        
        console.log("im in main");
        console.log(profileusername);
        const token = getToken();
        const username = getUsername();
        if(username.length>0){
            const getprofileURL = getURL()+"profile/"+profileusername;
            axios.get(getprofileURL,
                {headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`
            }})
            .then(res => {
                console.log(res.data);
                console.log("run");
                setthisProfile(res.data);
                const postsURL= getURL()+"allposts/"+profileusername;
                axios.get(
                    postsURL,
                    {headers:{
                            "Content-Type": "application/json",
                            "authorization": `${token}`
                }})
                .then(res => {
                    const data=res.data;
                    console.log(res.data);
                    for(let i=0;i<data.feed.length;i++)
                    {
                        data.feed[i]["section"]="Feed";
                        post_components.push(<Post key={data.feed[i].title} data={data.feed[i]}/>);
                        console.log(post_components);
                    }
                    for(let i=0;i<data["notice-board"].length;i++)
                    {
                        data["notice-board"][i]["section"]="Notice-board";
                        post_components.push(<Post key={data["notice-board"][i].title} data={data["notice-board"][i]}/>);
                        console.log(post_components);
                    }
                    for(let i=0;i<data["club-broadcast"].length;i++)
                    {
                        data["club-broadcast"][i]["section"]="Club-broadcast";
                        post_components.push(<Post key={data["club-broadcast"][i].title} data={data["club-broadcast"][i]}/>);
                        console.log(post_components);
                    }
                    setscreenready(true);
                })

                
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
                
        
        
    },[]);

 
    


    
        return(
            <>
            { screenready ? <>
            <div class="profilepage">
            <div class="profile-col1">
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

            <div class="feed">
                    <div class="feed-heading">
                        {profileusername}'s Posts
                    </div>
                   
                    {post_components.map((key) => key)}
                    
                    
                </div>
                </div>
                </>
                :
                ""
}
            </>
        )

}

export default Profile;