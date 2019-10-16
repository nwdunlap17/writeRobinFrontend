import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class NewStoryContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: 'Title',
            content: '',
            length: 20,
            redirect: null
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        if(this.state.title == 'Title' || this.state.title.length < 2){
            window.alert('Plese give the story a title.')
            return
        }

        if(this.state.content.length > 600){
            window.alert('Intro must be less than 600 characters.')
            return
        }
        if(this.state.content.length < 3){
            window.alert('Stories must have an intro.')
            return
        }

        fetch(`${this.props.backendURL}/stories`,{
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                story: {
                    title: this.state.title,
                },
                content: this.state.content
            })
        })
        .then(res => res.json())
        .then(json => {this.setState({redirect: json.story_id})})

    } 

    render(){
        return( 
            <form onSubmit={this.handleSubmit}>
                <input type='text' value={this.state.title} onChange={event => this.setState({title: event.target.value})}/>
                <label>Max Length</label>
                <input type='number' value={this.state.length} onChange={event => this.setState({length: event.target.value})}/>
                <p>{600-this.state.content.length}/600</p>
                <textarea className='text-area' value={this.state.content} onChange={event => this.setState({content: event.target.value})}/>
                <input type='submit'/>
                {this.state.redirect? <Redirect to={`/stories/${this.state.redirect}`}/> : null}
            </form>

        )
    }
}