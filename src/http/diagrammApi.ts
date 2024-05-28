import { Diagramm } from "../types/types";
import { $host } from "./index";

export const fetchDiagramms = async () => {
  const { data } = await $host.get("api/diagramm");
  return data;
};

export const fetchDiagramm = async (id: number) => {
  const { data } = await $host.get("api/diagramm/" + id);
  return data;
};

export const createDiagramm = async (type: Diagramm) => {
  const { data } = await $host.post("api/diagramm", type);
  return data;
};
