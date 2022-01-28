import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';

//import MealItem from '../components/MealItem';

const TransactionDetailScreen = props => {

    const catId = props.navigation.getParam('transactionId');


    const [isLoading, setloading] = useState(true);
    const [data, setData] = useState([]);
    let isToAccount;

    const getTransaction = async () => {
        try {

            const url = new URL(Colors.url + '/trans/transactionDetail/' + catId)//, params = {transactionID:catId};
            console.log(url);
            //Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            console.log(url);
            const response = await fetch(
                url
            );
            const json = await response.json();
            console.log(json);
            
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false);
        }
        
        }


    useEffect(() => {
        getTransaction();
    }, []);
    console.log(data + 'testing');
    return(
        <View style={styles.screen}>
            {isLoading ? <ActivityIndicator/> : (
            <View >
            <Text style={styles.header}>To Account</Text>
            <Text style={styles.data}>{data[0].ToAccountID}</Text>
            <Text style={styles.header}>From Account</Text>
            <Text style={styles.data}>{data[0].FromAccountID}</Text>
            <Text style={styles.header}>Transaction Ammount</Text>
            <Text style={styles.data}>{data[0].TransactionAmmount}</Text>
            <Text style={styles.header}>TransactionType</Text>
            <Text style={styles.data}>{data[0].TransactionType}</Text>
            </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 15,
    },
    header: {
        paddingTop: 25,
        fontFamily: 'open-sans-bold',
        fontSize: 25,
        color: Colors.primaryColor
    },
    data: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        paddingLeft: 25
    }
});
export default TransactionDetailScreen;