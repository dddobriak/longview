const menu = document.querySelector(".nav-main");
const menuButton = document.querySelector(".nav-main-link");
const navMain = document.querySelector(".nav-main");
const navMainItemUl = document.querySelectorAll(".nav-main-item");

// Toggle menu button
menuButton.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("nav-main-open");
  e.target.closest('a').classList.toggle("is-active");
});

// Title menu toggle classes
const setTitleToggle = (e) => {
  if ( e.target.tagName === 'H2' && !!e.target.closest('.nav-main-item').querySelector('ul')) {
    e.target.closest('.nav-main-item').classList.toggle('item-active');
  }
}

// Nav observer
const navResizeObserver = new ResizeObserver(entries => {

  if ( entries[0].contentRect.width < 768 ) {

    navMainItemUl.forEach((e) => {
      if (!!e.querySelector('ul')) {
        let h2 = e.querySelector('h2');
        h2.classList.add('item-has-children');
      }

      // Remove, or not remove before... that is the question
      e.addEventListener('click', setTitleToggle);
    });

  } else {
    navMainItemUl.forEach((e) => {
      let h2 = e.querySelector('h2');

      if (!!h2 && h2.classList.contains('item-has-children')) {
        h2.classList.remove('item-has-children');
      }

      if (e.classList.contains('item-active')) {
        e.classList.remove('item-active');
      }

      e.removeEventListener('click', setTitleToggle);
    });
  }

});

navResizeObserver.observe(navMain);

