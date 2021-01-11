const jsonTemplates = require('./processes.model.json');
const fs = require("fs/promises")

const getProcesses = async () => {
	const files = await fs.readdir("./processes");

	const processes = files
		.filter(e => !e.includes("processes."))
		.map(e => {
			prop = require("./" + e).desc();
			return {
				id: e.slice(0, -3),
				...prop
			}
		})

const response = await jsonTemplates.processes(processes);
return response;
}

const getProcess = async processId => {
	const process = await require("./" + processId).desc()

	const response = await jsonTemplates.process(processId,process);
	return response;
}

const postJob = async (processId,input) => {
	const response = await require("./" + processId).run(input)
	return response;
}

module.exports = {
	getProcesses,
	getProcess,
	postJob,
};