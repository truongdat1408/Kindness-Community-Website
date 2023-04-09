import React from 'react'
import changeTimeFormat from '../../../pages/commonFunc/changeTimeFormat'

export default function UserList({ data }) {
    const loading = (
        <td className='ml-4 mt-3'>Loading...</td>
    )

    const checkAdmin = () => {
        if (data && data.length > 0) {
            //load components
            return data.map(usr => {
                // let isAdmin = usr.roles.some((role) => role.name === 'ROLE_ADMIN');
                // // admin user
                // let showRole = usr.roles.map((role) => role.name).join("/")

                return (<tr key={usr.id}>
                    <th scope="row">{usr.id}</th>
                    <th scope="row">{usr.username}</th>
                    <td>{usr.name}</td>
                    <td>{usr.email}</td>
                    <td>{changeTimeFormat(usr.createdAt)}</td>
                    {/* <th>{showRole}</th>
                    <td>
                    {
                        isAdmin ? null : (usr.isActivated ?
                            <button type="button" className="btn btn-success">Activated</button> :
                            <button type="button" className="btn btn-danger">Non-Activate</button>)
                    }
                    </td> */}
                    <td>{changeTimeFormat(usr.activeStatusTime)}</td>
                    <td>{changeTimeFormat(usr.recentActivityTime)}</td>
                    <td>{usr.isOrg ?
                        <span class="badge badge-dot mr-4">
                            <i class="bg-success"></i>
                            <span class="status">Yes</span>
                        </span>
                        :
                        <span class="badge badge-dot mr-4">
                            <i class="bg-danger"></i>
                            <span class="status">No</span>
                        </span>
                    }
                    </td>
                    <td>{usr.isConfirmedOrg ?
                        <span class="badge badge-dot mr-4">
                            <i class="bg-success"></i>
                            <span class="status">Yes</span>
                        </span>
                        :
                        <span class="badge badge-dot mr-4">
                            <i class="bg-danger"></i>
                            <span class="status">No</span>
                        </span>
                    }</td>
                </tr>)
            })
        } else {
            return loading
        }

    }
    return (
        <>
            {
                checkAdmin()
            }
        </>
    )
}
