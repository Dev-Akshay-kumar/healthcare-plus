import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL);

export const joinQueue = (queueId) => socket.emit("join_queue", queueId);
export const onQueueUpdate = (callback) => socket.on("queue_update", callback);
export const leaveQueue = (queueId) => socket.emit("leave_queue", queueId);

export default socket;
