import { useState } from "react";

export default function State(stateName, initialValue) {
	let [value, setValue] = useState(initialValue);

	return {
		name: stateName,
		value: value,
		set: (value) => {
			setValue(value);
		}
	}
}
