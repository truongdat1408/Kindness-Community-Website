import React from 'react'
import useBodyClass from '../../pages/commonFunc/useBodyClass';
import Footer from './Footer';
import LoadStyleSheet from '../../pages/commonFunc/loadStyleSheet';
import ApplicationConstant from '../../constants/ApplicationConstant';
import UseScript from '../../pages/commonFunc/useScript';

export default function Error404() {
    const css = ApplicationConstant.link_types.TEXT_CSS
    const img = ApplicationConstant.link_types.IMG_ICON

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

    useBodyClass('bg-default')
    return (
        <>
            <nav id="navbar-main" class="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
                <div class="container">
                    <a class="navbar-brand" href="/admin">
                        <img src="../assets/img/brand/white.png" alt="" />
                    </a>
                    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon">
                        </span>
                    </button>
                    <div class="navbar-collapse navbar-custom-collapse collapse" id="navbar-collapse">
                        <div class="navbar-collapse-header"><div class="row">
                            <div class="col-6 collapse-brand"><a href="dashboard.html">
                                <img src="../assets/img/brand/blue.png" alt="" /></a>
                            </div>
                            <div class="col-6 collapse-close">
                                <button type="button" class="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="main-content">
                <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div class="container mt-7">
                        <div class="header-body text-center mb-7">
                            <div class="row justify-content-center">
                                <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 class="text-white display-1">:( ERROR 404</h1>
                                    <p class="text-lead text-white">This page is not found. Please check url again.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="separator separator-bottom separator-skew zindex-100">
                        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon class="fill-default" points="2560 0 2560 100 0 100">
                            </polygon>
                        </svg>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}
