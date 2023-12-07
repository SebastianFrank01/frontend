import React, {Component} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

function FavouriteDropdown(props){
    return(
        <Dropdown variant={"dark"}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">Select From Favourites</Dropdown.Toggle>
            <Dropdown.Menu variant-{"dark"}>



            </Dropdown.Menu>

        </Dropdown>
    )


}

export default FavouriteDropdown