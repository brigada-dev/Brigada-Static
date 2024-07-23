document.addEventListener('DOMContentLoaded', () => {
    let isScrolling;
    let viewportHeight = window.innerHeight;

    const snapToSection = () => {
        const currentScroll = window.scrollY;
        const nearestSectionIndex = Math.round(currentScroll / viewportHeight);
        window.scrollTo({ top: nearestSectionIndex * viewportHeight, behavior: 'smooth' });
    };

    const handleScroll = () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(snapToSection, 150);
    };

    window.addEventListener('resize', () => {
        viewportHeight = window.innerHeight;
    });

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            handleScroll();
        }
    });

    let startY;
    window.addEventListener('touchstart', (event) => {
        startY = event.touches[0].clientY;
    });

    window.addEventListener('touchend', (event) => {
        const endY = event.changedTouches[0].clientY;
        if (Math.abs(startY - endY) > 50) {
            handleScroll();
        }
    });
});


function scrollToBottom(pixels, duration) {
    const startPosition = window.pageYOffset;
    const targetPosition = startPosition + pixels;
    const startTime = performance.now();
  
    function animateScroll(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = elapsedTime / duration;
  
      if (progress < 1) {
        window.scrollTo(0, startPosition + pixels * easeInOutQuad(progress));
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, targetPosition);
      }
    }
  
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
  
    requestAnimationFrame(animateScroll);
  }
  
function scrollToTop(duration) {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
  
    function animateScroll(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = elapsedTime / duration;
  
      if (progress < 1) {
        window.scrollTo(0, startPosition * (1 - easeInOutQuad(progress)));
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, 0);
      }
    }
  
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
  
    requestAnimationFrame(animateScroll);
  }
  
window.addEventListener('scroll', function() {
    const stickyNav = document.getElementById('stickyNav');

    if (window.scrollY > window.screen.height) {
        stickyNav.classList.add('sticky-top');
    } else {
        stickyNav.classList.remove('sticky-top');
    }
});
function typeWriterText(text) {
    document.body.classList.add('no-scroll');
    scrollToTop(900);
    const element = document.querySelector('.decoding');
    let i = 0;
    element.textContent = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
    setTimeout(() => {
        scrollToBottom(400, 1000);
    }, 1000)
    setTimeout(() => {
        document.body.classList.remove('no-scroll');
    }, 2100)
}