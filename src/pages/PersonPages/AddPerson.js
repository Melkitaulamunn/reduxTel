import React, { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import GeneralModal from "../../components/GeneralModal";
import api from "../../api/api";
import urls from "../../api/urls";
import actionTypes from "../../redux/actions/actionTypes";

const AddPerson = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { personState, categoryState } = useSelector((state) => state)
    const[errorModal, setErrorModal] = useState(false)
    const [form, setForm] = useState({
        id: String(new Date().getTime()),
        name: "",
        mobil: "",
        categoryId: ""
    })

    const handleSubmit = (event) =>{
        event.preventDefault()
        if(form.name === "" || form.mobil === "" || form.categoryId === ""){
            setErrorModal(true)
        }
        dispatch({type:actionTypes.personActions.ADD_PERSON_START})

        api.post(urls.person, form)
            .then((res)=>{
                console.log(form);
                dispatch({
                    type:actionTypes.personActions.ADD_PERSON_SUCCESS, payload:form
                })
                navigate("/")
            })
            .catch((err)=>{
               dispatch({
                    type:actionTypes.personActions.ADD_PERSON_FAIL, payload:"An error occured when adding a person"
                })
            })

        
    }
    return (
        <div>
            <Header whichPage={"info-person"} navigateTo="/" />
            <div>
                <div className="container w-75">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">
                                Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Please type a name..."
                                value={form.name}
                                onChange={(event) => {
                                    setForm({
                                        ...form, name: event.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mobil" className="form-label">
                                Mobil
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="mobil"
                                placeholder="Please type a mobil number ..."
                                value={form.mobil}
                                onChange={(event) => {
                                    setForm({
                                        ...form, mobil: event.target.value
                                    })
                                }}
                            />
                        </div>
                        <select
                            className="form-select mb-4"
                            value={form.categoryId}
                            onChange={(event) =>
                                setForm({ ...form, categoryId: event.target.value })
                            }>
                                <option value={"empty"}></option>
                            {
                                categoryState.categories.map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                        <div className="d-flex justify-content-center my-5">
                            <button className="btn btn-outline-success primary w-50" type="submit">
                                Kaydet
                            </button>
                        </div>
                    </form>
                    {
                    errorModal === true && (
                        <GeneralModal
                            title="Error"
                            content="All the fields must be filled!"
                            clsBtnTxt="Try Again"
                            clsBtnClck={() => setErrorModal(false)} />

                    )
                }
                </div>
            </div>
        </div>
    )
}

export default AddPerson