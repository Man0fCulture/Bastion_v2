import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

export function initAnimations() {
  if (prefersReducedMotion) return;

  initHeroAnimation();
  initScrollReveal();
  initStickySection();
}

function initHeroAnimation() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const title = hero.querySelector('[data-hero-title]');
  const subtitle = hero.querySelector('[data-hero-subtitle]');
  const cta = hero.querySelector('[data-hero-cta]');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from(title, {
    y: 40,
    opacity: 0,
    duration: 0.8
  })
  .from(subtitle, {
    y: 30,
    opacity: 0,
    duration: 0.8
  }, '-=0.5')
  .from(cta, {
    y: 20,
    opacity: 0,
    duration: 0.6
  }, '-=0.4');
}

function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  elements.forEach((el) => {
    const direction = el.getAttribute('data-reveal') || 'up';
    const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0');

    let fromVars: gsap.TweenVars = { opacity: 0 };

    switch (direction) {
      case 'up':
        fromVars.y = 40;
        break;
      case 'down':
        fromVars.y = -40;
        break;
      case 'left':
        fromVars.x = 40;
        break;
      case 'right':
        fromVars.x = -40;
        break;
      case 'fade':
        break;
    }

    gsap.from(el, {
      ...fromVars,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });
}

function initStickySection() {
  const section = document.querySelector('[data-sticky-section]');
  if (!section) return;

  const steps = section.querySelectorAll('[data-sticky-step]');
  if (!steps.length) return;

  steps.forEach((step, index) => {
    gsap.from(step, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 80%',
        once: true
      }
    });
  });
}

export function fadeIn(element: Element, delay = 0) {
  if (prefersReducedMotion) {
    gsap.set(element, { opacity: 1 });
    return;
  }

  gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay,
    ease: 'power3.out'
  });
}

export function staggerIn(elements: Element[] | NodeListOf<Element>, staggerDelay = 0.1) {
  if (prefersReducedMotion) {
    gsap.set(elements, { opacity: 1 });
    return;
  }

  gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: staggerDelay,
    ease: 'power3.out'
  });
}
