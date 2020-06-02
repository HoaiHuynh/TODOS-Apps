import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Modal
} from 'react-native';
import styles from '../style/list';
import TodoModal from './TodoModal';

export default class TodoList extends Component{

    state = {
        showListVisible: false
    }

    toggleListModal(){
        this.setState({showListVisible: !this.state.showListVisible})
    }

    render() {
        const list = this.props.list;

        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;

        return(
            <View>
                <Modal
                    animationType="slide"
                    visible={this.state.showListVisible}
                    onRequestClose={()=>this.toggleListModal()}
                >
                    <TodoModal
                        list={list}
                        updateList={this.props.updateList} 
                        closeModal={()=> this.toggleListModal()} 
                    />
                </Modal>
                <TouchableOpacity
                    style={[styles.listContainer, {backgroundColor: list.color}]}
                    onPress={()=>this.toggleListModal()}
                >
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>
        
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subtitle}>Completed</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}