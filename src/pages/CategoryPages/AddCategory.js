import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import GeneralModal from "../../components/GeneralModal";
import api from "../../api/api";
import urls from "../../api/urls";
import actionTypes from "../../redux/actions/actionTypes";


const AddCategory = () => {
    const { categoryState } = useSelector(state => state);
    const [errorModal, setErrorModal] = useState(false);
    const dispatch =useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id: String(new Date().getTime()),
        name: ""
    })
    const handleAdd = (event) => {
        event.preventDefault();

        if (form.name === "") {
            setErrorModal(true)
        }

        const hasCategory = categoryState.categories.find(category=> category.name.toLocaleLowerCase() === form.name.toLocaleLowerCase())
        if(hasCategory !== undefined) {
            setErrorModal (true)
            setForm({name:""})
        }

        api
        .post(urls.categories, form)    
        .then((res)=>{
            dispatch({
                type:actionTypes.categoryActions.ADD_CATEGORY_SUCCESS,
                payload:form
            })
            navigate("/")
        })
        .catch((err)=>{
            dispatch({
                type:actionTypes.categoryActions.ADD_CATEGORY_FAIL,
                payload:"An error occured during submitting!"
            })
        })

    }
    return (
        <div className="container my-3"
        >
            <Header whichPage={"categoryActions"} navigateTo="/" />
            <form onSubmit={handleAdd}>
                <div className="container py-3"
                    style={{
                        backgroundColor: "lightyellow",
                        boxShadow: "0px 0px 5px 5px rgba(158, 244, 248, 0.5)",
                        width: "85%"
                    }}>
                    <label
                        htmlFor="name"
                        className="form-label my-2 w-25">Name:</label>
                    <input
                        className="w-75 from-control"
                        value={form.name}
                        onChange={(event) => setForm({
                            ...form, name: event.target.value.toLocaleUpperCase()
                        })}
                        type="text"
                        id="name"
                        placeholder=" please write a category name ..." />
                    <div className="d-flex justify-content-center my-3"
                    >
                        <button type="submit" className="btn btn-outline-success w-25">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
            <div>
                {
                    errorModal === true && (
                        <GeneralModal
                            title="Error"
                            content="Category name must be filled or this category already exits!"
                            clsBtnTxt="Close"
                            clsBtnClck = {()=> setErrorModal(false)}
                            />
                            
                    )
                }
            </div>
        </div>
    )
}

export default AddCategory