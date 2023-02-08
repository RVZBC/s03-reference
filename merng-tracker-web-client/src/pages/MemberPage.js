import React, { useState } from 'react'
import Swal from 'sweetalert2'

import { graphql, compose } from 'react-apollo'
import { getMembersQuery } from '../graphql/queries'
import { addMemberMutation, deleteMemberMutation } from '../graphql/mutations'

import MemberAdd from '../components/MemberAdd'
import MemberList from '../components/MemberList'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Columns } from 'react-bulma-components'

const MemberPage = (props) => {
    const data = props.getMembersQuery

    const addMember = (newMember) => {
        props.addMemberMutation({
            variables: {
                firstName: newMember.firstName,
                lastName: newMember.lastName,
                position: newMember.position,
                teamId: newMember.teamId,
            },
            refetchQueries: [{ query: getMembersQuery }]
        })
    }

    const deleteMember = (id) => {
        props.deleteMemberMutation({
            variables: { 
                id: id 
            },
            refetchQueries: [{ query: getMembersQuery }]
        }).then((response) => {
            let result = response.data.deleteMember
            if (result) {
                Swal.fire({ 
                    title: 'Member Deleted', 
                    text: 'The member has been deleted.', 
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
            <Heading>Members</Heading>
            <Columns>
                <Columns.Column size={ 3 }>
                    <MemberAdd addMember={ addMember }/>
                </Columns.Column>
                <Columns.Column size={ 9 }>
                    <MemberList members={ data.members } deleteMember={ deleteMember }/>
                </Columns.Column>
            </Columns>
        </Section>
    )
}

export default compose(
    graphql(getMembersQuery, { name: 'getMembersQuery' }),
    graphql(addMemberMutation, { name: 'addMemberMutation' }),
    graphql(deleteMemberMutation, { name: 'deleteMemberMutation' })
)(MemberPage)