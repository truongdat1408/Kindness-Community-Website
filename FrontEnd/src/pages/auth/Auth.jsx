import React, { useState } from 'react'
import NavigationBar from '../../components/commons/NavigationBar';
import Footer from '../../components/commons/Footer';
import useBodyClass from './../commonFunc/useBodyClass';
import LoadStyleSheet from './../commonFunc/loadStyleSheet';
import ApplicationConstant from '../../constants/ApplicationConstant';
import UseScript from '../commonFunc/useScript';
//import useScript from 'react-script-hook';
import ReactLoading from 'react-loading';

export default function Auth({ component: Component }) {
    const css = ApplicationConstant.link_types.TEXT_CSS
    LoadStyleSheet('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700', css.rel)
    // Icon 
    LoadStyleSheet('/assets/vendor/nucleo/css/nucleo.css', css.rel, css.type)
    LoadStyleSheet('/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css', css.rel, css.type)
    // Argon CSS
    LoadStyleSheet('/assets/css/argon.css?v=1.2.0', css.rel, css.type)
    LoadStyleSheet('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css', css.rel)

    const [loading, setLoading] = useState(true);

    UseScript('/assets/vendor/jquery/dist/jquery.min.js')
    UseScript('/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js')
    UseScript('/assets/vendor/js-cookie/js.cookie.js')
    UseScript('/assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js')
    UseScript('/assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js')
    UseScript('/assets/js/argon.js?v=1.2.0')

    setTimeout(() => setLoading(false), 2000)

    useBodyClass('bg-default')
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
                    <NavigationBar />
                    <Component />
                    <Footer />
                </>)
            }
        </>
    )
}
