import React from 'react';
import {Modal, Form, Image, Button} from 'semantic-ui-react';
import {UNITS} from 'config/consts';

class ProductForm extends React.Component {

    state = {
        isNew: false,
        product: {}
    };

    componentWillReceiveProps(newProps) {
        if (newProps.isOpen !== this.props.isOpen) {

            this.setState({
                product: newProps.product
            });
        }
    }

    onChangeField = (e, {name, value}) => {
        this.setState({
            product: {
                ...this.state.product,
                [name]: value
            }
        });
    };

    imagePickHandler = (e) => {
        const file = e.target.files[0];
        console.log();

        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                product: {
                    ...this.state.product,
                    image: reader.result
                }
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }

    };

    submitForm = () => {
        this.props.onSubmit(this.state.product);
    };

    render() {
        const {isNew, product} = this.state;
        const {isOpen} = this.props;

        return (
            <Modal
                open={isOpen}
                onClose={this.props.onClose}
                size="small"
            >
                <Modal.Header>
                    {(isNew) ? 'Создание продукта' : 'Редактирование продукта'}
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Image src={product.image} />
                            <Form.Input
                                type="file"
                                onChange={this.imagePickHandler}
                            />
                        </Form.Field>
                        <Form.Input
                            label="Название товара"
                            name="name"
                            value={product.name}
                            onChange={this.onChangeField}
                            fluid
                        />
                        <Form.Input
                            type="number"
                            label="Стоимость"
                            value={product.price}
                            name="price"
                            onChange={this.onChangeField}
                        />
                        <Form.Dropdown
                            label="Название категории"
                            value={product.unit}
                            name="unit"
                            options={Object.keys(UNITS).map((unitCode, key) => ({
                                key,
                                value: unitCode,
                                text: UNITS[unitCode]
                            }))}
                            selection
                            onChange={this.onChangeField}
                        />
                        <Form.Input
                            type="number"
                            label="Количество"
                            name="unitCount"
                            value={product.unitCount}
                            onChange={this.onChangeField}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Сохранить"
                        basic
                        onClick={this.submitForm}
                    />
                    <Button
                        content="Отмена"
                        basic
                        onClick={this.props.onClose}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ProductForm;