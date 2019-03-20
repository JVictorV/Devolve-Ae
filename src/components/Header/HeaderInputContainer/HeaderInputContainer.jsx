import React from 'react';
import { view } from 'react-easy-state';
import HeaderInput from './HeaderInput/HeaderInput';
import './HeaderInputContainer.css';

import Store from '../../../store';

const HeaderInputContainer = view(() => {
	const {
		objeto,
		pessoa,
		dataEmprestimo,
		dataDevolucao,
		handleObjeto,
		handlePessoa,
		handleDataDevolucao,
		handleDataEmprestimo,
		addEmprestimo
	} = Store;
	return (
		<div className='header-input-container'>
			<HeaderInput
				type='text'
				name='Emprestou o quê?'
				value={objeto}
				onChange={handleObjeto}
			/>
			<HeaderInput
				type='text'
				name='Pra quem?'
				value={pessoa}
				onChange={handlePessoa}
			/>
			<HeaderInput
				type='date'
				name='Quando?'
				value={dataEmprestimo}
				onChange={handleDataEmprestimo}
			/>
			<HeaderInput
				type='date'
				name='Data de devolução'
				value={dataDevolucao}
				onChange={handleDataDevolucao}
			/>
			<button
				type='button'
				className='header-input-submit'
				onClick={() => addEmprestimo()}
			>
				Adicionar
			</button>
		</div>
	);
});

export default HeaderInputContainer;
