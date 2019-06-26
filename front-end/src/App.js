import React from 'react';
import axios from 'axios';
import { Route, withRouter } from 'react-router-dom';

import Nav from './Nav';
import Products from './Products';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    try {
      const { data: products } = await axios.get(
        'http://localhost:3000/api/products'
      );
      this.setState({ products });
    } catch (err) {
      console.error(err);
    }
  }

  filterProducts = prods => {
    return prods.reduce(
      (accum, prod) => {
        if (accum[prod.status]) {
          accum[prod.status].push(prod);
        }
        accum.all.push(prod);
        return accum;
      },
      { all: [], INSTOCK: [], BACKORDERED: [], DISCONTINUED: [] }
    );
  };

  onChange = async (e, { id }) => {
    const { value } = e.target;
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/products/${id}`,
        { status: value }
      );
      this.setState(
        state => ({
          products: state.products.map(prod =>
            data.id === prod.id ? data : prod
          ),
        }),
        this.props.history.push(`/${data.status === 'all' ? '' : data.status}`)
      );
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const filteredData = this.filterProducts(this.state.products);
    return (
      <React.Fragment>
        <header>
          <h1>Product Inventory</h1>
          <Nav filteredData={filteredData} />
        </header>
        <main>
          <Route
            path="/:products?"
            render={({ match }) => {
              const { products } = match.params;
              let prods;
              if (products && filteredData[products]) {
                prods = filteredData[products];
              } else {
                prods = filteredData.all;
              }
              return <Products products={prods} onChange={this.onChange} />;
            }}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
