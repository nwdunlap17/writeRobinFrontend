import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class SearchButton extends Component {
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
                <p className='profileButton' onClick={this.beginRedirect}>Search</p>
                {this.state.redirect? 
                    <div>
                        <Redirect to={`/search`}/> 
                        {this.endRedirect()}
                    </div> 
                        : null
                    }
            </div>
        )
    }
}