

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });
  
  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let lastScrollTop = 0;
  let scrollTop = document.querySelector('.scroll-top');
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.top = '-50px'; // Hide header
    } else {
        // Scrolling up
        header.style.top = '0'; // Show header
    }
    lastScrollTop = scrollTop;
});
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else if (window.scrollY < lastScrollY && window.scrollY < 100) {
    navbar.classList.remove('scrolled');
  }
  lastScrollY = window.scrollY;
});
  
  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();
document.getElementById('newsForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const image = document.getElementById('image').files[0];
  const content = document.getElementById('content').value;

  const reader = new FileReader();
  reader.onload = function(e) {
      const newsItem = {
          title: title,
          image: e.target.result,
          content: content
      };

      // Save to local storage
      let newsArray = JSON.parse(localStorage.getItem('news')) || [];
      newsArray.push(newsItem);
      localStorage.setItem('news', JSON.stringify(newsArray));

      displayNews();
  }
  reader.readAsDataURL(image);
});

function displayNews() {
  const newsArray = JSON.parse(localStorage.getItem('news')) || [];
  const newsDisplay = document.getElementById('newsDisplay');
  newsDisplay.innerHTML = '';

  newsArray.forEach((item, index) => {
      const newsItemHtml = `
          <div class="news-item">
              <h2>${item.title}</h2>
              <img src="${item.image}" alt="${item.title}">
              <p>${item.content}</p>
              <button class="delete-btn" onclick="deleteNews(${index})">Delete</button>
          </div>
      `;
      newsDisplay.innerHTML += newsItemHtml;
  });
}

function deleteNews(index) {
  let newsArray = JSON.parse(localStorage.getItem('news')) || [];
  newsArray.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem('news', JSON.stringify(newsArray)); // Update local storage
  displayNews(); // Refresh the display
}

// Load news items on page load
window.onload = displayNews;
// within mangose
// document.getElementById('newsForm').onsubmit = function(event) {
//   event.preventDefault();

//   const titleInput = document.getElementById('title');
//   const descriptionInput = document.getElementById('description');
//   const imageInput = document.getElementById('imageInput');

//   const formData = new FormData();
//   formData.append('title', titleInput.value);
//   formData.append('description', descriptionInput.value);
//   formData.append('imageFile', imageInput.files[0]);

//   fetch('/upload-news', {
//       method: 'POST',
//       body: formData
//   })
//   .then(response => response.json())
//   .then(data => {
//       // Show the image in the newsContainer
//       if (data.imageUrl) {
//           const container = document.getElementById('newsContainer');
//           const img = document.createElement('img');
//           img.src = data.imageUrl;
//           img.alt = 'Uploaded Image';
//           container.appendChild(img);
//       }

//       alert(data.message);
//       loadNews();  // Refresh news articles
//   })
//   .catch(error => {
//       console.error('Error uploading news:', error);
//   });

//   // Clear the form after submission
//   titleInput.value = '';
//   descriptionInput.value = '';
//   imageInput.value = '';
// };
