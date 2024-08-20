import React from 'react'
import {
    FaCouch, FaShoppingCart, FaHome, FaUtensils, FaLaptop, FaMobileAlt, FaMotorcycle,
    FaMobile, FaFutbol, FaGlasses, FaTabletAlt, FaTshirt, FaCarAlt, FaGem, FaShoePrints
} from 'react-icons/fa';
import { FaShirt, FaSprayCan  } from "react-icons/fa6";
import { BiSprayCan } from "react-icons/bi";
import { GiHandBag, GiDress, GiLipstick, GiWatch } from "react-icons/gi";
import { FiWatch } from "react-icons/fi";
import { Link } from 'react-router-dom';
import "./category.css"

function CategoryListing({ categories, className }) {
    console.log(categories);
    

    // Icons Related To Each Category
    const categoryIcons = {
        beauty: GiLipstick,
        fragrances: FaSprayCan,
        furniture: FaCouch,
        groceries: FaShoppingCart,
        'home-decoration': FaHome,
        'kitchen-accessories': FaUtensils,
        laptops: FaLaptop,
        'mens-shirts': FaShirt,
        'mens-shoes': FaShoePrints,
        'mens-watches': GiWatch,
        'mobile-accessories': FaMobileAlt,
        motorcycle: FaMotorcycle,
        'skin-care': BiSprayCan,
        smartphones: FaMobile,
        'sports-accessories': FaFutbol,
        sunglasses: FaGlasses,
        tablets: FaTabletAlt,
        tops: FaTshirt,
        vehicle: FaCarAlt,
        'womens-bags': GiHandBag,
        'womens-dresses': GiDress,
        'womens-jewellery': FaGem,
        'womens-shoes': FaShoePrints,
        'womens-watches': FiWatch,
    };


    return (
        <>
            <div className={`category-menu ${className}`}>
                <ul>
                    {
                        categories && categories.slice(0, 13).map((category) => {
                            const Icon = categoryIcons[category.slug];
                            return (
                                <li key={category}>
                                    <Link to={`/products/${category.slug}`}>
                                        {Icon && <Icon style={{ backgroundColor: "#f4f4f4", padding: ".2rem", height: "20px", width: "20px", borderRadius: "50%" }} />}
                                        <span>{category.name}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </>
    )
}

export default CategoryListing
