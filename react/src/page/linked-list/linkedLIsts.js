import React from 'react';
import Linkedlist from '../../libs/linkedList';
import DoublyLinkedList from '../../libs/doublyLinkedList';
import LinkedList from './linkedList.js';
import css from './linkedLists.module.css';

class LinkedLists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            linkedLists: [],
            nodesArray: {},
        }
    }

    //creates a new linked list 
    createLinkedList = () => {
        let linkedList = new Linkedlist();
        this.setState({ linkedLists: [...this.state.linkedLists, linkedList] });
    }

    //create a new doubly linked list 
    createDoublyLinkedList = () => {
        let linkedList = new DoublyLinkedList();
        this.setState({ linkedLists: [...this.state.linkedLists, linkedList] });
    }

    //generates random color for the node
    generateRandomColor() {
        let hexString = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += hexString[Math.floor(Math.random() * hexString.length)];
        }
        return color;
    }

    componentDidMount = () => {
        //listens to push in the socket
        this.props.socket.on('node', (nodeData) => {
            nodeData = JSON.parse(nodeData);
            //map linkedlists with the nodes
            if (this.state.linkedLists[nodeData.id]) {
                //getting array of nodes of linkedlist with id => nodeData.id
                let listNodeArray = this.state.nodesArray[nodeData.id];
                listNodeArray = listNodeArray ? [...listNodeArray, { value: nodeData.value, bgColor: this.generateRandomColor() }] : [{ value: nodeData.value, bgColor: this.generateRandomColor() }];
                //updating array in the state
                this.state.nodesArray[nodeData.id] = listNodeArray;

                //updating the linked list 
                this.state.linkedLists[nodeData.id].push(nodeData.value);
                this.setState({ nodesArray: this.state.nodesArray, linkedLists: this.state.linkedLists });
            }
        });
    }

    //checking the type of linkedlis
    listTypeChecker = (listIndex) => {
       let currentNode = this.state.linkedLists[listIndex].head;
       /*if a node has prev as null, the node is initialized and prev is set to null => its doubly linked list */
       if (currentNode.prev === null) {
           window.alert('Its a doubly linked list');
       } else {
       /*if a node has prev as undefined, the js  initializes obj property as undefined => its not doubly linked list */
        window.alert('Oops! not a doubly linked list');

       }
    }
    render = () => {
        return (
            <div className={css.node_container + " container"}>
                <h5>Linked List</h5>
                <p>No of Linked lists: {this.state.linkedLists.length}</p>
                <button className="btn btn-primary" onClick={this.createLinkedList}>Create a list</button>
                <button className="btn btn-primary" onClick={this.createDoublyLinkedList}>Create a doubly linked list</button>

                {this.state.linkedLists.map((list, index) => {
                    return <LinkedList key={index} list={list} checkListType={this.listTypeChecker} listIndex={index} nodes={this.state.nodesArray[index] ? this.state.nodesArray[index] : []} />
                })}
            </div>
        )
    }
}

export default LinkedLists;