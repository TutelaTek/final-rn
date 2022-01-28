
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Colors from '../constants/Colors';

import AccountScreen from '../screens/accountScreen';
import AccountsScreen from '../screens/accountsScreen';
import MakeTransactionScreen from '../screens/makeTransactionScreen';
import TransactionDetailScreen from '../screens/transactionDetailScreen';



const BankNavigator = createStackNavigator({
    Accounts: {
        screen: AccountsScreen,
       navigationOptions: {
           headerTitle: 'Accounts'
       }
    },
    Account: {
        screen: AccountScreen,
       
    },
    MakeTransaction: {
        screen: MakeTransactionScreen,

    },
    
    TransactionDetail: TransactionDetailScreen
}, 
{
    defaultNavigationOptions: {
        
        headerStyle: {
            backgroundColor: Colors.primaryColor,
        },
        headerTintColor: 'white'
       
    }
});


export default createAppContainer(BankNavigator);
