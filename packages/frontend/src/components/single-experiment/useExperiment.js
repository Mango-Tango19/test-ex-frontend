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
};

const reducer = (state, action) => {
	//console.log(`Action: ${action.type}; Payload:`, action.payload);
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
				data: [...state.data, action.payload],
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

	const getData = () => {
		socket.on("message", (data) => {
			if (data.source === "server" && data.cmd === "data") {
				dispatch({ type: "request_success", payload: data });
			}
		});
	};

	const performRequest = useCallback(() => {
		socket.emit("message", { cmd: "test:start", source: "client" });
		dispatch({ type: "request_start" });
		console.log("Test started");
		getData();
	});

	const stopRequest = useCallback(() => {
		socket.emit("message", { cmd: "test:stop", source: "client" });
		dispatch({ type: "request_stop" });
		console.log("Test stopped");
	});

	const toggleRequest = useCallback(
		() => dispatch({ type: "toggle_request" }),
		[]
	);

	useEffect(() => {
		if (state.isSending) {
			performRequest();
		} else {
			stopRequest();
		}
	}, [state.isSending]);

	return { state, toggleRequest };
};
