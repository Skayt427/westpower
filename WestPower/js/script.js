document.addEventListener("DOMContentLoaded", function () {
  // get input
  let dataForm = document.querySelectorAll('.data__box');

  dataForm.forEach(dataForm => {
    let dataInput = dataForm.querySelector('.data__input');
    let btnEdit = dataForm.querySelector('.data__edit');
    let btnSave = dataForm.querySelector('.data__save');

    if (dataInput.value !== '') {
      btnEdit.style.display = 'flex';
      dataInput.setAttribute('disabled', '');
    };

    if (dataInput.value == '') {
      btnSave.style.display = 'flex';
      if (dataInput.getAttribute('type') == 'password') {
        dataInput.setAttribute('type', 'text');
      };
    };

    btnEdit.addEventListener('click', () => {
      editInput(dataInput, btnEdit, btnSave);
    });

    btnSave.addEventListener('click', (e) => {
      e.preventDefault();
      let valid = checkValue(dataInput);
      if (valid) {
        saveInput(dataInput, btnEdit, btnSave, e);
        dataInput.removeAttribute('style');
      } else {
        dataInput.style.borderColor = 'red';
      }
    });
  });

  // edit input
  function editInput(input, edit, save) {
    input.removeAttribute('disabled');
    edit.style.display = 'none';
    save.style.display = 'flex';
    if (input.getAttribute('type') == 'password') {
      input.setAttribute('type', 'text');
    };
  };

  // save input
  function saveInput(input, edit, save) {
    input.setAttribute('disabled', '');
    save.style.display = 'none';
    edit.style.display = 'flex';
    if (input.getAttribute('type') == 'text') {
      input.setAttribute('type', 'password');
    };
  };

  // inputmask
  new Inputmask({
    mask: '+7(999)999-9999',
    clearMaskOnLostFocus: false,
    oncomplete: function () {
      checkValue(this);
    },
    onincomplete: function () {
      checkValue(this);
    },
  }).mask(document.querySelectorAll('input[type="tel"]'));


  // validation
  function checkValue(input) {
    let isValid = false;

    if (input.getAttribute('type') == 'tel') {
      isValid = Inputmask.isValid(input.value, { mask: "+7(999)999-9999" });
    } else if (input.getAttribute('type') == 'email') {
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      reg.test(input.value) ? isValid = true : isValid = false;
    } else if (input.getAttribute('type') == 'text' && input.classList.contains('data__input') || input.getAttribute('type') == 'text') {
      let reg = /^[A-Za-z0-9]\w{5,14}$/;
      reg.test(input.value) ? isValid = true : isValid = false;
    };

    if (!isValid) {
      return false;
    } else {
      return true;
    };
  };

  // slideToggle
  let linkToggle = document.querySelectorAll('.js-toggle');

  for (i = 0; i < linkToggle.length; i++) {
    linkToggle[i].addEventListener('click', function (event) {
      event.preventDefault();
      let container = document.getElementById(this.dataset.container);

      if (!container.classList.contains('active')) {
        this.querySelector('.dropdown__arrow').style.transform = 'rotate(360deg)';
        container.classList.add('active');
        container.style.height = 'auto';
        let height = container.clientHeight + 'px';
        container.style.height = '0px';
        setTimeout(function () {
          container.style.height = height;
        }, 0);
      } else {
        this.querySelector('.dropdown__arrow').removeAttribute('style');
        container.style.height = '0px';
        container.addEventListener('transitionend', function () {
          container.classList.remove('active');
        }, {
          once: true
        });
      };
    });
  };
});