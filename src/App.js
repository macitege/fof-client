import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Feed from './home/feed'
import { withRouter } from 'react-router'
import CreatePost from './create-edit/CreatePost'
import EditPost from './create-edit/EditPost'
import Map from './home/Map'
import { getAllPosts, destroyPost } from './api'
import messages from './form-component/messages'
import MyPosts from './home/MyPosts'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      posts: null,
      deleted: false,
      isMapUpdated: false,
      isAnyPostEdited: false
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  componentDidMount () {
    this.getFeed()
  }

  getFeed = (isEdited) => {
    getAllPosts()
      .then(res => this.setState({ posts: res.data.posts.reverse() }))
      .then(() => {
        if (isEdited) {
          this.setState({ isAnyPostEdited: true })
        }
        this.setState({ isMapUpdated: true })
      })
      .catch(() => this.alert(messages.genericFail, 'danger'))
  }

  handleDelete = e => {
    const id = e.target.id
    destroyPost(id, this.state.user)
      .then(() => { this.getFeed() })
      .then(() => this.alert(messages.deleteSuccess, 'success'))
      .catch(() => this.alert(messages.deleteFail, 'danger'))
  }

  makeEditStateDefault = () => {
    this.setState({ isAnyPostEdited: false })
  }

  render () {
    // posts
    const { alerts, user, posts, isAnyPostEdited } = this.state
    const { handleDelete, getFeed } = this
    const { location } = this.props

    if (!posts) {
      return <h3>Loading...</h3>
    }

    return (
      <React.Fragment>
        <Header
          user={user}
          isHome={location.pathname === '/'}
          isNewPost={location.pathname !== '/create-post' && user}
          isMyPost={location.pathname !== '/my-posts' && user}
          showInstruction={!user && location.pathname === '/'}
        />
        <div className='user-message'>
          {alerts.map((alert, index) => (
            <Alert className='alert-itself' key={index} dismissible variant={alert.type}>
              {alert.message}
            </Alert>
          ))}
        </div>
        <main className="container">
          <Route exact path='/' render={() => (
            <React.Fragment>
              <Map classType='map' makeEditStateDefault={this.makeEditStateDefault} isAnyPostEdited={isAnyPostEdited} isMapUpdated={this.state.isMapUpdated} renderFor='homepage' posts={posts} user={user} alert={this.alert} />
              <Feed classType='feed' user={user} posts={posts} handleDelete={handleDelete} alert={this.alert} />
              {/* <CreatePost alert={this.alert} user={user} /> */}
            </React.Fragment>
          )} />

          <AuthenticatedRoute user={user} exact path='/create-post' render={() => (
            <CreatePost getFeed={getFeed} alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/posts/:id/edit' render={({ match, post }) => (
            <EditPost getFeed={getFeed} match={match} post={post} alert={this.alert} user={user}/>
          )} />

          <AuthenticatedRoute user={user} path='/my-posts' render={() => (
            <MyPosts getFeed={getFeed} posts={posts} alert={this.alert} user={user}/>
          )} />

          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

// function loadScript () {
//   const index = window.document.getElementsByTagName('script')[0]
//   const newScript = window.document.createElement('script')
//   newScript.src = 'https://maps.googleapis.com/maps/api/js?key=<API_KEY>&callback=initMap'
//   newScript.async = true
//   newScript.defer = true
//   newScript.id = 'map-script-tag'
//   index.parentNode.insertBefore(newScript, index)
// }

export default withRouter(App)
