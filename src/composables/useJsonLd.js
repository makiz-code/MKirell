import { watch, onMounted } from "vue";
import { useLanguage } from "@/composables/useLanguage.js";
import jsonld from "@/data/jsonld.json";

export function useJsonLd() {
  const { lang } = useLanguage();

  function update() {
    let el = document.getElementById("app-json-ld");
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = "app-json-ld";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(jsonld[lang.value]);
  }

  onMounted(update);
  watch(lang, update);
}
