import React from 'react';
import {request} from 'utils';
import {toast} from 'react-toastify';
import {Container, Table, Button} from 'semantic-ui-react';
import {UNITS} from 'config/consts';
import ProductForm from './product-form';

class Catalog extends React.Component {

    state = {
        isFetch: true,
        products: [],
        isEditProductOpen: false,
        editProduct: {
            category: -1,
            product: {}
        }
    };

    componentDidMount() {
        this.requestData();
    }

    applyChanges = (e) => {
        e.preventDefault();
        request.post('http://localhost/datasaver.php', {
            products: this.state.products
        })
            .then(() => {
                toast.success('Изменения сохранены');
            })
            .catch(() => {
                toast.error('Ошибка сохранения данных');
            });
    };

    requestData = () => {
        this.setState({isFetch: true});

        request.get('http://localhost/data/?type=products')
            .then((data) => {
                this.setState({products: data.products, isFetch: false});
            })
            .catch(() => {
                this.setState({isFetch: false});
            });
    };

    deleteProduct = (categoryKey, productKey) => {
        this.setState((state) => ({
            products: state.products.map((category, key) => {

                if (key === categoryKey) {
                    return {
                        ...category,
                        items: category.items.filter((i, key) => key !== productKey)
                    };
                }

                return category;
            })
        }));
    };

    onSubmitProductForm = (product) => {

        const {editProduct} = this.state;

        this.setState((state) => ({
            isEditProductOpen: false,
            editProduct: {
                category: -1,
                product: {}
            },
            products: state.products.map((category, key) => {

                if (key === editProduct.category) {
                    return {
                        ...category,
                        items: category.items.map((i, iKey) => {
                            if (iKey === editProduct.productKey) {
                                return product;
                            }
                            return i;
                        })
                    };
                }

                return category;

            })
        }));
    };

    resetFormClickHandler = (e) => {
        e.preventDefault();
        this.requestData();
    };

    editProduct = (e, cKey, pKey, product) => {
        e.preventDefault();
        this.setState({
            isEditProductOpen: true,
            editProduct: {
                category: cKey,
                productKey: pKey,
                product
            }
        });
    };

    render() {

        const {
            products, isFetch, isEditProductOpen, editProduct
        } = this.state;

        return (
            <Container className="catalog mb60">
                {isFetch && 'Loading...'}
                {!isFetch &&
                <div>
                    <Button
                        content="Добавить категорию"
                        basic
                        color="green"
                    />
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Название
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Цена
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Единица
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Количество
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Действия
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {products.map((category, cKey) => ([
                                <Table.Row key={`cat_${cKey}`}>
                                    <Table.Cell colSpan={5}>
                                        <b>{category.name}</b>
                                        <div style={{float: 'right'}}>
                                            <a href="#фadd_item">Добавить товар</a>&nbsp;&nbsp;
                                            <a href="#edit">Редактировать</a>&nbsp;&nbsp;
                                            <a href="#delete">Удалить</a>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>,
                                ...category.items.map((product, pKey) => (
                                    <Table.Row key={`cat_${cKey}product_${pKey}`}>
                                        <Table.Cell>
                                            {product.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {product.price}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {UNITS[product.unit]}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {product.unitCount}
                                        </Table.Cell>
                                        <Table.Cell textAlign="right">
                                            <a
                                                href="#edit"
                                                onClick={(e) => this.editProduct(e, cKey, pKey, product)}
                                            >
                                                Редактировать
                                            </a>&nbsp;&nbsp;
                                            <a
                                                href="#delete"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.deleteProduct(cKey, pKey);
                                                }}
                                            >
                                                Удалить
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ]))}
                        </Table.Body>
                    </Table>
                    <Button
                        content="Применить изменения"
                        basic
                        onClick={this.applyChanges}
                    />
                    <Button
                        content="Сбросить"
                        onClick={this.resetFormClickHandler}
                        basic
                    />
                </div>
                }
                <ProductForm
                    isOpen={isEditProductOpen}
                    product={editProduct.product}
                    onSubmit={this.onSubmitProductForm}
                    onClose={() => {
                        this.setState({isEditProductOpen: false});
                    }}
                />
            </Container>
        );
    }
}

export default Catalog;