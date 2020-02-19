import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './feed.scss'

class Feed extends Component {
  constructor (props) {
    super(props)

    this.state = {
      classType: this.props.classType,
      hidden: false
    }
  }

  hidePosts = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render () {
    const { posts, handleDelete, user, hideBtn } = this.props

    return (
      <React.Fragment>
        { !hideBtn && <button className='close-posts' onClick={this.hidePosts}>&#x021E5;&#x021E5;</button> }
        <div className={this.state.hidden ? this.state.classType + ' hide' : this.state.classType}>
          <h3>Free Food in Boston</h3>
          {posts.map(post => {
            const date = new Date(post.created_at)
            return (
              <div key={post.id} className='post'>
                <p>Posted by <strong>{post.username}</strong></p>
                <hr/>
                <p className='title'>{post.title}</p>
                <p>{post.body}</p>
                <hr/>
                <p>@&nbsp; {post.address}</p>
                <hr/>
                <p>created on {date.toDateString()}</p>
                {/* post['image_1'] && <a href={post['image_1']} className="picture-link" target="_blank" rel="noopener noreferrer">See picture</a> */}
                {/* post['image_2'] && <a className="picture-link" href={post['image_2']} target="_blank" rel="noopener noreferrer">See picture2</a> */}
                {/* post['image_3'] && <a className="picture-link" href={post['image_3']} target="_blank" rel="noopener noreferrer">See picture3</a> */}
                { user && post.user_id === user.id && <button onClick={handleDelete} id={post.id} className='delete-btn'>Delete</button> }
                { user && post.user_id === user.id && <Link to={`/posts/${post.id}/edit`} post={post}><button className='edit-btn'>Edit</button></Link> }
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}

export default Feed
