document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("save-button").addEventListener("click", saveTabs)
    document.getElementById("restore-button").addEventListener("click", restoreTabs)
});

function saveTabs() {
    chrome.tabs.query({}, function (tabs) {
        var tabData = tabs.map(function (tab) {
            return {
                url: tab.url,
                title: tab.title
            };
        });

        var dataString = JSON.stringify(tabData);
        var blob = new Blob([dataString], { type: "application/json" });
        var url = URL.createObjectURL(blob);

        var currentDate = new Date();
        var day = currentDate.getDate().toString().padStart(2, '0');
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var year = (currentDate.getFullYear()).toString().padStart(4, '0');
        var hours = currentDate.getHours().toString().padStart(2, '0');
        var minutes = currentDate.getMinutes().toString().padStart(2, '0');

        chrome.downloads.download({
            url: url,
            filename: `savedTabs-${day}.${month}.${year}-${hours}h${minutes}m.json`,
            saveAs: false
        });
    });
}

function restoreTabs() {
    browser.windows.create({
        type: "detached_panel",
        url: "restoretabs.html",
        width: 300,
        height: 100
      });
}