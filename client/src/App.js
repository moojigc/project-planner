import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider as UserProvider } from "./utils/UserContext";
import { Provider as FlashProvider } from "./utils/FlashContext";
import Login from "./pages/Login";
import userAPI from "./utils/userAPI";
import Task from "./pages/Task";
import Register from "./pages/Register";
import theme from "./utils/theme";
import { ThemeProvider } from "@material-ui/core";
import Navbar from "./components/Navbar";
import "./App.scss";
import Welcome from "./pages/Welcome";
import UserProfile from "./pages/UserProfile";

function App() {
	const [user, setUser] = useState({
		auth: false,
		username: "Guest",
		_id: ""
	});
	const [flash, setFlash] = useState({
		message: "",
		type: "error" || "success"
	});

	useEffect(() => {
		userAPI
			.checkStatus()
			.then((res) => {
				setUser({ ...res.user });
				console.log(res.user);
			})
			.then(() => console.log(user));
	}, []);
	return (
		<Router>
			<UserProvider value={{ user, setUser }}>
				<FlashProvider value={{ flash, setFlash }}>
					<ThemeProvider theme={theme}>
						<Navbar />
						<Switch>
							<Route exact path="/">
								{user.auth ? <UserProfile /> : <Redirect to="/welcome" />}
							</Route>
							<Route exact path="/welcome">
								<Welcome />
							</Route>
							<Route exact path="/login">
								<Login />
							</Route>
							<Route exact path="/task">
								<Task />
							</Route>
							<Route exact path="/signup">
								<Register />
							</Route>
						</Switch>
					</ThemeProvider>
				</FlashProvider>
			</UserProvider>
		</Router>
	);
}

export default App;
