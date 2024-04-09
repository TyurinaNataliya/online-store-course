import React, { FC, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { CreateBrand } from '../components/modals/CreateBrand'
import { CreateType } from '../components/modals/CreateType'
import { CreateDevice } from '../components/modals/CreateDevice'

const Admin: FC = () => {
    const [brandVisible, setBrandVisible] = useState<boolean>(false)
    const [typeVisible, setTypeVisible] = useState<boolean>(false)
    const [deviceVisible, setDeviceVisible] = useState<boolean>(false)
    const onHideBrand = () => {
        setBrandVisible(false)
    }
    const onHideType = () => {
        setTypeVisible(false)
    }
    const onHideDevice = () => {
        setDeviceVisible(false)
    }

    return (
        <Container className='d-flex flex-column'>
            <Button variant='outline-dark' className='mt-2' onClick={() => setTypeVisible(true)}> Добавить тип</Button>
            <Button variant='outline-dark' className='mt-2' onClick={() => setBrandVisible(true)}> Добавить бренд</Button>
            <Button variant='outline-dark' className='mt-2' onClick={() => setDeviceVisible(true)}> Добавить устройство</Button>
            <CreateBrand show={brandVisible} onHide={() => onHideBrand()} />
            <CreateType show={typeVisible} onHide={() => onHideType()} />
            <CreateDevice show={deviceVisible} onHide={() => onHideDevice()} />
        </Container>
    )
}

export default Admin