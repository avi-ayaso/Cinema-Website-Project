import { Route } from 'react-router';
import './App.css';
import LoginComp from './ProjectComps/LoginComp';
import MainComp from './ProjectComps/MainComp';
import RegisterComp from './ProjectComps/RegisterComp';

function App(){
	return (
		<div className="App" style={{ fontFamily: '-moz-initial' }}>
			<h1>My Cinema Web Site</h1>
			<Route path="/main" component={MainComp} />
			<Route path="/register" component={RegisterComp} />
			<Route path="/" exact component={LoginComp} />
		</div>
	);
}

export default App;
