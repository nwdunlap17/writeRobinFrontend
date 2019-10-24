import React, {Component} from 'react'
import SearchBar from '../components/SearchBar'

export default class FriendSearch extends Component {
    constructor(props){
        super(props)
        this.state = {
            results: [],
            selected: []
        }
    }

    sendSearch = (term) => {
        fetch(`${this.props.backendURL}/users/friend-search`,{
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                search: term
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log('search',term)
            console.log('results',json)
            this.setState({results: json.results})
        })
    }

    renderResults = () => {
        let selectedResults = this.state.selected.map(friend => {
            return friend.id
        })

        let displayResults = this.state.results.filter(friend => {
            if (selectedResults.includes(friend.id)){
                return false
            } else {return true}
        })
        
        return displayResults.map(friend => {
            return (
            <li className='card name-card'>
                <div className='name-card-interior'>
                    <p className='name-card-button' onClick={() => {this.addResult(friend)}}> + </p>
                    <p className='name-card-text' >{friend.username}</p>
                </div>
            </li>)
        })
    }

    async addResult (afriend) {
        let foo = await this.setState(prevState => {return ({selected: [...prevState.selected,afriend]})})
        this.props.updateInvites(this.state.selected.map(friend=>{return friend.id}))
    }

    async removeResult (friendID){
        let foo = await this.setState(prevState => {
            let stillSelected = prevState.selected.filter(friend => {
                return friend.id !== friendID
            })
            return {selected: stillSelected}
        })
        this.props.updateInvites(this.state.selected.map(friend=>{return friend.id}))
    }

    


    renderSelected = () => {
        let selectedResults = this.state.selected.map(friend => {
            return(<li className='card inline margin10'>
                <div className='name-card-interior'>
                <p className='name-card-button' onClick={()=>{this.removeResult(friend.id)}}>X </p>
                <p className='name-card-text'>{friend.username}</p>
                
                </div>
            </li>)
        })
        return selectedResults
    }

    render(){
        return (
            <div>
                <ul className='name-card-list'>
                {this.renderSelected()}
                </ul>
                <SearchBar submit={this.sendSearch}/>
                <ul className='name-card-list'>
                {this.renderResults()}
                </ul>
            </div>
        )
    }
}