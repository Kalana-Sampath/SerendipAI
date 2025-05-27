import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import OptionCard from './../../components/CreateTrip/OptionCard';
import { Colors } from './../../constants/Colors';
import { SelectTravelesList } from './../../constants/Options';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SelectTraveler() {

  const navigation=useNavigation();

  const [selectedTraveler, setSelectedTraveler] = useState();
  
  const {tripData,setTripData}=useContext(CreateTripContext)

    const router=useRouter()
  

  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTransparent:true,
      headerTitle: '',
    })
  }, [])

  useEffect(()=>{
    setTripData({...tripData,
      traveler: selectedTraveler
    })
  },[selectedTraveler])

  useEffect(()=> {
    console.log(tripData);
  },[tripData])

  return (
    
    <View style={{
      padding: 25,
      paddingTop: 60,
      backgroundColor: Colors.WHITE,
      height: '100%',
    }}>
      
      <Text style={{
        fontSize: 35,
        fontFamily: 'outfit-bold',
        marginTop: 2
      }}>Who&apos;s Traveling</Text>

      <View style={{
        marginTop: 15
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 23
        }}>
          Choose your travelers
        </Text>

        <FlatList
          data={SelectTravelesList}
          renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>setSelectedTraveler(item)}
            style={{
              marginVertical: 10
            }}>
             <OptionCard option={item} selectedTraveler={selectedTraveler}/>
            </TouchableOpacity>
          )}
        />

      </View>

          <TouchableOpacity 
          onPress={()=>router.push('/create-trip/select-dates')}
          style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,
            marginTop: 15,
          }}>
            
          
            <Text style={{
              textAlign: 'center',
              color: Colors.WHITE,
              fontFamily: 'outfit-medium',
              fontSize: 18
              
            }}>Continue</Text>
          </TouchableOpacity>
         
    </View>
  )
}