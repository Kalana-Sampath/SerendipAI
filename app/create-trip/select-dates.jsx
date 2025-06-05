import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from 'expo-router';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from './../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext';


export default function SelectDates() {

    const navigation = useNavigation();


    // const [selectedStartDate, setSelectedStartDate] = useState(null);
    
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const {tripData,setTripData}=useContext(CreateTripContext)

    const router=useRouter()

    useEffect(() => {

        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        })
    }, [])

    const onDateChange = (date, type) => {
        console.log(date, type);
        if(type=='START_DATE')
        {
            setStartDate(moment(date))
        }
        else{
            setEndDate(moment(date))
        }
    };

    const onDateSelectoinContinue = () => {
        if(!startDate || !endDate)
        {
            ToastAndroid.show('Please select Start and End Date', ToastAndroid.LONG)
        }
        const totalNoOfDays=endDate.diff(startDate,'days');
        console.log(totalNoOfDays+1);
        setTripData({
            ...tripData,
            startDate:startDate,
            endDate:endDate,
            totalNoOfDays:totalNoOfDays+1
        })
        router.push('/create-trip/select-budget')
    }

    


    return (
        <View
            style={{
                padding: 25,
                paddingTop: 60,
                backgroundColor: Colors.WHITE,
                height: '100%',

            }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 35,
                marginTop: 20,
                textAlign: 'center',
            }}>Travel Dates</Text>

            <View style={{
                marginTop: 30
            }}>
                <CalendarPicker
                    onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()} // Prevents selection of past dates
                    maxRangeDuration={5} // Limits the range to 5 days
                    selectedRangeStyle={{
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 8,
                    }}
                    selectedDayTextStyle={{
                        color: Colors.WHITE,
                    }}
                />
            </View>

            <TouchableOpacity
                onPress={onDateSelectoinContinue}
                activeOpacity={0.7}
          style={{
            marginTop: 10,
            borderRadius: 15,
            overflow: 'hidden',
            alignSelf: 'center',
            width: 340,
            height: 60,
          }}
                >
                    <LinearGradient
                                colors={Colors.GRADIENT_PRIMARY}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: 15,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >


                <Text 
                style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'outfit-medium',
                fontSize: 20,
              }}
                >
                    Continue</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}