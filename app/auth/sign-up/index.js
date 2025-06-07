import { Colors } from '@/constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet, Text, TextInput,
    ToastAndroid, TouchableOpacity, View
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import { LinearGradient } from 'expo-linear-gradient';
import { auth } from './../../../configs/FirebaseConfig';


export default function SignUp() {
    const navigation = useNavigation();

    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullName, setFullName] = useState();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const OnCreateAccount = () => {

        if (!email || !password || !fullName) {
            ToastAndroid.show('Please enter all details', ToastAndroid.BOTTOM);
            return;
        }

        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                setLoading(false)
                router.replace('auth/sign-in');
                // ...

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
                ToastAndroid.show(errorMessage.BOTTOM)
                setLoading(false)
                // ..
            });
    }

    return (
        <ScrollView>
            <View style={{
                padding: 25,
                paddingTop: 50,
                backgroundColor: Colors.WHITE,
                height: '100%',
                paddingBottom: '100%'
            }}>

                {/* Back Button */}
                <TouchableOpacity onPress={() => router.push('auth/sign-in')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 30,
                    marginTop: 30
                }}>Create New Account</Text>

                {/* User Full Name */}
                <View style={{
                    marginTop: 50
                }}>
                    <Text style={{
                        fontFamily: 'outfit'
                    }}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Full Name'
                        onChangeText={(value) => setFullName(value)}
                    />
                </View>
                {/* Email */}
                <View style={{
                    marginTop: 20
                }}>
                    <Text style={{
                        fontFamily: 'outfit'
                    }}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Email'
                        onChangeText={(value) => setEmail(value)}
                    />
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
                        placeholder='Enter password'
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>

                {/* Create Account Button */}
                <TouchableOpacity
                    onPress={OnCreateAccount}
                    disabled={loading}
                    activeOpacity={0.7}
                    style={{
                        // padding: 20,
                        // backgroundColor: loading ? Colors.GRAY : Colors.PRIMARY,
                       borderRadius: 15,
                        marginTop: 40,
                        width: 340,
                        height: 60,
                        opacity: loading ? 0.7 : 1,
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
                                Create Account
                            </Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                {/* Sign In Button */}
                <TouchableOpacity
                    onPress={() => router.replace('auth/sign-in')}
                    style={{
                        padding: 16,
                        backgroundColor: Colors.WHITE,
                        borderRadius: 15,
                        marginTop: 20,
                        borderWidth: 1,
                        borderColor: Colors.PRIMARY,
                    }}>
                    <Text style={{
                        color: Colors.PRIMARY,
                        textAlign: 'center',
                        fontSize: 18
                    }}>
                        Sign In
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
