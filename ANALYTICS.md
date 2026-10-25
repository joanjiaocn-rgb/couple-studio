# Google Analytics 4

- Measurement ID: `G-8ML5JB8Y6K`
- Tracking runs on `couplestudio.online` and `www.couplestudio.online` only.
- `analytics.js` loads Google's asynchronous tag once, with one automatic initial `page_view`. Hash navigation does not initialize the tag again. Additional enhanced measurement behavior is controlled in GA4.
- Localhost and `*.pages.dev` previews do not send analytics.
- Ad personalization and Google signals are disabled in the tag configuration.
- Reported page/referrer URLs omit query strings and fragments.

| Event | Trigger | Parameters |
| --- | --- | --- |
| `page_view` | Production page load (Google tag) | Sanitized page/referrer URLs |
| `format_select` | Change Photo/Video | `output_format` |
| `photo_select` | Select a local photo | `photo_slot`, `selected_photo_count` |
| `style_select` | Change style | `style`, `output_format` |
| `frame_select` | Change frame | `aspect_ratio` |
| `lighting_select` | Change lighting | `lighting` |
| `generate_start` | Begin the demo preview | Format, style, ratio, lighting, `has_prompt`, photo count, `generation_type=demo` |
| `generate_complete` | Display the demo preview | Format, style, ratio, lighting, elapsed `duration_ms`, `generation_type=demo` |
| `download_click` | Click Download | `result_type` (`sample`/`demo_preview`), `output_format` |
| `story_select` | Click a sample story | `story_name` (fixed preset label) |
| `project_reset` | Reset studio | `output_format` |

Photos, image URLs, filenames, and prompt contents are never added to custom event parameters. `download_click` measures intent to download, not a confirmed saved file. Generation currently uses demo images and must not be counted as a paid/real AI generation conversion.

To inspect installation, open the production URL from GA4's **Test installation** flow or Tag Assistant. Use GA4 Realtime/DebugView to check `page_view` and studio events; register the event parameters needed for reporting as event-scoped custom dimensions. Ad blockers and network restrictions can prevent delivery.
