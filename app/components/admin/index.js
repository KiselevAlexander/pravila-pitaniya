import React from 'react';
import {Container, Form} from 'semantic-ui-react';
import Catalog from 'components/admin/products';


const LoginForm = ({password}) => (
    <Form>
        <Form.Input
            value={password}
        />
    </Form>
);

class AdminPanel extends React.Component {
    state = {
        isAuth: false,
        password: ''
    };

    render() {

        const {isAuth, password} = this.state;

        return (
            <Container className="adminPanel">
                <h1>Админ панель</h1>
                {false && !isAuth &&
                    <LoginForm password={password} />
                }
                <Catalog />
            </Container>
        );
    }
}

export default AdminPanel;