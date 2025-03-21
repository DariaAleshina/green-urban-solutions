'use strict';

// SELECTIONS
const allSections = document.querySelectorAll('section');

const btnHeader = document.querySelector('.btn--header');
const btnServices = document.querySelectorAll('.btn--services');

const section2 = document.querySelector('#section--2');

const containerFAQ = document.querySelector('.accordion-container');
const itemsFAQ = document.querySelectorAll('.accordion-item');

const corouselContainer = document.querySelector('.corousel-container');
const testimonials = document.querySelectorAll('.corousel-testimonial-text');
const testimonialImages = document.querySelectorAll('.corousel-testimonial-img');
const dotContainer = document.querySelector('.corousel-dots');
const btnTestimonialsLeft = document.querySelector('.btn-corousel--left');
const btnTestimonialsRight = document.querySelector('.btn-corousel--right');

// INIT SETUP
let currentTestimonial = 0;
const maxNumberTestimonials = testimonials.length;

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

// PROJECT SECTION 
// disable links -  - temporary
document.querySelector('#section--3').addEventListener('click', function (event) {
    if (event.target.closest('.table-colunm--link')) event.preventDefault();
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

const createDots = function () {
    testimonials.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="btn-dot" data-number=${i}>&nbsp;</button>`
        );
    });
}


const activateDot = function (dotNumber) {
    const dots = document.querySelectorAll('.btn-dot');
    dots.forEach(dot => {
        dot.classList.remove('dot-active');
        +dot.dataset.number === dotNumber && dot.classList.add('dot-active')
    });
}

const openTestimonial = function (testimonialNumber) {
    testimonials.forEach((el, i) => {
        el.classList.add('hidden');
        if (i === testimonialNumber) el.classList.remove('hidden');
    })

    testimonialImages.forEach((img, i) => {
        img.classList.add('hidden');
        if (i === testimonialNumber) img.classList.remove('hidden');
    })
}

const openNextTestimonial = function () {
    if (currentTestimonial === maxNumberTestimonials - 1) {
        currentTestimonial = 0;
    } else {
        currentTestimonial++;
    }
    openTestimonial(currentTestimonial);
    activateDot(currentTestimonial);
}

const openPrevTestimonial = function () {
    if (currentTestimonial === 0) {
        currentTestimonial = maxNumberTestimonials - 1;
    } else {
        currentTestimonial--;
    }
    openTestimonial(currentTestimonial);
    activateDot(currentTestimonial);
}

// Corousel initial set up
createDots();
activateDot(currentTestimonial);
openTestimonial(currentTestimonial);

// Corousel - buttons click handling

dotContainer.addEventListener('click', function (event) {
    const clickedDot = event.target.closest('.btn-dot');
    if (!clickedDot) return;
    const clickedDotNumber = +clickedDot.dataset.number;
    openTestimonial(clickedDotNumber);
    activateDot(clickedDotNumber);
});

btnTestimonialsLeft.addEventListener('click', openPrevTestimonial);
btnTestimonialsRight.addEventListener('click', openNextTestimonial);