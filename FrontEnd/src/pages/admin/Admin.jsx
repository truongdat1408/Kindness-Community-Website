import React, { useEffect, useState } from 'react'
import NavigationBar from '../../components/commons/NavigationBar';
import Footer from './../../components/commons/Footer';
import SideBar from './../../components/commons/SideBar';
import Header from './../../components/commons/Header';
import authToken from '../../utils/authToken';
import UseScript from '../commonFunc/useScript';
import LoadStyleSheet from './../commonFunc/loadStyleSheet';
import ApplicationConstant from '../../constants/ApplicationConstant';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, fetchUsers } from '../../services/index';
import ReactLoading from 'react-loading';

export default function Admin({ component: Component }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const css = ApplicationConstant.link_types.TEXT_CSS
    const img = ApplicationConstant.link_types.IMG_ICON

    const [loading, setLoading] = useState(true);


    LoadStyleSheet('/assets/img/brand/favicon.png', img.rel, img.type)
    // Icon 
    LoadStyleSheet('/assets/vendor/nucleo/css/nucleo.css', css.rel, css.type)
    LoadStyleSheet('/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css', css.rel, css.type)
    // Argon CSS
    LoadStyleSheet('/assets/css/argon.css?v=1.2.0', css.rel, css.type)
    LoadStyleSheet('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css', css.rel)
    LoadStyleSheet('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700', css.rel)

    UseScript('/assets/vendor/jquery/dist/jquery.min.js')
    UseScript('/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js')
    UseScript('/assets/vendor/js-cookie/js.cookie.js')
    UseScript('/assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js')
    UseScript('/assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js')

    setTimeout(() => setLoading(false), 2000)


    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            authToken(localStorage.getItem('jwtToken'))
            dispatch(fetchUsers())
            dispatch(getProfile(user.id))
        }
    }, [dispatch, user.id])

    return (
        <>
            {loading ?
                (
                    <div className='d-flex justify-content-center'>
                        <ReactLoading
                            type={"bubbles"}
                            color={"#7A62E4"}
                            height={100}
                            width={100}
                        />
                    </div>
                )
                :
                (<>
                    <SideBar />
                    <div className="main-content" id="panel">
                        <NavigationBar />
                        <Header />
                        <div className='container-fluid mt--6'>
                            <Component />
                            <Footer />
                        </div>
                    </div>
                </>)
            }
        </>
    )
}
