const projectItems = document.querySelectorAll(".project-item"); 

projectItems.forEach(item => {
    item.addEventListener("click", function() {
        const url = this.getAttribute("data-url")
        if (url) {
            window.open(url, "_blank");
        }
    });
});

const projects = [
  {
    "title": "Full Stack Intro.",
    "description": "從零開始認識前後端開發！從環境設定、HTML、CSS、JavaScript 等基礎打好地基，並逐步學習版面切版、網頁動態效果實作，讓大家都能獨立完成屬於自己、能「動起來」的互動式履歷網站。",
    "date": "2025/09/22",
    "url": "https://github.com/NYCU-SDC/full-stack-intro-frontend"
  },
  {
    "title": "Full Stack Advanced",
    "description": "這門課會透過實作任務管理工具，熟悉 React 的開發生態系，了解前端的實作細節。下學期則會延續專案，完成 Golang 後端，學習完整的前後端開發。",
    "date": "2025/08/29",
    "url": "https://github.com/NYCU-SDC/full-stack-advanced-frontend"
  },
  {
    "title": "Core System",
    "description": "一站式完成大部分行政操作，不必在表單、試算表和群組訊息間來回切換。\n從真實需求出發，逐步迭代。\n讓行政變簡單，把時間留給更有價值的活動與交流。",
    "date": "2025/05/29",
    "url": "https://github.com/NYCU-SDC/core-system-frontend"
  },
  {
    "title": "Clustron",
    "description": "Clustron 是一個計算機叢集與異質計算管理的可視化解決方案，結合實驗室與課程的實務需求，提供一個可實際運作的解決方案。",
    "date": "2025/04/16",
    "url": "https://github.com/NYCU-SDC/clustron-frontend"
  }
]
const typewriterElement = document.querySelector(".typewriter");
const texts = [" NYCU Computer Science.", " Second Grade.", " Full Stack Intro."];
let textIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    const typingSpeed = 100; 
    const deletingSpeed = 50; 
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;
    if (!isDeleting) {
        let charIndex = 0;
        typewriterElement.textContent = "";
        const typingInterval = setInterval(() => {
            typewriterElement.textContent += currentText[charIndex];
            charIndex++;
            if (charIndex === currentText.length) {
                clearInterval(typingInterval);
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, pauseAfterTyping);
            }
        }, typingSpeed);
    } else {
        let charIndex = currentText.length;
        const deletingInterval = setInterval(() => {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                clearInterval(deletingInterval);
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(() => {
                    typeWriter();
                }, pauseAfterDeleting);
            }
        }, deletingSpeed);
    }
}
typeWriter();

const projectsList = document.querySelector(".project-list");

function renderProjects(list) {
    projectsList.innerHTML =  list
        .map(p => {
            return `
            <div class="project-item" data-url="${p.url}" target="_blank">
                <div class="content">
                    <h3>${p.title}</h3>
                    <p>${p.description.replace(/\n/g, "<br>")}</p>
                    <p class="meta">Created on ${p.date}</p>
                </div>
            </div>
            `;
        })
        .join("");
    attachProjectClickListeners();
}
renderProjects(projects);
function attachProjectClickListeners() {
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach(item => {
        item.addEventListener("click", function() {
            const url = this.getAttribute("data-url");
            if (url) {
                window.open(url, "_blank");
            }
        });
    });
}
const searchInput = document.getElementById("project-search-input");
const searchBtn = document.getElementById("project-search-btn");
function searchProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm)
    );
    renderProjects(filteredProjects);
}
searchBtn.addEventListener("click", searchProjects);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchProjects();
    }
});
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-item a");
function updateActiveNav() {
    let currentSection = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}
window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px"
};
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, observerOptions);
sections.forEach(section => {
    sectionObserver.observe(section);
});

const fadeInSections = document.querySelectorAll(".fade-in-section");
fadeInSections.forEach(section => {
    sectionObserver.observe(section);
});
const hobbyCards = document.querySelectorAll(".hobby-card");
hobbyCards.forEach(card => {
    card.addEventListener("click", function() {
        const url = this.getAttribute("data-url");
        if (url) {
            window.open(url, "_blank");
        }
    });
});

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
});
