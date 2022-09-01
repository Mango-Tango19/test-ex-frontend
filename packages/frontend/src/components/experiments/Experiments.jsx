import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./Experiments.css";

const experiments = [
	{
		id: 1,
		label: "Phenomenex Lux",
		descriotion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	},

	{
		id: 2,
		label: "Phenomenex Chirex",
		descriotion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	},
	{
		id: 3,
		label: "Hypersil Hypercarb",
		descriotion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	},
	{
		id: 4,
		label: "Shinwa Ultron ES",
		descriotion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	},
	{
		id: 5,
		label: "Shiseido Ceramospher and Chiral",
		descriotion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	},
	{
		id: 6,
		label: "Sumika Sumichiral OA",
		descriotion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	},
];

const ExperimentCard = React.memo(({ cardDate }) => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography variant='h6' component='div' gutterBottom>
					{cardDate.label}
				</Typography>
				<Typography sx={{ fontSize: 14 }} color='text.secondary'>
					{cardDate.descriotion}
				</Typography>
			</CardContent>
			<CardActions>
				<Link to='/experiments/1' className='card_link'>
					Подробнее
				</Link>
			</CardActions>
		</Card>
	);
});

const Experiments = () => {
	const [cards, setCards] = React.useState(experiments);

	const [term, setTerm] = React.useState("");
	const handleChange = (event) => {
		setTerm(event.target.value);
	};

	const handleSearch = (term) => {
		

		if (term.length === 0) {
			return experiments;
		}

		return cards.filter((card) => {
			return card.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
		});

	
	};

	React.useEffect(() => {
		let cards = handleSearch(term);
        setCards(cards)
	}, [term]);

	return (
		<Grid container direction='column'>
			<Box
				sx={{
					"& > :not(style)": { mb:2, width: "25ch" },
				}}
			>
				<Stack>
					<TextField
						id='outlined-name'
						label='Поиск'
						value={term}
						onChange={handleChange}
					/>
				</Stack>
			</Box>
			<Box>
				<Grid container spacing={2}>
					{cards.map((item) => {
						return (
							<Grid item xs={4} key={item.id}>
								<ExperimentCard cardDate={item} />
							</Grid>
						);
					})}
				</Grid>
			</Box>
		</Grid>
	);
};

export default Experiments;
