import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from '@expo/vector-icons';
import IconButton from './component/UI/IconButton';
import ExpenseContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview(){
  return (
    <BottomTabs.Navigator screenOptions={({navigation})=>({
      headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor:"white",
      tabBarStyle:{ backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor:GlobalStyles.colors.accent500,
      headerRight : ({tintColor})=> (<IconButton color="white" size={20} icon="add" onPress={()=>{
        navigation.navigate("ManageExpenses")
      }}/>)
    })}>
      <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} options={{
        title:"Recent Expenses" ,
        tabBarLabel:"Recent",
        tabBarIcon:({size,color})=> <Ionicons name="hourglass" size={size} color={color}/>
      }}/>
      <BottomTabs.Screen name='AllExpenses' component={AllExpenses} options={{
        title:"All Expenses" ,
        tabBarLabel:"All",
        tabBarIcon:({size,color})=> <Ionicons name="calendar" size={size} color={color}/>
      }} />

    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
   <>
    <StatusBar style="auto" />
    <ExpenseContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor:"white",
        } }>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown: false}}/>
          <Stack.Screen name="ManageExpenses" component={ManageExpenses} options={{
            title:"Manage Expenses",
            presentation :"modal"
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </ExpenseContextProvider>
   </>
     
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
