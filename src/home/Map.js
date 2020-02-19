import React, { Component } from 'react'
// import { getGeocode } from '../api'
import './Map.scss'
// import messages from '../form-component/messages'

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      addresses: null,
      markers: null,
      createFormLatLng: props.latLng
    }
  }

  pickAdresses = () => {
    const locations = []
    this.props.posts.map((post, index) => {
      locations.push([post.title])
      locations[index].push({ lat: +post.lat, lng: +post.lng })
      locations[index].push(post.id)
      locations[index].push(post.address)
    })
    this.setState({ markers: locations })
  }

  componentDidMount () {
    if (this.props.renderFor === 'homepage') {
      this.pickAdresses()
    }
    this.renderMap()
  }
  // TODO: It doesnt update after create or edit, after redirect
  componentDidUpdate (prevProps) {
    if (this.props.posts && this.props.posts.length !== prevProps.posts.length) {
      this.pickAdresses()
      this.renderMap()
    } else if (this.props.isAnyPostEdited !== prevProps.isAnyPostEdited) {
      this.pickAdresses()
      this.renderMap()
      this.props.makeEditStateDefault()
    }
  }

  renderMap = () => {
    window.google = {}
    window.initMap = this.initMap
    loadScript('https://maps.googleapis.com/maps/api/js?key=<API_KEY>&callback=initMap')
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.props.latLng || { lat: 42.3601, lng: -71.0589 },
      zoom: 12
    })
    if (this.props.latLng) {
      const marker = new window.google.maps.Marker({
        position: this.props.latLng || null,
        map: map
      })
      return marker
    } else if (this.state.markers) {
      this.state.markers.forEach(mark => {
        const marker = new window.google.maps.Marker({
          position: mark[1],
          map: map
        })
        // return marker
        const infoWindow = new window.google.maps.InfoWindow({
          // mark[0] is title of the post mark[3] is address of the post
          // check the function at line 17 above
          content: `<h4>${mark[0]}</h4><p>${mark[3]}</p>`
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })
      })
    }
  }

  render () {
    return (
      <div id='map' className={this.props.classType}></div>
    )
  }
}
// this function loads the google maps api script tag to the html after render
function loadScript (url) {
  const index = window.document.getElementsByTagName('script')[0]
  const newScript = window.document.createElement('script')
  newScript.src = url
  newScript.async = true
  newScript.defer = true
  newScript.id = 'googleApiScript'
  index.parentNode.insertBefore(newScript, index)
}

export default Map
