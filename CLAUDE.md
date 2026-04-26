# Forward Motion — Claude Guidelines

## Icons

Use `@heroicons/react` for all icons. Import from the `24/outline` variant by default:

```tsx
import { HomeIcon, BellIcon } from "@heroicons/react/24/outline"
```

Never use `lucide-react` or any other icon library.

## i18n

All user-facing strings must use `useTranslation()` from `react-i18next`. Never hardcode text in components.

When adding a new string:
1. Add the key to all three locales: `src/i18n/locales/en.json`, `pt.json`, `es.json`
2. Use the key in the component via `t("namespace.key")`

## Loading states

Never use mock/static data as a loading placeholder — it causes a visible flash when real data arrives.

Pages that fetch from the API must:
1. Pass `show={isPending}` to `<PageLoader>` — it shows the app's branded full-screen loader
2. Only render real data (or empty states) after the query resolves
3. Pass empty arrays `[]` as fallback after load, never mock arrays
