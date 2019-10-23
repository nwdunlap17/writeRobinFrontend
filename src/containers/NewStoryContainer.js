import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import FriendSearch from './FriendSearch'

export default class NewStoryContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: 'Title',
            content: '',
            length: 20,
            redirect: null,
            genres: [],
            storyGenres: [],
            private: false
        }
        this.getGenreList()
    }

    getGenreList = () => {
        console.log('getGenreList')
        fetch(`${this.props.backendURL}/stories/genres`)
        .then(res => res.json())
        .then(json => {
            this.setState({genres: json.genres})
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        if(this.state.title == 'Title' || this.state.title.length < 2){
            window.alert('Plese give the story a title.')
            return
        }

        if(this.state.title.length > 50){
            window.alert('Titles can be no longer than 50 characters.')
            return
        }

        if(this.state.content.length > 600){
            window.alert('Intro must be less than 600 characters.')
            return
        }
        if(this.state.content.length < 3){
            window.alert('Stories must have an intro.')
            return
        }
        
        if (!'-".!?)'.includes(this.state.content[this.state.content.length-1]) || !this.state.content.includes(' ')){
            window.alert("Your submission doesn't look like a sentence. Please check your grammer!")
            return 
        }

        let genreIDs = this.state.storyGenres.map(genre => {
            return genre.id
        })

        fetch(`${this.props.backendURL}/stories`,{
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                story: {
                    title: this.state.title,
                    length: this.state.length,
                    genres: genreIDs
                },
                content: this.state.content
            })
        })
        .then(res => res.json())
        .then(json => {this.setState({redirect: json.story_id})})

    } 

    createGenreOptions = () => {
        console.log('getGenreOptions')

        let takenNums = this.state.storyGenres.map(genre => {
            return genre.id
        })

        let visibleGenres = this.state.genres.filter(genre => {
            return !takenNums.includes(genre.id)
        })
        return visibleGenres.map(genre => {
            return <option key={JSON.stringify(genre)} value={JSON.stringify(genre)}>{genre.name}</option>
        })
    }

    addGenreToStory = (event) => {
        let genre = JSON.parse(event.target.value)
        this.setState(prevState => { 
            let setGenres = prevState.storyGenres;
            setGenres.push(genre)
            return {storyGenres: setGenres}})
        console.log('s', this.state.storyGenres)
    }

    removeStoryGenre = (event) => {
        let id = parseInt(event.target.getAttribute('value'))
        this.setState(prevState => {
            let newStoryGenres = prevState.storyGenres.filter(genre => {
                return genre.id !== id
            })
            return {storyGenres: newStoryGenres}
        })
    }

    listStoryGenres = () => {
        return this.state.storyGenres.map(genre => {
            return <div className='card inline' key={`story genre ${genre.id}`}><div className='genre-card-interior'>
                        <p className='genre-card-cancel-button' value={genre.id} onClick={this.removeStoryGenre}>X </p>
                        <p className='genre-card-text'>{genre.name}</p>
                    </div></div>
        })
    }

    render(){
        return( 
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div>
                        <input type='text' value={this.state.title} onChange={event => this.setState({title: event.target.value})}/>
                        
                        <label>Max Length</label>
                        <input type='number' value={this.state.length} onChange={event => this.setState({length: event.target.value})}/>
                    </div>

                    <label>Genres</label>
                    <select onChange={this.addGenreToStory}>
                        <option>{`<Add Genre>`}</option>
                        {this.createGenreOptions()}
                    </select>
                        {this.listStoryGenres()}
                    
                    <p>{600-this.state.content.length}/600</p>
                    <textarea className='text-area' value={this.state.content} onChange={event => this.setState({content: event.target.value})}/>
                    <input type='submit'/>
                </form>

                <div>
                    <label>Private Story? </label>
                    <input type="checkbox" value="" onChange={event => {this.setState(prev => {return {private: !prev.private}})}}></input>
                </div>

                {this.state.private?
                <FriendSearch backendURL={this.props.backendURL}/>
                :
                null
                }


                {this.state.redirect? <Redirect to={`/stories/${this.state.redirect}`}/> : null}
            </div>

        )
    }
}