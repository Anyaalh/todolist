import React from 'react';
import './App.css';
import {Button} from "./Button";

function App() {
    return (
        <div className="App">
            <div>
                <h3>What to learn</h3>
                <div>
                    <input/>
                    <Button title="+"/>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                    <li><input type="checkbox" checked={false}/> <span>React</span></li>
                </ul>
                <div>
                    <Button title="All"/>
                    <Button title="Active"/>
                    <Button title="Complited"/>
                </div>
            </div>
        </div>
    );
}

export default App;
