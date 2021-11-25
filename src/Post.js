import React, {useState, useEffect} from 'react';
import './Feed.css';
import profilepic from './profilepic.jpg';
import solidclap from './solid-clap.png';
import outlineclap from './outline-clap.png';
import postcomment from './post-comment.png';
import Comment from './Comment';
import { getToken, getURL, getUsername } from './utils';
import axios from 'axios';
import $ from 'jquery';
function Post(props)
{
    
    const [message, setmessage] = useState("Liked");
    
    const URL=getURL();
    const likeURL=URL+"like/"+ props.data.section + "/" + props.data.title;
    const user=props.data.user;
    const [no_of_likes, setno_of_likes] = useState(props.data.no_of_likes);
    const [likes, setlikes] = useState(props.data.likes)
    let thisPost = getURL()+props.data.section+"/"+props.data.title;
    
            
    const likeHandler = (e) => {
        e.preventDefault();
        
        const token = getToken();
        const username = getUsername();
        if(username.length>0)
        {
            fetch(
                likeURL,
                {
                    method: 'PUT',
                    headers:{'authorization':`${token}`}
                }
            )
            /*axios.put(likeURL, 
                {headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
            }})*/
            .then(response => {
                console.log("like success");
                
                
                
                
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
             
            axios.get(thisPost,
                {headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`
            }})
            .then(res => {
               
                setno_of_likes(res.data.no_of_likes);
                setlikes(res.data.likes);


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
    const authorProfile="/profile/"+props.data.author;
    const [allcomments, setallcomments] = useState([]);
    const [no_of_comments, setno_of_comments] = useState(0);
    useEffect(() => {
        console.log(props.data.no_of_comments_active);
        const getcommentsURL=getURL()+"allcomments/"+props.data.section+"/"+props.data.title;
        const token=getToken();
        axios.get(getcommentsURL,
            {headers: {
            "Content-Type": "application/json",
            "authorization": `${token}`
        }})
        .then(res => {
            
            const data=res.data;
            
            for(let i=0; i<props.data.no_of_comments_active; i++)
            {
                allcomments[i]=data[i];
                console.log(allcomments[i]);
            }
            console.log(allcomments);
            

        })
        .catch((err) => {
            
            /*if(err.message==="Request failed with status code 401")
            {
                setno_of_comments(0);
            }*/
        }

        )



    }, [])
    
        return(
            <>
                
            <div class="post">
                
                
                <div class="post-content"><div class="keepleft">
                    <div class="text-content">
                        <div class="author-pic">
                        <img src={profilepic}></img>
                        <a href={authorProfile}>
                        <h6>{props.data.author}</h6>
                        </a>
                        </div>
                        
                        <p>{props.data.caption}</p>
                    </div>
                    <div class="file-content">
                        <img src={props.data.file}></img>
                    </div>
                    <div class="like-btn">
                        <a href="" onClick={likeHandler}>
                            { likes.indexOf(user.username)==-1 ?
                            <img src={outlineclap}></img>
                        
                            :
                            <img src={solidclap}></img>
                            }
                            
                        </a>
                        <h6>{no_of_likes}</h6>
                        <form>
                            <input type="text" placeholder="Comment here..."></input>
                            <button type="submit">
                                <img src={postcomment}></img>
                            </button>
                        </form>
                    </div>
                </div>
                </div>
                
                <div class="comments"><div class="keepleft">
                    <div class="comments-header">
                        <h6>Comments ({props.data.no_of_comments_active})</h6>
                    </div>
                    <div class="view-comments">
                  
    
                        
                    {allcomments.map((key, data) => {
                            return <div class="comment">
                            <p><i>{key.author._path.segments[1]}: </i>{key.comment}</p>
                            <hr></hr>
                        </div> 
                        })}
                        
                        

                        
                        
                        
                    </div>
                    
                    

                </div>
                </div>
               
                
            </div>

                    
                        
                    
            </>
        )
    
}

export default Post;