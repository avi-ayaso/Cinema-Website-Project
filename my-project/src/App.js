import { Route } from 'react-router';
import './App.css';
import LoginComp from './ProjectComps/LoginComp';
import MainComp from './ProjectComps/MainComp';
import RegisterComp from './ProjectComps/RegisterComp';

function App(){
	return (
		<div className="App">
			<h1>Movies - Subscriptions Web Site</h1>
			<Route path="/main" component={MainComp} />
			<Route path="/register" component={RegisterComp} />
			<Route path="/" exact component={LoginComp} />
		</div>
	);
}

export default App;
