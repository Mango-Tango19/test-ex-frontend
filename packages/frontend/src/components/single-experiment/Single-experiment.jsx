import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
	overflow: "hidden",
    minHeight: '200px'
}));

const SingleExperiment = () => {
	return (
		<Grid container rowSpacing={2} columnSpacing={3}>
			<Grid xs={12} md={6} item>
				<Item>основной график эксперимента</Item>
			</Grid>
			<Grid xs={12} md={6}  item>
				<Item>окно с логом приходящих данных</Item>
			</Grid>
			<Grid xs={12} md={6}  item>
				<Item>табличная часть эксперимента</Item>
			</Grid>
			<Grid xs={12} md={6} item>
				{/* <Item>Будущий результат</Item> */}
			</Grid>
		</Grid>
	);
};

export default SingleExperiment;
