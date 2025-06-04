import moment from 'moment';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import UserTripCard from './UserTripCard';

export default function UserTripsList({ userTrips }) {

  const LatestTrip=JSON.parse(userTrips[0].tripData)

  if (!userTrips || userTrips.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>No trips found.</Text>
      </View>
    );
  }

  // Latest trip = big card
  const lastTrip = userTrips[userTrips.length - 1];
  const parsedLastTrip = JSON.parse(lastTrip.tripData);

  // Previous trips (excluding the last one), sorted by startDate descending
  const previousTrips = userTrips
    .slice(0, userTrips.length - 1)
    .sort((a, b) => {
      const dateA = new Date(JSON.parse(a.tripData).locationInfo?.startDate);
      const dateB = new Date(JSON.parse(b.tripData).locationInfo?.startDate);
      return dateB - dateA; // most recent first
    });

  return (
    <ScrollView style={{ padding: 15 }}>
      {/* Big Card - Latest Trip */}
      <View style={{ marginBottom: 20 }}>
        <View style={{ position: 'relative', width: '100%', borderRadius: 15, overflow: 'hidden' }}>
          
          {LatestTrip?.locationInfo?.photoRef?
          <Image source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=
            ${LatestTrip.locationInfo?.photoRef}
            &key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}` }} 
            style={{
              width: '100%',
              height: 220,
              borderRadius: 15,
              objectFit: 'cover',
            }}
            />
        :
          <Image
            source={require('./../../assets/images/trip-a.jpg')}
            style={{
              width: '100%',
              height: 220,
              borderRadius: 15,
              objectFit: 'cover',
            }}
          />}

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
        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'outfit', fontSize: 17 }}>
            {moment(parsedLastTrip.locationInfo?.startDate).format('DD MMM YYYY')}
          </Text>
          <Text style={{ fontFamily: 'outfit', fontSize: 17 }}>
            🚌 {parsedLastTrip.traveler?.title}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.GRAY,
            padding: 15,
            borderRadius: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: Colors.PRIMARY,
              textAlign: 'center',
              fontFamily: 'outfit-medium',
              fontSize: 15,
            }}
          >
            See your plan
          </Text>
        </TouchableOpacity>
      </View>

      {/* Small Cards - Sorted Previous Trips */}
      {previousTrips.map((trip, index) => (
        <UserTripCard trip={trip} key={index} />
      ))}
    </ScrollView>
  );
}
