import React from 'react';
import { view } from 'react-easy-state';
import './Header.css';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderInputContainer from './HeaderInputContainer/HeaderInputContainer';

const Header = view(() => {
	return (
		<div className='header'>
			<HeaderLogo />
			<HeaderInputContainer />
		</div>
	);
});

export default Header;
