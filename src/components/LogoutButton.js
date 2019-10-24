import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class LogoutButton extends Component {
    constructor(props){
        super(props)
    }

    handleLogout = () => {
        localStorage.setItem('auth_token', null)
        localStorage.setItem('user', null)
        localStorage.setItem('user_id', null)
        localStorage.setItem('admin', null)
        this.props.updateUserName('null')
        this.props.redirect('/home')
    }

    render() {
        return (
            <div>
                {localStorage.getItem('auth_token') && localStorage.getItem('auth_token') !== 'null'? <button className='btn btn-light' onClick={this.handleLogout}>Logout</button> : null}
            </div>
        )
    }
}