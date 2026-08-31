# Handoff

## Goal
Create an Expo React Native test app (`react-native-turnstile-test-app`) in the projects folder and wire it to the local `react-native-turnstile` package with a working Turnstile demo screen.

## Constraints
- Do not commit unless explicitly asked
- Test app lives at sibling path `../react-native-turnstile-test-app` (not inside the library repo)
- Library uses pnpm; test app uses npm (Expo default)
- Turnstile requires `turnstile.1337707.xyz` on the site key’s allowed domains for real keys

## Decisions
- Expo template: `blank-typescript` (Expo ~57, RN 0.86.2, React 19.2.3)
- Local link: `"react-native-turnstile": "file:../react-native-turnstile"` in test app `package.json`
- Installed `react-native-webview` via `expo install` (SDK 57 compatible)
- Demo defaults to Cloudflare always-pass test key `1x00000000000000000000AA`
- Override site key with `EXPO_PUBLIC_TURNSTILE_SITEKEY` (see `.env.example`)
- `TurnstileResetRef` not exported from package — demo uses `MutableRefObject<() => void | undefined>` cast for `resetRef` / `resetTurnstile`
- Library `dist/` must be built (`pnpm build`) before test app picks up source changes

## Current state
- **Done:** Expo app scaffolded; local package linked; demo UI with widget, token display, event log, reset button; `npx tsc --noEmit` passes in test app
- **Not run:** simulator/device (`npm run ios` / `android` / `web`) — not verified in this session
- **Library repo** (`react-native-turnstile`): prior uncommitted work remains (dependency/tooling updates on `master`); separate from test-app work

## Files
- `../react-native-turnstile-test-app/package.json` — local file dep + webview
- `../react-native-turnstile-test-app/App.tsx` — Turnstile demo screen
- `../react-native-turnstile-test-app/.env.example` — site key env var template
- `dist/` (library) — built via `pnpm build` for local consumption
- `src/ReactNativeTurnstile.tsx` — component the demo imports (library source)
- `README.md` — domain + usage docs for Turnstile setup

## Next steps
1. Run test app: `cd ../react-native-turnstile-test-app && npm run ios` (or android/web)
2. Set real site key in `.env` if not using test key; ensure domain allowlist includes `turnstile.1337707.xyz`
3. After library edits: `pnpm build` in `react-native-turnstile`, then restart Expo
4. Optionally export `TurnstileResetRef` from library index to simplify demo typing
5. Commit/publish library or test-app changes only when user requests

## Open questions
- Should test app be initialized as git repo or kept ephemeral?
- Use real Cloudflare site key vs test key for day-to-day dev?
