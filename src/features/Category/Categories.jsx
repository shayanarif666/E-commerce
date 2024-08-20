import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { fetchingCategoriesData } from '../../jsonData/apiProducts';
import "./category.css"
import Layout from '../Layout/Layout';
import BackDropLoader from '../BackDropLoader';

function Categories({ categories, className }) {

    const location = useLocation();
    const isCategories = location.pathname === "/mobileCategories";

    const [mobCategories, setMobCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get All Categories
    const getAllCategories = async () => {
        setLoading(true)
        const getCategories = await fetchingCategoriesData();
        setMobCategories(getCategories)
        setLoading(false);
    }

    useEffect(() => {
        if (isCategories) {
            getAllCategories();
        }
    }, [])

    // Icons Related To Each Category
    const categoryIcons = {
        beauty: "https://www.rarebeauty.com/cdn/shop/files/gnav-shop-dropdown-body-400x400_400x.jpg?v=1702303892",
        fragrances: "https://www.byrdie.com/thmb/ZwNIiVt7Bm-GG87JkG1sI9vsGGg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gender-neutral-fragrances-tout-bfe7b4cd2a2b4723a35fadbbc0a6132a.jpg",
        furniture: "https://img.freepik.com/free-vector/home-furniture-set_74855-15461.jpg",
        groceries: "https://c8.alamy.com/comp/ADAPFJ/groceries-in-shopping-basket-ADAPFJ.jpg",
        'home-decoration': "https://www.urbandecoria.com/cdn/shop/articles/Home_Decoration.jpg?v=1667585693",
        'kitchen-accessories': "https://rainforestbowls.com/cdn/shop/collections/kitchen-tools-accessories.jpg?v=1677009189",
        laptops: "https://media.product.which.co.uk/prod/images/original/22a475e555d7-best-laptop-deals.jpg",
        'mens-shirts': "https://beautyandbrands.pk/cdn/shop/files/BUTTONEDDOWN-MEN_SCLASSICFITPLAIDDRESSSHIRT3.jpg?v=1686116533",
        'mens-shoes': "https://onepoint.pk/cdn/shop/files/rockport-shoes-grey-pakistan_large.jpg?v=1687160621",
        'mens-watches': "https://aiksow.pk/wp-content/uploads/2023/07/OLEVS-Men-s-Watches-Top-Brand-Luxury-Original-Waterproof-Quartz-Watch-for-Man-Gold-Skeleton-Style-2.jpg",
        'mobile-accessories': "https://www.gizchina.com/wp-content/uploads/images/2023/03/mobile-phone-accessories.jpg",
        motorcycle: "https://storage.motodealers.co.uk/media/blog/media-6502c2bcbec01-6502c2bcbec02.jpg",

        'skin-care': "https://www.tyoemcosmetic.com/wp-content/uploads/%E7%94%B7%E5%A3%AB%E6%8A%A4%E7%90%86-1banner.png.webp",
        smartphones: "https://img.drz.lazcdn.com/static/pk/p/59b9a0572869fe1f23f2ea8d3d09e9ce.jpg_80x80q80.jpg_.webp",
        'sports-accessories': "https://img.freepik.com/free-vector/sport-text-banner-poster-design_1308-132612.jpg",
        sunglasses: "https://img.drz.lazcdn.com/static/pk/p/ad3b34cbf180a3a385c2f3b7128adf8f.jpg_80x80q80.jpg_.webp",
        tablets: "https://p2-ofp.static.pub/fes/cms/2023/02/22/pkhjbh23c7sjfxf76k6e6usevy3ixi851221.png",
        tops: "https://static-01.daraz.pk/p/806aaac780d691830562a1b4006c4004.jpg",
        vehicle: "https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg",
        'womens-bags': "https://w7.pngwing.com/pngs/333/571/png-transparent-handbag-designer-woman-women-s-handbags-white-luggage-bags-holidays-thumbnail.png",
        'womens-dresses': "https://img.drz.lazcdn.com/static/pk/p/20f33e688efec3464f10f70429113e6a.jpg_80x80q80.jpg_.webp",
        'womens-jewellery': "https://loto.pk/cdn/shop/products/DSC9434_1024x1024.jpg?v=1614915910",
        'womens-shoes': "https://www.darveys.com/blog/wp-content/uploads/2021/09/Featured_Image_Shoes-brands-for-women-1.jpg",
        'womens-watches': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iXqPiF8KcUQTp4Z4IGtfRYayHEBcVuHk_g&s",
    };

    return (
        <>
            <div className={`${className} categories-list d-md-block d-none`}>
                <h4 className='heading'>Categories</h4>
                <div className="row mt-3">
                    {
                        categories && categories.slice(12).map(({ slug, name }) => {
                            return (
                                <Link to={`/products/${slug}`} style={{ textDecoration: "none", color: "#333" }} className="col-6 col-sm-3 col-md-2 d-flex align-items-center justify-content-center view-categories bg-white border py-3 text-center">
                                    <div>
                                        <img src={categoryIcons[slug]} className='p-2' style={{ width: "100px", height: "80px" }} alt="" /> <br />
                                        <span className='d-block mt-1' style={{ fontSize: ".9rem" }}>{name}</span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>


            {
                isCategories ?
                    <>
                        <Layout>

                            <div className="mt-4 mb-5 mx-4 d-md-none d-block">
                                <h4 className='heading'>View Categories</h4>
                                {
                                    loading && <BackDropLoader />
                                }
                                <div className="row mt-3 g-4 bg-white shadow p-4">
                                    {
                                        mobCategories && mobCategories.map(({ slug, name }) => {
                                            return (
                                                <Link to={`/products/${slug}`} style={{ textDecoration: "none", color: "#333" }} className="col-6 col-sm-3 d-flex align-items-center justify-content-center view-categories bg-white border py-3 text-center">
                                                    <div>
                                                        <img src={categoryIcons[slug]} className='p-2' style={{ width: "100px", height: "80px" }} alt="" /> <br />
                                                        <span className='d-block mt-1' style={{ fontSize: ".9rem" }}>{name}</span>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Layout>
                    </>
                    :
                    <></>
            }

        </>
    )
}

export default Categories
