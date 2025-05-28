import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import OptionCard from './../../components/CreateTrip/OptionCard';
import { Colors } from './../../constants/Colors';
import { SelectBudgetOptions } from './../../constants/Options';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SelectBudget() {

    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState();
    const {tripData,setTripData}=useContext(CreateTripContext)

    const router=useRouter()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    useEffect(()=>{
        selectedOption&&setTripData({
            ...tripData,
            budget:selectedOption?.title
        })
    },[selectedOption])

    const onClickContinue=()=>{
        if(!selectedOption)
        {
            ToastAndroid.show('Selected Your Budget',ToastAndroid.LONG)
            return;
        }

        router.push('/create-trip/review-trip');
    }

    return (
        <View style={{
            paddingTop: 75,
            padding: 25,
            backgroundColor: Colors.WHITE,
            height: '100%'

        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 35,
                marginTop: 20,
                textAlign: 'center'
            }}>Budget</Text>

            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20
                }}>Choose sepending habits for your trip</Text>
                <View style={{
                    marginTop: 15
                }}>
                    <FlatList
                        data={SelectBudgetOptions}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={{
                                marginVertical: 10
                            }}
                                onPress={()=>setSelectedOption(item)}
                            >
                                <OptionCard option={item} selectedOption={selectedOption} />

                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>

            <TouchableOpacity 
          onPress={()=>onClickContinue()}
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

