import { Request, Response } from "express";
import WebSocket from "ws";

// Receiving POST requests because we need the request body
const handler = async (req: Request, res: Response) => {
  const socket = new WebSocket("ws://ws.kimbundu.org/translate");
  const { text } = JSON.parse(req.body);
  const promise = () =>
    new Promise((resolve, reject) => {
      socket.addEventListener("open", () => {
        socket.send(text);
      });

      socket.addEventListener("message", ({ data }) => {
        resolve(data);
      });

      socket.addEventListener("error", (error) => {
        reject(error);
      });
    });
  try {
    const response = await promise();
    socket.close();
    res.send(response);
  } catch (error) {
    socket.close();
    console.log("mezzop");
  }
};

export default handler;
