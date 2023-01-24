//import will always go at the top
import ChatMsg from './components/ChatMessage.js';

const socket = io();

//utility functions for socket
function setUserID({sID}) {
   //debugger;
   //save our unique ID generated by the server side - this is how we track individual connections to the chat service
   vm.socketID= sID;
}

function showNewMessage({message}){
    //debugger;
    vm.messages.push(message);
}

const {createApp} = Vue
const vm = createApp({
    data() {
 return {
    socketID: '',
    message: '',
    messages: []
 }
    },

    methods: {

        dispatchMessage(){
            //debugger;
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || 'anonymous'
            })

            this.message = "";
        }
    },

    components: {
        newmsg: ChatMsg

    }
}).mount('#app')

socket.addEventListener('connected', setUserID);  
socket.addEventListener('new_message', showNewMessage);