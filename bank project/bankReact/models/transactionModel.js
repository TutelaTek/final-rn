class TransactionModel {
    constructor(transactionAmmount, toAccountID, fromAccountID, transactionType) {
        
        this.transactionAmmount = transactionAmmount;
        this.toAccountID = toAccountID;
        this.fromAccountID = fromAccountID;
        this.transactionType = transactionType; 
    }
};

export default TransactionModel;