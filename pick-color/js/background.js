const color = "";
chrome.runtime.onInstalled.addListener(()=>{
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id, allFrames: true  },
      world: "MAIN",
      files: ["popup/popup.js"],
    });
  });
  chrome.storage.sync.set({ color });
});