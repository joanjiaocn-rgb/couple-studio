# Couple Studio project control

## GA4 installation — 2026-10-25

- Request: install measurement ID `G-8ML5JB8Y6K` from the supplied Google tag screenshot.
- Scope: page views, studio interactions, privacy disclosure, verification, GitHub sync, and Cloudflare Pages release.
- Implementation: `analytics.js`, `index.html`, and `app.js`; event reference in `ANALYTICS.md`.
- Status: implementation and browser verification passed; Cloudflare deployment awaits renewed authentication.
- Verification: both production hostnames initialize one Google tag; localhost and Pages previews send no events; all ten studio event triggers passed in Chrome without runtime errors. The real Google tag produced one initial `page_view` and a `format_select` collect request for the supplied ID, with private query parameters excluded. Automated collect requests were intercepted before delivery.
- Deployment blocker: Wrangler reports an expired OAuth session that cannot refresh. The automatic approval service rejected the credential refresh check because its model endpoint returned 404. Existing production has not been changed by this release.
- Review reference: `ANALYTICS.md` lists event meanings and parameters. The application script URL is versioned so existing visitors receive the new event handlers immediately after deployment.
- Release criteria: one initial page view, correct destination ID, no private photo/prompt data in events, no development/preview traffic, event delivery independent of studio behavior, clean committed source deployed to Pages.
