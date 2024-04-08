import React, { FC, useContext } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import { SHOP_ROUTE } from '../utils/constr'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';

const NavBar: FC = observer(
    () => {
        const { user } = useContext(Context)
        return (
            <Navbar className="bg-body-tertiary mb-3" bg="dark" data-bs-theme="dark">
                <Container >
                    <Navbar.Brand href={SHOP_ROUTE}>КупиCебеДевайс</Navbar.Brand>

                    {user.isAuth ?
                        <Nav className="ml-auto">
                            <Button variant="outline-light" className="m-2">Админ панель</Button>{' '}
                            <Button variant="outline-light" className="m-2" >Войти</Button>
                        </Nav> :
                        <Nav className="ml-auto">
                            <Button variant="outline-light" className="m-2" onClick={() => user.setIsAuth(true)}>Авторизация</Button>
                        </Nav>
                    }

                </Container>
            </Navbar>

        )
    })

export default NavBar