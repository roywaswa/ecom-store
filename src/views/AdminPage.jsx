import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

// TODO: Add authentication with email and password
// TODO: Protect the admin route


function AdminPage() {
  const { authState, setAuthState } = useContext(AuthContext)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })


  function loginUser(ev) {
    ev.preventDefault()
    console.log(form);
  }
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
        <form onSubmit={ev => loginUser(ev)} action="submit" method="post">
          <div className="formfield">
            <label htmlFor="email">Email</label>
            <input onChange={(ev)=>{setForm({...form, email:ev.target.value})}} type="email" name="email" id="email" />
          </div>
          <div className="formfield">
            <label htmlFor="password">Password</label>
            <input onChange={(ev)=>{setForm({...form, password:ev.target.value})}} type="password" name="password" id="password" />
          </div>
          <button type="submit">LOG IN</button>
        </form>
      </>
    )
  }
}

export default AdminPage