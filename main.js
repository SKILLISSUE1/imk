document.addEventListener("DOMContentLoaded", function () {
  // Carousel functionality
  const track = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".carousel-item-custom");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const visibleSlides = 3; // jumlah gambar terlihat
  let index = visibleSlides; // posisi awal
  let interval;
  let itemWidth;

  function setupCarousel() {
    const firstClones = [];
    const lastClones = [];

    // Hapus clone lama dulu (kalau ada)
    document
      .querySelectorAll(".carousel-item-custom.clone")
      .forEach((el) => el.remove());

    // Clone 3 pertama ke akhir
    for (let i = 0; i < visibleSlides; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add("clone");
      track.appendChild(clone);
      firstClones.push(clone);
    }

    // Clone 3 terakhir ke awal
    for (let i = items.length - visibleSlides; i < items.length; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add("clone");
      track.insertBefore(clone, track.firstChild);
      lastClones.push(clone);
    }

    // Hitung ulang lebar tiap item
    itemWidth = document.querySelector(".carousel-item-custom").offsetWidth;
    // Set posisi awal
    track.style.transition = "none";
    track.style.transform = `translateX(-${index * itemWidth}px)`;
    setTimeout(
      () => (track.style.transition = "transform 0.6s ease-in-out"),
      20
    );
  }

  function moveCarousel() {
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  function nextSlide() {
    index++;
    moveCarousel();
  }

  function prevSlide() {
    index--;
    moveCarousel();
  }

  // Transisi looping
  track.addEventListener("transitionend", () => {
    const total = items.length;
    if (index >= total + visibleSlides) {
      track.style.transition = "none";
      index = visibleSlides;
      moveCarousel();
      setTimeout(
        () => (track.style.transition = "transform 0.6s ease-in-out"),
        20
      );
    } else if (index <= 0) {
      track.style.transition = "none";
      index = total;
      moveCarousel();
      setTimeout(
        () => (track.style.transition = "transform 0.6s ease-in-out"),
        20
      );
    }
  });

  // Auto slide
  function startAutoSlide() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  }

  prevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoSlide();
  });

  // Pause saat hover
  track.parentElement.addEventListener("mouseenter", () =>
    clearInterval(interval)
  );
  track.parentElement.addEventListener("mouseleave", startAutoSlide);

  window.addEventListener("resize", () => {
    setupCarousel();
  });

  // Inisialisasi
  setupCarousel();
  startAutoSlide();

  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking on a link
  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Animasi scroll untuk semua elemen
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observasi elemen dengan animasi
  document
    .querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .fade-in")
    .forEach((el) => {
      observer.observe(el);
    });

  // Animasi khusus untuk galeri - muncul dari bawah secara acak
  const galleryItems = document.querySelectorAll(".gallery-item");

  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Delay acak untuk setiap item galeri
        const randomDelay = Math.random() * 0.5;
        entry.target.style.transitionDelay = `${randomDelay}s`;
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  galleryItems.forEach((item) => {
    galleryObserver.observe(item);
  });
});
