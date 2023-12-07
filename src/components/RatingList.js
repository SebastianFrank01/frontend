import React, { Component } from 'react';
import RouteLookUp from "./RouteLookUp";
import TodoItem from './TodoItem';

class RatingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingCleanliness : '',
            ratingSafety : '',
            ratingDriving : '',
            ratingCrowdedness : ''
        };
    }

    componentDidMount() {
        this.setState({ratingCleanliness : 5});
    }


    render() {
        return (
            <div >
                <div><u>Cleanliness</u></div>
                <small className="form-text text-light"><i>How clean the bus was</i></small>
                <p><b>{this.props.ratingCleanliness}</b></p>

                <div><u>Safety</u></div>
                <small className="form-text text-light"><i>How safe you felt while riding</i></small>
                <p><b>{this.props.ratingSafety}</b></p>

                <div><u>Driving</u> </div>
                <small className="form-text text-light"><i>How you feel about the drivers driving</i></small>
                <p><b>{this.props.ratingDriving}</b></p>

                <div><u>Crowdedness</u></div>
                <small className="form-text text-light"><i>How crowded was the bus</i></small>
                <p><b>{this.props.ratingCrowdedness}</b></p>


            </div>
        )
    }
}

export default RatingList;