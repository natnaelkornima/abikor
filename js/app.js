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
  if (!stage) return;

  let currentKey = 'web';

  const webNodes = [
    { num: "01", tag: "INGESTION", title: "Edge Gateway", tech: "Fastify + Proxy", dot: "#4ade80", metric1: "P99 < 1.2ms", metric2: "40k req/s", badge: "CACHE: 98%", color: "#4ade80" },
    { num: "02", tag: "EVENT BUS", title: "Redis Ring", tech: "FIFO Streams", dot: "#38bdf8", metric1: "Zero drops", metric2: "BullMQ queue", badge: "RING: ACTIVE", color: "#38bdf8" },
    { num: "03", tag: "COMPUTE", title: "Worker Core", tech: "Async Workers", dot: "#e56b40", metric1: "Concurrency: 64", metric2: "Retry & Backoff", badge: "JOB: PASS", color: "#e56b40" },
    { num: "04", tag: "STORAGE", title: "PostgreSQL", tech: "ACID Cluster", dot: "#a855f7", metric1: "WAL replication", metric2: "Pool: 120 binds", badge: "ACID: OK", color: "#a855f7" }
  ];

  const aiNodes = [
    { num: "01", tag: "GATEWAY", title: "FastAPI Core", tech: "Token Firewall", dot: "#4ade80", metric1: "Sanitizer pass", metric2: "Injection block", badge: "RATE: 120/s", color: "#4ade80" },
    { num: "02", tag: "RETRIEVAL", title: "Hybrid RAG", tech: "Qdrant + BM25", dot: "#38bdf8", metric1: "RRF score fusion", metric2: "Top-k: 8 chunks", badge: "RECALL: 94%", color: "#38bdf8" },
    { num: "03", tag: "REASONING", title: "LLM Runner", tech: "Structured Mode", dot: "#e56b40", metric1: "JSON grammar", metric2: "Deterministic", badge: "P99: 240ms", color: "#e56b40" },
    { num: "04", tag: "VALIDATION", title: "Guardrails", tech: "Pydantic DTO", dot: "#a855f7", metric1: "Type assertion", metric2: "Schema check", badge: "VALID: 100%", color: "#a855f7" }
  ];

  function renderStage(key) {
    const nodes = key === 'web' ? webNodes : aiNodes;
    if (specText) {
      specText.textContent = key === 'web'
        ? "FLOW: HIGH-CONCURRENCY WEB // P99 < 35MS"
        : "FLOW: DETERMINISTIC AI & HYBRID RAG // ZERO HALLUCINATION";
    }

    stage.innerHTML = `
      <div class="arch-stage" style="width: 100%; border-radius: 8px; border: 1px solid #24242c; background: #0c0c0f; padding: 16px;">
        <svg viewBox="0 0 680 230" role="img" aria-label="Systems Architecture Flow Engine" style="display:block; width:100%; height:auto;">
          <defs>
            <pattern id="arch-dots-static" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="0.75" fill="#22222c"></circle>
            </pattern>
          </defs>
          <rect width="680" height="230" fill="url(#arch-dots-static)"></rect>

          <g>
            <text x="21" y="20" fill="#767676" font-size="8.5" font-family="monospace">04 // SYSTEMS BLUEPRINT</text>
            <text x="659" y="20" text-anchor="end" fill="#ededed" font-size="9" font-family="monospace">PIPELINE: 4 CONNECTED NODES</text>
          </g>

          <g transform="translate(0 34)">
            ${nodes.map((node, i) => {
              const x = 21 + i * 171;
              return `
                <g>
                  <rect x="${x}" y="12" width="125" height="150" rx="8" fill="#111114" stroke="#26262e" stroke-width="1.2"></rect>
                  <text x="${x + 12}" y="34" fill="#767676" font-size="8" font-family="monospace">${node.num} // ${node.tag}</text>
                  <text x="${x + 12}" y="54" fill="#ededed" font-size="12" font-weight="500" font-family="sans-serif">${node.title}</text>
                  <text x="${x + 12}" y="70" fill="#a3a3a3" font-size="9" font-family="monospace">${node.tech}</text>
                  <rect x="${x + 8}" y="82" width="109" height="66" rx="4" fill="#141418" stroke="#252530" stroke-width="1"></rect>
                  <circle cx="${x + 20}" cy="99" r="2.5" fill="${node.dot}"></circle>
                  <text x="${x + 28}" y="102" fill="#767676" font-size="9.5" font-family="sans-serif">${node.metric1}</text>
                  <text x="${x + 20}" y="122" fill="#a3a3a3" font-size="9" font-family="monospace">${node.metric2}</text>
                  <text x="${x + 20}" y="138" fill="${node.color}" font-size="9" font-family="monospace">${node.badge}</text>
                </g>
                ${i < 3 ? `
                  <g>
                    <path d="M${x + 125} 87 H${x + 171}" fill="none" stroke="#3a3a46" stroke-width="1.2"></path>
                    <path d="M${x + 167} 83.5 L${x + 171} 87 L${x + 167} 90.5" fill="none" stroke="#8e8e98" stroke-width="1.2"></path>
                  </g>
                ` : ''}
              `;
            }).join('')}
          </g>
        </svg>
      </div>
    `;
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

