import React, { Component } from 'react';
import { view } from 'react-easy-state';
import './App.css';
import Header from './components/Header/Header';
import TableIncompletos from './components/Table/TableIncompletos';
import TableCompletos from './components/Table/TableCompletos';
import Store from './store';
import CheckBox from './components/CheckBox/CheckBox';

class App extends Component {
	state = {
		checked: false
	};

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

			if (biggestID >= 0) {
				Store.id = biggestID + 1;
			}
		}
	}

	switchState = () => {
		const { checked } = this.state;
		this.setState({ checked: !checked });
	};

	render() {
		const { checked } = this.state;
		return (
			<div className='App'>
				<Header />
				<CheckBox onClick={this.switchState} />
				{checked ? <TableCompletos /> : <TableIncompletos />}
			</div>
		);
	}
}

export default view(App);
