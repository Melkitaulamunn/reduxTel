import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import HomePage from "./pages/HomePage";
import actionTypes from './redux/actions/actionTypes';
import api from "./api/api";
import urls from "./api/urls";
import AddCategory from './pages/CategoryPages/AddCategory';
import EditPerson from './pages/PersonPages/EditPerson';
import InfoPerson from './pages/PersonPages/InfoPerson';
import AddPerson from './pages/PersonPages/AddPerson';
import CategoryActions from './pages/CategoryPages/CategoryActions';
import EditCategory from './pages/CategoryPages/EditCategory';

function App() {
  const {personState, categoryState} = useSelector(state => state);
  const dispatch = useDispatch();
  

  useEffect(()=>{
    dispatch({type:actionTypes.categoryActions.GET_CATEGORY_START})
    api
      .get(urls.categories)
      .then((catres)=>{
        dispatch({
          type:actionTypes.categoryActions.GET_CATEGORY_SUCCESS,
          payload: catres.data
        })
      })
      .catch((err)=>{
        dispatch({
          type:actionTypes.categoryActions.GET_CATEGORY_FAIL,
          payload:"An error occured at the server!"
        })
      })

      dispatch({
        type:actionTypes.personActions.GET_PERSON_START})
        api
          .get(urls.person)
          .then((perres)=>{
            dispatch({
              type:actionTypes.personActions.GET_PERSON_SUCCESS,
              payload:perres.data,
            })
          })
          .catch((err)=>{
            dispatch({
              type:actionTypes.personActions.GET_PERSON_FAIL,
              payload:"An error occured at the server!"
            })
          })
  },[])


  if(
    categoryState.success === false || personState.success === false
  )
  return null;
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/add-category' element={<AddCategory />}/>
      <Route path='/edit-person/:personId' element={<EditPerson />}/>
      <Route path='/info-person/:personId' element={<InfoPerson />} />
      <Route path='/add-person' element={<AddPerson />} />
      <Route path='/category-actions' element={<CategoryActions />} />
      <Route path='/edit-category/:categoryId' element={<EditCategory />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
