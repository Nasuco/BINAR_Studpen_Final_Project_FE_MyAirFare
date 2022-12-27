/* eslint-disable no-unreachable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserdata } from '../actions/userAction';
import { getHistoryData } from '../actions/history';
import Loading from '../pages/Loading';

// import '../../index.css';
// const dotenv = require('dotenv').config()

const ajaxGetUser = async (jwt) => {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/who-am-i`;
    console.log(url);
    const res = await fetch(
        url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': jwt
        }
    }
    );
    return res;
}

const destroyToken = (token) => {
    if (token !== '') {
        localStorage.removeItem('x-access-token');
    }
}

let loopRender = 0;

function ProtectedRoute({ children, active = true, admin = false }) {

    const dispatch = useDispatch();

    const [navigate, setNav] = useState(null);

    console.log('Ini diulangi');

    useEffect(() => {
        try {
            let token = localStorage.getItem('x-access-token');
            token = token == null ? '' : token;
            console.log(token);
            ajaxGetUser(token).then(result => {
                result.json().then(json => {
                    if (result.status !== 200) {
                        console.log("Ini error : ", json);
                        destroyToken(token);
                        setNav('/login')
                        dispatch(getHistoryData(window.location.pathname))
                    } else {
                        if (admin) {
                            if (json.user.access_level == 0) {
                                dispatch(getUserdata(json.user));
                                setNav('')
                            } else {
                                dispatch(getUserdata(json.user));
                                setNav('/')
                            }
                            dispatch(getHistoryData(null))
                        } else {
                            console.log('data baru didapaT', loopRender);
                            dispatch(getUserdata(json.user));
                            setNav('')
                            dispatch(getHistoryData(null))
                        }
                    }
                    // if(loopRender === 0){

                    //     loopRender+=1;
                    // }
                    console.log(navigate);
                }).catch(err => {
                    console.log(err);
                    destroyToken(token);
                    setNav('/login')
                    dispatch(getHistoryData(window.location.pathname))
                })
            }).catch(err => {
                console.log(err);
                destroyToken(token);
                setNav('/login')
                dispatch(getHistoryData(window.location.pathname))
            })
        } catch (error) {
            console.log(error);
            setNav('/login')
            dispatch(getHistoryData(window.location.pathname))
        }
        console.log(navigate);
    }, [dispatch])
    console.log(navigate);
    return (
        navigate === null ? <Loading></Loading> : (
            navigate === '' ? children : (active ? <Navigate to={navigate} /> : children)
        )
    )

}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.node.isRequired,
    admin: PropTypes.node.isRequired
}

export { ProtectedRoute };