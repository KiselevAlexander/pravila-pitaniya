import React from 'react';
import Catalog from 'components/catalog';


class IndexPage extends React.Component {
    render() {
        return (
            <div className="indexPage">
                <Catalog />
            </div>
        );
    }
}

export default IndexPage;