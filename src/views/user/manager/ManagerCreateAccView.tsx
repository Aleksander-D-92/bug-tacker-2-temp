import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from 'react-redux';
import {Col, Form, Row} from "antd";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Authority} from "../../shared/Interfaces";
import {ManagerCreateAcc} from "./ManagetCreateAcc";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";

function ManagerCreateAccView() {
    const state = useSelector((state: ReduxState) => state);
    const [authorities, setAuthorities] = useState<Authority[]>();
    const [loadingAuthorities, setLoadingAuthorities] = useState<boolean>(true);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const managerId = state.userDetails.id;
    useEffect(() => {
        axios.get(`/authorities/all`).then((e) => {
            setAuthorities(e.data);
            setLoadingAuthorities(false)
        });
    }, [])

    function onFinish(e: any) {
        setButtonLoading(true)
        const data = {
            username: e.username,
            password: e.password,
            confirmPassword: e.confirmPassword,
            authorityId: e.authorityId
        };
        axios.post(`/users/register/manager/${managerId}`, data).then((e) => {
            form.setFieldsValue({
                'username': '',
                'password': '',
                'confirmPassword': '',
                'authorityId': '',
            })
            setButtonLoading(false)
        }).catch(() => {
            setButtonLoading(false)
        })
    }

    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={14}>
                    <ManagerCreateAcc authorities={authorities}
                                      onFinish={onFinish}
                                      form={form}
                                      buttonLoading={buttonLoading}
                                      loadingAuthorities={loadingAuthorities}/>
                </Col>
            </Row>
        </motion.div>
    )
}

export {ManagerCreateAccView}
