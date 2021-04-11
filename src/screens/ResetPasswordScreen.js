import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import axios from "axios";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    // const emailError = emailValidator(email.value)
    // if (emailError) {
    //   setEmail({ ...email, error: emailError })
    //   return
    // }
      axios.get("http://localhost:3001/users/" + email.value + "/forgot_password").then(
          navigation.navigate('RegisterScreen'))
          .catch((err) => {
              console.log(err)})

    // navigation.navigate('RegisterScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Enter User_ID</Header>
      <TextInput
        label="USER ID"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        autoCapitalize="none"
        autoCompleteType="text"
        textContentType="text"
        keyboardType="text"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Code
      </Button>
    </Background>
  )
}
