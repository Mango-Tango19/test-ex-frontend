import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
}));

const Sidebar = () => {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "grid",
				gridTemplateColumns: "1fr",
				gridTemplateRows: "1fr 2fr",
				rowGap: "20px",
			}}
		>
			<Stack>
				<Typography variant='h5'>ICSep AN2</Typography>
			</Stack>

			<Stack spacing={2}>
				<Item>
					<Stack direction='row' spacing={2}>
						<Typography variant='body1' gutterBottom>
							Состояние:
						</Typography>
						<Typography variant='body1' gutterBottom>
							включён
						</Typography>
					</Stack>
				</Item>
				<Item>
					<Stack direction='row' spacing={2}>
						<Typography variant='body1' gutterBottom>
							Температура:
						</Typography>
						<Typography variant='body1' gutterBottom>
							290 К
						</Typography>
					</Stack>
				</Item>
				<Item>
					<Stack direction='row' spacing={2}>
						<Typography variant='body1' gutterBottom>
							Напряжение:
						</Typography>
						<Typography variant='body1' gutterBottom>
							220 В
						</Typography>
					</Stack>
				</Item>
			</Stack>
		</Box>
	);
};

export default Sidebar;
