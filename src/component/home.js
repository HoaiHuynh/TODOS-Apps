import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from '../style/styles';
import colors from './color';
import tempData from './tempData';
import TodoList from './todoList';
import AddListModal from './AddListModal';

export default class Home extends Component{

    state = {
        addTodoVisible: false,
        lists: tempData,
    }


    toggleAddTodoModal(){
        this.setState({addTodoVisible: !this.state.addTodoVisible});
    }

    renderList = (list) => {
        return <TodoList list={list} updateList={this.updateList} />
    }

    addList = (list) => {
        let newTodo = {
            ...list,
            id: this.state.lists.length + 1,
            todos: []
        }
        this.setState({lists: [...this.state.lists, newTodo]});
        console.log(this.state.lists)
    }

    updateList = (list) => {
        this.setState({
            lists: this.state.lists.map(item => {
                return item.id === list.id ? list : item;
            })
        });
    };

    render(){
        return(
            <View style={styles.container}>
                <Modal
                    animationType='slide'
                    visible={this.state.addTodoVisible}
                    onRequestClose={()=>this.toggleAddTodoModal()}    
                >
                    <AddListModal closeModal={()=>this.toggleAddTodoModal()} addList={this.addList}/>
                </Modal>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.divider}/>
                    <Text style={styles.title}>
                        Todo <Text style={{fontWeight: '300', color: colors.blue}}>List</Text>
                    </Text>
                    <View style={styles.divider}/>
                </View>
                <View style={{marginVertical: 48}}>
                    <TouchableOpacity style={styles.addList} onPress={()=>this.toggleAddTodoModal()}>
                        <FontAwesomeIcon icon={faPlus} color={colors.lightBlue} />
                    </TouchableOpacity>

                    <Text style={styles.add}>Add List</Text>
                </View>

                <View style={{height: 275, paddingLeft: 16}}>
                    <FlatList
                        data={this.state.lists}
                        renderItem={({item})=>this.renderList(item)}
                        keyExtractor={item => item.name}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyboardShouldPersistTaps='always'
                    />
                </View>
            </View>
        );
    }
}
