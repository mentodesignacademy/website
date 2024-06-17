(() => {
  // src/engine/core.ts
  function loadCSS(url) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }

  // src/site.ts
  var Site = class {
    constructor() {
    }
    setup() {
      const currentScript = document.currentScript;
      if (!currentScript) {
        console.log("Could not determine the current script.");
        return;
      }
      const fullUrl = new URL(currentScript.src);
      const pathWithoutFile = fullUrl.origin + fullUrl.pathname.substring(0, fullUrl.pathname.lastIndexOf("/") + 1);
      console.log("installing site CSS");
      loadCSS(pathWithoutFile + "css/index.css");
    }
    exec() {
      console.log("Site.");
    }
  };
})();
//# sourceMappingURL=site.js.map
