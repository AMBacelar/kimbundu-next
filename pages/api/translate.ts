import { Request, Response } from "express";
import WebSocket from "ws";

// Receiving POST requests because we need the request body
const handler = async (req: Request, res: Response) => {
  const socket = new WebSocket("ws://ws.kimbundu.org/translate");
  const { text } = JSON.parse(req.body);
  const promise = () =>
    new Promise((resolve, reject) => {
      socket.addEventListener("open", () => {
        socket.send(text.toLowerCase());
      });

      socket.addEventListener("message", ({ data }) => {
        console.log("message:", data);
        resolve(data);
      });

      socket.addEventListener("error", (error) => {
        reject(error);
      });
    });
  try {
    const response = await promise();
    res.send(response);
  } catch (error) {
    console.log("mezzop");
  }
};

export default handler;
