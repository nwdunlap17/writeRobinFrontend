import React, {Component} from 'react'
import LogoutButton from '../components/LogoutButton'
import {Redirect} from 'react-router-dom'

export default class ProfileContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            id: -1,
            friends: [],
            isFriends: null,
            loaded: false,
            addClicked: false,
            redirect: false
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
                this.setState({username: json.username, id: json.id,friends: json.friends, loaded: true})
            }   else {
                this.setState({username: json.username, id: json.id,isFriends: json.friended, loaded: true})
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
                    (this.state.isFriends? 
                        <button className='btn btn-danger' onClick={this.removeFriend}>Unfriend</button>
                    :
                        (this.state.addClicked == false?
                            <button className='btn btn-success' onClick={this.addFriend}>Add Friend</button>
                        :
                            <button className='btn btn-light'>Pending</button>))
                :
                    null
                }
            </div>
        )
        
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


    render(){
        if (this.state.loaded){
            return(
                <div>
                    {this.checkRedirect()}
                    <h3>{this.state.username}</h3>
                    {this.renderWhosePage()}
                    <p>Future Site of Profile Page</p>
                </div>
            )
        }
        return(
        <div>
            {this.checkRedirect()}
            <p>Loading...</p>
        </div>)
    }
}