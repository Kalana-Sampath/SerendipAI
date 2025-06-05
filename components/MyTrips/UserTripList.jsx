import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import UserTripCard from './UserTripCard';

export default function UserTripsList({ userTrips }) {
  const router = useRouter();

  if (!userTrips || userTrips.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>No trips found.</Text>
      </View>
    );
  }

  const lastTrip = userTrips[userTrips.length - 1];
  const parsedLastTrip = JSON.parse(lastTrip.tripData);

  const previousTrips = userTrips
    .slice(0, userTrips.length - 1)
    .sort((a, b) => {
      const dateA = new Date(JSON.parse(a.tripData).locationInfo?.startDate);
      const dateB = new Date(JSON.parse(b.tripData).locationInfo?.startDate);
      return dateB - dateA;
    });

  return (
    <ScrollView style={{ padding: 15 }}>
      {/* Big Card - Latest Trip */}
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: 15,
            overflow: 'hidden',
          }}
        >
          {parsedLastTrip?.locationInfo?.photoRef ? (
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${parsedLastTrip.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
              }}
              style={{
                width: '100%',
                height: 220,
                borderRadius: 15,
                objectFit: 'cover',
              }}
            />
          ) : (
            <Image
              source={require('./../../assets/images/trip-a.jpg')}
              style={{
                width: '100%',
                height: 220,
                borderRadius: 15,
                objectFit: 'cover',
              }}
            />
          )}

          {/* Location Overlay */}
          <View
            style={{
              position: 'absolute',
              top: 15,
              left: 15,
              backgroundColor: 'rgba(0,0,0,0.4)',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 22, color: 'white' }}>
              {parsedLastTrip.locationInfo?.name}
            </Text>
          </View>
        </View>

        {/* Date & Traveler */}
        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontFamily: 'outfit', fontSize: 17 }}>
            {moment(parsedLastTrip.locationInfo?.startDate).format('DD MMM YYYY')}
          </Text>
          <Text style={{ fontFamily: 'outfit', fontSize: 17 }}>
            🚌 {parsedLastTrip.traveler?.title}
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          onPress={() => router.push('/trip-details')}
          activeOpacity={0.7}
          style={{
            marginTop: 10,
            borderRadius: 15,
            overflow: 'hidden',
            alignSelf: 'center',
            width: 340,
            height: 60,
          }}
        >
          <LinearGradient
            colors={Colors.GRADIENT_PRIMARY}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'outfit-medium',
                fontSize: 20,
              }}
            >
              See your plan
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Previous Trips */}
      {previousTrips.map((trip, index) => (
        <UserTripCard trip={trip} key={index} />
      ))}
    </ScrollView>
  );
}