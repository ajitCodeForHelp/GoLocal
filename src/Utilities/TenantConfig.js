// tenantConfigs.js
const tenantConfigs = {
    tenant1: {
      name: "Tenant One",
      theme: "dark",
      primaryColor: "#222",
      backgroundColor: "#000",
      logo: "/assets/tenant1-logo.png", 
      apiBaseUrl: "https://api.tenant1.com",
    },
    tenant2: {
      name: "Tenant Two",
      theme: "light",
      primaryColor: "#007bff",
      backgroundColor: "#f8f9fa",
    //   logo: "/assets/tenant2-logo.png",
      apiBaseUrl: "https://api.tenant2.com",
    },
    default: {
      name: "Default Tenant",
      theme: "light",
      primaryColor: "#007bff",
      backgroundColor: "#ffffff",
    //   logo: "/assets/default-logo.png",
      apiBaseUrl: "https://api.default.com",
    },
  };
  
  export default tenantConfigs;
  