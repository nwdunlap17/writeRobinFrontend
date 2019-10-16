import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class StoryCard extends Component{
    
    render(){
        return <Link to={`/stories/${this.props.story.id}`}>{this.props.story.title}</Link>
    }
}