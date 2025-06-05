import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default function StartNewTripCard() {

  const router = useRouter()

  return (
    <View style={{
      padding: 20,
      marginTop: 50,
      display: 'flex',
      alignItems: 'center',
      gap: 23
    }}>
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={{
        fontSize: 25,
        fontFamily: 'outfit-medium'
      }}>
        No trips planned yet
      </Text>
      <Text style={{
        fontSize: 20,
        fontFamily: 'outfit',
        textAlign: 'center',
        color: Colors.GRAY
      }}>
        Looks like its time to plan a new travel experience! Get Started below
      </Text>

      {/* Start a New trip Button */}
      <TouchableOpacity
        onPress={() => router.push('/create-trip/search-place')}
        activeOpacity={0.7}
        style={{
          borderRadius: 15,
          marginTop: 10,
          width: 250,
          height: 55,
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
              fontSize: 19,
            }}
          >
            Start a new trip
          </Text>
        </LinearGradient>
      </TouchableOpacity>

    </View>
  )
}


