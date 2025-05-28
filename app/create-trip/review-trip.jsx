import { useNavigation } from 'expo-router';
import moment from 'moment';
import { useContext, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function ReviewTrip() {

    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext)

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    return (
        <View style={{
            padding: 25,
            paddingTop: 50,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 35,
                marginTop: 20
            }}>Review your trip</Text>

            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20
                }}>Before generating your trip, please review your selection</Text>

                {/* Destination Info */}
                <View style={{
                    marginTop: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20
                }}>
                    {/* <Ionicons name="location-sharp" size={24} color="black" /> */}
                    <Text style={{
                        fontSize: 50
                    }}>
                        🏝️

                    </Text>

                    <View>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Destination</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20
                        }}>{tripData?.locationInfo?.name}</Text>
                    </View>
                </View>

                    {/* Date Selected Info */}
                <View style={{
                    marginTop: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20
                }}>
                    {/* <Ionicons name="location-sharp" size={24} color="black" /> */}
                    <Text style={{
                        fontSize: 50
                    }}>
                        🗓️

                    </Text>

                    <View>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Travel Date</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20
                        }}>{moment(tripData?.startDate).format('DD MMM')
                        +" To "+
                        moment(tripData.endDate).format('DD MMM')+"  "}
                        ({tripData?.totalNoOfDays} days)
                        </Text>
                    </View>
                </View>

                    {/* Traveler Info */}
                <View style={{
                    marginTop: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20
                }}>
                    {/* <Ionicons name="location-sharp" size={24} color="black" /> */}
                    <Text style={{
                        fontSize: 50
                    }}>
                        🚌

                    </Text>

                    <View>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Who is Traveling</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20
                        }}>
                            {tripData?.traveler?.title}
                        </Text>
                    </View>
                </View>

                    {/* Budget Info */}
                <View style={{
                    marginTop: 25,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20
                }}>
                    {/* <Ionicons name="location-sharp" size={24} color="black" /> */}
                    <Text style={{
                        fontSize: 50
                    }}>
                        💰

                    </Text>

                    <View>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Budget</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20
                        }}>
                            {tripData?.budget}
                        </Text>
                    </View>
                </View>

            </View>

            <TouchableOpacity 
                    //   onPress={()=>onClickContinue()}
                      style={{
                        padding: 15,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 15,
                        marginTop: 40,
                      }}>
                        
                      
                        <Text style={{
                          textAlign: 'center',
                          color: Colors.WHITE,
                          fontFamily: 'outfit-medium',
                          fontSize: 18
                          
                        }}>Build My Trip</Text>
                      </TouchableOpacity>
        </View>
    )
}

{/*  */ }
{/* 📍📆📋 */ }