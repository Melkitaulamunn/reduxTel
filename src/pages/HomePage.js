import React from "react";
import Header from "../components/Header"
import ListPeople from "../components/ListPeople";

const HomePage = () =>{

    return(
        <div>
            <Header whichPage={"home"}/>
            <ListPeople />
        </div>
    )
}

export default HomePage