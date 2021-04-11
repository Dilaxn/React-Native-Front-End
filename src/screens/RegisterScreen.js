/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Text} from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import {theme} from '../core/theme'
import {emailValidator} from '../helpers/emailValidator'
import {passwordValidator} from '../helpers/passwordValidator'
import {nameValidator} from '../helpers/nameValidator'
import axios from "axios";
import {Alert} from "react-native-web";
import {getLogColor} from "react-native/Libraries/LogBox/UI/LogBoxStyle";

export default function RegisterScreen({navigation}) {
    const [name, setName] = useState({value: '', error: ''})
    // const [email, setEmail] = useState({value: '', error: ''})
    const [password1, setPassword1] = useState({value: '', error: ''})
    const [password2, setPassword2] = useState({value: '', error: ''})

    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value)
        // const emailError = emailValidator(email.value)
        const password1Error = passwordValidator(password1.value)
        const password2Error = passwordValidator(password2.value)

        if (password1Error || password2Error) {
            setName({...name, error: nameError})
            // setEmail({ ...email, error: emailError })
            setPassword1({...password1, error: password1Error})
            setPassword2({...password2, error: password2Error})
            return
        }

        let x = name.value.split(":")

        const urll = "http://localhost:3001/users/" + x[1] + "/reset_password/" + x[0];
        console.log(urll)
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if(password1.value===password2.value) {
            const body = {password: password1.value}
            axios.patch(urll, body, options)
                .then((response) => {
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'LoginScreen'}],
                    })
                })
                .catch((error) => {
                    alert(error)
                })

        }
        else{
            console.log("err")
            Alert.alert(`Enter same passwords to two fields`)
        }
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Logo/>
            <Header>Reset Password</Header>
            <TextInput
                label="Verification Code"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({value: text, error: ''})}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password1.value}
                onChangeText={(text) => setPassword1({value: text, error: ''})}
                error={!!password1.error}
                errorText={password1.error}
                secureTextEntry
            />
            <TextInput
                label="Verify Password"
                returnKeyType="done"
                value={password2.value}
                onChangeText={(text) => setPassword2({value: text, error: ''})}
                error={!!password2.error}
                errorText={password2.error}
                secureTextEntry
            />
            <Button
                mode="contained"
                onPress={onSignUpPressed}
                style={{marginTop: 24}}
            >
                Reset
            </Button>
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})
