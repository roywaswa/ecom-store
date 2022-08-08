import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { auth, signOutAdminUser } from '../app/firebase'
import { AuthContext } from '../contexts/AuthContext'
import SignInAdmin from "../components/SignInAdmin";
import ProductsList from "../components/ProductsList";
import AddItemModal from "../components/AddItemModal";




export default function AdminPage() {
  const { authState, setAuthState } = useContext(AuthContext)
  const [addItemModal, setAddItemModal] = useState(false)

  async function signOut() {
    await signOutAdminUser()
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        setAuthState({...user, isAdmin: idTokenResult.claims.admin})
      })
    }
  })

  if (authState) {
    return (
      <div className='admindash'>
        {addItemModal ? <AddItemModal setAddItemModal={setAddItemModal} /> : null}
        <div className="searchbar">
          <form action="submit">
            <label hidden htmlFor="search">Search Catalog</label>
            <input placeholder='Search Catalog' type="text" id='search' />
          </form>
        </div>
        <div className="additem">
          <button onClick={() => {
            setAddItemModal(true)
          }} >ADD ITEM</button>
        </div>
        <ProductsList/>
        <button onClick={() => signOut()}>SIGN OUT</button>
    </div>
    )
  } else {
    return <SignInAdmin/>
  }
}










