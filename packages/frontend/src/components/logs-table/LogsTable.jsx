import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const LogsTable = ({ data }) => {

	function createData(sourсe, time, value) {
		return { sourсe, time, value };
	}

	const rows = data.map((item) => {
		return createData(item.source, item.payload.value, new Date(item.payload.timestamp).toLocaleTimeString());
	});

	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Источник</TableCell>
						<TableCell align='right'>Значение</TableCell>
                        <TableCell align='right'>Время</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, idx) => (
						<TableRow
							key={idx}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								{row.sourсe}
							</TableCell>
							<TableCell align='right'>{row.time}</TableCell>
                            <TableCell align='right'>{row.value}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default LogsTable;
