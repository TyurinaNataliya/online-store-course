import React, { FC, useContext } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';

import { Type } from '../../types/types';
import { Context } from '../..';



type Props = {
    show: boolean,
    onHide: () => void,
}

const CreateDevice: FC<Props> = ({ show, onHide
}) => {
    const { device } = useContext(Context)

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
                    <Dropdown>
                        <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map((type: Type) =>
                                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
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