import React, { Component } from 'react';
import { view } from 'react-easy-state';
import './App.css';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import Store from './store';

class App extends Component {
	componentDidMount() {
		const ls = localStorage.getItem('emprestimos');

		if (ls) {
			const parsed = JSON.parse(ls);
			const cleaned = parsed.map(x => {
				const clone = { ...x };
				clone.dataEmprestimo = new Date(clone.dataEmprestimo);
				clone.dataDevolucao = new Date(clone.dataDevolucao);
				return clone;
			});
			const biggestID = Math.max(...cleaned.map(x => x.id));
			Store.emprestimos = cleaned;

			if (biggestID && biggestID > 0) {
				Store.id = biggestID;
			}
		}
	}

	render() {
		return (
			<div className='App'>
				<Header />
				<Table />
			</div>
		);
	}
}

export default view(App);
