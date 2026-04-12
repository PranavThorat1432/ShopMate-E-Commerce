import React from "react";
import HeroSlider from "../Components/Home/HeroSlider";
import CategoryGrid from "../Components/Home/CategoryGrid";
import ProductSlider from "../Components/Home/ProductSlider";
import FeatureSection from "../Components/Home/FeatureSection";
import NewsletterSection from "../Components/Home/NewsletterSection";
import { useSelector } from "react-redux";

const Index = () => {
    const { topRatedProducts, newProducts } = useSelector(
        (state) => state.product
    );

    return (
        <div className="min-h-screen">
            <HeroSlider />
            <div className="container mx-auto px-4 pt-20">
                <CategoryGrid />
                    {newProducts.length > 0 && (
                        <ProductSlider title="New Arrivals" products={newProducts} />
                    )}
                    {topRatedProducts.length > 0 && (
                        <ProductSlider
                            title="Top Rated Products"
                            products={topRatedProducts}
                        />
                    )}
                <FeatureSection />
                <NewsletterSection />
            </div>
        </div>
    );
};

export default Index;