import React, { FC, useEffect, useState } from 'react'
import { Row, Image, Col, Container, Card, Button } from 'react-bootstrap'
import bigStar from '../assert/star.png'
import { TypeDevice } from '../types/types'
import { useParams } from 'react-router-dom'
import { REACT_APP_API_URL } from '../utils/constr'
import { fetchOneDevice } from '../http/deviceApi'

const DevicePage: FC = () => {
    const [device, setDevice] = useState<TypeDevice | null>(null)

    const { id } = useParams()
    fetchOneDevice(Number(id)).then(data => setDevice(data))

    useEffect(() => {

    }, [])

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={REACT_APP_API_URL + device?.img} />
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2>{device?.name}</h2>
                        <div className='d-flex align-items-center justify-content-center'
                            style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}>
                            {device?.rating}</div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className='d-flex flex-column align-items-center justify-content-around'
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}>
                        <h3>От {device?.price} руб.</h3>
                        <Button variant='outline-dark'>Добавить в корзину</Button>
                    </Card>

                </Col>
            </Row>
            <Row class name='d-flex flex-column m-3'>
                <h1>Характеристики</h1>
                {device?.info?.map((info, index) =>
                    <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title}:{info.description}
                    </Row>
                )}
            </Row>
        </Container>
    )
}
export default DevicePage; 