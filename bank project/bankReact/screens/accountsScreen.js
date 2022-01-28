import React, { useEffect, useState} from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Colors from '../constants/Colors';
//import accountItems from '../components/accountItem';

//import MealItem from '../components/MealItem';

const AccountsScreen = props => {
    const [isLoading, setloading] = useState(true);
    const [data, setData] = useState([]);

    const getAccounts = async () => {
        try {
            const response = await fetch(
                Colors.url + '/accounts'
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

    /*
    const accountItem = (itemData) => {
        return (<AccountItem 
            title={itemData.item.title} 
            
            onSelect={() => {
            props.navigation.navigate({ 
                routeName: 'AccountScreen', 
                params: {
                categoryId: itemData.item.id
            }});
            }}/>);
    }
*/
    

 
    return(
        <View style={{ flex:1, padding: 24}}>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList 
            data={data}
            keyExtractor={(item) => item.AccountID}
            renderItem={({ item}) => (
                
                <TouchableOpacity
                    style={styles.gridItem}
                    onPress={() => {
                        console.log(props.navigation.navigate)
                        props.navigation.navigate({ 
                            routeName: 'Account', 
                            params: {
                            accountId: item.AccountID
                        }});
                        }}
                >
                    <View style={styles.container}>
                        <Text style={styles.title}>{item.AccountName.toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>
                
                

            )}
            />
            )}
            <View style={styles.buttoncontainer}>
            <Button style={styles.button} title={'Make transaction'} color={Colors.primaryColor} onPress={() => {props.navigation.navigate({ 
                        routeName: 'MakeTransaction', 
                        })
                    }}/>
            </View>
        </View>
    );
};

AccountsScreen.navigationOptions = {
    headerTitle: 'Accountsr'/*,
    headerStyle: {
        backgroundColor: Colors.primaryColor,
    },
    headerTintColor: 'white'
    */
};





const styles = StyleSheet.create({
    screen:{
        
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 100,
        
        
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c3c6c9'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: Colors.primaryColor
    },
    button: {
        
        fontFamily: 'open-sans-bold',
        fontSize: 25
        
    },
    buttoncontainer: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 15,
        
    }
});
export default AccountsScreen;