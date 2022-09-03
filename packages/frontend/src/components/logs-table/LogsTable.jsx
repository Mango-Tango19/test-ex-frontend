import Typography from '@mui/material/Typography';

const LogsTable = ({ realtimeData, collectedData }) => {

	return (
		<div>
			{collectedData.map((item) => {
				return (
					<Typography variant='subtitle1' gutterBottom sx={{ color: 'black' }}>
						collected data {item.payload.value} :{" "}
						{new Date(item.payload.timestamp).toLocaleTimeString()}
					</Typography>
				);
			})}
			{realtimeData.map((item) => {
				return (
					<Typography  variant='subtitle1'>
						realTime data {item.payload.value} :{" "}
						{new Date(item.payload.timestamp).toLocaleTimeString()}
					</Typography>
				);
			})} 
		</div>
	);
};

export default LogsTable;
