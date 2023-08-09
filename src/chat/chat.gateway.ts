import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({cors: true})
export class ChatGateway {

  @WebSocketServer() server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    const roomId = payload.roomId;
    console.log('message',payload);
    this.server.emit('message-' + roomId, payload);
    return 'Hello world!';
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client ${client.id} Connected`);
  }

  handleDisconnect(client: any) {
    console.log(`Client ${client.id} Disconnected`);
  }
}
