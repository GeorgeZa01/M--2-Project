import { createRequest, getRequests } from "../models/timeoffModel.js";

const getAllRequestsController = async (req, res) => {
    try {
        const requests = await getRequests();
        res.json({ employees: requests });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postRequestController = async (req, res) => {
    try {
        const { todaysDate, employeeName, startDate, endDate, reasons } = req.body;
        const newRequest = await createRequest({ todaysDate, employeeName, startDate, endDate, reasons });
        res.json({ message: "Request submitted successfully", request: newRequest });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
        console.log(req.body);
    }
};

export { getAllRequestsController, postRequestController };
