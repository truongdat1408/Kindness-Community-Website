import React, { useEffect } from 'react';
import NavigationBar from '../../components/commons/client/NavigationBar';
import authToken from '../../utils/authToken';
import GHeader from './../../components/commons/client/group/GHeader';
import GLSideBar from './../../components/commons/client/group/GLSideBar';
import GRSideBar from './../../components/commons/client/group/GRSideBar';
import ApplicationConstant from './../../constants/ApplicationConstant';
import LoadStyleSheet from './../commonFunc/loadStyleSheet';
import UseScript from './../commonFunc/useScript';
import { useDispatch, useSelector } from 'react-redux';
import { getActivity, getMembersByActivityId, getProfile, getWaitMembersByActivityId, getAllPostsJoinned, fetchActivites } from '../../services';
import { useParams } from 'react-router-dom';
import { getAllByActivityId } from './../../services/post/postAction';

export default function Group({ component: Component }) {
    const css = ApplicationConstant.link_types.TEXT_CSS
    const { id } = useParams()
    const profile = useSelector(state => state.auth.profile)

    UseScript('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js')
    UseScript('/assets/js/main.min.js')
    UseScript('/assets/js/script.js')
    UseScript('/assets/js/map-init.js')

    LoadStyleSheet('/assets/css/main.min.css', css.rel)
    LoadStyleSheet('/assets/css/style.css', css.rel)
    LoadStyleSheet('/assets/css/color.css', css.rel)
    LoadStyleSheet('/assets/css/responsive.css', css.rel)

    const dispatch = useDispatch()

    useEffect(() => {
        //dispatch(fetchActivites())
        dispatch(getActivity(id))
        dispatch(getAllByActivityId(id))
        dispatch(getMembersByActivityId(id))
        dispatch(getWaitMembersByActivityId(id))
        //dispatch(getAllPostsJoinned(profile.id))
        dispatch(getProfile(profile.id))
        if (localStorage.getItem('jwtToken')) {
            authToken(localStorage.getItem('jwtToken'))
        }
    }, [dispatch, id, profile.id])

    return (
        <>
            <div className="theme-layout">
                <NavigationBar />
                <GHeader />
                <section>
                    <div className="gap gray-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row merged20" id="page-contents">
                                        <div className="col-lg-3">
                                            <GLSideBar />
                                        </div>
                                        <div className="col-lg-6">
                                            <Component />
                                        </div>
                                        <div className="col-lg-3">
                                            <GRSideBar />
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
