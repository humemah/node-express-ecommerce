const createSuccessResponse = (data) => {
    return {
      success: true,
      data: data
    };
  };
  
  const createErrorResponse = (message) => {
    return {
      success: false,
      error: message
    };
  };
  
  module.exports = {
    createSuccessResponse,
    createErrorResponse
  };
  