(function () {
  const data = window.portfolioData;

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  }

  function setHref(selector, href) {
    document.querySelectorAll(selector).forEach((element) => {
      element.href = href;
    });
  }

  function renderProfile() {
    const profile = data.profile;
    setText('[data-profile="headline"]', profile.headline);
    setText('[data-profile="email"]', profile.email);
    setText('[data-profile="phone"]', profile.phone);
    setText('[data-profile="location"]', profile.location);
    document.querySelectorAll('[data-profile="about"]').forEach((element) => {
      if (Array.isArray(profile.about)) {
        element.replaceWith(...profile.about.map((paragraph) => {
          const aboutParagraph = document.createElement("p");
          aboutParagraph.textContent = paragraph;
          return aboutParagraph;
        }));
      } else {
        element.textContent = profile.about;
      }
    });
    document.querySelectorAll('[data-profile="currentRole"]').forEach((element) => {
      if (profile.currentRole) {
        element.textContent = profile.currentRole;
      } else {
        element.remove();
      }
    });
    setHref('[data-profile-link="linkedin"]', profile.linkedin);
    setHref('[data-profile-link="resume"]', profile.resume);
    setHref('[data-profile-link="email"], [data-profile-link="emailFooter"]', `mailto:${profile.email}`);
    setHref('[data-profile-link="phone"]', `tel:${profile.phone.replace(/[^\d+]/g, "")}`);
    document.querySelector("[data-profile-img]").src = profile.photo;
  }

  function renderSkills() {
    const columns = [
      "BI & Visualization",
      "Data Engineering/Modern Data Platforms",
      "Data Science & Analytics",
      "Programming & Libraries",
      "Business & Leadership"
    ];
    const maxRows = Math.max(...columns.map((column) => data.skills[column].length));
    const rows = Array.from({ length: maxRows }, (_, rowIndex) => {
      const cells = columns.map((column) => `<td>${data.skills[column][rowIndex] || ""}</td>`).join("");
      return `<tr>${cells}</tr>`;
    }).join("");
    document.getElementById("skillsRows").innerHTML = rows;
  }

  function renderProjects() {
    document.getElementById("projectCards").innerHTML = data.projects
      .map(
        (project) => `
          <a class="work-card" href="${project.link}" target="_blank" rel="noreferrer">
            <div>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            </div>
            <div class="tags">
              ${project.technologies.map((technology) => `<span class="tag">${technology}</span>`).join("")}
            </div>
          </a>
        `
      )
      .join("");
  }

  function renderCredentials() {
    document.getElementById("credentialList").innerHTML = data.credentials
      .map(
        (credential) => `
          <article class="credential">
            <div>
              <h3>${credential.title}</h3>
              <p>
                Issuer: ${credential.issuer}${credential.status ? ` | Status: ${credential.status}` : ""}
              </p>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderBlogs() {
    document.getElementById("blogCards").innerHTML = data.blogs
      .map(
        (blog) => `
          <a class="work-card" href="${blog.link}" target="_blank" rel="noreferrer">
            <div>
              <span class="area-tag">${blog.area}</span>
              <h3>${blog.title}</h3>
              <p>${blog.description}</p>
            </div>
          </a>
        `
      )
      .join("");
  }

  function setupNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  renderProfile();
  renderSkills();
  renderProjects();
  renderCredentials();
  renderBlogs();
  setupNavigation();
  document.getElementById("year").textContent = new Date().getFullYear();
})();
