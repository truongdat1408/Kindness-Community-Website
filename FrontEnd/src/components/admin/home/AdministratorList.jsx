import React from 'react'
import changeTimeFormat from '../../../pages/commonFunc/changeTimeFormat'

export default function AdministratorList({ data }) {
    const loading = (
        <td className='ml-4 mt-3'>Loading...</td>
    )

    const checkAdmin = () => {
        if (data && data.length > 0) {
            //Filter admin and mod
            let filteredData = data.filter((user) => user.roles.some((role) => role.name === 'ROLE_ADMIN' || role.name === 'ROLE_MOD'))
            //load components
            return filteredData.map(usr => {
                // let isAdmin = usr.roles.some((role) => role.name === 'ROLE_ADMIN');
                let roles = usr.roles.filter((role) => role.name === 'ROLE_ADMIN' || role.name === 'ROLE_MOD');
                let showRole = roles.map((role) => {
                    if (role.name === 'ROLE_ADMIN') {
                        return 'ADMIN'
                    }
                    return 'MODERATOR'
                }
                ).join("/")

                return (<tr key={usr.id}>
                    <td>{usr.id}</td>
                    <th scope="row">{usr.username}</th>
                    <th>{showRole}</th>
                    <td>{
                        (usr.isActivated ?
                            <span class="badge badge-dot mr-4">
                                <i class="bg-success"></i>
                                <span class="status">Yes</span>
                            </span>
                            :
                            <span class="badge badge-dot mr-4">
                                <i class="bg-danger"></i>
                                <span class="status">No</span>
                            </span>)
                    }
                    </td>
                    <td>{changeTimeFormat(usr.recentActivityTime)}</td>
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
