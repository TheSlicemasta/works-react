import React, {Component} from 'react';

import Worksitem from './Worksitem';
import Sort from './Sort';
import Tags from './Tags';

export default class Works extends Component {

    state = {
        //isLoaded: false,
        activeTags: '',
        works: this.props.works,
        sort: 'new',
    }

    render() {

        let worksList = this.state.works.map(function (work) {
            return <Worksitem data={work} key={work.id}/>
        });

        return (
            <div id="content">
                <div className="wrap">
                    <div className="text">
                        <h1>Мои работы</h1>
                    </div>
                    <div id="works">
                        <div className="options">
                            <Sort sortWorks={this.sortWorks.bind(this)} />
                            <Tags tags={this.tags()} onClickTag={this.clickTag.bind(this)} />
                        </div>
                        <ul>
                            {worksList}
                        </ul>
                    </div>
                </div>
                <div className="load-content" style={{display: "none"}}>
                    Загрузка...
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setState({ works: this.worksFiltered() });
    }

    tags() {
        let works = this.props.works;

        let alltags = [];
        for (var i = 0, l = works.length; i < l; i++) {
            alltags = alltags.concat( works[i].tag.replace(/\s/g, "").split(',') )
        }

        let tags = alltags.filter((v, i, a) => a.indexOf(v) === i);

        return tags.sort()
    }

    compareValues(key, order='asc') {
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    sortWorks(e) {
        this.setState({ sort: e.target.value });
    }

    clickTag(tag) {
        this.setState({ activeTags: tag });
    }

    worksFiltered() {
        let filtered = [];

        // select via tag
        if (this.state.activeTags) {
            for (var i = 0, l = this.props.works.length; i < l; i++) {
                let tags = this.props.works[i].tag.replace(/\s/g, "").split(',');

                if ( tags.indexOf(this.state.activeTags) !== -1 ) {
                    filtered.push(this.props.works[i])
                }
            }
        } else {
            filtered = this.props.works
        }

        // sorted
        switch(this.state.sort) {
            case 'old':
                filtered.sort(this.compareValues('created'))
                break;
            case 'new':
                filtered.sort(this.compareValues('created', 'desc'))
                break;
            default:
                filtered.sort(this.compareValues('title'))
        }

        return filtered
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activeTags !== prevState.activeTags || this.state.sort !== prevState.sort) {
            console.log( "activeTags: ", this.state.activeTags );
            console.log( "Sort: ", this.state.sort );
            this.setState({ works: this.worksFiltered() });
        }
    }

}
