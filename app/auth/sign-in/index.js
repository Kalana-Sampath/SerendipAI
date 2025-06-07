import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { Colors } from '@/constants/Colors';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet, Text, TextInput,
    ToastAndroid, TouchableOpacity, View
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../../configs/FirebaseConfig';



export default function SignIn() {
    const navigation = useNavigation();

    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])



    const onSignIn = () => {

        if (!email && !password) {
            ToastAndroid.show("Please Enter Email & Password", ToastAndroid.SHORT)
            return;
        }

        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                router.replace('/mytrip')
                console.log(user);
                setLoading(false)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, error.code);
                if (errorCode == 'auth/invalid-credential') {
                    ToastAndroid.show('Invalid Credentials', ToastAndroid.LONG)
                }
                setLoading(false)
            });
    }


    return (
        <ScrollView>
            <View style={{
                padding: 30,
                paddingTop: 40,
                paddingBottom: '100%',
                backgroundColor: Colors.WHITE,
                height: '100%'
            }}>

                {/* Back Button */}
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 30,
                    marginTop: 30
                }}>Let&apos;s Sign You In</Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 30,
                    color: Colors.GRAY,
                    marginTop: 20
                }}>Welcome Back</Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 30,
                    color: Colors.GRAY,
                    marginTop: 10
                }}>You&apos;ve been missed</Text>

                {/* Email */}
                <View style={{
                    marginTop: 50
                }}>
                    <Text style={{
                        fontFamily: 'outfit'
                    }}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => setEmail(value)}
                        placeholder='Enter Email' />
                </View>

                {/* Password */}
                <View style={{
                    marginTop: 20
                }}>
                    <Text style={{
                        fontFamily: 'outfit'
                    }}>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(value) => setPassword(value)}
                        placeholder='Enter password' />
                </View>

                {/* Sign In Button */}
                <TouchableOpacity
                    onPress={async () => {
                        setLoading(true);
                        await onSignIn(); // your sign-in logic here
                        setLoading(false);
                    }}
                    disabled={loading}
                    activeOpacity={0.7}
                    style={{
                        borderRadius: 15,
                        marginTop: 40,
                        width: 335,
                        height: 60,
                    }}
                >
                    <LinearGradient
                        colors={Colors.GRADIENT_PRIMARY}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.WHITE} />
                        ) : (
                            <Text
                                style={{
                                    color: Colors.WHITE,
                                    fontFamily: 'outfit-medium',
                                    fontSize: 19,
                                }}
                            >
                                Sign In
                            </Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                {/* Create Account Button */}
                <TouchableOpacity
                    onPress={() => router.replace('auth/sign-up')}
                    style={{
                        padding: 16,
                        backgroundColor: Colors.WHITE,
                        borderRadius: 15,
                        marginTop: 20,
                        borderColor: Colors.PRIMARY,
                        borderWidth: 1
                    }}>
                    <Text style={{
                        color: Colors.PRIMARY,
                        textAlign: 'center',
                        // fontFamily: 'outfit-bold',
                        fontSize:18
                    }}>
                        Create Account
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.GRAY,
        fontFamily: 'outfit'
    }
})