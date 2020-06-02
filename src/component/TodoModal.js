import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
    TextInput,
    Keyboard
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faPlus, faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import styles from '../style/listDetail';
import colors from './color';
export default class TodoModal extends Component {

    state = {
        newTodo: ""
    }

    toggleTodoCompleted = (index) => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    }

    renderItem = (item, index) => {
        return(
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={()=> this.toggleTodoCompleted(index)}>
                    <FontAwesomeIcon
                        icon={item.completed ? faCheckSquare : faSquare}
                        color={colors.gray}
                        size={24}
                        style={{width: 32}}
                    />
                </TouchableOpacity>
                <Text style={
                        [styles.todo,{
                            color: item.completed ? colors.gray : colors.black,
                            textDecorationLine: item.completed ? 'line-through' : 'none'
                        }]
                    }
                >
                    {item.title}
                </Text>
            </View>
        )
    }

    addTodo=() => {
        let list = this.props.list
        list.todos.push({title: this.state.newTodo, completed: false})

        this.props.updateList(list)
        this.setState({newTodo: ""})
        Keyboard.dismiss();
    }

    render() {
        const list = this.props.list;
        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo=>todo.completed).length;

        return(
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        onPress={this.props.closeModal} 
                        style={{position: 'absolute', top: 16, right: 16, zIndex: 10}} 
                    >
                        <FontAwesomeIcon icon={faTimes} color={colors.black} />
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>{completedCount} of {taskCount} Tasks</Text>
                        </View>
                    </View>

                    <View style={[styles.section, {flex: 3}]}>
                        <FlatList
                            data={list.todos}
                            renderItem={({item, index})=> this.renderItem(item, index)}
                            keyExtractor={item => item.title}
                            contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={[styles.section, styles.footer]} behavior="padding">
                        <TextInput
                            style={[styles.input, {borderColor: list.color}]} 
                            onChangeText={text => this.setState({newTodo: text})} 
                            value={this.state.newTodo}
                        />
                        <TouchableOpacity onPress={() => this.addTodo()} style={[styles.addTodo, {backgroundColor: list.color}]}>
                            <FontAwesomeIcon icon={faPlus} size={16} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}