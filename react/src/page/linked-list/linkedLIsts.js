import React from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';

import LinkedList from '../../libs/linked-list';
import LinkedListView from './linked-list-view';
import css from './linkedLists.module.css';

class LinkedLists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            linkedLists: [],
            nodesArray: {},
            examCenterLists: {
                lists: [],
                nodes: {}
            },
        }
    }

    //creates a new linked list 
    createLinkedList = () => {
        let linkedList = new LinkedList();
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

    createExamCenter = () => {
        if (this.state.linkedLists.length) {
            let examCenter = new LinkedList();
            examCenter.head = this.state.linkedLists[0].head;
            examCenter.tail = this.state.linkedLists[0].tail;
            examCenter.length = this.state.linkedLists[0].length;
            for (let i = 1; i < this.state.linkedLists.length; i++) {
                examCenter.tail.next = this.state.linkedLists[i].head;
                examCenter.tail = this.state.linkedLists[i].tail;
                examCenter.length += this.state.linkedLists[i].length;
            }
            this.shuffleList(examCenter);
        } else {
            //show error
            // toastr.error('No linkedlists present!');
        }
    }

    shuffleList = (list) => {
        let noOfExamCenters = this.state.linkedLists.length;
        let examCenter = new LinkedList();

        while (list.length !== 0 || list.head !== null) {
            let randomIndex = Math.floor(Math.random() * (list.length - 1));
            let deletedNode = list.deleteAtindex(randomIndex);
            if (deletedNode) {
                examCenter.push(deletedNode.value);
            }
        }
        let breakPtIndex = Math.floor(examCenter / noOfExamCenters);
        let currentNode = examCenter.head;
        for (let i = 1; i <= examCenter.length; i++) {
            currentNode = currentNode.next;
            if (i % breakPtIndex === 0) {
                // currentNode
            }
        }
    }

    render = () => {
        return (
            <div className={css.node_container + " container"}>
                <h5>Linked List</h5>
                <p>No of Linked lists: {this.state.linkedLists.length}</p>
                <button className="btn btn-primary" onClick={this.createLinkedList}>Create a list</button>
                <button className="btn btn-primary" onClick={this.createExamCenter}>Generate Exam Centers</button>
                {this.state.linkedLists.map((list, index) => {
                    return <LinkedListView key={index} list={list} listIndex={index} nodes={this.state.nodesArray[index] ? this.state.nodesArray[index] : []} />
                })}
            </div>
        )
    }
}

export default LinkedLists;