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
    segregateEvenOdd = (listIndex) => {
        //getting the selected list from the lists
        let currentList = this.state.linkedLists[listIndex];
        let currentNode = currentList.head;
        let prevNode = null;
        let index = 1;
        let evenList = new DoublyLinkedList();
        while (currentNode !== null) {
            if (index % 2 === 0) {
                // push even to new linked list
                evenList.push(currentNode.value);
                //remove current from existing LL & update address
                prevNode.next = currentNode.next;
                if (currentNode.next) {
                    currentNode.next.prev = prevNode;
                }
                currentNode = prevNode;
            } 
            //update increment pointer
            prevNode = currentNode;
            currentNode = currentNode.next;
            index++;
        }
        console.log(currentList, 'list')
        console.log(evenList, 'evn')
        //display lists
    }

    render = () => {
        return (
            <div className={css.node_container + " container"}>
                <h5>Linked List</h5>
                <p>No of Linked lists: {this.state.linkedLists.length}</p>
                <button className="btn btn-primary" onClick={this.createDoublyLinkedList}>Create a doubly linked list</button>

                {this.state.linkedLists.map((list, index) => {
                    return <LinkedList key={index} list={list} segregate={this.segregateEvenOdd} listIndex={index} nodes={this.state.nodesArray[index] ? this.state.nodesArray[index] : []} />
                })}
            </div>
        )
    }
}

export default LinkedLists;