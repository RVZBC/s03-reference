import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import { graphql, compose } from 'react-apollo'
import { getTaskQuery, getTeamsQuery } from '../graphql/queries'
import { updateTaskMutation } from '../graphql/mutations'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Card, Columns } from 'react-bulma-components'

const TaskUpdatePage = (props) => {
	const task = props.getTaskQuery.task
    let form = <i>Loading form...</i>

    if (typeof task != 'undefined') {
        form = <TaskUpdateForm teams={ props.getTeamsQuery.teams } task={ task } updateTaskMutation={ props.updateTaskMutation }/>
    }

    const sectionStyle = {
        paddingTop: '15px',
        paddingBottom: '15px'
    }

    return (
        <Section style={ sectionStyle }>
            <Columns>
                <Columns.Column size="half" offset="one-quarter">
                    <Heading>Update Task</Heading>
                    <Card>
                        <Card.Header>
                            <Card.Header.Title>Task Details</Card.Header.Title>
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

const TaskUpdateForm = (props) => {
    const [description, setDescription] = useState(props.task.description)
    const [teamId, setTeamId] = useState(props.task.teamId)

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

    const updateTask = (e) => {
        e.preventDefault()
        props.updateTaskMutation({
            variables: {
                id: props.task.id,
                description: description,
                teamId: teamId,
            }
        }).then((response) => {
            let result = response.data.updateTask
            if (result) {
                Swal.fire({ 
                    title: 'Task Updated', 
                    text: 'The task has been updated.', 
                    type: 'success' 
                }).then(() => {
                    window.location.href = '/tasks'
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
        <form onSubmit={ (e) => updateTask(e) }>
            Description
            <input className="input" value={ description } onChange={ (e) => setDescription(e.target.value) } required/><br/><br/>
            Team
            <div className="select is-fullwidth">
                <select value={ teamId } onChange={ (e) => setTeamId(e.target.value) } required>
                    <option value selected disabled>Select Team</option>
                    { populateTeamOptions() }
                </select>
            </div><br/><br/>
            <button type="submit" className="button is-success">Update</button>&nbsp;
            <Link to="/tasks"><button type="button" className="button is-warning">Cancel</button></Link>
        </form>
    )
}

export default compose(
    graphql(updateTaskMutation, { name: 'updateTaskMutation' }),
    graphql(getTeamsQuery, { name: 'getTeamsQuery' }),  
    graphql(getTaskQuery, { 
        options: (props) => {
            return { 
                variables: { 
                    id: props.match.params.id 
                } 
            }
        }, 
        name: 'getTaskQuery'
    })
)(TaskUpdatePage)