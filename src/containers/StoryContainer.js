import React, {Component} from 'react'
import Canon from '../components/Canon'
import SubmissionContainer from './SubmissionContainer'
import StorySocket from '../components/StorySocket'


//Takes in storyID as a prop
export default class StoryContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            story: null,
            loaded: false,
            rejection: false,
        }
        this.getInitialData()
    }

    getInitialData=()=>{
        let path = window.location.pathname
        let storyID = path.split('stories/')[1]
        console.log('brackend', this.props)
        fetch(`${this.props.backendURL}/view-story/${storyID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            if (!!json.message && json.message == 'denied'){
                this.setState({rejection: true})
                return
            }
            console.log('story',json);
            this.setState({story: json, loaded:true});})
        // .then(() => console.log('s2',this.state.story))
        
    }

    updateStoryFromSocket = updatedStory => {
        console.log('updating story from socket', updatedStory)
        this.setState({story: updatedStory})
    }

    AddSubmissionFromSocket = (submission,author) => {
        let newSubmission = {...submission,author:author}

        this.setState(prevState => {
            prevState.story.submissions.push(newSubmission)
            return {story: {...prevState.story, submissions: prevState.story.submissions }}
        }
        )
    }

    RemoveSubmissionFromSocket = submissionID => {
        this.setState(prevState => {
            let remainingSubs = prevState.story.submissions.filter(sub => {
                return sub.id !== parseInt(submissionID)
            })
            let newStory = {...prevState.story, submissions: remainingSubs};
            return ({story: newStory})
        })
    }

    submitVote = (submissionID, rating) => {
        fetch(`${this.props.backendURL}/submission-vote`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                value: rating,
                submission_id: submissionID
            })
        })
        this.setState(prevState => {
            let newSubs = prevState.story.submissions.map(sub => {
                if (sub.id === submissionID){
                    sub.vote = rating
                }
                return sub
            })
            return {story: {...prevState.story, submissions: newSubs}}
        })
    }

    keepTrackOfLength = () => {
        let remaining = this.state.story.length-this.state.story.current_length
        if (remaining === 1){
            return <h6>How does it end?</h6>
        } else {
            if (remaining > 1){
                return <h6>What happens next?</h6>
            }
            else {return null} //Story is over

        }

        
    }


    listGenreCards = () => {
        return this.state.story.genres.map(genre => {
            return <div className='card genre-card-exterior'><div className='story-card-genre-card-interior'><p className='genre-card-text'>{genre.name}</p></div></div>
        })
    }

    render(){
        return(
        <div>
            {(this.state.loaded && !this.state.rejection)? 
                <div>
                    <h3>{this.state.story.title}</h3>
                    <div className='story-card-top-line'>
                        {this.listGenreCards()}
                    </div>
                    <p>{this.state.story.current_length}/{this.state.story.length}</p>
                    <Canon story={this.state.story} submitVote={this.submitVote}/>
                    {/* <VoteButtons/> */}
                    {this.keepTrackOfLength()}
                    <SubmissionContainer backendURL={this.props.backendURL} story={this.state.story} submitVote={this.submitVote}/>
                    <StorySocket 
                        backendURL={this.props.backendURL}
                        storyID = {this.state.story.id}
                        data-cableApp={this.props['data-cableApp']} 
                        updateStory={this.updateStoryFromSocket} 
                        addSubmission={this.AddSubmissionFromSocket}
                        updateAudience={this.updateAudience}
                        removeSubmission = {this.RemoveSubmissionFromSocket}
                    />
                </div>                
            : 
                this.state.loaded? 
                    <p>You don't have access to this story!</p>
                :
                    <p>Loading Story...</p>
            }
        </div>)
    }
}