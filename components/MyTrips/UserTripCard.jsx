import moment from 'moment';
import { Image, Text, View } from 'react-native';

export default function UserTripCard({ trip }) {
  const parsedTripData = JSON.parse(trip.tripData);
  const location = parsedTripData.locationInfo?.name;
  const startDate = parsedTripData.locationInfo?.startDate;
  const travelerTitle = parsedTripData.traveler?.title;
  const photoRef = parsedTripData.locationInfo?.photoRef;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
      }}
    >
      {photoRef ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          style={{
            width: 90,
            height: 90,
            borderRadius: 10,
            marginRight: 10,
          }}
        />
      ) : (
        <Image
          source={require('./../../assets/images/trip-a.jpg')}
          style={{
            width: 90,
            height: 90,
            borderRadius: 10,
            marginRight: 10,
          }}
        />
      )}

      <View>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 18 }}>{location}</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 15, marginTop: 2 }}>
          {moment(startDate).format('DD MMM YYYY')}
        </Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 15, marginTop: 2 }}>
          Traveling: {travelerTitle}
        </Text>
      </View>
    </View>
  );
}
