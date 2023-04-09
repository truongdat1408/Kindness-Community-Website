import React from 'react'
import ApplicationConstant from '../../constants/ApplicationConstant'

export default function Footer() {
    const guestLinks = (
        <footer className="py-5" id="footer-main">
            <div className="container">
                <div className="row align-items-center justify-content-xl-between">
                    <div className="col-xl-6">
                        <div className="copyright text-center text-xl-left text-muted">
                            © 2021 <a href="https://www.facebook.com/truonggdat" rel="noreferrer" className="font-weight-bold ml-1" target="_blank">@TruongCongDat</a>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                            <li className="nav-item">
                                <a href="https://www.facebook.com/truonggdat" rel='noreferrer' className="nav-link" target="_blank">Final Year Project</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://www.facebook.com/truonggdat" rel='noreferrer' className="nav-link" target="_blank">About Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )

    const adminLinks = (
        <footer className="footer pt-0">
            <div className="row align-items-center justify-content-lg-between">
                <div className="col-lg-6">
                    <div className="copyright text-center  text-lg-left  text-muted">
                        © 2021 <a href="https://www.facebook.com/truonggdat" rel='noreferrer' className="font-weight-bold ml-1" target="_blank">TruongCongDat</a>
                    </div>
                </div>
                <div className="col-lg-6">
                    <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                        <li className="nav-item">
                            <a href="https://www.facebook.com/truonggdat" rel='noreferrer' className="nav-link" target="_blank">Final Year Project</a>
                        </li>
                        <li className="nav-item">
                            <a href="https://www.facebook.com/truonggdat" rel='noreferrer' className="nav-link" target="_blank">About Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )

    function SwitchCase() {
        const urls = ApplicationConstant.urls
        switch (window.location.pathname) {
            case urls.ADHOME:
            case urls.USERS:
            case urls.PROFILE:
                return adminLinks;
            case urls.LOGIN:
            case urls.REGISTER:
            default:
                return guestLinks;
        }
    }
    return (
        <>
            {SwitchCase()}
        </>
    )
}
