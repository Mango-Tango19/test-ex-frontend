import { Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from './components/sidebar/Sidebar'
import Paper from '@mui/material/Paper';

function App() {
  return (
    <Paper
    sx={{
      p: 2,
    }}
  >
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            {/* <Route path='experiment/*' element={<Experiments />} />
            <Route path='experiment/:id' element={<SingleExperiment />} /> */}
          </Routes>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default App;
