import React, {Component} from 'react'
import HomeButton from '../components/HomeButton'
import LoginButton from '../components/LoginButton'
import ProfileButton from '../components/ProfileButton'
import SearchButton from '../components/SearchButton'
import MessagesButton from '../components/MessagesButton'

export default class NavBar extends Component {

    renderLoginOrProfileButton = () => {
        if (localStorage.getItem('auth_token') && localStorage.getItem('auth_token') !== 'null'){
            return (<div className='horizontal-contents'><MessagesButton/> <ProfileButton/></div>)
        } else{
            return (<LoginButton updateUserName={this.props.updateUserName}/>)
        }
    }

    render(){ 
        return(
        <div className='navbar'>
            <HomeButton/>
            
            <SearchButton/>
            {this.renderLoginOrProfileButton()}
            
            {/* <LogoutButton updateUserName={this.props.updateUserName}/> */}
            
        </div>)
    }
}