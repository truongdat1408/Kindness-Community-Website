import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchTop from '../../components/client/search/SearchTop'
import LSideBar from '../../components/commons/client/LSideBar'
import NavigationBar from '../../components/commons/client/NavigationBar'
import ApplicationConstant from '../../constants/ApplicationConstant'
import { fetchActivites, getAllPosts, getProfile } from '../../services'
import authToken from '../../utils/authToken'
import LoadStyleSheet from '../commonFunc/loadStyleSheet'
import UseScript from '../commonFunc/useScript'
import { getAllPostsJoinned } from './../../services/post/postAction';

export default function SearchResults() {
    const css = ApplicationConstant.link_types.TEXT_CSS
    const profile = useSelector(state => state.auth.profile)
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

    // if (localStorage.getItem('jwtToken')) {
    //     authToken(localStorage.getItem('jwtToken'))
    //     dispatch(getProfile(user.id))
    //     dispatch(getAllPosts())
    //     dispatch(getAllPostsJoinned(profile.id))
    //     dispatch(fetchActivites())
    // }

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            authToken(localStorage.getItem('jwtToken'))
            dispatch(fetchActivites())
            dispatch(getProfile(user.id))
            dispatch(getAllPosts())
            dispatch(getAllPostsJoinned(profile.id))
        }
    }, [dispatch, profile.id, user.id])
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
                                        <SearchTop />
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
