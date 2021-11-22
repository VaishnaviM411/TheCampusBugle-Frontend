import {React, useState, useEffect} from 'react';
import Nav from './Nav';
import Col1 from './Col1';
import Feed from './Feed';
import Col3 from './Col3';

function Main()
{
    /*const [userprofile, setuserprofile] = useState([]);
    let profileURL;
    useEffect(()=>{
        try{
            const username = getUsername();
            if(username.length>0)
            {
                profileURL = getURL()+"profile/"+getUsername();
                axios.get(profileURL)
                .then(res => {
                    setuserprofile(res.data);
                });
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
            
                <div class="main-panel">
                    <Nav/>
                    <Col1/>
                    <Feed/>
                </div>
            </>
        );
    
}

export default Main;