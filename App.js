import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import {Navbar} from "./src/components/Navbar";
import {MainScreen} from "./src/screen/MainScreen";
import {TodoScreen} from "./src/screen/TodoScreen";

async function loadApplication() {
   await Font.loadAsync({
       'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
       'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
   })
}

export default function App() {
    const [isReady, setIsReady] = useState(false);
    const [todoId, setTOdoId] = useState(null);
    const [todoList, setTodo] = useState([
        // {
        //     id: '1',
        //     title: 'firstTodo'
        // }
    ]);

    if(!isReady){
        return <AppLoading
            startAsync={loadApplication}
            onError={error => console.log(error)}
            onFinish={() => setIsReady(true)}
        />
    }

    const addTodo = (title) => {
        setTodo((prev) => {
            return [
                ...prev,
                {
                    id: Date.now().toString(),
                    title
                }
            ].reverse();
        })
    }

    const removeTodo = (id) => {
        const todo = todoList.find(t=>t.id === id)
        Alert.alert(
            "Удаление элемента",
            `Вы уверены, что хотите удалить \"${todo.title}\"`,
            [
                {
                    text: "Отмена",
                    style: "cancel"
                },
                {
                    text: "Да",
                    style: 'destructive',
                    onPress: () => {
                        setTOdoId(null);
                        setTodo(prev => prev.filter(todo => todo.id !== id))
                    }
                }
            ],
            { cancelable: false }
        );

        //setTodo(prev => prev.filter(todo => todo.id !== id))
    }

    const updateTodo = (id, title) => {
        setTodo(old => old.map(todo => {
            if(todo.id === id) {
                todo.title = title;
            }
            return todo;
        }))
    }

    let content = (
        <MainScreen
            todoList={todoList}
            addTodo={addTodo}
            removeTodo={removeTodo}
            openTodo={(id)=>setTOdoId(id)} // === openTodo={setTOdoId}

       />
    );

    if(todoId){
        let selectedTodo = todoList.find(todo => todo.id === todoId)
        content = <TodoScreen
            onRemove={removeTodo}
            goBack={() => {setTOdoId(null)}}
            todo={selectedTodo}
            onSave={updateTodo}
        />
    }

    return (
        <View style={styles.container}>
            <Navbar title="ToDo_App"/>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    todos: {
        paddingHorizontal: 15,
    }
});
