const writePool = require('../../config/mysql').writePool

exports.deleteSubSubSubSegment = async (data) => {
    try {
        let deleteSubSubSubSegmentSql = "DELETE FROM subsubsubsegment WHERE subsubsubsegment_id = ?"
        const [deleteSubSubSubSegmentResp] = await writePool.query(deleteSubSubSubSegmentSql, [data.subsubsubsegment_id]);
        if(deleteSubSubSubSegmentResp) {
            return "Sub sub sub segment deleted successfully";
        }
    } catch (error) {
        console.log('delete sub sub sub segment service error: ', error);
        return
    }
}