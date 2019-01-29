import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = (<Icon name="rocket" size={30} color="#900" />)
export default class Explore extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Bookcase
                </Text>
                {myIcon}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});