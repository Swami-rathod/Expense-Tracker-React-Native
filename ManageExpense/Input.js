import { TextInput, View ,Text, StyleSheet} from "react-native";
import { GlobalStyles } from "../constants/styles";


function Input({label, textInputConfig,style}){
    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline);
    }
    return (
        <View style={[styles.inputContainer,style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig}></TextInput>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8,
    },
    label:{
        fontSize:24,
        color:GlobalStyles.colors.primary100,
        marginBottom:4,
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        color:GlobalStyles.colors.primary700,
        padding:6,
        borderRadius:7,
        fontSize:18,
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:"top",
    }
})