import React, { useState } from 'react'
import Swal from 'sweetalert2'

import { graphql, compose } from 'react-apollo'
import { getTasksQuery } from '../graphql/queries'
import { addTaskMutation, deleteTaskMutation } from '../graphql/mutations'

import TaskAdd from '../components/TaskAdd'
import TaskList from '../components/TaskList'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Columns } from 'react-bulma-components'

const TaskPage = (props) => {
    const data = props.getTasksQuery

    const addTask = (newTask) => {
        props.addTaskMutation({
            variables: {
                description: newTask.description,
                teamId: newTask.teamId,
            },
            refetchQueries: [{ query: getTasksQuery }]
        })
    }

    const deleteTask = (id) => {
        props.deleteTaskMutation({
            variables: { 
                id: id 
            },
            refetchQueries: [{ query: getTasksQuery }]
        }).then((response) => {
            let result = response.data.deleteTask
            if (result) {
                Swal.fire({ 
                    title: 'Task Deleted', 
                    text: 'The task has been deleted.', 
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
    }

    const sectionStyle = {
        paddingTop: '15px',
        paddingBottom: '15px'
    }

    return (
        <Section style={ sectionStyle }>
            <Heading>Tasks</Heading>
            <Columns>
                <Columns.Column size={ 3 }>
                    <TaskAdd addTask={ addTask }/>
                </Columns.Column>
                <Columns.Column size={ 9 }>
                    <TaskList tasks={ data.tasks } deleteTask={ deleteTask }/>
                </Columns.Column>
            </Columns>
        </Section>
    )
}

export default compose(
    graphql(getTasksQuery, { name: 'getTasksQuery' }),
    graphql(addTaskMutation, { name: 'addTaskMutation' }),
    graphql(deleteTaskMutation, { name: 'deleteTaskMutation' })
)(TaskPage)