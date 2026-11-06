import api  from "./api";
export const getPredictionStatistics = async () => {
  const response = await api.get("/api/v1/predictions/statistics");

  return response.data;
};
export const createPrediction = async (patientData) => {
  const response = await api.post(
    "/api/v1/predictions/",
    patientData
  );

  return response.data;
};
export const getPredictionHistory=async()=>{
    const response=await api.get("/api/v1/predictions/history");
    return response.data;
};
