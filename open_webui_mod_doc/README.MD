# Open WebUI Modifications for Ajuda Digital

## Overview

This document outlines all the modifications made to the Open WebUI platform to customize it for the Ajuda Digital project.

## Modified Files

### Static Assets & Branding

We replaced all visual branding elements to match Ajuda Digital's identity:

#### Frontend Static Files (`open-webui/static/static/`)

- `apple-touch-icon.png` - iOS home screen icon
- `favicon-96x96.png` - High-resolution favicon
- `favicon-dark.png` - Dark mode favicon
- `favicon.ico` - Standard favicon
- `favicon.png` - PNG favicon
- `favicon.svg` - SVG favicon
- `logo.png` - Main application logo
- `splash-dark.png` - Dark mode splash screen
- `splash.png` - Light mode splash screen
- `web-app-manifest-192x192.png` - PWA manifest icon (192x192)
- `web-app-manifest-512x512.png` - PWA manifest icon (512x512)
- `site.webmanifest` - Web app manifest configuration

#### Backend Static Files (`open-webui/backend/open_webui/static/`)

- `apple-touch-icon.png`
- `favicon-96x96.png`
- `favicon-dark.png`
- `favicon.ico`
- `favicon.png`
- `favicon.svg`
- `logo.png`
- `splash-dark.png`
- `splash.png`
- `web-app-manifest-192x192.png`
- `web-app-manifest-512x512.png`
- `site.webmanifest`

#### Additional Static Files

- `open-webui/static/favicon.png` - Additional favicon location

### Configuration & Core Files

#### Backend Configuration

- `open-webui/backend/open_webui/env.py` - Environment configuration modifications
- `open-webui/backend/open_webui/main.py` - Main application entry point modifications

#### Frontend Configuration & UI

- `open-webui/src/lib/constants.ts` - Application constants and configuration
- `open-webui/src/app.html` - Main HTML template
- `open-webui/src/routes/auth/+page.svelte` - Authentication page customization
- `open-webui/src/lib/components/chat/Settings/About.svelte` - About section customization

## Purpose of Modifications

These modifications were made to:

1. **Rebrand the interface** - Replace Open WebUI branding with Ajuda Digital branding
2. **Customize the user experience** - Tailor the interface for Timor-Leste government services
3. **Configure environment settings** - Set up the application for the specific deployment needs
4. **Localize content** - Adapt the interface for the target audience

## Source Repository

For detailed code changes and implementation details, please visit our modified Open WebUI repository:
**https://github.com/ajitonelsonn/open_webui/tree/main**

---

_This documentation reflects the current state of modifications made for the Ajuda Digital project._

---

![Tais Traditional Pattern](../Picture/tais.png)

**Made in Timor-Leste 🇹🇱**
