import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../actions/users'

const Navbar = (props) => {
  const firstName = props.user.name.split(" ")

  const logout = () => {
    props.logout()
    props.history.push("/login")
  }
  return (
    <div id="navbar">
      <div className="navbarItem">
        <h3>DASH</h3>
      </div>
      <div className="navbarItem">
        <h5>Welcome back, {firstName[0]} | {props.loggedIn ?
          <button onClick={logout}>Logout</button>
          :
          null
        }
        </h5>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    user: state.user
  }
}

export default connect(mapStateToProps, {logout})(Navbar)
