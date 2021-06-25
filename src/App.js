import './App.css';
import Register from './Registratie/Register';
import Login from './Login/Login';
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCSRFToken, loginUser } from './actions';
import { Provider } from 'react-redux';
import { store } from './store';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'js-cookie';
import VragenlijstVerzenden from './Vragenlijst/VragenlijstVerzenden';
import Dashboard from './Dashboard/Dashboard';
import CodeInvoeren from './CodeInvoeren/CodeInvoeren';
import { PrivateRoute } from './PrivateRoute';
import Opgeslagen from './Opgeslagen/Opgeslagen';
import Antwoorden from './Antwoorden component/Antwoorden';
import EmailCard from './email component/EmailCard';
import Aanmaken from './Vragenlijst/Aanmaken/Aanmaken';
import Questions from './Questions/Questions';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Provider store={store}>
						<Route exact path="/">
							<Login />
						</Route>

						<Route exact path="/codeinvoeren">
							<CodeInvoeren />
						</Route>

						<Route path="/codeinvoeren/:code">
							<CodeInvoeren />
						</Route>
						<Route path="/vragen" component={Questions} />
						<Route path="/Register">
							<Register />
						</Route>
						<Route path="/Login">
							<Login />
						</Route>
						<PrivateRoute
							authed={this.props.logged_in}
							path="/dashboard"
							component={Dashboard}
						/>
						<PrivateRoute
							authed={this.props.logged_in}
							path="/verzenden"
							component={VragenlijstVerzenden}
						/>
						<PrivateRoute
							authed={this.props.logged_in}
							path="/opgeslagen"
							component={Opgeslagen}
						/>
						<PrivateRoute
							authed={this.props.logged_in}
							path="/antwoorden"
							component={Antwoorden}
						/>
						<PrivateRoute
							authed={this.props.logged_in}
							path="/emails"
							component={EmailCard}
						/>
						<PrivateRoute
							authed={this.props.logged_in}
							path="/aanmaken"
							component={Aanmaken}
						/>
					</Provider>
				</Switch>
			</Router>
		);
	}

	componentDidMount() {
		const csrfURL =
			'http://api-ipmedt4.tychovanveen.nl/public/sanctum/csrf-cookie/';
		axios
			.get(csrfURL, {
				withCredentials: true,
				credentials: 'same-origin',
			})
			.then((response) => {
				let token = Cookies.get('XSRF-TOKEN');
				this.props.getCSRFToken(token);
			});
	}
}

const mapStateToProps = (state) => {
	return { csrfToken: state.csrfToken, logged_in: state.logged_in };
};

export default connect(mapStateToProps, { getCSRFToken: getCSRFToken })(App);
