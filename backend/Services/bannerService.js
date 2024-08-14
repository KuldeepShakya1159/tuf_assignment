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
      return { status: false, data: "no data found" };
    }
  } catch (error) {
    console.log(error, "Error in bannerService");
    throw error;
  }
};

const updateBannerDetailService = async (bannerdetails) => {
  try {
    let { title, description, days, hours, minutes, seconds, btext, blink } =bannerdetails;
    title = title.replace(/'/g, "''");
    description = description.replace(/'/g, "''");
    btext = btext.replace(/'/g, "''");
    blink = blink.replace(/'/g, "''");
    const id = 1;

    let squery = `UPDATE tbl_bannercontent
        SET
        title = '${title}',
        description = '${description}',
        days=${days},
        hours=${hours},
        minutes=${minutes},
        seconds=${seconds},
        btext='${btext}',
        blink='${blink}'
        
        WHERE id = ${id}
     RETURNING * `;

    console.log("---Executing Update Query-----------", squery);
    const result = await db.query(squery);
    console.log("db result>>>>>", result);
    if (result.length > 0) {
      return { status: true, data: result };
    } else {
      return { status: false, data: "failed to update" };
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = { getBannerDetailsService, updateBannerDetailService };
