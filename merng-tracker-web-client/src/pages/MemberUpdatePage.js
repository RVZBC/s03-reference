import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import { graphql, compose } from 'react-apollo'
import { getMemberQuery, getTeamsQuery } from '../graphql/queries'
import { updateMemberMutation } from '../graphql/mutations'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Card, Columns } from 'react-bulma-components'

const MemberUpdatePage = (props) => {
    const member = props.getMemberQuery.member
    let form = <i>Loading form...</i>

    if (typeof member != 'undefined') {
        form = <MemberUpdateForm teams={ props.getTeamsQuery.teams } member={ member } updateMemberMutation={ props.updateMemberMutation }/>
    }

    const sectionStyle = {
        paddingTop: '15px',
        paddingBottom: '15px'
    }

    return (
        <Section style={ sectionStyle }>
            <Columns>
                <Columns.Column size="half" offset="one-quarter">
                    <Heading>Update Member</Heading>
                    <Card>
                        <Card.Header>
                            <Card.Header.Title>Member Details</Card.Header.Title>
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

const MemberUpdateForm = (props) => {
    const [firstName, setFirstName] = useState(props.member.firstName)
    const [lastName, setLastName] = useState(props.member.lastName)
    const [position, setPosition] = useState(props.member.position)
    const [teamId, setTeamId] = useState(props.member.teamId)

    const populateTeamOptions = () => {
        let teams = props.teams

        if (typeof teams == 'undefined') {
            return <option>Loading teams...</option>
        } else {
            return teams.map((team) => {
                return <option key={ team.id } value={ team.id }>{ team.name }</option>
            })
        }
    }

    const updateMember = (e) => {
        e.preventDefault()
        props.updateMemberMutation({
            variables: {
                id: props.member.id,
                firstName: firstName,
                lastName: lastName,
                position: position,
                teamId: teamId,
            }
        }).then((response) => {
            let result = response.data.updateMember
            if (result) {
                Swal.fire({ 
                    title: 'Member Updated', 
                    text: 'The member has been updated.', 
                    type: 'success' 
                }).then(() => {
                    window.location.href = '/members'
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
        <form onSubmit={ (e) => updateMember(e) }>
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
            <button type="submit" className="button is-success">Update</button>&nbsp;
            <Link to="/members"><button type="button" className="button is-warning">Cancel</button></Link>
        </form>
    )
}

export default compose(
    graphql(updateMemberMutation, { name: 'updateMemberMutation' }),
    graphql(getTeamsQuery, { name: 'getTeamsQuery' }),  
    graphql(getMemberQuery, { 
        options: (props) => {
            return { 
                variables: { 
                    id: props.match.params.id 
                } 
            }
        }, 
        name: 'getMemberQuery'
    })
)(MemberUpdatePage)