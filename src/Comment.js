import React, {useState, useEffect} from 'react';
import './Feed.css';
import { getToken, getURL, getUsername } from './utils';
import axios from 'axios';
import $ from 'jquery';
function Comment(props)
{
    
            

        return(
            <>
                        
                <div class="comment">
                    <p><i>{props.data.author}</i>{props.data.comment}</p>
                    <hr></hr>
                </div>   
            </>
        )
    
}

export default Comment;