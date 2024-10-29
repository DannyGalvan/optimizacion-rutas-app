import { TouchableButton } from "@/components/buttons/TouchableButton";
import { GooGleMapsApiKey, initialRoute } from "@/constants";
import { Colors, global } from "@/constants/Colors";
import { createShippment, getShippment } from "@/services/shippmentService";
import { PilotRoutes } from "@/types/response/pilotRoutes";
import { convertToMarker } from "@/utils/convert";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const convertToDirections = (data: PilotRoutes[]) => {
  const mapDirections: JSX.Element[] = [];
  
  data.forEach((pilot) => {
    const { coordinates } = pilot;
    const directions = coordinates.map((c) => c.latlong);
    
    directions.forEach((direction, index) => {
      if (index + 1 < directions.length) {
        mapDirections.push(
          <MapViewDirections
            key={index}
            origin={index === 0 ? direction : directions[index - 1]}
            destination={directions[index + 1]}
            apikey={GooGleMapsApiKey}
            strokeWidth={3}
            strokeColor={pilot.color}
          />
        );
      }
    });
  });

  return mapDirections;
}

export default function RoutesScreen() {
  const mapViewRef = useRef<MapView>();
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [coordinateOfPilots, setCoordinateOfPilots] = useState<PilotRoutes[]>([]);
  const { data, isLoading, refetch } = useQuery(
    {
      queryKey: ["routes"],
      queryFn: getShippment,
    }
  );

  useEffect(() => {
    if (data) {
      setCoordinateOfPilots(convertToMarker(data));
    }
  }, [data]);

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black p-4">
      <Text className="text-2xl text-black dark:text-white font-bold mt-10">Rutas Optimas</Text>
      <TouchableButton
        styles={styles.buttonContainer}
        onPress={async () => {
          setLoad(true);
          setMessage("");
          const response = await createShippment();
          await refetch();
          setMessage(response);
          setLoad(false);
        }}
        title="Generar Rutas Para Pedidos"
        textStyle={global.textDark}
        icon={"wifi"}
        iconColor="white"
      />
      {message && <Text className="text-md text-red-500 font-bold py-4">{message || ""}</Text>}
      {isLoading || load &&
        (<View>
          <Text >Cargando rutas espere...</Text>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
        )}
      <MapView
        ref={(el) => (mapViewRef.current = el!)}
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: initialRoute.latitude,
          longitude: initialRoute.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
      >
        <Marker
          coordinate={initialRoute}
          title={"Esta es tu ubicacion"}
          description={"ahora te encuentras en este punto del mapa"}
        />
        {
          convertToDirections(coordinateOfPilots)
        }
      </MapView>
      <FlatList className="my-4" data={data} renderItem={(item) => {

        const { item: shipment } = item;

        return shipment.customer != null ? (<View className="bg-gray-600 p-2 rounded-lg">
          <Text className="text-lg text-black dark:text-white">Cliente: {shipment?.customer?.name}</Text>
          <Text className="text-lg text-black dark:text-white">Direccion: {shipment?.customer?.addressName}</Text>
          <Text className="text-lg text-black dark:text-white">Telefono: {shipment?.customer?.phone}</Text>
          <Text className="text-lg text-black dark:text-white">Total: Q.{shipment?.order?.total}</Text>
          <Text className="text-lg text-black dark:text-white">Vehiculo: {shipment?.vehicle?.plateNumber}</Text>
          <Text className="text-lg text-black dark:text-white">Conductor: {shipment?.vehicle?.driver?.name ?? "Sin Datos"}</Text>
          <Text className="text-lg text-black dark:text-white">Costo de transporte: Q.{shipment.deliveryTransportationCost}</Text>
          <Text className="text-lg text-black dark:text-white">Costo de recoleccion: Q.{shipment.totalWarehousePickupCost}</Text>
          <Text className="text-lg text-black dark:text-white">Almacenes: {shipment?.warehouses?.map((w) => w.addressName)?.join(", ")}</Text>
          <Text className="text-lg text-black dark:text-white">Gran Total: Q.{shipment.totalWarehousePickupCost + shipment.deliveryTransportationCost + (shipment?.order?.total ?? 0)}</Text>
        </View>) : <Text>{shipment.message}</Text>
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 15,
    width: "80%",
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: Colors.blue,
    height: 40,
  },
  map: {
    width: "90%",
    height: "50%",
  },
});