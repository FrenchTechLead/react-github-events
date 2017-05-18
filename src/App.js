import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "font-awesome/css/font-awesome.min.css";
import FontAwesome from "react-fontawesome";
import axios from "axios";
import moment from "moment";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {events: null, render: false, limit: 0};

    }

    componentWillMount() {
        axios.get("https://api.github.com/users/" + this.props.username + "/events")
            .then((events) => this.setState({events: events.data, render: true}))
            .catch((err) => console.log(err));
        this.setState({limit:this.state.events.length})
    }

    lazyLoad() {
        let x = this.state.limit - 5;
        if (x <= 0)
            x = 0;
        this.setState({limit: x});
    }

    render() {
        let rows = [];
        if (this.state.render) {
            for (let i = 0; i < this.state.events.length - this.state.limit; i++) {
                rows.push(
                    <a key={i} href={"https://github.com/"+this.state.events[i].repo.name} target="_blank" className="list-group-item">
                        <h5 className="list-group-item-heading">
                            <div className="row">
                                <div className="col-xs-2">
                                    <img src={this.state.events[i].actor.avatar_url} width={30}/>
                                </div>
                                <div className="col-xs-8">
                                    <span className="eventType">
                                        {this.state.events[i].type.substring(0, this.state.events[i].type.length - 5)}
                                    </span><br/>
                                    <span className="eventRepository">
                                        [ {this.state.events[i].repo.name} ]
                                    </span>
                                    <br/>
                                </div>
                                <div className="col-xs-2 timeBadgeContainer">
                                    <span className="badge timeBadge">
                                        {moment( this.state.events[i].created_at).fromNow()}
                                    </span>
                                </div>
                            </div>
                        </h5>
                    </a>
                );
            }
        }


        return (
            <div className="list-group">
                <a href="#" className="list-group-item active">
                    <h4 className="list-group-item-heading text-center">
                        <FontAwesome name="github"/> {this.props.username + "'s activity"}
                    </h4>
                </a>
                {rows}
                <a href="#" onClick={() => this.lazyLoad()} className="list-group-item info">
                    <h4 className="list-group-item-heading text-center">More events ...</h4>
                </a>
            </div>
        );
    }
}

export default App;