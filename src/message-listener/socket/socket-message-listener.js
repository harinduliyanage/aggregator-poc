import {config, SocketClient} from "../../common";

export const socketMessageListener =  {

    connect: () => {
        const socketClient = new SocketClient();
        socketClient.connect(config.XK_SOCKET_URL, null);
        // todo: get xk ids from db and bind the events
        //socketClient.eventBind('', listener)
    }
}

const listener = (socketMessage) => {
    console.log(socketMessage)
    // todo: using parser decode the raw msg

    // todo: step 2 get persist and other decision

    // todo: step 3 persist
}
