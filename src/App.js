import React, {Component} from 'react';
import axios from "axios";
import moment from "moment";
import "./css/responsivity.css";
import './css/default-theme.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {events: null, renderList: false,  limit:8, renderMoreBtn:true};

    }

    componentWillMount() {
        let token = (this.props.gitHubToken)?"?access_token="+this.props.gitHubToken:"";
        axios.get("https://api.github.com/users/" + this.props.username + "/events"+token)
            .then((events) => this.setState({events: events.data, renderList: true}))
            .catch((err) => console.log(err.response.data));

    }

    lazyLoad(e) {
        e.preventDefault();
        let limit = this.state.limit + 5;
        if(limit > this.state.events.length){
            limit = this.state.events.length;
            this.setState({renderMoreBtn:false});
        }
        this.setState({limit:limit});
    }

    close(e){
        e.preventDefault();
        this.setState({limit:5, renderMoreBtn:true});
    }

    render() {
        let rows = [];
        let moreBtn = [];
        if (this.state.renderList) {
            for (let i = 0; i < this.state.limit ; i++) {
                rows.push(
                    <div key={i} className="git-section git-group">
                        <div className="git-col git-span_4_of_12 git-left">
                            <span className="git-left-text">
                                {this.state.events[i].actor.display_login}
                            </span>

                        </div>
                        <div className="git-col git-span_8_of_12 git-middle">
                            <span className="git-type">
                                <a className="git-link" href={"https://github.com/"+this.state.events[i].repo.name} target="_blank">
                                    {this.state.events[i].type.substring(0,this.state.events[i].type.length-5)}
                                </a> -
                                <span className="git-time">{moment(this.state.events[i].created_at).fromNow()}</span>
                            </span><br/>
                            <span>
                                [ {this.state.events[i].repo.name} ]
                            </span>
                        </div>
                    </div>
                );
            }
        }
        if (this.state.renderMoreBtn)
            moreBtn.push(
                <a key={0} href="#" onClick={(e) => this.lazyLoad(e)}>
                    <div className="git-centered git-bottom-btn">More Events</div>
                </a>
            );
        if(! this.state.renderMoreBtn)
            moreBtn.push(
                <a key={0} href="#" onClick={(e) => this.close(e)}>
                    <div className="git-centered git-bottom-btn">Less Events</div>
                </a>
            );

        return (
            <div className="git-container">
                <div className="git-group git-centered git-title">
                    Recent GitHub Activity
                </div>
                {rows}
                {moreBtn}

            </div>
        );
    }
}

