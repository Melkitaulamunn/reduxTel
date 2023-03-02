import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import GeneralModal from "../../components/GeneralModal";
import actionTypes from "../../redux/actions/actionTypes";
import api from "../../api/api";
import urls from "../../api/urls";

const EditCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categoryState } = useSelector((state) => state)
    const params = useParams();

    const editedCat = categoryState.categories.find(item => item.id === params.categoryId)
    const [form, setForm] = useState(editedCat);
    const [errorModal, setErrorModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault()
        if (form.name === "") { setErrorModal(true) }
        dispatch({type:actionTypes.categoryActions.EDIT_CATEGORY_START})
        api
            .put(`${urls.categories}/${params.categoryId}`, form)
            .then((res)=>{
                dispatch({
                    type:actionTypes.categoryActions.EDIT_CATEGORY_SUCCESS, payload:form            
                })
                navigate("/category-actions")
                window.location.reload()
            })
            .catch((err)=>{
                dispatch({
                    type:actionTypes.categoryActions.EDIT_CATEGORY_FAIL, payload:"An error occured when editing!"
                })
            })
    }
    return (
        <div>
            <Header whichPage={"category-list"} navigateTo="/category-actions" />
            <div className="container my-3">
                <div className=" d-flex justify-content-center my-4">
                    <h3>Edit Category</h3>
                </div>
                <form onSubmit={handleSubmit}>
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
                                ...form, name: event.target.value
                            })}
                            type="text"
                            id="name"
                            placeholder=" please write a category name ..." />
                        <div className="d-flex justify-content-center my-3"
                        >
                            <button type="submit" className="btn btn-outline-info w-25">
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
                                content="Category name must be filled!"
                                clsBtnTxt="Close"
                                clsBtnClck={() => setErrorModal(false)}
                            />

                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default EditCategory