
import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Image } from 'react-native';
import Task from './components/Task';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ceil, color } from 'react-native-reanimated';
import qs from 'qs';
import { Linking } from 'react-native';



function HomeScreen({ navigation }) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      <View style={{ flex: 1, alignItems: 'left' }}>
        <Text style={styles.hiMessage}>👋 Hi, how are you today?</Text>
        <Text style={styles.sectionTitle1}>Mood Tracker</Text>
        <Image style={styles.pencilMountain} source={require('./Pencil_Mountain_10.png')}/>
        <Text style={styles.sectionTitle2}>Journal Entries</Text>
        <View style={styles.items}>

        </View>
      </View>
        
      </ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('JournalEntry')}>
            <Image style={styles.addButton} source={require('./add.png')}/>
          </TouchableOpacity>  
    </View>
  );
}

//SHARE FEELINGS
function ShareFeelingsScreen() {
  return (

    //dctors and parents
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
            <Text style={styles.shareTitle}>{"Share How You're Feeling"}</Text>
      <View style={styles.item}>
        <View vert>
        <Text style={styles.itemText}>{"With Caretaker"}</Text>
        <Text style={styles.bodyText}>{"Help them understand your needs."}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {sendEmail(
    'yourdoctor@gmail.com',
       'My mood',
    'Information',
 { cc: 'relevantpoeple@gmail.com' }
).then(() => {
    console.log('Your message was successfully sent!');
});}}>
          <Text style={styles.buttonText2}>Send</Text>
          </TouchableOpacity>
        </View>
        <Image
      style={styles.shareImage}
      source={require('./Doctor.png')}/>
    </View>
    
    <View style={styles.item2}>
    <View vert>
        <Text style={styles.itemText2}>{"With Family"}</Text>
        <Text style={styles.bodyText2}>{"Ease their worry by keeping in touch."}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {sendEmail("skyngthowhing@gmail.com", "Can we get there")}}>
          <Text style={styles.buttonText2}>Send</Text>
          
          </TouchableOpacity>
        </View>
        <Image
        style={styles.shareImage}
      source={require('./family.png')}/>
    </View>

    </View>
    
  );
}
function JournalEntry() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
      <Text>Journal Entry</Text>


    </View>
  );
}

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false }}  >
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="JournalEntry" component={JournalEntry} options={{headerShown: false} } />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Share Feelings" component={ShareFeelingsScreen} options={{headerShown: false}}/>
    </Tab.Navigator>      
    </NavigationContainer>
  );
}

export async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}




const styles = StyleSheet.create({
  
  pencilMountain: {
    marginLeft: 30,
    marginTop: 20,
    resizeMode: 'cover',
    width: 350,
    height: 200,
    aspectRatio: 1644/1013,
    borderRadius: 25
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  hiMessage: {
    color: '#4C4776',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 26,
    marginTop: 70,
    marginLeft: 30
  },
  sectionTitle1: {
    marginLeft: 30,
    marginTop: 60,
    color: '#4C4776',
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'left'
  },
  sectionTitle2: {
    marginLeft: 30,
    marginTop: 20,
    color: '#4C4776',
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'left'
  },
  items: {
    marginTop: 30,
  },

  //Share Feelings
  shareTitle: {
    color: "#4C4776",
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 70,
    textAlign: 'left',
    marginBottom: 30

  },
  button: {
    marginTop: 8,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginLeft:20,
    width: 120
    /**shadowRadius: 10,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.15,*/
    },
    buttonText:{
      textAlign: 'center',
      color: '#6F5534'
    },
    buttonText2:{
      textAlign: 'center',
      color: '#7E2A2A'
    },
  itemText: {
    marginTop: 8,
    fontSize: 25,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#6F5534'
  },
  itemText2: {
    marginTop: 8,
    fontSize: 25,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#7E2A2A'
  },
  bodyText: {
    marginTop: 8,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: 'normal',
    color: '#968168',
    width: 210
  },
  bodyText2: {
    marginTop: 8,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: 'normal',
    color: '#C17878',
    width: 210
  },
  addButton: {
    width: 75,
    height: 75,
    position: 'absolute',
    bottom: 30,
    right: 25,
    zIndex: 10
  },

  item: {
    padding: 10,
    backgroundColor: '#F5EBDD',
    width: 350,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  item2: {
    padding: 10,
    backgroundColor: '#FEDCE0',
    width: 350,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  shareImage: {
    width: 100,
    height:140,
    marginRight: 10, 
    resizeMode: 'contain'
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    marginLeft: 300,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },

  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});