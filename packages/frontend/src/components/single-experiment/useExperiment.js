import { useCallback, useEffect, useReducer, useMemo } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8900";

const socket = socketIOClient(ENDPOINT);

socket.on("connect", function (data) {
	console.log("Connected to server");
});

socket.on("disconnecting", function (data) {
	console.log("Disconnected from server");
});

const initialState = {
	isSending: false,
	status: "idle",
	collectedData: [],
	dataToSend: [],
	realtimeData: [],
};

const reducer = (state, action) => {
	console.log(`Action: ${action.type}; Payload:`, action.payload);
	switch (action.type) {
		case "toggle_request": {
			return {
				...state,
				isSending: !state.isSending,
			};
		}
		case "request_start": {
			return {
				...state,
				status: "work",
			};
		}

		case "send_collected_data": {
			return {
				...state,
				collectedData: [...state.collectedData, action.payload],
			};
		}

		case "send_realtime_data": {
			return {
				...state,
				realtimeData: [...state.realtimeData, action.payload],
			};
		}

		case "request_stop": {
			return {
				...state,
				status: "work",
			};
		}
	}
};

export const useExperiment = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	let timer;

	const startInterval = () => {
		let realtimeData = [];
		socket.on("message", (data) => {
			if (data.source === "server" && data.cmd === "data") {
				dispatch({ type: "send_realtime_data", payload: data });
				realtimeData.push(data);
			}
		});

		timer = setInterval(() => {
			const newData = realtimeData.pop();
			dispatch({ type: "send_collected_data", payload: newData });
		}, 5000);
	};

	useEffect(() => {
		if (state.isSending) {
			performRequest();
			startInterval();
		} else {
			stopRequest();
		}
		return () => clearInterval(timer);
	}, [state.isSending]);

	const performRequest = useCallback(() => {
		socket.emit("message", { cmd: "test:start", source: "client" });
		dispatch({ type: "request_start" });
	});

	const stopRequest = useCallback(() => {
		socket.emit("message", { cmd: "test:stop", source: "client" });
		dispatch({ type: "request_stop" });
	});

	const toggleRequest = useCallback(
		() => dispatch({ type: "toggle_request" }),
		[]
	);

	return { state, toggleRequest };
};
