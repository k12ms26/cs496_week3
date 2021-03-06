/*
 * result.js: 
 * Schema for the result and its type(name)(corresponding to mbti types),
 * its description and image
 *  point 1 : e n t p
 *  point 0 : i s f j
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultSchema = new Schema({
    result_type: String,
    ei_point: {type: Number, required: true},
    ns_point: {type: Number, required: true},
    tf_point: {type: Number, required: true},
    pj_point: {type: Number, required: true},
    description: String,
    image: String,
    goodtype : String,
    goodtype_image : String,
    badtype : String,
    badtype_image : String
});

module.exports = mongoose.model('result', resultSchema);