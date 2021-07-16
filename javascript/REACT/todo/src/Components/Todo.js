import React, { Component } from 'react'

export default class Todo extends Component {

    constructor(props){
        super(props);
        this.state={
            tasks:[{id:1,txt:'First'},{id:2,txt:'Second'},{id:3,txt:'Third'}],
            currtask:''
        }
    }

    handleChange=(e)=>{
        let currval=e.target.value;
        this.setState({currtask:currval});

    }

    handleClick=()=>{
        let nta=[...this.state.tasks,{id:this.state.tasks.length+1,txt:this.state.currtask}]
        this.setState({
            tasks:nta,
            currtask:''
        })
    }

    
    handleDelete=()=>{

    }

    
    render() {
        return (
            <div>

                <div className='Input-container'>
                    <input onChange={this.handleChange} value={this.state.currtask} type='text'></input>
                    <button onClick={this.handleClick}>add</button>
                </div>

                <div className='task-list'>
                    <ul>
                        {
                            this.state.tasks.map(
                                tasks=>(
                                    <li>
                                    <h1>{tasks.txt}</h1>
                                    <button onClick={this.handleDelete} >delete</button>
                                    </li>

                                )

                            )
                        }    
                    </ul>

                </div>

            </div>
        )
    }
}
