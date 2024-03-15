import { useContext, useLayoutEffect } from "react";
import { Text, View ,StyleSheet} from "react-native";
import IconButton from "../component/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../component/UI/Button";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../ManageExpense/ExpenseForm";
import  storeExpense,{  deleteExpense, updateExpense } from "../util/http";

function ManageExpenses({route,navigation}){
    const expenseCtx = useContext(ExpenseContext)
    const editedExpenseId = route.params?.expenseId;

    const isEditing = !!editedExpenseId;
    const selectedExpense = expenseCtx.expenses.find((expense)=> expense.id === editedExpenseId)
    useLayoutEffect(()=>{
        navigation.setOptions({
            title : isEditing ?  "Edit Expenses" :"Add Expenses"
        });
    },[navigation,isEditing])

   async function deleteExpenseHandler(){
         deleteExpense(editedExpenseId);
        // expenseCtx.deleteExpenses(editedExpenseId)
        navigation.goBack();
    }
    function cancelHandler(){
            navigation.goBack();

    }

    async function confirmHandler(expenseData){
        if(isEditing){
            expenseCtx.updateExpenses(editedExpenseId,expenseData);
        //  await updateExpense(editedExpenseId, expenseData);
         

        }else{
            console.log(expenseData)
         const id = await storeExpense(expenseData);
         console.log(id)
            expenseCtx.addExpenses({...expenseData, id : id})
        }
        navigation.goBack();

    }

    return(
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler} submitButtonLabel={isEditing ? "Update":"Add"} 
            defaultValues={selectedExpense}
            onSubmit={confirmHandler}/>
            
            {isEditing && 
            <View style={styles.deleteContainer}>
            <IconButton icon="trash" color={GlobalStyles.colors.error500} size={25} onPress={deleteExpenseHandler}/>
            </View>}
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container:{
            flex:1,
            padding :24,
            backgroundColor:GlobalStyles.colors.primary800,

    },
    deleteContainer:{
        marginTop:17,
        paddingTop:8,
        borderWidth:2, 
        borderTopColor:GlobalStyles.colors.primary100,
        alignItems:"center",

    },
  
})