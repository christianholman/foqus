async function blockPage() {
  fetch(chrome.runtime.getURL("blocked/blocked.html"))
    .then((res) => res.text())
    .then((text) => {
      document.open();
      document.write(text);
      document.head.innerHTML += `<link rel="stylesheet" href="${chrome.runtime.getURL(
        "blocked/blocked.css"
      )}">`;
      document.close();
    });
}

chrome.storage.local.get(["blocked", "enabled"], ({ blocked, enabled }) => {
  const res = window.location.hostname.match(/^(www\.|www\.)(.*)/);
  const hostname = res ? res[res.length - 1] : window.location.hostname;
  if (enabled && blocked[hostname]) {
    window.stop();
    blockPage();
  }
});
