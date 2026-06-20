<template>
  <section class="section section--dark" id="projects" aria-labelledby="projects-heading">
    <div class="container">
      <header class="section__header" v-reveal>
        <span class="section-num">04</span>
        <span class="section-name">{{ t.nav.projects }}</span>
      </header>
      <h2 id="projects-heading" class="section-h2" v-reveal>{{ t.projects.heading }}</h2>
      <ul class="projects__grid" aria-label="Project list">
        <li
          v-for="project in t.projects.items"
          :key="project.title"
          class="project-card"
          v-reveal
        >
          <div class="project-card__header">
            <time class="project-card__period">{{ project.period }}</time>
            <span class="project-badge">{{ project.badge }}</span>
          </div>
          <h3 class="project-card__title">{{ project.title }}</h3>
          <p class="project-card__desc" v-html="boldify(project.desc)"></p>
          <ul class="tags tags-sm" aria-label="Technologies used">
            <li v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '@/composables/useLanguage.js'
import { boldify } from '@/utils/text.js'
const { t } = useLanguage()
</script>

<style scoped>
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 20px;
}
.project-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 30px;
  transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
  position: relative;
  overflow: hidden;
}
.project-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  transition: opacity var(--transition);
}
.project-card:hover {
  border-color: var(--accent-line);
  transform: translateY(-4px);
  box-shadow: 0 20px 44px -16px rgba(0,0,0,0.4);
}
.project-card:hover::before { opacity: 1; }
.project-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.project-card__period {
  font-size: 0.72rem;
  color: var(--ink-soft);
  font-family: 'JetBrains Mono', monospace;
}
.project-badge {
  background: var(--gold-soft);
  border: 1px solid rgba(184, 137, 59, 0.3);
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 0.72rem;
  color: var(--gold);
  font-family: 'JetBrains Mono', monospace;
}
.project-card__title {
  font-family: 'Fraunces', serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 14px;
}
.project-card__desc {
  color: var(--ink-soft);
  font-size: 0.92rem;
  line-height: 1.8;
  margin-bottom: 22px;
}

@media (max-width: 900px) {
  .projects__grid { grid-template-columns: 1fr; }
}
</style>
