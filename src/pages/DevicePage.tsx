import React, { FC } from 'react'
import { Row, Image, Col, Container } from 'react-bootstrap'
import bigStar from '../assert/star.png'

const DevicePage: FC = () => {
    const device = { id: 1, name: "10pro", price: 25000, img: "https://ir.ozone.ru/s3/multimedia-0/wc1000/6808978188.jpg", rating: 5 }
    return (
        <Container>
            <Col md={4}>
                <Image width={300} height={300} src={device.img} />
            </Col>
            <Col md={4}>
                <Row className='d-flex flex-column align-items-center'>
                    <h2>{device.name}</h2>
                    <div className='d-flex align-items-center justify-content-center'
                        style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover' }}>
                        {device.rating}</div>
                </Row>
            </Col>
            <Col md={4}>
            </Col>
        </Container>
    )
}
export default DevicePage; 