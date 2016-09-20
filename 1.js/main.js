webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(variables, utils, templates, Review, ReviewModel) {

	  /** @type {Array.<ReviewModel>} */
	  var reviewsArray = [];
	  /** @type {Array.<Review>} */
	  var renderedReviews = [];

	  return {

	    /**
	      * Определяет адрес, где расположен JSONP-скрипт и получает объект.
	      * @param {string} url
	      * @param {function} callback
	      */
	    getReviews: function(url, callback) {
	      var xhr = new XMLHttpRequest();

	      /** @param {ProgressEvent} */
	      xhr.onload = function(evt) {
	        if ( (this.status === 200) && (this.readyState === 4) ) {
	          variables.reviewsContainer.classList.remove(variables.CLASS_REVIEWS_SECTION_LOADING);
	          var loadedData = JSON.parse(evt.target.response);
	          loadedData = loadedData.map(function(review) {
	            return new ReviewModel(review);
	          });
	          callback(loadedData);
	        } else {
	          utils.addErrorClass(variables.reviewsContainer);
	        }
	      };

	      xhr.onloadstart = function() {
	        variables.reviewsContainer.classList.add(variables.CLASS_REVIEWS_SECTION_LOADING);
	      };

	      xhr.onerror = function() {
	        utils.addErrorClass(variables.reviewsContainer);
	      };

	      xhr.timeout = variables.LOAD_TIMEOUT;
	      xhr.ontimeout = function() {
	        utils.addErrorClass(variables.reviewsContainer);
	      };

	      xhr.open('GET', url);
	      xhr.send();
	    },

	    /**
	      * Отрисовывает блоки с отзывами на странице.
	      * @param {Array.<ReviewModel>} reviewsList
	      * @param {number} offset
	      * @param {boolean} replace
	      */
	    renderReviews: function(reviewsList, offset, hesReplaced) {
	      if (hesReplaced) {
	        renderedReviews.forEach(function(review) {
	          review.remove();
	        });
	        renderedReviews = [];
	      }

	      var begin = offset * this.LIMIT;
	      var end = begin + this.LIMIT;

	      if (reviewsList.length) {
	        reviewsList.slice(begin, end).forEach(function(review) {
	          renderedReviews.push(new Review(review, variables.reviewsContainer));
	        }); } else {
	        variables.reviewsContainer.appendChild(templates.cloneReviewElementEmpty());
	      }
	    },

	    /**
	      * Показывает доп. отзывы при нажатии кнопки по LIMIT штук.
	      */
	    addMoreReviews: function() {
	      variables.moreReviewsButton.addEventListener('click', function() {
	        if (isNextPageAvailable(this.filteredReviews, this.currentOffset, this.LIMIT)) {
	          this.currentOffset++;
	          this.renderReviews(this.filteredReviews, this.currentOffset);
	          if ((this.currentOffset + 1) * this.LIMIT >= this.filteredReviews.length) {
	            variables.moreReviewsButton.classList.add(variables.CLASS_INVISIBLE);
	          }
	        }

	        /**
	          * @param {Array.<ReviewModel>} filteredReviewsList
	          * @param {number} offset
	          * @param {number} limit
	          * @return {boolean}
	          */
	        function isNextPageAvailable(filteredReviewsList, offset, limit ) {
	          return offset < Math.floor(filteredReviewsList.length / limit);
	        }
	      }.bind(this));
	    },

	    /**
	      * Записывает в переменную reviewsArray массив с данными из json.
	      * @param {Array.<ReviewModel>} array
	      */
	    set: function(array) {
	      reviewsArray = array;
	    },

	    /**
	      * Возвращает значение reviewsArray при вызове.
	      * @return {Array.<ReviewModel>}
	      */
	    get: function() {
	      return reviewsArray;
	    },
	    /** @type {Array.<ReviewModel>} */
	    'filteredReviews': [],
	    /** @type {number} */
	    'currentOffset': 0,
	    /** @constant {number} */
	    'LIMIT': 3
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {


	  function Variables() {
	    var self = this;

	    self.moreReviewsButton = document.querySelector('.reviews-controls-more');
	    /** @enum {string} */
	    self.FILTER = {
	      'ALL': 'reviews-all',
	      'RECENT': 'reviews-recent',
	      'GOOD': 'reviews-good',
	      'BAD': 'reviews-bad',
	      'POPULAR': 'reviews-popular'
	    };
	    self.ratingClasses = [
	      'review-rating',
	      'review-rating-two',
	      'review-rating-three',
	      'review-rating-four',
	      'review-rating-five'
	    ];
	    self.reviewsContainer = document.querySelector('.reviews-list');
	    self.reviewsFilterBlock = document.querySelector('.reviews-filter');
	    /** @constant {Filter} */
	    self.DEFAULT_FILTER = self.FILTER.ALL;
	    /** @constant {number} */
	    self.LOAD_TIMEOUT = 5000;
	    /** @constant {string} */
	    self.CLASS_INVISIBLE = 'invisible';
	    /** @constant {string} */
	    self.CLASS_REVIEWS_SECTION_FAILURE = 'reviews-load-failure';
	    /** @constant {string} */
	    self.CLASS_REVIEWS_SECTION_LOADING = 'reviews-list-loading';
	  }

	  return new Variables();
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(variables) {

	  /** @enum {number} */
	  var KeyCode = {
	    ENTER: 13,
	    ESC: 27,
	    SPACE: 32
	  };

	  return {

	    /**
	      * Наследование прототипа.
	      * @param {constructor} ChildComponent
	      * @param {constructor} BaseComponent
	      */
	    inherit: function(ChildComponent, BaseComponent) {
	      function EmptyConstructor() {}
	      EmptyConstructor.prototype = BaseComponent.prototype;
	      ChildComponent.prototype = new EmptyConstructor();
	      ChildComponent.prototype.constructor = ChildComponent;
	    },

	    /**
	      * Определяет, видим ли элемент.
	      * @param {HTMLElement} element
	      * return {boolean}
	      */
	    isElementVisible: function(element) {
	      var elementPosition = element.getBoundingClientRect();
	      return elementPosition.bottom >= 0;
	    },

	    /**
	      * Throttle оптимизация
	      * @param  {function} callback
	      * @param  {number} timeDelay
	      * @return {function}
	      */
	    throttle: function(callback, timeDelay) {
	      var lastCall = 0;
	      return function() {
	        if (Date.now() - lastCall >= timeDelay) {
	          callback();
	          lastCall = Date.now();
	        }
	      };
	    },

	    /**
	      * Добавляется класс со стилем ошибки.
	      */
	    addErrorClass: function(element) {
	      element.classList.remove(variables.CLASS_REVIEWS_SECTION_LOADING);
	      element.classList.add(variables.CLASS_REVIEWS_SECTION_FAILURE);
	    },

	     /**
	     * @param {Event} evt
	     * @return {boolean}
	     */
	    isActivationEvent: function(evt) {
	      return [KeyCode.ENTER, KeyCode.SPACE].indexOf(evt.keyCode) > -1;
	    },


	    /**
	     * @param {Event} evt
	     * @return {boolean}
	     */
	    isDeactivationEvent: function(evt) {
	      return evt.keyCode === KeyCode.ESC;
	    }
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(variables) {

	  return {
	    /**
	      * Проверяет поддержку элемента template и получает в нём контент.
	      * @param {Element} template
	      * @param {string} content
	      * return {HTMLElement} result
	      */
	    getTemplate: function(template, content) {
	      var result;

	      if ('content' in template) {
	        result = template.content.querySelector(content);
	      } else {
	        result = template.querySelector(content);
	      }
	      return result;
	    },

	    /**
	      * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
	      * @param {ReviewModel} review
	      * return {HTMLElement} element
	      */
	    cloneReviewElement: function(review) {
	      var templateElement = document.querySelector('#review-template');
	      var elementToClone = this.getTemplate(templateElement, '.review');
	      var element = elementToClone.cloneNode(true);
	      var rating = element.querySelector('.review-rating');
	      element.querySelector('.review-text').textContent = review.getDescription();

	      rating.classList.add(variables.ratingClasses[review.getRating() - 1]);

	      setImageParameters(review, element);
	      return element;
	    },

	    /**
	      * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
	      * return {HTMLElement} elementEmpty
	      */
	    cloneReviewElementEmpty: function() {
	      var templateElementEmpty = document.querySelector('#review-empty-template');
	      var elementEmptyToClone = this.getTemplate(templateElementEmpty, '.review-empty');
	      var elementEmpty = elementEmptyToClone.cloneNode(true);
	      return elementEmpty;
	    }
	  };


	  /**
	    * Создаёт изображения, которые получают необходимые параметры из
	    * свойств объекта на сервере и добавляет им обработчики загрузки и ошибки.
	    * @param {ReviewModel} review
	    * @param {HTMLElement} element
	    */
	  function setImageParameters(review, element) {
	    var image = new Image(124, 124);
	    var imageLoadTimeout;
	    var reviewAvatar = element.querySelector('.review-author');

	    image.onload = function() {
	      clearTimeout(imageLoadTimeout);
	      reviewAvatar.src = image.src;
	      reviewAvatar.width = image.width;
	      reviewAvatar.height = image.height;
	    };

	    image.onerror = function() {
	      element.classList.add('review-load-failure');
	    };

	    image.src = review.getAuthorPicture();

	    imageLoadTimeout = setTimeout(function() {
	      reviewAvatar.removeAttribute('src');
	      element.classList.add('review-load-failure');
	    }, variables.LOAD_TIMEOUT);
	  }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(6), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(templates, BaseComponent, utils) {

	  /**
	    * Конструктор объекта Review. Управляет поведением элемента-отзыва, отрисовываемого в дом-ноде container.
	    * Принимает на вход объект, описывающий состояние и свойства отзыва.
	    * Добавляет обработчики событий на кнопках оценки отзыва.
	    * Удаляет обработчики при удалении отзыва из дом-дерева.
	    * @param {Object} data
	    * @param {HTMLElement} container
	    * @constructor
	    */
	  var Review = function(data, container) {
	    this.data = data;
	    this.element = templates.cloneReviewElement(this.data);
	    this.reviewQuizAnswerNo = this.element.querySelector('.review-quiz-answer-no');
	    this.reviewQuizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');

	    this._onYesClick = this._onYesClick.bind(this);
	    this._onNoClick = this._onNoClick.bind(this);
	    this._onReviewQuizClick = this._onReviewQuizClick.bind(this);

	    BaseComponent.call(this, this.element, container);
	    this.create();

	    this._setEventListener('click', this.element, this._onReviewQuizClick);
	  };

	  utils.inherit(Review, BaseComponent);




	  /**
	    * @param {click} evt
	    */
	  Review.prototype._onReviewQuizClick = function(evt) {
	    var isUsefull;
	    if (evt.target.classList.contains('review-quiz-answer-yes') && !(evt.target.classList.contains('review-quiz-answer-active'))) {
	      isUsefull = true;
	      this.data.setReviewUsefulness(isUsefull, this._onYesClick);
	    } else if (evt.target.classList.contains('review-quiz-answer-no')) {
	      isUsefull = false;
	      this.data.setReviewUsefulness(isUsefull, this._onNoClick);
	    }
	  };

	  /**
	    * @param {click} evt
	    */
	  Review.prototype._onYesClick = function() {
	    if (this.reviewQuizAnswerNo.classList.contains('review-quiz-answer-active')) {
	      this.reviewQuizAnswerNo.classList.remove('review-quiz-answer-active');
	    }
	    this.reviewQuizAnswerYes.classList.add('review-quiz-answer-active');
	  };

	  /**
	    * @param {click} evt
	    */
	  Review.prototype._onNoClick = function() {
	    if (this.reviewQuizAnswerYes.classList.contains('review-quiz-answer-active')) {
	      this.reviewQuizAnswerYes.classList.remove('review-quiz-answer-active');
	    }
	    this.reviewQuizAnswerNo.classList.add('review-quiz-answer-active');
	  };

	  /**
	    * Удаляет обработчики. Удаляяет элемент из дома.
	    */
	  Review.prototype.remove = function() {
	    this._removeEventListener('click', this.reviewQuizAnswerYes, this._onYesClick);
	    this._removeEventListener('click', this.reviewQuizAnswerNo, this._onNoClick);
	    BaseComponent.prototype.remove.call(this);
	  };

	  return Review;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	    * Конструктор, методы которого подлежат унаследованию.
	    * Он описывает базовую DOM-компоненту и описывающие её стандартный жизненный цикл.
	    * @param {Object} element
	    * @param {HTMLElement} container
	    * @constructor
	    */
	  var BaseComponent = function(element, container) {
	    this.element = element;
	    this.container = container;
	  };

	  /**
	    * Добавление элемента в контейнер
	    */
	  BaseComponent.prototype.create = function() {
	    this.container.appendChild(this.element);
	  };

	  /**
	    * Навешивает обработчик
	    */
	  BaseComponent.prototype._setEventListener = function(eventName, listener, fn) {
	    listener.addEventListener(eventName, fn);
	  };

	  /**
	    * Удаляет обработчик
	    */
	  BaseComponent.prototype._removeEventListener = function(eventName, listener, fn) {
	    listener.removeEventListener(eventName, fn);
	  };

	  /**
	    * Удаляет элемент из контейнера
	    */
	  BaseComponent.prototype.remove = function() {
	    this.element.parentNode.removeChild(this.element);
	  };

	  return BaseComponent;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Конструктор данных
	   * @param {Array.<Object>} data
	   * @constructor
	   */
	  var ReviewModel = function(data) {
	    this.data = data;
	    this.author = this.data.author;
	    this.date = this.data.date;
	    this.description = this.data.description;
	    this.rating = this.data.rating;
	    this.review_usefulness = this.data.review_usefulness;
	  };

	  /**
	   * Получение имени автора
	   * @return {string}
	   */
	  ReviewModel.prototype.getAuthorName = function() {
	    return this.author.name;
	  };

	  /**
	   * Получение ссылки на картинку автора
	   * @return {string}
	   */
	  ReviewModel.prototype.getAuthorPicture = function() {
	    return this.author.picture;
	  };

	  /**
	   * Получение даты отзыва
	   * @return {string}
	   */
	  ReviewModel.prototype.getDate = function() {
	    return this.date;
	  };

	  /**
	   * Получение текста отзыва
	   * @return {string}
	   */
	  ReviewModel.prototype.getDescription = function() {
	    return this.description;
	  };

	  /**
	   * Получение рейтинга отзыва
	   * @return {string}
	   */
	  ReviewModel.prototype.getRating = function() {
	    return this.rating;
	  };

	  /**
	   * Получение полезности отзыва
	   * @return {string}
	   */
	  ReviewModel.prototype.getReviewUsefulness = function() {
	    return this.review_usefulness;
	  };

	  /**
	   * Установка полезности отзыва и вызов функции-коллбэка
	   * @param {boolean} answer
	   * @param {function} callback
	   */
	  ReviewModel.prototype.setReviewUsefulness = function(answer, callback) {
	    if (answer) {
	      this.review_usefulness++;
	    } else {
	      this.review_usefulness--;
	    }

	    callback();
	  };

	  return ReviewModel;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(variables, reviews) {


	  return {
	    currentFilter: localStorage.getItem('reviews-filter-id') || variables.DEFAULT_FILTER,

	    init: function() {
	      this.setFiltersActive();
	      this.setFilterActive(this.currentFilter);
	      var filterElement = document.getElementById(this.currentFilter);
	      filterElement.setAttribute('checked', 'checked');
	    },

	    /**
	      * Передаёт отфильтрованный массив в ф-цию renderReviews и вызывает её.
	      * @param {string} filter
	      */
	    setFilterActive: function(filter) {
	      this.currentFilter = filter;
	      reviews.filteredReviews = getFilteredReviews(reviews.get(), this.currentFilter);
	      localStorage.setItem('reviews-filter-id', this.currentFilter);
	      variables.moreReviewsButton.classList.remove(variables.CLASS_INVISIBLE);
	      reviews.currentOffset = 0;
	      reviews.renderReviews(reviews.filteredReviews, reviews.currentOffset, true);
	    },

	    /**
	      * Навешивает обработчиики кликов на кнопки блока фильтра.
	      */
	    setFiltersActive: function() {
	      var filters = variables.reviewsFilterBlock.elements['reviews'];
	      var reviewsFilterLabels = document.querySelectorAll('.reviews-filter-item');

	      variables.reviewsFilterBlock.addEventListener('click', function(evt) {
	        if (evt.target.name === 'reviews') {
	          this.setFilterActive(evt.target.id);
	        }
	      }.bind(this));

	      for (var i = 0; i < filters.length; i++) {
	        var reviewsQuantity = setSupFilter(reviews.get(), filters[i].id, reviewsFilterLabels[i]);
	        if (!reviewsQuantity.length) {
	          filters[i].setAttribute('disabled', 'disabled');
	          reviewsFilterLabels[i].classList.add('disabled');
	        }
	      }
	    }
	  };

	  /**
	    * Добывляет теги sup, в которых записано количество найденных отзывов.
	    * @param {Array.<ReviewModel>} reviewsList
	    * @param {string} filter
	    * @param {HTMLElement} reviewsFilterLabel
	    * return {Array.<ReviewModel>} afterFilteringReviews
	    */
	  function setSupFilter(reviewsList, filter, reviewsFilterLabel) {
	    var sup = document.createElement('sup');
	    var afterFilteringReviews = getFilteredReviews(reviewsList, filter);
	    setSupElement(reviewsFilterLabel);

	    /**
	      * Создаёт тег sup.
	      * @param {HTMLElement} reviewsFilterLabel
	      */
	    function setSupElement(reviewsFilterLabelElement) {
	      var supText = document.createTextNode('(' + afterFilteringReviews.length + ')');
	      sup.appendChild(supText);
	      reviewsFilterLabelElement.appendChild(sup);
	    }

	    return afterFilteringReviews;
	  }

	  /**
	    * Возвращает отфильтрованный и отсортированный массив.
	    * @param {Array.<ReviewModel>} reviewsList
	    * @param {string} filter
	    * return {Array.<ReviewModel>} preFilteredReviews
	    */
	  function getFilteredReviews(reviewsList, filter) {
	    var reviewsToFilter = reviewsList.slice(0);
	    var preFilteredReviews = reviewsToFilter;

	    switch (filter) {
	      case variables.FILTER.ALL:
	        break;

	      case variables.FILTER.RECENT:
	        /** @constant {number} */
	        var FOUR_DAYS = 4 * 24 * 60 * 60 * 1000;
	        preFilteredReviews = reviewsToFilter.filter(function(review) {
	          return Date.now() + Date.parse(review.getDate()) < FOUR_DAYS;
	        }).sort(function(a, b) {
	          return Date.parse(b.getDate()) - Date.parse(a.getDate());
	        });
	        break;

	      case variables.FILTER.GOOD:
	        preFilteredReviews = reviewsToFilter.filter(function(review) {
	          return review.getRating() > 2;
	        }).sort(function(a, b) {
	          return b.getRating() - a.getRating();
	        });
	        break;

	      case variables.FILTER.BAD:
	        preFilteredReviews = reviewsToFilter.filter(function(review) {
	          return review.getRating() < 3;
	        }).sort(function(a, b) {
	          return a.getRating() - b.getRating();
	        });
	        break;

	      case variables.FILTER.POPULAR:
	        preFilteredReviews.sort(function(a, b) {
	          return b.getReviewUsefulness() - a.getReviewUsefulness();
	        });
	        break;
	    }

	    return preFilteredReviews;
	  }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(utils, BaseComponent) {

	  /**
	    * Конструктор объекта Gallery. Управляет поведением элемента-галлереи, объявленного в параметре galleryContainer.
	    * Принимать на вход массив объектов, описывающих фотографии, и сохранять их.
	    * Добавляет обработчики событий на блок галереи.
	    * @param {HTMLElement} galleryContainer
	    * @constructor
	    */
	  function Gallery(galleryContainer) {
	    this.galleryContainer = galleryContainer;
	    this.closeElement = this.galleryContainer.querySelector('.overlay-gallery-close');
	    this.galleryControlsBlock = this.galleryContainer.querySelector('.overlay-gallery-controls');
	    this.currentIndex = this.galleryControlsBlock.querySelector('.preview-number-current');
	    this.galleryPreview = this.galleryControlsBlock.querySelector('.overlay-gallery-preview');
	    this.galleryControlLeft = this.galleryControlsBlock.querySelector('.overlay-gallery-control-left');
	    this.galleryControlRight = this.galleryControlsBlock.querySelector('.overlay-gallery-control-right');
	    /** @type {Array.<string>} */
	    this.galleryPictures = [];
	    /** @type {number} */
	    this.activePicture = 0;

	    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
	    this._onCloseClick = this._onCloseClick.bind(this);
	    this._onCloseKeydown = this._onCloseKeydown.bind(this);
	    this._onRightClick = this._onRightClick.bind(this);
	    this._onLeftClick = this._onLeftClick.bind(this);
	    this._onhashchange = this._onhashchange.bind(this);
	    this._restoreFromHash = this._restoreFromHash.bind(this);
	    this._getIndex = this._getIndex.bind(this);
	    this._showPicture = this._showPicture.bind(this);

	    this._setEventListener('hashchange', window, this._onhashchange);
	  }

	  utils.inherit(Gallery, BaseComponent);




	  /**
	    * Прячет галлерею, удаляет все обработчики и очищает hash.
	    */
	  Gallery.prototype._hideGallery = function() {
	    this.galleryContainer.classList.add('invisible');

	    this._removeEventListener('keydown', document, this._onDocumentKeyDown);
	    this._removeEventListener('click', this.closeElement, this._onCloseClick);
	    this._removeEventListener('keydown', this.closeElement, this._onCloseKeydown);
	    this._removeEventListener('click', this.galleryControlRight, this._onRightClick);
	    this._removeEventListener('click', this.galleryControlLeft, this._onLeftClick);
	    location.hash = '';
	  };

	  /**
	    * Записывает в переменную galleryPictures массив из src фотографий.
	    * @param {Array<Element>} array
	    */
	  Gallery.prototype.set = function(array) {
	    for (var i = 0; i < array.length; i++) {
	      var temporaryElement = document.createElement('a');
	      temporaryElement.href = array[i].src;
	      this.galleryPictures.push(temporaryElement.pathname);
	    }
	    this._restoreFromHash();
	  };

	  /**
	    * Показывает галлерею. Навешивает обработчики.
	    * @param {click} evt
	    */
	  Gallery.prototype.showGallery = function(hash) {
	    var totalIndex = this.galleryControlsBlock.querySelector('.preview-number-total');
	    var pictureIndex = 1;
	    pictureIndex = this._getIndex(hash);

	    totalIndex.innerHTML = this.galleryPictures.length;
	    this.galleryContainer.classList.remove('invisible');

	    this._setEventListener('keydown', document, this._onDocumentKeyDown);
	    this._setEventListener('click', this.closeElement, this._onCloseClick);
	    this._setEventListener('keydown', this.closeElement, this._onCloseKeydown);
	    this._setEventListener('click', this.galleryControlRight, this._onRightClick);
	    this._setEventListener('click', this.galleryControlLeft, this._onLeftClick);

	    this._showPicture(pictureIndex);
	  };

	  /**
	    * Показывыет картинку по ее индексу в массиве.
	    * @param  {number} index.
	    */
	  Gallery.prototype._showPicture = function(index) {
	    if (index >= 1 && index <= this.galleryPictures.length) {
	      this.activePicture = index;
	      this.currentIndex.innerHTML = index;

	      if (this.galleryPreview.querySelector('img')) {
	        this.galleryPreview.removeChild(this.galleryPreview.querySelector('img'));
	      }

	      var pictureElement = new Image();
	      this.galleryPreview.appendChild(pictureElement);
	      pictureElement.src = location.origin + this.galleryPictures[index - 1];
	    } else {
	      this._hideGallery();
	    }
	  };

	  /**
	    * Определяет индекс элемента по hash.
	    * @param {string} hash.
	    */
	  Gallery.prototype._getIndex = function(hash) {
	    var imageIndex = this.galleryPictures.indexOf('/' + hash);
	    if (imageIndex === -1) {
	      imageIndex = NaN;
	    }
	    return imageIndex + 1;
	  };

	  Gallery.prototype._onhashchange = function() {
	    this._restoreFromHash();
	  };

	  /**
	    * Если в адресной строке прописан hash, то этот hash проверяется
	    * на соответствие регулярному выражению, и дальше вызывается showGallery.
	    * Если hash не соответствует рег. выражению -- галлерея закрывается.
	    */
	  Gallery.prototype._restoreFromHash = function() {
	    if (location.hash) {
	      var hash = location.hash.match(/#photo\/(\S+)/);
	      if (hash !== null) {
	        this.showGallery(hash[1]);
	      } else {
	        this._hideGallery();
	      }
	    }
	  };

	  /**
	    * @param {click} evt
	    */
	  Gallery.prototype._onCloseClick = function(evt) {
	    evt.preventDefault();
	    this._hideGallery();
	  };

	  /**
	    * @param {click} evt
	    */
	  Gallery.prototype._onRightClick = function(evt) {
	    evt.preventDefault();
	    if (this.activePicture === this.galleryPictures.length) {
	      var nextIndex = 1;
	    } else {
	      nextIndex = this.activePicture + 1;
	    }
	    location.hash = 'photo' + this.galleryPictures[nextIndex - 1];
	  };

	  /**
	    * @param {click} evt
	    */
	  Gallery.prototype._onLeftClick = function(evt) {
	    evt.preventDefault();
	    if (this.activePicture === 1) {
	      var previousIndex = this.galleryPictures.length;
	    } else {
	      previousIndex = this.activePicture - 1;
	    }
	    location.hash = 'photo' + this.galleryPictures[previousIndex - 1];
	  };

	  /**
	    * @param {KeyboardEvent} evt
	    */
	  Gallery.prototype._onCloseKeydown = function(evt) {
	    if (utils.isActivationEvent(evt)) {
	      evt.preventDefault();
	      this._hideGallery();
	    }
	  };

	  /**
	    * @param {KeyboardEvent} evt
	    */
	  Gallery.prototype._onDocumentKeyDown = function(evt) {
	    if (utils.isDeactivationEvent(evt)) {
	      evt.preventDefault();
	      this._hideGallery();
	    }
	  };

	  /**
	    * Удаляет обработчик изменения адрессной строки
	    */
	  Gallery.prototype.remove = function() {
	    this._removeEventListener('hashchange', window, this._onhashchange);
	  };

	  return Gallery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(utils) {

	  /**
	   * Создаёт параллакс облачков и включает игру на паузу, если она за пределами видимости.
	   */
	  function setScrollEnabled() {
	    var headerClouds = document.querySelector('.header-clouds');
	    var gameBlock = document.querySelector('.demo');
	    var isCloudsVisible;

	    /**
	     * @const
	     * @type {number}
	     */
	    var THROTTLE_DELAY = 100;

	    var optimizedGameScroll = utils.throttle(function() {
	      var isGameVisible = utils.isElementVisible(gameBlock);
	      if (!isGameVisible && (window.game.state.currentStatus !== window.Game.Verdict.PAUSE)) {
	        window.game.setGameStatus(window.Game.Verdict.PAUSE);
	      }
	    }, THROTTLE_DELAY);

	    var optimizedheckScroll = utils.throttle(function() {
	      isCloudsVisible = utils.isElementVisible(headerClouds);
	    }, THROTTLE_DELAY);

	    window.addEventListener('scroll', optimizedScroll);


	    function optimizedCloudsScroll() {
	      if (isCloudsVisible) {
	        var scrollPosition = window.pageYOffset;
	        headerClouds.style.backgroundPosition = scrollPosition + 'px';
	      }
	    }

	    function optimizedScroll() {
	      optimizedheckScroll();
	      optimizedCloudsScroll();
	      optimizedGameScroll();
	    }
	  }

	  setScrollEnabled();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(cookies) {

	  var form = document.querySelector('.review-form');
	  var formContainer = document.querySelector('.overlay-container');
	  var formOpenButton = document.querySelector('.reviews-controls-new');
	  var formCloseButton = document.querySelector('.review-form-close');
	  var formReviewName = form.elements['review-name'];
	  var formReviewText = form.elements['review-text'];
	  var formReviewGroupMark = form.querySelector('.review-form-group-mark');
	  var formButton = form.querySelector('.review-submit');

	  var invisible = 'invisible';

	  init();

	  form.onsubmit = function() {
	    var now = new Date();
	    var lastBirthday = new Date(now.setMonth(0, 22));
	    var diff = Date.now() - lastBirthday.getTime();

	    if (diff < 0) {
	      lastBirthday.setFullYear(now.getFullYear() - 1);
	      diff = Date.now() - lastBirthday.getTime();
	    }

	    var dateToExpire = Date.now() + diff;
	    var formatteddateToExpire = new Date(dateToExpire).toUTCString();

	    cookies.set('Mark', formReviewGroupMark.elements['review-mark'].value, {expires: formatteddateToExpire});
	    cookies.set('Name', formReviewName.value, {expires: formatteddateToExpire});
	    cookies.set('Review', formReviewText.value, {expires: formatteddateToExpire});
	  };

	  form.oninput = function() {
	    hideLinksTips();
	    disableButton();
	    errorMassege(formReviewName);
	    errorMassege(formReviewText);
	  };

	  formReviewGroupMark.onclick = function onReviewMarkClick(evt) {
	    if (evt .target.getAttribute('name') === 'review-mark') {
	      updateReviewTextRules(evt.target.value);
	      hideLinksTips();
	      disableButton();
	      errorMassege(formReviewName);
	      errorMassege(formReviewText);
	    }
	  };

	  /**
	    * Инициализирует состояние элементов формы.
	    */
	  function init() {
	    formReviewName.required = true;
	    formReviewName.value = cookies.get('Name');
	    formReviewText.value = cookies.get('Review');
	    formReviewGroupMark.elements['review-mark'].value = cookies.get('Mark');
	    updateReviewTextRules(formReviewGroupMark.elements['review-mark'].value);
	  }

	  /**
	    * Обязует заполнять поле отзыва при оценке ниже 3.
	    * @param {string} mark.
	    */
	  function updateReviewTextRules(mark) {
	    if (Number(mark) < 3) {
	      formReviewText.required = true;
	    } else {
	      formReviewText.required = false;
	    }
	  }

	  /**
	    * Прячет подсказки при заполнении полей.
	    */
	  function hideLinksTips() {
	    var formReviewControl = form.querySelector('.review-fields');
	    var fields = [
	      {
	        field: formReviewName,
	        link: form.querySelector('.review-form-controls .review-fields-name')
	      },
	      {
	        field: formReviewText,
	        link: form.querySelector('.review-form-controls .review-fields-text')
	      }
	    ];
	    var counter = fields.length;

	    fields.forEach(function(item) {
	      if (item.field.checkValidity()) {
	        item.link.classList.add(invisible);
	        counter -= 1;

	      } else {
	        item.link.classList.remove(invisible);
	      }
	    });

	    if (counter === 0) {
	      formReviewControl.classList.add(invisible);
	    } else {
	      formReviewControl.classList.remove(invisible);
	    }
	  }

	  /**
	    * Делает кнопку неактивной, пока форма невалидна.
	    */
	  function disableButton() {
	    if ( !(form.checkValidity()) ) {
	      formButton.disabled = true;
	    } else {
	      formButton.disabled = false;
	    }
	  }

	  /**
	    * @param {click} evt
	    */
	  formOpenButton.onclick = function(evt) {
	    evt.preventDefault();
	    formContainer.classList.remove(invisible);
	    disableButton();
	    hideLinksTips();
	  };

	  /**
	    * @param {click} evt
	    */
	  formCloseButton.onclick = function(evt) {
	    evt.preventDefault();
	    formContainer.classList.add(invisible);
	  };

	  /**
	    * Добавляет span с сообщеним об ошибке, если в поле
	    * невалидное значение.
	    * @param {Element} container.
	    */
	  function errorMassege(container) {
	    if (!container.validity.valid && container.parentNode.lastChild.tagName !== 'SPAN') {
	      var span = document.createElement('span');
	      var spanText = document.createTextNode(container.validationMessage);
	      span.appendChild(spanText);
	      span.style.display = 'block';
	      container.style.border = '3px solid red';
	      container.parentNode.appendChild(span);
	    } else if (container.validity.valid && container.parentNode.lastChild.tagName === 'SPAN') {
	      container.parentNode.removeChild(container.parentNode.lastChild);
	      container.style.border = 'none';
	    }
	  }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/***/ function(module, exports) {

	exports.defaults = {};

	exports.set = function(name, value, options) {
	  // Retrieve options and defaults
	  var opts = options || {};
	  var defaults = exports.defaults;

	  // Apply default value for unspecified options
	  var expires  = opts.expires || defaults.expires;
	  var domain   = opts.domain  || defaults.domain;
	  var path     = opts.path     != undefined ? opts.path     : (defaults.path != undefined ? defaults.path : '/');
	  var secure   = opts.secure   != undefined ? opts.secure   : defaults.secure;
	  var httponly = opts.httponly != undefined ? opts.httponly : defaults.httponly;

	  // Determine cookie expiration date
	  // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
	  var expDate = expires ? new Date(
	      // in case expires is an integer, it should specify the number of days till the cookie expires
	      typeof expires == 'number' ? new Date().getTime() + (expires * 864e5) :
	      // else expires should be either a Date object or in a format recognized by Date.parse()
	      expires
	  ) : '';

	  // Set cookie
	  document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent)                // Encode cookie name
	  .replace('(', '%28')
	  .replace(')', '%29') +
	  '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +                  // Encode cookie value (RFC6265)
	  (expDate && expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') + // Add expiration date
	  (domain   ? ';domain=' + domain : '') +                                          // Add domain
	  (path     ? ';path='   + path   : '') +                                          // Add path
	  (secure   ? ';secure'           : '') +                                          // Add secure option
	  (httponly ? ';httponly'         : '');                                           // Add httponly option
	};

	exports.get = function(name) {
	  var cookies = document.cookie.split(';');

	  // Iterate all cookies
	  for(var i = 0; i < cookies.length; i++) {
	    var cookie = cookies[i];
	    var cookieLength = cookie.length;

	    // Determine separator index ("name=value")
	    var separatorIndex = cookie.indexOf('=');

	    // IE<11 emits the equal sign when the cookie value is empty
	    separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;

	    // Decode the cookie name and remove any leading/trailing spaces, then compare to the requested cookie name
	    if (decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+|\s+$/g, '')) == name) {
	      return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
	    }
	  }

	  return null;
	};

	exports.erase = function(name, options) {
	  exports.set(name, '', {
	    expires:  -1,
	    domain:   options && options.domain,
	    path:     options && options.path,
	    secure:   0,
	    httponly: 0}
	  );
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  /**
	   * @const
	   * @type {number}
	   */
	  var HEIGHT = 300;

	  /**
	   * @const
	   * @type {number}
	   */
	  var WIDTH = 700;

	  /**
	   * ID уровней.
	   * @enum {number}
	   */
	  var Level = {
	    'INTRO': 0,
	    'MOVE_LEFT': 1,
	    'MOVE_RIGHT': 2,
	    'LEVITATE': 3,
	    'HIT_THE_MARK': 4
	  };

	  /**
	   * Порядок прохождения уровней.
	   * @type {Array.<Level>}
	   */
	  var LevelSequence = [
	    Level.INTRO
	  ];

	  /**
	   * Начальный уровень.
	   * @type {Level}
	   */
	  var INITIAL_LEVEL = LevelSequence[0];

	  /**
	   * Допустимые виды объектов на карте.
	   * @enum {number}
	   */
	  var ObjectType = {
	    'ME': 0,
	    'FIREBALL': 1
	  };

	  /**
	   * Допустимые состояния объектов.
	   * @enum {number}
	   */
	  var ObjectState = {
	    'OK': 0,
	    'DISPOSED': 1
	  };

	  /**
	   * Коды направлений.
	   * @enum {number}
	   */
	  var Direction = {
	    NULL: 0,
	    LEFT: 1,
	    RIGHT: 2,
	    UP: 4,
	    DOWN: 8
	  };

	  /**
	   * Правила перерисовки объектов в зависимости от состояния игры.
	   * @type {Object.<ObjectType, function(Object, Object, number): Object>}
	   */
	  var ObjectsBehaviour = {};

	  /**
	   * Обновление движения мага. Движение мага зависит от нажатых в данный момент
	   * стрелок. Маг может двигаться одновременно по горизонтали и по вертикали.
	   * На движение мага влияет его пересечение с препятствиями.
	   * @param {Object} object
	   * @param {Object} state
	   * @param {number} timeframe
	   */
	  ObjectsBehaviour[ObjectType.ME] = function(object, state, timeframe) {
	    // Пока зажата стрелка вверх, маг сначала поднимается, а потом левитирует
	    // в воздухе на определенной высоте.
	    // NB! Сложность заключается в том, что поведение описано в координатах
	    // канваса, а не координатах, относительно нижней границы игры.
	    if (state.keysPressed.UP && object.y > 0) {
	      object.direction = object.direction & ~Direction.DOWN;
	      object.direction = object.direction | Direction.UP;
	      object.y -= object.speed * timeframe * 2;

	      if (object.y < 0) {
	        object.y = 0;
	      }
	    }

	    // Если стрелка вверх не зажата, а маг находится в воздухе, он плавно
	    // опускается на землю.
	    if (!state.keysPressed.UP) {
	      if (object.y < HEIGHT - object.height) {
	        object.direction = object.direction & ~Direction.UP;
	        object.direction = object.direction | Direction.DOWN;
	        object.y += object.speed * timeframe / 3;
	      } else {
	        object.Direction = object.direction & ~Direction.DOWN;
	      }
	    }

	    // Если зажата стрелка влево, маг перемещается влево.
	    if (state.keysPressed.LEFT) {
	      object.direction = object.direction & ~Direction.RIGHT;
	      object.direction = object.direction | Direction.LEFT;
	      object.x -= object.speed * timeframe;
	    }

	    // Если зажата стрелка вправо, маг перемещается вправо.
	    if (state.keysPressed.RIGHT) {
	      object.direction = object.direction & ~Direction.LEFT;
	      object.direction = object.direction | Direction.RIGHT;
	      object.x += object.speed * timeframe;
	    }

	    // Ограничения по перемещению по полю. Маг не может выйти за пределы поля.
	    if (object.y < 0) {
	      object.y = 0;
	      object.Direction = object.direction & ~Direction.DOWN;
	      object.Direction = object.direction & ~Direction.UP;
	    }

	    if (object.y > HEIGHT - object.height) {
	      object.y = HEIGHT - object.height;
	      object.Direction = object.direction & ~Direction.DOWN;
	      object.Direction = object.direction & ~Direction.UP;
	    }

	    if (object.x < 0) {
	      object.x = 0;
	    }

	    if (object.x > WIDTH - object.width) {
	      object.x = WIDTH - object.width;
	    }
	  };

	  /**
	   * Обновление движения файрбола. Файрбол выпускается в определенном направлении
	   * и после этого неуправляемо движется по прямой в заданном направлении. Если
	   * он пролетает весь экран насквозь, он исчезает.
	   * @param {Object} object
	   * @param {Object} state
	   * @param {number} timeframe
	   */
	  ObjectsBehaviour[ObjectType.FIREBALL] = function(object, state, timeframe) {
	    if (object.direction & Direction.LEFT) {
	      object.x -= object.speed * timeframe;
	    }

	    if (object.direction & Direction.RIGHT) {
	      object.x += object.speed * timeframe;
	    }

	    if (object.x < 0 || object.x > WIDTH) {
	      object.state = ObjectState.DISPOSED;
	    }
	  };

	  /**
	   * ID возможных ответов функций, проверяющих успех прохождения уровня.
	   * CONTINUE говорит о том, что раунд не закончен и игру нужно продолжать,
	   * WIN о том, что раунд выигран, FAIL — о поражении. PAUSE о том, что игру
	   * нужно прервать.
	   * @enum {number}
	   */
	  var Verdict = {
	    'CONTINUE': 0,
	    'WIN': 1,
	    'FAIL': 2,
	    'PAUSE': 3,
	    'INTRO': 4
	  };

	  /**
	   * Правила завершения уровня. Ключами служат ID уровней, значениями функции
	   * принимающие на вход состояние уровня и возвращающие true, если раунд
	   * можно завершать или false если нет.
	   * @type {Object.<Level, function(Object):boolean>}
	   */
	  var LevelsRules = {};

	  /**
	   * Уровень считается пройденным, если был выпущен файлболл и он улетел
	   * за экран.
	   * @param {Object} state
	   * @return {Verdict}
	   */
	  LevelsRules[Level.INTRO] = function(state) {
	    var fireballs = state.garbage.filter(function(object) {
	      return object.type === ObjectType.FIREBALL;
	    });

	    return fireballs.length ? Verdict.WIN : Verdict.CONTINUE;
	  };

	  /**
	   * Начальные условия для уровней.
	   * @enum {Object.<Level, function>}
	   */
	  var LevelsInitialize = {};

	  /**
	   * Первый уровень.
	   * @param {Object} state
	   * @return {Object}
	   */
	  LevelsInitialize[Level.INTRO] = function(state) {
	    state.objects.push(
	      // Установка персонажа в начальное положение. Он стоит в крайнем левом
	      // углу экрана, глядя вправо. Скорость перемещения персонажа на этом
	      // уровне равна 2px за кадр.
	      {
	        direction: Direction.RIGHT,
	        height: 84,
	        speed: 2,
	        sprite: 'img/wizard.gif',
	        spriteReversed: 'img/wizard-reversed.gif',
	        state: ObjectState.OK,
	        type: ObjectType.ME,
	        width: 61,
	        x: WIDTH / 3,
	        y: HEIGHT - 100
	      }
	    );

	    return state;
	  };

	  /**
	   * Конструктор объекта Game. Создает canvas, добавляет обработчики событий
	   * и показывает приветственный экран.
	   * @param {Element} container
	   * @constructor
	   */
	  var Game = function(container) {
	    this.container = container;
	    this.canvas = document.createElement('canvas');
	    this.canvas.width = container.clientWidth;
	    this.canvas.height = container.clientHeight;
	    this.container.appendChild(this.canvas);

	    this.ctx = this.canvas.getContext('2d');

	    this._onKeyDown = this._onKeyDown.bind(this);
	    this._onKeyUp = this._onKeyUp.bind(this);
	    this._pauseListener = this._pauseListener.bind(this);
	  };

	  Game.prototype = {
	    /**
	     * Текущий уровень игры.
	     * @type {Level}
	     */
	    level: INITIAL_LEVEL,

	    /**
	     * Состояние игры. Описывает местоположение всех объектов на игровой карте
	     * и время проведенное на уровне и в игре.
	     * @return {Object}
	     */
	    getInitialState: function() {
	      return {
	        // Статус игры. Если CONTINUE, то игра продолжается.
	        currentStatus: Verdict.CONTINUE,

	        // Объекты, удаленные на последнем кадре.
	        garbage: [],

	        // Время с момента отрисовки предыдущего кадра.
	        lastUpdated: null,

	        // Состояние нажатых клавиш.
	        keysPressed: {
	          ESC: false,
	          LEFT: false,
	          RIGHT: false,
	          SPACE: false,
	          UP: false
	        },

	        // Время начала прохождения уровня.
	        levelStartTime: null,

	        // Все объекты на карте.
	        objects: [],

	        // Время начала прохождения игры.
	        startTime: null
	      };
	    },

	    /**
	     * Начальные проверки и запуск текущего уровня.
	     * @param {Level=} level
	     * @param {boolean=} restart
	     */
	    initializeLevelAndStart: function(level, restart) {
	      level = typeof level === 'undefined' ? this.level : level;
	      restart = typeof restart === 'undefined' ? true : restart;

	      if (restart || !this.state) {
	        // При перезапуске уровня, происходит полная перезапись состояния
	        // игры из изначального состояния.
	        this.state = this.getInitialState();
	        this.state = LevelsInitialize[this.level](this.state);
	      } else {
	        // При продолжении уровня состояние сохраняется, кроме записи о том,
	        // что состояние уровня изменилось с паузы на продолжение игры.
	        this.state.currentStatus = Verdict.CONTINUE;
	      }

	      // Запись времени начала игры и времени начала уровня.
	      this.state.levelStartTime = Date.now();
	      if (!this.state.startTime) {
	        this.state.startTime = this.state.levelStartTime;
	      }

	      this._preloadImagesForLevel(function() {
	        // Предварительная отрисовка игрового экрана.
	        this.render();

	        // Установка обработчиков событий.
	        this._initializeGameListeners();

	        // Запуск игрового цикла.
	        this.update();
	      }.bind(this));
	    },

	    /**
	     * Временная остановка игры.
	     * @param {Verdict=} verdict
	     */
	    pauseLevel: function(verdict) {
	      if (verdict) {
	        this.state.currentStatus = verdict;
	      }

	      this.state.keysPressed.ESC = false;
	      this.state.lastUpdated = null;

	      this._removeGameListeners();
	      window.addEventListener('keydown', this._pauseListener);

	      this._drawPauseScreen();
	    },

	    /**
	     * Обработчик событий клавиатуры во время паузы.
	     * @param {KeyboardsEvent} evt
	     * @private
	     * @private
	     */
	    _pauseListener: function(evt) {
	      if (evt.keyCode === 32) {
	        evt.preventDefault();
	        var needToRestartTheGame = this.state.currentStatus === Verdict.WIN ||
	            this.state.currentStatus === Verdict.FAIL;
	        this.initializeLevelAndStart(this.level, needToRestartTheGame);

	        window.removeEventListener('keydown', this._pauseListener);
	      }
	    },

	    /**
	     * Отрисовка экрана паузы.
	     */
	    _drawPauseScreen: function() {
	      var messageWidth = 300;
	      switch (this.state.currentStatus) {
	        case Verdict.WIN:
	          this.drawMessage('Поздравляем! Вы успешно закончили этот уровень.', messageWidth);
	          break;
	        case Verdict.FAIL:
	          this.drawMessage('Вы проиграли. Попробуйте ещё раз!', messageWidth);
	          break;
	        case Verdict.PAUSE:
	          this.drawMessage('Пауза. Скорее возвращайтсь в игру. Для этого нажмите пробел', messageWidth);
	          break;
	        case Verdict.INTRO:
	          this.drawMessage('Добро пожаловать в игру! Нажмите пробел, чтобы начать. Приятного вам времяпрепровождения!', messageWidth);
	          break;
	      }
	    },

	    /**
	     * Отрисовка сообщения через canvas.
	     * @param {string} text
	     * @param {number} messageWidth
	     */
	    drawMessage: function(text, messageWidth) {
	      var ctx = this.ctx;
	      var lineHeight = getFontHeight();
	      var linesArray = createArray();
	      var messageHeight = lineHeight * linesArray.length + 10;
	      var x = (this.canvas.width / 2) - (messageWidth / 2);
	      var y = (this.canvas.height / 2) - (messageHeight / 2);

	      drawRect();
	      drawText();

	      /**
	       * Создание массива со строками.
	       * @return {array}
	       */
	      function createArray() {
	        var words = text.split(' ');
	        var line = '';
	        var result = [];

	        words.forEach(function(word) {
	          var testLine = line + word + ' ';
	          var testLineWidth = ctx.measureText(testLine).width;
	          if (testLineWidth > messageWidth) {
	            result.push(line);
	            line = word + ' ';
	          } else {
	            line = testLine;
	          }
	        });
	        result.push(line);
	        return result;
	      }

	      /**
	       * Отрисовка фона сообщения.
	       */
	      function drawRect() {
	        var shadowOffsetX = 10;
	        var shadowOffsetY = 10;
	        var marginRight = 10;
	        ctx.beginPath();
	        ctx.fillStyle = 'white';
	        ctx.rect(x, y, messageWidth + marginRight, messageHeight);
	        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
	        ctx.shadowOffsetX = shadowOffsetX;
	        ctx.shadowOffsetY = shadowOffsetY;
	        ctx.fill();
	      }

	      /**
	       * Отрисовка текста сообщения.
	       */
	      function drawText() {
	        var marginLeft = 10 + x;
	        var marginTop = 20 + y;
	        ctx.fillStyle = 'blue';
	        ctx.shadowColor = 'transparent';

	        linesArray.forEach(function(line, index) {
	          ctx.fillText(line, marginLeft, marginTop);
	          marginTop = 20 + y;
	          marginTop = marginTop + (lineHeight * (index + 1));
	        });
	      }

	      /**
	       * Определение высоты текста.
	       * @return {number}
	       */
	      function getFontHeight() {
	        ctx.font = '16px PT Mono';
	        var font = ctx.font;
	        var lineHeightCoefficient = 1.4;
	        var fontText = font.split(' ');
	        var height = parseInt(fontText[0], 10) * lineHeightCoefficient;
	        return height;
	      }
	    },

	    /**
	     * Предзагрузка необходимых изображений для уровня.
	     * @param {function} callback
	     * @private
	     */
	    _preloadImagesForLevel: function(callback) {
	      if (typeof this._imagesArePreloaded === 'undefined') {
	        this._imagesArePreloaded = [];
	      }

	      if (this._imagesArePreloaded[this.level]) {
	        callback();
	        return;
	      }

	      var levelImages = [];
	      this.state.objects.forEach(function(object) {
	        levelImages.push(object.sprite);

	        if (object.spriteReversed) {
	          levelImages.push(object.spriteReversed);
	        }
	      });

	      var i = levelImages.length;
	      var imagesToGo = levelImages.length;

	      while (i-- > 0) {
	        var image = new Image();
	        image.src = levelImages[i];
	        image.onload = function() {
	          if (--imagesToGo === 0) {
	            this._imagesArePreloaded[this.level] = true;
	            callback();
	          }
	        }.bind(this);
	      }
	    },

	    /**
	     * Обновление статуса объектов на экране. Добавляет объекты, которые должны
	     * появиться, выполняет проверку поведения всех объектов и удаляет те, которые
	     * должны исчезнуть.
	     * @param {number} delta Время, прошеднее с отрисовки прошлого кадра.
	     */
	    updateObjects: function(delta) {
	      // Персонаж.
	      var me = this.state.objects.filter(function(object) {
	        return object.type === ObjectType.ME;
	      })[0];

	      // Добавляет на карту файрбол по нажатию на Shift.
	      if (this.state.keysPressed.SHIFT) {
	        this.state.objects.push({
	          direction: me.direction,
	          height: 24,
	          speed: 5,
	          sprite: 'img/fireball.gif',
	          type: ObjectType.FIREBALL,
	          width: 24,
	          x: me.direction & Direction.RIGHT ? me.x + me.width : me.x - 24,
	          y: me.y + me.height / 2
	        });

	        this.state.keysPressed.SHIFT = false;
	      }

	      this.state.garbage = [];

	      // Убирает в garbage не используемые на карте объекты.
	      var remainingObjects = this.state.objects.filter(function(object) {
	        ObjectsBehaviour[object.type](object, this.state, delta);

	        if (object.state === ObjectState.DISPOSED) {
	          this.state.garbage.push(object);
	          return false;
	        }

	        return true;
	      }, this);

	      this.state.objects = remainingObjects;
	    },

	    /**
	     * Проверка статуса текущего уровня.
	     */
	    checkStatus: function() {
	      // Нет нужны запускать проверку, нужно ли останавливать уровень, если
	      // заранее известно, что да.
	      if (this.state.currentStatus !== Verdict.CONTINUE) {
	        return;
	      }

	      if (!this.commonRules) {
	        /**
	         * Проверки, не зависящие от уровня, но влияющие на его состояние.
	         * @type {Array.<functions(Object):Verdict>}
	         */
	        this.commonRules = [
	          /**
	           * Если персонаж мертв, игра прекращается.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function checkDeath(state) {
	            var me = state.objects.filter(function(object) {
	              return object.type === ObjectType.ME;
	            })[0];

	            return me.state === ObjectState.DISPOSED ?
	                Verdict.FAIL :
	                Verdict.CONTINUE;
	          },

	          /**
	           * Если нажата клавиша Esc игра ставится на паузу.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function checkKeys(state) {
	            return state.keysPressed.ESC ? Verdict.PAUSE : Verdict.CONTINUE;
	          },

	          /**
	           * Игра прекращается если игрок продолжает играть в нее два часа подряд.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function checkTime(state) {
	            return Date.now() - state.startTime > 3 * 60 * 1000 ?
	                Verdict.FAIL :
	                Verdict.CONTINUE;
	          }
	        ];
	      }

	      // Проверка всех правил влияющих на уровень. Запускаем цикл проверок
	      // по всем универсальным проверкам и проверкам конкретного уровня.
	      // Цикл продолжается до тех пор, пока какая-либо из проверок не вернет
	      // любое другое состояние кроме CONTINUE или пока не пройдут все
	      // проверки. После этого состояние сохраняется.
	      var allChecks = this.commonRules.concat(LevelsRules[this.level]);
	      var currentCheck = Verdict.CONTINUE;
	      var currentRule;

	      while (currentCheck === Verdict.CONTINUE && allChecks.length) {
	        currentRule = allChecks.shift();
	        currentCheck = currentRule(this.state);
	      }

	      this.state.currentStatus = currentCheck;
	    },

	    /**
	     * Принудительная установка состояния игры. Используется для изменения
	     * состояния игры от внешних условий, например, когда необходимо остановить
	     * игру, если она находится вне области видимости и установить вводный
	     * экран.
	     * @param {Verdict} status
	     */
	    setGameStatus: function(status) {
	      if (this.state.currentStatus !== status) {
	        this.state.currentStatus = status;
	      }
	    },

	    /**
	     * Отрисовка всех объектов на экране.
	     */
	    render: function() {
	      // Удаление всех отрисованных на странице элементов.
	      this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

	      // Выставление всех элементов, оставшихся в this.state.objects согласно
	      // их координатам и направлению.
	      this.state.objects.forEach(function(object) {
	        if (object.sprite) {
	          var image = new Image(object.width, object.height);
	          image.src = (object.spriteReversed && object.direction & Direction.LEFT) ?
	              object.spriteReversed :
	              object.sprite;
	          this.ctx.drawImage(image, object.x, object.y, object.width, object.height);
	        }
	      }, this);
	    },

	    /**
	     * Основной игровой цикл. Сначала проверяет состояние всех объектов игры
	     * и обновляет их согласно правилам их поведения, а затем запускает
	     * проверку текущего раунда. Рекурсивно продолжается до тех пор, пока
	     * проверка не вернет состояние FAIL, WIN или PAUSE.
	     */
	    update: function() {
	      if (!this.state.lastUpdated) {
	        this.state.lastUpdated = Date.now();
	      }

	      var delta = (Date.now() - this.state.lastUpdated) / 10;
	      this.updateObjects(delta);
	      this.checkStatus();

	      switch (this.state.currentStatus) {
	        case Verdict.CONTINUE:
	          this.state.lastUpdated = Date.now();
	          this.render();
	          requestAnimationFrame(function() {
	            this.update();
	          }.bind(this));
	          break;

	        case Verdict.WIN:
	        case Verdict.FAIL:
	        case Verdict.PAUSE:
	        case Verdict.INTRO:
	        default:
	          this.pauseLevel();
	          break;
	      }
	    },

	    /**
	     * @param {KeyboardEvent} evt [description]
	     * @private
	     */
	    _onKeyDown: function(evt) {
	      switch (evt.keyCode) {
	        case 37:
	          this.state.keysPressed.LEFT = true;
	          break;
	        case 39:
	          this.state.keysPressed.RIGHT = true;
	          break;
	        case 38:
	          this.state.keysPressed.UP = true;
	          break;
	        case 27:
	          this.state.keysPressed.ESC = true;
	          break;
	      }

	      if (evt.shiftKey) {
	        this.state.keysPressed.SHIFT = true;
	      }
	    },

	    /**
	     * @param {KeyboardEvent} evt [description]
	     * @private
	     */
	    _onKeyUp: function(evt) {
	      switch (evt.keyCode) {
	        case 37:
	          this.state.keysPressed.LEFT = false;
	          break;
	        case 39:
	          this.state.keysPressed.RIGHT = false;
	          break;
	        case 38:
	          this.state.keysPressed.UP = false;
	          break;
	        case 27:
	          this.state.keysPressed.ESC = false;
	          break;
	      }

	      if (evt.shiftKey) {
	        this.state.keysPressed.SHIFT = false;
	      }
	    },

	    /** @private */
	    _initializeGameListeners: function() {
	      window.addEventListener('keydown', this._onKeyDown);
	      window.addEventListener('keyup', this._onKeyUp);
	    },

	    /** @private */
	    _removeGameListeners: function() {
	      window.removeEventListener('keydown', this._onKeyDown);
	      window.removeEventListener('keyup', this._onKeyUp);
	    }
	  };

	  window.Game = Game;
	  window.Game.Verdict = Verdict;


	  window.onload = function() {
	    window.game = new Game(document.querySelector('.demo'));
	    window.game.initializeLevelAndStart();
	    window.game.setGameStatus(window.Game.Verdict.INTRO);
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
]);