import React from 'react';
import { view } from 'react-easy-state';
import './CheckBox.css';

const CheckBox = view(({ onClick }) => {
	return (
		<div className='checkbox'>
			<input
				type='checkbox'
				className='checkbox-input'
				onClick={() => onClick()}
			/>
			<span className='checkbox-title'>Mostrar objetos devolvidos</span>
		</div>
	);
});

export default CheckBox;
