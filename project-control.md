# Couple Studio project control

## GA4 installation — 2026-10-25

- Request: install measurement ID `G-8ML5JB8Y6K` from the supplied Google tag screenshot.
- Scope: page views, studio interactions, privacy disclosure, verification, GitHub sync, and Cloudflare Pages release.
- Implementation: `analytics.js`, `index.html`, and `app.js`; event reference in `ANALYTICS.md`.
- Status: GA4 is deployed and verified on the production domain. GitHub source synchronization remains blocked by credential access and the automatic approval service.
- Verification: both production hostnames initialize one Google tag; localhost and Pages previews send no events; all ten studio event triggers passed in Chrome without runtime errors. The real Google tag produced one initial `page_view` and a `format_select` collect request for the supplied ID, with private query parameters excluded. Automated collect requests were intercepted before delivery.
- Cloudflare authentication was renewed by the user. Production deployment `92dfb164.couple-studio.pages.dev` contains the GA4 application source from commit `86974e1`.
- Production verification: `https://couplestudio.online/` and `https://www.couplestudio.online/` return 200 and load the updated analytics and versioned application script. Headless Chrome on the production domain received Google collect responses of 204 for exactly one initial `page_view` and a `format_select` event, both for `G-8ML5JB8Y6K`, with no page runtime errors.
- GitHub blocker: the sandboxed Git process cannot obtain the stored GitHub credential. The requested credential-enabled push was not executed because automatic approval could not complete: its model endpoint returned 404. Remote `main` is still at `e6bbea7`; no force push was attempted.
- Review reference: `ANALYTICS.md` lists event meanings and parameters. The application script URL is versioned so existing visitors receive the new event handlers immediately after deployment.
- Release criteria: one initial page view, correct destination ID, no private photo/prompt data in events, no development/preview traffic, event delivery independent of studio behavior, clean committed source deployed to Pages.
