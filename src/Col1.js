import * as React from 'react';
import './Col1.css';
import profilepic from './profilepic.jpg'
class Col1 extends React.Component
{
    render(){
        return(
            <>
            <div class="col1">
                <div class="profile-card"><center>
                
                    <img src={profilepic}></img>
                    <h5>User Name</h5>
                    <div class="info">
                    <div><h6>Branch</h6><p>CSE</p></div>
                    <div><h6>PRN</h6><p>2019BTECS00105</p></div>
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
}

export default Col1;