import isVcr from './middleware/isVcr';
import FirebaseSessionStorage from './storage/firebaseSessionStorage';
import { SessionStorage } from './storage/sessionStorage';
import VcrSessionStorage from './storage/vcrSessionStorage';

// Session storage strategy based on whether you use Vonage Cloud Runtime for hosting or run the app locally

const getSessionStorageService = (): SessionStorage => {
  if (isVcr) {
    return new VcrSessionStorage();
  }
  return new FirebaseSessionStorage();
};

export default getSessionStorageService;
