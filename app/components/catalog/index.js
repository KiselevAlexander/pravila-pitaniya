import React from 'react';
import Product from 'components/catalog/product';
import {request} from 'utils';
import {Container, Grid} from 'semantic-ui-react';
import 'assets/scss/components/catalog.scss';
import 'assets/scss/components/catalogCategory.scss';
import {API_URLS} from 'config/consts';


class Catalog extends React.Component {

    state = {
        isFetch: true,
        products: []
    };

    componentDidMount() {
        request.get(API_URLS.PRODUCTS)
            .then((products) => {
                this.setState({products: products.products, isFetch: false});
            });
    }

    render() {

        const {products, isFetch} = this.state;

        return (
            <Container className="catalog">
                {isFetch && 'Loading...'}
                {products.map((category, key) => (
                    <div className="catalogCategory" key={key}>
                        <Grid columns={1} padded={false} relaxed={false}>
                            <Grid.Column>
                                <div className="catalogCategory-name">{category.name}</div>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid columns={5} stackable>
                                    {
                                        category.items.map((product, key) => (
                                            <Grid.Column key={key}>
                                                <Product
                                                    name={product.name}
                                                    price={parseFloat(product.price)}
                                                    unit={product.unit}
                                                    image={product.image}
                                                    unitCount={(product.unitCount) ? parseFloat(product.unitCount) : ''}
                                                />
                                            </Grid.Column>
                                        ))
                                    }
                                </Grid>
                            </Grid.Column>
                        </Grid>
                    </div>
                ))}
            </Container>
        );
    }
}

export default Catalog;