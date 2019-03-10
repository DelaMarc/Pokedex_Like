import React, { PureComponent } from 'react';
import { View, Image,  FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import PokeCard from '../PokeCard';
import styles from './styles';

export default class PokeList extends PureComponent {
        state = {
        //Assign an array to your pokeList state
        pokeList: [],
        loading: true
    }
    static navigationOptions = {
        title: 'List of Pokemon'
    }
    async componentCatchThemAll() {
        try {
            const pokemonApiCall = await fetch('https://pokeapi.co/api/v2/pokemon/');
            const pokemon = await pokemonApiCall.json();
            this.setState({pokeList: pokemon.results, loading: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }
    render() {
        const { pokeList, loading } = this.state;
        const { navigation } = this.props;
        if(!loading) {
            return <FlatList
                    data={pokeList}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.name}/>
        } else {
            return <ActivityIndicator />
        }
    }
}
