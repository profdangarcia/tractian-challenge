export interface IItem {
  id: string;
  name: string;
  parentId: string | null;
  sensorId: string;
  sensorType: "energy" | "vibration" | null;
  status: "operating" | "alert" | null;
  gatewayId: string;
  locationId: string | null;
}
