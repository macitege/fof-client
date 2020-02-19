import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import PostForm from '../form-component/Form'
import { Redirect } from 'react-router'
import { createPost, getGeocode } from '../api'
import messages from '../form-component/messages'
import Map from '../home/Map'
import './create-edit.scss'

class CreatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        post: {
          title: '',
          body: '',
          address: '',
          lat: '',
          lng: '',
          image_1: '',
          image_2: '',
          image_3: '',
          username: props.user.username
        }
      },
      latLng: null,
      activateSubmit: false,
      shouldRedirect: false
    }
  }

  handleChange = e => {
    const changes = { [e.target.name]: e.target.value }
    this.setState({
      data: {
        post: {
          ...this.state.data.post, ...changes
        }
      }
    })

    if (e.target.name === 'address') {
      this.setState({ latLng: null, activateSubmit: false })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { title } = this.state.data.post
    if (title === '' || title.length < 10) {
      this.setState({ data: { post: { ...this.state.data.post,
        title: '',
        body: '',
        image_1: '',
        image_2: '',
        image_3: ''
      } } })
      return this.props.alert(messages.noTitle, 'warning')
    }
    createPost(this.props.user, this.state.data)
      .then(() => { this.props.getFeed() })
      .then(() => { this.setState({ shouldRedirect: true, isUpdated: true }) })
      .then(() => this.props.alert(messages.createSuccess, 'success'))
      .catch(() => {
        this.props.alert(messages.createFail, 'danger')
        this.setState({ data: { post: { ...this.state.data.post,
          title: '',
          body: '',
          address: '',
          image_1: '',
          image_2: '',
          image_3: ''
        } } })
      })
  }

  showAddressOnMap = e => {
    e.preventDefault()
    getGeocode(this.state.data.post.address)
      .then(res => {
        if (res.data.status === 'ZERO_RESULTS') {
          this.setState({ data: { post: { ...this.state.data.post,
            title: '',
            body: '',
            address: '',
            image_1: '',
            image_2: '',
            image_3: ''
          } } })
          return this.props.alert(messages.badAddress, 'warning')
        } else {
          return res
        }
      })
      .then(res => {
        const latLng = res.data.results[0].geometry.location
        this.setState({
          data: {
            post: {
              ...this.state.data.post, ...latLng
            }
          }
        })
        return latLng
      })
      .then(reslatLng => {
        this.setState({ latLng: reslatLng })
        this.setState({ activateSubmit: true })
        this.props.alert(messages.checkTheMap, 'success')
      })
      // TODO: Add error message
      .catch(() => {
        this.props.alert(messages.createFail, 'danger')
        this.setState({ data: { post: { ...this.state.data.post,
          title: '',
          body: '',
          address: '',
          image_1: '',
          image_2: '',
          image_3: ''
        } } })
      })
  }

  render () {
    const { handleChange, handleSubmit, state, showAddressOnMap } = this

    if (state.shouldRedirect) {
      return <Redirect to='/' />
    }

    return (
      <div className='form-style'>
        <h1> Create a Post </h1>
        <PostForm key='form'
          activateSubmit={state.activateSubmit}
          post={state.data.post}
          showAddressOnMap={showAddressOnMap}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          user={this.props.user}
          alert={this.props.alert}
        />
        { state.latLng && <Map key='map' isMapUpdated={false} latLng={state.latLng} classType='map-create-post'/> }
      </div>
    )
  }
}

export default CreatePost
