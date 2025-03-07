import React from 'react';
import Navbar from '../components/Landing pages/Navbar.jsx';
import Hero from '../components/Landing pages/Hero.jsx';
import About from '../components/Landing pages/About.jsx';
import Gallery from '../components/Landing pages/Gallery.jsx';
import Footer from '../components/Landing pages/Footer.jsx';
import CombinedComponent from '../components/Landing pages/CombinedComponent.jsx';
import TeachersProfile from '../components/Landing pages/TeachersProfile.jsx';
import Achievements from '../components/Landing pages/Achievements.jsx';
import SocialMediaSidebar from '../components/Landing pages/SocialMediaSidebar.jsx';
import CountingStats from '../components/Landing pages/CountingStats.jsx';



const LandingPage = () => {
    return (
        <div className="relative min-h-screen bg-gray-100">
            <SocialMediaSidebar />
            <Navbar/>
            <Hero />
            <About />
            <CombinedComponent/> {/* Event & Notice board */}
            <TeachersProfile/>
            <Achievements/>
            <Gallery />
            <CountingStats/>
            <Footer />
            </div>
     
    );
};

export default LandingPage;
