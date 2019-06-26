import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Nav from './Nav';
// import Products from './Products';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('http://localhost:3000/api/products');
      this.setState({ products: data });
    } catch (e) {
      console.error(e);
    }
  }

  filterProducts = prods =>
    prods.reduce(
      (accum, prod) => {
        if (accum[prod.status]) {
          accum[prod.status].push(prod);
        }
        accum.all.push(prod);
        return accum;
      },
      {
        all: [],
        INSTOCK: [],
        BACKORDERED: [],
        DISCONTINUED: [],
      }
    );

  render() {
    const filteredData = this.filterProducts(this.state.products);
    return (
      <React.Fragment>
        <header>
          <h1>Product Inventory</h1>
          <Nav filteredData={filteredData} />
        </header>
        <main>
          {/* <Route
            path="/"
            render={() => {
              return <Products />;
            }}
          /> */}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
