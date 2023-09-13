"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

function createProjectItem(category, link, image, alt, title, skills, desc) {
  return `
    <li class="project-item active" data-filter-item data-category="${category}">
      <a target="_blank" href="${link}">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="link-outline"></ion-icon>
          </div>
          <img src="${image}" alt="${alt}" loading="lazy" />
        </figure>
        <h3 class="project-title">${title}</h3>
        <p class="project-skills">${skills}</p>
        <p class="project-desc">${desc}</p>
      </a>
    </li>
  `;
}

const projectList = document.querySelector(".project-list");

const projects = [
  {
    category: "web",
    link: "https://github.com/jonipark/HackDartmouth-todil",
    image: "./assets/images/projects/project-todil.png",
    alt: "Todil",
    title: "Todil",
    skills: "React.js",
    desc: "Website that allows users to log daily learnings and track their growth over time",
  },
  {
    category: "game",
    link: "https://github.com/jonipark/stardew-mine",
    image: "./assets/images/projects/project-stardew-mine.png",
    alt: "Stardew Mine",
    title: "Stardew Mine",
    skills: "GaFr, Java",
    desc: "Grid-based mining game with Minecraft-like crafting and gathering gems",
  },
  {
    category: "android",
    link: "https://github.com/inception-tree/seed.io",
    image: "./assets/images/projects/project-seed-io.png",
    alt: "Seed.io",
    title: "Seed.io",
    skills: "Kotlin, Firebase",
    desc: "Android app that empowers startup builders to post their projects and receive feedback",
  },
  {
    category: "others",
    link: "https://medium.com/@zeepada/part-2-build-our-own-magic-mirror-module-mmm-asl-903418edc3e5",
    image: "./assets/images/projects/project-marron-mirror.png",
    alt: "Marron Mirror",
    title: "Marron Mirror",
    skills: "Raspberry Pi, JavaScript",
    desc: "Smart mirror that displays curated user information",
  },
  {
    category: "web",
    link: "https://github.com/jonipark/MLFQ-simulator",
    image: "./assets/images/projects/project-mlfq-simulator.png",
    alt: "MLFQ Simulator",
    title: "MLFQ Simulator",
    skills: "Next.js, Redux, Tailwind CSS",
    desc: "Web-based MLFQ scheduling simulator for Operating Systems",
  },
  {
    category: "game",
    link: "https://github.com/jonipark/voyager-journey",
    image: "./assets/images/projects/project-voyager-journey.png",
    alt: "Voyager Journey",
    title: "Voyager Journey",
    skills: "GaFr, Java",
    desc: "2D space game where a player controls Voyager spacecraft with two orbiting soldiers",
  },
  {
    category: "ios",
    link: "https://github.com/jonipark/Jnitter",
    image: "./assets/images/projects/project-jnitter.png",
    alt: "Jnitter",
    title: "Jnitter",
    skills: "Swift, Twitter API",
    desc: "Twitter clone app to view, compose, favorite, and retweet tweets",
  },
  {
    category: "android",
    //TODO: update github link
    link: "#",
    image: "./assets/images/projects/project-minesweeper.png",
    alt: "Minesweeper",
    title: "Minesweeper",
    skills: "Kotlin",
    desc: "Android app for minesweeper game",
  },
  {
    category: "ios",
    link: "https://github.com/jonipark/Jonistagram",
    image: "./assets/images/projects/project-jonistagram.png",
    alt: "Jonistagram",
    title: "Jonistagram",
    skills: "Swift, Parse",
    desc: "Instagram clone with a custom Parse backend that allows a user to post photos, view feed, and add comments",
  },
  {
    category: "ios",
    link: "https://github.com/jonipark/Flix",
    image: "./assets/images/projects/project-flix.png",
    alt: "Flix",
    title: "Flix",
    skills: "Swift, The Movie Database API",
    desc: "App that allows users to browse movies from the The Movie Database API",
  },
  {
    category: "others",
    link: "https://github.com/jonipark/ComputerGraphics",
    image: "./assets/images/projects/project-car-wheels.png",
    alt: "Car and Wheels",
    title: "Car and Wheels",
    skills: "WebGL, OpenGL, Kotlin",
    desc: "3D Car and Wheels movement",
  },
  {
    category: "game",
    link: "https://github.com/jonipark/ComputerGraphics",
    image: "./assets/images/projects/project-ow.png",
    alt: "Overwatch Revenge",
    title: "Overwatch Revenge",
    skills: "WebGL, OpenGL, Kotlin",
    desc: "2D Overwatch supports revenge",
  },
  {
    category: "macos",
    link: "https://github.com/jonipark/Mactwork",
    image: "./assets/images/projects/project-mactwork.png",
    alt: "Mactwork",
    title: "Mactwork",
    skills: "Swift(MacOS)",
    desc: "Essential Wi-Fi network details in one place",
  },
  {
    category: "android",
    //TODO: update github link
    link: "#",
    image: "./assets/images/projects/project-shopping-list.png",
    alt: "MyShoppingList",
    title: "MyShoppingList",
    skills: "Kotlin",
    desc: "Android app for shopping checklist",
  },
  {
    category: "android",
    //TODO: update github link
    link: "#",
    image: "./assets/images/projects/project-my-wallet.png",
    alt: "MyWallet",
    title: "MyWallet",
    skills: "Kotlin",
    desc: "Android app for ledger management",
  },
  {
    category: "ios",
    link: "https://github.com/jonipark/SingSangSong",
    image: "./assets/images/projects/project-sing-sang-song.png",
    alt: "SingSangSong",
    title: "SingSangSong",
    skills: "Swift, Realm",
    desc: "Memo app for my go-to karaoke songs",
  },
  {
    category: "android",
    //TODO: update github link
    link: "#",
    image: "./assets/images/projects/project-stopwatch.png",
    alt: "Stopwatch",
    title: "Stopwatch",
    skills: "Kotlin, Thread",
    desc: "Android app for stopwatch",
  },
  {
    category: "android",
    //TODO: update github link
    link: "#",
    image: "./assets/images/projects/project-calculator.png",
    alt: "Calculator",
    title: "Calculator",
    skills: "Kotlin",
    desc: "Android app for calculator",
  },
  {
    category: "web",
    link: "https://devpost.com/software/hackher413",
    image: "./assets/images/projects/project-must-seum.png",
    alt: "Must-seum",
    title: "Must-seum",
    skills: "React.js, OpenStreetMap",
    desc: "Hackathon Project: museum must-see artworks recommendation",
  },
  {
    category: "web",
    link: "https://mohoho-info.web.app/",
    image: "./assets/images/projects/project-mohoho.png",
    alt: "Mohoho",
    title: "Mohoho",
    skills: "Html, CSS",
    desc: "Informative website with essential links and info for Mount Holyoke College",
  },
  {
    category: "web",
    link: "https://cssociety.web.app/",
    image: "./assets/images/projects/project-cssociety.png",
    alt: "CS Society",
    title: "CS Society",
    skills: "React.js",
    desc: "Informative website for school CS organization",
  },
  {
    category: "web",
    link: "https://github.com/jonipark/JoniGPT",
    image: "./assets/images/projects/project-joni-gpt.png",
    alt: "JoniGPT",
    title: "JoniGPT",
    skills: "GPT-3, Next.js",
    desc: "Website that allows users to chat with a GPT-3 model",
  },
  {
    category: "game",
    link: "https://github.com/jonipark/angryflappybird",
    image: "./assets/images/projects/project-angry-flappy-bird.png",
    alt: "Angry Flappy Bird",
    title: "Angry Flappy Bird",
    skills: "Java, JavaFX",
    desc: "Angry Bird + Flapp Bird with the GUI button",
  },
];

projects.forEach((project) => {
  projectList.innerHTML += createProjectItem(
    project.category,
    project.link,
    project.image,
    project.alt,
    project.title,
    project.skills,
    project.desc
  );
});

function createBlogItem(category, link, image, alt, date, title, desc) {
  return `
    <li class="blog-post-item">
      <a target="_blank" href="${link}">
        <figure class="blog-banner-box">
          <img src="${image}" alt="${alt}" loading="lazy" />
        </figure>

        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${category}</p>
            <span class="dot"></span>
            <time datetime="${date}">${new Date(date).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  )}</time>
          </div>
          <h3 class="h3 blog-item-title">${title}</h3>
          <p class="blog-text">${desc}</p>
        </div>
      </a>
    </li>
  `;
}

const blogList = document.querySelector(".blog-posts-list");

const blogPosts = [
  {
    link: "https://medium.com/@zeepada/part-2-build-our-own-magic-mirror-module-mmm-asl-903418edc3e5",
    image: "./assets/images/blog-smartmirror.jpg",
    alt: "Crafting Smart Mirror",
    category: "Raspberry Pi",
    date: "2023-01-16",
    title: "Crafting Smart Mirror",
    desc: "How I crafted a personalized smart mirror using a Raspberry Pi and a JavaScript module for sign language learning.",
  },
  // more blog posts here...
];

blogPosts.forEach((blogPost) => {
  blogList.innerHTML += createBlogItem(
    blogPost.category,
    blogPost.link,
    blogPost.image,
    blogPost.alt,
    blogPost.date,
    blogPost.title,
    blogPost.desc
  );
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
