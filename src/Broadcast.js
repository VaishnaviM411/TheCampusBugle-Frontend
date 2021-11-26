import React, {useState, useEffect, Component} from 'react';
import './Feed.css';
import profilepic from './profilepic.jpg';

import { getToken, getURL, getUsername } from './utils';
import axios from 'axios';
import Post from './Post';
class Broadcast extends Component
{
    constructor(props) {
        super(props);
        this.state = {
         section: 'Club-broadcast',
         allposts: [],
         feed_posts: [],
         user: this.props.user
        };
      }

   
    
    
    componentDidMount() {
        console.log(this.props.user);
        console.log("vro");
        let postsURL = getURL()+"Club-broadcast";
        try{
            const token = getToken();
            const username = getUsername();
            if(username.length>0)
            {   
                
                axios.get(postsURL,
                    {headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
                }})
                .then(res => {
                    console.log(res.data);
                    const data=res.data;
                    this.setState({feed_posts:data});
                    /*for(let i=0; i<data.length; i++)
                    {
                        this.state.feed_posts.push(data[i]);
                    }*/
                    for(let i=0; i<this.state.feed_posts.length; i++)
                    {
                        
                        this.state.feed_posts[i]["section"]=this.state.section;
                        this.state.feed_posts[i]["user"]=this.props.user;
                        this.state.allposts.push(<Post key={this.state.feed_posts[i].title} data={this.state.feed_posts[i]}/>);
                        console.log(this.state.allposts[i]);
                    }
                    
   
    
                })
                .catch((err) => {
                    
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
    }

 
    
    
    render(){
        return(
            <>
                <div class="feed">
                    <div class="feed-heading">
                        Club Broadcast
                        
                        
                        <a href="/post-to/club-broadcast">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="30" height="30"
viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#a470ff"><path d="M102.48468,36.01294c-1.36685,-0.04913 -2.75301,0.1012 -4.12363,0.46401c-3.655,0.9675 -6.66542,3.33208 -8.49292,6.55708l-3.86958,6.9875c-0.86,1.505 -0.32292,3.54918 1.18208,4.40918l18.59834,10.75c0.5375,0.3225 1.075,0.42832 1.6125,0.42832c0.3225,0 0.53624,0.00042 0.85874,-0.10708c0.86,-0.215 1.50584,-0.75292 1.93584,-1.50542l3.97666,-6.9875c1.8275,-3.225 2.36584,-6.98582 1.39834,-10.64082c-0.9675,-3.655 -3.33208,-6.66542 -6.55708,-8.49292c-2.01562,-1.14219 -4.24121,-1.78047 -6.51929,-1.86235zM81.80353,60.15635c-1.04141,0.07979 -2.04082,0.64248 -2.57832,1.58311l-32.46416,56.33042c-3.655,6.235 -5.69666,13.22292 -6.12666,20.31792l-0.86084,13.86792c-0.1075,1.1825 0.5375,2.36374 1.6125,3.00874c0.5375,0.3225 1.075,0.43042 1.6125,0.43042c0.645,0 1.28916,-0.215 1.82666,-0.5375l11.61084,-7.63208c5.9125,-3.9775 10.965,-9.24542 14.5125,-15.48042l32.57334,-56.33042c0.86,-1.505 0.32082,-3.54708 -1.18418,-4.40708c-1.505,-0.86 -3.54708,-0.32292 -4.40708,1.18208l-32.57124,56.33042c-3.1175,5.2675 -7.41876,9.89042 -12.57876,13.33042l-6.23374,4.08374l0.42832,-7.41582c0.3225,-6.1275 2.15042,-12.14834 5.26792,-17.52334l32.57334,-56.33042c0.86,-1.505 0.32292,-3.54708 -1.18208,-4.40708c-0.56437,-0.3225 -1.20602,-0.4489 -1.83086,-0.40103zM69.87355,149.24488c-1.8275,0 -3.225,1.3975 -3.225,3.225c0,1.8275 1.3975,3.225 3.225,3.225h43c1.8275,0 3.225,-1.3975 3.225,-3.225c0,-1.8275 -1.3975,-3.225 -3.225,-3.225zM128.99855,149.24488c-1.78112,0 -3.225,1.44388 -3.225,3.225c0,1.78112 1.44388,3.225 3.225,3.225c1.78112,0 3.225,-1.44388 3.225,-3.225c0,-1.78112 -1.44388,-3.225 -3.225,-3.225z"></path></g></g></svg>
                    </a>
                    
                    </div>
                   
                    {this.state.allposts.map((key) => key)}
                    
                    
                </div>
            </>
        )
        }
    
}

export default Broadcast;