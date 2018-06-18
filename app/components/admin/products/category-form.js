import React from 'react';
import {Modal, Form, Button} from 'semantic-ui-react';


class CategoryForm extends React.Component {

    state = {
        isNew: false,
        category: {
            name: ''
        }
    };

    componentWillReceiveProps(newProps) {

        if (newProps.isOpen !== this.props.isOpen) {
            this.setState({
                category: newProps.category,
                isNew: newProps.categoryKey === -1
            });
        }
    }

    onChangeField = (e, {name, value}) => {
        this.setState({
            category: {
                ...this.state.category,
                [name]: value
            }
        });
    };

    submitForm = () => {
        this.props.onSubmit(this.state.category);
    };

    render() {
        const {isNew, category} = this.state;
        const {isOpen} = this.props;
        return (
            <Modal
                open={isOpen}
                onClose={this.props.onClose}
                size="small"
            >
                <Modal.Header>
                    {(isNew) ? 'Создание категории' : 'Редактирование категории'}
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input
                            label="Название категории"
                            name="name"
                            value={category.name}
                            onChange={this.onChangeField}
                            fluid
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content={(isNew) ? 'Добавить' : 'Сохранить'}
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

export default CategoryForm;