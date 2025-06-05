// app/profile.jsx

import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      {/* Profile Header */}
      <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 30 }}>
        <Image
           source={require('./../../assets/images/profile.jpg')}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 15 }}
        />
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 24 }}>Kalana Sampath</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}>kalanasampath@gmail.com</Text>
      </View>

      {/* Profile Options */}
      <View style={{ gap: 25 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="settings-outline" size={24} color={Colors.GRAY} style={{ marginRight: 15 }} />
          <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="help-circle-outline" size={24} color={Colors.GRAY} style={{ marginRight: 15 }} />
          <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 40 }}>
        <LinearGradient
         colors={Colors.GRADIENT_PRIMARY}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingVertical: 15,
            borderRadius: 15,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 17, color: Colors.WHITE }}>
            Logout
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
