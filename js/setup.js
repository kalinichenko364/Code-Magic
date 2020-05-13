'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

// Показать попап
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupCloseBtn = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
}

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

setupOpen.addEventListener('click', function () {
  openPopup(setup);
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupCloseBtn.addEventListener('click', function () {
  closePopup();
});

setupCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});


var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// userNameInput.addEventListener('input', function (evt) {
//   var target = evt.target;
//   if (target.value.length < MIN_NAME_LENGTH) {
//     target.setCustomValidity(
//       'Имя должно состоять минимум из ' +
//       MIN_NAME_LENGTH +
//       '-х символов'
//     );
//   } else {
//     target.setCustomValidity('');
//   }
// });


// Показать волшебников
setup.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Рандомная выборка одного элемента из массива
var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Создать обьект одного рандомного волшебника
var createWizard = function () {
  var wizard = {};
  wizard.name = getRandomArrayElement(WIZARD_NAMES);
  wizard.surname = getRandomArrayElement(WIZARD_SURNAMES);
  wizard.coatColor = getRandomArrayElement(COAT_COLORS);
  wizard.eyesColor = getRandomArrayElement(EYES_COLORS);
  return wizard;
};

// Создать массив из рандомных волшебников заданого количества
var createWizardsArray = function (quantity) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    wizards.push(createWizard());
  }
  return wizards;
};

// Записать в переменную 4 вошебника
var wizards = createWizardsArray(4);

// Создать один елемент волшебника на основе шаблона разметки
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Сгенерировать список волшебников из шаблона одного рандомного
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);


// 4. одеть Надежду

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupWizard = setup.querySelector('.setup-wizard');

var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');

var coatInput = setup.querySelector('input[name="coat-color"]');
var eyesInput = setup.querySelector('input[name="eyes-color"]');
var fireballInput = setup.querySelector('input[name="fireball-color"]');

var setRandomColorElement = function (collors, element, property, inputElement) {
  var randomCollor = getRandomArrayElement(collors);
  element.style[property] = randomCollor;
  inputElement.value = randomCollor;
}

var setRandomColorCoat = function () {
  setRandomColorElement(COAT_COLORS, setupWizardCoat, 'fill', coatInput);
};
var setRandomColorEyes = function () {
  setRandomColorElement(EYES_COLORS, setupWizardEyes, 'fill', eyesInput);
};
var setRandomColorFireball = function () {
  setRandomColorElement(FIREBALL_COLORS, setupWizardFireball, 'background', fireballInput);
};

setupWizardCoat.addEventListener('click', setRandomColorCoat);
var onEyesClick = setupWizardEyes.addEventListener('click', setRandomColorEyes);
var onFireballClick = setupWizardFireball.addEventListener('click', setRandomColorFireball);
