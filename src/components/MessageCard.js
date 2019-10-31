import React, {Component} from 'react'


export default class MessageCard extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='card'>
                <p>{this.props.message.content}</p>
                <p>{this.props.message.sender}</p>
            </div>
        )
    }
}