import React, {Component} from 'react'
import SubmissionView from '../components/SubmissionView'

export default class SubmissionContainer extends Component{
    constructor(props){
        super(props)
        this.state = {draft: '', characters: 0, showSubForm: false}
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
        if (this.state.characters > this.charLimit()){
            window.alert(`Snippets must be within ${this.charLimit()} characters.`)
            return 
        }
        if (this.state.characters < 20){
            window.alert('Snippets must have more than 20 characters.')
            return 
        }
        if (!'-".!?)'.includes(this.state.draft[this.state.draft.length-1]) || !this.state.draft.includes(' ')){
            window.alert("Your snippet doesn't look like a paragraph. Please check your grammer!")
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
        .then(()=>{this.setState({draft: '', characters: 0 })})
        
    }

    renderSubmissionForm = () => {
        if (this.props.story.length - this.props.story.current_length > 0 || this.props.story.length === 0){
            if (!!localStorage.getItem('auth_token') && localStorage.getItem('auth_token') !== 'null'){
            if(this.state.showSubForm == true){
                return(<form onSubmit={this.addSubmission} className='submssion-list-item'>
                        <textarea className='text-area' value={this.state.draft} onChange={event => this.setState({draft: event.target.value, characters: event.target.value.length})}/>
                        <p className='no-margin' >{this.charLimit()-this.state.characters}/{this.charLimit()}</p>
                        <button type='submit' className='btn btn-success'>New Snippet</button>
                       </form>)
            } else {
                return (<button className='btn btn-light submssion-list-item' onClick={() => this.setState({showSubForm:true})}>Write New Snippet</button>)
            }
        } else {
            return null
            }
        } else {
            return null
        }
    }

    charLimit = () => {
        if (this.props.story.length - this.props.story.current_length === 1){
            return 600
        } else{
            return 400
        }
    }

    render(){
        return (
            <div>
                {this.renderSubmissionForm()}
                <ul className='non-flush-card-list'>
                    {this.renderPendingSubmissions()}
                </ul>
            </div>
            )
    }
}