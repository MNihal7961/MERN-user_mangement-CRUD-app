import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function AdminPrivateRoute({element}) {
    const {currentUser} = useSelector(state => state.user)
    useEffect(() => {
      console.log(currentUser)
      console.log("Protecting route!!")
    },[])
  return currentUser.role === 'admin' ? <Outlet/> : <Navigate to='/login'/>
}