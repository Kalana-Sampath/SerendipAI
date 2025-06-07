import { Colors } from '@/constants/Colors';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Login() {


  const router = useRouter();


  return (
    <View>
      <Image
        source={require('./../assets/images/login.jpg')}
        style={{
          width: '100%',
          height: 430
        }}
      />
      
      <View style={styles.container}>

        <MaskedView
          maskElement={
            <Text
              style={{
                fontFamily: 'outfit-bold',
                fontSize: 35,
                color: 'black',
                marginLeft: 85
              }}
            >
              DreamTrip
            </Text>
          }
        >
          <LinearGradient
            colors={Colors.GRADIENT_PRIMARY}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text
              style={{
                opacity: 0,
                fontFamily: 'outfit-bold',
                fontSize: 35,
                
              }}
            >
              DreamTrip 
            </Text>
          </LinearGradient>
        </MaskedView>

        <Text style={{
          fontFamily: 'outfit',
          textAlign: 'center',
          fontSize: 17,
          color: Colors.GRAY,
          marginTop: 20,

        }}>Discover your next adventure effortlessy. Personalized itineraries at your fingertips. Travel smarter
          with AI-driven insights.
        </Text>

        <TouchableOpacity
          onPress={() => router.push('auth/sign-in')}
          activeOpacity={0.7}
          style={{
            borderRadius: 15,
            marginTop: 40,
            marginLeft: 10,
            // marginRight: 25,
            width: 330,
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

            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: 'outfit-medium',
                fontSize: 20,
              }}
            >
              Get Start</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    padding: 25
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: '20%',

  }
})

