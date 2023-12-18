import React, { useState } from "react"
import { Navigate } from 'react-router-dom'
import Spinner from "../spinner"

const ProtectedRouteElement = ({ element: Component, ...props }) => {

  return (
      props.loggedIn ? <Component {...props} /> : <Navigate to="/login" />
  )
}

export default ProtectedRouteElement;