import React, { Component } from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from '../style/modal';
import colors from './color';
import tempData from './tempData';

export default class AddListModal extends Component {
    backgroundColor = ["#5CD859","#24A6D9","#595BD9","#8022D9","#D159D8","#D85963","#D88559"]
    state = {
        name: "",
        color: this.backgroundColor
    }

    renderColor() {
        return this.backgroundColor.map(color=>{
            return(
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, {backgroundColor: color}]}
                    onPress={()=> this.setState({color})}
                />
            );
        })
    }

    createTodo=()=> {
        const {name, color} = this.state;
        
        const list = {name,color}

        this.props.addList(list);

        this.setState({name:""});
        this.props.closeModal();
    }

    render() {
        return(
            <KeyboardAvoidingView style={styles.modalContainer} behavior='padding'>
                <TouchableOpacity onPress={this.props.closeModal} style={{position: 'absolute', top: 16, right: 16}}>
                    <FontAwesomeIcon icon={faTimes} color={colors.black} />
                </TouchableOpacity>

                <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                    <Text style={styles.modalTitle}>Create Todo List</Text>
                    <TextInput 
                        onChangeText={(name)=> this.setState({name: name})} 
                        style={styles.input} 
                        placeholder="List Name?"
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
                        {this.renderColor()}
                    </View>
                    <TouchableOpacity
                        onPress={this.createTodo}
                        style={[styles.create, {backgroundColor: this.state.color}]}
                    >
                        <Text style={{color: colors.white, fontWeight: '600'}}>Create</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}