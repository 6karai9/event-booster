import './sass/main.scss';
import './js/pagination.js';
import './js/modal.js';
import './js/datalist.js';
import { refsGen } from './js/refs';
import { renderService } from './js/search-render-service';
import { toTop } from './js/to-top-btn';
import './js/notify.js';
import './js/formPlus.js';

toTop.createBtnAndEvnListeners();
window.addEventListener('DOMContentLoaded', () => renderService.initialAtStartup(refsGen));







// console.log('массив всех объектов-событий, полученых с сервера и отрендереных на экране: refsGen.tempEventsArray ', refsGen.tempEventsArray);

console.log("Привіт, світ!))) Життя ДУЖЕ брутальне!((( Але й химерне!)))");

