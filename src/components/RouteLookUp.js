import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingList from "./RatingList";
import {getTimes} from "../services/apiService";

function RouteLookUp(props){
    const [stopNo, setStopNo] = useState('');
    const [busNo, setBusNo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();
        getTimes(stopNo, busNo)
           .then(() =>{
                navigate('/');
                print("boy howdy")
           })
    };

    return(
        <div className="row h-100 ">
            <div className=" bg-dark text-light col">
            </div>
            <div className="col-6">
                <h2><u>Stop Lookup</u></h2>
                <div className = "row">
                    <div className = "col">
                        <form onSubmit={handleSubmit}>
                        <br/>
                            <div className= "form-group">
                                <input type="text" value={stopNo} onChange={e => setStopNo(e.target.value)} placeholder="Stop Number" />
                            </div>
                            <small className="form-text text-muted">This is a 4 digit number ex. 6624</small>
                            <div className = "form-group">
                                <input type="text" value={busNo} onChange={e => setBusNo(e.target.value)} placeholder="Bus Number" />
                            </div>
                            <small className="form-text text-muted">This is the bus number ex. 10, 2, 111</small>
                            <div>
                                <br/>
                            <button type="submit">Submit</button>
                                <button>Favourite</button>
                            </div>
                            <button>Rate This Bus Route</button>
                        </form>

                    </div>

                    <div className = "col">
                        <RatingList/>
                    </div>


                </div>





            </div>
            <div className=" bg-dark text-light col">
            </div>

        </div>
    )
}

export default RouteLookUp