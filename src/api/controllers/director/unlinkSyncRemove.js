const Joi = require('joi')
const fs = require('fs');
const path = require('path')

exports.unlinkSyncRemoveController = async (req, res) => {
    try {
        const unlinkSyncData = Joi.object({
            removed_item: Joi.required()
        })
        const { error, value } = unlinkSyncData.validate(req.body);
        if (error) {
            console.log(`Invalid unlink sync data:  ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        const filePath = path.join(__dirname, '../../../..', 'public', 'upload', 'files', value.removed_item);
        console.log(`Valid unlink sync data`);
        try {
            fs.unlinkSync(filePath);
            return res.json({ success: true, message: 'File deleted successfully' });
        } catch (err) {
            console.log('Error deleting file:', err);
            return res.status(500).json({ success: false, message: 'Error deleting file', error: err.message });
        }
    } catch (error) {
        console.log('unlink sync controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: [] })
    }
}