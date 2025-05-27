import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SearchPlace() {

  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown:true,
      headerTransparent: true,
      headerTitle: 'Search'
  })
}, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <View style={{
      padding: 25,
      paddingTop: 60,
      backgroundColor:Colors.WHITE,
      height: '100%'
    }}>


      <GooglePlacesAutocomplete
        // Required props
        placeholder="Search Place"
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY, 
          language: 'en',
          types: 'geocode',
        }}
        // All other default props explicitly defined
        autoFillOnNotFound={false}
        currentLocation={false}
        currentLocationLabel="Current location"
        debounce={0}
        disableScroll={false}
        enableHighAccuracyLocation={true}
        enablePoweredByContainer={true}
        filterReverseGeocodingByTypes={[]}
        GooglePlacesDetailsQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          type: 'restaurant',
        }}
        GoogleReverseGeocodingQuery={{}}
        isRowScrollable={true}
        keyboardShouldPersistTaps="always"
        listUnderlayColor="#c8c7cc"
        listViewDisplayed="auto"
        keepResultsAfterBlur={false}
        minLength={1}
        nearbyPlacesAPI="GooglePlacesSearch"
        numberOfLines={1}
        onFail={() => {}}
        onNotFound={() => {}}

        fetchDetails={true}
        onPress={(data, details = null) => {
          // Handle selection
          setTripData({
            locationInfo:{
              name:data.description,
              coordinates:details?.geometry.location,
              photoRef:details?.photos[0]?.photo_reference,
              url:details?.url
            }
          })
        }}  

        onTimeout={() =>
          console.warn('google places autocomplete: request timeout')
        }
        predefinedPlaces={[]}
        predefinedPlacesAlwaysVisible={false}
        styles={{
           textInputContainer:{
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 20,
          }
        }}
        suppressDefaultStyles={false}
        textInputHide={false}
        textInputProps={{}}
        timeout={20000}
      />
    </View>
  )
}