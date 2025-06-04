import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { Colors } from './../../constants/Colors';

import { collection, getDocs, query, where } from 'firebase/firestore';
import UserTripsList from '../../components/MyTrips/UserTripsList';
import { auth, db } from './../../configs/FirebaseConfig';

export default function MyTrip() {

  const [userTrips, setUserTrips] = useState([]);

  const user=auth.currentUser;

  const [loading,setLoding]=useState(false)
  // const [tripList]

  useEffect(()=>{
    user&&GetMyTrips();
  },[user])
  
  const GetMyTrips=async()=>{
    setLoding(true)
    setUserTrips([])
    const q=query(collection(db,'UserTrips'),where('userEmail','==',user?.email))
    const querySnapshot=await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prev=>[...prev,doc.data()])
    })
    setLoding(false)
  }

  return (
    <View style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor:Colors.WHITE,
      height: '100%'
    }}>

      <View style={{
        display: 'flex', 
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize: 35
      }}>My Trip</Text>
      <Ionicons name="add-circle" size={50} color="black" />
    </View>

    {loading&&<ActivityIndicator size={'large'} color={Colors.PRIMARY}/>}

    {
      userTrips?.length==0?
      <StartNewTripCard/>
      :
      <UserTripsList userTrips={userTrips}/>
    }
    </View>
  )
}