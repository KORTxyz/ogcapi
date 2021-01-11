const processesService = require('./processes.service');


const getProcesses = (req, res, next) =>{
	processesService.getProcesses()
		.then(msg => res.json(msg))
		.catch(next)
}
const getProcess = (req, res, next) =>{
	const { processId } = req.params;
	processesService.getProcess(processId)
		.then(msg => res.json(msg))
		.catch(next)
}

const postJob = (req, res, next) =>{
	const { processId } = req.params;
	const input = req.body;

	processesService.postJob(processId,input)
		.then(msg => res.json(msg))
		.catch(next)
}

module.exports = {
    getProcesses,
    getProcess,
    postJob,
};