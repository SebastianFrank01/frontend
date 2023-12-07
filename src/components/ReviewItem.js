import React, {Component} from 'react';

function ReviewItem(props){

    return(
        <li className="list-group-item d-flex align-items-center border-secondary border-bottom border-top pt-2 me-5 ms-3">
            <p>Review by <b>{props.user}</b> for bus <b>{props.busNo}</b> at stop <b>{props.stopNo}</b></p>
            <p> Scheduled: {props.scheduleTime} Arrival: {props.realArrivalTime}</p>
            <p> Crowdedness: {props.ratingCrowdedness} | Driving: {props.ratingDriving} | Cleanliness: {props.ratingCleanliness} | Safety: {props.ratingSafety}</p>

        </li>
    )

}

export default ReviewItem;