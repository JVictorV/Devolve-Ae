import { store } from 'react-easy-state';

const calcularDiferencaDias = (dataEmprestimo, dataDevolucao) => {
	const d1 = dataEmprestimo.getTime();
	const d2 = dataDevolucao.getTime();
	const day = 24 * 60 * 60 * 1000;
	const diff = d2 - d1;
	const result = Math.round(diff / day);

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
			dataDevolucao
		});

		Store.id += 1;
		Store.objeto = '';
		Store.pessoa = '';
		Store.dataEmprestimo = new Date();
		Store.dataDevolucao = null;

		localStorage.setItem('emprestimos', JSON.stringify(Store.emprestimos));
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
