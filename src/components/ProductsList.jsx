import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { inventoryCollection } from '../app/firestoreMethods'
import  ProductCard  from './ProductCard'

export default function ProductsList() {
  const [products, setProducts] = useState([])

  useEffect(() => { 
    const unsubscribe = onSnapshot(inventoryCollection, snapshot => {
      const products = []
      snapshot.forEach(doc => {
        products.push({ ...doc.data(), id: doc.id })
      })      
      setProducts(products)
    }
    )
    return () => unsubscribe()
  }, [])
  return (
    <div className="productslist">
      {products.map(product => {
        return <ProductCard key={product.id} product={product} />
      })}
    </div>
  )
}