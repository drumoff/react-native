import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert, Keyboard} from 'react-native';
import {AntDesign} from '@expo/vector-icons';


import {THEME} from "../theme";
import {AppButton} from "./ui/AppButton";

export const AddToDo = ({onSubmit}) => {
    const [val, setValue] = useState('');

    const pressHandler = () => {
        if(!val.trim()){
            Alert.alert('Полe не может быть пустым');
        } else {
            onSubmit(val);
            setValue('');
            Keyboard.dismiss();
        }

    }

    return(
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText = {text => setValue(text)}
                value={val}
                placeholder="Задача"
                autoCorrect ={false}
                autoCopitaliza = "sentences"
            />
            <AppButton onPress={pressHandler}>
                <AntDesign name='plus' size={30}/>
            </AppButton>
            {/*<Button title="Добавить" onPress={pressHandler} />*/}
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    input: {
        width: '75%',
        borderBottomColor: THEME.MAIN_COLOR,
        borderStyle: 'solid',
        borderBottomWidth: 1.5,
        padding: 5,
    }

});