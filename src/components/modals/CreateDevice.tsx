import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';

import { Brand, Type, TypeDeviceInfo } from '../../types/types';
import { Context } from '../..';
import { createDevice, fetchBrand, fetchTypes } from '../../http/deviceApi';
import { observer } from 'mobx-react-lite';



type Props = {
    show: boolean,
    onHide: () => void,
}

const CreateDevice: FC<Props> = observer(({ show, onHide
}) => {
    const { device } = useContext(Context)
    const [info, setInfo] = useState<TypeDeviceInfo[]>([])

    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [file, setFile] = useState<any>(null)

    const changeInfo = (key: any, value: string, number: number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }


    const addInfo = () => {
        setInfo([...info, {
            title: '', description: '', number: Date.now()
        }])
    }
    const removeInfo = (number: number) => {
        setInfo(info.filter(i => i.number !== number
        ))
    }
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrands(data))
    }, [device])



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
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map((type: Type) =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}>
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt=2 mb-2'>
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand: Brand) =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}>
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder='Введите название устройства' />
                    <Form.Control
                        className='mt-3'
                        value={price}
                        onChange={(event) => setPrice(Number(event.target.value))}
                        placeholder='Введите стоимость устройства'
                        type='number' />
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setFile(event.target.files ? event.target.files[0] : null)} />
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
                                    value={i.title}
                                    onChange={(event) => changeInfo('title', event.target.value, i.number)}
                                    placeholder='Введите название характеристики' />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(event) => changeInfo('description', event.target.value, i.number)}
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
                <Button variant='outline-success' onClick={() => addDevice()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}
)
export { CreateDevice }