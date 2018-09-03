import React, {Component} from 'react';

export default class Worksitem extends Component {
    render() {

        let work = this.props.data;

        function createMarkup(markup) {
            return {__html: markup};
        }

        let link = (work.link) &&
            (<p className="link">
                <a href={work.link} target="_blank">{work.link}</a>
            </p>);

        let screen = (work.screen) &&
            (<p className="screen">
                {
                    work.screen.map(function (screen, index) {
                        return <a href={screen} key={screen} className={(index > 0) ? "hide" : null}>Макет ({work.screen.length})</a>
                    })
                }
            </p>);

        return (
            <li className={work.studio ? "studio workitem" : "workitem"}>
                <div className="item">
                    {/*<img className="thumb" width="470" height="470" src={"http://xn--d1acnqm9f.xn--p1ai/" + work.image} alt={work.title}/>*/}
                    <img className="thumb" width="470" height="470" src={"http://xn--d1acnqm9f.xn--p1ai/" + work.image} alt={work.title}/>
                    <div className="overlay">
                        <h3>{work.title}</h3>
                        <p className="comment" dangerouslySetInnerHTML={createMarkup(work.comment)} />
                        { link }
                        { screen }
                        <p className="tag">{work.tag}, {work.created}</p>
                    </div>
                </div>
            </li>
        );
    }
}