import React from 'react';
import css from './linked-list-view.module.css';


class LinkedListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        }
        this.list = this.props.list;
    }

    
    //updates the linked list after a node is pushed
    updateList() {
        let lastNode = this.list.tail;
        this.setState({
            nodes: [...this.state.nodes, { value: lastNode.value}]
        });
    }

    //returns UI component for Head arrow
    headArrow = () => {
        return this.props.nodes.length ? <div className={css.head}>Head<img alt="head_arrow" className="img img-fluid" src="right-arrow.svg"></img></div> : null;
    }


    render() {
        return (
            <div className={css.node_container + " container"}>
                <h5>Linked List no. {this.props.listIndex}</h5>
                {this.headArrow()}
                {this.props.nodes.map((node, index) => {
                    return <div className={css.node} style={{ background: node.bgColor }} key={index}>{node.value}</div>
                })}
            </div>
        )
    }
}
export default LinkedListView; 