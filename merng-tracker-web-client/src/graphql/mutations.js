import { gql } from 'apollo-boost'

const addTaskMutation = gql`
    mutation ($description: String!, $teamId: String!) {
        addTask(description: $description, teamId: $teamId) {
            description
        }
    }
`

const addTeamMutation = gql`
    mutation ($name: String!) {
        addTeam(name: $name) {
            name
        }
    }
`

const addMemberMutation = gql`
    mutation ($firstName: String!, $lastName: String!, $position: String!, $teamId: String!) {
        addMember(firstName: $firstName, lastName: $lastName, position: $position, teamId: $teamId) {
            firstName
            lastName
        }
    }
`

const updateTaskMutation = gql`
    mutation ($id: String!, $description: String!, $teamId: String!) {
        updateTask(id: $id, description: $description, teamId: $teamId)
    }
`

const updateTeamMutation = gql`
    mutation ($id: String!, $name: String!) {
        updateTeam(id: $id, name: $name)
    }
`

const updateMemberMutation = gql`
    mutation ($id: String!, $firstName: String!, $lastName: String!, $position: String!, $teamId: String!) {
        updateMember(id: $id, firstName: $firstName, lastName: $lastName, position: $position, teamId: $teamId)
    }
`

const deleteMemberMutation = gql`
	mutation ($id: String!) {
		deleteMember(id: $id)
	}
`

const deleteTaskMutation = gql`
    mutation ($id: String!) {
        deleteTask(id: $id)
    }
`

const deleteTeamMutation = gql`
    mutation ($id: String!) {
        deleteTeam(id: $id)
    }
`

export {
    addMemberMutation,
    addTaskMutation,
    addTeamMutation,
    updateMemberMutation,
    updateTaskMutation,
    updateTeamMutation,
    deleteMemberMutation,
    deleteTaskMutation,
    deleteTeamMutation
}