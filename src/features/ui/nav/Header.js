import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import * as style from "../../../app/styled-variables";
import { setSignOutState } from "../../auth/userSlice";
import { auth } from "../../../app/firebase";

const Header = (props) => {
	const dispatch = useDispatch();

	const handleLogOut = (e) => {
		e.preventDefault();
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				dispatch(setSignOutState());
			})
			.catch((error) => {
				// An error happened.
			});
	};

	return (
		<>
			<Nav>
				{props.isAuth ? (
					<ItemsWrap>
						{props.children.map((child, i) => {
							return <LinkWrap key={`headerItem-${i}`}>{child}</LinkWrap>;
						})}
					</ItemsWrap>
				) : (
					<ItemsWrap></ItemsWrap>
				)}
				<LinkWrap>
					{props.isAuth ? (
						<a href="/logout" onClick={(e) => handleLogOut(e)}>
							Logout
						</a>
					) : (
						<Link to="/login">Login</Link>
					)}
				</LinkWrap>
			</Nav>
			<Placeholder className="placeholder"></Placeholder>
		</>
	);
};

const Nav = styled.nav`
	position: fixed;
	top: 0;
	left: 0;
	height: 60px;
	background-color: ${style.HEADER_BG_COLOR};
	width: 100%;
	z-index: 100;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 60px;

	@media only screen and (max-width: 639px) {
		padding: 0 20px;
	}
`;

const ItemsWrap = styled.div`
	display: flex;
	gap: 20px;
`;

const LinkWrap = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	a {
		cursor: pointer;
		display: inline;
		vertical-align: middle;
		color: #fff;
		line-height: 0;
		margin-bottom: 3px;
		text-decoration: none;
	}
`;

const Placeholder = styled.div`
	position: relative;
	height: 60px;
	z-index: 0;
`;

export default Header;
