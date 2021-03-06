import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {THEME} from '../theme';
import {FontAwesome,AntDesign} from '@expo/vector-icons';

import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/EditModal";
import {AppTextBold} from "../components/ui/AppTextBold";
import {AppButton} from "../components/ui/AppButton";


export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
    const [modal, setModal] = useState(false);

    const saveHandler = (title) => {
        onSave(todo.id, title)
        setModal(false);
    }

    return (
        <View style={styles.todoWindow}>
            <EditModal
                value={todo.title}
                onSave={saveHandler}
                visible={modal}
                onCancel={()=>setModal(false)}
            />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={()=>{setModal(true)}}>
                    <FontAwesome name='edit' size={20}/>
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton color={THEME.GREY_COLOR} onPress={goBack}>
                        <AntDesign name='back' size={20} color='#fff'/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)}>
                        <FontAwesome name='remove' size={20}/>
                    </AppButton>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    card:{
        marginBottom: 20,
        padding: 15,
    },
    button: {
        width: '45%',
    },
    todoWindow: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
    }
})