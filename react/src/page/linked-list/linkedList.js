import React from 'react';
import circularLinkedList from '../../libs/circularLinkedList.js';
import css from './linkedList.module.css';


class LinkedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        }
        this.list = new circularLinkedList();
    }

    componentDidMount = () => {
        //listens to push in the socket
        this.props.socket.on('node', (value) => {
            this.list.push(value);
            this.updateList();
        })
    }

    //updates the linked list after a node is pushed
    updateList = () => {
        let currentNode = this.list.head;
        //iterate till last node 
        console.log(this.list.length);
        for (let i = 0 ; i < this.list.length - 1; i++) {
            currentNode = currentNode.next;
        }
        this.setState({
            nodes: [...this.state.nodes, { value: currentNode.value, bgColor: this.generateRandomColor() }]
        });
    }

    //returns UI component for Head arrow
    headArrow = () => {
        return this.state.nodes.length ? <div className={css.head}>
            Head
        <img alt="head_arrow" className="img img-fluid" src="right-arrow.svg"></img>
        </div> : null;
    }

    //generates random color for the node
    generateRandomColor = () => {
        let hexString = '0123456789ABCDEF';
        let color = '#';
        //append the random letters from hexstring to create a random # code for color
        for (let i = 0; i < 6; i++) {
            color += hexString[Math.floor(Math.random() * hexString.length)];
        }
        return color;
    }

    checkIfCircularLinkedlist = () => {
        let currentNode = this.list.head;

        for (let i = 0; i < this.list.length; i++) {
            currentNode = currentNode.next;
        }
        if (currentNode.next === null) {
            alert ('not a circular linkedlist');
        } else {
            alert('Circular linked list');
        }
    }

    updateNodes = () => {
        ///update node state
        let nodes = [];
        let currentNode = this.list.head;
        while (currentNode !== null) {
            nodes.push({ value: currentNode.value, bgColor: this.generateRandomColor() });
            currentNode = currentNode.next;
        }
        this.setState({ nodes: nodes });
    }

    render() {
        return (
            <div className="container" className={css.node_container}>
                <h5>Linked List</h5>
                <button className="btn btn-warning" onClick={this.checkIfCircularLinkedlist}>Check if Circular</button>
                {this.headArrow()}
                {this.state.nodes.map((node, index) => {
                    return <div className={css.node} style={{ background: node.bgColor }} key={index}>{node.value}</div>
                })}
            </div>
        )
    }
}
export default LinkedList; 