import React from 'react';
import Product from 'components/catalog/product';
import {request} from 'utils';
import {Container} from 'semantic-ui-react';


class Catalog extends React.Component {

    state = {
        isFetch: true,
        products: []
    };

    componentDidMount() {
        request.get('/data/products.json')
            .then((products) => {
                this.setState({products, isFetch: false});
            });
    }

    render() {

        const {products, isFetch} = this.state;

        return (
            <Container className="catalog">
                <h1>Catalog</h1>

                {isFetch && 'Loading...'}
                {
                    products.map((product, key) => (
                        <Product
                            key={key}
                            name={product.name}
                            price={product.price}
                            unit={product.unit}
                            image={product.image}
                        />
                    ))
                }
            </Container>
        );
    }
}

export default Catalog;