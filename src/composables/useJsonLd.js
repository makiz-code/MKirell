import { watch, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage.js'
import { buildJsonLd } from '@/utils/jsonld.js'

export function useJsonLd() {
  const { lang, t } = useLanguage()

  function update() {
    let el = document.getElementById('app-json-ld')
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id   = 'app-json-ld'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(buildJsonLd(t.value, lang.value))
  }

  onMounted(update)
  watch(lang, update)
}
