import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity,ImageBackground} from 'react-native';
const accountItems = props => {
    return (
        <View style={styles.accountItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <Text>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    accountItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#E5E7E9',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 30,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10
    },
    
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    }
});
export default accountItems;