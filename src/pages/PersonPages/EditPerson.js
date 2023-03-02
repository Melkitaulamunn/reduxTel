import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/Header";
import GeneralModal from "../../components/GeneralModal";
import "../../assets/styles/editperson.css";
import actionTypes from "../../redux/actions/actionTypes";
import api from "../../api/api";
import urls from "../../api/urls";

const EditPerson = () => {
    const { personState, categoryState } = useSelector((state) => state)
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const person = personState.people.find(item => item.id === params.personId)
    console.log(person);
    const [form, setForm] = useState(person)
    const [errorModal, setErrorModal] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.name === "" || form.mobil === "" || form.categoryId === "") { setErrorModal(true) }
        if(form.name.length < 3) {
            setErrorModal(true)
        }
        dispatch({type:actionTypes.personActions.EDIT_PERSON_START})
        api
        .put(`${urls.person}/${params.personId}`, form)
        .then((res)=>{
            dispatch({
                type:actionTypes.personActions.EDIT_PERSON_SUCCESS, 
                payload:form
            })
            navigate("/")
        })
        .catch((err)=>{
            dispatch({
                type:actionTypes.personActions.EDIT_PERSON_FAIL, payload:"An error occured when editing!"
            })
        })

    }
    return (
        <div>
            <Header whichPage={"add-person"} navigateTo="/" />
            <div className="formWrapper">
                <form onSubmit={handleSubmit}>
                    <div className="formElement">
                        <label htmlFor="name">Name:</label>
                        <input id="name"
                            type={"text"}
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })} />
                    </div>
                    <div className="formElement">
                        <label htmlFor="mobil">Mobil:</label>
                        <input id="mobil" type={"number"}
                            value={form.mobil}
                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                        />
                    </div>
                    <div className="formElement">
                        <label htmlFor="category" >Category:</label>
                        <select
                            defaultValue={""}
                            onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
                        >
                            <option
                                value={"empty"}>Please choose a category</option>
                            {
                                categoryState.categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="submitBtnWrapper">
                        <button className="submitBtn" type="submit">Save</button>
                    </div>
                </form>
                {
                    errorModal === true && (
                        <GeneralModal
                            title="Error"
                            content="All the fields must be filled or name must be at least 3 character!"
                            clsBtnTxt="Try Again"
                            clsBtnClck={() => setErrorModal(false)} />

                    )
                }
            </div>

        </div>
    )
}

export default EditPerson