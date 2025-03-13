'use strict';

// SELECTIONS
const allSections = document.querySelectorAll('section');

const btnHeader = document.querySelector('.btn--header');
const btnServices = document.querySelectorAll('.btn--services');

const section2 = document.querySelector('.section--2');

// sections reveal while scrolling
const revealSection = function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    });
}
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.2
});

allSections.forEach(section => {
    section.classList.add('section--hidden');
    sectionObserver.observe(section);
});

// Page Navigation
btnHeader.addEventListener('click', function () {
    section2.scrollIntoView({ behavior: 'smooth' });
});


// SERVICES SECTION
// disable services buttons - temporary
section2.addEventListener('click', function (event) {
    if (event.target.closest('.btn--services')) event.preventDefault();
});

