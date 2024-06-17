(() => {
  // src/page/home.ts
  var HomePage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      console.log("Home.");
    }
  };

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

  // src/engine/routeDispatcher.ts
  var RouteDispatcher = class {
    constructor() {
    }
    matchRoute(path) {
      for (const route in this.routes) {
        if (route.endsWith("*")) {
          const baseRoute = route.slice(0, -1);
          if (path.startsWith(baseRoute)) {
            return this.routes[route];
          }
        } else if (route === path) {
          return this.routes[route];
        }
      }
      return null;
    }
    setupRoute() {
      new Site().setup();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.setup();
      } else {
      }
    }
    execRoute() {
      new Site().exec();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.exec();
      } else {
      }
    }
  };

  // src/page/enroll.ts
  var EnrollPage = class {
    constructor() {
    }
    setup() {
      loadCSS("http://127.0.0.1:3000/dist/css/enroll.css");
    }
    exec() {
      this.form = document.getElementById("enroll-form");
      this.form.addEventListener("submit", (event) => this.handleSubmit(event));
      this.emailField = document.getElementById("enroll-form-email");
      this.emailValidationMessage = document.getElementById("email-validation-message");
      this.emailField.addEventListener("blur", () => this.validateEmail());
      this.phoneField = document.getElementById("enroll-form-phone");
      this.phoneValidationMessage = document.getElementById("phone-validation-message");
      this.phoneField.addEventListener("blur", () => this.validatePhone());
    }
    async validateEmail() {
      const email = this.emailField.value;
      if (!email) {
        this.showEmailValidationMessage("Email field cannot be empty.", "error");
        return false;
      }
      const url = `https://www.mentodesign.academy/.api/validate/email?email=${encodeURIComponent(email)}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(response);
        if (data.status === "valid") {
          this.showEmailValidationMessage("Email is valid.", "success");
          return true;
        } else {
          this.showEmailValidationMessage(`Email validation failed: ${data.sub_status || data.status}`, "error");
          return false;
        }
      } catch (error) {
        this.showEmailValidationMessage("Error validating email.", "error");
        return false;
      }
    }
    async validatePhone() {
      const phone = this.phoneField.value;
      if (!phone) {
        this.showPhoneValidationMessage("Phone number field cannot be empty.", "error");
        return false;
      }
      const url = `https://www.mentodesign.academy/.api/validate/phone?phone=${encodeURIComponent(phone)}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.status === "success" && data?.data.status === "valid") {
          this.showPhoneValidationMessage("Phone number is valid.", "success");
          return true;
        } else {
          this.showPhoneValidationMessage(`Phone number validation failed: ${data.sub_status || data.status}`, "error");
          return false;
        }
      } catch (error) {
        this.showPhoneValidationMessage("Error validating phone number.", "error");
        return false;
      }
    }
    showEmailValidationMessage(message, type) {
      this.emailValidationMessage.textContent = message;
      this.emailValidationMessage.className = type;
      this.emailValidationMessage.style.display = "block";
    }
    showPhoneValidationMessage(message, type) {
      this.phoneValidationMessage.textContent = message;
      this.phoneValidationMessage.className = type;
      this.phoneValidationMessage.style.display = "block";
    }
    async handleSubmit(event) {
      event.preventDefault();
      const emailValid = await this.validateEmail();
      const phoneValid = await this.validatePhone();
      if (emailValid && phoneValid) {
        this.form.submit();
      } else {
        console.log("Form validation failed.");
      }
    }
  };

  // src/routes.ts
  var routeDispatcher = () => {
    var routeDispatcher2 = new RouteDispatcher();
    routeDispatcher2.routes = {
      "/": HomePage,
      "/test/enroll": EnrollPage
    };
    return routeDispatcher2;
  };
})();
//# sourceMappingURL=routes.js.map
