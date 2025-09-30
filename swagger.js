import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My Student API",
    description: "An API that shows students data.",
  },
  host: "node-routes-xs4z.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import("./server.js");
});
