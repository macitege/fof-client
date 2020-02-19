import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

// const alwaysOptions = (
//   <React.Fragment>
//     <Link to="/about">About</Link>
//   </React.Fragment>
// )

const Header = ({ user, isHome, isNewPost, isMyPost, showInstruction }) => (
  <header className="main-header">
    <h3 className='logo'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F.O.F. | Boston</h3>
    {showInstruction && <p className='instructions'>This is an app to help people find free food. <br/> So, create a post for your extra food. Somebody will appreciate it.<br/>Thanks!</p>}
    <nav>
      { user && <span className='greeting'>Welcome, {user.username}!</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { isHome || <Link to="/">Home Page</Link> }
      { isNewPost && <Link to="/create-post">New Post</Link> }
      { isMyPost && <Link to="/my-posts">My Posts</Link> }
      {/* alwaysOptions */}
    </nav>
  </header>
)

export default Header
