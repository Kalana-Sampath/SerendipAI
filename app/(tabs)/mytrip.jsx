import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import UserTripsList from './../../components/MyTrips/UserTripList';
import { Colors } from './../../constants/Colors';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchUserTrips();
    }
  }, [user]);

  const fetchUserTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    try {
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user.email));
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips: ", error);
    }
    setLoading(false);
  };

  return (
    <View style={{ padding: 6, paddingTop: 30, backgroundColor: Colors.WHITE, height: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}
      >
        {/* Gradient Text */}
        <MaskedView
          maskElement={
            <Text
              style={{
                fontFamily: 'outfit-bold',
                fontSize: 35,
                color: 'black',
              }}
            >
              My Trips
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
              My Trips
            </Text>
          </LinearGradient>
        </MaskedView>

        {/* Plus Icon */}
        <TouchableOpacity onPress={() => router.push('/create-trip/search-place')}>
          <MaskedView
            maskElement={<Ionicons name="add-circle" size={45} color="black" />}
          >
            <LinearGradient
              colors={Colors.GRADIENT_PRIMARY}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="add-circle" size={50} color="transparent" />
            </LinearGradient>
          </MaskedView>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}

      {!loading && (
        userTrips.length === 0
          ? <StartNewTripCard />
          : <UserTripsList userTrips={userTrips} />
      )}
    </View>
  );
}
