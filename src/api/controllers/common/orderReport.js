const Joi = require('joi');
const orderReportService = require('../../services/orderReportService');
const fs = require('fs');
const xlsx = require('xlsx');
exports.orderReportController = async (req, res) => {
    try {
        const orderReportData = Joi.object({
            customer_id: Joi.optional(),
            start_date: Joi.optional(),
            end_date: Joi.optional(),
            type: Joi.required()
        });
        const { error, value } = orderReportData.validate(req.body);
        if (error) {
            console.log(`Invalid data for order Report: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid data for order Report:`);
        const resp = await orderReportService.getOrderReport(req.body);
        if (resp) {
            if (value.type == 'show') {
                return res.json({ success: true, status: 200, response: resp })
            }
            else if (value.type == 'export') {
                const excelFilePath = 'orderreport.xlsx';
                await exportToExcel(resp, excelFilePath, value.start_date, value.end_date);
                return res.download(excelFilePath, (err) => {
                    if (err) {
                        console.error('Error while downloading file:', err);
                        return res.status(500).json({ success: false, status: 500, message: 'Error while downloading file' });
                    }
                    fs.unlinkSync(excelFilePath);
                });
            }
        } else {
            return res.json({ success: false, status: 500, response: [] });
        }
    } catch (error) {
        console.log('order report controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}


exports.orderReportSalespersonController = async (req, res) => {
    try {
        const orderReportSalespersonData = Joi.object({
            sales_person_id: Joi.optional(),
            start_date: Joi.optional(),
            end_date: Joi.optional(),
            type: Joi.required()
        });
        const { error, value } = orderReportSalespersonData.validate(req.body);
        if (error) {
            console.log(`Invalid data for order Report Salesperson: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid data for order Report Salesperson:`);
        const resp = await orderReportService.getOrderReportSalesperson(req.body);
        if (resp) {
            if (value.type == 'show') {
                return res.json({ success: true, status: 200, response: resp })
            }
            else if (value.type == 'export') {
                const excelFilePath = 'orderreport.xlsx';
                await exportToExcel(resp, excelFilePath, value.start_date, value.end_date);
                return res.download(excelFilePath, (err) => {
                    if (err) {
                        console.error('Error while downloading file:', err);
                        return res.status(500).json({ success: false, status: 500, message: 'Error while downloading file' });
                    }
                    fs.unlinkSync(excelFilePath);
                });
            }
        } else {
            return res.json({ success: false, status: 500, response: [] });
        }
    } catch (error) {
        console.log('order report salesperson controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}


async function exportToExcel(data, excelFilePath, start_date, end_date) {
    const workbook = xlsx.utils.book_new();
    const today = new Date().toLocaleDateString('en-GB');
    const [startYear, startMonth, startDay] = start_date.split('-');
    const formattedStartDate = `${startDay}/${startMonth}/${startYear}`;

    const [endYear, endMonth, endDay] = end_date.split('-');
    const formattedEndDate = `${endDay}/${endMonth}/${endYear}`;

    const firstHeader = ['Sarthak Components Private Limited'];
    const secondHeader = ['List of Orders for the period:'];
    const thirdHeader = ['From Date:', formattedStartDate, '', 'To Date:', formattedEndDate, '', 'Run Date:', today];
    const headers = ['SL No.', 'Customer', 'PO Date', 'PO Number', 'PO Type', 'PO Sub Type', 'Basic PO Value', 'Total PO Value(GST)', 'Scheduled Date of Completion', 'Actual Date of Completion'];
    const worksheet = [firstHeader, secondHeader, thirdHeader, [], [], headers, ...data.map((row, index) => [
        index + 1,
        row.customer,
        row.po_date,
        row.po_number,
        row.po_type,
        row.po_sub_type,
        row.basic_po_value ? row.basic_po_value : '',
        row.total_po_value ? row.total_po_value : '',
        row.scheduled_completion_date ? row.scheduled_completion_date : '',
        row.actual_completion_date ? row.actual_completion_date : ''
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}