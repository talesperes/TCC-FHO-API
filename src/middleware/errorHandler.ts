const errorHandler =
  (fn: any) =>
  async (...args: any) => {
    try {
      const result = await fn(...args);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(result),
      };
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || "Erro interno";

      return {
        statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message }),
      };
    }
  };

export default errorHandler;
