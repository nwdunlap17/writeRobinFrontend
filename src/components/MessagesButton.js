import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class ProfileButton extends Component {
    constructor(props){
        super(props)
        this.state = { redirect: false }
    }

    beginRedirect = () => {
        this.setState({redirect: true})
    }

    endRedirect = () => {
        this.setState({redirect:false})
    }

    render(){
        return (
            <div>
                <p className='messagesButton' onClick={this.beginRedirect}>Messages</p>
                {this.state.redirect? 
                    <div>
                        <Redirect to={`/messages`}/> 
                        {this.endRedirect()}
                    </div> 
                        : null
                    }
            </div>
        )
    }
}