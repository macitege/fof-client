import React, { Component } from 'react'
import PostForm from '../form-component/Form'
import { Redirect } from 'react-router'
import { updatePost, showPost, getGeocode } from '../api'
import Map from '../home/Map'
import messages from '../form-component/messages'
import './create-edit.scss'

class EditPost extends Component {
  constructor () {
    super()

    this.state = {
      data: {
        post: null
      },
      latLng: null,
      activateSubmit: false,
      shouldRedirect: false,
      isUpdated: false
    }
  }

  componentDidMount () {
    showPost(this.props.user, this.props.match.params.id)
      .then(res => this.setState({
        data: {
          post: res.data.post
        }
      }))
      .catch(() => this.props.alert(messages.genericFail, 'danger'))
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
    const { match, user } = this.props
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
    updatePost(user, match.params.id, this.state.data)
      .then(() => { this.props.getFeed(true) })
      .then(() => { this.setState({ shouldRedirect: true, isUpdated: true }) })
      .then(() => this.props.alert(messages.editSuccess, 'success'))
      .catch(() => {
        this.props.alert(messages.editFail, 'danger')
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
        this.setState({ data: { post: { ...this.state.data.post,
          title: '',
          body: '',
          address: '',
          image_1: '',
          image_2: '',
          image_3: ''
        } } })
        this.props.alert(messages.editFail, 'danger')
      })
  }

  render () {
    const { handleChange, handleSubmit, state, showAddressOnMap } = this
    if (state.shouldRedirect) {
      return <Redirect to='/' />
    }

    if (!state.data.post) {
      return <h3 className='loading'>Loading...</h3>
    }

    return (
      <div className='form-style'>
        <h1> Edit & Update This Post </h1>
        <PostForm key='form'
          activateSubmit={state.activateSubmit}
          post={state.data.post}
          showAddressOnMap={showAddressOnMap}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          user={this.props.user}
          alert={this.props.alert}
        />
        { state.latLng && <Map key='map' isMapUpdated={false} latLng={state.latLng} classType='map-create-post'/>}
      </div>
    )
  }
}

export default EditPost
