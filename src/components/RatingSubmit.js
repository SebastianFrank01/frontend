import React, {Component, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import RouteInfoItem from "./RouteInfoItem";
import RatingList from "./RatingList";
import RouteConnecter from "./RouteConnecter"
import {getTimes, sendRating} from "../services/apiService";

class RatingSubmit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userSubmitted: '',
            busNo: '',
            stopNo: '',
            scheduleTime: [],
            realArrivalTime: [],
            wasCancelled: '',
            ratingCleanliness: '',
            ratingSafety: '',
            ratingDriving: '',
            ratingCrowdedness: '',
            success: ''
        };
        this.handleChangeThisBusNo = this.handleChangeThisBusNo.bind(this);
        this.handleChangeThisStopNo = this.handleChangeThisStopNo.bind(this);
        this.handleChangeScheduleTime = this.handleChangeScheduleTime.bind(this);
        this.handleChangeRealArrivalTime = this.handleChangeRealArrivalTime.bind(this);
        this.handleChangeWasCancelled = this.handleChangeWasCancelled.bind(this);
        this.handleChangeRatingCleanliness = this.handleChangeRatingCleanliness.bind(this);
        this.handleChangeRatingSafety = this.handleChangeRatingSafety.bind(this);
        this.handleChangeRatingDriving = this.handleChangeRatingDriving.bind(this);
        this.handleChangeRatingCrowdedness = this.handleChangeRatingCrowdedness.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({busNo: window.sessionStorage.getItem("busNo",),stopNo: window.sessionStorage.getItem("stopNo"),scheduleTime: window.sessionStorage.getItem("scheduleTime"),realArrivalTime: window.sessionStorage.getItem("realArrivalTime"),wasCancelled: window.sessionStorage.getItem("wasCancelled"),ratingCleanliness: window.sessionStorage.getItem("ratingCleanliness"),ratingSafety: window.sessionStorage.getItem("ratingSafety"),ratingDriving: window.sessionStorage.getItem("ratingDriving"),ratingCrowdedness: window.sessionStorage.getItem("ratingCrowdedness")});

    }

    handleChangeThisBusNo(event){
        window.sessionStorage.setItem("busNo", event.target.value);
        this.setState({busNo: window.sessionStorage.getItem("busNo")});


    }
    handleChangeThisStopNo(event){
        window.sessionStorage.setItem("stopNo", event.target.value);
        this.setState({stopNo: window.sessionStorage.getItem("stopNo")});
    }
    handleChangeScheduleTime(event){
        window.sessionStorage.setItem("scheduleTime", event.target.value);
        this.setState({scheduleTime: window.sessionStorage.getItem("scheduleTime")});

    }
    handleChangeRealArrivalTime(event){
        window.sessionStorage.setItem("realArrivalTime", event.target.value);
        this.setState({realArrivalTime: window.sessionStorage.getItem("realArrivalTime")});

    }
    handleChangeWasCancelled(event){
        window.sessionStorage.setItem("wasCancelled", event.target.value);
        this.setState({wasCancelled: window.sessionStorage.getItem("wasCancelled")});

    }
    handleChangeRatingCleanliness(event){
        window.sessionStorage.setItem("ratingCleanliness", event.target.value);
        this.setState({ratingCleanliness: window.sessionStorage.getItem("ratingCleanliness")});
    }
    handleChangeRatingSafety(event){
        this.setState({ratingSafety: event.target.value});
        window.sessionStorage.setItem("ratingSafety", event.target.value);
        this.setState({ratingSafety: window.sessionStorage.getItem("ratingSafety")});
    }
    handleChangeRatingDriving(event){
        window.sessionStorage.setItem("ratingDriving", event.target.value);
        this.setState({ratingDriving: window.sessionStorage.getItem("ratingDriving")});
    }
    handleChangeRatingCrowdedness(event){
        window.sessionStorage.setItem("ratingCrowdedness", event.target.value);
        this.setState({ratingCrowdedness: window.sessionStorage.getItem("ratingCrowdedness")});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    sendRating = () => {
        sendRating(this.state.busNo, this.state.stopNo, this.state.scheduleTime, this.state.realArrivalTime, this.state.wasCancelled, this.state.ratingCleanliness, this.state.ratingSafety, this.state.ratingDriving, this.state.ratingCrowdedness)
            .then(() => {
                window.sessionStorage.setItem("busNo","");
                window.sessionStorage.setItem("stopNo","");
                window.sessionStorage.setItem("scheduleTime","");
                window.sessionStorage.setItem("realArrivalTime","");
                window.sessionStorage.setItem("wasCancelled","");
                window.sessionStorage.setItem("ratingCleanliness","");
                window.sessionStorage.setItem("ratingSafety","");
                window.sessionStorage.setItem("ratingDriving","");
                window.sessionStorage.setItem("ratingCrowdedness","");
                this.setState({success: "", busNo: "",stopNo: "",scheduleTime: "",realArrivalTime: "",wasCancelled: "",ratingCleanliness: "",ratingSafety: "",ratingDriving: "",ratingCrowdedness: ""});

                console.log("sent request");
            })

            .catch(error => {
            this.setState({success: "Error uploading reivew"});
                console.error('There was a problem uploading to the database', error);
            });

    }


    render() {
        return (
            <div className="ps-3 pe-3">

                    <h2><u>Submit Bus Rating</u></h2>
                    <br/>
                    <form onSubmit={this.handleSubmit}>
                    <div className = "row">

                            <div className = "col pt-4 ps-3 pb-3 me-3 mb-4 ms-3 bg-secondary bg-gradient rounded" id="col1">

                                <h6><u>Bus Arrival Rating</u></h6>

                                <input value={this.state.stopNo}type="number" id="busStopNumber" name="busStopNumber" required="required" min = "1000" max = "9999" onChange={this.handleChangeThisStopNo}/>
                                <small className="form-text text-light"><p><i>Bus Stop Number ex: 6624, 6610</i></p></small>

                                <input value={this.state.busNo} type="number" id="busNumber" name="busNumber" required="required" min = "1" max = "999" onChange={this.handleChangeThisBusNo}/>
                                <small className="form-text text-light"><p><i>Bus Number ex: 2, 10, 111</i></p></small>

                                <label htmlFor="scheduledBusTime">Time: </label>
                                <input value={this.state.scheduleTime} type="time" id="scheduledBusTime" name="scheduledBusTime" required="required" onChange={this.handleChangeScheduleTime}/>
                                <small className="form-text text-light"><p><i>Scheduled Bus Time {this.state.scheduleTime}</i></p></small>

                                <label htmlFor="realArrivalTime">Time: </label>
                                <input value={this.state.realArrivalTime} type="time" id="realArrivalTime" name="realArrivalTime" onChange={this.handleChangeRealArrivalTime}/>
                                <small className="form-text text-light"><p><i>Time bus actually arrived {this.state.realArrivalTime}</i></p></small>

                            </div>

                            <div className = "col pt-4 ps-3 pb-3 me-3 mb-4 ms-3 bg-secondary bg-gradient rounded" id="col2">

                                <h6><u>General Ratings (1-5)</u></h6>

                                <input value={this.state.ratingCrowdedness} className="redBackground" type="range" id="crowdedness" name="crowdedness" required="required" min="1" max="5" onChange={this.handleChangeRatingCrowdedness}/>
                                <small className="form-text text-light"><p><i>Crowdedness</i></p></small>

                                <input value={this.state.ratingDriving} className="redBackground" type="range" id="driving" name="driving" required="required" min="1" max="5" onChange={this.handleChangeRatingDriving}/>
                                <small className="form-text text-light"><p><i>Driver's Driving</i></p></small>

                                <input value={this.state.ratingCleanliness} className="redBackground" type="range" id="cleanliness" name="cleanliness" required="required" min="1" max="5" onChange={this.handleChangeRatingCleanliness}/>
                                <small className="form-text text-light"> <p><i>Cleanliness</i></p></small>

                                <input value={this.state.ratingSafety} className="redBackground" type="range" id="safety" name="safety" required="required" min="1" max="5" onChange={this.handleChangeRatingSafety}/>
                                <small className="form-text text-light">  <p><i>How safe you felt</i></p></small>


                            </div>

                    </div>
                        <div>
                            <button type="submit" value="submit" onClick={this.sendRating} className="btn btn-dark btn-outline-danger mt-2 mb-5">Submit</button>
                        </div>
                    </form>
                <div className="ps-3 pb-5 redText">
                    {this.state.success}
                </div>


            </div>


                        )}

}

export default RatingSubmit;