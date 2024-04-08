import React, { FC } from "react";
import { Image, Card, Col } from 'react-bootstrap'
import star from '../assert/star.png'
import { useNavigate } from 'react-router-dom';

import { DEVICE_ROUTE } from "../utils/constr";

type Props = {
    device: {
        id: number;
        img: string;
        rating: number;
        name: string
    };
}

const DeviceItem: FC<Props> = ({ device }) => {

    const navigate = useNavigate()
    return (
        <Col md={3} className="mt-3" onClick={() => {

            navigate(`${DEVICE_ROUTE}/${device.id}`)
        }}>
            <Card style={{ width: 150, cursor: 'pointer' }} border="light">
                <Image width={150} height={150} src={device.img} />
                <div className="text-black-50 
            mt-1 d-flex justify-content-between alidn-items-center">
                    <div>Samsung..</div>
                    <div className="d-flex alidn-items-center">
                        <div>{device.rating}</div>
                        <Image style={{ width: 23, height: 23 }} src={star} />
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>

    )
}
export { DeviceItem }