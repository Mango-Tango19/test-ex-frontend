import { Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from './components/sidebar/Sidebar'
import Paper from '@mui/material/Paper';
import Experiments from "./components/experiments/Experiments";
import SingleExperiment from "./components/single-experiment/Single-experiment";

function App() {
  return (
    <Paper
    sx={{
      p: 2,
    }}
  >
      <Grid container  sx={{ height: '100vh' }}>
        <Grid item xs={12} md={3} pr={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9} p={2} sx={{ background: 'rgba(0, 0, 0, 0.05);', borderRadius: '10px' }}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='experiment/*' element={<Experiments />} />
            <Route path='experiment/:id' element={<SingleExperiment />} />
          </Routes>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default App;
