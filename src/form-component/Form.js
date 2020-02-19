import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import messages from './messages'
// import Col from 'react-bootstrap/Col'

class PostForm extends Component {
  constructor () {
    super()

    this.state = {
      activateSubmit: false
    }
  }

  warnUser = () => {
    this.props.alert(messages.disabledButton, 'warning')
  }

  render () {
    const { handleChange, handleSubmit, post, showAddressOnMap } = this.props
    return (
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='What extra food do you have?'
            onChange={handleChange}
            name='title'
            value={post.title}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Any other description? - We are going to a vacation and I don't want to dump this rice pilaf. I will be home for the next 4 hours."
            onChange={handleChange}
            name='body'
            value={post.body}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder="Type your address - 112 Johnson St. Broadway, Boston"
            onChange={handleChange}
            name='address'
            value={post.address}
          />
          <Button variant="outline-info" size="sm" type="submit" onClick={showAddressOnMap}>Confirm Address On Map</Button>
        </Form.Group>
        {/* <p>Please add links of the images of your food.</p>
        <Form.Row>
          <Form.Group as={Col} controlId="image_1">
            <Form.Label>Image 1</Form.Label>
            <Form.Control
              type='text'
              placeholder="https://address.com/your_img"
              onChange={handleChange}
              name='image_1'
              value={post.image_1}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="image_2">
            <Form.Label>Image 2</Form.Label>
            <Form.Control
              type='text'
              placeholder="https://address.com/your_img"
              onChange={handleChange}
              name='image_2'
              value={post.image_2}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="image_3">
            <Form.Label>Image 3</Form.Label>
            <Form.Control
              type='text'
              placeholder="https://address.com/your_img"
              onChange={handleChange}
              name='image_3'
              value={post.image_3}
            />
          </Form.Group>
        </Form.Row> */}
        <p><strong>IMPORTANT: </strong>Before submitting, address should be confirmed by clicking <em>Show Address On Map</em> button.</p>
        {this.props.activateSubmit
          ? <Button variant="warning" type="submit" size="lg" onClick={handleSubmit} block>Confirm & Submit</Button>
          : <Button variant="warning" size="lg" block onClick={this.warnUser}>Confirm & Submit</Button>
        }
        <Link className='cancel-btn' to="/">
          <Button variant="danger" type="submit" size="lg" block>Cancel & Go Back to Homepage</Button>
        </Link>
      </Form>
    )
  }
}

export default PostForm
