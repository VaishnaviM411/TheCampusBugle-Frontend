import * as React from 'react';
import './Nav.css'
class Nav extends React.Component{

    render(){
        return(
            <>
              <nav class="navbar navbar-light bg-light fixed-top">
                <div class="container-fluid">
                  <div class="section">
                    <a class="navbar-brand" href="#">The Campus Bugle</a>
                    <span id="section-links">
                      <a class="nav-link active inc-wid" aria-current="page" href="#">Notice Board</a>
                      <a class="nav-link inc-wid" href="#">Club Broadcast</a>
                      <a class="nav-link inc-wid" href="#">Feed</a>
                    </span>
                  </div> 
                  <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                      <h5 class="offcanvas-title" id="offcanvasNavbarLabel">The Campus Bugle</h5>
                      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <span id="section-links-mobile">
                          <a class="nav-link active" aria-current="page" href="#">Notice Board</a>
                          <a class="nav-link" href="#">Club Broadcast</a>
                          <a class="nav-link" href="#">Feed</a>
                        </span>
                        <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="#">About us</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">About WCE</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">Settings</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">View Profile</a>
                        </li>
                      </ul>
                      <div class="logout-rect"><center>
                      <a href="#">
                      <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="30" height="30"
viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#a470ff"></path><g fill="#ffffff"><path d="M85.92833,30.88938c-2.52962,0.03954 -4.54964,2.11968 -4.515,4.64938v50.45333c-0.02339,1.65412 0.84567,3.19269 2.2744,4.02658c1.42874,0.83389 3.19579,0.83389 4.62453,0c1.42874,-0.83389 2.2978,-2.37246 2.2744,-4.02658v-50.45333c0.01698,-1.23978 -0.46865,-2.43362 -1.34623,-3.30952c-0.87758,-0.87589 -2.07236,-1.35922 -3.3121,-1.33986zM63.04875,36.51522c-0.72177,0.0109 -1.43078,0.19199 -2.06938,0.52854c-17.79807,9.10913 -30.01938,27.61036 -30.01938,48.94833c0,30.34294 24.69706,55.04 55.04,55.04c30.34294,0 55.04,-24.69706 55.04,-55.04c0,-21.33798 -12.22131,-39.8392 -30.01938,-48.94833c-2.25608,-1.15278 -5.01951,-0.25837 -6.17229,1.99771c-1.15278,2.25608 -0.25837,5.01951 1.99771,6.17229c14.84065,7.59551 25.02062,22.937 25.02062,40.77833c0,25.38506 -20.4816,45.86667 -45.86667,45.86667c-25.38506,0 -45.86667,-20.4816 -45.86667,-45.86667c0,-17.84133 10.17997,-33.18282 25.02062,-40.77833c1.92258,-0.95057 2.92986,-3.10645 2.42536,-5.191c-0.5045,-2.08455 -2.3861,-3.54128 -4.53057,-3.50754z"></path></g></g></svg>
                      Logout</a></center></div>
                    </div>
                  </div>
                </div>
              </nav>
            </>
        )
    };


}

export default Nav;