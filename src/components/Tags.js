import React, {Component} from 'react';

export default class Tags extends Component {

    state = {
        active: ''
    }

    render() {

        let that = this;
        let tags = this.props.tags.map(function (tag) {
            return <a key={tag} data-group={tag} href={tag} className={(that.state.active === tag) ? "active" : ""} onClick={that.onSelfClickTag}>{tag}</a>
        });

        return (
            <div className="filter-options">
                Теги: {tags}
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.active !== prevState.active) {
            this.props.onClickTag( this.state.active )
        }
    }

    onSelfClickTag = (e) => {
        e.preventDefault();

        let tag = e.target.dataset.group;

        if ( this.state.active === tag ) {
            this.setState({ active: "" })
        } else {
            this.setState({ active: tag })
        }

    }
}