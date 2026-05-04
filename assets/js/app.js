import projects from "./data/projects.js";
import blogPosts from "./data/blog.js";
import experience from "./data/experience.js";

// --- Navigation with sliding indicator ---
const navLinks = document.querySelectorAll(".nav-btn");
const navIndicator = document.querySelector(".nav-indicator");
const sections = document.querySelectorAll(".section");

function positionIndicator(btn) {
  if (!navIndicator || !btn) return;
  navIndicator.style.width = btn.offsetWidth + "px";
  navIndicator.style.left = btn.offsetLeft + "px";
}

function setActiveSection(targetId) {
  sections.forEach((s) => s.classList.toggle("active", s.id === targetId));
  navLinks.forEach((link) => link.classList.toggle("active", link.dataset.section === targetId));

  // Show/hide the fixed filter bar based on active section
  const filterBar = document.getElementById("filter-bar");
  const isCardView = cardView && cardView.style.display !== "none";
  if (filterBar) {
    filterBar.style.display = (targetId === "projects" && isCardView) ? "" : "none";
  }

  const activeBtn = document.querySelector(`.nav-btn[data-section="${targetId}"]`);
  positionIndicator(activeBtn);
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Trigger stagger animations for new section
  requestAnimationFrame(() => {
    const items = document.querySelectorAll(`#${targetId} .stagger-in`);
    items.forEach((el, i) => {
      el.classList.remove("visible");
      setTimeout(() => el.classList.add("visible"), 60 + i * 50);
    });
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveSection(link.dataset.section));
});

// Position indicator on load
window.addEventListener("load", () => {
  const activeBtn = document.querySelector(".nav-btn.active");
  positionIndicator(activeBtn);
});
window.addEventListener("resize", () => {
  const activeBtn = document.querySelector(".nav-btn.active");
  positionIndicator(activeBtn);
});

// --- Cursor glow ---
const cursorGlow = document.querySelector(".cursor-glow");
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  function animateCursor() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    cursorGlow.style.left = cx + "px";
    cursorGlow.style.top = cy + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

// --- Projects (Carousel) ---
const projectCarousel = document.getElementById("project-carousel");
const carouselCounter = document.getElementById("carousel-counter");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
const peekPrev = document.getElementById("carousel-peek-prev");
const peekNext = document.getElementById("carousel-peek-next");

let currentIndex = 0;
let filteredProjects = [...projects];
let activeCategory = "All";

const categoryLabels = {
  "ar/vr": "AR/VR",
  ai: "AI",
  game: "Game",
  web: "Web",
  crafting: "Crafting",
};

const displayCategories = ["All", "ar/vr", "ai", "game", "web", "crafting"];

function renderCategoryLabels() {
  const container = document.getElementById("filter-bar");
  displayCategories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat === "All" ? " active" : "");
    btn.dataset.category = cat;
    btn.textContent = cat === "All" ? "All" : categoryLabels[cat] || cat;
    btn.addEventListener("click", () => filterProjects(cat, btn));
    container.appendChild(btn);
  });
}

function filterProjects(category, activeBtn) {
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  activeBtn.classList.add("active");
  activeCategory = category;

  if (category === "All") {
    filteredProjects = [...projects];
  } else {
    filteredProjects = projects.filter((p) => p.category === category);
  }

  currentIndex = 0;
  renderCurrentProject();
}

function renderCurrentProject() {
  if (filteredProjects.length === 0) {
    projectCarousel.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-tertiary);">No projects in this category.</div>`;
    carouselCounter.textContent = "0 of 0";
    return;
  }

  const p = filteredProjects[currentIndex];
  projectCarousel.innerHTML = `
    <a href="${p.link}" target="_blank" rel="noopener" class="project-card" data-category="${p.category}">
      <div class="project-card-img">
        <img src="${p.image}" alt="${p.title}" />
        <div class="project-card-overlay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          <span class="overlay-label">VIEW</span>
          <span class="overlay-sub">Open Link in New Tab</span>
        </div>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.description}</p>
        <span class="project-card-year">${p.year}</span>
      </div>
    </a>
  `;

  carouselCounter.textContent = `${currentIndex + 1} of ${filteredProjects.length}`;

  // Render peek cards
  const dir = navigateDirection;
  renderPeekCards(dir);
  navigateDirection = null;

  // Animate card entrance with AR spatial effect
  const card = projectCarousel.querySelector(".project-card");
  if (card) {
    if (dir === "next") {
      card.classList.add("anim-next");
    } else if (dir === "prev") {
      card.classList.add("anim-prev");
    } else {
      card.style.animation = "fadeScale 0.4s var(--ease-out) forwards";
    }
  }
}

let navigateDirection = null;

function renderPeekCards(direction) {
  const len = filteredProjects.length;
  if (len <= 1) {
    peekPrev.innerHTML = "";
    peekNext.innerHTML = "";
    return;
  }

  const prevIdx = (currentIndex - 1 + len) % len;
  const nextIdx = (currentIndex + 1) % len;
  const prevP = filteredProjects[prevIdx];
  const nextP = filteredProjects[nextIdx];

  const peekHTML = (p) => `
    <div class="peek-card">
      <div class="peek-card-img">
        <img src="${p.image}" alt="${p.title}" />
      </div>
      <div class="peek-card-body">
        <div class="peek-card-title">${p.title}</div>
        <div class="peek-card-desc">${p.description}</div>
        <div class="peek-card-year">${p.year}</div>
      </div>
    </div>
  `;

  peekPrev.innerHTML = peekHTML(prevP);
  peekNext.innerHTML = peekHTML(nextP);

  // Trigger rotate-in animation
  if (direction) {
    peekPrev.style.animation = `peekSlideFromLeft 0.5s var(--ease-out) forwards`;
    peekNext.style.animation = `peekSlideFromRight 0.5s var(--ease-out) forwards`;
    setTimeout(() => {
      peekPrev.style.animation = "";
      peekNext.style.animation = "";
    }, 550);
  }
}

function goToPrev() {
  if (filteredProjects.length <= 1) return;
  navigateDirection = "prev";
  currentIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
  renderCurrentProject();
}

function goToNext() {
  if (filteredProjects.length <= 1) return;
  navigateDirection = "next";
  currentIndex = (currentIndex + 1) % filteredProjects.length;
  renderCurrentProject();
}

peekPrev.addEventListener("click", goToPrev);
peekNext.addEventListener("click", goToNext);
carouselPrev.addEventListener("click", goToPrev);
carouselNext.addEventListener("click", goToNext);

function renderProjects() {
  renderCategoryLabels();
  renderCurrentProject();
  renderGridFilterBar();
  renderProjectGrid();
}

// --- Grid view ---
const projectGrid = document.getElementById("project-grid");
const cardView = document.getElementById("projects-card-view");
const gridView = document.getElementById("projects-grid-view");
const viewCardBtn = document.getElementById("view-card");
const viewGridBtn = document.getElementById("view-grid");
let gridCategory = "All";

function renderGridFilterBar() {
  const container = document.getElementById("filter-bar-grid");
  displayCategories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn glass-pill" + (cat === "All" ? " active" : "");
    btn.dataset.category = cat;
    btn.textContent = cat === "All" ? "All" : categoryLabels[cat] || cat;
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      gridCategory = cat;
      renderProjectGrid();
    });
    container.appendChild(btn);
  });
}

function renderProjectGrid() {
  const list = gridCategory === "All" ? projects : projects.filter((p) => p.category === gridCategory);
  projectGrid.innerHTML = list
    .map(
      (p) => `
    <a href="${p.link}" target="_blank" rel="noopener"
       class="project-card stagger-in" data-category="${p.category}">
      <div class="project-card-img">
        <img src="${p.image}" alt="${p.title}" />
        <div class="project-card-overlay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          <span class="overlay-label">VIEW</span>
          <span class="overlay-sub">Open Link in New Tab</span>
        </div>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.description}</p>
        <span class="project-card-year">${p.year}</span>
      </div>
    </a>
  `
    )
    .join("");

  // Stagger in
  requestAnimationFrame(() => {
    projectGrid.querySelectorAll(".stagger-in").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 60 + i * 30);
    });
  });
}

function setView(mode) {
  if (mode === "card") {
    cardView.style.display = "";
    gridView.style.display = "none";
    viewCardBtn.classList.add("active");
    viewGridBtn.classList.remove("active");
    // Show filter bar
    const filterBar = document.getElementById("filter-bar");
    if (filterBar) filterBar.style.display = "";
  } else {
    cardView.style.display = "none";
    gridView.style.display = "block";
    viewCardBtn.classList.remove("active");
    viewGridBtn.classList.add("active");
    // Hide vertical filter bar
    const filterBar = document.getElementById("filter-bar");
    if (filterBar) filterBar.style.display = "none";
    renderProjectGrid();
  }
}

viewCardBtn.addEventListener("click", () => setView("card"));
viewGridBtn.addEventListener("click", () => setView("grid"));

// On mobile, default to grid view
if (window.matchMedia("(max-width: 449px)").matches) {
  setView("grid");
}

// --- Blog ---
function renderBlog() {
  const list = document.getElementById("blog-list");
  list.innerHTML = blogPosts
    .map((post, i) => {
      const date = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return `
      <a href="${post.link}" target="_blank" rel="noopener" class="blog-card glass-card stagger-in" data-tilt>
        <div class="blog-card-img">
          <img src="${post.image}" alt="${post.title}" loading="lazy" />
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span class="blog-card-category">${post.category}</span>
            <span class="blog-card-date">${date}</span>
          </div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-desc">${post.description}</p>
        </div>
      </a>
    `;
    })
    .join("");
}

// --- Experience ---
function renderDescription(desc) {
  const items = Array.isArray(desc) ? desc : [desc];
  return `<ul class="timeline-desc-list">${items.map((d) => `<li>${d}</li>`).join("")}</ul>`;
}

function renderExperience() {
  const workTimeline = document.getElementById("work-timeline");
  workTimeline.innerHTML = experience.work
    .map(
      (item, i) => `
    <div class="timeline-entry stagger-in">
      <div class="timeline-marker"></div>
      <div class="timeline-content glass-card">
        <div class="timeline-header">
          <a href="${item.companyUrl}" target="_blank" rel="noopener" class="timeline-company-link">
            <img src="${item.logo}" alt="${item.company}" class="timeline-logo" />
            <span class="timeline-company">${item.company}</span>
          </a>
          <span class="timeline-date">${item.date}</span>
        </div>
        <p class="timeline-role">${item.role}</p>
        ${renderDescription(item.description)}
        <div class="timeline-tags">
          ${item.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `
    )
    .join("");

  const eduTimeline = document.getElementById("edu-timeline");
  eduTimeline.innerHTML = experience.education
    .map(
      (item, i) => `
    <div class="timeline-entry stagger-in">
      <div class="timeline-marker"></div>
      <div class="timeline-content glass-card">
        <div class="timeline-header">
          <a href="${item.url}" target="_blank" rel="noopener" class="timeline-company-link">
            <span class="timeline-company">${item.institution}</span>
          </a>
          <span class="timeline-date">${item.date}</span>
        </div>
        <p class="timeline-desc">${item.description}</p>
        ${
          item.highlights.length
            ? `<ul class="timeline-highlights">
            ${item.highlights.map((h) => `<li>${h}</li>`).join("")}
          </ul>`
            : ""
        }
      </div>
    </div>
  `
    )
    .join("");
}

// --- Hobby image hover: scattered Polaroid fan ---
// Supports comma-separated paths in data-image, e.g. "a.jpg,b.jpg,c.jpg"
// Preset scatter transforms per count (rotation, x-offset, y-offset)
const scatterPresets = [
  // 1 image
  [{ r: -2, x: 0, y: 0 }],
  // 2 images
  [{ r: -4, x: -80, y: 4 }, { r: 3, x: 80, y: -2 }],
  // 3 images
  [{ r: -5, x: -155, y: 6 }, { r: 1, x: 0, y: -4 }, { r: 4, x: 155, y: 2 }],
  // 4 images
  [{ r: -5, x: -230, y: 4 }, { r: -2, x: -76, y: -6 }, { r: 2, x: 76, y: 4 }, { r: 5, x: 230, y: -2 }],
  // 5 images
  [{ r: -6, x: -305, y: 4 }, { r: -3, x: -152, y: -6 }, { r: 0, x: 0, y: 2 }, { r: 3, x: 152, y: -4 }, { r: 6, x: 305, y: 4 }],
];

function initHobbyHovers() {
  document.querySelectorAll(".hobby-keyword").forEach((el) => {
    const raw = el.dataset.image;
    if (!raw) return;

    const srcs = raw.split(",").map((s) => s.trim()).filter(Boolean);
    if (srcs.length === 0) return;

    const count = Math.min(srcs.length, 5);
    const presets = scatterPresets[count - 1];

    const container = document.createElement("div");
    container.className = "hobby-photos";

    srcs.slice(0, 5).forEach((src, i) => {
      const p = presets[i];
      const photo = document.createElement("div");
      photo.className = "hobby-photo";
      photo.style.setProperty("--r", p.r + "deg");
      photo.style.setProperty("--tx", p.x + "px");
      photo.style.setProperty("--ty", p.y + "px");
      photo.style.setProperty("--i", i);
      photo.innerHTML = `<img src="${src}" alt="${el.textContent}" />`;
      container.appendChild(photo);
    });

    el.appendChild(container);

    el.addEventListener("mouseenter", () => container.classList.add("visible"));
    el.addEventListener("mouseleave", () => container.classList.remove("visible"));
  });
}

// --- 3D tilt effect on cards ---
function initTiltEffect() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-2px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0px)";
      card.style.transition = "transform 0.5s var(--ease-out)";
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.1s ease-out";
    });
  });
}

// --- Stagger entrance for active section ---
function triggerStagger(sectionId) {
  const items = document.querySelectorAll(`#${sectionId} .stagger-in`);
  items.forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), 80 + i * 50);
  });
}

// --- Preload all project images ---
projects.forEach((p) => {
  const img = new Image();
  img.src = p.image;
});

// --- Init ---
renderProjects();
renderBlog();
renderExperience();
initHobbyHovers();

requestAnimationFrame(() => {
  triggerStagger("projects");
  initTiltEffect();
});
