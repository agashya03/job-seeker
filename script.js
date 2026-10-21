// CareerConnect: sample job portal data and functionality.

const jobs = [
  {
    id: 1,
    title: "Junior Software Engineer",
    company: "TechNova",
    location: "Chennai, India",
    work: "Hybrid",
    experience: "Fresher",
    category: "Software",
    salary: 450000,
    salaryText: "₹3.5–4.5 LPA",
    description: "Build web applications, write clean code, and work with an engineering team.",
    skills: ["JavaScript", "Python", "SQL"]
  },
  {
    id: 2,
    title: "AWS Cloud Engineer",
    company: "CloudSphere",
    location: "Bengaluru, India",
    work: "Remote",
    experience: "Entry Level",
    category: "Cloud",
    salary: 600000,
    salaryText: "₹4–6 LPA",
    description: "Support cloud infrastructure, monitor services, and learn deployment workflows.",
    skills: ["AWS", "Linux", "Networking"]
  },
  {
    id: 3,
    title: "Python Developer Intern",
    company: "CodeCraft",
    location: "Remote",
    work: "Remote",
    experience: "Fresher",
    category: "Software",
    salary: 180000,
    salaryText: "₹10–15k/month",
    description: "Develop Python applications, test features, and collaborate with developers.",
    skills: ["Python", "Django", "Git"]
  },
  {
    id: 4,
    title: "Junior DevOps Engineer",
    company: "Nexa Systems",
    location: "Hyderabad, India",
    work: "Hybrid",
    experience: "Entry Level",
    category: "Cloud",
    salary: 650000,
    salaryText: "₹4.5–6.5 LPA",
    description: "Help maintain CI/CD pipelines, automate deployments, and support cloud services.",
    skills: ["AWS", "Docker", "Jenkins"]
  },
  {
    id: 5,
    title: "Data Analyst Intern",
    company: "InsightWorks",
    location: "Chennai, India",
    work: "On-site",
    experience: "Fresher",
    category: "Data",
    salary: 150000,
    salaryText: "₹10–12k/month",
    description: "Analyze datasets, prepare reports, and turn information into useful insights.",
    skills: ["SQL", "Excel", "Python"]
  },
  {
    id: 6,
    title: "Frontend Developer",
    company: "PixelForge",
    location: "Pune, India",
    work: "Remote",
    experience: "Entry Level",
    category: "Software",
    salary: 500000,
    salaryText: "₹3.5–5 LPA",
    description: "Create responsive interfaces and build user-friendly web experiences.",
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 7,
    title: "UI/UX Designer Intern",
    company: "DesignLoop",
    location: "Remote",
    work: "Remote",
    experience: "Fresher",
    category: "Design",
    salary: 180000,
    salaryText: "₹12–15k/month",
    description: "Create wireframes, prototypes, and intuitive digital product experiences.",
    skills: ["Figma", "UI/UX", "Prototyping"]
  },
  {
    id: 8,
    title: "Cloud Support Associate",
    company: "SkyBridge",
    location: "Mumbai, India",
    work: "On-site",
    experience: "Fresher",
    category: "Cloud",
    salary: 400000,
    salaryText: "₹3–4 LPA",
    description: "Troubleshoot technical issues and support cloud infrastructure operations.",
    skills: ["AWS", "Linux", "Networking"]
  }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

// Saved jobs are stored in this browser.
function getSavedJobs() {
  try {
    return JSON.parse(localStorage.getItem("careerconnect-saved") || "[]")
      .map(Number);
  } catch {
    return [];
  }
}

let savedJobs = getSavedJobs();

function updateSavedCount() {
  $$(".saved-count").forEach(element => {
    element.textContent = savedJobs.length;
  });
}

function toggleSaved(id) {
  id = Number(id);

  if (savedJobs.includes(id)) {
    savedJobs = savedJobs.filter(savedId => savedId !== id);
    showMessage("Job removed from saved jobs.");
  } else {
    savedJobs.push(id);
    showMessage("Job saved successfully!");
  }

  localStorage.setItem("careerconnect-saved", JSON.stringify(savedJobs));
  updateSavedCount();
  renderAll();
}

function showMessage(message) {
  let notification = $("#notification");

  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    notification.style.cssText =
      "position:fixed;bottom:20px;right:20px;background:#19213b;color:white;padding:14px 20px;border-radius:9px;z-index:9999;font-size:13px;box-shadow:0 8px 25px #0002";
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  notification.style.display = "block";

  clearTimeout(showMessage.timer);
  showMessage.timer = setTimeout(() => {
    notification.style.display = "none";
  }, 2500);
}

// Create a reusable job card.
function createJobCard(job) {
  const isSaved = savedJobs.includes(job.id);

  return `
    <article class="job-card">
      <div class="job-head">
        <div class="company-logo">
          ${escapeHTML(job.company.charAt(0))}
        </div>

        <div class="job-head-main">
          <h3>${escapeHTML(job.title)}</h3>
          <p class="company-name">${escapeHTML(job.company)}</p>
        </div>

        <button class="bookmark ${isSaved ? "active" : ""}"
          data-save="${job.id}"
          aria-label="${isSaved ? "Remove saved job" : "Save job"}">
          ${isSaved ? "♥" : "♡"}
        </button>
      </div>

      <div class="job-meta">
        <span>⌖ ${escapeHTML(job.location)}</span>
        <span>◉ ${escapeHTML(job.work)}</span>
        <span>▣ ${escapeHTML(job.experience)}</span>
      </div>

      <p class="job-description">
        ${escapeHTML(job.description)}
      </p>

      <div class="tags">
        ${job.skills.map(skill =>
          `<span>${escapeHTML(skill)}</span>`
        ).join("")}
      </div>

      <div class="job-bottom">
        <div class="salary">
          ${escapeHTML(job.salaryText)}
          <small>Illustrative salary range</small>
        </div>

        <div class="job-actions">
          <a class="btn btn-outline"
            href="job-details.html?id=${job.id}">Details</a>
          <a class="btn"
            href="job-details.html?id=${job.id}#apply">Apply →</a>
        </div>
      </div>
    </article>
  `;
}

function emptyState(title, description) {
  return `
    <div class="empty-state">
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(description)}</p>
      <a class="btn" href="jobs.html">Browse Jobs</a>
    </div>
  `;
}

// Homepage featured listings.
function renderFeaturedJobs() {
  const container = $("#featured-jobs");
  if (!container) return;

  container.innerHTML = jobs.slice(0, 4)
    .map(createJobCard).join("");
}

// Search and filter jobs.
function getFilteredJobs() {
  const keyword = ($("#search-keyword")?.value || "")
    .trim().toLowerCase();

  const location = ($("#search-location")?.value || "")
    .trim().toLowerCase();

  const selected = name =>
    $$(`input[name="${name}"]:checked`).map(input => input.value);

  const experience = selected("experience");
  const work = selected("work");
  const categories = selected("category");

  let results = jobs.filter(job => {
    const searchable = [
      job.title,
      job.company,
      job.description,
      job.category,
      ...job.skills
    ].join(" ").toLowerCase();

    const matchesKeyword =
      !keyword || searchable.includes(keyword);

    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location) ||
      job.work.toLowerCase().includes(location);

    const matchesExperience =
      !experience.length || experience.includes(job.experience);

    const matchesWork =
      !work.length || work.includes(job.work);

    const matchesCategory =
      !categories.length || categories.includes(job.category);

    return matchesKeyword &&
      matchesLocation &&
      matchesExperience &&
      matchesWork &&
      matchesCategory;
  });

  if ($("#sort-jobs")?.value === "salary") {
    results.sort((a, b) => b.salary - a.salary);
  }

  return results;
}

function renderAllJobs() {
  const container = $("#all-jobs");
  if (!container) return;

  const results = getFilteredJobs();

  $("#results-count").textContent =
    `${results.length} job${results.length === 1 ? "" : "s"} found`;

  container.innerHTML = results.length
    ? results.map(createJobCard).join("")
    : emptyState("No jobs found", "Try another keyword or change your filters.");
}

function renderSavedJobs() {
  const container = $("#saved-jobs-list");
  if (!container) return;

  const results = jobs.filter(job => savedJobs.includes(job.id));

  container.innerHTML = results.length
    ? results.map(createJobCard).join("")
    : emptyState("No saved jobs yet", "Browse jobs and select the heart icon to save one.");
}

// Display details for a selected job.
function renderJobDetails() {
  const container = $("#job-detail-content");
  if (!container) return;

  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const job = jobs.find(item => item.id === id);

  if (!job) {
    container.innerHTML = emptyState(
      "Job not found",
      "Please return to the job listings."
    );
    return;
  }

  document.title = `${job.title} | CareerConnect`;

  container.innerHTML = `
    <article class="detail-main">
      <div class="job-head">
        <div class="company-logo">${escapeHTML(job.company.charAt(0))}</div>
        <div>
          <h1>${escapeHTML(job.title)}</h1>
          <p class="company-name">
            ${escapeHTML(job.company)} · ${escapeHTML(job.location)}
          </p>
        </div>
      </div>

      <div class="tags">
        <span>${escapeHTML(job.work)}</span>
        <span>${escapeHTML(job.experience)}</span>
        <span>${escapeHTML(job.category)}</span>
      </div>

      <h2>About this role</h2>
      <p>${escapeHTML(job.description)}</p>

      <h2>Skills required</h2>
      <div class="tags">
        ${job.skills.map(skill =>
          `<span>${escapeHTML(skill)}</span>`
        ).join("")}
      </div>

      <h2>Responsibilities</h2>
      <ul>
        <li>Work with the team to complete assigned tasks.</li>
        <li>Communicate clearly and document your work.</li>
        <li>Learn tools and best practices relevant to the role.</li>
      </ul>

      <h2>Important information</h2>
      <p>This is a sample vacancy for demonstration purposes.
      Verify the employer and vacancy independently before applying.</p>

      <div id="apply"></div>
    </article>

    <aside class="detail-sidebar">
      <h3>Job overview</h3>

      <div class="detail-fact">
        <small>Estimated salary</small>
        <strong>${escapeHTML(job.salaryText)}</strong>
      </div>

      <div class="detail-fact">
        <small>Location</small>
        <strong>${escapeHTML(job.location)}</strong>
      </div>

      <div class="detail-fact">
        <small>Work arrangement</small>
        <strong>${escapeHTML(job.work)}</strong>
      </div>

      <button class="btn" id="apply-button">Apply for this job →</button>

      <button class="btn btn-outline" data-save="${job.id}">
        ${savedJobs.includes(job.id) ? "♥ Saved" : "♡ Save Job"}
      </button>

      <p>Demo listing. Applications are not sent to an employer.</p>
    </aside>
  `;

  $("#apply-button").addEventListener("click", () => {
    showMessage("Connect an employer application link to enable real applications.");
  });
}

// Mobile navigation.
function setupNavigation() {
  const menuButton = $(".menu-toggle");
  const navigation = $(".nav-links");

  if (!menuButton || !navigation) return;

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

// Reset filters.
function setupFilters() {
  $("#jobs-search")?.addEventListener("submit", event => {
    event.preventDefault();
    renderAllJobs();
  });

  $("#search-keyword")?.addEventListener("input", renderAllJobs);
  $("#search-location")?.addEventListener("input", renderAllJobs);
  $("#sort-jobs")?.addEventListener("change", renderAllJobs);

  $$(".filters input").forEach(input => {
    input.addEventListener("change", renderAllJobs);
  });

  $("#clear-filters")?.addEventListener("click", () => {
    $$(".filters input").forEach(input => {
      input.checked = false;
    });

    if ($("#search-keyword")) $("#search-keyword").value = "";
    if ($("#search-location")) $("#search-location").value = "";
    if ($("#sort-jobs")) $("#sort-jobs").value = "recent";

    history.replaceState(null, "", location.pathname);
    renderAllJobs();
  });
}

// Contact form demo.
function setupContactForm() {
  $("#contact-form")?.addEventListener("submit", event => {
    event.preventDefault();

    $("#contact-feedback").textContent =
      "Thank you! This demo does not send messages to a server.";

    event.target.reset();
  });
}

// Update the website whenever a job is saved or removed.
function renderAll() {
  renderFeaturedJobs();
  renderAllJobs();
  renderSavedJobs();
  renderJobDetails();
  updateSavedCount();
}

// Start the website.
document.addEventListener("DOMContentLoaded", () => {
  $$("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // Allow search links from the homepage to populate job search.
  const params = new URLSearchParams(location.search);

  if ($("#search-keyword") && params.has("q")) {
    $("#search-keyword").value = params.get("q");
  }

  if ($("#search-location") && params.has("location")) {
    $("#search-location").value = params.get("location");
  }

  if ($("#all-jobs") && params.has("category")) {
    const category = params.get("category");
    const checkbox = $$('input[name="category"]').find(
      input => input.value === category
    );

    if (checkbox) checkbox.checked = true;
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-save]");

    if (button) {
      event.preventDefault();
      toggleSaved(button.dataset.save);
    }
  });

  setupNavigation();
  setupFilters();
  setupContactForm();
  renderAll();
});