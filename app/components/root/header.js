import React from 'react';
import {Link} from 'react-router-dom';
import logoSrc from 'assets/images/logo.jpg';
import 'assets/scss/components/mainHeader.scss';
import 'assets/scss/components/mainMenu.scss';

import {Menu, Container} from 'semantic-ui-react';
import {InstagramLink} from 'components/common/instagram-link';

export const Header = ({children}) => (
    <header className="mainHeader">
        <Container>
            <Menu className="mainMenu" secondary>
                <Menu.Item>
                    <Link to="/">Продукция</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/delivery">Доставка</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/contacts">Контакты</Link>
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <a href="tel:+79181438303">
                            <span className="phone">+7 (918) 143-83-03</span>
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <InstagramLink />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Container>
        <div className="logo-shadow" />
        <div className="logo">
            <a href="/">
                <img
                    src={logoSrc}
                    alt="Правила питания"
                />
            </a>
        </div>
        {children}
    </header>
);