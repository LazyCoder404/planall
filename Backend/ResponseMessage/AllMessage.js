exports.CatchErrors = (message) => {
   return ({ response_code: 0, response_message: message })
}

exports.RequiredErrors = (message) => {
   return ({ response_code: 0, response_message: message })
}

exports.Response = (message, data) => {
   return ({ response_code: 1, response_message: message, Data: [data] })
}

exports.Responsemsg = (message) => {
   return ({ status: true, response_code: 1, response_message: message })
}

exports.ResponseErrmsg = (message) => {
   return ({ status: false, response_code: 0, response_message: message })
}

exports.ResponseDataMsg = (message, data) => {
   return ({ status: true, response_code: 200, response_message: message, data: data })
}

exports.SendSuccessResponse = (data) => {
   return ({ "response_code": true, "response_message": "success", "response_data": data })
}
exports.SendErrorResponse = (message, data) => {
   return ({ "response_code": false, "response_message": message, "response_data": data })
}

//------------------------------------------

exports.catchError = (msg) => {
   return({
       status:false,
       response_code:400,
       response_message:msg
   })
}

exports.findError = (msg) => {
   return({
       status:false,
       response_code:400,
       response_message:msg
   })
}

exports.requiredError = (msg) => {
   return({
       status:false,
       response_code:400,
       response_message:msg
   })
}

exports.successResponse = (msg) => {
   return({
       status:true,
       response_code:200,
       response_message:msg
   })
}

exports.dataResponse = (msg,data) => {
   return({
       status:true,
       response_code:200,
       response_message:msg,
       data:data
   })
}

exports.AuthError = (msg) => {
   return({
       status:false,
       response_code:429,
       response_message:msg
   })
}

exports.ForbiddenError = (msg) => {
   return({
       status:false,
       response_code:429,
       response_message:msg
   })
}