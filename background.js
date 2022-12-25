// chrome.runtime.onInstalled.addListener(function () {
//   chrome.storage.local.get(
//     ["blocked", "enabled"],
//     function ({ blocked, enabled }) {
//       if (typeof blocked !== "object") {
//         chrome.storage.local.set({ blocked: {} });
//       }
//
//       if (typeof enabled !== "boolean") {
//         chrome.storage.local.set({ enabled: false });
//       }
//     }
//   );
// });
//
// chrome.webNavigation.onCommitted.addListener((details) => {
//   const hostname = new URL(details.url).hostname;
//
//   console.log(hostname);
//
//   chrome.storage.local.get(
//     ["blocked", "enabled"],
//     function ({ blocked, enabled }) {
//       if (enabled && blocked[hostname]) {
//         console.log("yeeet");
//       }
//     }
//   );
// });
