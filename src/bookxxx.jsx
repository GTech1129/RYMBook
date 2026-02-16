import React, { useState, useEffect } from 'react';

// ✅ Analytics helper (outside the component)
const sendEvent = (eventName, params = {}) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params
    });
  }
};

const BookLaunchPage = () => {
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [heroImage] = useState('/assets/book-cover.png');
  const [backgroundImage] = useState('/assets/cityscape-bg.png');
  const [isBrave, setIsBrave] = useState(false);
  const [sessionStart] = useState(Date.now());

  useEffect(() => {
    // Detect Brave browser
    const detectBrave = async () => {
      if (navigator.brave && await navigator.brave.isBrave()) {
        setIsBrave(true);
      }
    };
    detectBrave();

    // ✅ Track session start
    sendEvent('session_start', {
      event_category: 'engagement'
    });

    // ✅ Track time spent on page
    const trackTimeSpent = () => {
      const timeSpent = Math.round((Date.now() - sessionStart) / 1000);

      sendEvent('time_on_site', {
        event_category: 'engagement',
        event_label: 'session_duration',
        value: timeSpent
      });
    };

    // Track when user leaves
    window.addEventListener('beforeunload', trackTimeSpent);

    // Track every 30 seconds
    const interval = setInterval(() => {
      trackTimeSpent();
    }, 30000);

    return () => {
      window.removeEventListener('beforeunload', trackTimeSpent);
      clearInterval(interval);
      trackTimeSpent();
    };
  }, [sessionStart]);

  // 🔽 Scroll
  const scrollToAbout = () => {
    sendEvent('click', {
      event_category: 'navigation',
      event_label: 'learn_more_clicked'
    });

    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // 🔊 Audio
  const handleAudioClick = () => {
    sendEvent('click', {
      event_category: 'engagement',
      event_label: 'listen_to_audio_clicked'
    });

    setShowAudioModal(true);
  };

  // 📖 Read
  const handleReadClick = () => {
    sendEvent('click', {
      event_category: 'engagement',
      event_label: 'read_sample_clicked'
    });

    window.open('https://heyzine.com/flip-book/f0402da946.html', '_blank');
  };

  // 🛒 Order
  const handleOrderClick = () => {
    sendEvent('purchase_intent', {
      event_category: 'conversion',
      event_label: 'order_book_clicked'
    });

    window.open('https://payhip.com/b/HyAft', '_blank');
  };


  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap');
          
          h1, h2, h3 {
            font-family: 'Playfair Display', serif;
          }

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

          @supports (-webkit-touch-callout: none) {
            .hero-section {
              height: 55% !important;
            }
            .content-section {
              height: 45% !important;
            }
          }
          
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

      {/* HERO SECTION WITH PHONE FRAME */}
      <div className="relative w-full bg-gray-100 mx-auto" style={{ 
        height: '100vh', 
        minHeight: '100vh', 
        maxHeight: '100vh', 
        maxWidth: '100vw', 
        width: '100vw', 
        border: '8px solid #333', 
        borderRadius: '40px', 
        overflow: 'hidden', 
        WebkitOverflowScrolling: 'touch', 
        position: 'relative' 
      }}>
        
        {/* Hero Section - 55% of screen with cityscape background */}
        <div 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-gray-700 to-gray-600 hero-section"
          style={{ 
            height: isBrave ? '440px' : '55%',
            minHeight: isBrave ? '440px' : 'auto',
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : '',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Book Cover - Positioned with original styling */}
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
            <img 
              src={heroImage}
              alt="Book Cover"
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
            {/* Book Title */}
            <div className="mb-3 flex-shrink-0">
              <h1 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-gray-800">
                RUMBLE, YOUNG MAN
              </h1>
              <p className="text-xs uppercase tracking-wide text-gray-600 mt-1">
                A STORY OF FIGHTING FOR THE LEAST OF THESE
              </p>
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
              LISTEN TO AUDIO
            </button>

            {/* Secondary Buttons */}
            <div className="flex gap-2 justify-center px-2 flex-shrink-0 flex-wrap mb-3">
              <button
                onClick={handleReadClick}
                className="bg-white border-2 border-red-700 text-red-700 hover:bg-red-50 font-bold py-2 px-3 sm:px-4 rounded-full transition-all duration-200 text-xs sm:text-sm"
              >
                READ SAMPLE
              </button>
              <button
                onClick={handleOrderClick}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-3 sm:px-4 rounded-full transition-all duration-200 text-xs sm:text-sm"
                style={{
                  animation: 'subtle-glow 2s ease-in-out infinite',
                  WebkitAnimation: 'subtle-glow 2s ease-in-out infinite'
                }}
              >
                ORDER BOOK
              </button>
            </div>

            {/* Learn More Button */}
            <button
              onClick={scrollToAbout}
              className="text-gray-600 hover:text-red-700 text-xs font-semibold uppercase tracking-wider flex flex-col items-center gap-1 mx-auto transition-all duration-200 flex-shrink-0"
              style={{ marginTop: '8px' }}
            >
              LEARN MORE
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Footer Text */}
            <p className="text-xs uppercase tracking-widest text-gray-400 mt-3 flex-shrink-0">
              © 2026 Rumble Young Man Project
            </p>
          </div>
        </div>
      </div>

      {/* ABOUT SECTIONS */}
      <div id="about-section" style={{
        backgroundColor: '#F5F5F3',
        color: '#1F1F1F',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* THE BOOK */}
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '120px 40px'
        }}>
          <h2 style={{
            fontSize: '14px',
            letterSpacing: '2px',
            marginBottom: '24px',
            fontFamily: 'Inter',
            fontWeight: 600
          }}>
            THE BOOK
          </h2>
          <h3 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            marginBottom: '32px',
            lineHeight: 1.3
          }}>
            What this book is
          </h3>
          <p style={{ fontSize: '18px', marginBottom: '24px', lineHeight: 1.8 }}>
            Rumble, Young Man is not fiction. It is not theory. It is testimony.
          </p>
          <p style={{ fontSize: '18px', marginBottom: '24px', lineHeight: 1.8 }}>
            Written from inside cycles of incarceration, displacement, and legal conflict, this book preserves moments often erased — voices rarely archived, stories rarely believed.
          </p>
          <p style={{ fontSize: '18px', lineHeight: 1.8 }}>
            This is a record.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(31, 31, 31, 0.15)', maxWidth: '1200px', margin: '0 auto' }} />

        {/* THE STORY */}
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '120px 40px'
        }}>
          <h2 style={{
            fontSize: '14px',
            letterSpacing: '2px',
            marginBottom: '24px',
            fontFamily: 'Inter',
            fontWeight: 600
          }}>
            THE STORY
          </h2>
          <h3 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            marginBottom: '32px',
            lineHeight: 1.3
          }}>
            Where it begins
          </h3>
          <p style={{ fontSize: '18px', marginBottom: '24px', lineHeight: 1.8 }}>
            The story follows a young man navigating systems that criminalize poverty, fracture families, and redefine freedom.
          </p>
          <p style={{ fontSize: '18px', marginBottom: '24px', lineHeight: 1.8 }}>
            It is told without apology. Without exaggeration. Without permission.
          </p>
          <p style={{ fontSize: '18px', lineHeight: 1.8 }}>
            What survives here is memory — and the refusal to disappear.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(31, 31, 31, 0.15)', maxWidth: '1200px', margin: '0 auto' }} />

        {/* THE SYSTEM */}
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '120px 40px'
        }}>
          <h2 style={{
            fontSize: '14px',
            letterSpacing: '2px',
            marginBottom: '24px',
            fontFamily: 'Inter',
            fontWeight: 600
          }}>
            THE SYSTEM
          </h2>
          <h3 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            marginBottom: '32px',
            lineHeight: 1.3
          }}>
            Why this story matters
          </h3>
          <p style={{ fontSize: '18px', marginBottom: '24px', lineHeight: 1.8 }}>
            Millions move through institutions that leave no public trace of their inner lives. What happens inside those spaces is often reduced to numbers, charges, or headlines.
          </p>
          <p style={{ fontSize: '18px', marginBottom: '24px', lineHeight: 1.8 }}>
            This project exists to counter that silence.
          </p>
          <p style={{ fontSize: '18px', lineHeight: 1.8 }}>
            Not to explain the system — but to reveal its human cost.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(31, 31, 31, 0.15)', maxWidth: '1200px', margin: '0 auto' }} />

        {/* THE PROJECT */}
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '120px 40px'
        }}>
          <h2 style={{
            fontSize: '14px',
            letterSpacing: '2px',
            marginBottom: '24px',
            fontFamily: 'Inter',
            fontWeight: 600
          }}>
            THE PROJECT
          </h2>
          <h3 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            marginBottom: '32px',
            lineHeight: 1.3
          }}>
            More than a book
          </h3>
          <p style={{ fontSize: '18px', marginBottom: '24px', lineHeight: 1.8 }}>
            Rumble, Young Man is part of Project Uplift, an initiative dedicated to preserving truth, amplifying unheard narratives, and creating space for testimony.
          </p>
          <p style={{ fontSize: '18px', lineHeight: 1.8 }}>
            This work stands as both documentation and resistance.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(31, 31, 31, 0.15)', maxWidth: '1200px', margin: '0 auto' }} />

        {/* ENGAGE */}
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '120px 40px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '14px',
            letterSpacing: '2px',
            marginBottom: '24px',
            fontFamily: 'Inter',
            fontWeight: 600
          }}>
            ENGAGE
          </h2>
          <h3 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            marginBottom: '32px',
            lineHeight: 1.3
          }}>
            How to support or engage
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            fontSize: '18px',
            marginBottom: '48px',
            lineHeight: 2.2
          }}>
            <li>Read the book</li>
            <li>Listen to the audio</li>
            <li>Share the story</li>
            <li>Support the project</li>
          </ul>
          <p style={{ fontSize: '16px', marginBottom: '40px', fontStyle: 'italic' }}>
            Every action sustains visibility.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleOrderClick}
              style={{
                backgroundColor: '#B11217',
                color: '#F5F5F3',
                border: 'none',
                padding: '16px 40px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.5px',
                fontFamily: 'Inter'
              }}
            >
              ORDER THE BOOK
            </button>
            <button
              onClick={handleAudioClick}
              style={{
                backgroundColor: 'transparent',
                color: '#1F1F1F',
                border: '2px solid #1F1F1F',
                padding: '16px 40px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.5px',
                fontFamily: 'Inter'
              }}
            >
              LISTEN TO AUDIO
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          borderTop: '1px solid rgba(31, 31, 31, 0.15)',
          padding: '60px 40px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '12px',
            letterSpacing: '1px',
            margin: 0
          }}>
            © 2026 RUMBLE YOUNG MAN PROJECT<br/>
            A Project Uplift Initiative
          </p>
        </footer>
      </div>

      {/* Audio Modal */}
      {showAudioModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
          onClick={() => setShowAudioModal(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '600px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                Audio Sample
              </h3>
              <button
                onClick={() => setShowAudioModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  color: '#666',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                ×
              </button>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                Rumble, Young Man - Audio Excerpt
              </p>
              <iframe 
                width="100%" 
                height="300" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2262219530&color=%23121111&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                title="SoundCloud Audio Player"
              />
            </div>
            <button
              onClick={() => setShowAudioModal(false)}
              style={{
                width: '100%',
                backgroundColor: '#B11217',
                color: '#F5F5F3',
                border: 'none',
                padding: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookLaunchPage;
