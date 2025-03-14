'use strict';

// SELECTIONS
const allSections = document.querySelectorAll('section');

const btnHeader = document.querySelector('.btn--header');
const btnServices = document.querySelectorAll('.btn--services');

const section2 = document.querySelector('.section--2');

const containerFAQ = document.querySelector('.accordion-container');
const itemsFAQ = document.querySelectorAll('.accordion-item');

const corouselContainer = document.querySelector('.corousel-container');
const testimonials = document.querySelectorAll('.corousel-testimonial-text');
const dotContainer = document.querySelector('.corousel-dots');

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

// FAQ SECTION
containerFAQ.addEventListener('click', function (event) {
    const clickedItemFAQ = event.target.closest('.accordion-item');
    if (!clickedItemFAQ) return;


    const openStatus = clickedItemFAQ.classList.contains('active') ? true : false;
    itemsFAQ.forEach(item => item.classList.remove('active'));
    if (!openStatus) clickedItemFAQ.classList.add('active');
});

// COROUSEL
// Corousel functions
const currentTestimonial = 0;
const createDots = function () {
    console.log('create dots');
    testimonials.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="btn-dot" data-number=${i}>&nbsp;</button>`
        );
    });
}

const activateDot = function (dotNumber) {
    const dots = document.querySelectorAll('.btn-dot');
    dots.forEach(dot =>
        +dot.dataset.number === dotNumber && dot.classList.add('dot-active')
    )
}

// Corousel set up
createDots();
activateDot(0);

