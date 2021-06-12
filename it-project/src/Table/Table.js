import React from 'react';
import ReactDOM from 'react-dom';
import './Tablet.css'

export default props=>(
	<table className='table'>
		<thead>
			<tr className='cl'>
				<th onClick={function(){props.onSort('num')}}>Num</th>
				<th onClick={function(){props.onSort('Country')}}>Country</th>
				<th onClick={function(){props.onSort('TotalConfirmed')}}>Total Confirmed</th>
			</tr>
		</thead>
		<tbody>
			
			{props.arr.map(i=>(
				<tr className='cl2' key={i.ID} onClick={function(){props.onRowSelect(i)}}>
					<td>{i.num}</td>
					<td>{i.Country}</td>
					<td>{i.TotalConfirmed}</td>
				</tr>
			))}
			
		</tbody>
	</table>
)

