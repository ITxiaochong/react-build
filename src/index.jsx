import React from 'react';
import ReactDOM from 'react-dom';


import Game from '@/components/Game'
//必须导入样式
import './styles/game-style.scss'
// import Hello from '@/components/Clock';
// const myh1 = React.createElement('h1', null, 'test');
ReactDOM.render(<Game />, document.getElementById('app'));