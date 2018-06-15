import React from 'react';
import Product from 'components/catalog/product';


const PRODUCTS = [
    {
        name: 'cherry',
        price: 100,
        unit: 'kg',
        image: ''
    }
];


class Catalog extends React.Component {
    render() {
        return (
            <div className="catalog">
                <h1>Catalog</h1>
                {
                    PRODUCTS.map((product, key) => (
                        <Product
                            key={key}
                            name={product.name}
                            price={product.price}
                            unit={product.unit}
                            image={product.image}
                        />
                    ))
                }
            </div>
        );
    }
}

export default Catalog;