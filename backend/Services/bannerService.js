"use-strict";

const db = require("../Database/config");

const getBannerDetailsService = async () => {
  try {
    let squery = "select * from tbl_bannercontent tb";
    const result = await db.query(squery);
    console.log(result, ">>>>>>>>>>>>>>>");
    if (result.length > 0) {
      return { status: true, data: result };
    } else {
      return {status:false,data:"no data found"};
    }
  } catch (error) {
    console.log(error, "Error in bannerService");
    throw error;
  }
};

const updateBannerDetailService = async (bannerdetails) => {
  try {
    const { title, description, days, hours, minutes, seconds, btext, blink } = bannerdetails;
    const id=1;
    let squery = `UPDATE tbl_bannercontent
        SET
        btitle = '${title}',
        bdescription = '${description}',
        btime_days=${days},
        btime_hours=${hours},
        btime_minutes=${minutes},
        btime_seconds=${seconds},
        buttontext='${btext}',
        buttonlink='${blink}'
        
        WHERE id = ${id}
     RETURNING * `;

       console.log('---Executing Update Query-----------',squery);
    const result = await db.query(squery);
    console.log("db result>>>>>",result)
    if(result.length>0){
        return {status:true,data:result};
    }else{
        return {status:false,data:'failed to update'}
    }
    
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = { getBannerDetailsService, updateBannerDetailService };
