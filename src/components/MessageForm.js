import React, {Component} from 'react'

export default class MessageForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            content: ''
        }
    }

    sendMessage = () => {
        fetch(`${this.props.backendURL}/users/${this.props.recipient}/send-message`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: {
                content: this.state.content
            }
        })
    }

    render(){
        return (        
        <div>
            <textarea className='text-area' value={this.state.draft} onChange={event => this.setState({content: event.target.value})}/>
            <button className='btn btn-light' onClick={this.sendMessage}>Send</button>
        </div>
        )
    }
}