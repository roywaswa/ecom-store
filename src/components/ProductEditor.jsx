import React, { useEffect, useState, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createNewInventoryItem } from "../app/firestoreMethods";
import { useStorage } from "../app/storageMethods";

export default function ProductEditor({ setModal }) {
  const [thubnailFile, setThubnailFile] = useState(null);
  const { url } = useStorage(thubnailFile);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    thumbnailUrl: "",
    quantity: "",
    category: "",
  });

  const handleCloseModal = useCallback((ev) => {
    if (ev.target.className === "backdrop") {
      setModal(false);
    }
  },[])
  const handleNewItemSubmit = useCallback((ev) => {
    ev.preventDefault();
    createNewInventoryItem(form);
  },[])
  
  const handleChange = useCallback((ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
    console.log(form);
  } ,[form])
  
  const handleThumbnailChange = useCallback((ev) => {
    setThubnailFile(ev.target.files[0]);
  }, [form])
  
  const handleQuillChange = useCallback((ev) => { 
    setForm({ ...form, description: ev.target.value });
  }, [form])

  
  useEffect(() => {
    setForm({ ...form, thumbnailUrl: url });
  }, [url]);

  return (
    <div onClick={handleCloseModal} className="backdrop">
      <div className="container">
        <h1>ADD ITEM</h1>
        <form
          onSubmit={handleNewItemSubmit}
          action="submit"
        >
          <div className="formfield grid-col-span-2">
            <label hidden htmlFor="title">
              Title
            </label>
            <input
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              type="text"
              name="title"
              id="title"
            />
          </div>
          <div className="formfield grid-col-span-2">
            <label hidden htmlFor="price">
              Price
            </label>
            <input
              placeholder="Price"
              onChange={handleChange}
              value={form.price}
              type="number"
              name="price"
              id="price"
            />
          </div>
          <div className="formfield description grid-col-span-4">
            <label htmlFor="description">Description</label>
            <ReactQuill
              theme="snow"
              value={form.description}
              onChange={handleQuillChange}
            />
          </div>
          <div className="formfield">
            <label htmlFor="thumbnail">
              <span>Thumbnail </span>
              <span className="material-symbols-outlined">add_circle</span>
            </label>
            <input
              hidden
              onChange={handleThumbnailChange}
              type="file"
              name="thumbnail"
              id="thumbnail"
            />
            {thubnailFile ? (
              <span>{thubnailFile.name}</span>
            ) : (
              <span>No file selected</span>
            )}
          </div>
          <div className="formfield grid-col-span-2">
            <label hidden htmlFor="category">
              Category
            </label>
            <input
              placeholder="Category"
              onChange={handleChange}
              value={form.category}
              type="text"
              name="category"
              id="category"
            />
          </div>
          <div className="formfield">
            <label hidden htmlFor="inventoryQuantity">
              Quantity
            </label>
            <input
              placeholder="Quantity"
              onChange={handleChange}
              value={form.quantity}
              type="number"
              name="quantity"
              id="quantity"
            />
          </div>

          <button type="submit">SAVE ITEM</button>
        </form>
      </div>
    </div>
  );
}
