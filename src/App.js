import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { auth } from "./app/firebase";
import {
	setUserLoginDetails,
	setSignOutState,
	selectIsAuth,
} from "./features/auth/userSlice";

import { Counter } from "./features/counter/Counter";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./features/auth/register/Register";
import Login from "./features/auth/login/Login";
import Header from "./features/ui/nav/Header";
import NoMatch from "./pages/NoMatch";
import AnimeList from "./features/anime-list/AnimeList";
import Anime from "./features/anime/Anime";

//process.env.REACT_APP_NOT_SECRET_CODE
const queryClient = new QueryClient();

function App() {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				dispatch(
					setUserLoginDetails({
						email: user.email,
						isAuth: true,
					})
				);
				//const uid = user.uid;
			} else {
				// User is signed out
				dispatch(setSignOutState());
			}
		});
	}, [isAuth]);

	return (
		<QueryClientProvider client={queryClient}>
			<Header isAuth={isAuth}>
				<Link to="/">Home</Link>
				<Link to="/anime-list">Anime List</Link>
			</Header>
			<Routes>
				<Route
					index
					path=""
					element={
						<ProtectedRoute isAuth={isAuth}>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route
					path="anime/:id"
					element={
						<ProtectedRoute isAuth={isAuth}>
							<Anime />
						</ProtectedRoute>
					}
				/>
				<Route
					path="anime-list"
					element={
						<ProtectedRoute isAuth={isAuth}>
							<AnimeList />
						</ProtectedRoute>
					}
				/>
				<Route
					path="counter"
					element={
						<ProtectedRoute isAuth={isAuth}>
							<Counter />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<NoMatch />} />
			</Routes>
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}

export default App;
