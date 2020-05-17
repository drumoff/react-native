import React from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import {AddToDo} from "../components/Addtodo";
import {Todo} from "../components/Todo";


export const MainScreen = ({addTodo, todoList, removeTodo, openTodo}) => {
    let content = <FlatList
        keyExtraktor ={item=>item.id.toString()}
        data={todoList}
        renderItem={({item})=>(
            <Todo todo={item}
                  onRemove={removeTodo}
                  onOpen={openTodo}
            />)
        }
    />;

    if(todoList.length === 0){
        content = <View style={styles.imgWrap}>
            <Image
                source={require('../../assets/original.png')}
                style={styles.img}
            />
        </View>
    }
    return (
        <View>
            <AddToDo onSubmit={addTodo}/>
            <View style={styles.todos}>

                {content}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    todos: {
        paddingHorizontal: 20,
    },
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    img:{
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})