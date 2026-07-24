// render.js - kicks off shared component rendering once the DOM is ready

function renderContent() {
  if (typeof renderHeader === "function") renderHeader();
  if (typeof renderFooter === "function") renderFooter();
}

document.addEventListener("DOMContentLoaded", renderContent);
