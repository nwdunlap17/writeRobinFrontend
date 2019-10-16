import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class LogoutButton extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect: false
        }
    }

    handleLogout = () => {
        localStorage.setItem('auth_token', null)
        localStorage.setItem('user', null)
        this.setState({redirect: true})
        this.props.updateUserName('null')
    }

    render() {
        return (
            <div>
                {localStorage.getItem('auth_token') && localStorage.getItem('auth_token') !== 'null'? <button onClick={this.handleLogout}>Logout</button> : null}
                {this.state.redirect === true? <Redirect to='/home'/> : null}
            </div>
        )
    }
}