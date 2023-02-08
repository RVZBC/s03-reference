import React, { useState } from 'react'
import Swal from 'sweetalert2'

import { graphql } from 'react-apollo'
import { getTeamsQuery } from '../graphql/queries'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Card } from 'react-bulma-components'

const MemberAdd = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [position, setPosition] = useState('')
    const [teamId, setTeamId] = useState(undefined)

    const populateTeamOptions = () => {
        let data = props.data

        if (data.loading) {
            return <option>Loading teams...</option>
        } else {
            return data.teams.map((team) => {
                return <option key={ team.id } value={ team.id }>{ team.name }</option>
            })
        }
    }

    const addMember = (e) => {
        e.preventDefault()

        const newMember = {
            firstName: firstName,
            lastName: lastName,
            position: position,
            teamId: teamId
        }

        setFirstName('')
        setLastName('')
        setPosition('')
        setTeamId(undefined)

        props.addMember(newMember)
        Swal.fire({ 
            title: 'Member Added', 
            text: 'The member has been added.', 
            type: 'success' 
        })
    }

    return (
        <Card>
            <Card.Header>
                <Card.Header.Title>Add Member</Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <form onSubmit={ (e) => addMember(e) }>
                    First Name
                    <input className="input" value={ firstName } onChange={ (e) => setFirstName(e.target.value) } required/><br/><br/>
                    Last Name
                    <input className="input" value={ lastName } onChange={ (e) => setLastName(e.target.value) } required/><br/><br/>
                    Position Name
                    <input className="input" value={ position } onChange={ (e) => setPosition(e.target.value) } required/><br/><br/>
                    Team
                    <div className="select is-fullwidth">
                        <select value={ teamId } onChange={ (e) => setTeamId(e.target.value) } required>
                            <option value selected disabled>Select Team</option>
                            { populateTeamOptions() }
                        </select>
                    </div><br/><br/>
                    <button type="submit" className="button is-success">Add</button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default graphql(getTeamsQuery)(MemberAdd)