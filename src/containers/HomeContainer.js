import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import StoryCard from '../components/StoryCard'

export default class HomeContainer extends Component{
    constructor(props){
         super(props)
         this.state = {
             stories: [],
             loaded: false,
             toNewStory: false
         }
    }

    componentDidMount(){
        let token = 'null'
        if(!!localStorage.getItem('auth_token')){
            token = localStorage.getItem('auth_token')
        }
        fetch(`${this.props.backendURL}/home/stories`, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => this.setState({stories: json, loaded: true}))
    } 

    renderStoriesList = () => {
        return this.state.stories.map(story => {
            return <li key={`story${story.id}`}><StoryCard story={story} /></li>
        })
    }

    renderNewStoryButton = () => {
        if (!localStorage.getItem('auth_token') || localStorage.getItem('auth_token') === 'null'){
            return null
        } 
        if (!this.state.toNewStory){
            return <button className="btn btn-success" onClick={()=>{this.setState({toNewStory:true})}}>+ New Story</button>
        }
        if (this.state.toNewStory){
            return <Redirect to='/new-story'/>
        }
    }

    render(){
        return(

            this.state.loaded? 
            <div>
                {this.renderNewStoryButton()}
                <ul className='non-flush-card-list'>
                    {this.renderStoriesList()}
                </ul>
            </div>
            : <p>Loading Stories</p> 

        )
    }

     
    
}