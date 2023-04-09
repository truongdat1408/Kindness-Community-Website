import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import authToken from './../../../utils/authToken';
import Table from './../../commons/Table';
import UserList from './UserList';
import { fetchUsers } from './../../../services/user/userAction';
import CreateUserModal from './CreateUserModal';

export default function UserAd() {
    const users = useSelector(state => state.user.users);
    const modal = useRef();
    const columns = [
        { name: "ID", field: "id", sortable: true },
        { name: "USERNAME", field: "username", sortable: true },
        { name: "NAME", field: "name", sortable: true },
        { name: "EMAIL", field: "email", sortable: true },
        { name: "CREATED AT", field: "createdAt", sortable: true },
        { name: "ACTIVATED STATUS TIME", field: "activeStatusTime", sortable: true },
        { name: "RECENT ACTIVITY TIME", field: "recentActivityTime", sortable: true },
        { name: "SIGNIN ORGANIZATION", field: "isOrg", sortable: true },
        { name: "CONFIRM ORGANIZATION", field: "isConfirmedOrg", sortable: true },
    ]
    const dispatch = useDispatch();

    if (localStorage.getItem('jwtToken')) {
        authToken(localStorage.getItem('jwtToken'))
    }

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <div className="row">
            
            <div className="col-xl-12">
                <div className="card">
                    <CreateUserModal ref={modal} />
                    <div className="col-2 ml-auto mt-2">
                        <button className="btn btn-icon btn-primary rounded-pill" onClick={() => modal.current.handleShow()}>
                            <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                            <span className="btn-inner--text">New User</span>
                        </button>
                    </div>
                    <Table name="Users"
                        columns={columns}
                        data={users}
                        component={UserList}
                        hasNewBtn={true} />
                    {/* Modal for create  */}

                </div>
            </div>
        </div>
    )
}
