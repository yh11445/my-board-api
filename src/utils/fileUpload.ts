import { FastifyInstance, FastifyRequest } from "fastify";
import { Readable } from "stream";

async function fileUpload(fastify: FastifyInstance) {
  fastify.post("/upload", async (request: FastifyRequest) => {
    const data = await request.file();
    const fileStream: Readable = data.file;

    // Handle the file stream here (e.g., save it to disk, process it, etc.)

    return { message: "File uploaded successfully" };
  });
}

export default fileUpload;
