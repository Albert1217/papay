const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "PEDAL", "RESTAURANT"];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETE"];
exports.ordernary_enums = ["Y", "N"];
exports.product_collection_enums = ["dish", "salad", "desert", "drink", "etc"];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.product_size_enums = ["small", "normal", "large", "set"];
exports.product_volume_enums = [0.5, 1, 1.2, 1.5, 2];

exports.order_status_enums = ["PAUSED", "PROCESS", "FINISHED", "DELETED"];

exports.like_view_group_list = ["product", "member", "community"];

exports.board_id_enum_list = ["celebrity", "evaluation", "story"];
exports.board_article_status_enum_list = ["active", "deleted"];

/**********************************
 *  MONGODB RELATED COMMANDS      *
 **********************************/

exports.shapeIntoMongooseObjectId = (target) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
};
