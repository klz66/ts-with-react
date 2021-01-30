/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-28 22:59:36
 */
/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-28 14:33:09
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TodoList from './TodoList';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(<TodoList />, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
