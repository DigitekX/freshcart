import UserTable from 'app/components/UserTable'
import updateUser from 'app/users/mutations/updateUser'
import getUsers from 'app/users/queries/getUsers'
import { BlitzPage, useMutation, useQuery } from 'blitz'
import React, { Suspense } from 'react'

export const UserList = () => {
    const [{users}] = useQuery(getUsers, {where: {role: "user"}})
    const [updateUserMutation] = useMutation(updateUser)

    const handleChange = (user) => {
       
        try{

          const updated = updateUserMutation({
            where: {id: user.id},
            data: {verified: true}
          })
          window.location.reload()
        
        } catch(error) {
           console.log(error)  
        }
       
    }


    return(
       <div>
           <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          {user.verified===false ? <td>Not Verified</td> : <td>Verified</td>}
                          <td>
                              <button disabled={user.verified!==false && true} onClick={() => handleChange(user)}>Change Status</button>
                          </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
       </div>
    )
}

const adminIndex:BlitzPage = () => {
    return (
        <div>
            <h1>Admin Here!</h1>
            <Suspense fallback={<div>Loading...</div>}>
               <UserList />
            </Suspense>
        </div>
    )
}

export default adminIndex
