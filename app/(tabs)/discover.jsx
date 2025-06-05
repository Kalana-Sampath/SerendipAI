import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Discover() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      {/* Header */}
      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 32 }}>Discover</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY, marginTop: 4 }}>
          Explore destinations and travel ideas
        </Text>
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F0F0F0',
          paddingHorizontal: 15,
          borderRadius: 12,
          marginBottom: 25,
        }}
      >
        <Ionicons name="search" size={22} color={Colors.GRAY} />
        <TextInput
          placeholder="Search places"
          placeholderTextColor={Colors.GRAY}
          style={{
            fontFamily: 'outfit',
            flex: 1,
            padding: 10,
            fontSize: 16,
            marginLeft: 10,
          }}
        />
      </View>

      {/* Suggested Destinations */}
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 22, marginBottom: 15 }}>Popular Places</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { image: require('@/assets/images/Paris.jpg'), title: 'Paris' },
          { image: require('@/assets/images/Tokyo.jpg'), title: 'Tokyo' },
          { image: require('@/assets/images/New York.jpg'), title: 'New York' },
          { image: require('@/assets/images/Rome.jpg'), title: 'Rome' },
          { image: require('@/assets/images/London.jpg'), title: 'London' },
        ].map((place, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={{ marginRight: 15, width: 160, borderRadius: 15, overflow: 'hidden' }}
          >
            <Image
              source={place.image}
              style={{ width: '100%', height: 110, borderRadius: 15, objectFit: 'cover' }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 50,
                justifyContent: 'flex-end',
                padding: 8,
              }}
            >
              <Text style={{ fontFamily: 'outfit-bold', color: 'white', fontSize: 16 }}>
                {place.title}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Tips */}
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 22, marginVertical: 20 }}>Travel Tips</Text>
      {[
        "Always carry a power bank and a reusable water bottle when you travel.",
        "Learn basic phrases of the local language.",
        "Keep digital and physical copies of important documents.",
        "Dress according to the local culture and weather.",
        "Try local cuisine and street food safely.",
        "Plan your itinerary but leave room for spontaneous adventures.",
      ].map((tip, index) => (
        <View
          key={index}
          style={{
            backgroundColor: '#F5F5F5',
            padding: 15,
            borderRadius: 15,
            marginBottom: 15,
          }}
        >
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 19, marginBottom: 5 }}>
            Tip #{index + 1}
          </Text>
          <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}>
            {tip}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
