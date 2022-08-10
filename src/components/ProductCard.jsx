import React from "react";

export default function ProductCard({ product }) {
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
      <div className="product-controls">
        <div className="edit"><button>edit</button></div>
        <div className="restock"><button>restock</button></div>
        <div className="remove"><button>delete</button></div>
      </div>
    </div>
  );
}
