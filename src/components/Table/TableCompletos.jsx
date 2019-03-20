import React from 'react';
import { view } from 'react-easy-state';
import './Table.css';
import Store from '../../store';

const remove = x => {
	if (
		window.confirm(
			`Tem certeza que deseja remover o/a ${x.objeto} emprestado pra ${
				x.pessoa
			} da lista?`
		)
	) {
		Store.removeEmprestimo(x.id);
	}
};

const TableCompletos = view(() => {
	return (
		<div className='emprestimos'>
			<table className='emprestimos-table'>
				<thead>
					<tr>
						<th>Pessoa</th>
						<th>Objeto</th>
						<th>Empréstimo</th>
						<th>Devolução</th>
					</tr>
				</thead>
				<tbody>
					{Store.emprestimos
						.filter(x => x.devolvido)
						.map(x => {
							return (
								<tr key={x.id} onClick={() => remove(x)}>
									<td>{x.pessoa}</td>
									<td>{x.objeto}</td>
									<td>
										{x.dataEmprestimo.toLocaleDateString()}
									</td>
									<td>
										{x.dataDevolucao.toLocaleDateString()}
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
});

export default TableCompletos;
