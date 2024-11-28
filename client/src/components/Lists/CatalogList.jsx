import React from 'react';
import CatalogItem from '../../pages/Catalog/CatalogItem';

const CatalogList = ({ items }) => {
    return (
        <ul className="catalog-list">
            {items.map(item => (
                <CatalogItem key={item.id} item={item} />
            ))}
        </ul>
    );
};

export default CatalogList;
