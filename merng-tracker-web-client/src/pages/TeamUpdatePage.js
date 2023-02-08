import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import { graphql, compose } from 'react-apollo'
import { getTeamQuery } from '../graphql/queries'
import { updateTeamMutation } from '../graphql/mutations'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Card, Columns } from 'react-bulma-components'

const TeamUpdatePage = (props) => {
	const team = props.getTeamQuery.team
    let form = <i>Loading form...</i>

    if (typeof team != 'undefined') {
        form = <TeamUpdateForm team={ team } updateTeamMutation={ props.updateTeamMutation }/>
    }

    const sectionStyle = {
        paddingTop: '15px',
        paddingBottom: '15px'
    }

    return (
        <Section style={ sectionStyle }>
            <Columns>
                <Columns.Column size="half" offset="one-quarter">
                    <Heading>Update Team</Heading>
                    <Card>
                        <Card.Header>
                            <Card.Header.Title>Team Details</Card.Header.Title>
                        </Card.Header>
                        <Card.Content>
                            { form }
                        </Card.Content>
                    </Card>
                </Columns.Column>
            </Columns>
        </Section>
    )
}

const TeamUpdateForm = (props) => {
    const [name, setName] = useState(props.team.name)

    const updateTeam = (e) => {
        e.preventDefault()
        props.updateTeamMutation({
            variables: {
                id: props.team.id,
                name: name,
            }
        }).then((response) => {
            let result = response.data.updateTeam
            if (result) {
                Swal.fire({ 
                    title: 'Team Updated', 
                    text: 'The team has been updated.', 
                    type: 'success' 
                }).then(() => {
                    window.location.href = '/teams'
                })
            } else {
                Swal.fire({ 
                    title: 'Operation Failed', 
                    text: 'The server encountered an error, try again.', 
                    type: 'error' 
                })
            }
        })
    }

    return (
        <form onSubmit={ (e) => updateTeam(e) }>
            Name
            <input className="input" value={ name } onChange={ (e) => setName(e.target.value) } required/><br/><br/>
            <button type="submit" className="button is-success">Update</button>&nbsp;
            <Link to="/teams"><button type="button" className="button is-warning">Cancel</button></Link>
        </form>
    )
}

export default compose(
    graphql(updateTeamMutation, { name: 'updateTeamMutation' }),
    graphql(getTeamQuery, { 
        options: (props) => {
            return { 
                variables: { 
                    id: props.match.params.id 
                } 
            }
        }, 
        name: 'getTeamQuery'
    })
)(TeamUpdatePage)