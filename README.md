# Assassin's Creed: Animus Launcher

A custom desktop launcher application inspired by the **Abstergo Animus UI** from the *Assassin's Creed* series. Built using **Node.js** and **Electron**, this desktop app features dynamic media previews, custom sequence layouts, synchronized audio effects, and direct game executable launch management.

---

## AI Collaboration & Methodology

This project heavily leveraged **Generative AI (Large Language Models)** as a primary coding partner and architectural assistant throughout the development lifecycle. Demonstrating modern AI literacy, the project showcases how AI-driven workflows can accelerate desktop application development.

### How AI Was Utilised:
- **Architecture & Scaffolding:** Prompted models to structure the initial Electron main (`main.js`) and renderer process relationships.
- **Problem Solving & Debugging:** Collaborated with AI to resolve execution edge cases, specifically enforcing `child_process.spawn` working directory (`cwd`) isolation to preserve game save paths.
- **UI/UX & Audio Synchrony:** Utilised AI assistance to generate dynamic CSS layouts and synchronise audio event triggers with UI state changes.
- **Version Control & DevOps:** Guided by AI to establish secure Git workflows, privacy-focused Git identity masking, `.gitignore` rules, and Electron Builder distribution scripts.

> **Developer Note:** While AI generated code snippets and boilerplate options, all overall system designs, code review, debugging, hands-on testing, and final feature integration were directed and verified manually.

---

## ✨ Key Features

- **Animus UI Experience:** Interactive sequence selection interface with custom video previews and responsive audio feedback.
- **Robust Executable Launching:** Native process spawning (`child_process.spawn`) configured with explicit Working Directory (`cwd`) enforcement to prevent save-file path resets and launcher execution errors.
- **Media Reset Utility:** Built-in "Reset Media to Default" utility to recover missing or corrupted media asset configurations automatically.
- **Configurable Settings:** Local persistent user options saved cleanly to local JSON configurations.
- you can drop your own custom audio/artwork files into the assets directory to complete the experience

---

## 🛠 Tech Stack

- **Runtime Environment:** Node.js
- **Desktop Framework:** Electron
- **Frontend / UI:** HTML5, CSS3, JavaScript (ES6+)
- **Process & Shell Handling:** Node.js `child_process` module
- **AI Tooling:** Generative AI Code Assistants & Prompting
- **Version Control:** Git & GitHub

---

## ⚙️ Technical Highlights

### Executable Context Management (`cwd`)
When launching external binaries on Windows through Electron, relative working paths can occasionally default to the launcher's root directory, causing games to misplace local user data or save files. This project resolves that issue by extracting the target binary's parent directory and setting explicit `cwd` execution options during process initialization:

## ⚙️ Javascript
const { spawn } = require('child_process');
const path = require('path');

const gameDirectory = path.dirname(gamePath);
spawn(gamePath, [], { cwd: gameDirectory, detached: true });

## Getting Started
## Prerequisites
Node.js (v16 or higher recommended)

## ⚙️ npm
Local Installation
Clone the repository:

## ⚙️ Bash
git clone [https://github.com/Tempnoir/ac-animus-launcher.git](https://github.com/YOUR-USERNAME/ac-animus-launcher.git)

cd ac-animus-launcher


Install dependencies:

## ⚙️ Bash

npm install


Run the launcher:

## ⚙️ Bash

npm start

📦 Building the Executable
To package the application into a standalone Windows executable (.exe):

## ⚙️ Bash
npm run dist
The output executable will be generated inside the /dist directory.

📄 License
This project is created strictly for educational and portfolio demonstration purposes. All Assassin's Creed assets, logos, and trademarks belong to Ubisoft.


