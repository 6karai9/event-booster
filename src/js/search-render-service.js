import { throttle } from '../../node_modules/throttle-debounce';
import { eventsApiService } from './api-event-service';
// import { totalPages, page } from "./api-event-service";
import evtListTpl from '../templates/events-list.hbs';
import { spinner } from './spin';
import { onPnNotice, onPnError, pN } from './pnotify-set';
import { createPagination } from './pagination';
import { queryTotalPages, pageNumber } from "./api-event-service";

class RenderService {
  constructor() {
    this.events;
    this.eventsList = document.querySelector('.events-list');
    this.doneBtn = document.querySelector('.js-done-btn');
    this.searchForm = document.querySelector('.search-form');
    this.tempRenderArr = [];
    this.infiniteScrollOn = 'off';
    // this.endedScroll = false;
    this.renderStoper = false;
  }

  onSearch(e, ref) {
    e.preventDefault();

    if (e.currentTarget.elements.query.value === '') {
      // return alert('Введи хоть что-то!');
      // onPnNotice(pN.emptyRequest);
      return (this.renderStoper = false);
    }

    // if (e.currentTarget.elements.query.value === ref.currentSearchQuery && e.currentTarget.elements.query.value !== '') {
    // return alert('такое уже есть...');
    // return onPnNotice(pN.controlInput);
    // return
    // }

    eventsApiService.searchQuery = e.currentTarget.elements.query.value;
    console.log('на входе: ', eventsApiService.searchQuery);
    ref.currentSearchQuery = e.currentTarget.elements.query.value;
    // console.log(ref.currentSearchQuery);
    this.clearFirstSearch(ref);

    return this.fetchAndRenderEvents(ref);
  }

  async fetchAndRenderEvents(ref) {
    spinner.spin(document.getElementById('events'));
    eventsApiService.countryCode = ref.countryCode;
    try {
      this.events = await eventsApiService.fetchEvents();
    } catch (error) {
      console.log('Error: request failed: ', error.message);
    }
    document.querySelector('.pagination__list').innerHTML = createPagination(
      queryTotalPages,
      pageNumber);
    if (this.renderStoper) {
      spinner.stop(document.getElementById('events'));
      // alert('рендер остановился!');
      this.doneBtn.classList.remove('hide-el');
      return;
    }

    /* пересмотреть это дерьмецо */
    // if (this.events === undefined) {
    //     // this.clearIfAllDone();
    //     return alert('Введи что-то нормальное');
    // }

    // if (this.renderStoper) {
    //     this.clearIfAllDone();
    //     // return alert('Введи что-то нормальное');
    // }

    if (this.infiniteScrollOn === 'on') {
      this.endedScroll = false;
      window.addEventListener(
        'scroll',
        throttle(500, () => this.unlessScroll()),
      );
      //прописать закрытие пагинации
      this.renderEvtList(ref);
    }

    // прописать открытие пагинации

    this.renderEvtList(ref);

    spinner.stop(document.getElementById('events'));
  }

  renderEvtList({ tempEventsArray }) {
    this.tempRenderArrCreator();
    this.eventsList.insertAdjacentHTML(
      'beforeend',
      evtListTpl(this.tempRenderArr),
    );
    tempEventsArray.push(...this.events);
  }

  tempRenderArrCreator() {
    for (let i = 0; i < this.events.length; i += 1) {
      let tempObj = {};
      tempObj.name = this.events[i].name;
      tempObj.city = this.events[i]._embedded.venues[0].city.name;
      tempObj.location = this.events[i]._embedded.venues[0].name;
      tempObj.id = this.events[i].id;
      tempObj.data = this.events[i].dates.start.localDate;
      tempObj.time = this.events[i].dates.start.localTime;
      // tempObj.time = this.events[i].dates.start.localTime.slice(0, 5); //со .slice(0, 5) может выдавать ошибку (видно на сервере не всегда корректно прописано)
      tempObj.url = this.events
        .map(item => item.images)
        .map(imgs => imgs.filter(img => img.ratio === '4_3'))
        .flat()
        .map(it => it.url)[i];

      this.tempRenderArr.push(tempObj);
    }
  }

  /* =======будет сделан отлично!======= */
  // unlessScroll(){
  // if (this.endedScroll){
  //   return window.removeEventListener("scroll", throttle(0, () => this.unlessScroll()));
  // }
  // if(window.pageYOffset + window.innerHeight >= document.getElementById('events').offsetHeight){
  //         //загружаем новое содержимое в элемент
  //   this.fetchAndRenderEvents();
  //   eventsApiService.page += 1;
  // }
  // };

  /* = очистка при первом запросе в т.ч., когда новый вводился дополняя предыдущий = */

  clearFirstSearch(ref) {
    eventsApiService.resetPage();
    ref.tempEventsArray.length = 0;
    this.tempRenderArr.length = 0;
    this.doneBtn.classList.add('hide-el');
    this.eventsList.innerHTML = '';
    this.renderStoper = false; //может здесь и не нужно, но на всякий случай
  };

  /* ======================== очистка всего ======================== */

  resetAll(ref) {
    this.searchForm.reset();
    this.eventsList.innerHTML = '';
    eventsApiService.resetPage();
    ref.currentSearchQuery = '';
    ref.tempEventsArray.length = 0;
    this.doneBtn.classList.add('hide-el');
    //прописать закрытие пагинации
  };
  
  /* =============очистка при пагинации и при вводе ключевого слова============= */

  resetAtPaginationAndKeyWord(ref) {
    this.eventsList.innerHTML = '';
    this.tempRenderArr.length = 0;
    ref.tempEventsArray.length = 0;
    this.doneBtn.classList.add('hide-el');
  };

  /* ============= передача ключевого слова с модалки ============= */

  onKeyWord(ref) {
    
  eventsApiService.page = 0;   // передать страницу 0 в апи-сервис
  ref.pageNumber = 0; // то же в рефсы
  eventsApiService.searchQuery = ref.currentSearchQuery;// передать ключевое слово в апи - сервис  
  this.searchForm.elements.query.value = ref.currentSearchQuery; // перепрописать ключевое слово в инпут
  ref.countryCode = "",// код страны обнулить в рефсах
  eventsApiService.countryCode = ''; // код страны обнулить в апи сервисе
  // код страны обнулить в инпуте - решить с олегом
  
  };
  

  /* = очистка галереи (может и можно без неё обойтись), пока смотрю = */
  // clearEventsList() {
  //     this.eventsList.innerHTML = '';
  // };

  /* = очистка, когда все запросы выполнены, может и не нужно = */
  // clearIfAllDone() {
  //     this.endedScroll = true;
  //     this.doneBtn.classList.remove('hide-el');
  //     document.querySelector('.result-section').scrollIntoView({block: "end", behavior: "smooth"});
  // };

  /* =====контроль ввода латинских букв===== */
  controlKeyUp(e) {
    if (
      /[^A-Za-z]/.test(
        e.currentTarget.elements.query.value[
          e.currentTarget.elements.query.value.length - 1
        ],
      )
    ) {
      onPnNotice(pN.controlA_Z);
    }
    e.currentTarget.elements.query.value =
      e.currentTarget.elements.query.value.replace(/[^A-Za-z]/g, '');
  }

  /* =====создатель слушателей событий===== */
  eventsListCreator(ref) {
    // this.searchForm.addEventListener('input', e => renderService.controlKeyUp(e));
    this.searchForm.addEventListener('submit', e =>
      renderService.onSearch(e, ref),
    );
    this.doneBtn.addEventListener('click', () => this.resetAll(ref));
  }

  /* ======инициализация при запуске приложения====== */
  initialAtStartup(ref) {
    this.eventsListCreator(ref);
    this.fetchAndRenderEvents(ref);
  }
}
export const renderService = new RenderService();
