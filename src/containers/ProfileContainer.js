import React, {Component} from 'react'
import LogoutButton from '../components/LogoutButton'

export default class ProfileContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            id: -1,
            friends: [],
            isFriends: null,
            loaded: false,
            addClicked: false
        }
        this.getUserData()
    }

    getUserData(){
        let path = window.location.pathname
        let userID = path.split('profile/')[1]
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
                <LogoutButton updateUserName={this.props.updateUserName}/>
            </div>
        )
    }

    renderTheirPage = () => {
        return(
            <div>
                <p>Their Page</p>
                {(!!localStorage.getItem('user') && localStorage.getItem('user') !== 'null')?
                    (this.state.isFriends? 
                        <button onClick={this.removeFriend}>Unfriend</button>
                    :
                        (this.state.addClicked == false?
                            <button onClick={this.addFriend}>Add Friend</button>
                        :
                            <button>Pending</button>))
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
                    <p>Future Site of Profile Page</p>
                    <h3>{this.state.username}</h3>
                    {this.renderWhosePage()}
                </div>
            )
        }
        return(
        <div>
            <p>Loading...</p>
        </div>)
    }
}