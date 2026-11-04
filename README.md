# 🛡️ AEGIS Portal | Access Control SPA

An ultra-modern, cyberpunk-themed Single Page Application (SPA) designed with Vanilla JavaScript, Tailwind CSS, and GSAP. The application features a reactive multi-state entry form, an encrypted passcode verification gate, maximum attempt enforcement, and a responsive glassmorphism UI.

## ✨ Features & Key Highlights

* **Cyberpunk / Futuristic Aesthetic**: Styled with a deep dark indigo/black theme (`#0a0a16`), glowing neon borders, ambient grid textures, and dynamic blur overlays.

* **Reactive State 1 (NDA Form)**: Dynamic validation engine ensuring Name, Age ($18+$), valid Email format, and NDA agreement are verified before unlocking submission.

* **Enhanced State 2 (Quantum Passcode Gate)**:
  * 6-digit passcode input matrix with automatic focus shifting and backspace navigation.
  * Secured client-side passcode authentication pipeline.
  * **Max 3 Attempt Lockout**: Enforces security by locking out inputs after 3 consecutive failed attempts.
  * Interactive "Check Passcode" action button alongside automatic execution upon entering the 6th digit.

* **Smooth Animations**: Powered by GSAP and ScrollTrigger for entrance stagger, dynamic radar pulses, error shake feedback, and full-page exit transitions.

* **Zero-Dependency Framework**: Built completely with pure Vanilla JavaScript and HTML5—no heavy JS framework required.

## 🛠️ Tech Stack

* **HTML5 & Vanilla JavaScript (ES6+)**
* **Tailwind CSS** (via CDN with custom theme extensions)
* **GSAP (GreenSock Animation Platform)** & **ScrollTrigger** (via CDN)

## 🚀 Repository & Setup

Visit the official repository:  
🔗 [https://github.com/rayaantasnim/OTP-AEGIS](https://github.com/rayaantasnim/OTP-AEGIS)

### Local Setup
Because the application is built as a single-file SPA (`index.html`), execution is instantaneous:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rayaantasnim/OTP-AEGIS.git
   cd OTP-AEGIS
   ```

2. **Open in Browser**:
   Double-click `index.html` or launch it using any local web server (e.g., VS Code Live Server).

## 🔒 Security Architecture

* **Input Masking & Verification**: User inputs are securely processed and verified against internal validation logic without exposing raw passcode data.
* **Attempt Throttling**: Strict limit of 3 failed attempts to mitigate unauthorized automated brute-force attempts.
* **Authorized Redirection**: Upon successful authentication, the portal triggers an animated transition to the target destination.

## 📜 Author & License

Authorized by **Rayaan Tasnim** with precision  
Powered by **IDAI Universe** • All rights reserved
