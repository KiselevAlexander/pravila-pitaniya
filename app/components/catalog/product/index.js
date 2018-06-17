import React from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/components/product.scss';
import {UNITS} from 'config/consts';


class Product extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        price: PropTypes.number,
        unitCount: PropTypes.number,
        unit: PropTypes.string,
        image: PropTypes.string
    };

    static defaultProps = {
        name: '',
        price: 0,
        unitCount: null,
        unit: '',
        image: ''
    };

    render() {
        const {
            name, price, unit, image,
            unitCount
        } = this.props;

        return (
            <div
                className="catalogProduct"
                style={{backgroundImage: `url(${image})`}}
            >
                <div className="catalogProduct-name">{name}</div>
                <div className="catalogProduct-price">{price}₽ / {unitCount}{UNITS[unit]}</div>
            </div>
        );
    }
}

export default Product;