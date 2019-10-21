import React, {PureComponent} from 'react'

export default class Canon extends PureComponent {

    renderCanonSubmissions = () => {
        let submissions = this.props.story.submissions.filter( submission => {
            return submission.canon
        })
        submissions = submissions.sort(function(a,b){
            return a.position - b.position
        })
        // debugger
        return submissions.map(submission => {
            return(<div className='list-group-item submission' key={`canon${submission.id}`}>
                <div>{submission.content}</div>
                <div className='addendum'>
                    <div>{submission.author} {this.renderVoteButtons(submission)}</div>
                </div>
            
            </div>)
        })
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
            return <div className='vote-button'>{plus} {submission.score} {minus}</div>
        } else {
            let plus = <p className='vote-button' onClick={() => window.alert('Sign in to vote!')}>+</p>
            let minus = <p className='vote-button' onClick={() => window.alert('Sign in to vote!')}>-</p>
            return <div className='vote-button-container'>{plus} {submission.score} {minus}</div>
        }  
    }

    render(){
        return(
            <div className='card submission'>
                <ul className='list-group list-group-flush'>
                    {this.renderCanonSubmissions()}
                </ul>
            </div>
        )
    }
}