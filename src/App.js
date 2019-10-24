import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from './containers/NavBar'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import './App.css';
import StoryContainer from './containers/StoryContainer';
import HomeContainer from './containers/HomeContainer';
import NewStoryContainer from './containers/NewStoryContainer';
import ProfileContainer from './containers/ProfileContainer';
import SearchContainer from './containers/SearchContainer';

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: ''
        }
    }

    updateUserName = (name) => {
        this.setState( { username: name})
    }

    render(){
        return (
        <div>
            <Router>
                <NavBar updateUserName={this.updateUserName}/>
                
                <div id='Page-Body'>
                <div id='Page-Content'>
                    <Route path='/login'>
                        <SignInForm backendURL={this.props.backendURL} updateUserName={this.updateUserName}/>
                        <Link to='/signup'>Or Sign Up</Link>
                    </Route>

                    <Route path='/signup'>
                        <SignUpForm backendURL={this.props.backendURL} updateUserName={this.updateUserName}/>
                    </Route>

                    <Route path='/stories/'>
                        <StoryContainer backendURL={this.props.backendURL} data-cableApp={this.props.cableApp}/> 
                    </Route>

                    <Route path='/home'>
                        <HomeContainer backendURL={this.props.backendURL}/>
                    </Route>

                    <Route path='/new-story'>
                        <NewStoryContainer backendURL={this.props.backendURL}/>
                    </Route>

                    <Route path='/profile/'>
                        <ProfileContainer updateUserName={this.updateUserName} backendURL={this.props.backendURL}/>
                    </Route>

                    <Route path='/search'>
                        <SearchContainer backendURL={this.props.backendURL}/>
                    </Route>


                    
                    {/* <p>Story of ID: {this.state.story.id}</p>
                    <p>{this.state.story.content}</p>
                    <input type='text' value={this.state.addend} onChange={event=>{this.setState({addend: event.target.value})}}/>
                    <button onClick={this.appendButton}>Add</button> */}
                </div>
                </div>
            </Router>
        </div>
    )   }
}

export default App;
