import React, { FC, useContext, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';

import { Brand, Type, TypeDeviceInfo } from '../../types/types';
import { Context } from '../..';



type Props = {
    show: boolean,
    onHide: () => void,
}

const CreateDevice: FC<Props> = ({ show, onHide
}) => {
    const { device } = useContext(Context)
    const [info, setInfo] = useState<TypeDeviceInfo[]>([])

    const addInfo = () => {
        setInfo([...info, {
            title: '', description: '', number: Date.now()
        }])
    }
    const removeInfo = (number: number) => {
        setInfo(info.filter(i => i.number !== number
        ))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новое устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt=2 mb-2'>
                        <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map((type: Type) =>
                                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt=2 mb-2'>
                        <Dropdown.Toggle>Выберите бренд</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand: Brand) =>
                                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите название устройства' />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите стоимость устройства'
                        type='number' />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите название устройства'
                        type='file' />
                    <hr />
                    <Button
                        className='mt-3'
                        variant='outline-dark'
                        onClick={addInfo}>
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row
                            className='mt-2' key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    placeholder='Введите название характеристики' />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder='Введите описание характеристики' />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant='outline-danger'>Удалить</Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}
export { CreateDevice }