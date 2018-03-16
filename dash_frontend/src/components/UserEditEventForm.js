import React from 'react'
import {connect} from 'react-redux'
import {updateEvent} from '../actions/events'

class UserEditEventForm extends React.Component {

  state = {
    title: '',
    location: '',
    description: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    friendFilter: '',
    friends: [],
    invited: [],
    invitedFriends: []
  }

  componentDidMount() {
    const start = this.props.event.start_time.split("T")
    const startTimeObj = start[1].slice(0, -8)
    const startTimeArray = startTimeObj.split("")
    const startTimeHour = (startTimeObj[1] - 5).toString()
    startTimeArray.splice(1, 1, startTimeHour)
    const startTime = startTimeArray.join("")
    const end = this.props.event.end_time.split("T")
    const endTimeObj = end[1].slice(0, -8)
    const endTimeArray = endTimeObj.split("")
    const endTimeHour = (endTimeObj[1] - 5).toString()
    endTimeArray.splice(1, 1, endTimeHour)
    const endTime = endTimeArray.join("")
    this.setState({
      title: this.props.event.title,
      location: this.props.event.location,
      description: this.props.event.description,
      start_date: start[0],
      start_time: startTime,
      end_date: end[0],
      end_time: endTime,
      friends: this.props.user.friends,
      invited: this.props.event.users
    })
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    const startDateElements = this.state.start_date.split("-")
    const startTimeElements = this.state.start_time.split(":")
    const endDateElements = this.state.end_date.split("-")
    const endTimeElements = this.state.end_time.split(":")
    const action = {
      id: this.props.event.id,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      start_time: new Date(startDateElements[0], startDateElements[1], startDateElements[2], startTimeElements[0], startTimeElements[1]),
      end_time: new Date(endDateElements[0], endDateElements[1], endDateElements[2], endTimeElements[0], endTimeElements[1]),
      user_id: this.props.user.id,
      friends: this.state.invitedFriends
    }
    this.props.updateEvent(action)
  }

  renderFriendsForEventInvites() {
    const filteredFriends = this.state.friends.filter(friend => friend.name.toUpperCase().includes(this.state.friendFilter.toUpperCase()))
    let filteredFriend = {}
    if (filteredFriends.length > 0) {
      filteredFriend = filteredFriends[0]
      let invited = this.state.invited.filter(invite => invite.name === filteredFriend.name)
      if (invited.length === 0) {
        return (
          <div>
            <h4>{filteredFriend.name} | </h4>
            {!this.state.invitedFriends.includes(filteredFriends[0]) ?
              <button onClick={() => {this.handleInvite(filteredFriends[0])}}>Invite</button>
              :
              <h5>Invited</h5>
             }
          </div>
        )
      } else {
        return (
          <div>
            <h4>{filteredFriend.name} | </h4>
            <h5>Invited</h5>
          </div>
        )
      }
    }
  }

  handleInvite = (friend) => {
    this.setState({
      invitedFriends: [...this.state.invitedFriends, friend]
    })
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <h3>Create a new Event</h3>
          <label>Title: </label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleOnChange}/>
          <label>Location: </label>
          <input type="text" name="location" value={this.state.location} onChange={this.handleOnChange}/>
          <label>Description: </label>
          <input type="text" name="description" value={this.state.description} onChange={this.handleOnChange}/>
          <label>Start Date: </label>
          <input type="date" name="start_date" value={this.state.start_date} onChange={this.handleOnChange}/>
          <label>Start Time: </label>
          <input type="time" name="start_time" value={this.state.start_time} onChange={this.handleOnChange}/>
          <label>End Date: </label>
          <input type="date" name="end_date" value={this.state.end_date} onChange={this.handleOnChange}/>
          <label>End Time: </label>
          <input type="time" name="end_time" value={this.state.end_time} onChange={this.handleOnChange}/>
          <input type="submit" value="Submit" />
        </form>
        <label>Invite Friends</label>
        <input type="text" name="friendFilter" onChange={this.handleOnChange} />
        <div>
          {this.renderFriendsForEventInvites()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    event: state.specific_event
  }
}

export default connect(mapStateToProps, {updateEvent})(UserEditEventForm)