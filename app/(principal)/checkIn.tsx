import { TouchableButton } from "@/components/buttons/TouchableButton";
import { InputForm } from "@/components/inputs/InputForm";
import { InputSelect } from "@/components/inputs/InputSelect";
import { Colors, global } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useLocation } from "@/hooks/useLocation";
import { getAddresses } from "@/services/customerService";
import { createOrder } from "@/services/orderService";
import { useCountStore } from "@/store/useCountStore";
import { useOrderStore } from "@/store/useOrderStore";
import { appStyles } from "@/styles/appStyles";
import { OrderDetailRequest } from "@/types/request/orderRequest";
import { useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, useColorScheme, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export interface OrderForm {
    latitude: number;
    longitude: number;
    name: string;
    customerId: number;
    orderDetails: OrderDetailRequest[];
    total: number;
}

const initialForm = {
    latitude: 0,
    longitude: 0,
    name: "",
    customerId: 0,
    orderDetails: [],
    total: 0,
};

const validateForm = (form: OrderForm) => {
    let errors: any = {};

    if (!form.name) {
        errors.name = "La direccion es requerida";
    }

    return errors;
};

export default function CheckInScreen() {
    const mapViewRef = useRef<MapView>();
    const colorSheme = useColorScheme();
    const { idUser, username, email } = useAuth();
    const { products, totalOrder, clearProducts } = useOrderStore();
    const { load, location } = useLocation();
    const {count} = useCountStore();
    const [visible, setVisible] = useState(false);

    const handleCreateOrder = async (form: OrderForm) => {
        form.latitude = location!.coords.latitude;
        form.longitude = location!.coords.longitude;
        form.customerId = idUser;
        form.total = totalOrder();
        form.orderDetails = products.map((product) => ({
            productId: product.product.id,
            lineTotal: product.product.price * product.quantity,
            quantity: product.quantity,
        }));

        const response = await createOrder(form);

        if (response.success || response.successful) {
            Alert.alert("Pedido creado", response.message);
            clearProducts();
        }

        return response;
    };

    const { form, errors, handleChange, handleSubmit, loading, response } = useForm<OrderForm>(
        initialForm,
        validateForm,
        handleCreateOrder
    );

    return (
        <View style={styles.container} className="flex-1 bg-white dark:bg-black">
            <Text
                style={appStyles.textCenter}
                className={"text-black dark:text-white text-2xl font-bold mb-4"}>
                Datos de Compra
            </Text>
            <Text className="text-black dark:text-white font-bold text-lg">Comprador: {username}</Text>
            <Text className="text-black dark:text-white font-bold text-lg mb-2">Correo: {email}</Text>
            <InputSelect
                entity="Direcciones de envio"
                textInput={count !== 0 ? "Seleccione" : "No hay registradas"}
                queryKey="deliveryAddress"
                onSelect={(item) => handleChange(item.name, "name")}
                queryFn={() => getAddresses(idUser)}
                selector={(data) => data.name}
            />
            {errors?.name && <Text style={global.errorColor}>{errors.name}</Text>}
            {
                count != 0 ? 
                (<TouchableButton 
                    styles={[styles.buttonContainer, { backgroundColor: Colors.green }] }
                    onPress={() => setVisible(!visible)}
                    title={visible ? "Ocultar" : "Agregar nueva direccion"}
                    textStyle={global.textDark}
                    icon={visible ? "chevron-up" : "chevron-down"}
                    iconColor="white"
                />) 
                : (<InputForm
                    containerStyles={styles.input}
                    name="name"
                    errorMessage={errors?.name}
                    label="Direccion de envio"
                    value={form.name}
                    onChangeText={(text: string) => handleChange(text, "name")}
                    placeholder="Ingrese una direccion"
                    secureTextEntry={false}
                />)
            }
            {
                visible && (<InputForm
                    containerStyles={styles.input}
                    name="name"
                    errorMessage={errors?.name}
                    label="Nueva Direccion de envio"
                    value={form.name}
                    onChangeText={(text: string) => handleChange(text, "name")}
                    placeholder="Ingrese nueva direccion de envio"
                    secureTextEntry={false}
                />)
            }
            {load ? (
              <View>
                <Text >Cargando mapa espere...</Text>
                <ActivityIndicator size="large" color={Colors.blue} />
              </View>
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
                >
                    <Marker
                        coordinate={location?.coords!}
                        title={"Esta es tu ubicacion"}
                        description={"ahora te encuentras en este punto del mapa"}
                    />
                </MapView>
            )}
            <Text className="text-black dark:text-white font-bold text-lg">Total a Pagar Q.{totalOrder().toFixed(2)}</Text>
            <TouchableButton
                styles={[styles.buttonContainer, { backgroundColor: products.length === 0 ? Colors.gray : Colors.blue }]}
                onPress={handleSubmit}
                title="Enviar Pedido"                
                textStyle={global.textDark}
                icon="send"
                iconColor="white"
                disabled={loading || products.length === 0}
            />
            {response && <Text style={response.successful ? global.successColor : global.errorColor}>{response.message}</Text>}
            {loading && <ActivityIndicator size="large" color={colorSheme == "dark" ? Colors.white : Colors.yellow} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    input: {
        width: "80%",
        marginVertical: 10,
    },
    map: {
        width: "90%",
        height: "50%",
    },
    buttonContainer: {
        marginVertical: 15,
        width: "80%",
        alignSelf: "center",
        borderRadius: 50,
        height: 40,
    },
});
