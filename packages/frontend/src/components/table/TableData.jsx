import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableData = ({ data }) => {
	function createData(name, value) {
		return { name, value };
	}

	const rows = data.map((item) => {
		return createData('Источник 1', item.payload.value);
	});

	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Источник</TableCell>
						<TableCell align='right'>Значение</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, idx) => (
						<TableRow
							key={idx}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								{row.name}
							</TableCell>
							<TableCell align='right'>{row.value}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableData;
