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
            loaded: false
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
            console.log('story',json);
            this.setState({story: json, loaded:true});})
        // .then(() => console.log('s2',this.state.story))
        
    }

    updateStoryFromSocket = updatedStory => {
        console.log('updating story from socket', updatedStory)
        this.setState({story: updatedStory})
    }

    AddSubmissionFromSocket = newSubmission => {
        
        this.setState(prevState => {
            prevState.story.submissions.push(newSubmission)
            return {story: {...prevState.story, submissions: prevState.story.submissions }}
        }
        )
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

    render(){
        return(
        <div>

            {this.state.loaded? <div>
                <h3>{this.state.story.title}</h3>
                <Canon story={this.state.story} submitVote={this.submitVote}/>
                {/* <VoteButtons/> */}
                <h6>Pending</h6>
                <SubmissionContainer backendURL={this.props.backendURL} story={this.state.story} submitVote={this.submitVote}/>
                <StorySocket 
                    backendURL={this.props.backendURL}
                    storyID = {this.state.story.id}
                    data-cableApp={this.props['data-cableApp']} 
                    updateStory={this.updateStoryFromSocket} 
                    addSubmission={this.AddSubmissionFromSocket}
                    updateAudience={this.updateAudience}
                />
            </div>                
            : null}
        </div>)
    }
}