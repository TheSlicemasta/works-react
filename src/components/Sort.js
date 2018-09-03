import React, {Component} from 'react';

export default class Sort extends Component {
    render() {
        return (
            <div className="sort-options">
                Сортировать:&nbsp;
                <select onChange={this.props.sortWorks} defaultValue="new">
                    <option value="new">новые</option>
                    <option value="old">старые</option>
                    <option value="title">по названию</option>
                </select>
            </div>
        );
    }
}