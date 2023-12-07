import React, {Component} from 'react';
import {connectStops} from "../services/apiService";

class RouteConnecter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startStop : '',
            endStop : '',
            directions: '',
            spinner: false
        };
        this.handleChangeStartStop = this.handleChangeStartStop.bind(this);
        this.handleChangeEndStop = this.handleChangeEndStop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeStartStop(event) {
        this.setState({startStop: event.target.value});
    }

    handleChangeEndStop(event) {
        this.setState({endStop: event.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
    }

    sendData = () => {
        if (this.state.startStop !== '' && this.state.endStop !== '')
        this.setState({'spinner' : true})
        {
            connectStops(this.state.startStop, this.state.endStop)
                .then(data => {
                    console.log(data);
                    this.setState({'directions': data.data.busRoute, 'spinner' : false});
                })
        }
    }

    doSpinner = () =>{
        if(this.state.spinner){
            return <div className="spinner-border" role="status"></div>;
        }
        return <a></a>

    }

    render(){
        return(
            <div>


            <form id="routeConnectorForm" onSubmit={this.handleSubmit}>
                <br/>
                <h6><u>Plan Trip</u></h6>
                <div className= "form-group">
                    <input type="number" value={this.state.startStop} required="required" onChange={this.handleChangeStartStop}/>
                </div>
                <small className="form-text text-light"><i>Number of the bus stop at start</i></small>
                <div className = "form-group">
                    <input type="number" value={this.state.endStop} required="required" onChange={this.handleChangeEndStop}/>
                </div>
                <small className="form-text text-light"><i>Number of bus stop at destination</i></small>
                <div>
                    <br/>
                    <button type="submit" value="submit" onClick={this.sendData} class="btn btn-dark btn-outline-danger">Submit</button>
                </div>
            </form>
            <div>
               <p>Bus plan/bus(es) needed to get to your destination: {this.state.directions}</p>
            </div>
                {this.doSpinner()}
            </div>

        )}

}

export default RouteConnecter;