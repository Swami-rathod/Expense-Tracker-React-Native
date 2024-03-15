import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getDate } from "../../util/GetFormattedDate";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({id,description, amount, date}){
    const navigation = useNavigation();


    function expensePressHandler(){
            navigation.navigate("ManageExpenses",{
                expenseId : id,
            });
    }

    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed }>
            <View style={styles.expenseItem}>
            <View >
                <Text style={[styles.textBase, styles.description]}>{description}</Text>
                <Text style={styles.textBase}>{getDate(date)}</Text>
            
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
            </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles= StyleSheet.create({
    expenseItem:{
            padding :12,
            marginVertical :8,
            backgroundColor: GlobalStyles.colors.primary500,
            flexDirection :"row",
            justifyContent :'space-between',
            borderRadius :6,
            elevation :4,
            shadowColor :GlobalStyles.colors.gray500,
            shadowOffset:{width :1, height :1},
            shadowOpacity : 0.4,
            shadowRadius :4,
    }, 
    textBase :{
        color : GlobalStyles.colors.primary50,

    },
    description :{
        fontSize:18,
        fontWeight :"bold",

    },
    amountContainer :{
        paddingHorizontal :12,
        paddingVertical : 4,
        backgroundColor:"white",
        justifyContent:'center',
        textAlign :"center",
        borderRadius : 6,
        minWidth :80,

    },
    amount:{
        fontWeight :"bold",
        color : GlobalStyles.colors.primary500,
    },
    pressed : {
        opacity:0.7,
    }
})