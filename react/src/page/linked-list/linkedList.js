import React from 'react';
import linkedList from '../../libs/linkedList.js';
import css from './linkedList.module.css';


class LinkedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            evenList: {}
        }
        this.list = new linkedList();
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
        let lastNode = this.list.tail;
        this.setState({
            nodes: [...this.state.nodes, { value: lastNode.value, bgColor: this.generateRandomColor() }]
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

    segmentEvenOdd = () => {
        let currentNode = this.list.head;
        let prevNode = {};
        let index = 1;
        let evenLinkedList = new linkedList();
        while (currentNode !== null) {
            // for even nodes of the linkedlist
            if (index % 2 === 0) {
                //deleting the even node and making its, next null
                prevNode.next = currentNode.next;
                currentNode.next = null;
                evenLinkedList.push(currentNode.value);
                currentNode = prevNode.next;
            } else {
                //increment the index without delete
                prevNode = currentNode;
                currentNode = currentNode.next;
            }
            console.log(this.list, 'list'); //odd list
            console.log(evenLinkedList); //even list
            index++;
        }
        //update even linkedlist's tail
    }
    render() {
        return (
            <div className="container" className={css.node_container}>
                <h5>Linked List</h5>
                <button className="btn btn-warning" onClick={this.segmentEvenOdd} >Segment</button>
                {this.headArrow()}
                {this.state.nodes.map((node, index) => {
                    return <div className={css.node} style={{ background: node.bgColor }} key={index}>{node.value}</div>
                })}
            </div>
        )
    }
}
export default LinkedList; 