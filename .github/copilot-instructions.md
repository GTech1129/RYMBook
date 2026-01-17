# RYMBook Copilot Instructions

## Project Overview
**RYMBook** is a single-page React application for "Rumble, Young Man" book launch marketing. It's a full-viewport hero landing page with countdown timer, audio sample player, and cross-browser compatibility focus (especially Brave browser).

### Key Entry Points
- **[src/index.js](src/index.js)**: Mounts `BookLaunchHero` component to DOM
- **[src/bookxxx.jsx](src/bookxxx.jsx)**: Main component (349 lines, self-contained)
- **[public/index.html](public/index.html)**: Bare HTML with single `#root` div

## Architecture Patterns

### Single Component Design
The app uses one large, stateful component (`BookLaunchHero`) instead of splitting into smaller components. Changes should maintain this pattern unless refactoring is explicitly requested.

### Configuration-Driven Approach
Hard-coded `CONFIG` object at component top (line 5):
```javascript
const CONFIG = {
  launchDate: '2026-02-01T00:00:00',
  bookTitle: 'RUMBLE, YOUNG MAN',
  bookSubtitle: 'A STORY OF FIGHTING FOR THE LEAST OF THESE',
  audioUrl: '/assets/audio-sample.mp3'
};
```
Update this object for text/date changes, not JSX directly.

### Inline Styles Precedence
Extensive use of inline `style` objects (with WebKit prefixes) to override Tailwind classes. This handles browser-specific rendering issues. When adding styles:
1. Use inline `style` objects for critical cross-browser concerns
2. Apply WebKit versions (`WebkitTransform`, `WebkitAnimation`, `WebkitBoxShadow`)
3. Use Tailwind only for non-critical styling

### Browser Detection & Compatibility
Brave browser gets special treatment (line 27-35):
- Detects `navigator.brave` API
- Switches from percentage-based heights to fixed pixel values (440px, 360px)
- Uses `@media (-webkit-min-device-pixel-ratio:0)` for webkit-specific fixes
- Always test changes in Brave browser if touching layout/sizing

## State Management

Three core `useState` hooks manage layout and interaction:
1. **`timeLeft`**: Countdown timer state (days, hours, minutes, seconds)
2. **`heroImage`**: Book cover image (file upload → DataURL)
3. **`backgroundImage`**: Background cityscape (file upload → DataURL)
4. **`showAudioModal`**: Modal visibility toggle
5. **`isBrave`**: Browser detection flag

File uploads read as DataURL (not form submission)—critical for dynamic image binding.

## Key Features & Components

### 1. Countdown Timer (Lines 39-49)
- **Implementation**: `setInterval` updating every second
- **Cleanup**: Proper `clearInterval` in useEffect return
- **Critical**: `calculateTimeLeft()` compares against `CONFIG.launchDate`
- **Modification**: Change `CONFIG.launchDate` to update timer target

### 2. Hero Section (Lines 88-137)
- **Layout**: 55% of viewport (Brave: 440px fixed)
- **Background**: Dynamic image upload or SVG placeholder cityscape
- **Critical Issues**: 
  - SVG backgrounds encoded as data URIs—edit with care
  - Height is absolute critical to content section alignment
  - Brave browser hardcoded heights prevent responsive bugs

### 3. Book Cover Display (Lines 140-186)
- **3D Transform**: Rotation via `rotateY` with perspective
- **Animation**: CSS keyframes `bookSpin` (full 360° spin)
- **Positioning**: Bottom-relative to content section (calc-based for responsive, fixed for Brave)
- **Shadow**: Triple-layer drop-shadow + inset shadow for depth
- **Note**: Visible only if `heroImage` is set

### 4. Content Section (Lines 189-193)
- **Layout**: 45% of viewport (Brave: 360px fixed)
- **Contains**: Countdown, buttons, title, footer
- **Critical**: Must stay 45% (or 360px Brave) to maintain proportions with hero section

### 5. Audio Modal (Lines 320-344)
- **Iframe**: Embedded SoundCloud player (hardcoded URL in iframe `src`)
- **Trigger**: "PRESS HERE FOR AUDIO SAMPLE" button
- **Styling**: Fixed black overlay with white card, click-outside to close
- **Note**: Modal URL must be complete SoundCloud embed URL

## Development Workflow

### Build & Development
```bash
npm start          # Runs react-scripts start (development server)
npm build          # Runs react-scripts build (production bundle)
```
No custom webpack/Babel config—uses Create React App defaults (react-scripts ^0.0.0).

### Testing Checklist
When modifying layout/styling, verify in:
1. Chrome (desktop)
2. Firefox (desktop)
3. Safari (if possible)
4. **Brave browser** (critical—many fixes target this)
5. Mobile (iOS/Android, test in DevTools)

### Common Modifications
- **Change book launch date**: Update `CONFIG.launchDate`
- **Change text**: Update `CONFIG.bookTitle`, `CONFIG.bookSubtitle`
- **Change external links**: Modify `window.open()` calls in button handlers
- **Adjust timer**: Modify `calculateTimeLeft()` logic, but preserve cleanup
- **Add button**: Copy button pattern (classes + onClick handler + modal state if needed)

## Critical Gotchas

1. **Image Uploads**: Both hero and background images are file inputs reading to DataURL. They're stored in component state—refreshing page loses them. This is intentional (demo mode).

2. **Responsive Sizing**: The 55%/45% split is viewport-relative. Brave browser breaks this—use `isBrave` state to apply pixel-based fallback.

3. **Keyboard Events**: No keyboard handler exists. Audio modal only closes via button/overlay click.

4. **External Dependencies**: 
   - **SoundCloud iframe**: Hardcoded URL in audio modal. Update both the `CONFIG.audioUrl` and the iframe `src`.
   - **External links**: Heyzine flip-book and PayHip pre-order links in button handlers.

5. **SVG Data URIs**: Background SVGs are base64-encoded inline. Search for `"data:image/svg+xml,%3Csvg"` to find them.

6. **Animation Performance**: `bookSpin` animation runs on initial render. Complex transforms may lag on older devices. Monitor performance if adding animations.

## Common Tasks

| Task | Location | Approach |
|------|----------|----------|
| Change countdown target date | Line 5 (`CONFIG.launchDate`) | Update ISO date string |
| Add/remove buttons | Lines 266-290 | Copy button element, add handler, update modal state |
| Change external link URLs | Lines 73-79 (button handlers) | Update `window.open()` URL parameter |
| Adjust layout proportions | Lines 88, 189 (height style) | Modify percentage/pixel values + Brave fallback |
| Update book cover image | Lines 140-186 (heroImage display) | Modify `src` or upload handler |
| Change color scheme | Throughout (Tailwind classes + inline styles) | Search for `red-700` (primary brand color) |

## File Organization Notes

- **No separate CSS files**: All styles are inline or Tailwind classes
- **No component splitting**: Single 349-line JSX file
- **No external state management**: Plain `useState` hooks only
- **No API calls**: Fully client-side (data via CONFIG object + file uploads)
- **No environment variables**: Hardcoded URLs and dates

## Guidelines for AI Agents

- Preserve the single-component structure unless explicitly refactoring
- Always include WebKit prefixes when touching transforms/animations
- Test Brave browser behavior before committing changes to sizing/layout
- Maintain inline style pattern for cross-browser fixes
- Keep animations under 3s duration to avoid jank on low-end devices
- Document any new state additions clearly
- Preserve the CONFIG pattern for dynamic content
