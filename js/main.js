




let isFormInLoading = false;
const formEventSetup = () => {
  const form = document.querySelector('form.lead__form');

  if(!form) return;

  const emailField = form.querySelector('#email-phone');
  const notifyField = form.querySelector('#notify');

  const formButton = form.querySelector('.lead__action > button')
  const informationText = form.querySelector('.information-text');
  const radios = document.querySelectorAll('input[type="radio"][name="gender"]');
  let selectedRadio = '';

  const setButtonLoading = (loader = true) => {
    if(loader) {
      formButton.innerHTML = 'Загрузка...'
    } else {
      formButton.innerHTML = 'Відправити'
    }
  }

  const setText = (text, type) => {
    if(type === 0) {
      informationText.classList.add('error');
      informationText.classList.remove('success');
    } else {
      informationText.classList.remove('error');
      informationText.classList.add('success');
    }

    informationText.innerHTML = text;
  }

  const setError = (errorText) => {
    setText(errorText, 0)
  }

  const setSuccess = (successText) => {
    setText(successText, 1)

    if(formButton) {
      formButton.remove();
    }

  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();


    for (const radio of radios) {
      if (radio.checked) {
        selectedRadio = radio.value;
        break;
      }
    }

    // validations
    if(!selectedRadio.length) {
      setError('Вы не указали пол!')
      return;
    }

    if (!emailField.value.length) {
      setError('Вы не указали почту або телефон!')
      return;
    }

    if(!notifyField.value.length) {
      setError('Вы не указали повідомлення!')
      return;
    }

    if(isFormInLoading) return;
    setButtonLoading(true);
    isFormInLoading = true;

    let data = {
      gender: selectedRadio,  // or "female" or any other value
      email: emailField.value,
      comment: notifyField.value
    };

    fetch('sendForm.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setSuccess('Успішно відправлено!')
        isFormInLoading = false;
        setButtonLoading(false);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    //
  })
}

const setUpActionsCounter = () => {
  const counters = document.querySelectorAll('.counter');

  counters.forEach((item) => {
      const [prev, next] = item.querySelectorAll('.counter-actions-item');

      // Обработка клика по prev
      if(!prev.classList.contains('disabled')) {
          prev.addEventListener('click', () => {
              const targetId = prev.dataset.href;
              const targetElement = document.querySelector(`.${targetId}`);
              if(targetElement) {
                  targetElement.scrollIntoView({
                      behavior: 'smooth'
                  });
              }
          });
      }

      // Обработка клика по next (если у вас есть атрибут data-href для next)
      if(next && !next.classList.contains('disabled')) {
          next.addEventListener('click', () => {
              const targetId = next.dataset.href;
              const targetElement = document.querySelector(`.${targetId}`);
              if(targetElement) {
                  targetElement.scrollIntoView({
                      behavior: 'smooth'
                  });
              }
          });
      }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  formEventSetup();
  // setUpActionsCounter();

  if (window.innerWidth > 768) {
    const swiper = new Swiper(".swiper", {
      direction: "vertical",
      touchMoveStopPropagation: false,
      nested: true,
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: {
        releaseOnEdges: true,
        sensitivity: 0.5,
        thresholdDelta: 20,
        forceToAxis: true,
    },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: '.counter .counter-actions-item:not(.disabled)[data-direction="next"]',
        prevEl: '.counter .counter-actions-item:not(.disabled)[data-direction="prev"]',
      },
    });

    document.querySelectorAll('[data-click]').forEach((item) => {
      const dataIndex = +item.getAttribute('data-click')
      item.addEventListener('click', () => {
        swiper.slideTo(dataIndex - 1)
      })
    })

    document.querySelector('.swiper-slide:last-child').addEventListener('scroll', function(event) {
      if (event.target.scrollTop === 0) {
          swiper.mousewheel.enable();
      } else {
          swiper.mousewheel.disable();
      }
  });

  } else {
    const swipeSliders = document.querySelectorAll('.swiper-slide');
    document.querySelectorAll('[data-click]').forEach((item) => {
      const dataIndex = +item.getAttribute('data-click') - 1
      item.addEventListener('click', () => {
        if (dataIndex < swipeSliders.length) {
          swipeSliders[dataIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      })
    })
  }

  if (window.innerWidth <= 767) {
      document.body.classList.add('mobile-device');

      // Get the video and its source element
      const videoElement = document.querySelector('.first__background-video');
      const sourceElement = videoElement.querySelector('source');

      // Change the source and load the new video
      sourceElement.setAttribute('src', 'resource/section-1-mobile.mp4'); // Change to your mobile video path
      videoElement.load(); // Load the new source
  }

  document.querySelectorAll('video').forEach(video => {
    video.classList.add('inlinevideo');
  });

  document.body.addEventListener('click', playInlineVideos);
  document.body.addEventListener('touchstart', playInlineVideos);

  function playInlineVideos() {
      document.querySelectorAll('.inlinevideo').forEach(video => {
          if (video.paused) {
              video.play();
          }
      });
  }
});






