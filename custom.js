document.addEventListener('DOMContentLoaded', () => {
  /* -- UPDATE NEXT COHORT DATE -- */
  var firstMonday = new Date();
  
  function updateFirstMondayOfNextMonth() {
      const now = new Date();
      // Set the date to the first day of the next month
      const firstDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      // Find the day of the week for the first day of the next month (0 is Sunday, 1 is Monday, etc.)
      let dayOfWeek = firstDayNextMonth.getDay();
      // Calculate how many days to add to get to the first Monday
      // If the first day is already a Monday (1), no days need to be added.
      // If the first day is a Sunday (0), we add 1.
      // For any other day, we calculate the days to add to reach the next Monday.
      let addDays = (dayOfWeek === 0 ? 1 : (dayOfWeek === 1 ? 0 : 8 - dayOfWeek));
      firstMonday = new Date(firstDayNextMonth.setDate(firstDayNextMonth.getDate() + addDays));
      
      // Formatting the date
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      let formattedDate = firstMonday.toLocaleDateString('en-US', options);
      
      // Adding suffix to day
      const dayOfMonth = firstMonday.getDate();
      let suffix = 'th';
      if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
          suffix = 'st';
      } else if (dayOfMonth === 2 || dayOfMonth === 22) {
          suffix = 'nd';
      } else if (dayOfMonth === 3 || dayOfMonth === 23) {
          suffix = 'rd';
      }
      
      // Replacing the day number with the number + suffix
      formattedDate = formattedDate.replace(dayOfMonth, `${dayOfMonth}${suffix}`);
      
      // Update the content of the HTML paragraph tag with ID "next-cohort"
      document.getElementById("next-cohort").innerText = `${formattedDate}`;
  };
  
  // Call the function to update the content
  updateFirstMondayOfNextMonth();
  
  /* -- UPDATE COUNTDOWN TIMER --*/
  
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
    
  const targetDate = new Date(firstMonday).getTime();
  
  const updateCountdown = () => {
    const now = new Date().getTime(), // Get the current date and time
    distance = targetDate - now; // Calculate the time remaining until the target date
    // Update the HTML elements with the remaining time
    document.getElementById('days').innerText = Math.floor(distance / day);
    document.getElementById('hours').innerText = Math.floor((distance % day) / hour);
    document.getElementById('minutes').innerText = Math.floor((distance % hour) / minute);
    document.getElementById('seconds').innerText = Math.floor((distance % minute) / second);
  
    // Check if the target date has already passed
    if (distance < 0) {
      clearInterval(updateCountdown); // Stop the countdown timer
        document.getElementById('days').innerText = '0';
        document.getElementById('hours').innerText = '0';
        document.getElementById('minutes').innerText = '0';
        document.getElementById('seconds').innerText = '0';
        // You can display an element at the end of the countdown with this ID  
        document.getElementById('message').style.display = 'block';
    }
  };
  
  // Initial call to update countdown
  updateCountdown();
  
  // Update the countdown every second
  const interval = setInterval(updateCountdown, 1000);
      
      
  /* -- INITIALIZE MOBILE SLIDERS -- */
  
  const mentorsMobileSwiper = document.querySelector('[mentors-mobile-swiper]');
  if (mentorsMobileSwiper) {
    const mentorsMobileSlider = new Swiper(mentorsMobileSwiper, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 32,
      pagination: {
        el: "[mentors-mobile-pagination]",
        clickable: true,
        type: 'bullets'
      },
    });
  }
  
  const videoReviewsMobileSwiper = document.querySelector('[video-reviews-mobile-swiper]');
  if (videoReviewsMobileSwiper) {
    const videoReviewsMobileSlider = new Swiper(videoReviewsMobileSwiper, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 32,
      pagination: {
        el: "[video-reviews-mobile-pagination]",
        clickable: true,
        type: 'bullets'
      },
    });
  }
  
  const reviewsMobileSwiper = document.querySelector('[reviews-mobile-swiper]');
  if (reviewsMobileSwiper) {
    const reviewsMobileSlider = new Swiper(reviewsMobileSwiper, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 32,
      pagination: {
        el: "[reviews-mobile-pagination]",
        clickable: true,
        type: 'bullets'
      },
    });
  }
  
  /* -- Autoplay Videos -- */
  const vidObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
      }
    });
  }, {
    threshold: 0.2 // Trigger when at least 10% of the element is in the viewport
  });
  
  // Target all elements with the name playOnScroll
  const playOnScroll = document.querySelectorAll('[playOnScroll]');
  playOnScroll.forEach(el => vidObserver.observe(el));
  
  /* -- EXIT INTENT POPUP -- */
  const CookieService = {
      setCookie(name, value, days) {
          const date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          const expires = days ? '; expires=' + date.toUTCString() : '';
          document.cookie = name + '=' + (value || '')  + expires + ';';
      },
  
      getCookie(name) {
          const cookieValue = document.cookie
              .split('; ')
              .find(row => row.startsWith(name))
              ?.split('=')[1];
          return cookieValue || null;
      }
  };
  
  const exitPopup = document.querySelector('[modal="ebook"]');
  
  const mouseEvent = e => {
      const shouldShowExitIntent = 
          !e.toElement && 
          !e.relatedTarget &&
          e.clientY < 10;
  
      if (shouldShowExitIntent) {
          document.removeEventListener('mouseout', mouseEvent);
          exitPopup.style.display = 'flex';
          CookieService.setCookie('exitIntentShown', true, 30);
      }
  };
  
  if (!CookieService.getCookie('exitIntentShown')) {
      document.addEventListener('mouseout', mouseEvent);
  }
  
  /* -- Pass UTM Params to Forms & Persistent UTM Params -- */
  
  // Function to parse the query string parameters
  function getQueryStringParams(query) {
      var params = new URLSearchParams(query);
      var paramsObj = {};
      for (const [key, value] of params) {
          paramsObj[key] = value;
      }
      return paramsObj;
  }
  
  // Get current URL query string parameters
  var currentParams = getQueryStringParams(window.location.search);
  
  // Update input fields in forms
  $("form").each(function() {
      for (const param in currentParams) {
          $(this).find("input[name='" + param + "']").val(currentParams[param]);
      }
  });
  
  // Function to append query string parameters to a URL
  function appendQueryParams(url, params) {
      var urlParts = url.split('?');
      var baseUrl = urlParts[0];
      var existingParams = urlParts[1] ? getQueryStringParams('?' + urlParts[1]) : {};
      var allParams = { ...existingParams, ...params };
      var queryString = $.param(allParams);
      return baseUrl + (queryString ? '?' + queryString : '');
  }
  
  // Append query string parameters to all links on the page
  $('a').each(function() {
      var href = $(this).attr('href');
      if (href && href !== '#' && !href.startsWith('#')) {
          var updatedUrl = appendQueryParams(href, currentParams);
          $(this).attr('href', updatedUrl);
      }
  });
  
  
  /* -- Fade-In Animation -- */
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadein-visible');
      } /*else {
        entry.target.classList.remove('fadein-visible');
      }*/
    });
  }, {
    threshold: 0.2 // Trigger when at least 10% of the element is in the viewport
  });
  
  // Target all elements with the class 'fadein'
  const fadeIns = document.querySelectorAll('.fadein');
  fadeIns.forEach(el => observer.observe(el));
  
  
  /* -- Switch Navbar Color -- */
  
  const navObserver = new IntersectionObserver((entries) => {
    const navEntry = entries[0]; // Assuming we're only observing one element, so we directly access the first entry
    const navbar = document.querySelector('.navbar14_container'); // Select the navbar element
    if (!navEntry.isIntersecting) {
      navbar.classList.add('dark');
    } else {
      navbar.classList.remove('dark');
    }
  }, {
    threshold: 0.1
  });
  
  // Target the element with the custom attribute 'data-light-page'
  const lightPageElement = document.querySelector('[data-light-page]');
  if(lightPageElement) {
    navObserver.observe(lightPageElement);
  }
});
