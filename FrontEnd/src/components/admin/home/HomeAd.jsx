import React, { useEffect, useState } from 'react'
import AdministratorList from './AdministratorList';
import Table from './../../commons/Table';
import { useDispatch, useSelector } from 'react-redux';
import authToken from '../../../utils/authToken'

export default function HomeAd() {
    const users = useSelector(state => state.user.users);
    const columns = [
        { name: "ID", field: "id", sortable: true },
        { name: "USERNAME", field: "username", sortable: true },
        { name: "ROLE", field: "role", sortable: true },
        { name: "ACTIVATION", field: "activation", sortable: false },
        { name: "RECENT ACTIVITY TIME", field: "recentActivityTime", sortable: true },
    ]
    const [filteredData, setFilteredData] = useState(users)

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            authToken(localStorage.getItem('jwtToken'))
        }
        if (users && users.length > 0) {
            //Filter admin and mod
            setFilteredData(users.filter((user) => user.roles.some((role) => role.name === 'ROLE_ADMIN' || role.name === 'ROLE_MOD')))
        }

    }, [dispatch, users])

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <Table name="Administrators"
                        columns={columns}
                        data={filteredData}
                        component={AdministratorList} />
                </div>
            </div>
        </div>
    )
}
