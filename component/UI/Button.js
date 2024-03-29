import { Pressable, View, Text,StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({children, mode, onPress, style}){
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
                <View style={[styles.button , mode==='flat' && styles.flat]}>
                    <Text style={[styles.buttonText , mode==='flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button;

const styles = StyleSheet.create({
    button:{
        borderRadius:15,
        padding:8,
        backgroundColor:GlobalStyles.colors.primary800,

    },
    flat :{
        backgroundColor:"transparent",

    },
    buttonText :{
        color:"white",
        textAlign:"center",
    },
    flatText:{
        color:GlobalStyles.colors.primary200,
    },
    pressed:{
        opacity:0.7,
        backgroundColor:GlobalStyles.colors.primary100,
        borderRadius:4,
    }
})