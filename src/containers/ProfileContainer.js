import React, {Component} from 'react'
import LogoutButton from '../components/LogoutButton'
import {Redirect} from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator'
import MessageForm from '../components/MessageForm'

export default class ProfileContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            id: -1,
            friends: [],
            isFriends: null,
            isFollowing: null,
            loaded: false,
            addClicked: false,
            redirect: false,
            writeMessage: false,
            numFollowers: 0
        }
        this.getUserData()
    }

    setRedirect = (newPath) => {
        this.setState({redirect: newPath})
    }

    checkRedirect = () => {
        if (this.state.redirect !== false){
            if (window.location.pathname === this.state.redirect){
                this.setRedirect(false)
                return null
            } else {
                return <Redirect to={this.state.redirect}/>
            }
        }
    }

    getUserData(){
        let path = window.location.pathname
        let userID = path.split('profile/')[1]
        if (parseInt(userID) === NaN){
            this.setRedirect('/home')
            return
        }
        let token = 'null'
        if (!!localStorage.getItem('auth_token') && localStorage.getItem('auth_token')!== 'null'){token = localStorage.getItem('auth_token')}

        console.log('url', `${this.props.backendURL}/users/${userID}/profile`)
        fetch(`${this.props.backendURL}/users/${userID}/profile`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log('profile json', json)
            if (!!json.friends){
                //My Profile
                this.setState({username: json.username, id: json.id, friends: json.friends, loaded: true, numFollowers: json.numFollowers})
            }   else {
                //Their Profile
                this.setState({username: json.username, id: json.id, isFriends: json.friended, isFollowing: json.following , loaded: true, numFollowers: json.numFollowers})
            }
        })
    }

    renderWhosePage = () => {
        console.log('user ', this.state.username)
        if (!!localStorage.getItem('user') && this.state.username.toLowerCase() == localStorage.getItem('user').toLowerCase()){
            return this.renderMyPage()
        } else {
            return this.renderTheirPage()
        }
    }

    renderMyPage = () => {
        return(
            <div>
                <LogoutButton redirect={this.setRedirect} updateUserName={this.props.updateUserName}/>
            </div>
        )
    }

    renderTheirPage = () => {
        return(
            <div>
                {(!!localStorage.getItem('user') && localStorage.getItem('user') !== 'null')?
                    <div>
                    {(this.state.isFriends? 
                        <button className='btn btn-danger profile-button' onClick={this.removeFriend}>Unfriend</button>
                    :
                        (this.state.addClicked == false?
                            <button className='btn btn-success profile-button' onClick={this.addFriend}>Add Friend</button>
                        :
                            <button className='btn btn-light profile-button'>Pending</button>))}
                    {(this.state.isFollowing?
                        <button className='btn btn-danger profile-button' onClick={this.unfollow}>Unfollow</button>
                    :
                        <button className='btn btn-success profile-button' onClick={this.follow}>Follow</button>
                    
                    )}

                        {this.state.writeMessage?
                            <MessageForm recipient={this.state.id} backendURL={this.props.backendURL} closeMessage={this.closeMessage}/>
                            :
                            <button className='btn btn-light profile-button' onClick={() => this.setState({writeMessage:true})}>Message</button>
                        }
                    </div>
                :
                    null
                }
            </div>
        )
        
    }

    closeMessage = () => {
        this.setState({writeMessage: false})
    }

    addFriend = () => {
        fetch(`${this.props.backendURL}/users/${this.state.id}/friend`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        this.setState({addClicked: true})
    }

    removeFriend = () => {
        fetch(`${this.props.backendURL}/users/${this.state.id}/unfriend`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        this.setState({isFriends: false})
    }
    follow = () => {
        fetch(`${this.props.backendURL}/users/${this.state.id}/follow`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        this.setState({isFollowing: true, numFollowers: this.state.numFollowers+1})
    }
    unfollow = () => {
        fetch(`${this.props.backendURL}/users/${this.state.id}/unfollow`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        this.setState({isFollowing: false, numFollowers: this.state.numFollowers-1})
    }


    render(){
        if (this.state.loaded){
            return(
                <div>
                    {this.checkRedirect()}
                    <h3>{this.state.username}</h3>
                    {this.renderWhosePage()}
                    <p>Followers: {this.state.numFollowers}</p>
                </div>
            )
        }
        return(
        <div>
            {this.checkRedirect()}
            <LoadingIndicator/>
        </div>)
    }
}