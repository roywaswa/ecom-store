import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

// TODO: Add authentication with email and password
// TODO: Protect the admin route


function AdminPage() {
  const {authState, setAuthState} = useContext(AuthContext)
  if (authState) {
    return (
      <>
      <div className="searchbar">SEARCH ITEM</div>
      <div className="additem">ADD ITEM</div>
      <div className="productslist">PRODUCT LIST</div>
    </>
    )
  } else {
    return (
      <>
        <h1>SIGN IN</h1>
      </>
    )
  }
}

export default AdminPage