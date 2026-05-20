import express from 'express'
import User from '../models/user'

const router = express.Router();
router.get("/", async (request, response) => {
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
		DBActive: await User.findOne({}) ? true : false
	};
	try {
		response.send(healthcheck);
		} catch (e) {
			healthcheck.message = typeof e === 'string' ? e : 'unknown';
			response.status(503).send();
	}
});

export default router;

