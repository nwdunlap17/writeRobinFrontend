import React, {Component} from 'react'

export default class SubmissionView extends Component{


    renderVoteButtons = (submission) => {
        let plus = <p className='vote-button' onClick={() => this.props.submitVote(submission.id,1)}>+</p>
        let minus = <p className='vote-button' onClick={() => this.props.submitVote(submission.id,-1)}>-</p>
        if (submission.vote === 1){
            plus = <p className='vote-button black' onClick={() => this.props.submitVote(submission.id,0)}>+</p>
        } else if (submission.vote === -1){
            minus = <p className='vote-button black' onClick={() => this.props.submitVote(submission.id,0)}>-</p>
        }
        return <div className='vote-button'>{plus} {minus}</div>
    }

    render(){
        return (
            <li className='submssion-list-item'>
            <div className='card submission list-group-item'>
                <div>{this.props.submission.content}</div>
                <div className='addendum'>
                    {this.props.submission.author} {this.renderVoteButtons(this.props.submission)}
                </div>
            </div>
            </li>
        )
    }
}