import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class MessageCard extends Component{
    constructor(props){
        super(props)
        this.state = {redirect: 'null'}
    }

    createResponseButton(){
        if (this.props.message.invite){
            //Confirm Invite
        } else if (this.props.message.follow){
            //Story
            return <button onClick={() => this.setState({redirect: `/stories/${this.props.message.sender_id}`})}>Read It</button>
        } else {
            //Message
            return <button onClick={() => this.setState({redirect: `/profile/${this.props.message.sender_id}`})}>Reply</button>
        }
    }

    render(){
        return(
            <div className='card message-card' key={`Message-${this.props.message.id}`}>
                <div className='message-card-interior'>
                    <p className='message-content inline'>{this.props.message.content}</p>
                    {this.createResponseButton()}
                </div>
                <p className='message-addendum'> {this.props.message.sender}</p>
                {this.state.redirect !== 'null'? <Redirect to={this.state.redirect}/>:null}
            </div>
        )
    }
}