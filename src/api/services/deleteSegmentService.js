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

exports.deleteSubSubSegment = async (data) => {
    try {
        let deleteSubSubSubSegmentSql = "DELETE FROM subsubsubsegment WHERE subsubsegment_id = ?"
        const [deleteSubSubSubSegmentResp] = await writePool.query(deleteSubSubSubSegmentSql, [data.subsubsegment_id]); 

        let deleteSubSubSegmentSql = "DELETE FROM subsubsegment WHERE subsubsegment_id = ?"
        const [deleteSubSubSegmentResp] = await writePool.query(deleteSubSubSegmentSql, [data.subsubsegment_id]);

        if(deleteSubSubSubSegmentResp && deleteSubSubSegmentResp) {
            return "Sub sub segment deleted successfully";
        }
    } catch (error) {
        console.log('delete sub sub segment service error: ', error);
        return
    }
}

exports.deleteSubSegment = async (data) => {
    try {
        let deleteSubSubSubSegmentSql = "DELETE FROM subsubsubsegment WHERE subsegment_id = ?"
        const [deleteSubSubSubSegmentResp] = await writePool.query(deleteSubSubSubSegmentSql, [data.subsegment_id]);
        
        let deleteSubSubSegmentSql = "DELETE FROM subsubsegment WHERE subsegment_id = ?"
        const [deleteSubSubSegmentResp] = await writePool.query(deleteSubSubSegmentSql, [data.subsegment_id]);

        let deleteSubSegmentSql = "DELETE FROM subsegment WHERE subsegment_id = ?"
        const [deleteSubSegmentResp] = await writePool.query(deleteSubSegmentSql, [data.subsegment_id]);

        if(deleteSubSubSubSegmentResp && deleteSubSubSegmentResp && deleteSubSegmentResp) {
            return "Sub segment deleted successfully";
        }
        
    } catch (error) {
        console.log('delete sub segment service error: ', error);
        return
    }
}

exports.deleteSegment = async (data) => {
    try {
        let deleteSubSubSubSegmentSql = "DELETE FROM subsubsubsegment WHERE segment_id = ?"
        const [deleteSubSubSubSegmentResp] = await writePool.query(deleteSubSubSubSegmentSql, [data.segment_id]);

        let deleteSubSubSegmentSql = "DELETE FROM subsubsegment WHERE segment_id = ?"
        const [deleteSubSubSegmentResp] = await writePool.query(deleteSubSubSegmentSql, [data.segment_id]);

        let deleteSubSegmentSql = "DELETE FROM subsegment WHERE segment_id = ?"
        const [deleteSubSegmentResp] = await writePool.query(deleteSubSegmentSql, [data.segment_id]);

        let deleteSegmentSql = "DELETE FROM segment WHERE segment_id = ?"
        const [deleteSegmentResp] = await writePool.query(deleteSegmentSql, [data.segment_id]);

        if(deleteSubSubSubSegmentResp && deleteSubSubSegmentResp && deleteSubSegmentResp && deleteSegmentResp) {
            return "Segment deleted successfully";
        }

    } catch (error) {
        console.log('delete segment service error: ', error);
        return
    }
}