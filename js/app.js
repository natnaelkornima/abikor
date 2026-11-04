/**
 * Natnael Kornima — Portfolio Controller & Interactive Features
 * Reverse engineered from kinfish.dev minimalist brutalism & live wire HUD.
 */

import { portfolio } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initLiveWire();
  renderArticles();
  renderProjects();
  renderSets();
  initArchitectureStage();
  initProjectModal();
  initContactActions();
});

/* ==========================================================================
   Live Wire HUD (Inspection Reticle & Connector)
   ========================================================================== */
function initLiveWire() {
  const lw = document.querySelector('.k-lw');
  const lwSelect = document.querySelector('.k-lw__select');
  const lwWire = document.querySelector('.k-lw__wire');
  const lwLabel = document.querySelector('.k-lw__label');
  const lwLabelText = lwLabel ? lwLabel.querySelector('.k-lw__text') : null;

  if (!lw || !lwSelect || !lwWire || !lwLabel) return;

  let activeTarget = null;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (activeTarget) {
      updateWire(activeTarget);
    }
  }, { passive: true });

  function attachHoverListeners() {
    const targets = document.querySelectorAll('a, button, .k-row-item, .k-flow-card, .k-set-card');
    targets.forEach((el) => {
      if (el.dataset.lwAttached) return;
      el.dataset.lwAttached = 'true';

      el.addEventListener('mouseenter', () => {
        activeTarget = el;
        const rect = el.getBoundingClientRect();
        
        // Position reticle
        lwSelect.style.width = `${rect.width + 8}px`;
        lwSelect.style.height = `${rect.height + 8}px`;
        lwSelect.style.transform = `translate(${rect.left - 4}px, ${rect.top - 4}px)`;

        // Setup label text
        let tag = 'ACTION';
        if (el.matches('a[href^="http"]')) tag = 'EXTERNAL';
        else if (el.matches('a[href^="#"]')) tag = 'SECTION';
        else if (el.classList.contains('k-row-item')) tag = 'PROJECT';
        else if (el.classList.contains('k-set-card')) tag = 'CAPABILITY';
        else if (el.classList.contains('k-flow-card')) tag = 'SYSTEM FLOW';

        const labelContent = el.getAttribute('aria-label') || el.dataset.label || el.title || el.innerText.trim().slice(0, 32) || 'Inspect';
        if (lwLabelText) {
          lwLabelText.textContent = `${tag} // ${labelContent.replace(/\s+/g, ' ')}`;
        }

        // Position label above target
        const labelX = Math.max(8, rect.left);
        const labelY = Math.max(8, rect.top - 28);
        lwLabel.style.transform = `translate(${labelX}px, ${labelY}px)`;

        lw.classList.add('is-active');
        updateWire(el);
      });

      el.addEventListener('mouseleave', () => {
        if (activeTarget === el) {
          activeTarget = null;
          lw.classList.remove('is-active');
        }
      });
    });
  }

  function updateWire(target) {
    const rect = target.getBoundingClientRect();
    const targetCenterX = rect.left + rect.width / 2;
    const targetCenterY = rect.top;

    // Draw curved SVG wire from mouse to target
    const pathD = `M ${mouseX} ${mouseY} Q ${(mouseX + targetCenterX) / 2} ${Math.min(mouseY, targetCenterY) - 20}, ${targetCenterX} ${targetCenterY}`;
    lwWire.setAttribute('d', pathD);
  }

  attachHoverListeners();

  // Reattach after rendering dynamic items
  window.refreshLiveWire = attachHoverListeners;
}

/* ==========================================================================
   Render Writing & Technical Notes
   ========================================================================== */
function renderArticles() {
  const container = document.getElementById('articles-list');
  if (!container) return;

  container.innerHTML = portfolio.articles.map(article => `
    <li class="k-row-item" data-label="${escapeHtml(article.title)}">
      <div class="k-row-header">
        <span class="k-row-title">
          ${escapeHtml(article.title)}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="k-arrow" aria-hidden="true">
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
          </svg>
        </span>
        <time class="k-label" style="font-size: 11px; white-space: nowrap;">${article.date}</time>
      </div>
      <p class="k-row-desc">${escapeHtml(article.summary)}</p>
      <div class="k-row-meta">
        <span class="k-chip">${article.category}</span>
        <span>${article.readTime}</span>
      </div>
    </li>
  `).join('');
}

/* ==========================================================================
   Render Projects
   ========================================================================== */
function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  container.innerHTML = portfolio.projects.map(project => `
    <li class="k-row-item project-trigger" data-project-id="${project.id}" data-label="${escapeHtml(project.title)}" tabindex="0" role="button">
      <div class="k-row-header">
        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
          <span class="k-row-title">
            ${escapeHtml(project.title)}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="k-arrow" aria-hidden="true">
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </span>
          <span class="k-chip" style="font-size: 10px;">${project.role}</span>
        </div>
        <span class="k-label" style="font-size: 11px; color: var(--k-accent);">${project.metrics.split('·')[0].trim()}</span>
      </div>
      <p class="k-row-desc">${escapeHtml(project.description)}</p>
      <div class="k-row-meta">
        <span class="k-row-meta-tag">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          ${escapeHtml(project.metrics)}
        </span>
        <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-left: auto;">
          ${project.techStack.slice(0, 4).map(tech => `<span class="k-skill-pill" style="font-size: 10px;">${tech}</span>`).join('')}
        </div>
      </div>
    </li>
  `).join('');

  if (window.refreshLiveWire) {
    window.refreshLiveWire();
  }
}

/* ==========================================================================
   Render Sets (Capabilities)
   ========================================================================== */
function renderSets() {
  const container = document.getElementById('sets-grid');
  if (!container) return;

  container.innerHTML = portfolio.sets.map(set => `
    <div class="k-set-card" data-label="Set ${set.index} // ${set.title}">
      <div class="k-set-head">
        <span class="k-label">
          <span class="k-num">${set.index}</span>
          <span class="k-sep">/</span>
          <span>SET</span>
        </span>
        <span class="k-chip" style="font-size: 10px;">${set.count}</span>
      </div>
      <h3 class="k-set-name">${escapeHtml(set.title)}</h3>
      <p class="k-set-desc">${escapeHtml(set.description)}</p>
      <div class="k-skills-pills">
        ${set.skills.map(skill => `<span class="k-skill-pill">${escapeHtml(skill)}</span>`).join('')}
      </div>
    </div>
  `).join('');

  if (window.refreshLiveWire) {
    window.refreshLiveWire();
  }
}

/* ==========================================================================
   Architecture Interactive Stage
   ========================================================================== */
function initArchitectureStage() {
  const stage = document.getElementById('arch-stage');
  const specText = document.getElementById('arch-spec');
  const tabs = document.querySelectorAll('.k-iso__tab');
  if (!stage || !specText) return;

  let currentKey = 'web';

  function renderStage(key) {
    const arch = portfolio.architectures[key];
    if (!arch) return;

    specText.textContent = arch.spec;
    stage.innerHTML = `
      <div class="k-flow-grid">
        ${arch.layers.map((layer, i) => `
          <div class="k-flow-card" data-label="LAYER ${i + 1} // ${layer.layer}">
            <div class="k-flow-step">${layer.step}</div>
            <div class="k-flow-name">${escapeHtml(layer.layer)}</div>
            <div class="k-flow-tech">${escapeHtml(layer.tech)}</div>
            <span class="k-flow-metric">${escapeHtml(layer.metric)}</span>
            <div class="k-flow-detail">${escapeHtml(layer.detail)}</div>
          </div>
        `).join('')}
      </div>
    `;

    if (window.refreshLiveWire) {
      window.refreshLiveWire();
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentKey = tab.dataset.arch;
      renderStage(currentKey);
    });
  });

  renderStage(currentKey);
}

/* ==========================================================================
   Project Deep Dive Modal
   ========================================================================== */
function initProjectModal() {
  const backdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const titleEl = document.getElementById('modal-title');
  const taglineEl = document.getElementById('modal-tagline');
  const problemEl = document.getElementById('modal-problem');
  const solutionEl = document.getElementById('modal-solution');
  const metricsEl = document.getElementById('modal-metrics');
  const techEl = document.getElementById('modal-tech');
  const flowEl = document.getElementById('modal-flow');
  const linkEl = document.getElementById('modal-github-link');

  if (!backdrop) return;

  function openProject(projectId) {
    const project = portfolio.projects.find(p => p.id === projectId);
    if (!project) return;

    titleEl.textContent = project.title;
    taglineEl.textContent = project.tagline;
    problemEl.textContent = project.problem;
    solutionEl.textContent = project.solution;
    metricsEl.textContent = project.metrics;

    techEl.innerHTML = project.techStack.map(t => `<span class="k-chip">${escapeHtml(t)}</span>`).join('');
    flowEl.innerHTML = project.flow.map((f, i) => `
      <div style="background: #202020; padding: 6px 10px; border-radius: 4px; border: 1px solid #2d2d2d; font-family: var(--font-geist-mono); font-size: 11px;">
        <span style="color: var(--k-dim); margin-right: 6px;">0${i+1}</span>
        <span>${escapeHtml(f)}</span>
      </div>
    `).join('');

    if (project.github) {
      linkEl.href = project.github;
      linkEl.style.display = 'inline-flex';
    } else {
      linkEl.style.display = 'none';
    }

    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.project-trigger');
    if (trigger) {
      e.preventDefault();
      const id = trigger.dataset.projectId;
      openProject(id);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Contact & Clipboard Actions
   ========================================================================== */
function initContactActions() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('k-toast');
  const toastText = document.getElementById('k-toast-text');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = portfolio.profile.contact.email;
      navigator.clipboard.writeText(email).then(() => {
        if (toast && toastText) {
          toastText.textContent = `Copied ${email} to clipboard`;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3000);
        }
      });
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

