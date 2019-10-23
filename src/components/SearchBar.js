import React, {Component} from 'react'

export default class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            term: ''
        }
    }

    buttonClick = event => {
        event.preventDefault()
        this.props.submit(this.state.term)
    }

    render(){
        return (
        <form>
            <input type='text' value={this.state.term} onChange={event=>{this.setState({term: event.target.value})}}/>
            <button onClick={this.buttonClick}>Search</button>
        </form>
        )
    }
}