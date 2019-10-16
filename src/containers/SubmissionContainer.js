import React, {Component} from 'react'
import SubmissionView from '../components/SubmissionView'

export default class SubmissionContainer extends Component{
    constructor(props){
        super(props)
        this.state = {draft: '', characters: 0}
    }

    renderPendingSubmissions = () => {
        let submissions = this.props.story.submissions.filter( submission => {
            return !submission.canon
        })  
        return submissions.map(submission => {
            return(<SubmissionView key={`sub${submission.id}`} submitVote={this.props.submitVote} submission={submission} backendURL={this.props.backendURL}/>)
        })
    }

    addSubmission = event => {
        event.preventDefault()
        if (this.state.characters > 400){
            window.alert('Submissions must be within 400 characters.')
            return 
        }
        if (this.state.characters < 20){
            window.alert('Submissions must have more than 20 characters.')
            return 
        }
        fetch(this.props.backendURL+'/submissions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                submission: {
                    content: this.state.draft,
                    story_id: this.props.story.id
                }
            })
        })
        .then(()=>{this.setState({draft: ''})})
    }

    render(){
        return (
            <div>
                <ul className='pending-submission-list'>
                    {this.renderPendingSubmissions()}
                </ul>
                <form onSubmit={this.addSubmission}>
                    <textarea className='text-area' value={this.state.draft} onChange={event => this.setState({draft: event.target.value, characters: event.target.value.length})}/>
                    <p>{400-this.state.characters}/400</p>
                    <input type='submit'/>
                </form>
            </div>
            )
    }
}