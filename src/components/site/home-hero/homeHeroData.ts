export const DURATION = 5000

export const SLIDE_GLOWS = [
  "radial-gradient(ellipse at 70% 40%, rgba(230,57,70,0.05), transparent 60%)",
  "radial-gradient(ellipse at 70% 30%, rgba(100,57,230,0.04), transparent 60%)",
  "radial-gradient(ellipse at 60% 50%, rgba(57,150,230,0.04), transparent 60%)",
  "radial-gradient(ellipse at 75% 60%, rgba(230,57,70,0.06), transparent 60%)",
  "radial-gradient(ellipse at 65% 35%, rgba(57,230,150,0.04), transparent 60%)",
]

export const HOME_HERO_FEATURE_KEYS = ["hero_feat_1", "hero_feat_2", "hero_feat_3"] as const

export const HOME_HERO_STATIC_STATS = [
  { num: "10k", suffix: "+", labelKey: "titles" },
  { num: "50k", suffix: "+", labelKey: "members" },
] as const
