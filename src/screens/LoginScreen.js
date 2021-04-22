import React, {useState} from 'react'
import {TouchableOpacity, StyleSheet, View} from 'react-native'
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
import {Alert} from "react-native-web";
import axios from "axios";

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState({value: '', error: ''})
    const [passwordX, setPasswordX] = useState({value: '', error: ''})
    const [check, setCheck] = useState(false)

    const onLoginPressed = async () => {
        // const emailError = emailValidator(email.value)
        // const passwordError = passwordValidator(password.value)
        // if (passwordError) {
        //     // setEmail({...email, error: ""})
        //     setPassword({...password, error: passwordError})
        //     return
        // }
        // let pass =JSON.stringify((email.value), (password.value))
        let user_name = (email.value)
        let password = (passwordX.value)
        // let res;
        // res = await fetch(`http://localhost:3001/users/login`, {
        //     method: 'POST',
        //     body: JSON.stringify({user_name, password}),
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        // });
        // Alert.alert("hi")

        await fetch(`http://localhost:3001/users/login`, {
            method: 'POST',
            body: JSON.stringify({user_name, password}),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response
            })
            .then(response => response.json())
            .then(({user, token}) => {
                console.log(token)
                // alert(token)
                setTimeout(() => {
                    localStorage.setItem('id_token', token)
                })
                if (token) {
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Sidebar'}],
                    })
                } else {
                    Alert.alert("Invalid Credentials")
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'LoginScreen'}],
                    })
                }
            })

            .catch(function (error) {
                console.log(error);
            });


        // console.log(res)

        // if (res.statusCode === 200) {
        //
        //     res = res.json()
        //     localStorage.setItem('id_token', res.token)
        //     navigation.reset({
        //         index: 0,
        //         routes: [{name: 'Dashboard'}],
        //     })
        // } else {
        //     navigation.reset({
        //         index: 0,
        //         routes: [{name: 'LoginScreen'}],
        //     })
        // }


    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Logo/>
            <Header>Welcome back.</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({value: text, error: ''})}
                // error={!!email.error}
                // errorText={email.error}
                autoCapitalize="none"
                // autoCompleteType="email"
                // textContentType="emailAddress"
                // keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={passwordX.value}
                onChangeText={(text) => setPasswordX({value: text, error: ''})}
                // error={!!password.error}
                // errorText={password.error}
                secureTextEntry
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPasswordScreen')}
                >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={onLoginPressed}>
                Login
            </Button>
            <View style={styles.row}>
                <Text>Are you a new user? </Text>
                <TouchableOpacity onPress={() => navigation.replace('ResetPasswordScreen')}>
                    <Text style={styles.link}>New User</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})
