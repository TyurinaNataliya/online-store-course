import React, { FC } from 'react'
import { Row, Image, Col, Container, Card, Button } from 'react-bootstrap'
import bigStar from '../assert/star.png'

const DevicePage: FC = () => {
    const device = { id: 1, name: "10pro", price: 25000, img: "https://ir.ozone.ru/s3/multimedia-0/wc1000/6808978188.jpg", rating: 5 }
    const description = [
        { id: 1, title: 'Количество ядер', description: '4' },
        { id: 2, title: 'Оперативная память', description: '12 гб' },
        { id: 3, title: 'Процессор', description: 'Пентиум 3' },
        { id: 4, title: 'Камера', description: '12 мп' },
        { id: 5, title: 'Аккумулятор', description: '4000' },

    ]

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img} />
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
                        <div className='d-flex align-items-center justify-content-center'
                            style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}>
                            {device.rating}</div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className='d-flex flex-column align-items-center justify-content-around'
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}>
                        <h3>От {device.price} руб.</h3>
                        <Button variant='outline-dark'>Добавить в корзину</Button>
                    </Card>

                </Col>
            </Row>
            <Row class name='d-flex flex-column m-3'>
                <h1>Характеристики</h1>
                {description.map((info, index) =>
                    <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title}:{info.description}
                    </Row>
                )}
            </Row>
        </Container>
    )
}
export default DevicePage; 