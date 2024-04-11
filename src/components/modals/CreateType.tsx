import React, { FC, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createType } from '../../http/deviceApi';

type Props = {
    show: boolean,
    onHide: () => void
}

const CreateType: FC<Props> = ({ show, onHide }) => {
    const [value, setValue] = useState<string>('')
    const addType = () => {
        createType({ name: value }).then(data => setValue(''))
        onHide()
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
                    Добавить новый тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={(event) => {
                            setValue(event.target.value)
                        }}
                        placeholder='Введите название типа' />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={() => addType()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}
export { CreateType }