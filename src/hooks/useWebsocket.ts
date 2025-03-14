import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import WebSocketService from "../services/webSocketService";

const useWebSocket = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const wsService = new WebSocketService(dispatch);
    wsService.connect();

    return () => {
      wsService.disconnect();
    };
  }, [dispatch]);
};

export default useWebSocket;
