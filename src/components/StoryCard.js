import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class StoryCard extends Component{
    constructor(props){
        super(props)
        this.state = {redirect: false}
    }

    listGenreCards = () => {
        return this.props.story.genres.map(genre => {
            return <div className='card genre-card-exterior'><div className='story-card-genre-card-interior'><p className='genre-card-text'>{genre.name}</p></div></div>
        })
    }

    render(){
        console.log(this.props.story)
        return ( 
        <div className='card story-list-item' onClick={()=>{this.setState({redirect: true})}}>
            <div className='story-card-top-line'>
                <h6 className='story-card-title'>{this.props.story.title}</h6>
                {this.listGenreCards()}
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