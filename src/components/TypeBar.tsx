import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react'
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';



const TypeBar: FC = observer(() => {
    const { device } = useContext(Context)
    return (
        <ListGroup>
            {device.types.map((type: any) =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}>
                    {type.name}
                </ListGroup.Item>
            )}

        </ListGroup>
    )
})
export default TypeBar;