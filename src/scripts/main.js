// Slideshow functionality
export function initSlideshow() {
  const slides = document.querySelectorAll(".venue-slideshow .slide");
  let currentSlide = 0;

  function showNextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  setInterval(showNextSlide, 2000);
}

// Intersection Observer for animations
export function initAnimations() {
  const elements = document.querySelectorAll(
    ".venue-image, .venue-info, .venue-map-wrapper"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach((el) => observer.observe(el));
}

// Top bar visibility
export function initTopBar() {
  const topBar = document.querySelector(".top-bar");
  const headerSection = document.querySelector(".header");

  const headerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (topBar) {
          if (!entry.isIntersecting) {
            topBar.classList.remove("hidden");
          } else {
            topBar.classList.add("hidden");
          }
        }
      });
    },
    { threshold: 0 }
  );

  if (headerSection) {
    headerObserver.observe(headerSection);
  }
}

// Countdown functionality
export function initCountdown(wrapper, isArabic = false) {
  const target = new Date(wrapper.dataset.date).getTime();
  const parts = {
    days: wrapper.querySelector("#days"),
    hours: wrapper.querySelector("#hours"),
    minutes: wrapper.querySelector("#minutes"),
    seconds: wrapper.querySelector("#seconds"),
  };

  function getArabicLabel(number, singular, dual, plural) {
    if (number === 1) return singular;
    if (number === 2) return dual;
    if (number >= 3 && number <= 10) return plural;
    return singular;
  }

  function update() {
    const diff = target - Date.now();

    if (diff <= 0) {
      clearInterval(timer);
      Object.values(parts).forEach((el) => (el.textContent = "0"));
      return;
    }

    const _ms = 1000,
      _min = _ms * 60,
      _hr = _min * 60,
      _day = _hr * 24;

    const days = Math.floor(diff / _day);
    const hours = Math.floor((diff % _day) / _hr);
    const minutes = Math.floor((diff % _hr) / _min);
    const seconds = Math.floor((diff % _min) / _ms);

    if (isArabic) {
      parts.days.textContent = days.toLocaleString("ar-EG");
      parts.hours.textContent = hours.toLocaleString("ar-EG");
      parts.minutes.textContent = minutes.toLocaleString("ar-EG");
      parts.seconds.textContent = seconds.toLocaleString("ar-EG");

      parts.days.nextElementSibling.textContent = getArabicLabel(
        days,
        "يوم",
        "يومين",
        "أيام"
      );
      parts.hours.nextElementSibling.textContent = getArabicLabel(
        hours,
        "ساعة",
        "ساعتين",
        "ساعات"
      );
      parts.minutes.nextElementSibling.textContent = getArabicLabel(
        minutes,
        "دقيقة",
        "دقيقتان",
        "دقائق"
      );
      parts.seconds.nextElementSibling.textContent = getArabicLabel(
        seconds,
        "ثانية",
        "ثانيتان",
        "ثوان"
      );
    } else {
      parts.days.textContent = days;
      parts.hours.textContent = hours;
      parts.minutes.textContent = minutes;
      parts.seconds.textContent = seconds;
    }
  }

  update();
  return setInterval(update, 1000);
}

// Initialize all functionality
export function init() {
  initSlideshow();
  initAnimations();
  initTopBar();
} 
