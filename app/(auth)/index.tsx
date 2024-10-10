import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  useColorScheme,
} from "react-native";
import { ErrorObject, useForm } from "../../hooks/useForm";
import { TouchableButton } from "@/components/buttons/TouchableButton";
import { InputForm } from "@/components/inputs/InputForm";
import { Logo } from "@/components/icons/Logo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors, global } from "@/constants/Colors";
import { authShema } from "@/validations/authValidations";
import { handleOneLevelZodError } from "@/utils/convert";
import { useAuth } from "@/hooks/useAuth";
import { LoadingComponent } from "@/components/LoadinigComponent";
import LoginRedirectScreen from "@/middlewares/LoginRedirectScreen";
import { apiResponse } from "@/types/response/apiResponse";
import { loginResponse } from "@/types/response/loginResponse";
import { login } from "@/services/AuthService";
import { loginRequest } from "@/types/request/loginRequest";
import { useRouter } from "expo-router";

const initialForm: loginRequest = {
  email: "",
  password: "",
};

const validateForm = (form: loginRequest): ErrorObject => {
  let errors: ErrorObject = {};

  const parce = authShema.safeParse(form);

  if (!parce.success) errors = handleOneLevelZodError(parce.error);

  return errors;
};

interface Props extends NativeStackScreenProps<any, any> {}

const LoginScreen = ({ }: Props) => {
  const { signIn, isLoading} = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const colorSheme = useColorScheme();
  const {navigate} = useRouter();

  const authLogin = async (form: loginRequest): Promise<any> => {
    setMessage(null);

    const respuesta: apiResponse<loginResponse> = await login(form);
  
    if (!respuesta.success) {
      setMessage(respuesta.message);
      return respuesta;
    }

    if (!("token" in respuesta.data)) {
      return respuesta;
    }

    signIn({
      token: respuesta.data.token,
      username: respuesta.data.alias,
      idUser: respuesta.data.id,
    });

    return respuesta;
  };

  const { form, errors, handleChange, handleSubmit, loading } = useForm<loginRequest>(
    initialForm,
    validateForm,
    authLogin
  );

  if (isLoading) {
    return <LoadingComponent title="Cargando porfavor espere un momento ..." />;
  }

  return (
    <LoginRedirectScreen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerLogo}>
          <Logo isVisible={false} style={styles.logo} />
        </View>

        <InputForm
          containerStyles={styles.input}
          name="email"
          errorMessage={errors?.email}
          label="Correo Electronico"
          value={form.email}
          onChangeText={(text: string) => handleChange(text, "email")}
          placeholder="Ingrese un correo"
          secureTextEntry={false}
        />

        <InputForm
          containerStyles={styles.input}
          name="password"
          errorMessage={errors?.password}
          label="Contraseña"
          value={form.password}
          onChangeText={(text: string) => handleChange(text, "password")}
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
        />

        <TouchableButton
          styles={styles.buttonContainer}
          onPress={handleSubmit}
          title="Iniciar Sesion"
          textStyle={global.textDark}
        />

        <TouchableButton
          styles={styles.buttonContainer}
          onPress={() => navigate("register")}
          title="Registrarse"
          textStyle={global.textDark}
        />

        {loading && <ActivityIndicator size="large" color={colorSheme == "dark" ? Colors.white : Colors.yellow} />}
        {message && <Text style={global.errorColor}>{message}</Text>}
      </ScrollView>
    </LoginRedirectScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginVertical: 10,
  },
  containerLogo: {
    marginTop: 100,
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    marginVertical: 15,
    width: "80%",
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: Colors.yellow,
    height: 40,
  },
});

export default LoginScreen;
