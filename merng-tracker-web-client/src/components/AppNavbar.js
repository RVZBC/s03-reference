import React from 'react'
import { Link } from "react-router-dom"

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Navbar } from 'react-bulma-components'

const AppNavbar = (props) => {
    return (
        <Navbar className="is-black">
            <Navbar.Brand>
                <Navbar.Item>
                    <strong>MERNG Tracker</strong>
                </Navbar.Item>
                <Navbar.Burger/>
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container>
                    <Navbar.Item>
                        <Link className="has-text-white" to="/members">
                            Members
                        </Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Link className="has-text-white" to="/teams">
                            Teams
                        </Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Link className="has-text-white" to="/tasks">
                            Tasks
                        </Link>
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    )
}

export default AppNavbar