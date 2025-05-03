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
  var fechaEvento = new Date(2025, 6, 26, 19, 45, 0); // 15 de junio de 2025 a las 18:00

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
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
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
    "FAM001": 3,
    "FAM002": 2,
    "INV001": 1,
    "VIP123": 4
  };

  const codigoInput = document.getElementById("codigo");
  const asistentesSelect = document.getElementById("asistentes");

  codigoInput.addEventListener("blur", () => {
    const codigo = codigoInput.value.trim().toUpperCase();
    const limite = codigosPermitidos[codigo];

    asistentesSelect.innerHTML = '<option value="">Número de Asistentes</option>';

    if (limite) {
      for (let i = 1; i <= limite; i++) {
        asistentesSelect.innerHTML += `<option value="${i}">${i}</option>`;
      }
    } else {
      alert("Código inválido. Por favor verifica tu invitación.");
    }
  });

  // Envío del formulario
  const form = document.getElementById("rsvp-form");
  const msg = document.getElementById("success-msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(form);
    fetch("https://script.google.com/macros/s/AKfycbxpNhBdwM5cuZ37LbFWJJi-8wzL1VmkPWaQFPKVDUucb7plRqoXaX0UsN4WeAJwIBR_FQ/exec", {
      method: "POST",
      body: data,
    })
      .then(response => {
        if (response.ok) {
          form.reset();
          asistentesSelect.innerHTML = '<option value="">Número de Asistentes</option>';
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

