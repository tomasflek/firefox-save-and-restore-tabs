document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("file-input").addEventListener("input", loadTabs);
  });
  
  function loadTabs() {
    var input = document.getElementById("file-input");
    var file = input.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = (event) => {
        var tabData = JSON.parse(event.target.result);
        tabData.forEach(element => {
          browser.tabs.create({
            url: element.url
          });
        });
        window.close();

      };
      reader.readAsText(file);
    }
  }