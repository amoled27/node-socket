import React from 'react';
import linkedList from './linked-list.js';
import css from './linked-list-view.module.css';


class LinkedListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        }
        this.list = new linkedList();
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
    render() {
        return (
            <div className="container" className={css.node_container}>
                <h5>Linked List</h5>
                {this.headArrow()}
                {this.state.nodes.map((node, index) => {
                    return <div className={css.node} style={{ background: node.bgColor }} key={index}>{node.value}</div>
                })}
            </div>
        )
    }
}
export default LinkedListView; 