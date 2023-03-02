import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import GeneralModal from "./GeneralModal"
import add from "../assets/imgs/add1.png";
import "../assets/styles/listpeople.css";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import openfolder from "../assets/imgs/openedfolder.gif";


const ListPeople = () => {
    const dispatch = useDispatch();
    const { personState, categoryState } = useSelector(state => state);
    const [deleteModal, setDeleteModal] = useState(false);
    const [willDeletePerson, setWillDeletePerson] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredPerson, setFilteredPerson] = useState(personState.people)

    useEffect(()=>{
        const temp = personState.people.filter((item) =>
            item.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
            setFilteredPerson(temp)

    })

    const handleDelete = (id) => {
        dispatch({ type: actionTypes.personActions.DELETE_PERSON_START })
        api
            .delete(`${urls.person}/${id}`)
            .then((res) => {
                dispatch({
                    type: actionTypes.personActions.DELETE_PERSON_SUCCESS,
                    payload: id
                })
            window.location.reload()

            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.personActions.DELETE_PERSON_FAIL,
                    payload: "An error occured during deleting!"
                });

            });
    };

    return (
        <div className="personContainer container mt-3">
            <div className="container searchContainer">
                <input
                    className="form-control"
                    type="text"
                    placeholder="search for people ..."
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />
            </div>
            <div className="d-flex justify-content-center my-1 gap-5">
                <Link
                    to={"/add-person"}
                    className="btn btn-outline-info ">
                    Add Person <img
                        src={add}
                        style={{
                            width: "35px",
                            margin: "5px"
                        }} alt="" />
                </Link>
                <Link
                    to={"/category-actions"}
                    className="btn btn-outline-warning ">
                    Category Actions <img
                        src={openfolder}
                        style={{
                            width: "35px",
                            margin: "5px"
                        }} alt="" />
                </Link>
            </div>
            <div className="validationContainer">
                {
                    categoryState.categories.lenght === 0 && (
                        <p>A category must be added first!</p> >
                        <Link
                            className="btn btn-success"
                            to={"/add-category"}>Add Category</Link>
                    )
                }
            </div>
            <div>
                <table className="table table-light table-striped table-hover table-sm caption-top table-bordered border-info">
                    <caption>List of People</caption>
                    <thead className="table-warning text-center">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Categori</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center table-group-divider">
                        {
                            filteredPerson.map((person, index) => {
                                const personCat = categoryState.categories.find(item => item.id === person.categoryId);
                                return (
                                    <tr
                                        className="align-middle"
                                        key={person.id}>
                                        <th>{index + 1}</th>
                                        <th>{person.name}</th>
                                        <th>{personCat?.name}</th>
                                        <th className="d-flex justify-content-around">
                                            <button
                                                onClick={() => {
                                                    setDeleteModal(true);
                                                    setWillDeletePerson(person.id);
                                                }}
                                                className="btn btn-outline-danger">Delete</button>
                                            <Link
                                            to={`/edit-person/${person.id}`}
                                                className="btn
                                                btn-outline-warning">Edit</Link>
                                            <Link
                                            to={`/info-person/${person.id}`}
                                                className="btn btn-outline-info">Info</Link>
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    deleteModal === true && (
                        <GeneralModal
                            title="Delete?"
                            content="Are you sure to delete?"
                            clsBtnTxt="No"
                            clsBtnClck={() => setDeleteModal(false)}
                            isCnfrm={true}
                            cnfrmBtnTxt="Yes"
                            cnfrmBtnClck={() => {
                                handleDelete(willDeletePerson);
                                setDeleteModal(false);
                            }}
                        />
                    )}
            </div>
        </div>
    )
}

export default ListPeople