import { store } from 'react-easy-state';
import Moment from 'moment';

const calcularDiferencaDias = (dataEmprestimo, dataDevolucao) => {
	const d1 = dataEmprestimo.getTime();
	const d2 = dataDevolucao.getTime();
	const date1 = Moment(d1).startOf('day');
	const date2 = Moment(d2).startOf('day');
	const result = date2.diff(date1, 'days');

	return result;
};

const Store = store({
	id: 0,
	objeto: '',
	pessoa: '',
	dataEmprestimo: new Date(),
	dataDevolucao: null,
	emprestimos: [],

	addEmprestimo() {
		const { id, objeto, pessoa, dataEmprestimo, dataDevolucao } = Store;
		Store.emprestimos.push({
			id,
			objeto,
			pessoa,
			dataEmprestimo,
			dataDevolucao,
			devolvido: false
		});

		Store.id += 1;
		Store.objeto = '';
		Store.pessoa = '';
		Store.dataEmprestimo = new Date();
		Store.dataDevolucao = null;

		localStorage.setItem('emprestimos', JSON.stringify(Store.emprestimos));
	},

	devolverEmprestado(id) {
		const el = Store.emprestimos.find(x => x.id === id);
		if (el) {
			el.devolvido = true;
			localStorage.setItem(
				'emprestimos',
				JSON.stringify(Store.emprestimos)
			);
		}
	},

	removeEmprestimo(id) {
		Store.emprestimos = Store.emprestimos.filter(x => x.id !== id);
		localStorage.setItem('emprestimos', JSON.stringify(Store.emprestimos));
	},

	handleObjeto(ev) {
		Store.objeto = ev.target.value;
	},

	handlePessoa(ev) {
		Store.pessoa = ev.target.value;
	},

	handleDataEmprestimo(date) {
		Store.dataEmprestimo = date;
	},

	handleDataDevolucao(date) {
		Store.dataDevolucao = date;
	},

	findEmprestimo(id) {
		return Store.emprestimos.find(x => x.id === id);
	},

	isVencido(e) {
		const emp = Store.findEmprestimo(e.id);
		return calcularDiferencaDias(new Date(), emp.dataDevolucao) < 0;
	},

	isPraHoje(e) {
		const emp = Store.findEmprestimo(e.id);
		return calcularDiferencaDias(new Date(), emp.dataDevolucao) === 0;
	},

	isNoPrazo(e) {
		const emp = Store.findEmprestimo(e.id);
		return calcularDiferencaDias(new Date(), emp.dataDevolucao) > 0;
	}
});

export default Store;
