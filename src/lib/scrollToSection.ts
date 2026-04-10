export function scrollToSection(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
