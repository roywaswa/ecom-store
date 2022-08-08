import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { createNewInventoryItem } from '../app/firestoreMethods'
import { useStorage } from '../app/storageMethods'



export default function AddItemModal({ setAddItemModal }) {
  const [thubnailFile, setThubnailFile] = useState(null)
  const {progress, error, url} = useStorage(thubnailFile)
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    thumbnailUrl: '',
    quantity: '',
    category: '',
  })
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
  useEffect(() => { setForm({...form, thumbnailUrl: url})}, [url])
  
  return (
    <div onClick={(ev)=>closeModal(ev)} className="backdrop">
      <div className="container">
        <h1>ADD ITEM</h1>
        <form onSubmit={(ev) => {saveNewItem(ev)}} action="submit">
          <div className="formfield grid-col-span-2">
            <label hidden htmlFor="title">Title</label>
            <input placeholder='Title' value={form.title} onChange={(ev) => {setForm({...form, title: ev.target.value})}} type="text" name="title" id="title" />
          </div>
          <div className="formfield grid-col-span-2">
            <label hidden htmlFor="price">Price</label>
            <input placeholder='Price' onChange={(ev) => {setForm({...form, price: ev.target.value})}} value={form.price} type="number" name="price" id="price" />
          </div>
          <div className="formfield description grid-col-span-4">
            <label htmlFor="description">Description</label>
            <ReactQuill theme='snow' value={form.description} onChange={(ev) => {setForm({...form, description: ev})}} />
          </div>
          <div className="formfield">
            <label htmlFor="thumbnail">
              <span>Thumbnail </span>
              <span className="material-symbols-outlined">
                add_circle
              </span>
            </label>
            <input hidden onChange={(ev) => {setThubnailFile(ev.target.files[0]) }} type="file" name="thumbnail" id="thumbnail" />
            {thubnailFile ? <span>{thubnailFile.name}</span>: <span>No file selected</span>}
          </div>
          <div className="formfield grid-col-span-2">
            <label hidden htmlFor="category">Category</label>
            <input placeholder='Category' onChange={(ev) => {setForm({...form, category: ev.target.value})}} value={form.category} type="text" name="category" id="category" />
          </div>
          <div className="formfield">
            <label hidden htmlFor="inventoryQuantity">Quantity</label>
            <input placeholder='Quantity' onChange={(ev) => {setForm({...form,quantity: ev.target.value})}} value={form.inventoryQuantity} type="number" name="inventoryQuantity" id="inventoryQuantity" />
          </div>
          
          <button type="submit">SAVE ITEM</button>
        </form>
      </div>
    </div>
  )
}