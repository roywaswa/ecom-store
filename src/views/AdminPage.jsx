import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth, signOutAdminUser } from "../app/firebase";
import { AuthContext } from "../contexts/AuthContext";
import SignInAdmin from "../components/SignInAdmin";
import ProductsList from "../components/ProductsList";

export default function AdminPage() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [modal, setModal] = useState(false)

  async function signOut() {
    await signOutAdminUser();
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        if (idTokenResult.claims.admin) {
          setAuthState({ ...user, isAdmin: idTokenResult.claims.admin });
        } else {
          setAuthState(user);
        }
      });
    } else {
      setAuthState(false);
    }
  });

  if (authState) {
    return (
      <div className="admindash">
        <div className="searchbar">
          <form action="submit">
            <label hidden htmlFor="search">
              Search Catalog
            </label>
            <input placeholder="Search Catalog" type="text" id="search" />
          </form>
        </div>
        <div className="additem">
        </div>
        <ProductsList />
        <button onClick={() => signOut()}>SIGN OUT</button>
      </div>
    );
  } else if (authState === false) {
    return <SignInAdmin />;
  }
}


