import React from 'react';
import {Link} from 'react-router-dom';
let Style = {
    cardBody: {
        boxShadow: "7px 6px 8px #d0cdcd",
        borderRadius: "11px",
        padding: "15px",
        border: "1px solid #efefef"
    },
    card: {
        width: "350px"
    },
    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #d6d4d4"
    },
    btn: {
        margin: "10px",
        padding: "10px 20px",
        background: "#67a5ca",
        border: "0px",
        color: "#fff",
        borderRadius: "6px",
        fontWeight: "600",
        cursor: "pointer"
    }
};
class NodeAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeValue: ''
        }
    }

    inputHandler() {
        this.props.socket.emit('nodeValue', this.state.nodeValue);
    }
    updateInput(e) {
        this.setState({ nodeValue: e.target.value });
    }
    render() {
        return (
            <div>
                <Link to={"/linkedlist"} target="_blank" style={{fontSize: "20px"}}> Linked List</Link>
                <div style={Style.card}>
                    <div style={Style.cardBody}>
                        <h3>Add a Node</h3>
                        <input type="text" style={Style.input} onChange={this.updateInput.bind(this)}></input>
                        <button style={Style.btn} onClick={this.inputHandler.bind(this)}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NodeAdder; 