const enabledCheckbox = document.getElementById("enabled-checkbox");
const addWebsiteForm = document.getElementById("add-website-form");
const websiteInput = document.getElementById("website-input");

syncState();

function toggleSite(hostname) {
  chrome.storage.local.get(["blocked"], ({ blocked }) =>
    chrome.storage.local
      .set({
        blocked: {
          ...blocked,
          [hostname]: blocked[hostname] ? undefined : hostname,
        },
      })
      .then(syncState)
  );
}

function updateBlockedSites() {
  chrome.storage.local.get(["blocked"], ({ blocked }) => {
    if (blocked) {
      document.getElementById("blocked-sites").innerHTML = ``;
      Object.keys(blocked).forEach((hostname) => {
        const websiteNode = `<div class="blocked-site" value="${hostname}">${hostname}</div>`;
        document.getElementById("blocked-sites").innerHTML += websiteNode;
      });
    }
  });
}

function updateEnabledcheckbox() {
  chrome.storage.local.get(["enabled"], ({ enabled }) => {
    console.log("enabled", enabled);
    enabledCheckbox.checked = enabled;
  });
}

function syncState() {
  updateBlockedSites();
  updateEnabledcheckbox();
}

addWebsiteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (websiteInput.value) {
    let url =
      websiteInput.value.startsWith("http://") ||
      websiteInput.value.startsWith("https://")
        ? websiteInput.value
        : "https://" + websiteInput.value;

    const { hostname } = new URL(url);

    if (hostname) {
      toggleSite(hostname);
    }
  }
});

enabledCheckbox.addEventListener("change", (event) => {
  console.log("event", event);
  chrome.storage.local.set({
    enabled: enabledCheckbox.checked,
  });
  syncState();
});

document.addEventListener("click", (e) => {
  const target = e.target.closest(".blocked-site");
  if (target) {
    toggleSite(target.getAttribute("value"));
  }
});
