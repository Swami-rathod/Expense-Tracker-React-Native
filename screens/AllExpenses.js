import { Text, View } from "react-native";
import ExpensesOutput from "../component/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/expenses-context";

function AllExpenses(){
    const expenseContext = useContext(ExpenseContext);

    return(
      
        <ExpensesOutput expenses={expenseContext.expenses} expensesPeriod="Total" fallbackText="No Expenses Saved"/>
      
    )
}

export default AllExpenses;