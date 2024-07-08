// websocket.js
class WebSocketService {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.reconnectInterval = 5000; // 重连间隔时间，单位为毫秒
        this.connect();
    }

    connect() {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        this.ws.onmessage = (message) => {
            console.log('WebSocket message received:', message.data);
            // 在这里处理接收到的消息
        };

        this.ws.onclose = () => {
            console.log('WebSocket connection closed');
            setTimeout(() => {
                this.connect();
            }, this.reconnectInterval);
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    send(message) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            console.error('WebSocket is not open. Ready state:', this.ws.readyState);
        }
    }
}

const websocketService = new WebSocketService('ws://localhost:14102/chat/ws');
export default websocketService;
