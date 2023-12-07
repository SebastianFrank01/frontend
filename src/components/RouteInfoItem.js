import React from "react";
function RouteInfoItem(props){

    return(
            <li className="list-group-item bg-danger bg-gradient rounded p-3 m-2">
            Estimated Arrival Time: <u><b>{props.routeInfo}</b> minutes</u>
            </li>

    );
}
export default RouteInfoItem;
