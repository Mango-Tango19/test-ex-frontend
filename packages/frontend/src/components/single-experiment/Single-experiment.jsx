import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useExperiment } from "./useExperiment";
import LogsTable from "../logs-table/LogsTable";

import TableData from "../table/TableData";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
	overflowX: "scroll",
	overflowY: "scroll",
	maxHeight: "250px",
	minHeight: "250px",
}));

const SingleExperiment = () => {
	const { state, toggleRequest } = useExperiment();

	const { isSending, collectedData, realtimeData } = state;

	console.log({ realtimeData });
	console.log({ collectedData });

	const handleClick = () => {
		toggleRequest();
	};

	const ItemWrapper = (props) => {
		return collectedData.length === 0 ? props.message : props.component;
	};

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid xs={12} md={12} item>
				<Button variant='outlined' onClick={handleClick}>
					{isSending ? "Стоп" : "Старт"}
				</Button>
			</Grid>
			<Grid xs={12} md={6} item>
				<ItemWrapper
					message={<Item>Таблица</Item>}
					component={
						<Item>
							<TableData data={collectedData} />
						</Item>
					}
				/>
			</Grid>
			<Grid xs={12} md={6} item>
				<ItemWrapper
					message={<Item>Логи данных</Item>}
					component={<Item>
						<LogsTable data={realtimeData}/>
					</Item>}
				/>
			</Grid>

			<Grid xs={12} item>
				<ItemWrapper
					message={<Item>График</Item>}
					component={<Item>Component</Item>}
				/>
			</Grid>

			{/* <Grid xs={12} item>
				<Item>Будущий результат</Item>
			</Grid> */}
		</Grid>
	);
};

export default SingleExperiment;
