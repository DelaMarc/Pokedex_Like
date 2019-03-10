import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';


export default class Pokemon extends PureComponent {
    c
    render() {
        //Destruct your navigation props (NOT SETUP YET!)
        const { navigation } = this.props;
        return (
            <View>
                <Image source={{uri: 'https://res.cloudinary.com/aa1997/image/upload/v1535930682/pokeball-image.jpg'}}
                        style={styles.pokemonImage} />
                <Text style={styles.nameOfPokemon}>{navigation.getParam('name', 'Name of Pokemon')}</Text>
            </View>
        );
    }
)
