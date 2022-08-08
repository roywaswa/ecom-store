import React, { useState } from 'react'
import { signInAdminUser, signInWithGoogle, createNewAdminUser } from '../app/firebase'

export default function SignInAdmin() {
  const [form, setForm] = useState({ email: '', password: '' })

  async function loginUser(ev) {
    ev.preventDefault()
    const user = await createNewAdminUser(form.email, form.password)
    // const user = await signInAdminUser(form.email, form.password)
  }

  return (
    <div className='signin'>
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
      <button onClick={async () => {
        const user = await signInWithGoogle()
        setAuthState(user)
        console.log(user);
      }} >SIGN IN WITH GOOGLE</button>
    </div>
  )
}