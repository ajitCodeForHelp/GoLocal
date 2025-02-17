// TenantProvider.js
import React, { createContext, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import tenantConfigs from "./TenantConfig";

const TenantContext = createContext();

export const useTenant = () => useContext(TenantContext);

export function TenantProvider({ children }) {
  const { tenant } = useParams();
  const config = tenantConfigs["tenant2"] || tenantConfigs["default"];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", config.theme);
  }, [config]);

  return (
    <TenantContext.Provider value={{ config, tenant }}>
      {children}
    </TenantContext.Provider>
  );
}
