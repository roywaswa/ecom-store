import { addDoc, collection, updateDoc, doc, deleteDoc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "./firebase";


export const inventoryCollection = collection(firestore, "inventory");

export async function createNewInventoryItem(item) {
  try {
    const docRef = await addDoc(inventoryCollection, { ...item })
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
}

export function getInventoryItems() {
  let items = [];
  onSnapshot(inventoryCollection, (snapshot) => { 
    snapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      })
    })
  })
}

export async function getInvetoryItemById(item_id) {
  try {
    const docRef = await getDoc(doc(firestore, `inventory/${item_id}`));
    return docRef.data();
  } catch (error) {
    console.log(error);
  }
}

export async function updateInventoryItem(item_id, item) {
  const itemRef = doc(firestore, `inventory/${item_id}`);
  try {
    const docRef = await updateDoc(itemRef, { ...item })
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteInventoryItem(item_id) {
  try {
    await deleteDoc(doc(firestore, `inventory/${item_id}`));
  } catch (error) {
    console.log(error);
  }
}




