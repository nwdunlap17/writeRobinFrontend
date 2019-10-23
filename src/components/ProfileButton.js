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
                <p className='profileButton' onClick={this.beginRedirect}>Profile</p>
                {this.state.redirect? 
                    <div>
                        <Redirect to={`/profile/${localStorage.getItem('user_id')}`}/> 
                        {this.endRedirect()}
                    </div> 
                        : null
                    }
            </div>
        )
    }
}