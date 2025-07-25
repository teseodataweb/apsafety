import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShopSidebar = ({ onCategoryChange, selectedCategory }) => {
    const categories = [
        'Todos los productos',
        'Detección de gas',
        'Productos POP',
        'Protección personal',
        'Protección respiratoria',
    ];

    return (
        <div className="shop-main-sidebar">
            <div className="single-sidebar-widget">
                <div className="wid-title">
                    <h4>Categorías</h4>
                </div>
                <div className="shop-catagory-items">
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index}>
                                <button 
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        textAlign: 'left',
                                        width: '100%',
                                        cursor: 'pointer',
                                        color: selectedCategory === category ? '#008A1F' : 'inherit'
                                    }}
                                    onClick={() => onCategoryChange(category)}
                                >
                                    <i className="fa-regular fa-chevron-left"></i>
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar;