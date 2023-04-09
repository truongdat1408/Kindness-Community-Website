import React from 'react'

export default function FullPageLoader() {
    return (
        <div class="loader-container">
            <div className="loader">
                <img src={"../assets/img/loader.gif"} alt='Loading...'/>
            </div>
        </div>
    )
}
