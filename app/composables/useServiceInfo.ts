import services from "~/assets/data/serviceInfo.json";

export const useServiceInfo = () => {
  const serviceInfo = services;

  function getElectricityInfo() {
    return serviceInfo.electricity;
  }

  function getWaterInfo() {
    return serviceInfo.water;
  }

  return {
    serviceInfo,
    getElectricityInfo,
    getWaterInfo,
  };
};
