import React, { FC } from "react";
import { Image, Card, Col } from 'react-bootstrap'
import star from '../assert/star.png'
import { useNavigate } from 'react-router-dom';

import { DEVICE_ROUTE, REACT_APP_API_URL } from "../utils/constr";
import { TypeDevice } from "../types/types";

const brandsAll = ["Samsung", "Apple", "Redmi", "LG", "Atlant", "Philips"]

type Props = {
    device: TypeDevice
}

const DeviceItem: FC<Props> = ({ device }) => {

    const navigate = useNavigate()
    return (
        <Col md={3} className="mt-3" onClick={() => {

            navigate(`${DEVICE_ROUTE}/${device.id}`)
        }}>
            <Card style={{ width: 150, cursor: 'pointer' }} border="light">
                <Image width={150} height={150} src={REACT_APP_API_URL + device.img} />
                <div className="text-black-50 
            mt-1 d-flex justify-content-between alidn-items-center">
                    <div>{brandsAll[device.brandId ? device.brandId : 0]}</div>
                    <div className="d-flex alidn-items-center" style={{ alignItems: "center" }}>
                        <div>{device.rating}</div>
                        <Image style={{ width: 18, height: 18 }} src={star} />
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>

    )
}
export { DeviceItem }