import React, {Component, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import RouteInfoItem from "./RouteInfoItem";
import RatingList from "./RatingList";
import {getTimes, getRating, getFavourites, submitFavourite} from "../services/apiService";
import RouteConnecter from "./RouteConnecter";
import ViewStats from "./ViewStats";
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from "react-router-dom";

class RouteInfo extends Component {


    constructor(props) {
        super(props);
        this.state = {
            routeInfo : [],
            routeName : '',
            stopNo : '',
            busNo : '',
            ratingCleanliness : '',
            ratingSafety : '',
            ratingDriving : '',
            ratingCrowdedness : '',
            favList: [],
            spinner: false,

        };

        this.handleChangeStopNo = this.handleChangeStopNo.bind(this);
        this.handleChangeBusNo = this.handleChangeBusNo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeStopNo(event) {
        this.setState({stopNo: event.target.value});
    }
    handleChangeBusNo(event) {
        this.setState({busNo: event.target.value});
    }
    handleSubmit(event) {
        console.log('A value was submitted: ', this.state.stopNo, ' ', this.state.busNo, ' ', this.state.routeInfo);
        event.preventDefault();
    }

    componentDidMount() {
        //for getting info for the favourites dropdown
        getFavourites()
            .then((data) =>{
                this.setState({favList : data});
            })
    }

    updateRouteInfo = () => {
        if (this.state.busNo !== '' && this.state.stopNo !== '') {
            this.setState({spinner: true})
            getTimes(this.state.busNo, this.state.stopNo)
                .then(data => {
                        const arrTimes = [];
                        console.log(data, " getting times")

                        Array.prototype.forEach.call(data.arrivalTimes, times => {
                            arrTimes.push(times.AdjustedScheduleTime);
                        });
                        //data.arrivalTimes.forEach((times) => arrTimes.push(times.AdjustedScheduleTime));

                        this.setState({routeInfo: arrTimes, spinner: false});
                        //console.log("hohi", data.arrivalTimes[0].AdjustedScheduleTime)
                        console.log(arrTimes[0]);
                    }
                )


            getRating(this.state.busNo)
                .then(data => {
                    console.log(data, " rating info data")
                    this.setState({
                        ratingCleanliness: data.avgCleanliness,
                        ratingSafety: data.avgSafety,
                        ratingDriving: data.avgDriving,
                        ratingCrowdedness: data.avgCrowdedness
                    });
                })
        }
}

    renderItem = () =>{
            if (this.state.routeInfo.length > 0) {
                let tempArray = []
                this.state.routeInfo.forEach(function (each) {
                    tempArray.push(<RouteInfoItem key={each} routeInfo={each}/>)
                })
                return tempArray
            }
    }

    addNewFavourite = () => {
        if (this.state.busNo !== '' && this.state.stopNo !== '') {
            submitFavourite(this.state.busNo, this.state.stopNo)
                .then((data) => {
                    this.setState({'favList': data});
                })
        }
    }

    doSpinner = () =>{
        if(this.state.spinner){
            return <div className="spinner-border" role="status"></div>;
        }
        return <br/>

    }


    setSessionStorage = () =>{
        window.sessionStorage.setItem("busNo", this.state.busNo);
        window.sessionStorage.setItem("stopNo", this.state.stopNo);
    }




    render() {
        return (

                    <div>
                        <h2 className="ms-3 pb-3"><u>Stop Lookup</u></h2>
                        <div className = "row">
                            <div className = "col">


                                <form id="lookupform" onSubmit={this.handleSubmit}>
                                    <div className=" ps-3 pb-3 me-3 mb-4 ms-3 bg-secondary bg-gradient rounded">

                                    <br/>
                                        <h6><u>Lookup when bus comes</u></h6>
                                    <div className= "form-group">
                                        <input type="number" value={this.state.stopNo} required="required" onChange={this.handleChangeStopNo}/>
                                    </div>
                                    <small className="form-text text-light"><i>This is a 4 digit stop number ex. 6610</i></small>
                                    <div className = "form-group">
                                        <input type="number" value={this.state.busNo} required="required" onChange={this.handleChangeBusNo}/>
                                    </div>
                                    <small className="form-text text-light"><i>This is the bus number ex. 10, 2, 111</i></small>
                                    <div>
                                        <br/>
                                        <Dropdown variant={"dark"}>
                                            <Dropdown.Toggle className="btn btn-secondary btn-sm btn-outline-warning" variant="dark" id="dropdown-basic">Select From Favourites</Dropdown.Toggle>
                                            <Dropdown.Menu variant={"dark"}>
                                                {this.state.favList.map((item, index) =>(
                                                    <Dropdown.Item value={index} onClick={()=>(this.setState({'stopNo':item.favStop, 'busNo':item.favBus}))}>Bus: {item.favBus} at stop: {item.favStop}</Dropdown.Item>
                                                ))}


                                            </Dropdown.Menu>

                                        </Dropdown>

                                        <button className="btn btn-dark btn-outline-danger" type="submit" value="submit" onClick={this.updateRouteInfo}>Submit</button>
                                        <button className="btn btn-dark btn-outline-info" onClick={this.addNewFavourite}>Favourite</button>
                                    </div>
                                    <Link to={"/"}><button onClick={this.setSessionStorage} className="btn btn-dark btn-outline-secondary">Rate This Bus Route</button> </Link>
                                    </div>
                                </form>
                                <div className=" ps-3 pb-3 mb-4 ms-3 me-3" >
                                    <RatingList ratingSafety = {this.state.ratingSafety} ratingCleanliness = {this.state.ratingCleanliness} ratingDriving = {this.state.ratingDriving} ratingCrowdedness = {this.state.ratingCrowdedness}/>

                                </div>

                            </div>

                            <div className = "col">


                                <div className=" ps-3 pb-3 mb-4 ms-3 me-3 bg-secondary bg-gradient rounded">

                                    <RouteConnecter/>
                                </div>
                                <div className=" ps-3 pb-3 mb-4 ms-3 me-3" >
                                    {this.doSpinner()}

                                    {this.renderItem()}

                                <br/>
                                </div>

                                
                    </div>
                        </div>


                </div>

        )
    }
}

export default RouteInfo;