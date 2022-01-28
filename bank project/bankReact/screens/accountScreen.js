import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
//import { CATEGORIES, MEALS } from '../data/dummy-data';
//import MealItem from '../components/MealItem';

const AccountScreen = props => {
    const catId = props.navigation.getParam('accountId');


    const [isLoading, setloading] = useState(true);
    const [data, setData] = useState([]);
    let isToAccount;

    const getAccounts = async () => {
        try {

            const url = new URL(Colors.url +'/transactions/' + catId )//, params = {accountID:catId};
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
        getAccounts();
    }, []);


    return(
    <View style={{ flex:1, padding: 24}}>
        <Text style={styles.header}>Transactions</Text>
        {isLoading ? <ActivityIndicator/> : (
        <FlatList 
        data={data}
        keyExtractor={(item) => item.TransactionID}
        renderItem={({ item}) => {

            if(item.ToAccountID == catId) {
                isToAccount = true;
            }else{
                isToAccount = false;
            }

            return(
            
            <TouchableOpacity
                
                style={styles.gridItem}
                onPress={() => {
                    console.log(props.navigation.navigate)
                    props.navigation.navigate({ 
                        routeName: 'TransactionDetail', 
                        params: {
                        transactionId: item.TransactionID
                    }});
                    }}
            >
                <View style={styles.container}>
                    <Text style={styles.title, isToAccount ? { color:'green' } : { color:'red' }}>${item.TransactionAmmount}</Text>
                </View>
            </TouchableOpacity>
            
            

        )}}
        />
        )}

        
    </View>
    );
};



const styles = StyleSheet.create({
    screen:{
       
    },
    gridItem: {
        flex: 1,
        margin: 5,
        height: 60,
        
        
    },
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#636466'
        
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: Colors.primaryColor
    },
    header: {
        fontFamily: 'open-sans-bold',
        fontSize: 25,
        padding: 5
    }
});
export default AccountScreen;