// app/page.js

import React from 'react';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
// import Clients from './components/Clients';
import Services from '@/components/Services';
import Potforlio from '@/components/Potforlio';

const Home = () => {
    return (
        <>
            <Hero />
            <Intro />
            {/* <Services/> */}
            {/* <Potforlio/> */}
            <Cta />
            <Footer />
        </>
    );
};

export default Home;
