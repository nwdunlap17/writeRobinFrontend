import React, {Component} from 'react'
import HomeButton from '../components/HomeButton'
import LoginButton from '../components/LoginButton'
import ProfileButton from '../components/ProfileButton'
import LogoutButton from '../components/LogoutButton'

export default class NavBar extends Component {


    render(){ 
        return(
        <div className='navbar'>
            <HomeButton/>
            <LoginButton updateUserName={this.props.updateUserName}/>
            <LogoutButton updateUserName={this.props.updateUserName}/>
            {/* <ProfileButton/> */}
        </div>)
    }
}