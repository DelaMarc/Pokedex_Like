import React from 'react';
// import { StyleSheet, Text, View  } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import PokeList from './App/components/PokeList';
import Pokemon from './App/components/Pokemon';
import Home from './App/components/Home';

// export default class App extends React.Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.pokeListHeader}>Pokemon API</Text>
//             </View >
//         );
//     }
// }

const RootStack = createStackNavigator({
    //Define your screens.
    Home: { screen: Home },
    PokeList: { screen: PokeList },
    Pokemon: {screen: Pokemon }
  },
  {
    initialRouteName:  'Home'
  })


//Export default the stateless component
const App = () => {
  return <RootStack />
}

export default App;
