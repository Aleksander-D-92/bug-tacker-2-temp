import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import axios from "axios";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Table} from "antd";
import {usersTableColumns} from "./variables";
import {UserDetails} from "../../shared/Interfaces";


function AdminUsersTable() {
    const [allUsers, setAllUsers] = useState<UserDetails[]>([]);
    let reduxState = useSelector((state: ReduxState) => state);
    useEffect(() => {
        axios.get('/users?action=all').then((e) => {
            setAllUsers(e.data);
        })
    }, [])


    return (
        <div>
            <Table dataSource={allUsers}
                   columns={usersTableColumns}
                   pagination={{total: allUsers.length}}
                   bordered={true}/>
        </div>
    )
}

export {AdminUsersTable}