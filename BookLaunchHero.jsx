import React, { useState, useEffect } from 'react';

const BookLaunchHero = () => {
  // Configuration
  const CONFIG = {
    launchDate: '2026-02-01T00:00:00',
    bookTitle: 'RUMBLE, YOUNG MAN',
    bookSubtitle: 'A STORY OF FIGHTING FOR THE LEAST OF THESE',
    audioUrl: 'https://www.dropbox.com/scl/fi/ljf5po4hbqv1kckxah4ol/Rumble-Young-Man-Audio-Sample.mp3?rlkey=idrdczi92f3crerdw4glc8ic5&st=9i6muv1d&dl=1' // Changed dl=0 to dl=1 for direct download
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [heroImage, setHeroImage] = useState('https://i.imgur.com/tDcLTaS.png');
  const [backgroundImage, setBackgroundImage] = useState('https://i.imgur.com/jfjcET0.png');
  const [isBrave, setIsBrave] = useState(false);

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
    if (CONFIG.audioUrl) {
      window.open(CONFIG.audioUrl, '_blank');
    } else {
      alert('Audio excerpt coming soon!');
    }
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
        {/* Overlay for uploaded background if needed */}
        {!backgroundImage && (
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Cg fill='%23000000'%3E%3Crect x='50' y='150' width='80' height='250'/%3E%3Crect x='150' y='180' width='60' height='220'/%3E%3Crect x='230' y='120' width='90' height='280'/%3E%3Crect x='340' y='160' width='70' height='240'/%3E%3Crect x='430' y='100' width='100' height='300'/%3E%3Crect x='550' y='140' width='80' height='260'/%3E%3Crect x='650' y='110' width='85' height='290'/%3E%3Crect x='755' y='170' width='65' height='230'/%3E%3Crect x='840' y='130' width='95' height='270'/%3E%3Crect x='955' y='155' width='75' height='245'/%3E%3Crect x='1050' y='125' width='100' height='275'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}></div>
        )}

        {/* Upload buttons when no images */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <label className="cursor-pointer">
            <div className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 inline-flex items-center gap-2 shadow-xl text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Background
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              className="hidden"
            />
          </label>
          <label className="cursor-pointer">
            <div className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 inline-flex items-center gap-2 shadow-xl text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Cover
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Book Cover - Positioned with bottom edge 12% above PROJECT UPLIFT */}
      {heroImage && (
        <div 
          className="absolute z-20"
          style={{
            bottom: isBrave ? '456px' : 'calc(45% + 12%)',
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
            className="rounded-lg"
            style={{ 
              height: '200px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(20px 20px 30px rgba(0,0,0,0.5))',
              WebkitFilter: 'drop-shadow(20px 20px 30px rgba(0,0,0,0.5))',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6), inset -5px 0 10px rgba(0,0,0,0.3)',
              WebkitBoxShadow: '0 25px 50px -12px rgba(0,0,0,0.6), inset -5px 0 10px rgba(0,0,0,0.3)'
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
            PRESS HERE FOR AUDIO
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
    </div>
  );
};

export default BookLaunchHero;
