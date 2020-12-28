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
    updateNodes = (list, index) => {
    
    }

    //checking the type of linkedlis
    reverseLinkedList = (listIndex) => {
        let currentLinkedList = this.state.linkedLists[listIndex];
        let currentNode = currentLinkedList.head;
        let prevNode = null;
        while (currentNode.next !== null) {
            let temp = { ...currentNode };
            currentNode.next = prevNode;
            currentNode.prev = temp.next;
            prevNode = currentNode;
            currentNode = temp.next;
        }
        //last node condition
        currentNode.next = prevNode;
        currentNode.prev = null;

        currentLinkedList.tail = currentLinkedList.head;
        currentLinkedList.tail.next = null;
        currentLinkedList.head = currentNode;

        let linkedLists = this.state.linkedLists;
        linkedLists[listIndex] = currentLinkedList;
        this.setState({ linkedLists: linkedLists });
        // this.updateNodes(currentLinkedList, listIndex);
    }

    render = () => {
        return (
            <div className={css.node_container + " container"}>
                <h5>Linked List</h5>
                <p>No of Linked lists: {this.state.linkedLists.length}</p>
                <button className="btn btn-primary" onClick={this.createDoublyLinkedList}>Create a doubly linked list</button>

                {this.state.linkedLists.map((list, index) => {
                    return <LinkedList key={index} list={list} reverse={this.reverseLinkedList} listIndex={index} nodes={this.state.nodesArray[index] ? this.state.nodesArray[index] : []} />
                })}
            </div>
        )
    }
}

export default LinkedLists;