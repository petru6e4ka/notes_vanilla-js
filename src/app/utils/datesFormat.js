export const datesFormat = (iso) => {
	const data = new Date(iso)
		.toDateString('', { year: 'numeric', month: 'long', day: 'numeric' })
		.split(' ')
		.slice(1);

	return `${data[0]} ${data[1]}, ${data[2]}`;
};

export default datesFormat;
