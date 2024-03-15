import { View ,StyleSheet,Text, Alert} from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../constants/styles";
import { useState } from "react";
import Button from "../component/UI/Button";
import { getDate } from "../util/GetFormattedDate";
function ExpenseForm({onCancel,onSubmit,submitButtonLabel, defaultValues}){
    const [inputValue, setInputValue] = useState({
        amount:defaultValues? defaultValues.amount.toString() :'',
        description: defaultValues? defaultValues.description :'' ,
        date: defaultValues ? getDate(defaultValues.date):""
    })

    function inputChangeHandler(inputIdentifier, enteredValue){
        setInputValue((currentInputValues)=>
       {return{
        ...currentInputValues,[inputIdentifier]: enteredValue,
       }

        })
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputValue.amount,
            description: inputValue.description,
            date : new Date(inputValue.date)
        };
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount >0;
        const dateIsValid = expenseData.date.toString() !=='Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length >0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            Alert.alert("Invalid INput", "Pllease check your iNPUT valllues");
            return ;
        }

        onSubmit(expenseData)
    }

    return (
        <View style={styles.form} >
            <Text style={styles.title}>Your Expenses</Text>
                <View style={styles.inputsRow}>
                <Input style={styles.rowInput} label="Amount" textInputConfig={{
                keyboardType:"decimal-pad",
                onChangeText:inputChangeHandler.bind(this, 'amount'),
                value:inputValue.amount,
            }}
                />
            <Input label="Date" style={styles.rowInput} textInputConfig={{
                placeholder:"YYYY-MM-DD",
                maxLength: 10,
                onChangeText:inputChangeHandler.bind(this, 'date'),
                value:inputValue.date,
            }} />
                </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                autoCapitalize: 'none',
                autoCorrect:false,
                onChangeText:inputChangeHandler.bind(this, 'description'),
                value:inputValue.description,
            }}/>
            <View style={styles.buttonsContainer}>
                <Button mode="flat" onPress={onCancel} style={styles.button} >Cancel</Button>
                <Button mode="flat" onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
        form:{
            marginTop:40,
        },
        title:{
            fontSize:24,
            color:"white",
            fontWeight:'800',
            textAlign:'center',
            marginBottom:6,
            width:280,
            marginHorizontal:50,

        },
        inputsRow:{
            flexDirection:'row',
            justifyContent:'space-between',

        }  ,
        rowInput:{
            flex:1,
        }, 
         button:{
            minWidth:12,
            marginHorizontal:8,
        },
        buttonsContainer:{
            flexDirection:"row",
            justifyContent:'center',
            alignItems:"center",
        }
})