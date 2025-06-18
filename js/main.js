document.addEventListener("DOMContentLoaded", function () {


(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });
  // Establece la fecha y hora del evento (formato: Año, Mes - 1, Día, Hora, Minuto, Segundo)
  var fechaEvento = new Date(2025, 6, 26, 18, 45, 0); // 15 de junio de 2025 a las 18:00

  function actualizarContador() {
    var ahora = new Date();
    var diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {
      document.getElementById("contador").innerHTML = "¡El evento ha comenzado!";
      clearInterval(intervalo);
      return;
    }

    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    var minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    var segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById("dias").textContent = dias.toString().padStart(2, '0');
    document.getElementById("horas").textContent = horas.toString().padStart(2, '0');
    document.getElementById("minutos").textContent = minutos.toString().padStart(2, '0');
    document.getElementById("segundos").textContent = segundos.toString().padStart(2, '0');
  }

  // Actualiza el contador cada segundo
  var intervalo = setInterval(actualizarContador, 1000);
  actualizarContador(); // Llama a la función inmediatamente

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Modal Video
$(document).ready(function () {
  var $videoSrc;

  $('.btn-play').click(function () {
    $videoSrc = $(this).data("src");
    // Guarda la fuente y la aplica al abrir
    $('#videoModal').data('video-src', $videoSrc);
  });

  $('#videoModal').on('shown.bs.modal', function () {
    var src = $(this).data('video-src');
    var video = $("#video")[0];
    $("#video source").attr('src', src);
    video.load();
    video.play();
  });

  $('#videoModal').on('hide.bs.modal', function () {
    var video = $("#video")[0];
    video.pause();
    video.currentTime = 0;
    $("#video source").attr('src', '');
    video.load(); // evita que quede congelado o sin control al reabrir
  });
});


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });

    document.querySelectorAll('.btn-location').forEach(button => {
        button.addEventListener('click', function() {
          const locationUrl = this.getAttribute('data-location');
          window.open(locationUrl, '_blank');
        });
      });


     // Diccionario con los códigos válidos y su límite de asistentes
const codigosPermitidos = {
  "FAM001": { adultos: 3, ninos: 2 },
  "FAM002": { adultos: 4, ninos: 0 },
  "INVINE1": { adultos: 1, ninos: 0 },
  "PAD001": { adultos: 6, ninos: 4 }
};

  const codigoInput = document.getElementById("codigo");
  const asistentesSelect = document.getElementById("asistentes");
const ninosSelect = document.getElementById("ninos");
const ninosGroup = ninosSelect.closest(".form-row"); // Asegúrate que esté dentro de un form-row

// Oculta el campo de niños por defecto
ninosGroup.style.display = "none";

codigoInput.addEventListener("blur", () => {
  const codigo = codigoInput.value.trim().toUpperCase();
  const permisos = codigosPermitidos[codigo];

  asistentesSelect.innerHTML = '<option value="">Número de Asistentes</option>';
  ninosSelect.innerHTML = '<option value="">Número de Niños</option>';

  if (permisos) {
    // Adultos
    for (let i = 1; i <= permisos.adultos; i++) {
      asistentesSelect.innerHTML += `<option value="${i}">${i}</option>`;
    }

    // Niños
if (permisos.ninos > 0) {
  ninosGroup.style.display = "flex";
  ninosSelect.required = true;
  for (let i = 0; i <= permisos.ninos; i++) {
    ninosSelect.innerHTML += `<option value="${i}">${i}</option>`;
  }
} else {
  ninosGroup.style.display = "none";
  ninosSelect.value = "";
  ninosSelect.required = false;  // <--- Desactiva la validación
}
  } else {
    alert("Código inválido. Por favor verifica tu invitación.");
    asistentesSelect.innerHTML = '<option value="">Número de Asistentes</option>';
    ninosSelect.innerHTML = '<option value="">Número de Niños</option>';
    ninosGroup.style.display = "none";
    ninosSelect.value = "";
  }
});

  // Envío del formulario
  const form = document.getElementById("rsvp-form");
  const msg = document.getElementById("success-msg");

    form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Normalizamos el código de invitación
  const codigo = codigoInput.value.trim().toUpperCase();

  // Validamos que exista en el diccionario
  if (!(codigo in codigosPermitidos)) {
    alert("Código inválido. No puedes enviar el formulario.");
    return;
  }

  const data = new FormData(form);
  fetch("https://script.google.com/macros/s/AKfycbxhxnSlnA9WYBT40gfVj5PN8xzutRE7ye7fLVdvfzaIoOh3NWqxXFEG6cn7yZ-jMsM_zA/exec", {
    method: "POST",
    body: data,
  })
    .then(response => {
      if (response.ok) {
      form.reset();
asistentesSelect.innerHTML = '<option value="">Número de Asistentes</option>';
ninosSelect.innerHTML = '<option value="">Número de Niños</option>';
ninosGroup.style.display = "none";
ninosSelect.required = false; // <---
        msg.style.display = "block";
        setTimeout(() => (msg.style.display = "none"), 5000);
      } else {
        alert("Hubo un error al enviar el formulario.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error al conectar con el servidor.");
    });
});
})(jQuery);

});
