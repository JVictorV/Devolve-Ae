import React from 'react';
import { view } from 'react-easy-state';
import './Table.css';
import Store from '../../store';

const TableIncompletos = view(() => {
	const remove = x => {
		if (
			window.confirm(
				`Tem certeza que o/a ${x.objeto} emprestado pra ${
					x.pessoa
				} foi devolvido?`
			)
		) {
			Store.devolverEmprestado(x.id);
		}
	};

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
						.filter(x => !x.devolvido)
						.map(x => {
							let classN = '';

							if (Store.isVencido(x)) {
								classN = 'vencido';
							}

							if (Store.isPraHoje(x)) {
								classN = 'hoje';
							}

							if (Store.isNoPrazo(x)) {
								classN = 'no-prazo';
							}

							return (
								<tr
									key={x.id}
									className={classN}
									onClick={() => remove(x)}
								>
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

export default TableIncompletos;
