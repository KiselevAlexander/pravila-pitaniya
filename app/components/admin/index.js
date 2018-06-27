import React from 'react';
import {Container, Form} from 'semantic-ui-react';
import Catalog from 'components/admin/products';
import {ADMIN_PASSWORD} from 'config/consts';
import {cacheManager} from 'utils';


const LoginForm = ({password, onChange}) => (
    <Container>
        <Form>
            <Form.Input
                type="password"
                value={password}
                label="Пароль"
                onChange={onChange}
            />
        </Form>
    </Container>
);

class AdminPanel extends React.Component {

    isAuth = () => {
        const isStoredAuth = cacheManager.getItem('isAuth');
        return isStoredAuth || false;
    };

    state = {
        isAuth: this.isAuth(),
        password: ''
    };

    passwordChange = (e, {value}) => {
        this.setState({
            password: value,
            isAuth: value === ADMIN_PASSWORD
        });

        if (value === ADMIN_PASSWORD) {
            cacheManager.setItem('isAuth', true, 3600000);
        }
    };

    render() {

        const {isAuth, password} = this.state;


        if (!isAuth) {
            return (
                <LoginForm
                    password={password}
                    onChange={this.passwordChange}
                />
            );
        }

        return (
            <Container className="adminPanel">
                <h1>Админ панель</h1>
                <Catalog />
            </Container>
        );
    }
}

export default AdminPanel;