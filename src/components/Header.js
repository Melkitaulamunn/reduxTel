import React from "react";
import { useNavigate } from "react-router-dom";

import backArrow from "../assets/imgs/back-arrow.png";
import logo from "../assets/imgs/phonebook.gif";
import "../assets/styles/header.css";


const Header = ({ whichPage, navigateTo }) => {
    const navigate = useNavigate();

    var showback = false;
    if (whichPage !== "home") {
        showback = true
    }
    return (
        <div
            className="headerContainer container my-5">
            {
                showback === true && (
                    <div className="toBack">
                        <img
                            onClick={()=> navigate(navigateTo)}
                            className="toBackImg"
                            src={backArrow}
                            alt="" />
                    </div>
                )

            }
            <div className="headerContainerWrapper ms-5">
                <h1>Telephone Book</h1>
                <img
                    className="headerLogo"
                    src={logo}
                    alt="" />
            </div>

        </div>
    )
}

export default Header