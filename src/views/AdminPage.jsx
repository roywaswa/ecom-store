import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { auth, createNewAdminUser, signInAdminUser, signInWithGoogle, signOutAdminUser } from '../app/firebase'
import { createNewInventoryItem } from '../app/firestoreMethods'
import { AuthContext } from '../contexts/AuthContext'

// TODO: Add authentication with email and password
// TODO: Protect the admin route


function AdminPage() {
  const { authState, setAuthState } = useContext(AuthContext)
  const [form, setForm] = useState({ email: '', password: '' })
  const [addItemModal, setAddItemModal] = useState(false)


  async function loginUser(ev) {
    ev.preventDefault()
    // const user = await createNewAdminUser(form.email, form.password)
    const user = await signInAdminUser(form.email, form.password)
  }

  async function signOut() {
    await signOutAdminUser()
  }

  onAuthStateChanged(auth, (user) => {
    setAuthState(user)
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
        <div className="productslist">PRODUCT LIST</div>
        <button onClick={() => signOut()}>SIGN OUT</button>
    </div>
    )
  } else {
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
}

function AddItemModal({ setAddItemModal }) {
  const [form, setForm] = useState({})
  async function saveNewItem(ev) {
    ev.preventDefault()
    console.log(form);
    const itemID = await createNewInventoryItem(form)
  }
  function closeModal(ev) {
    console.log();
    if(ev.target.className === 'backdrop') {
      setAddItemModal(false)
    }
  }
  return (
    <div onClick={(ev)=>closeModal(ev)} className="backdrop">
      <div className="container">
        <h1>ADD ITEM</h1>
        <form onSubmit={(ev) => {saveNewItem(ev)}} action="submit">
          <div className="formfield">
            <label hidden htmlFor="title">Title</label>
            <input placeholder='Title' value={form.title} onChange={(ev) => {setForm({...form, title: ev.target.value})}} type="text" name="title" id="title" />
          </div>
          <div className="formfield">
            <label htmlFor="thumbnain">Thumbnail</label>
            <input value={form.thumbnail} onChange={(ev) => {setForm({...form, thumbnail: ev.target.value})}} type="file" name="thumbnail" id="thumbnail" />
          </div>
          <div className="formfield">
            <label htmlFor="description">Description</label>
            <ReactQuill theme='snow' value={form.description} onChange={(ev) => {setForm({...form, description: ev})}} />
          </div>
          <div className="formfield">
            <label hidden htmlFor="price">Price</label>
            <input placeholder='Price' onChange={(ev) => {setForm({...form, price: ev.target.value})}} value={form.price} type="number" name="price" id="price" />
          </div>
          <div className="formfield">
            <label hidden htmlFor="inventoryQuantity">Quantity</label>
            <input placeholder='Quantity' onChange={(ev) => {setForm({...form,inventoryQuantity: ev.target.value})}} value={form.inventoryQuantity} type="number" name="inventoryQuantity" id="inventoryQuantity" />
          </div>
          <div className="formfield">
            <label hidden htmlFor="category">Category</label>
            <input placeholder='Category' onChange={(ev) => {setForm({...form, category: ev.target.value})}} value={form.category} type="text" name="category" id="category" />
          </div>
          <button type="submit">SAVE ITEM</button>
        </form>
      </div>
    </div>
  )
}


export default AdminPage