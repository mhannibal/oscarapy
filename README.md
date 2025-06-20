# Oscaro Scrapper

Oscaro Scrapper is a Chrome extension designed to automate the extraction ("scraping") of vehicle-related data from [oscaro.com](https://www.oscaro.com/). The extension provides a popup interface to trigger scraping by "brand", "familly", or "Model", and interacts with the page using a content script.

## Features

- **Popup UI**: Simple popup with three options: Marque, Famille, Modele.
- **Automated Data Extraction**: Scrapes data from dropdowns on oscaro.com using DOM manipulation and event simulation.
- **Chrome Extension**: Uses content scripts and messaging to communicate between the popup and the active tab.

## Project Structure

- [`manifest.json`](c:/Users/mbessoufi/Desktop/githannibal/oscarapy/manifest.json): Chrome extension manifest (v2), defines permissions, content scripts, and popup.
- [`popup.html`](c:/Users/mbessoufi/Desktop/githannibal/oscarapy/popup.html): The popup UI with three clickable options.
- [`popup.js`](c:/Users/mbessoufi/Desktop/githannibal/oscarapy/popup.js): Handles popup button clicks and sends messages to the content script.
- [`content-script.js`](c:/Users/mbessoufi/Desktop/githannibal/oscarapy/content-script.js): Injected into oscaro.com, performs the actual scraping logic and responds to messages.
- `oscar.png`: Icon for the extension.

## How It Works

1. **User Interaction**: User clicks the extension icon, opening the popup.
2. **Trigger Scraping**: User selects "Marque", "Famille", or "Modele". This sends a message to the content script in the active tab.
3. **Scraping Logic**: The content script receives the message and runs the appropriate extraction function, traversing dropdowns and collecting data.
4. **Result Handling**: The extracted data is stored in memory and can be displayed or saved.

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the `oscarapy` directory.
5. Navigate to [oscaro.com](https://www.oscaro.com/) and click the extension icon to use.

## Usage

- Click the extension icon while on oscaro.com.
- Choose one of the options: Marque, Famille, or Modele.
- The extension will scrape the relevant data and alert you when complete.