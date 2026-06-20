<template>
  <section class="section" id="education" aria-labelledby="education-heading">
    <div class="container">
      <header class="section__header" v-reveal>
        <span class="section-num">05</span>
        <span class="section-name">{{ t.nav.education }}</span>
      </header>
      <h2 id="education-heading" class="section-h2" v-reveal>{{ t.education.heading }}</h2>

      <!-- Degrees + Certs -->
      <div class="edu__grid" v-reveal>
        <div>
          <p class="edu__sub">{{ t.education.degrees_title }}</p>
          <ul class="edu-list">
            <li class="edu-card" v-for="deg in t.education.degrees" :key="deg.title">
              <time class="edu-card__year">{{ deg.years }}</time>
              <div class="edu-card__body">
                <h3>{{ deg.title }}</h3>
                <span class="edu-card__school">{{ deg.school }}</span>
                <span class="edu-card__location">{{ deg.location }}</span>
                <span v-if="deg.mention" class="edu-card__mention">{{ deg.mention }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <p class="edu__sub">{{ t.education.certs_title }}</p>
          <ul class="cert-list">
            <li class="cert-item" v-for="cert in t.education.certs" :key="cert.title">
              <div class="cert-item__icon" aria-hidden="true">{{ cert.icon }}</div>
              <div>
                <p class="cert-item__title">{{ cert.title }}</p>
                <p class="cert-item__issuer">{{ cert.issuer }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Volunteering + Awards -->
      <div class="extras__grid" v-reveal>
        <div class="extra-block">
          <h3>{{ t.education.vol_title }}</h3>
          <ul>
            <li class="extra-card" v-for="vol in t.education.vols" :key="vol.org">
              <p class="extra-card__org">{{ vol.org }}</p>
              <p class="extra-card__role">{{ vol.role }}</p>
              <time class="extra-card__period">{{ vol.period }}</time>
              <p v-html="boldify(vol.desc)"></p>
            </li>
          </ul>
        </div>
        <div class="extra-block">
          <h3>{{ t.education.awards_title }}</h3>
          <ul>
            <li class="award-card" v-for="award in t.education.awards" :key="award.event">
              <div class="award-card__icon" aria-hidden="true">{{ award.icon }}</div>
              <div>
                <p class="award-card__title">{{ award.title }}</p>
                <p class="award-card__event">{{ award.event }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '@/composables/useLanguage.js'
import { boldify } from '@/utils/text.js'
const { t } = useLanguage()
</script>

<style scoped>
.edu-list { display: flex; flex-direction: column; }
.edu__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 64px; }
.edu__sub {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  color: var(--accent-deep);
  margin-bottom: 26px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.78rem;
}
.edu-card { display: flex; gap: 20px; padding: 20px 0; border-bottom: 1px solid var(--line); }
.edu-card:last-child { border-bottom: none; }
.edu-card__year {
  flex-shrink: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--ink-soft);
  width: 90px;
  padding-top: 3px;
}
.edu-card__body h3 {
  font-family: 'Fraunces', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 5px;
}
.edu-card__school { display: block; font-size: 0.85rem; color: var(--ink); font-weight: 500; }
.edu-card__location { display: block; font-size: 0.85rem; color: var(--ink-soft); }
.edu-card__mention {
  display: inline-block;
  margin-top: 9px;
  background: var(--gold-soft);
  border: 1px solid rgba(184, 137, 59, 0.3);
  border-radius: 6px;
  padding: 2px 10px;
  font-size: 0.76rem;
  color: var(--gold);
  font-family: 'JetBrains Mono', monospace;
}
.cert-list { display: flex; flex-direction: column; gap: 14px; }
.cert-item {
  display: flex; align-items: flex-start; gap: 16px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 17px 19px;
  transition: border-color var(--transition);
}
.cert-item:hover { border-color: var(--accent-line); }
.cert-item__icon {
  flex-shrink: 0; width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.05rem; border-radius: 9px;
  background: var(--accent-soft);
}
.cert-item__title { font-size: 0.92rem; color: var(--ink); font-weight: 500; margin-bottom: 3px; }
.cert-item__issuer { color: var(--ink-soft); font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; }

.extras__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.extra-block h3 {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem; font-weight: 500;
  color: var(--accent-deep);
  letter-spacing: 0.1em; text-transform: uppercase;
  margin-bottom: 22px;
}
.extra-card { border-inline-start: 2px solid var(--line-strong); padding-inline-start: 20px; margin-bottom: 24px; }
.extra-card__org { font-family: 'Fraunces', serif; font-size: 1.05rem; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
.extra-card__role { color: var(--accent-deep); font-size: 0.87rem; font-weight: 500; margin-bottom: 2px; }
.extra-card__period { display: block; color: var(--ink-soft); font-size: 0.72rem; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
.extra-card p { color: var(--ink-soft); font-size: 0.9rem; }

.award-card {
  display: flex; align-items: center; gap: 16px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 18px 20px; margin-bottom: 14px;
  transition: border-color var(--transition), transform var(--transition);
}
.award-card:hover { border-color: rgba(184, 137, 59, 0.4); transform: translateX(4px); }
:global(html[dir="rtl"]) .award-card:hover { transform: translateX(-4px); }
.award-card__icon {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; border-radius: 10px;
  background: var(--gold-soft);
}
.award-card__title { font-family: 'Fraunces', serif; font-size: 0.98rem; font-weight: 600; color: var(--ink); }
.award-card__event { font-size: 0.82rem; color: var(--ink-soft); }

@media (max-width: 900px) {
  .edu__grid { grid-template-columns: 1fr; }
  .extras__grid { grid-template-columns: 1fr; }
}
</style>
