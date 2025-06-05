import { format } from 'date-fns';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const tripData = {
  locationInfo: {
    name: "New York, NY, USA",
    coordinates: { lat: 40.7127753, lng: -74.0059728 },
  },
  traveler: {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler in exploration",
    icon: "✈️",
    people: "1",
  },
  startDate: "2025-06-25T06:30:00.000Z",
  endDate: "2025-06-26T06:30:00.000Z",
  budget: "Moderate",
  trip_plan: {
    daily_itinerary: [
      {
        day: "Day 1",
        theme: "Explore NYC",
        hotel: {
          hotel_name: "Hotel Manhattan",
          address: "123 Main St, New York, NY",
          estimated_price_per_night: "$180",
          rating: 4.2,
          description: "Comfortable stay near Times Square.",
        },
        plan: [
          {
            place_name: "Statue of Liberty",
            activity: "Visit the iconic statue via ferry.",
            best_time_to_visit: "Morning",
            estimated_time_spent: "2 hours",
          },
          {
            place_name: "Central Park",
            activity: "Walk and relax in the park.",
            best_time_to_visit: "Afternoon",
            estimated_time_spent: "1.5 hours",
          },
        ],
      },
      {
        day: "Day 2",
        theme: "Culture & Shopping",
        hotel: {
          hotel_name: "Downtown Lodge",
          address: "456 Broadway, New York, NY",
          estimated_price_per_night: "$210",
          rating: 4.5,
          description: "Modern hotel near shopping area.",
        },
        plan: [
          {
            place_name: "Metropolitan Museum of Art",
            activity: "Explore historical art exhibits.",
            best_time_to_visit: "Morning",
            estimated_time_spent: "3 hours",
          },
          {
            place_name: "5th Avenue",
            activity: "Shopping and local food tour.",
            best_time_to_visit: "Afternoon",
            estimated_time_spent: "2 hours",
          },
        ],
      },
    ],
  },
};

const TripScreen = () => {
  const {
    locationInfo,
    traveler,
    startDate,
    endDate,
    budget,
    trip_plan,
  } = tripData;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('./../../assets/images/newyork.jpg')}
        style={styles.mainImage}
      />

      <Text style={styles.header}>{locationInfo.name}</Text>
      <Text style={styles.subHeader}>
        Traveler: {traveler.title} {traveler.icon}
      </Text>
      <Text style={styles.subHeader}>
        Start Date: {format(new Date(startDate), 'MMMM dd, yyyy')}
      </Text>
      <Text style={styles.subHeader}>
        End Date: {format(new Date(endDate), 'MMMM dd, yyyy')}
      </Text>
      <Text style={styles.subHeader}>Budget: {budget}</Text>

      {trip_plan.daily_itinerary.map((day, index) => (
        <View key={index}>
          <Text style={styles.sectionTitle}>{day.day} - {day.theme}</Text>

          {/* Hotel */}
          {day.hotel && (
            <View style={styles.card}>
              <Image
                source={
                  index === 0
                    ? require('./../../assets/images/day1.jpg')
                    : require('./../../assets/images/day2.jpg')
                }
                style={styles.image}
              />
              <Text style={styles.cardTitle}>{day.hotel.hotel_name}</Text>
              <Text>{day.hotel.address}</Text>
              <Text>Price: {day.hotel.estimated_price_per_night}</Text>
              <Text>Rating: {day.hotel.rating}</Text>
              <Text>{day.hotel.description}</Text>
            </View>
          )}

          {/* Activities */}
          {day.plan.map((activity, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{activity.place_name}</Text>
              <Text>{activity.activity}</Text>
              <Text>Time: {activity.best_time_to_visit}</Text>
              <Text>Duration: {activity.estimated_time_spent}</Text>
            </View>
          ))}
        </View>
      ))}

      <View style={{ marginBottom: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: 220,
    borderRadius: 15,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
});

export default TripScreen;
