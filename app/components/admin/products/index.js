import _ from 'lodash';
import React from 'react';
import {request} from 'utils';
import {toast} from 'react-toastify';
import {Container, Table, Button} from 'semantic-ui-react';
import {API_URLS, UNITS} from 'config/consts';
import CategoryForm from 'components/admin/products/category-form';
import ProductForm from 'components/admin/products/product-form';

class Catalog extends React.Component {

    state = {
        isFetch: true,
        products: [],
        isEditProductOpen: false,
        isEditCategoryOpen: false,
        editProduct: {
            category: -1,
            product: {}
        },
        editCategory: {
            categoryKey: -1,
            category: {}
        }
    };

    componentDidMount() {
        this.requestData();
    }

    applyChanges = (e) => {
        e.preventDefault();
        request.post(API_URLS.SAVER, {
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
        request.get(API_URLS.PRODUCTS)
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
                    if (editProduct.productKey === -1) {
                        return {
                            ...category,
                            items: [
                                ...category.items,
                                product
                            ]
                        };
                    }
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

    onSubmitCategoryForm = (editedCategory) => {

        const {editCategory} = this.state;

        if (editCategory.categoryKey === -1) {
            this.setState((state) => ({
                isEditCategoryOpen: false,
                editCategory: {
                    categoryKey: -1,
                    category: {
                        name: ''
                    }
                },
                products: [
                    ...state.products,
                    {
                        ...editedCategory,
                        items: []
                    }
                ]
            }));
        } else {
            this.setState((state) => ({
                isEditCategoryOpen: false,
                editCategory: {
                    category: -1
                },
                products: state.products.map((category, key) => {
                    if (key === editCategory.categoryKey) {
                        return {
                            ...category,
                            ...editedCategory
                        };
                    }
                    return category;
                })
            }));
        }

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

    newItemClickHandler = (e, cKey) => {
        e.preventDefault();
        this.setState({
            isEditProductOpen: true,
            editProduct: {
                category: cKey,
                productKey: -1,
                product: {}
            }
        });
    };

    addCategoryClickHandler = () => {
        this.setState({
            isEditCategoryOpen: true,
            editCategory: {
                categoryKey: -1,
                category: {
                    name: ''
                }
            }
        });
    };

    editCategoryClickHandler = (e, cKey, category) => {
        e.preventDefault();
        this.setState({
            isEditCategoryOpen: true,
            editCategory: {
                categoryKey: cKey,
                category: _.omit(category, ['items'])
            }
        });
    };

    removeCategoryClickHandler = (e, cKey) => {
        e.preventDefault();
        this.setState({
            products: this.state.products.filter((i, k) => k !== cKey)
        });
    };

    render() {

        const {
            products, isFetch, isEditProductOpen, editProduct,
            isEditCategoryOpen, editCategory
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
                        onClick={this.addCategoryClickHandler}
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
                                            <a
                                                href="#фadd_item"
                                                onClick={(e) => this.newItemClickHandler(e, cKey)}
                                            >
                                                Добавить товар
                                            </a>&nbsp;&nbsp;
                                            <a
                                                href="#edit"
                                                onClick={(e) => this.editCategoryClickHandler(e, cKey, category)}
                                            >
                                                Редактировать
                                            </a>&nbsp;&nbsp;
                                            <a
                                                href="#delete"
                                                onClick={(e) => this.removeCategoryClickHandler(e, cKey)}
                                            >
                                                Удалить
                                            </a>
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
                        color="blue"
                    />
                    <Button
                        content="Сбросить"
                        onClick={this.resetFormClickHandler}
                        basic
                        color="red"
                    />
                </div>
                }
                <ProductForm
                    isOpen={isEditProductOpen}
                    product={editProduct.product}
                    productKey={editProduct.productKey}
                    onSubmit={this.onSubmitProductForm}
                    onClose={() => {
                        this.setState({isEditProductOpen: false});
                    }}
                />
                <CategoryForm
                    isOpen={isEditCategoryOpen}
                    category={editCategory.category}
                    categoryKey={editCategory.categoryKey}
                    onSubmit={this.onSubmitCategoryForm}
                    onClose={() => {
                        this.setState({isEditCategoryOpen: false});
                    }}
                />
            </Container>
        );
    }
}

export default Catalog;