import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
import chat from "../../assets/imgs/chat.gif";
import mail from "../../assets/imgs/mail.gif";
import phone from "../../assets/imgs/phone.gif";



const InfoPerson = () => {
    const { personState, categoryState } = useSelector((state) => state)
    const params = useParams();
    const person = personState.people.find((item) => item.id === params.personId)
    console.log(person);

    console.log(categoryState.categories);
    const personcat = categoryState.categories.find( item => item.id === person.categoryId)
    console.log(personcat);






    return (
        <div>
            <Header whichPage={"info-person"} navigateTo="/" />
            <div
                className="container d-flex justify-content-between w-50">
                <img src={chat} alt="" />
                <img src={mail} alt="" />
                <img src={phone} alt="" />
            </div>
            <div className="container my-5 w-75">
                <div className="formElement">
                    <label htmlFor="name">Name:</label>
                    <input id="name"
                        type={"text"}
                        value={person.name}
                        onChange="" />
                </div>
                <div className="formElement">
                    <label htmlFor="name">Mobil:</label>
                    <input id="name"
                        type={"text"}
                        value={person.mobil}
                        onChange="" />
                </div>
                <div className="formElement">
                    <label htmlFor="name">Category:</label>
                    <input id="name"
                        type={"text"}
                        value={personcat.name}
                        />
                </div>
            </div>
        </div>
    )
}

export default InfoPerson