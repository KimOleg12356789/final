



$(document).ready(function(){


$('.drop-down-key').on('click', function () {
    $(this).next().toggleClass('active');
  });

  $('.drop-down-language li').on('click', function (e) {
    $(this).parents('.drop-down-language').prev().find('p').text($(this).text().trim());
    $(this).parents('.drop-down-language').toggleClass('active');
    $(this).find('a').toggleClass('selected');
    let selectedDataId = $(this).data('id');

    e.preventDefault()

    let imgSrc = $(this).find('img').attr('src');
    $(this).parents('.drop-down-language').prev().find('img').attr('src', imgSrc)
  });

  
  $('.drop-down-language li a.selected').each(function () {
    
    if ($('.drop-down-language li a').hasClass('selected')) {
      let imgSrc = $(this).parent().find('img').attr('src');
      $(this).parents('.drop-down-language').prev().find('img').attr('src', imgSrc)
      $(this).parents('.drop-down-language').prev().find('p').text($(this).text().trim());
    }

  })


  });