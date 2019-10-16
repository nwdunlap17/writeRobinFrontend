import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class HomeButton extends Component {


    render(){
        return (<Link className='black' to={'/home'}>Home</Link>)
    }
}