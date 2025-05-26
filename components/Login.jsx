import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function Login() {


  const router=useRouter();

  
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
        <Text style={{
            fontSize: 28,
            fontFamily: 'outfit-bold',
            textAlign: 'center',
            marginTop: 10
        }}>SerendipAI</Text>

        <Text style={{
            fontFamily: 'outfit',
            textAlign: 'center',
            fontSize: 17,
            color: Colors.GRAY,
            marginTop: 20,

        }}>Discover your next adventure effortlessy. Personalized itineraries at your fingertips. Travel smarter
            with AI-driven insights.
        </Text>

        <TouchableOpacity style={styles.button}
          onPress={()=>router.push('auth/sign-in')}
        >
          <Text style={{color:Colors.WHITE, 
            textAlign: 'center',
            fontFamily: 'outfit',
            fontSize:17
            }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.WHITE,
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '100%',
        padding: 25
    },
    button:{
      padding: 15,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 99,
      marginTop: '20%',

    }
})
    
