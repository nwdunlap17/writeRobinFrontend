import React, {Component} from 'react'

const LoadingHOC = wrappedComponent => {
    return class LoadingHOC extends Component{

        hasLoaded = () => {
            this.props.loaded
        }

        render(){
            return(
                (this.hasLoaded? <wrappedComponent {...this.props}/> : 'Loading')
            )
        }
    }
}