import React from "react";
import Hero from "@/components/Hero";
import OfferSection from "./components/OfferSection";
const HomePage = () => {
    const homeContent = {
        title: "Welcome in our DoctorApp",
        description: "You can find your doctor and help yourself",
        hasButton: true
    };
    const { title, description, hasButton } = homeContent;
    return (
        <>
            <Hero title={title} description={description} hasButton />
            <OfferSection />
        </>
    );
};

export default HomePage;
