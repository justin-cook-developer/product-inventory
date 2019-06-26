import React from 'react';

const Product = ({ product, onChange }) => {
  const { name, status, updatedAt } = product;
  return (
    <div>
      <h3>{name}</h3>
      <p>Updated at: {updatedAt}</p>
      <form onSubmit={e => e.preventDefault()}>
        <select value={status} onChange={e => onChange(e, product)}>
          {['INSTOCK', 'BACKORDERED', 'DISCONTINUED'].map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Product;
