// Variable Declarations
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');
const resumeBtns = document.querySelectorAll('.resume-btn');
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

// --- 1. Toggle Menu Icon and Navbar (Mobile View) ---
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// --- 2. Central Page Activation Function (Handles Animation Reset) ---
const activePage = () => {
    // Note: Assuming 'header' has the class '.active' in the HTML
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    // Reset and re-trigger bars animation
    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 10); // Use a small delay for re-triggering animation (if any)

    // Reset header animation (removed from initial logic for clarity, 
    // but kept the structure if you need custom entrance/exit effects)
    // header.classList.remove('active');
    // setTimeout(() => {
    //     header.classList.add('active');
    // }, 1100); 

    // Remove 'active' state from all navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Hide all sections for transition effect
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Close mobile menu immediately upon navigation
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// --- 3. Navigation Link Click Handler ---
navLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior (instant jump)

        if (!link.classList.contains('active')) {
            activePage();

            link.classList.add('active');

            // Apply 'active' to the corresponding section after animation delay
            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

// --- 4. Logo Click Handler (Goes to Home) ---
logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Assuming the Home link is always the first link (index 0)
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

// --- 5. Automatic Section Highlighting on Scroll (New Code) ---
window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        // Adjust offset to trigger the active state slightly before the section hits the top
        const offset = sec.offsetTop - 150; 
        const height = sec.offsetHeight;
        
        // Use the section's class name (e.g., 'home', 'services') for matching
        const id = sec.getAttribute('class').split(' ')[0]; 

        if (top >= offset && top < offset + height) {
            // Remove 'active' class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add 'active' class to the corresponding nav link
            const targetLink = document.querySelector('header nav a[href*=' + id + ']');
            if(targetLink) {
                 targetLink.classList.add('active');
            }
        }
    });
    
    // Optional: Add a sticky class to the header after scrolling
    // const header = document.querySelector('header');
    // header.classList.toggle('sticky', window.scrollY > 100);
};

// --- 6. Resume/Tab Switching Logic ---
resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-details');
        
        // Deactivate all buttons
        resumeBtns.forEach(b => {
            b.classList.remove('active');
        });         
        
        // Activate clicked button
        btn.classList.add('active');

        // Hide all detail sections
        resumeDetails.forEach(details => {
            details.classList.remove('active');
        });

        // Show corresponding detail section
        resumeDetails[idx].classList.add('active')
    });
});


// --- 7. Portfolio Carousel Logic ---
const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    
    // Calculate transform: Moves the carousel strip left by the index * (100% + 2rem gap)
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    // Reset all detail views and activate the current one
    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
    
    // Manage arrow disabled states
    if (index === 0) {
        arrowLeft.classList.add('disabled');
    } else {
        arrowLeft.classList.remove('disabled');
    }
    
    // Note: There are 6 portfolio details/images, so max index is 5.
    if (index === 5) { 
        arrowRight.classList.add('disabled');
    } else {
        arrowRight.classList.remove('disabled');
    }
}

// Initial state management
activePortfolio();

arrowRight.addEventListener('click' , () => {
    // Max index is 5 (for 6 items: 0, 1, 2, 3, 4, 5)
    if (index < 5) {
        index++;
    }
    activePortfolio();
});

arrowLeft.addEventListener('click' , () => {
    // Min index is 0
    if (index > 0) {
        index--;
    }
    activePortfolio();
});