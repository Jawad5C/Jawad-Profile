// Tab Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            header.style.transform = 'translateY(-10px)';
            header.style.opacity = '0.95';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
    });

    // Add typing animation to name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animation to profile image
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    }

    // Add parallax effect to background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body');
        const speed = scrolled * 0.5;
        
        parallax.style.backgroundPosition = `center ${speed}px`;
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Swan Lake Orchestra Functionality
    const orchestraToggle = document.getElementById('orchestraToggle');
    const orchestraPlayer = document.querySelector('.orchestra-player');
    
    let isOrchestraActive = false;
    let audioContext;
    let allOscillators = [];
    let allGains = [];
    
    // Initialize Web Audio API
    function initAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    // Create complete symphony orchestra for Swan Lake
    function createSwanLakeOrchestra() {
        // Stop all existing sounds
        allOscillators.forEach(osc => {
            try { osc.stop(); } catch(e) {}
        });
        allOscillators = [];
        allGains = [];
        
        const oscillators = [];
        const gains = [];
        
        // SWAN LAKE - COMPLETE SYMPHONY ORCHESTRA
        
        // 1. STRINGS SECTION
        // First Violins - Main melody
        const firstViolins = [
            { note: 392, time: 0, duration: 0.75 },     // G4
            { note: 440, time: 0.75, duration: 0.25 },  // A4
            { note: 494, time: 1, duration: 0.5 },      // B4
            { note: 523, time: 1.5, duration: 0.5 },    // C5
            { note: 494, time: 2, duration: 0.5 },      // B4
            { note: 440, time: 2.5, duration: 0.5 },    // A4
            { note: 392, time: 3, duration: 1 },        // G4
            { note: 330, time: 4, duration: 0.75 },     // E4
            { note: 370, time: 4.75, duration: 0.25 },  // F#4
            { note: 392, time: 5, duration: 0.5 },      // G4
            { note: 440, time: 5.5, duration: 0.5 },    // A4
            { note: 370, time: 6, duration: 0.5 },      // F#4
            { note: 330, time: 6.5, duration: 1.5 }     // E4
        ];
        
        firstViolins.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            osc.detune.setValueAtTime((Math.random() - 0.5) * 2, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + note.time + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Second Violins - Harmony
        const secondViolins = [
            { note: 330, time: 0, duration: 4 },        // E4
            { note: 370, time: 4, duration: 4 },        // F#4
            { note: 330, time: 8, duration: 4 },        // E4
            { note: 294, time: 12, duration: 4 }        // D4
        ];
        
        secondViolins.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + note.time + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Violas - Mid harmony
        const violas = [
            { note: 196, time: 0, duration: 4 },        // G3
            { note: 220, time: 4, duration: 4 },        // A3
            { note: 185, time: 8, duration: 4 },        // F#3
            { note: 165, time: 12, duration: 4 }        // E3
        ];
        
        violas.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + note.time + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Cellos - Rich bass harmony
        const cellos = [
            { note: 98, time: 0, duration: 8 },         // G2
            { note: 110, time: 8, duration: 8 }         // A2
        ];
        
        cellos.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + note.time + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Double Basses - Deep foundation
        const doubleBasses = [
            { note: 49, time: 0, duration: 16 }         // G1
        ];
        
        doubleBasses.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + note.time + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // 2. WOODWINDS SECTION
        // Flutes - High arpeggios
        const flutes = [
            { note: 523, time: 2, duration: 0.3 },      // C5
            { note: 659, time: 2.3, duration: 0.3 },    // E5
            { note: 784, time: 2.6, duration: 0.3 },    // G5
            { note: 440, time: 6, duration: 0.3 },      // A4
            { note: 523, time: 6.3, duration: 0.3 },    // C5
            { note: 659, time: 6.6, duration: 0.3 },    // E5
            { note: 523, time: 10, duration: 0.3 },     // C5
            { note: 659, time: 10.3, duration: 0.3 },   // E5
            { note: 784, time: 10.6, duration: 0.3 }    // G5
        ];
        
        flutes.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + note.time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Oboes - Melodic counterpoint
        const oboes = [
            { note: 370, time: 1, duration: 0.5 },      // F#4
            { note: 392, time: 1.5, duration: 0.5 },    // G4
            { note: 440, time: 2, duration: 0.5 },      // A4
            { note: 330, time: 5, duration: 0.5 },      // E4
            { note: 370, time: 5.5, duration: 0.5 },    // F#4
            { note: 392, time: 6, duration: 0.5 }       // G4
        ];
        
        oboes.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + note.time + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Clarinets - Warm harmony
        const clarinets = [
            { note: 247, time: 0, duration: 2 },        // B3
            { note: 277, time: 2, duration: 2 },        // C#4
            { note: 247, time: 4, duration: 2 },        // B3
            { note: 220, time: 6, duration: 2 },        // A3
            { note: 247, time: 8, duration: 2 },        // B3
            { note: 277, time: 10, duration: 2 },       // C#4
            { note: 247, time: 12, duration: 2 },       // B3
            { note: 220, time: 14, duration: 2 }        // A3
        ];
        
        clarinets.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + note.time + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Bassoons - Low woodwind support
        const bassoons = [
            { note: 87, time: 0, duration: 8 },         // F2
            { note: 98, time: 8, duration: 8 }          // G2
        ];
        
        bassoons.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + note.time + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // 3. BRASS SECTION
        // French Horns - Mid-range brass
        const frenchHorns = [
            { note: 294, time: 0, duration: 2 },        // D4
            { note: 330, time: 2, duration: 2 },        // E4
            { note: 277, time: 4, duration: 2 },        // C#4
            { note: 247, time: 6, duration: 2 },        // B3
            { note: 294, time: 8, duration: 2 },        // D4
            { note: 330, time: 10, duration: 2 },       // E4
            { note: 277, time: 12, duration: 2 },       // C#4
            { note: 247, time: 14, duration: 2 }        // B3
        ];
        
        frenchHorns.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + note.time + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Trumpets - Bright brass accents
        const trumpets = [
            { note: 392, time: 4, duration: 0.5 },      // G4
            { note: 440, time: 4.5, duration: 0.5 },    // A4
            { note: 494, time: 5, duration: 0.5 },      // B4
            { note: 392, time: 8, duration: 0.5 },      // G4
            { note: 440, time: 8.5, duration: 0.5 },    // A4
            { note: 494, time: 9, duration: 0.5 }       // B4
        ];
        
        trumpets.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + note.time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Trombones - Rich brass harmony
        const trombones = [
            { note: 196, time: 0, duration: 4 },        // G3
            { note: 220, time: 4, duration: 4 },        // A3
            { note: 185, time: 8, duration: 4 },        // F#3
            { note: 165, time: 12, duration: 4 }        // E3
        ];
        
        trombones.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + note.time + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Tuba - Deep brass foundation
        const tuba = [
            { note: 73, time: 0, duration: 16 }         // D2
        ];
        
        tuba.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + note.time + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // 4. PERCUSSION SECTION
        // Timpani - Deep drum rolls
        const timpani = [
            { note: 55, time: 0, duration: 0.1 },       // G1
            { note: 55, time: 0.2, duration: 0.1 },     // G1
            { note: 55, time: 0.4, duration: 0.1 },     // G1
            { note: 55, time: 4, duration: 0.1 },       // G1
            { note: 55, time: 4.2, duration: 0.1 },     // G1
            { note: 55, time: 4.4, duration: 0.1 },     // G1
            { note: 55, time: 8, duration: 0.1 },       // G1
            { note: 55, time: 8.2, duration: 0.1 },     // G1
            { note: 55, time: 8.4, duration: 0.1 },     // G1
            { note: 55, time: 12, duration: 0.1 },      // G1
            { note: 55, time: 12.2, duration: 0.1 },    // G1
            { note: 55, time: 12.4, duration: 0.1 }     // G1
        ];
        
        timpani.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + note.time + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Cymbals - Crash accents
        const cymbals = [
            { note: 2000, time: 4, duration: 0.2 },     // High frequency crash
            { note: 2000, time: 8, duration: 0.2 },     // High frequency crash
            { note: 2000, time: 12, duration: 0.2 }     // High frequency crash
        ];
        
        cymbals.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + note.time + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // 5. HARP - Glissando effects
        const harp = [
            { note: 392, time: 1.5, duration: 0.2 },    // G4
            { note: 440, time: 1.7, duration: 0.2 },    // A4
            { note: 494, time: 1.9, duration: 0.2 },    // B4
            { note: 523, time: 2.1, duration: 0.2 },    // C5
            { note: 330, time: 5.5, duration: 0.2 },    // E4
            { note: 370, time: 5.7, duration: 0.2 },    // F#4
            { note: 392, time: 5.9, duration: 0.2 },    // G4
            { note: 440, time: 6.1, duration: 0.2 }     // A4
        ];
        
        harp.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.note, audioContext.currentTime + note.time);
            
            gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + note.time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
            
            oscillators.push(osc);
            gains.push(gain);
        });
        
        // Continuous loop - restart immediately when finished
        setTimeout(() => {
            if (allOscillators === oscillators) {
                createSwanLakeOrchestra();
            }
        }, 16000); // 16 seconds for the complete orchestral arrangement
        
        allOscillators = oscillators;
        allGains = gains;
    }
    
    // Toggle Swan Lake Orchestra on/off
    orchestraToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        isOrchestraActive = !isOrchestraActive;
        
        if (isOrchestraActive) {
            initAudioContext();
            orchestraToggle.classList.add('active');
            orchestraToggle.innerHTML = '<i class="fas fa-music"></i>';
            createSwanLakeOrchestra();
        } else {
            orchestraToggle.classList.remove('active');
            orchestraToggle.innerHTML = '<i class="fas fa-music"></i>';
            stopOrchestra();
        }
    });
    
    function stopOrchestra() {
        allOscillators.forEach(osc => {
            try { osc.stop(); } catch(e) {}
        });
        allOscillators = [];
        allGains = [];
    }
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#4F46E5'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    const activeTab = document.querySelector('.tab-btn.active');
    const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
    const currentIndex = tabButtons.indexOf(activeTab);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        tabButtons[currentIndex - 1].click();
    } else if (e.key === 'ArrowRight' && currentIndex < tabButtons.length - 1) {
        tabButtons[currentIndex + 1].click();
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.stat-item, .timeline-item, .skill-category, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Linked hover effect for CEO and MVP links
document.addEventListener('DOMContentLoaded', function() {
    const ceoText = document.querySelector('.ceo-text');
    const mvpLink = document.querySelector('.mvp-link');
    
    if (ceoText && mvpLink) {
        // When hovering over CEO text, also highlight MVP link
        ceoText.addEventListener('mouseenter', () => {
            mvpLink.classList.add('hover-effect');
        });
        
        ceoText.addEventListener('mouseleave', () => {
            mvpLink.classList.remove('hover-effect');
        });
        
        // When hovering over MVP link, also highlight CEO text
        mvpLink.addEventListener('mouseenter', () => {
            ceoText.classList.add('hover-effect');
        });
        
        mvpLink.addEventListener('mouseleave', () => {
            ceoText.classList.remove('hover-effect');
        });
    }
});
