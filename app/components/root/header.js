import React from 'react';
import logoSrc from 'assets/images/logo.jpg';
import 'assets/scss/components/mainHeader.scss';
import 'assets/scss/components/mainMenu.scss';

export const Header = ({children}) => (
    <header className="mainHeader">
        <nav className="mainMenu">
            <ul>
                <li><a href="#products">Продукция</a></li>
            </ul>
        </nav>
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