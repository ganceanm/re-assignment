export const transformQuery = (query) => {
	let transformed = "?";

	Object.entries(query).forEach((element, index) => {
		if (element[1] || element[1] === false) {
			transformed += `${index === 0 ? "" : "&"}${element[0]}=${element[1]}`;
		}
	});

	return transformed.trim().replace(/\s/g, "%20");
};
