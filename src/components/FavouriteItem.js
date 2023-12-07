import React, {Component} from 'react';

function FavouriteItem(props){

    return(
        <li className="list-group-item d-flex align-items-center border-secondary border-bottom border-top pt-2 mt-2 me-5 ms-3">
            <p className="mt-2"><button className="btn btn-danger me-3 " onClick={() => props.deleteFavourite(props.busNo,props.stopNo)}>Delete</button> Bus No: <b>{props.busNo}</b> Route No: <b>{props.stopNo}</b>
            </p>
        </li>
    )

}

export default FavouriteItem