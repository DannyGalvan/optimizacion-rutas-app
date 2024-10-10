import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, ScrollView, PermissionsAndroid } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Modal from "react-native-modal";
import { marker } from "@/interfaces/marker";
import { Colors, global } from "@/constants/Colors";
import { distance } from "@/interfaces/distance";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { TouchableButton } from "@/components/buttons/TouchableButton";
import { Stack } from "expo-router";
import { LoadingComponent } from "@/components/LoadinigComponent";
import { GooGleMapsApiKey } from "@/constants";
import { useLocation } from "@/hooks/useLocation";

export default function LocationExampleScreen() {
  const mapViewRef = useRef<MapView>();
  const follow = useRef<boolean>(true);
  const [open, setOpen] = useState(false);
  const [destinationRoute, setDestinationRoute] = useState<marker | null>(null);
  const [distance, setDistance] = useState<distance | null>(null);
  const {errorMsg, isError, load, location, setIsError} = useLocation();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Mapa",
          headerShown: true,
        }}
      />
      <GooglePlacesAutocomplete
        styles={{
          container: {
            position: "absolute",
            zIndex: 1,
            top: 10,
            left: 20,
            width: "100%",
          },
        }}
        minLength={3}
        onFail={(err) => console.error(err)}
        placeholder="Search..."
        onPress={(data, GooglePlaceDetail) => {
          setDestinationRoute({
            latlong: {
              latitude: GooglePlaceDetail?.geometry.location.lat ?? 0,
              longitude: GooglePlaceDetail?.geometry.location.lng ?? 0,
            },
            title: GooglePlaceDetail?.name,
            description: GooglePlaceDetail?.formatted_address,
          });
          setOpen(true);          
        }}
        query={{
          key: GooGleMapsApiKey,
          language: "es",
        }}
        GoogleReverseGeocodingQuery={{
          language: "es",
          region: "gt",
        }}
        fetchDetails={true}
      />
      {load ? (
        <LoadingComponent title="cargando mapa porfavor espere..." />
      ) : (
        <MapView
          ref={(el) => (mapViewRef.current = el!)}
          style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude: location!.coords.latitude,
            longitude: location!.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton
          onTouchStart={() => (follow.current = false)}
        >
          <Marker
            coordinate={location?.coords!}
            title={"Esta es tu ubicacion"}
            description={"ahora te encuentras en este punto del mapa"}
          />
          {destinationRoute != null && (
            <>
              <Marker
                coordinate={destinationRoute.latlong}
                title={destinationRoute.title}
                description={destinationRoute.description}
              />
              <MapViewDirections
                apikey={GooGleMapsApiKey}
                origin={location?.coords}
                destination={destinationRoute.latlong}
                strokeColor={Colors.dark.background}
                strokeWidth={8}                
                onReady={(data) => {
                  const distance: distance = {
                    distancia: data.distance,
                    tiempo: data.duration,
                  };
                  setDistance(distance);
                }}
                resetOnChange={true}
                optimizeWaypoints={true}                
              />
            </>
          )}
        </MapView>
      )}
      <Modal isVisible={isError}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={[global.subTitle, styles.textError]}>
              Upss!! Hubo un error al cargar el mapa
            </Text>
            <ScrollView>{errorMsg && <Text>{errorMsg}</Text>}</ScrollView>
            <View style={styles.buttonErrorContainer}>
              <TouchableButton
                title="Ok"
                onPress={() => setIsError(!isError)}
                styles={styles.button}
                textStyle={global.textDark}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal isVisible={open}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={[global.subTitle]}>Busqueda Realizada con exito,</Text>
            <ScrollView>
              <Text>Tu destino es: {destinationRoute?.title}</Text>
              <Text>Estas a {distance?.distancia.toFixed(2)} km de distancia</Text>
              <Text>
                El tiempo estimado de llegada es de: {distance?.tiempo.toFixed(2)} min
              </Text>
            </ScrollView>
            <View style={styles.buttonErrorContainer}>
              <TouchableButton
                title="Ok!"
                onPress={() => setOpen(!open)}
                styles={styles.button}
                textStyle={global.textDark}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
  },
  map: {
    width: "100%",
    height: "90%",
    position: "absolute",
    zIndex: -1,
    top: 70,
    right: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    height: "35%",
    padding: 25,
    backgroundColor: Colors.light.background,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 25,
  },
  modalText: {
    textAlign: "center",
  },
  textError: {
    color: Colors.red,
  },
  buttonErrorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.red,
    marginHorizontal: 10,
    width: "30%",
    height: 25,
  },
});
