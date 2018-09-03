import React, {Component} from 'react';

import './assets/css/style.css';

import Works from './components/Works';

import data from './works/works.json';

export default class App extends Component {
    render() {
        return (
            <Works works={data}/>
        );
    }
}