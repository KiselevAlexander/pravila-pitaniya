import React from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/components/product.scss';


class Product extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        price: PropTypes.number,
        unit: PropTypes.string,
        image: PropTypes.string
    };

    static defaultProps = {
        name: '',
        price: 0,
        unit: '',
        image: ''
    };

    render() {
        const {
            name, price, unit, image
        } = this.props;

        return (
            <div className="catalog-product">
                {image &&
                    <img
                        src={image}
                        alt={name}
                    />
                }
                {name}
                {price}/{unit}
                Product
            </div>
        );
    }
}

export default Product;