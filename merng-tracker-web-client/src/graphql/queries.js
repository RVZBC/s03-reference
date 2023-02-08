import { gql } from 'apollo-boost'

const getMembersQuery = gql`
    {
        members {
            id
            firstName
            lastName
            position
            team {
                name
            }
        }
    }
`

const getMemberQuery = gql`
    query ($id: String!) {
        member (id: $id) {
            id
            firstName
            lastName
            position
            teamId
        }
    }
`

const getTeamsQuery = gql`
    {
        teams {
            id
            name
        }
    }
`

const getTeamQuery = gql`
    query ($id: String!) {
        team (id: $id) {
            id
            name
        }
    }
`

const getTeamReferenceQuery = gql`
    query ($id: String!) {
        team (id: $id) {
            tasks {
                id
            }
            members {
                id
            }
        }
    }
`

const getTasksQuery = gql`
    {
        tasks {
            id
            description
            team {
                name
            }
        }
    }
`

const getTaskQuery = gql`
    query ($id: String!) {
        task (id: $id) {
            id
            description
            teamId
        }
    }
`

export {
    getMembersQuery,
    getMemberQuery,
    getTeamsQuery,
    getTeamQuery,
    getTeamReferenceQuery,
    getTasksQuery,
    getTaskQuery
}