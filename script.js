document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".nav");

  hamburger.addEventListener("click", function () {
    nav.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  const sliderImages = document.querySelectorAll(".slider-image");
  let currentSlide = 0;

  function changeSlide() {
    sliderImages[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % sliderImages.length;
    sliderImages[currentSlide].classList.add("active");
  }

  setInterval(changeSlide, 5000);

  const progressBars = document.querySelectorAll(".progress");
  let progressAnimated = false;

  function animateProgressBars() {
    if (progressAnimated) return;

    const aboutSection = document.getElementById("about");
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.8) {
      progressBars.forEach((bar) => {
        const progress = bar.getAttribute("data-progress");
        bar.style.width = progress + "%";
      });
      progressAnimated = true;
    }
  }

  window.addEventListener("scroll", animateProgressBars);
  animateProgressBars();

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
  // სსსსსსსსსს
  // --- TESTIMONIAL SLIDER ---
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  let testimonialIndex = 0;
  let testimonialTimer;

  function showTestimonial(index) {
    // ყველა ბარათის და წერტილის აქტიური კლასის მოცილება
    testimonialCards.forEach((card) => card.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));

    // ახალი ინდექსის მინიჭება
    testimonialIndex = index;

    // კონკრეტულის გააქტიურება
    testimonialCards[testimonialIndex].classList.add("active");
    dots[testimonialIndex].classList.add("active");
  }

  function nextTestimonial() {
    testimonialIndex++;
    if (testimonialIndex >= testimonialCards.length) {
      testimonialIndex = 0;
    }
    showTestimonial(testimonialIndex);
  }

  // ავტომატური გადასვლის ფუნქცია (ყოველ 4 წამში)
  function startTestimonialAutoSlide() {
    testimonialTimer = setInterval(nextTestimonial, 4000);
  }

  // წერტილებზე დაჭერის ლოგიკა
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-dot"));

      // როცა მომხმარებელი ხელით აჭერს, ტაიმერი რესტარტდება
      clearInterval(testimonialTimer);
      showTestimonial(index);
      startTestimonialAutoSlide();
    });
  });

  // სლაიდერის გაშვება
  startTestimonialAutoSlide();

  // სსსსსსს
  const contactForm = document.getElementById("contact-form");
  const modal = document.getElementById("modal");
  const closeModal = document.querySelector(".close-modal");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      website: formData.get("website"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(
        "https://borjomi.loremipsum.ge/api/send-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        modal.classList.add("show");
        contactForm.reset();
      } else {
        const fallbackResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: data.name,
              body: data.message,
              userId: 1,
            }),
          }
        );

        if (fallbackResponse.ok) {
          modal.classList.add("show");
          contactForm.reset();
        }
      }
    } catch (error) {
      try {
        const fallbackResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: data.name,
              body: data.message,
              userId: 1,
            }),
          }
        );

        if (fallbackResponse.ok) {
          modal.classList.add("show");
          contactForm.reset();
        }
      } catch (fallbackError) {
        console.error("Error sending message:", fallbackError);
      }
    }
  });

  closeModal.addEventListener("click", function () {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
