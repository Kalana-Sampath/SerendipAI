import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { Colors } from './../../constants/Colors';

import { collection, getDocs, query, where } from 'firebase/firestore';
import UserTripList from '../../components/MyTrips/UserTripList';
import { auth, db } from './../../configs/FirebaseConfig';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export default function MyTrip() {

  const [userTrips, setUserTrips] = useState([]);

  const user = auth.currentUser;

  const [loading, setLoding] = useState(false)
  // const [tripList]

  useEffect(() => {
    user && GetMyTrips();
  }, [user])

  const GetMyTrips = async () => {
    setLoding(true)
    setUserTrips([])
    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prev => [...prev, doc.data()])
    })
    setLoding(false)
  }

  return (
    <View style={{
      padding: 6,
      paddingTop: 30,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
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

        {/* Gradient Icon */}
        <MaskedView
          maskElement={
            <Ionicons name="add-circle" size={45} color="black" />
          }
        >
          <LinearGradient
            colors={Colors.GRADIENT_PRIMARY}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="add-circle" size={50} color="transparent" />
          </LinearGradient>
        </MaskedView>
      </View>


      {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} />}

      {
        userTrips?.length == 0 ?
          <StartNewTripCard />
          :
          <UserTripList userTrips={userTrips} />
      }
    </View>
  )
}