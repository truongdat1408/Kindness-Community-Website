import React, { useEffect } from 'react'
import NavigationBar from '../../components/commons/client/NavigationBar'
import LoadStyleSheet from '../commonFunc/loadStyleSheet'
import UseScript from '../commonFunc/useScript'
import ApplicationConstant from '../../constants/ApplicationConstant'
import LSideBar from './../../components/commons/client/LSideBar';
import CenterContent from './../../components/commons/client/CenterContent';
import RsideBar from './../../components/commons/client/RsideBar';
import { useDispatch, useSelector } from 'react-redux';
import authToken from './../../utils/authToken';
import { getProfile } from '../../services'
//import ReactLoading from 'react-loading';

export default function NewsFeed() {
    const css = ApplicationConstant.link_types.TEXT_CSS

    //const [loading, setLoading] = useState(true);
    
    UseScript('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js')
    //UseScript('/assets/vendor/jquery/dist/jquery.min.js')
    UseScript('/assets/js/main.min.js')
    UseScript('/assets/js/script.js')
    UseScript('/assets/js/map-init.js')

    LoadStyleSheet('/assets/css/main.min.css', css.rel)
    LoadStyleSheet('/assets/css/style.css', css.rel)
    LoadStyleSheet('/assets/css/color.css', css.rel)
    LoadStyleSheet('/assets/css/responsive.css', css.rel)
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            authToken(localStorage.getItem('jwtToken'))
            dispatch(getProfile(user.id))
        }
    }, [dispatch, user.id])

    //setTimeout(() => setLoading(false), 2000)

    return (
        <>
            <div className="theme-layout">
                    <NavigationBar />
                    <section>
                        <div className="gap2 gray-bg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row merged20" id="page-contents">
                                            <LSideBar />
                                            <CenterContent />
                                            <RsideBar />
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
