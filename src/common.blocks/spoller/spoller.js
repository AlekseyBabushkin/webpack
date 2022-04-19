/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
  const spollersRegular = Array.from(spollersArray).filter(item => !item.dataset.spollers.split(',')[0]); if (spollersRegular.length > 0) {
    // eslint-disable-next-line no-use-before-define
    initSpollers(spollersRegular);
  }
  // eslint-disable-next-line func-names
  const spollersMedia = Array.from(spollersArray).filter(item => item.dataset.spollers.split(',')[0]);

  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach((item) => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(',');
      // eslint-disable-next-line prefer-destructuring
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    let mediaQueries = breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`);
    mediaQueries = mediaQueries.filter((item, index, self) => self.indexOf(item) === index);
    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(',');
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);
      // eslint-disable-next-line consistent-return
      const spollersArray = breakpointsArray.filter((item) => {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      matchMedia.addListener(() => {
        // eslint-disable-next-line no-use-before-define
        initSpollers(spollersArray, matchMedia);
      });
      // eslint-disable-next-line no-use-before-define
      initSpollers(spollersArray, matchMedia);
    });
  }

  // eslint-disable-next-line no-inner-declarations
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init');
        // eslint-disable-next-line no-use-before-define
        initSpollerBody(spollersBlock);
        // eslint-disable-next-line no-use-before-define
        spollersBlock.addEventListener('click', setSpollerAction);
      } else {
        spollersBlock.classList.remove('_init');
        // eslint-disable-next-line no-use-before-define
        initSpollerBody(spollersBlock, false);
        // eslint-disable-next-line no-use-before-define
        spollersBlock.removeEventListener('click', setSpollerAction);
      }
    });
  }

  // eslint-disable-next-line no-inner-declarations
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex');
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1');
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  }
  // eslint-disable-next-line no-inner-declarations
  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
      const spollersBlock = spollerTitle.closest('[data-spollers]');
      const oneSpoller = !!spollersBlock.hasAttribute('data-one-spoller');
      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          // eslint-disable-next-line no-use-before-define
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle('_active');
        // eslint-disable-next-line no-use-before-define
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }
  // eslint-disable-next-line no-inner-declarations
  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active');
      // eslint-disable-next-line no-use-before-define
      _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  }
}

// eslint-disable-next-line no-underscore-dangle
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${target.offsetHeight}px`;
    // eslint-disable-next-line no-unused-expressions
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
// eslint-disable-next-line no-underscore-dangle
const _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    const height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    // eslint-disable-next-line no-unused-expressions
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
// eslint-disable-next-line no-underscore-dangle
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  }
  return _slideUp(target, duration);
};
