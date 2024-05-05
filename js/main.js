import {renderGallery} from './gallery.js';
import {validatePhoto, closePopup} from './validation.js';
import {createLoader} from './server-requests.js'

validatePhoto(closePopup);
createLoader(renderGallery);