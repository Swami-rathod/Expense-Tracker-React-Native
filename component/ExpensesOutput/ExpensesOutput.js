import { View, StyleSheet ,Text} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";


function ExpensesOutput({expenses, expensesPeriod, fallbackText}){
    let content = <Text style={styles.messageText}>{fallbackText}</Text>

    if(expenses.length >0){
        content =  <ExpensesList expenses={expenses} />
    }

    return (
        <View style={styles.container}>
             <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
           
           {content}
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor : GlobalStyles.colors.primary700,
        
    },
    messageText:{
        color:'white',
        fontSize:24,
        padding:8,
        textAlign:'center',
        justifyContent:'center',
        fontWeight:'bold'
    }
})