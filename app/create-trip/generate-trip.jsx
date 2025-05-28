import LottieView from 'lottie-react-native';
import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { AI_PROMPT } from '../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';


import { useRouter } from 'expo-router';
import { chatSession } from '../../configs/AiModel'; // Make sure this path is correct or adjust as needed

export default function GenerateTrip() {

    const { tripData, setTripData } = useContext(CreateTripContext);
    const [loading,setLoading]=useState(false);
    const router=useRouter();

    useEffect(()=>{
        tripData&&GenerateAiTrip()
    },[tripData])

    const GenerateAiTrip = async () => {
        setLoading(true)
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', tripData?.locationInfo?.name)
            .replace('{totalDays}', tripData.totalNoOfDays)
            .replace('{totalNight}', tripData.totalNoOfDays-1)
            .replace('{traveler}', tripData.traveler?.title)
            .replace('{budget}', tripData.budget)
            .replace('{totalDays}', tripData.totalNoOfDays)
            .replace('{totalNight}', tripData.totalNoOfDays-1)

            console.log(FINAL_PROMPT);  
     
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result.response.text());
        setLoading(false)

        router.push('(tabs)/mytrip');
            
    }
 


    return (
        <View style={{
            padding: 25,
            paddingTop: 60,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 35,
                textAlign: 'center'
            }}>Please Wait...
            </Text>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
                textAlign: 'center',
                marginTop: 30
            }}>We are working to generate your dream trip
            </Text>

            <LottieView
                source={require('../../assets/images/loading.json')}
                autoPlay
                loop
                style={{
                    width: '100%',
                    height: 150,
                    objectFit: 'contain',
                    marginTop: -10
                }}
            />
            <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY,
                fontSize: 20,
                textAlign: 'center'
            }}>
                Do not Go Back
            </Text>

        </View>
    )
}

