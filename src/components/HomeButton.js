import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class HomeButton extends Component {


    render(){
        return (<Link to={'/home'}>Home</Link>)
    }
}