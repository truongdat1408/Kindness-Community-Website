import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function GRSideBar() {
    const admin = useSelector(state => state.activity.admin)
    const activity = useSelector(state => state.activity.activity)

    var gapi = window.gapi
    var CLIENT_ID = "548554694523-p3qrg6517ph55shqe6uvsmlv322miv7h.apps.googleusercontent.com"
    var API_KEY = "AIzaSyBf4ujiaow84HZ66UhdGURWo6EP-9X8uAE"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const onClickSyncCalendar = () => {
        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

            console.log(timeZone)

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {
                    var emails = activity.members.filter((mem) => mem.user.email).map((mem) => { return { email: mem.user.email } })
                    var event = {
                        'summary': activity.name,
                        'location': activity.address,
                        'description': activity.desc,
                        'start': {
                            'dateTime': activity.sDate + 'T' + activity.sTime,
                            'timeZone': timeZone
                        },
                        'end': {
                            'dateTime': activity.eDate + 'T' + activity.eTime,
                            'timeZone': timeZone
                        },
                        'recurrence': [
                            'RRULE:FREQ=DAILY;COUNT=1'
                        ],
                        'attendees': emails,
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 }
                            ]
                        }
                    }

                    var request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event,
                    })

                    request.execute(event => {
                        console.log(event)
                        alert("Sync your Google Calendar successfully!")
                        window.open(event.htmlLink)
                    })
                }).catch((error) => {
                    alert("Error: Cannot Sync!")
                })
        })
    }

    return (
        <aside className="sidebar static right">
            <div className="widget">
                <h4 className="widget-title">Activity's Admin</h4>
                <div className="your-page">
                    <figure>
                        <a href="/" title><img alt='' src={admin.avatar_url || "../assets/img/theme/Default-avatar.jpg"} style={{ width: 50, height: 50 }} /></a>
                    </figure>
                    <div className="page-meta">
                        <Link className="underline" to={"/profile/" + admin.username}>
                            {admin.name || admin.username}
                        </Link>
                    </div>
                    <div className="page-likes">
                        <ul className="nav nav-tabs likes-btn">
                            <li className="nav-item"><a className="active" href="#link1" data-toggle="tab">Activity points</a></li>
                            <li className="nav-item"><a className href="#link2" data-toggle="tab">Reputation</a></li>
                        </ul>
                        {/* Tab panes */}
                        <div className="tab-content">
                            <div className="tab-pane active fade show " id="link1">
                                <span><i className="ti-heart" />{admin.acp || "0"}</span>
                            </div>
                            <div className="tab-pane fade" id="link2">
                                <span><i className="ti-heart" />{admin.rep || "0"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/* page like widget */}
            <div className="widget stick-widget">
                <h4 className="widget-title">Activity's Time</h4>
                <ul className="short-profile">
                    <li>
                        <span>Start Time</span>
                        <p>{activity.sDate} at {activity.sTime}</p>
                        <span>End Time</span>
                        <p>{activity.eDate} at {activity.eTime}</p>
                        <button type="button" className='btn btn-primary btn-sm' onClick={(e) => { onClickSyncCalendar() }}>Sync with Google Calendar</button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
