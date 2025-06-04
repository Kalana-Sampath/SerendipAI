import LottieView from 'lottie-react-native';
import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { AI_PROMPT } from '../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';

import { useRouter } from 'expo-router';
import { doc, setDoc } from "firebase/firestore";
import { chatSession } from '../../configs/AiModel';
import { auth, db } from './../../configs/FirebaseConfig';

export default function GenerateTrip() {
    const { tripData } = useContext(CreateTripContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        if (tripData) {
            GenerateAiTrip();
        }
    }, []);

    const GenerateAiTrip = async () => {
        setLoading(true);
        try {
            const FINAL_PROMPT = AI_PROMPT
                .replace('{location}', tripData?.locationInfo?.name)
                .replace('{totalDays}', tripData.totalNoOfDays)
                .replace('{totalNight}', tripData.totalNoOfDays - 1)
                .replace('{traveler}', tripData.traveler?.title)
                .replace('{budget}', tripData.budget)
                .replace('{totalDays}', tripData.totalNoOfDays)
                .replace('{totalNight}', tripData.totalNoOfDays - 1);

            console.log(FINAL_PROMPT);

            const result = await chatSession.sendMessage(FINAL_PROMPT);
            const tripResp = await result.response.text();

            console.log("AI raw response:", tripResp);

            const docId = Date.now().toString();
            const result_=await setDoc(doc(db, "UserTrips", docId), {
                userEmail: user.email,
                tripPlan: tripResp,  // AI Result
                tripData:JSON.stringify(tripData),  // User Selection Data
                docId:docId
                
            });

            setLoading(false);
            router.push('(tabs)/mytrip'); // or just 'mytrip' if (tabs) causes issues

        } catch (error) {
            setLoading(false);
            console.error("Error generating trip:", error);
            // Still navigate to mytrip page if you want to show fallback or let user retry
            router.push('(tabs)/mytrip');
        }
    }; 

    return (
        <View style={{
            padding: 25,
            paddingTop: 60,
            backgroundColor: Colors.WHITE,
            height: '100%',
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 35,
                textAlign: 'center',
            }}>
                Please Wait...
            </Text>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
                textAlign: 'center',
                marginTop: 30,
            }}>
                We are working to generate your dream trip
            </Text>

            <LottieView
                source={require('../../assets/images/loading.json')}
                autoPlay
                loop
                style={{
                    width: '100%',
                    height: 150,
                    objectFit: 'contain',
                    marginTop: -10,
                }}
            />

            <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY,
                fontSize: 20,
                textAlign: 'center',
            }}>
                Do not Go Back
            </Text>
        </View>
    );
}


