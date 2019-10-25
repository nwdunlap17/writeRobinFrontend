import React, {Component} from 'react'
import SearchBar from '../components/SearchBar'
import StoryCard from '../components/StoryCard'
import {Redirect} from 'react-router-dom'

export default class SearchContainer extends Component {
    constructor(props){
        super(props)
        this.state = ({
            category: 'story',
            storyCheckBox: true,
            userCheckBox: false,
            search: '',
            results: [],
            resultCategory: '',
            redirect: null
        })
    }

    updateSearchTerm = (term) => {
        this.setState({search: term})
        if (term !== ''){
            console.log('send term', term)
            // while (this.state.search === ''){}
            this.sendSearch()
        }
    }


    sendSearch(){
        console.log('send search', this.state)
        fetch(`${this.props.backendURL}/search`,{
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                search: this.state.search,
                category: this.state.category
            })
        })
        .then(res => res.json())
        .then(json => this.setState({
            results: json,
            resultCategory: this.state.category
        }))
        .then(()=>console.log(this.state.results))

    }

    renderResults = () => {
        if (this.state.resultCategory === 'story'){
            return(
            <ul>
                {this.state.results.map(story => {
                    return <li key={`story${story.id}`}><StoryCard story={story} /></li>
                })}
            </ul>
            )
        }
        if (this.state.resultCategory === 'user'){
            return (
                <ul className='name-card-list'>
            {this.state.results.map(user => {
                return <li key={`user${user.id}`}>
                    <div className='name-card card clickable' onClick={() => this.setState({redirect: `/profile/${user.id}`})}>
                        <p className='name-card-text name-card-interior'>{user.username}</p>
                    </div>
                    </li>
            })}
            </ul>
            )
        }
    }

    render(){
        return(
            <div>
                <form>
                    <SearchBar submit={this.updateSearchTerm}/>
                    {this.checkboxForm()}
                </form>
                
                    {this.renderResults()}
                
                {this.state.redirect !== null? <Redirect to={this.state.redirect}/>:null}
            </div>
        )
    }


    checkboxForm = () => {
        return (<div className='center'>
                    <div className="radio">
                    <label>
                        <input class="form-check-input" type="radio" checked={this.state.storyCheckBox} onChange={(e) => this.setState({storyCheckBox: e.target.checked, userCheckBox: !e.target.checked, category: 'story'})} />
                        Stories
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input class="form-check-input" type="radio" checked={this.state.userCheckBox} onChange={(e) => this.setState({userCheckBox: e.target.checked, storyCheckBox: !e.target.checked, category: 'user'})} />
                        Users
                    </label>
                     </div>
                </div>
                )
    }

}