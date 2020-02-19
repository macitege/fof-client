import axios from 'axios'
import apiUrl from './apiConfig'

export const getAllPosts = () => {
  return axios({
    url: apiUrl + '/posts',
    method: 'get'
  })
}

export const createPost = (user, data) => {
  return axios({
    url: apiUrl + '/posts',
    method: 'post',
    headers: {
      Authorization: 'Token token=' + user.token
    },
    data: data
  })
}

export const destroyPost = (id, user) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'delete',
    headers: {
      Authorization: 'Token token=' + user.token
    }
  })
}

export const updatePost = (user, id, data) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'patch',
    headers: {
      Authorization: 'Token token=' + user.token
    },
    data: data
  })
}

export const showPost = (user, id) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'get',
    headers: {
      Authorization: 'Token token=' + user.token
    }
  })
}

export const getGeocode = (address) => {
  return axios.get('https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address: address,
        key: ''
      }
    })
}
