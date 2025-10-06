// Parallax scroll effect for bottles
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const heroHeight = document.querySelector(".hero-scene").offsetHeight;

      if (scrolled < heroHeight) {
        const parallaxElements = document.querySelectorAll(".parallax-element");
        parallaxElements.forEach((element) => {
          const speed = parseFloat(element.dataset.speed);
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
      }

      ticking = false;
    });
    ticking = true;
  }
});

// Mouse move parallax effect
document.addEventListener("mousemove", (e) => {
  const bottles = document.querySelectorAll(".bottle-container img");
  const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

  bottles.forEach((bottle, index) => {
    const depth = (index + 1) * 15;
    const xMove = mouseX * depth;
    const yMove = mouseY * depth;
    bottle.style.transform = `translate(${xMove}px, ${yMove}px)`;
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Stats counter animation
const stats = document.querySelectorAll(".stat-number");
let animated = false;

const animateStats = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !animated) {
      animated = true;
      stats.forEach((stat, index) => {
        setTimeout(() => {
          const text = stat.textContent;
          if (text.includes("K")) {
            const target = parseInt(text);
            animateValue(stat, 0, target, 2000, "K+");
          } else if (text.includes("%")) {
            const target = parseInt(text);
            animateValue(stat, 0, target, 2000, "%");
          } else if (text.includes("★")) {
            const target = parseFloat(text);
            animateDecimalValue(stat, 0, target, 2000, "★");
          } else {
            const target = parseInt(text);
            animateValue(stat, 0, target, 2000, "+");
          }
        }, index * 200);
      });
    }
  });
};

function animateValue(element, start, end, duration, suffix) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = end + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

function animateDecimalValue(element, start, end, duration, suffix) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = end.toFixed(1) + suffix;
      clearInterval(timer);
    } else {
      element.textContent = current.toFixed(1) + suffix;
    }
  }, 16);
}

const statsObserver = new IntersectionObserver(animateStats, {
  threshold: 0.5,
});
document.querySelectorAll(".stat-item").forEach((stat) => {
  statsObserver.observe(stat);
});

// Initialize reveal animations on load
setTimeout(() => {
  document.querySelectorAll(".reveal").forEach((element, index) => {
    setTimeout(() => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add("active");
      }
    }, index * 100);
  });
}, 100);

// Add particles dynamically
const heroScene = document.querySelector(".hero-scene");
for (let i = 0; i < 10; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 15 + "s";
  particle.style.setProperty("--tx", Math.random() * 200 - 100 + "px");
  heroScene.appendChild(particle);
}
