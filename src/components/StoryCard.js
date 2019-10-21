import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class StoryCard extends Component{
    constructor(props){
        super(props)
        this.state = {redirect: false}
    }

    render(){
        console.log(this.props.story)
        return ( 
        <div className='card story-list-item' onClick={()=>{this.setState({redirect: true})}}>
            <div>
                <h6 className='inline'>{this.props.story.title}</h6>
            </div>
            <div>
                <p className='inline'>Score: {this.props.story.score}</p>
                <p className='inline'>Length: {this.props.story.current_length}/{this.props.story.length}</p>
            </div>
            {this.state.redirect? <Redirect to={`/stories/${this.props.story.id}`}/> : null}
        </div>
        )
    }
}