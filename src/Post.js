import React, {useState, useEffect, Component} from 'react';
import './Feed.css';
import profilepic from './profilepic.jpg';
import solidclap from './solid-clap.png';
import outlineclap from './outline-clap.png';
import postcomment from './post-comment.png';
import deleteicon from './delete-icon.png';
import { getToken, getURL, getUsername } from './utils';
import axios from 'axios';
import $ from 'jquery';
class Post extends Component
{
    
    constructor(props) {
        super(props);
        this.state = {
         message: '',
         postdata: this.props.data,
         section: this.props.data.section,
         allcomments: [],
         authorProfile: [],
         authorProfilePage: "/profile/"+this.props.data.author,
         username: getUsername(),
         comment: '',
         screenready: false
        };
      }

    likeHandler = (e) => {
        e.preventDefault();
        const token = getToken();
        const username = getUsername();
        const likeURL= getURL() +"like/"+ this.state.section + "/" + this.state.postdata.title;
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

                //getting updates
                let thisPost = getURL()+this.state.section+"/"+this.state.postdata.title;
            axios.get(thisPost,
                {headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`
            }})
            .then(res => {
                console.log(res.data);
               this.setState({postdata: res.data});
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
                //close

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

    componentDidMount(){
        const authorProfileURL="/profile/"+this.state.postdata.author;
        const getcommentsURL=getURL()+"allcomments/"+this.state.section+"/"+this.state.postdata.title;
        const token=getToken();
        axios.get(getcommentsURL,
            {headers: {
            "Content-Type": "application/json",
            "authorization": `${token}`
        }})
        .then(res => {
            
            const data=res.data;
            
            this.setState({allcomments:data});
            console.log(this.state.allcomments);

            //get author details
            axios.get(authorProfileURL,
                {headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`
            }})
            .then(res => {
                this.setState({authorProfile:res.data});
                console.log(this.state.authorProfile);
                this.setState({screenready:true});
            })
            .catch((err) => {
                
            }
            )
            //close
            

        })
        .catch((err) => {
            this.setState({screenready:true});
            /*if(err.message==="Request failed with status code 401")
            {
                setno_of_comments(0);
            }*/
        }

        )
    }


    

    setInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        }

    CommentHandler = (e) => {
        e.preventDefault();
        $('#comment').val('');
        const token = getToken();
        const username = getUsername();
        const commentURL= getURL() +"comment/"+ this.state.section + "/" + this.state.postdata.title+ "/none";
        if(username.length>0)
        {
            axios.post(commentURL, 
                {
                    comment: this.state.comment
                },
                {headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
            }})
            .then(response => {
                console.log("comment success"); 
                this.setState({comment:""});
                //getting comments
                const getcommentsURL=getURL()+"allcomments/"+this.state.section+"/"+this.state.postdata.title;
            console.log(
                "getting comment");
        axios.get(getcommentsURL,
            {headers: {
            "Content-Type": "application/json",
            "authorization": `${token}`
        }})
        .then(res => {
            
            const data=res.data;
            this.setState({allcomments:data});
            console.log(this.state.allcomments);
            

        })
        .catch((err) => {
            
            /*if(err.message==="Request failed with status code 401")
            {
                setno_of_comments(0);
            }*/
        }

        )
                //close

            })
            .catch((err) => {
                console.log(err.message);
                if(err.message==="Request failed with status code 401"||err.message==="Request failed with status code 404")
                {
                    alert("Login to access TheCampusBugle");
                    window.location="/login";
                    return;
                }
                if(err.message==="Request failed with status code 401"||err.message==="Request failed with status code 404")
                {
                    alert("Post does not exist, refresh page");
                    return;
                }
            });
            
        }
    }

    deleteCommentHandler = comment_id => (e) => {
        
        e.preventDefault();
        const token = getToken();
        const username = getUsername();
        const deletecommentURL= getURL() +"delete-comment/" + comment_id;//comment title
        if(username.length>0)
        {
            axios.delete(deletecommentURL, 
                {headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
            }})
            .then(response => {
                console.log("delete comment success"); 
                
                //getting comments
                const getcommentsURL=getURL()+"allcomments/"+this.state.section+"/"+this.state.postdata.title;
            console.log(
                "getting comment");
        axios.get(getcommentsURL,
            {headers: {
            "Content-Type": "application/json",
            "authorization": `${token}`
        }})
        .then(res => {
            
            const data=res.data;
            this.setState({allcomments:data});
            console.log(this.state.allcomments);
            

        })
        .catch((err) => {
            
            /*if(err.message==="Request failed with status code 401")
            {
                setno_of_comments(0);
            }*/
        }

        )
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
                if(err.message==="Request failed with status code 404")
                {
                    alert("Comment does not exist, refresh page");
                    return;
                }
            });
            
        }
    }

    deletePostHandler = (e) => {
        e.preventDefault();
        const token = getToken();
        const username = getUsername();
        const deletepostURL= getURL() +"delete-post/" + this.state.section + "/" + this.state.postdata.title;//post title
        if(username.length>0)
        {
            axios.delete(deletepostURL, 
                {headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
            }})
            .then(response => {
                console.log("delete post success"); 
                
                //getting posts
                window.location="/"+this.state.section;
                //close

            })
            .catch((err) => {
                console.log(err.message);
                if(err.message==="Request failed with status code 404")
                {
                    alert("Login to access TheCampusBugle");
                    window.location="/login";
                    return;
                }
                
            });
            
        }
    }
    
    render(){
        return(
            <>
            { this.state.screenready ?
            <div class="post">
                
                
                <div class="post-content"><div class="keepleft">
                    <div class="text-content">
                        <div class="author-pic">
                        <img src={this.state.authorProfile.profile_picture}></img>
                        <a href={this.state.authorProfilePage}>
                        <h6>{this.state.postdata.author}</h6>
                        </a>
                        { this.state.postdata.author==this.state.username ?
                        <a href="" onClick={this.deletePostHandler} class="deletebtn"><img src={deleteicon}></img></a>
                        : ""}
                        </div>
                        
                        <p>{this.state.postdata.caption}</p>
                    </div>
                    <div class="file-content">
                        <img src={this.state.postdata.file}></img>
                    </div>
                    <div class="like-btn">
                        <a href="" onClick={this.likeHandler}>
                            { this.state.postdata.likes.indexOf(this.state.username)==-1 ?
                            <img src={outlineclap}></img>
                        
                            :
                            <img src={solidclap}></img>
                            }
                            
                        </a>
                        <h6>{this.state.postdata.no_of_likes}</h6>
                        <form onSubmit={this.CommentHandler}>
                            <input type="text" name="comment" id="comment" placeholder="Comment here..." onChange={this.setInput}  value={this.state.comment} required></input>
                            <button type="submit">
                                <img src={postcomment}></img>
                            </button>
                        </form>
                    </div>
                </div>
                </div>
                
                <div class="comments"><div class="keepleft">
                    <div class="comments-header">
                        <h6>Comments </h6>
                    </div>
                    <div class="view-comments">
                  
    
                        
                    {this.state.allcomments.map((key, data) => {
                            return <div class="comment">
                            <p><i>{key.author._path.segments[1]}: </i>{key.comment}
                            { key.author._path.segments[1]==this.state.username ?
                            <a href="" onClick={this.deleteCommentHandler(key.comment_id)}><img src={deleteicon}></img></a>
                                : "" }
                            </p>
                            
                            <hr></hr>
                        </div> 
                        })}
                        
                        

                        
                        
                        
                    </div>
                    
                    

                </div>
                </div>
               
                
            </div>
            :""}
                    
                        
                    
            </>
        )
    }
}

export default Post;