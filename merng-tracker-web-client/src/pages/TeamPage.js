import React, { useState } from 'react'
import Swal from 'sweetalert2'

import { graphql, compose, withApollo } from 'react-apollo'
import { getTeamsQuery, getTeamReferenceQuery } from '../graphql/queries'
import { addTeamMutation, deleteTeamMutation } from '../graphql/mutations'

import TeamAdd from '../components/TeamAdd'
import TeamList from '../components/TeamList'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Columns } from 'react-bulma-components'

const TeamPage = (props) => {
    const teams = props.getTeamsQuery.teams

    const addTeam = (name) => {
        props.addTeamMutation({
            variables: {
                name: name
            },
            refetchQueries: [{ query: getTeamsQuery }]
        })
    }

    const deleteTeam = (id) => {
        props.client.query({
            query: getTeamReferenceQuery,   
            variables: {
                id: id
            }
        }).then((response) => {
            const team = response.data.team
            const hasNoMembers = (team.members.length == 0)
            const hasNoTasks = team.tasks.length == 0

            if (hasNoMembers && hasNoTasks) {
                props.deleteTeamMutation({
                    variables: { 
                        id: id 
                    },
                    refetchQueries: [{ query: getTeamsQuery }]
                }).then((response) => {
                    let result = response.data.deleteTeam
                    if (result) {
                        Swal.fire({ 
                            title: 'Team Deleted', 
                            text: 'The team has been deleted.', 
                            type: 'success' 
                        })
                    } else {
                        Swal.fire({ 
                            title: 'Operation Failed', 
                            text: 'The server encountered an error, try again.', 
                            type: 'error' 
                        })
                    }
                })
            } else {
                Swal.fire({ 
                    title: 'Cannot remove team.', 
                    text: 'The team still has members and/or tasks.', 
                    type: 'error' 
                })
            }
        })
    }

    const sectionStyle = {
        paddingTop: '15px',
        paddingBottom: '15px'
    }

    return (
        <Section style={ sectionStyle }>
            <Heading>Teams</Heading>
            <Columns>
                <Columns.Column size={ 3 }>
                    <TeamAdd addTeam={ addTeam }/>
                </Columns.Column>
                <Columns.Column size={ 9 }>
                    <TeamList teams={ teams } deleteTeam={ deleteTeam }/>
                </Columns.Column>
            </Columns>
        </Section>
    )
}

export default compose(
    graphql(addTeamMutation, { name: 'addTeamMutation' }),
    graphql(deleteTeamMutation, { name: 'deleteTeamMutation' }),
    graphql(getTeamsQuery, { name: 'getTeamsQuery' }),
)(withApollo(TeamPage))