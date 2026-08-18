# Expo Template

A production-ready React Native starter built with **Expo SDK 57**, **Expo Router**, and **TypeScript**.

Use this repository as a scalable app template: clone it, set your environment variables, and start building features without redoing project structure.

## Stack

- React Native + Expo 57
- Expo Router (file-based navigation)
- TypeScript
- Redux Toolkit
- Axios
- Expo SecureStore
- Expo Linear Gradient

## Prerequisites

- Node.js 20 or later
- npm
- [Expo Go](https://expo.dev/go) on a physical device, or an iOS Simulator / Android Emulator

## Getting started

```bash
git clone <your-repo-url>
cd expo_template
cp .env.example .env
npm install
npx expo start
```

Then open the app in Expo Go, an iOS simulator, or an Android emulator.

After changing `.env`, reload the app (shake the device and choose Reload, or restart with `npx expo start --clear`).

## Environment variables

| File | Purpose |
| --- | --- |
| `.env.example` | Committed template. Safe placeholders only. |
| `.env` | Your local secrets and machine-specific values. Gitignored. |

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `EXPO_PUBLIC_APP_ENV` | App environment (`development`, `staging`, `production`) |
| `EXPO_PUBLIC_API_BASE_URL` | Backend API base URL |
| `EXPO_PUBLIC_API_TIMEOUT_MS` | Axios timeout in milliseconds |
| `EXPO_PUBLIC_USE_MOCK_API` | `true` uses local mock auth so the app runs without a backend |
| `EXPO_PUBLIC_API_KEY` | Optional public API key sent as `x-api-key` |

`EXPO_PUBLIC_` values are inlined into the JavaScript bundle. **Do not store private secrets there** (signing keys, database passwords, or server-only tokens).

To talk to a real backend:

1. Set `EXPO_PUBLIC_API_BASE_URL` to your API.
2. Set `EXPO_PUBLIC_USE_MOCK_API=false`.

## Scripts

```bash
npm start          # Start the Metro bundler
npm run ios        # Compile and run the iOS native app
npm run android    # Compile and run the Android native app
npm run web        # Open in the browser
npm run prebuild   # Generate native ios/ and android/ from app.json
npm run lint       # Run Expo lint
```

## Native builds (prebuild)

Native iOS and Android projects are generated from `app.json`. Change identifiers, icons, splash, permissions, and plugins there — then regenerate:

```bash
npx expo prebuild
```

Do not edit files inside `ios/` or `android/` unless you have to. The next prebuild can overwrite those folders. Keep native settings in `app.json` (or a config plugin) so they survive regeneration.

| Native setting | Where to change it |
| --- | --- |
| App display name | `expo.name` |
| iOS bundle ID | `expo.ios.bundleIdentifier` |
| Android package | `expo.android.package` |
| Version | `expo.version`, `ios.buildNumber`, `android.versionCode` |
| Icons / splash | `expo.icon`, `ios.icon`, `android.adaptiveIcon`, `expo-splash-screen` plugin |
| URL scheme | `expo.scheme` |
| Permissions | Config plugins + `ios.infoPlist` / `android.permissions` |

`ios/` and `android/` are gitignored. EAS Build and local `expo run:*` commands generate them when needed.

## Project structure

```text
src/
├── app/            # Expo Router routes only
├── assets/         # Images, icons, fonts
├── components/     # Shared UI (Button, Input, Header, Loader, EmptyState)
├── features/       # Feature modules (auth, later cart, products, …)
├── api/            # Shared Axios client, endpoints, interceptors
├── store/          # Redux store and root reducer
├── hooks/          # Typed Redux hooks
├── services/       # Native/device services
├── utils/          # Generic helpers
├── constants/      # Colors, routes, env-backed config
├── theme/          # Typography and theme tokens
└── types/          # Shared TypeScript types
```

### Where to put new code

| Need | Location |
| --- | --- |
| A new screen / route | `src/app` |
| Auth forms or auth API | `src/features/auth` |
| A reusable button or input | `src/components` |
| Colors | `src/constants/colors.ts` |
| Typography | `src/theme/typography.ts` |
| API base URL / timeouts | `.env` + `src/constants/config.ts` |
| HTTP client | `src/api/client.ts` |
| Redux slice | Inside the feature, then register it in `src/store/rootReducer.ts` |
| Secure storage, location, images | `src/services` |

Import with the `@/` alias:

```ts
import { COLORS } from '@/src/constants/colors';
import { Button } from '@/src/components/Button/Button';
```

## Navigation and auth

On launch the app restores the session from SecureStore.

- **Not signed in** → Sign In, Sign Up, Forgot Password
- **Signed in** → Home, Cart, Settings tabs
- **Profile** is not a tab; open it from Settings

With mock auth enabled, sign in using any valid email and a password of at least 8 characters.

## Architecture rules

- Keep route files small. Put forms and business logic in `src/features`.
- Do not duplicate shared components, colors, or API clients.
- Feature-specific code stays inside that feature.
- Register new Redux slices in `src/store/rootReducer.ts`.

## Learn more

- [Expo documentation (SDK 57)](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Environment variables](https://docs.expo.dev/guides/environment-variables/)
