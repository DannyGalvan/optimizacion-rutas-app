import { initialRoute } from "@/constants";
import { ErrorObject } from "@/hooks/useForm";
import { PilotRoutes } from "@/types/response/pilotRoutes";
import { Shipment } from "@/types/response/shipmentsResponse";
import { ZodError } from "zod";

export const handleOneLevelZodError = ({ issues }: ZodError<unknown>) => {
    const formData: ErrorObject = {};
  
    issues.forEach(({ path, message }) => {
      formData[path.join("-")] = message;
    });
  
    return formData;
  };

// funcion para generar colores dinamicamente

export const generateColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

export const convertToMarker = (data: Shipment[]) => {


  if (data[0].customer == null ) {
    return [];
  }

  const pilotRoutes: PilotRoutes[] = data.map((shipment) => {
    return {
      name: shipment?.vehicle?.driver?.name ?? "Sin Datos",
      color: generateColor(),
      coordinates: [
        {
          latlong: { ...initialRoute },
        },
        ...shipment.warehouses?.map((w) => {
          return {
            latlong: {
              latitude: parseFloat(w.latitude),
              longitude: parseFloat(w.longitude),
            },
          };
        }),
        {
          latlong: {
            latitude: shipment.customer != null ? parseFloat(shipment.customer.latitude) : 0,
            longitude: shipment.customer != null ? parseFloat(shipment.customer.longitude) : 0,
          },
        },
      ],
    };
  });
  
  return pilotRoutes;
};