export const LANGUAGES = [
  { code: "ig", name: "Igbo", native: "Asụsụ Igbo" },
  { code: "yo", name: "Yoruba", native: "Èdè Yorùbá" },
  { code: "ha", name: "Hausa", native: "Harshen Hausa" },
  { code: "pi", name: "Pidgin", native: "Naija Pidgin" },
];

export const PROMPTS: Record<string, string[]> = {
  ig: ["Kedu ka ị dị taa?", "Gwa m ihe ị na-eme taa.", "Ebee ka ị na-aga?"],
  yo: ["Bawo ni ọjọ́ rẹ?", "Sọ fún mi ní ẹ̀rín ìjàmbá rẹ.", "Níbo lo ń lọ?"],
  ha: ["Yaya ake yi yau?", "Faɗa min abin da kake yi yau.", "Ina za'a tafi?"],
  pi: ["How you dey today?", "Wetin you dey do?", "Where you dey go?"],
};

export const NIGERIAN_STATES = ["Lagos", "Abuja FCT", "Kano", "Rivers", "Oyo", "Kaduna", "Enugu", "Delta"];
