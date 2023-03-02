import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";

const CategoryList = () => {

    const { categoryState } = useSelector(state => state);


    return (
        <div className="categoriesContainer d-flex flex-column">
            <Header whichPage={"category-list"} navigateTo="/" />
            <div className="mb-4">
                <Link
                    to={"/add-category"}
                    className="btn btn-outline-success d-flex justify-content-center w-50 m-auto">Add Category</Link>
            </div>
            <div className="categoriesContainer_wrapper">
                <div className="categoriesContainer_wrapper_catlist">
                    {
                        categoryState.categories.length === 0 && (
                            <p>
                                No categories recorded yet!
                            </p>
                        )
                    }
                    <div>
                        <div className="container">
                            <div >
                                <table className="table table-light table-striped table-hover table-sm caption-top table-bordered border-info">
                                    <caption className="mb-3">List of Categories</caption>
                                    <thead className="table-warning text-center">
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center table-group-divider">
                                        {
                                            categoryState.categories.map((category, index)=>(
                                                <tr
                                                key={category.id}
                                            className="align-middle">
                                            <th>{index+1}</th>
                                            <th>{category.name}</th>
                                            <th className="d-flex justify-content-around">
                                                <Link
                                                    to={`/edit-category/${category.id}`}
                                                    className="btn
                                                btn-outline-warning">Edit</Link>
                                            </th>
                                        </tr>
                                            ) )
                                        }
                                        

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CategoryList