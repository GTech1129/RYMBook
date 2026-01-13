import React, { useState, useEffect } from 'react';

const BookLaunchHero = () => {
  // Configuration
  const CONFIG = {
    launchDate: '2026-02-01T00:00:00',
    bookTitle: 'RUMBLE, YOUNG MAN',
    bookSubtitle: 'A STORY OF FIGHTING FOR THE LEAST OF THESE',
    audioUrl: '/assets/audio-sample.mp3'
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [heroImage, setHeroImage] = useState('/assets/book-cover.png');
  const [backgroundImage, setBackgroundImage] = useState('/assets/cityscape-bg.png');
  const [isBrave, setIsBrave] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);

  useEffect(() => {
    // Detect Brave browser
    const detectBrave = async () => {
      if (navigator.brave && await navigator.brave.isBrave()) {
        setIsBrave(true);
      }
    };
    detectBrave();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(CONFIG.launchDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioClick = () => {
    setShowAudioModal(true);
  };

  const handleReadClick = () => {
    window.open('https://heyzine.com/flip-book/8d2ddb5dd8.html', '_blank');
  };

  const handlePreOrderClick = () => {
    window.open('https://payhip.com/b/HyAft', '_blank');
  };

  return (
    <div className="relative w-full bg-gray-100 mx-auto" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh', maxWidth: '100vw', width: '100vw', border: '8px solid #333', borderRadius: '40px', overflow: 'hidden', WebkitOverflowScrolling: 'touch', position: 'relative' }}>
      <style>
        {`
          @supports (-webkit-touch-callout: none) {
            .hero-section {
              height: 55% !important;
              max-height: 55% !important;
            }
            .content-section {
              height: 45% !important;
              max-height: 45% !important;
            }
          }
          
          /* Specific fix for Brave browser */
          @media screen and (-webkit-min-device-pixel-ratio:0) {
            .hero-section {
              height: 440px !important;
            }
            .content-section {
              height: 360px !important;
            }
          }
        `}
      </style>
      
      {/* Hero Section - 55% of screen with cityscape background */}
      <div 
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-gray-700 to-gray-600 hero-section"
        style={{ 
          height: isBrave ? '440px' : '55%',
          minHeight: isBrave ? '440px' : 'auto',
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay for placeholder background if needed */}
        {!backgroundImage && (
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Cg fill='%23000000'%3E%3Crect x='50' y='150' width='80' height='250'/%3E%3Crect x='150' y='180' width='60' height='220'/%3E%3Crect x='230' y='120' width='90' height='280'/%3E%3Crect x='340' y='160' width='70' height='240'/%3E%3Crect x='430' y='100' width='100' height='300'/%3E%3Crect x='550' y='140' width='80' height='260'/%3E%3Crect x='650' y='110' width='85' height='290'/%3E%3Crect x='755' y='170' width='65' height='230'/%3E%3Crect x='840' y='130' width='95' height='270'/%3E%3Crect x='955' y='155' width='75' height='245'/%3E%3Crect x='1050' y='125' width='100' height='275'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}></div>
        )}
      </div>

      {/* Book Cover - Positioned with bottom edge 12% above PROJECT UPLIFT */}
      {heroImage && (
        <div 
          className="absolute z-20"
          style={{
            bottom: isBrave ? '536px' : 'calc(45% + 22%)',
            right: '52%',
            transform: 'translateX(50%) rotate(20deg) translateY(5vh)',
            WebkitTransform: 'translateX(50%) rotate(20deg) translateY(5vh)',
            animation: 'bookSpin 2s ease-out',
            WebkitAnimation: 'bookSpin 2s ease-out',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d'
          }}
        >
          <style>
            {`
              @keyframes bookSpin {
                0% {
                  transform: translateX(50%) rotateY(0deg) rotate(20deg) translateY(5vh);
                  -webkit-transform: translateX(50%) rotateY(0deg) rotate(20deg) translateY(5vh);
                }
                100% {
                  transform: translateX(50%) rotateY(360deg) rotate(20deg) translateY(5vh);
                  -webkit-transform: translateX(50%) rotateY(360deg) rotate(20deg) translateY(5vh);
                }
              }
              @-webkit-keyframes bookSpin {
                0% {
                  -webkit-transform: translateX(50%) rotateY(0deg) rotate(20deg) translateY(5vh);
                }
                100% {
                  -webkit-transform: translateX(50%) rotateY(360deg) rotate(20deg) translateY(5vh);
                }
              }
            `}
          </style>
          <img 
            src={heroImage}
            alt="Book Cover"
            className=""
            style={{ 
              height: '200px',
              width: 'auto',
              objectFit: 'contain',
              transform: 'perspective(1000px) rotateY(-5deg)',
              WebkitTransform: 'perspective(1000px) rotateY(-5deg)',
              filter: 'drop-shadow(10px 15px 25px rgba(0,0,0,0.6)) drop-shadow(5px 8px 15px rgba(0,0,0,0.4))',
              WebkitFilter: 'drop-shadow(10px 15px 25px rgba(0,0,0,0.6)) drop-shadow(5px 8px 15px rgba(0,0,0,0.4))',
              boxShadow: '10px 15px 30px rgba(0,0,0,0.5), 5px 8px 15px rgba(0,0,0,0.3), inset -2px 0 8px rgba(0,0,0,0.2)',
              WebkitBoxShadow: '10px 15px 30px rgba(0,0,0,0.5), 5px 8px 15px rgba(0,0,0,0.3), inset -2px 0 8px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      )}

      {/* Content Section - 45% of screen */}
      <div 
        className="absolute bottom-0 left-0 w-full bg-white content-section"
        style={{ height: isBrave ? '360px' : '45%', minHeight: isBrave ? '360px' : 'auto' }}
      >
        {/* Project UPLIFT Header - Positioned above content section */}
        <div className="absolute left-0 w-full bg-white py-2 px-6 shadow-md z-40" style={{ top: '-4vh' }}>
          <p className="text-gray-900 font-semibold text-center uppercase tracking-wide">
            <span className="font-extrabold text-base sm:text-lg text-red-700">PROJECT UPLIFT</span>
            <br />
            <span className="text-xs text-gray-600">by CESI Community Partners</span>
          </p>
        </div>
        
        <div className="h-full flex flex-col justify-center px-6 py-4 text-center overflow-y-auto" style={{ paddingTop: '3rem' }}>
          {/* Countdown Timer */}
          <div className="mb-3 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-3 shadow-lg border-2 border-red-300 flex-shrink-0">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-red-700 mb-2">
              🚀 Launch Countdown
            </h3>
            <div className="flex justify-center gap-2 sm:gap-3">
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HOURS', value: timeLeft.hours },
                { label: 'MINS', value: timeLeft.minutes },
                { label: 'SECS', value: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl font-bold text-red-700">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-red-600 mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Button */}
          <style>
            {`
              @keyframes subtle-glow {
                0%, 100% {
                  box-shadow: 0 4px 15px rgba(185, 28, 28, 0.4);
                }
                50% {
                  box-shadow: 0 4px 25px rgba(185, 28, 28, 0.6);
                }
              }
              @-webkit-keyframes subtle-glow {
                0%, 100% {
                  box-shadow: 0 4px 15px rgba(185, 28, 28, 0.4);
                }
                50% {
                  box-shadow: 0 4px 25px rgba(185, 28, 28, 0.6);
                }
              }
            `}
          </style>
          <button
            onClick={handleAudioClick}
            className="w-full max-w-xs bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 px-4 rounded-full mb-2 transition-all duration-200 flex items-center justify-center gap-2 mx-auto text-xs sm:text-sm flex-shrink-0"
            style={{
              animation: 'subtle-glow 2s ease-in-out infinite',
              WebkitAnimation: 'subtle-glow 2s ease-in-out infinite'
            }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            PRESS HERE FOR AUDIO SAMPLE
          </button>

          {/* Book Title */}
          <div className="my-2 flex-shrink-0">
            <h1 className="text-sm sm:text-base font-bold uppercase tracking-tight text-gray-800">
              {CONFIG.bookTitle}
            </h1>
            <p className="text-xs uppercase tracking-wide text-gray-600 mt-1">
              {CONFIG.bookSubtitle}
            </p>
          </div>

          {/* Secondary Buttons */}
          <div className="flex gap-2 justify-center px-2 flex-shrink-0 flex-wrap">
            <button
              onClick={handleReadClick}
              className="bg-white border-2 border-red-700 text-red-700 hover:bg-red-50 font-bold py-2 px-3 sm:px-4 rounded-full transition-all duration-200 text-xs sm:text-sm"
            >
              READ SAMPLE
            </button>
            <button
              onClick={handlePreOrderClick}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-3 sm:px-4 rounded-full transition-all duration-200 text-xs sm:text-sm"
              style={{
                animation: 'subtle-glow 2s ease-in-out infinite',
                WebkitAnimation: 'subtle-glow 2s ease-in-out infinite'
              }}
            >
              PRE-ORDER BOOK
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-xs uppercase tracking-widest text-gray-400 mt-3 flex-shrink-0">
            © 2024 Rumble Young Man Project
          </p>
        </div>
      </div>

      {/* Audio Modal */}
      {showAudioModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAudioModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Audio Sample</h3>
              <button
                onClick={() => setShowAudioModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-4">Rumble, Young Man - Audio Excerpt</p>
              <iframe 
                width="100%" 
                height="300" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/g-tech-382204300/audio-sample-1&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                title="SoundCloud Audio Player"
              />
            </div>
            <button
              onClick={() => setShowAudioModal(false)}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookLaunchHero;
