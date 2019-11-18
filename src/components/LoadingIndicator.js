import React, {Component} from 'react'

export default class LoadingIndicator extends Component{
    constructor(){
        super()
        this.state = {display: 'Loading', counter: 0}
    }

    componentDidMount(){
        setInterval(this.updateState,250)
    }

    updateState = () => {
        if (this.state.display !== 'Loading...'){
            this.setState(prevState => {return {display: `${prevState.display}.`}})
        } else {
            this.setState(prevState => {return {display: 'Loading', counter: ++prevState.counter}})        
        }
    }

    render(){
        return (
        <div><p>{this.state.display}</p>
            {(this.state.counter >= 3? <p>The Heroku Server appears to be asleep, they will take about 10 seconds to wake up!</p> : null)}
            {(this.state.counter >= 5? <p>In the meantime, here are some terrible jokes:</p> : null)}
            {(this.state.counter >= 7? <p>What's the best time to see your dentist?</p> : null)}
            {(this.state.counter >= 9? <p>Tooth Hurt-y</p> : null)}
            {(this.state.counter >= 11? <p>Where do you learn to make icecream?</p> : null)}
            {(this.state.counter >= 13? <p>Sundae School</p> : null)}
            {(this.state.counter >= 15? <p>What do you call cheese that isn't yours?</p> : null)}
            {(this.state.counter >= 17? <p>Nacho Cheese</p> : null)}
            {(this.state.counter >= 19? <p>Why shouldn't you play poker in the jungle?</p> : null)}
            {(this.state.counter >= 21? <p>Too many Cheetahs</p> : null)}


        </div>)
    }
}