import React, {Component} from 'react'
import MessageCard from '../components/MessageCard'
import LoadingIndicator from '../components/LoadingIndicator'

export default class MessagesContainer extends Component {
    constructor(props){
        super(props)
        this.state = { messages: [], loaded: false, viewMessage: 'null'}
    }

    componentDidMount(){
        let token = 'null'
        if (!!localStorage.getItem('auth_token')){
            token = localStorage.getItem('auth_token')
        }
        
        fetch(`${this.props.backendURL}/messages`, {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log('received messages')
            this.setState({messages: json, loaded: true})
        })
    } 

    showMessageList = () => {
        console.log('messages list', this.state.messages)
        return this.state.messages.map(mess => {return <MessageCard message={mess}/>})
    }

    render(){
        return (
            this.state.loaded?
                this.state.viewMessage === 'null'?
                <div>
                    <p>Messages Container</p>
                    {this.showMessageList()}
                </div>
                :
                <p>Lo, a message!</p>
            :
            <LoadingIndicator/> 
        )
    }
}