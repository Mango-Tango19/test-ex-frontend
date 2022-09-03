import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";

const DataChart = ({ realtimeData, collectedData }) => {
	const getData = (arr) => {
		return arr.map((item) => {
			return {
				sensor: item.payload.value,
				time: new Date(item.payload.timestamp),
			};
		});
	};

	const state = {
		options: {
			autoSize: true,
			series: [
				{
					data: getData(realtimeData),
					xKey: "time",
					yKey: "sensor",
					yName: "realtime data",
					stroke: "#03a9f4",
					marker: {
						fill: "#03a9f4",
						stroke: "#0276ab",
					},
				},
				{
					data: getData(collectedData),
					xKey: "time",
					yKey: "sensor",
					yName: "collected data",
					stroke: "#8bc24a",
					marker: {
						fill: "#8bc24a",
						stroke: "#658d36",
					},
				},
			],
			axes: [
				{
					type: "time",
					position: "bottom",
				},
				{
					type: "number",
					position: "left",
					label: {
						format: "",
					},
				},
			],
			legend: {
				position: "top",
			},
		},
	};

	return <AgChartsReact options={state.options} />;
};

export default DataChart;
