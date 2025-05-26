import { Redirect } from "expo-router";
import { View } from "react-native";
import Login from "./../components/Login";
import { auth } from "./../configs/FirebaseConfig";

export default function Index() {
  const user = auth.currentUser;

  return (
    <View>
      {user? 
      <Redirect href={'/mytrip'} /> : 
      <Login />
      }
    </View>
  );
}
