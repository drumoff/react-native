import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {THEME} from '../theme';
import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/EditModal";
import {AppTextBold} from "../components/ui/AppTextBold";

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
                <Button title="Редактировать" onPress={()=>{setModal(true)}}/>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title='Назад' color={THEME.GREY_COLOR} onPress={goBack}/>
                </View>
                <View style={styles.button}>
                    <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)}/>
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