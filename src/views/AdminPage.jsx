import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  auth,
  createNewAdminUser,
  signInAdminUser,
  signInWithGoogle,
  signOutAdminUser,
} from "../app/firebase";
import {
  createNewInventoryItem,
  getInventoryItems,
  inventoryCollection,
} from "../app/firestoreMethods";
import { useStorage } from "../app/storageMethods";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminPage() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [addItemModal, setAddItemModal] = useState(false);

  async function signOut() {
    await signOutAdminUser();
  }

  onAuthStateChanged(auth, (user) => {
    setAuthState(user);
  });

  if (authState) {
    return (
      <div className="admindash">
        {addItemModal ? (
          <AddItemModal setAddItemModal={setAddItemModal} />
        ) : null}
        <div className="searchbar">
          <form action="submit">
            <label hidden htmlFor="search">
              Search Catalog
            </label>
            <input placeholder="Search Catalog" type="text" id="search" />
          </form>
        </div>
        <div className="additem">
          <button
            onClick={() => {
              setAddItemModal(true);
            }}
          >
            ADD ITEM
          </button>
        </div>
        <ProductsList />
        <button onClick={() => signOut()}>SIGN OUT</button>
      </div>
    );
  } else {
    return <SignInAdmin />;
  }
}

function AddItemModal({ setAddItemModal }) {
  const [thubnailFile, setThubnailFile] = useState(null);
  const { progress, error, url } = useStorage(thubnailFile);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    thumbnailUrl: "",
    quantity: "",
    category: "",
  });

  async function saveNewItem(ev) {
    ev.preventDefault();

    const itemID = await createNewInventoryItem(form);
  }
  function closeModal(ev) {
    if (ev.target.className === "backdrop") {
      setAddItemModal(false);
    }
  }
  useEffect(() => {
    setForm({ ...form, thumbnailUrl: url });
  }, [url]);

  return (
    <div onClick={(ev) => closeModal(ev)} className="backdrop">
      <div className="container">
        <h1>ADD ITEM</h1>
        <form
          onSubmit={(ev) => {
            saveNewItem(ev);
          }}
          action="submit"
        >
          <div className="formfield grid-col-span-2">
            <label hidden htmlFor="title">
              Title
            </label>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(ev) => {
                setForm({ ...form, title: ev.target.value });
              }}
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
              onChange={(ev) => {
                setForm({ ...form, price: ev.target.value });
              }}
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
              onChange={(ev) => {
                setForm({ ...form, description: ev });
              }}
            />
          </div>
          <div className="formfield">
            <label htmlFor="thumbnail">
              <span>Thumbnail </span>
              <span className="material-symbols-outlined">add_circle</span>
            </label>
            <input
              hidden
              onChange={(ev) => {
                setThubnailFile(ev.target.files[0]);
              }}
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
              onChange={(ev) => {
                setForm({ ...form, category: ev.target.value });
              }}
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
              onChange={(ev) => {
                setForm({ ...form, quantity: ev.target.value });
              }}
              value={form.inventoryQuantity}
              type="number"
              name="inventoryQuantity"
              id="inventoryQuantity"
            />
          </div>

          <button type="submit">SAVE ITEM</button>
        </form>
      </div>
    </div>
  );
}

function SignInAdmin() {
  const [form, setForm] = useState({ email: "", password: "" });

  async function loginUser(ev) {
    ev.preventDefault();
    // const user = await createNewAdminUser(form.email, form.password)
    const user = await signInAdminUser(form.email, form.password);
  }

  return (
    <div className="signin">
      <h1>SIGN IN</h1>
      <form onSubmit={(ev) => loginUser(ev)} action="submit" method="post">
        <div className="formfield">
          <label htmlFor="email">Email</label>
          <input
            onChange={(ev) => {
              setForm({ ...form, email: ev.target.value });
            }}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="formfield">
          <label htmlFor="password">Password</label>
          <input
            onChange={(ev) => {
              setForm({ ...form, password: ev.target.value });
            }}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button type="submit">LOG IN</button>
      </form>
      <button
        onClick={async () => {
          const user = await signInWithGoogle();
          setAuthState(user);
        }}
      >
        SIGN IN WITH GOOGLE
      </button>
    </div>
  );
}

function ProductsList() {
  const [products, setProducts] = useState([]);
  let items = [];
  // collect snapshots from firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(inventoryCollection, (snapshot) => {
      const products = [];
      snapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      setProducts(products);
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="productslist">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="productcard">
      <div className="product-thumbnail">
        <img src={product.thumbnailUrl} alt={`thubnail of ${product.title}`} />
      </div>
      <div className="product-details">
        <span className="product-title">{product.title}</span>
        <span className="product-quantity">
          Inventory Quantity: {product.quantity}
        </span>
        <span className="product-category">{product.category}</span>
        <span className="product-price">Ksh.{product.price}</span>
      </div>
    </div>
  );
}
