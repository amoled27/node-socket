import React from 'react';
import DoublyLinkedList from '../../libs/DoublyLInkedList.js';
import css from './linkedList.module.css';


class LinkedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        }
        this.list = new DoublyLinkedList();

    }

    componentDidMount() {
        //listens to push in the socket
        this.props.socket.on('node', (value) => {
            this.list.push(value);
            this.updateList();
        })
    }

    //updates the linked list after a node is pushed
    updateList() {
        let lastNode = this.list.tail;
        this.setState({
            nodes: [...this.state.nodes, { value: lastNode.value, bgColor: this.generateRandomColor() }]
        });
    }

    //returns UI component for Head arrow
    headArrow() {
        return this.state.nodes.length ? <div className={css.head}>
            Head
        <img alt="head_arrow" className="img img-fluid" src="right-arrow.svg"></img>
        </div> : null;
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

    //remove duplicates from sorted linkedlist
    removeDuplicateNodes = () => {
        let nodeMap = {};
        let currentNode = this.list.head;
        let prevNode = {};
        while (currentNode.next !== null) {
            if (currentNode.value in nodeMap) {
                nodeMap[currentNode.value] = nodeMap[currentNode.value] + 1;
                prevNode.next = currentNode.next;
                if (currentNode.next) {
                    currentNode.next.prev = prevNode;
                }
                currentNode = currentNode.next;
            } else {
                prevNode = currentNode;
                nodeMap[currentNode.value] = 1;
                currentNode = currentNode.next;
            }
        }
        //handle condition for the last node
        if (currentNode.value in nodeMap) {
            prevNode.next = null;
            this.list.tail = prevNode;
        }
        this.updateNodes(this.list);
    }

    //update the nodes[] state to reflect updated lists in UI
    updateNodes = () => {
        let nodes = [];
        let currentNode = this.list.head;
        while (currentNode !== null) {
            nodes.push({ value: currentNode.value, bgColor: this.generateRandomColor() });
            if (currentNode)
                currentNode = currentNode.next;
        }
        this.setState({ nodes: nodes });
    }

    render() {
        return (
            <div className="container" className={css.node_container}>
                <h5>Linked List</h5>
                <button className="btn btn-success" onClick={this.removeDuplicateNodes}>Remove Duplicates</button>
                {this.headArrow()}
                {this.state.nodes.map((node, index) => {
                    return <div className={css.node} style={{ background: node.bgColor }} key={index}>{node.value}</div>
                })}
            </div>
        )
    }
}
export default LinkedList; 