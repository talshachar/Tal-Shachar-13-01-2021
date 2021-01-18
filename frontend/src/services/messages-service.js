import { httpService } from './http-service';

export const messagesService = {
  query,
  write,
  remove
}

function query() {
  return httpService.get('messages');
}

function write(message) {
  return httpService.post('messages', message);
}

function remove(messageId, directory) {
  return httpService.delete(`messages/${messageId}/${directory}`);
}