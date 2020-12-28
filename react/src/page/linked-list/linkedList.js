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

    reverseLinkedList = () => {
        let currentNode = this.list.head;
        let prevNode = null;
        //point tail pointer to first node
        this.tail = currentNode.head;
        while (currentNode.next !== null) {
            // reverse node links
            let tempNode = currentNode.next;
            currentNode.next = prevNode;
            prevNode = currentNode;
            currentNode = tempNode;
        }
        currentNode.next = prevNode;
        this.list.head = currentNode;
        console.log(this.list)
        this.updateNodes();
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
                <button className="btn btn-warning" onClick={this.reverseLinkedList} >Segment</button>
                {this.headArrow()}
                {this.state.nodes.map((node, index) => {
                    return <div className={css.node} style={{ background: node.bgColor }} key={index}>{node.value}</div>
                })}
            </div>
        )
    }
}
export default LinkedList; 