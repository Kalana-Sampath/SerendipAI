// import { Image, Text, View } from 'react-native'

// export default function UserTripsList({userTrips}) {
//   return (
//     <View>
//       <View style={{
//         marginTop:20
//       }}>
//         <Image source={require('./../../assets/images/login.jpg')} 
//             style={{
//                 width:'100%',
//                 height:240,
//                 objectFit:'cover',
//                 borderRadius:15
//             }}
//         />
//         <View>
//             <Text>
                
//             </Text>
//         </View>
//       </View>
//     </View>
//   )
// }


import { Image, ScrollView, Text, View } from 'react-native'

export default function UserTripsList({userTrips}) {
    
    // const LatestTrip=JSON.parse(userTrips[0].tripData)
  return (
    <ScrollView>
    <View>
      {userTrips.length === 0 && <Text>No trips found.</Text>}
      {userTrips.map((trip, idx) => (
        <View key={idx} style={{ marginTop: 20 }}>
          <Image
            source={require('./../../assets/images/login.jpg')}
            style={{
              width: '100%',
              height: 240,
              objectFit: 'cover',
              borderRadius: 15
            }}
          />
          <View style={{
            marginTop:10
          }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:20
            }}>
              {userTrips[0]?.tripData?.trip_plan?.location}
              
            </Text><Text style={{
                fontFamily:'outfit-bold',
                fontSize:20
            }}>
              {userTrips[0]?.tripData?.startDate}
            
            </Text>

          </View>
        </View>
      ))}
    </View>
    </ScrollView>
  )
}