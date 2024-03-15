import { View, FlatList ,Text} from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpensesItem(itemdata){
    return (
       <ExpenseItem {...itemdata.item}/>
    )
}

function ExpensesList({expenses}){
    return(
        <View>
            <FlatList data={expenses} renderItem={renderExpensesItem} keyExtractor={(item)=> item.id}/>
        </View>
    )
}

export default ExpensesList;