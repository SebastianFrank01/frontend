import React, {Component, useState} from 'react';
import {connectStops} from "../services/apiService";
import FavouriteItem from "./FavouriteItem";
import {getFavourites, submitFavourite, getReviews} from "../services/apiService";
import TodoItem from "./TodoItem";
import ReviewItem from "./ReviewItem.js"

class ViewStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            favouriteBusNo: '',
            favouriteStopNo: '',
            searchBusNo: '',
            favInfo: [],
            reviewInfo: []

        };
        this.handleSubmitFavouriteBusNo = this.handleSubmitFavouriteBusNo.bind(this);
        this.handleSubmitFavouriteStopNo = this.handleSubmitFavouriteStopNo.bind(this);
        this.handleSubmitSearchBusNo = this.handleSubmitSearchBusNo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmitFavouriteBusNo(event){
        this.setState({'favouriteBusNo' : event.target.value})
    }

    handleSubmitFavouriteStopNo(event){
        this.setState({'favouriteStopNo' : event.target.value})
    }

    handleSubmitSearchBusNo(event){
        this.setState({'searchBusNo' : event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {

    }

    viewFavourites = () =>{
        this.doGetFavourites()
            .then(data =>{
                this.setState({'favInfo' : data});
                console.log(data)
            })

    }

    doGetFavourites = () =>{
        return getFavourites()
    }



    renderFavourites = () =>{
        return this.state.favInfo.map(item => (
            <FavouriteItem
                key={item.id}
                busNo={item.favBus}
                stopNo={item.favStop}
                deleteFavourite={this.deleteFavourite}
            />
        ));
    }

    deleteFavourite = (busNo,stopNo) =>{
        submitFavourite(busNo,stopNo)
            .then(() => {
                const filteredItems = this.state.favInfo.filter(item => {
                    if (item.favBus !== busNo) {return true;}
                    if (item.favStop !== stopNo) {return true;}
                    return false;
                })
                this.setState({favInfo: filteredItems});
            })
    }

    addFavourite = () => {
        if(this.state.favouriteBusNo !== '' && this.state.favouriteStopNo !== ''){
            submitFavourite(this.state.favouriteBusNo, this.state.favouriteStopNo)
                .then((data) => {
                    this.setState({'favInfo': data});
                })
        }
    }

    getRouteReviews = () =>{
        if(this.state.searchBusNo !== '') {
            getReviews(this.state.searchBusNo)
                .then((data) => {
                    this.setState({'reviewInfo': data})
                })
        }
    }

    renderReviews = () =>{
        return this.state.reviewInfo.map(item => (
            <ReviewItem
                user={item.userSubmitted}
                busNo={item.busNumber}
                stopNo={item.busStopNumber}
                scheduleTime = {item.scheduleTime}
                realArrivalTime = {item.realArrivalTime}
                wasCancelled = {item.wasCancelled}
                ratingCrowdedness = {item.ratingCrowdedness}
                ratingDriving = {item.ratingDriving}
                ratingCleanliness = {item.ratingCleanliness}
                ratingSafety = {item.ratingSafety}
            />
        ));
    }


    render(){
        return(
            <div className="ps-3 pe-3">
                <h2 ><u>View Favs / Reviews</u></h2>

                <form id="statSubmitForm" onSubmit={this.handleSubmit}>
                    <div className=" ps-3 pb-3 me-3 mb-4 ms-3 bg-secondary bg-gradient rounded">
                    <br/>
                    <div className= "form-group">
                        <input type="number" value={this.state.favouriteBusNo} onChange={this.handleSubmitFavouriteBusNo}/>
                    </div>
                    <small className="form-text text-light"><i>The bus number to add to favourites ex. 2, 10, 111</i></small>
                    <div className = "form-group">
                        <input type="number" value={this.state.favouriteStopNo} onChange={this.handleSubmitFavouriteStopNo}/>
                    </div>
                    <small className="form-text text-light"><i>The stop number to add to favourites ex. 6624, 6610</i></small>
                    <div>
                        <button type="submit" onClick={this.addFavourite} className="btn btn-dark btn-outline-danger mt-2">Add to Favourites</button>
                        <button onClick={this.viewFavourites} className="btn btn-dark btn-outline-danger mt-2 ms-3">View Favourites</button>
                    </div>
                    </div>
                </form>
                <form id="statSubmitForm2" onSubmit={this.handleSubmit}>
                    <div className=" ps-3 pb-3 me-3 mb-4 ms-3 bg-secondary bg-gradient rounded">
                    <br/>
                    <div className = "form-group">
                        <input type="number" value={this.state.searchBusNo} onChange={this.handleSubmitSearchBusNo} required="required"/>
                    </div>
                    <small className="form-text text-light"><i>Get reviews based on bus number ex. 2, 10, 111</i></small>
                    <div>
                        <button type="submit" value="submit" onClick={this.getRouteReviews} name="reviewSubmit" className="btn btn-dark btn-outline-danger mt-2">Get Reviews</button>
                    </div>
                    </div>

                </form>
                <div>
                    <ul>
                        {this.renderFavourites()}
                    </ul>
                    <ul>
                        {this.renderReviews()}
                    </ul>
                </div>

            </div>
        )
    }

}

export default ViewStats