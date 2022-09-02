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
	data: [],
	loading: true,
	error: false,
	collectedData: [],
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

		case "request_success": {
			return {
				...state,
				status: "work",
				data: [...state.data, ...action.payload],
			};
		}

		case "send_collected_data": {
			return {
				...state,
				collectedData: [...state.collectedData, ...action.payload],
				data: [],
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
		let collectedData = [];
		socket.on("message", (data) => {
			if (data.source === "server" && data.cmd === "data") {
				collectedData.push(data);
			}
		});

		timer = setInterval(() => {
			console.log("timeout start");
			dispatch({ type: "send_collected_data", payload: collectedData });
		}, 3000);
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
