import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useExperiment } from "./useExperiment";
import { useState } from "react";
import { useEffect } from "react";


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

    const { isSending, collectedData } = state

	console.log({collectedData})

	//const [ experimentData, setExperimentData ] = useState([])

	// useEffect(() => {

	// 	setExperimentData((prev) => ([...prev, collectedData]))

	// }, collectedData)

	const handleClick = () => {
		toggleRequest();
	};

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid xs={12} md={12} item>
				<Button variant='outlined' onClick={handleClick}>
					{isSending ? "Стоп" : "Старт"}
				</Button>
               
			</Grid>
	
			<Grid xs={12} md={6} item>
				{/* <Item>{
					experimentData.length === 0 ? 
						 'лог приходящих данных' : experimentData.map((item) => {
							return <span> {item} </span>
						})
					}</Item> */}
					<Item></Item>
			</Grid>
			<Grid xs={12} md={6} item>
				<Item>Табличная часть эксперимента</Item>
			</Grid>
		
            <Grid xs={12} item>
				<Item>График</Item>
			</Grid>
            {/* <Grid xs={12} item>
				<Item>Будущий результат</Item>
			</Grid> */}
		</Grid>
	);
};

export default SingleExperiment;
