'use strict';

// Показать попап
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Показать волшебников
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

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
