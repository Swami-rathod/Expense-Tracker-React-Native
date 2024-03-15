import { Text, View, useAnimatedValue } from "react-native";
import ExpensesOutput from "../component/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect } from "react";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/GetFormattedDate";
import { fetchExpenses } from "../util/http";
function RecentExpenses(){
        const expenseContext = useContext(ExpenseContext);

        useEffect(()=>{
                async function getExpenses(){
                 const expenses =   await fetchExpenses();
                 expenseContext.setExpenses(expenses);
                }
                getExpenses();
        },[])
        const recentExpenses = expenseContext.expenses.filter((expenses)=>{
            const today = new Date();
            const date7daysago = getDateMinusDays(today, 7);

            return (expenses.date >= date7daysago) && (expenses.date <= today);
        })

    return(
    
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No Recent Expenses"/>
    
    )
}

export default RecentExpenses;