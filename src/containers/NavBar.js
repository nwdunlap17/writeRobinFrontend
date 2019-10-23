import React, {Component} from 'react'
import HomeButton from '../components/HomeButton'
import LoginButton from '../components/LoginButton'
import ProfileButton from '../components/ProfileButton'
import LogoutButton from '../components/LogoutButton'

export default class NavBar extends Component {

    renderLoginOrProfileButton = () => {
        if (localStorage.getItem('auth_token') && localStorage.getItem('auth_token') !== 'null'){
            return (<ProfileButton/>)
        } else{
            return (<LoginButton updateUserName={this.props.updateUserName}/>)
        }
    }

    render(){ 
        return(
        <div className='navbar'>
            <HomeButton/>

            {this.renderLoginOrProfileButton()}
            
            {/* <LogoutButton updateUserName={this.props.updateUserName}/> */}
            
        </div>)
    }
}