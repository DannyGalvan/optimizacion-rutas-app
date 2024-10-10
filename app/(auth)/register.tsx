import { TouchableButton } from '@/components/buttons/TouchableButton'
import { Logo } from '@/components/icons/Logo'
import { InputForm } from '@/components/inputs/InputForm'
import { Colors, global } from '@/constants/Colors'
import { ErrorObject, useForm } from '@/hooks/useForm'
import { registerCustomer } from '@/services/customerService'
import { customerForm, customerRequest } from '@/types/request/customerRequest'
import { apiResponse } from '@/types/response/apiResponse'
import { handleOneLevelZodError } from '@/utils/convert'
import { customerShema } from '@/validations/customerValidations'
import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'

const initialForm: customerForm = {
    firstName: "",
    lastName: "",
    phone: "",
    nit: "",
    cui: "",
    email: "",
    password: "",
    alias: "",
    deleted: false,
};

const validateForm = (form: customerForm): ErrorObject => {
    let errors: ErrorObject = {};

    const parce = customerShema.safeParse(form);

    if (!parce.success) errors = handleOneLevelZodError(parce.error);

    return errors;
}

const register = () => {
  const colorSheme = useColorScheme();

  const sendForm = async (form: customerForm): Promise<apiResponse<string>> => {
    const customer : customerRequest = {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        nit: form.nit,
        cui: form.cui,
        user: {
            email: form.email,
            password: form.password,
            alias: form.alias,
            deleted: form.deleted,
        },
    };

    const respuesta = await registerCustomer(customer);

    return respuesta;
  };

  const { form, errors, handleChange, handleSubmit, loading, response } = useForm<customerForm>(
    initialForm,
    validateForm,
    sendForm    
  );

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black" contentContainerStyle={styles.container}>
       <View style={styles.containerLogo}>
          <Logo isVisible={false} style={styles.logo} />
        </View>

        <InputForm
          containerStyles={styles.input}
          name="firstName"
          errorMessage={errors?.firstName}
          label="Nombre"
          value={form.firstName}
          onChangeText={(text: string) => handleChange(text, "firstName")}
          placeholder="Ingrese su nombre"
          secureTextEntry={false}
        />

        <InputForm
          containerStyles={styles.input}
          name="lastName"
          errorMessage={errors?.lastName}
          label="Apellido"
          value={form.lastName}
          onChangeText={(text: string) => handleChange(text, "lastName")}
          placeholder="Ingrese su apellido"
          secureTextEntry={false}
        />

        <InputForm
          containerStyles={styles.input}
          name="firstName"
          errorMessage={errors?.phone}
          label="Telefono"
          value={form.phone}
          onChangeText={(text: string) => handleChange(text, "phone")}
          placeholder="Ingrese su telefono"
          secureTextEntry={false}
        />

        <InputForm
          containerStyles={styles.input}
          name="nit"
          errorMessage={errors?.nit}
          label="Nit"
          value={form.nit}
          onChangeText={(text: string) => handleChange(text, "nit")}
          placeholder="Ingrese su nit"
          secureTextEntry={false}
        />

        <InputForm
          containerStyles={styles.input}
          name="cui"
          errorMessage={errors?.cui}
          label="Cui"
          value={form.cui}
          onChangeText={(text: string) => handleChange(text, "cui")}
          placeholder="Ingrese su cui"
          secureTextEntry={false}
        />

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
          name="alias"
          errorMessage={errors?.alias}
          label="Alias"
          value={form.alias}
          onChangeText={(text: string) => handleChange(text, "alias")}
          placeholder="Ingrese su alias"
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
          title="Registrarse"
          textStyle={global.textDark}
        />
        {loading && <ActivityIndicator size="large" color={colorSheme == "dark" ? Colors.white : Colors.yellow} />}
        {response && <Text style={global.successColor}>{response.message}</Text>}
    </ScrollView>
  )
}

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

export default register
