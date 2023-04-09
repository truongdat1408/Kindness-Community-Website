import React, { useEffect } from 'react'
import ApplicationConstant from '../../constants/ApplicationConstant'
import authToken from '../../utils/authToken'
import LoadStyleSheet from '../commonFunc/loadStyleSheet'
import UseScript from '../commonFunc/useScript'
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser, getOneUserByUsername, getProfile } from '../../services'
import NavigationBar from '../../components/commons/client/NavigationBar'
import Header from '../../components/commons/client/personal/Header'
import LSideBar from '../../components/commons/client/personal/LSideBar'
import RSideBar from '../../components/commons/client/personal/RSideBar'
import { useParams } from 'react-router-dom'

export default function Personal({ component: Component }) {
    const css = ApplicationConstant.link_types.TEXT_CSS

    UseScript('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js')
    UseScript('/assets/js/main.min.js')
    UseScript('/assets/js/script.js')
    UseScript('/assets/js/map-init.js')

    LoadStyleSheet('/assets/css/main.min.css', css.rel)
    LoadStyleSheet('/assets/css/style.css', css.rel)
    LoadStyleSheet('/assets/css/color.css', css.rel)
    LoadStyleSheet('/assets/css/responsive.css', css.rel)
    const { profile_username } = useParams()

    const dispatch = useDispatch();
    const user_profile = useSelector(state => state.auth.profile);

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            authToken(localStorage.getItem('jwtToken'))
            dispatch(getProfile(user_profile.id))
            if (profile_username){
                console.log("getOneUserByUsername");
                dispatch(getOneUserByUsername(profile_username))
            } else {
                console.log("getOneUser");
            }
        }
    }, [dispatch, profile_username, user_profile.id])

    return (
        <>
            <div className="theme-layout">
                <NavigationBar />
                <Header />
                <section>
                    <div className="gap gray-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row merged20" id="page-contents">
                                        <div className="col-lg-3">
                                            <LSideBar />
                                        </div>
                                        <div className="col-lg-6">
                                            <Component />
                                        </div>
                                        <div className="col-lg-3">
                                            <RSideBar />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
