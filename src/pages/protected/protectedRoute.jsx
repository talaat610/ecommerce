import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../../component/Context/authContext'


export default function ProtectedRoute({children}) {

  let {token} = useContext(authContext)
  return (
    <div>
        {token ? children : <Navigate to={'/Login'}/>}
    </div>
  )
}
