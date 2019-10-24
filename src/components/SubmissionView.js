import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class SubmissionView extends Component{

    constructor(props){
        super(props)
        this.state = ({
            showDeleteButton: false,
            profileRedirect: false
        })
    }

    renderDeleteButton = () => {
        let submission = this.props.submission;
        if (submission.author.toLowerCase() === localStorage.getItem('user').toLowerCase() || localStorage.getItem('admin') === 'true'){
            return <p className='vote-button' onClick={() => {this.setState({showDeleteButton: true})}}>Delete </p>
        } else {
            return null
        }
    }

    deleteConfirmation = () => {
       if (this.state.showDeleteButton === true){
        return(
        <div className='delete-confirmation card'>
            <div className='delete-confirmation'>
                <p className='inline margin10'>Really Delete This Submission?</p>
                <p className='inline margin10' onClick={this.deleteSub} >Yes</p>
                <p className='inline margin10 vote-button' onClick={()=>{this.setState({showDeleteButton: false})}} >No</p>
            </div>
        </div>
        )
       }
       else {
           return null
       }
    }

    renderVoteButtons = (submission) => {
        if (!!localStorage.getItem('auth_token') && localStorage.getItem('auth_token') !== 'null'){
            let plus = <p className='vote-button' onClick={() => this.props.submitVote(submission.id,1)}>+</p>
            let minus = <p className='vote-button' onClick={() => this.props.submitVote(submission.id,-1)}>-</p>
            if (submission.vote === 1){
                plus = <p className='vote-button black' onClick={() => this.props.submitVote(submission.id,0)}>+</p>
            } else if (submission.vote === -1){
                minus = <p className='vote-button black' onClick={() => this.props.submitVote(submission.id,0)}>-</p>
            }
            return <div className='vote-button-container'>{plus} {submission.score} {minus}</div>
        } else {
            let plus = <p className='vote-button' onClick={() => window.alert('Sign in to vote!')}>+</p>
            let minus = <p className='vote-button' onClick={() => window.alert('Sign in to vote!')}>-</p>
            return <div className='vote-button-container'>{plus} {submission.score} {minus}</div>
        }
    }

    deleteSub = () => {
        console.log('Deleting...')

        fetch(`${this.props.backendURL}/submissions/${this.props.submission.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    }

    profileRedirect = () => {
        if (this.state.profileRedirect){
            return <Redirect to={`/profile/${this.props.submission.user_id}`}/>
        } else{
            return null
        }
    }

    render(){
        return (
            <li className='submssion-list-item'>
                <div className='card submission list-group-item'>
                    <div>{this.props.submission.content}</div>
                    <div className='addendum'>
                        <div><p className='inline clickable' onClick={() => this.setState({profileRedirect: true})}>{this.props.submission.author}</p> {this.renderVoteButtons(this.props.submission)}</div>
                        <div>{this.renderDeleteButton()}</div>
                    </div>
                </div>
                {this.deleteConfirmation()}
                {this.profileRedirect()}
            </li>
        )
    }
}