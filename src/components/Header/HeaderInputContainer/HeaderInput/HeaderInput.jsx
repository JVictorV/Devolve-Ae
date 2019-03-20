import React from 'react';
import { view } from 'react-easy-state';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import './HeaderInput.css';

registerLocale('pt-BR', ptBR);

const normalInput = (type, value, onChange) => {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder='???'
			className='header-input-box'
		/>
	);
};

const dateInput = (value, onChange) => {
	return (
		<DatePicker
			selected={value}
			onChange={onChange}
			className='header-input-box'
			dateFormat='d MMMM YYYY'
			locale='pt-BR'
			placeholderText='???'
		/>
	);
};

const HeaderInput = view(({ type, name, value, onChange }) => {
	return (
		<div className='header-input'>
			<span className='header-input-name'>{name}</span>
			{type === 'date'
				? dateInput(value, onChange)
				: normalInput(type, value, onChange)}
		</div>
	);
});

export default HeaderInput;
