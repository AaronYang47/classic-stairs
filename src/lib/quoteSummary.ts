import {
  stairTypes,
  materials,
  finishes,
  extras,
  calculatePrice,
} from "../data/pricing";
import { SITE } from "./siteInfo";

export interface QuoteFormSnapshot {
  type: string;
  width: number;
  height: number;
  steps: number;
  material: string;
  finish: string;
  selectedExtras: string[];
}

export function summarizeQuote(form: QuoteFormSnapshot): string {
  const type = stairTypes.find((t) => t.id === form.type);
  const material = materials.find((m) => m.id === form.material);
  const finish = finishes.find((f) => f.id === form.finish);
  const extraNames = form.selectedExtras
    .map((id) => extras.find((e) => e.id === id)?.name)
    .filter(Boolean);

  const price =
    form.type && form.material && form.finish
      ? calculatePrice(
          form.type,
          form.width,
          form.height,
          form.steps,
          form.material,
          form.finish,
          form.selectedExtras
        )
      : null;

  const lines = [
    `Quote inquiry — ${type?.name ?? "Stair type TBD"}`,
    "",
    `Dimensions: ${form.width} cm wide × ${form.height} cm rise, ${form.steps} steps`,
    `Material: ${material?.name ?? form.material}`,
    `Finish: ${finish?.name ?? form.finish}`,
  ];
  if (extraNames.length) {
    lines.push(`Add-ons: ${extraNames.join(", ")}`);
  }
  if (price) {
    lines.push(
      "",
      `Estimated range: $${price.min.toLocaleString()} — $${price.max.toLocaleString()} (indicative only)`
    );
  }
  lines.push("", "Please contact me to refine this quote.");
  return lines.join("\n");
}

export function buildMailtoQuoteUrl(form: QuoteFormSnapshot): string {
  const body = summarizeQuote(form);
  const subject = encodeURIComponent(`Quote request — ${SITE.name}`);
  return `mailto:${SITE.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
}
