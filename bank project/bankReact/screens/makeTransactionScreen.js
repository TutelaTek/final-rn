import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import TransactionModel from '../models/transactionModel';
import Colors from '../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
//import { CATEGORIES, MEALS } from '../data/dummy-data';
//import MealItem from '../components/MealItem';

const MakeTransactionScreen = props => {

    const [fromAccount, setFromAccount] = useState();
    const [toAccount, setToAccount] = useState();
    const [ammount, setAmmount] = useState();
    const [transactionType, setTransactionType] = useState();


    const [isLoading, setloading] = useState(true);
    const [data, setData] = useState([]);
    let isToAccount;
    
    const fromAccountHandler = inputText  => {
        setFromAccount(inputText.replace(/[^1-3]/g, ''));
        console.log();
    }

    const toAccountHandler = inputText  => {
        setToAccount(inputText.replace(/[^1-3]/g, ''));
    }

    const ammountHandler = inputText  => {
        setAmmount(inputText.replace(/[^0-9]/g, ''));
    }

    const transferTypeHandler = inputText  => {
        setTransactionType(inputText.replace(/[^1-2]/g, ''));
    }

    const CreateTransaction = async () => {
        try {
            if(toAccount === '' || ammount ==='' || transactionType === ''){
                Alert.alert("invalid input!", 'All input fields must be put in with the exception of the from account', [{ text: 'Okay', style:'destructive'}])
                return ;
            }
            if(fromAccount === ''){
                fromAccount = null;
            }

            const url = new URL(Colors.url +'/trans/transaction')//, params = {transactionID:catId};
            console.log(url);
            //Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            console.log(url);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new TransactionModel( ammount, toAccount, fromAccount, transactionType))
            });
            const json = await response.json();
            console.log(json);
            props.navigation.navigate({ 
                routeName: 'Accounts'});
            
            setData(json);
        
        } catch (error) {
            console.error(error);
        } finally {

            //setloading(false);
            
        }
        
        }

/*
    useEffect(() => {
        CreateTransaction();
    }, []);*/
    
    return(
        <View style={styles.screen}>
            <Text style={styles.header}>From Account</Text>
            <TextInput style={styles.input} onChangeText={fromAccountHandler} value={fromAccount} blurOnSubmit autoCapitalize='none' keyboardType="numeric" maxLength={1}/>
            <Text style={styles.header}>To Account</Text>
            <TextInput style={styles.input} onChangeText={toAccountHandler} value={toAccount} blurOnSubmit autoCapitalize='none' keyboardType="numeric" maxLength={1}/>
            <Text style={styles.header}>Ammount</Text>
            <TextInput style={styles.input} onChangeText={ammountHandler} value={ammount} blurOnSubmit autoCapitalize='none' keyboardType="numeric" maxLength={6}/>
            <Text style={styles.header}>Transaction Type</Text>
            <TextInput style={styles.input} onChangeText={transferTypeHandler} value={transactionType} blurOnSubmit autoCapitalize='none' keyboardType="numeric" maxLength={1}/>
            <View style={styles.buttonContainer}>
            <Button title="Transfer" color={Colors.primaryColor} onPress={() => {CreateTransaction()}}/>
            </View>
        </View>
    );
};




const styles = StyleSheet.create({
    screen:{
        height: '100%'
    },
    header: {
        paddingTop: 25,
        fontFamily: 'open-sans-bold',
        fontSize: 25,
        color: Colors.primaryColor
    },
    input: {
        borderWidth: .75,
        borderColor: 'black',
        padding: 5
    },
    button: {
        fontFamily: 'open-sans-bold',
        fontSize: 25,
        
    },
    buttonContainer: {
        flex: 1,
        marginTop: 50,
        alignSelf: 'center',
        bottom: 15,
        
    }
});
export default MakeTransactionScreen;