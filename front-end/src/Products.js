import React from 'react';

import Product from './Product';

const Products = ({ products, onChange }) => {
  if (products.length === 0) {
    return null;
  }
  return (
    <React.Fragment>
      {products.map(product => (
        <Product key={product.name} product={product} onChange={onChange} />
      ))}
    </React.Fragment>
  );
};

export default Products;
