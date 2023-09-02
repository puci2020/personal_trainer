$(function () {
    // init feather icons
    feather.replace()

    // init tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()

    //page scroll
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this)
        $('html, body')
            .stop()
            .animate(
                {
                    scrollTop: $($anchor.attr('href')).offset().top - 20,
                },
                1000,
            )
        event.preventDefault()
    })

    // slick slider
    $('.slick-about').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
    })

    $('.slider_three').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],
    })
    $('.slider_opinion').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],
    })
    $('.slider_one').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],
    })

    //toggle scroll menu
    var scrollTop = 0
    $(window).scroll(function () {
        var scroll = $(window).scrollTop()
        //adjust menu background
        if (scroll > 80) {
            if (scroll > scrollTop) {
                $('.smart-scroll').addClass('scrolling').removeClass('up')
                // $('.smart-scroll').removeClass('up');
            } else {
                $('.smart-scroll').addClass('up')
            }
        } else {
            // remove if scroll = scrollTop
            $('.smart-scroll').removeClass('scrolling').removeClass('up')
            // $('.smart-scroll').removeClass('up');
        }

        scrollTop = scroll

        // adjust scroll to top
        if (scroll >= 600) {
            $('.scroll-top').addClass('active')
        } else {
            $('.scroll-top').removeClass('active')
        }
        return false
    })

    // scroll top top
    $('.scroll-top').click(function () {
        $('html, body').stop().animate(
            {
                scrollTop: 0,
            },
            1000,
        )
    })
    $('button.navbar-toggler').click(function () {
        let show = $(this).attr('aria-expanded')
        console.log(show)
        $('.navbar-container').css('background-color', 'none')

        if (show == false) {
            $('.navbar-container').css('background-color', 'black')
        }
    })

    //fetch feedbacks
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    }

    fetch('https://panel.trenujzfotka.pl/api/feedbacks', requestOptions)
        .then((response) => response.text())
        .then((result) => {
            let res = JSON.parse(result)
            res.data.forEach((opinionData) => {
                $('.slider_opinion').slick(
                    'slickAdd',
                    `
                    <div class="card img-fluid rounded d-block m-2 opinion_block">
        <div class="card-body">
            <h5 class="card-title pt-3">${opinionData.attributes.name}</h5>
            <div class="ratings">
                ${'<i class="fa fa-star rating-color"></i>'.repeat(
                    opinionData.attributes.rate,
                )}
                ${'<i class="fa fa-star"></i>'.repeat(
                    5 - opinionData.attributes.rate,
                )}
            </div>
            <div class="text-muted font-weight-medium mt-2">${
                opinionData.attributes.description
            }</div>
        </div></div>
    `,
                )
                // const opinionBlock = createOpinionBlock(opinionData.attributes)
                // requiredDiv.appendChild(opinionBlock)
            })
        })
        .catch((error) => console.log('error', error))

    var polipop = new Polipop('mypolipop', {
        layout: 'popups',
        insert: 'after',
        pool: 5,
        closer: false,
        sticky: false,
        position: 'bottom-right',
    })

    const contactForm = document.getElementById('contact_form')
    const feedbackForm = document.getElementById('feedback_form')

    if (contactForm)
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault()

            const firstName = document.getElementById('first_name').value
            const email = document.getElementById('email').value
            const subject = document.getElementById('subject').value
            const message = document.getElementById('message').value
            const rodo = document.getElementById('rodo').checked

            const token = grecaptcha.getResponse()
            const postData = {
                secret: '0x2a10710d5cD127452F08cE302DB5E945338D2b3a',
                response: token,
            }
            const hcaptchaVerifyUrl = 'https://hcaptcha.com/siteverify'

            // Send the POST request to hCaptcha for verification
            fetch(hcaptchaVerifyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(postData).toString(),
            })
                .then((response) => response.json())
                .then((data) => {
                    const { success, score } = data

                    if (success) {
                        // The hCaptcha token is valid
                        console.log('hCaptcha verification successful')
                    } else {
                        // The hCaptcha token is not valid
                        console.error('hCaptcha verification failed')
                    }
                })
                .catch((error) => {
                    console.error('Error verifying hCaptcha:', error)
                })

            // const data = response.data

            // if (data.success) {
            //     // hCaptcha verification successful, process the form
            //     console.log('work')
            //     // form.submit()
            // } else {
            //     // hCaptcha verification failed, show an error
            //     console.log('hCaptcha verification failed')
            // }
            if (!firstName || !email || !subject || !message || !rodo) {
                polipop.add({
                    content:
                        'Sprawdź, czy formularz jest poprawnie wypełniony!',
                    title: 'Coś poszło nie tak :(',
                    type: 'error',
                })
                event.preventDefault()
                if (!firstName)
                    document
                        .getElementById('first_name')
                        .classList.add('is-invalid')
                else
                    document
                        .getElementById('first_name')
                        .classList.remove('is-invalid')

                if (!email)
                    document.getElementById('email').classList.add('is-invalid')
                else
                    document
                        .getElementById('email')
                        .classList.remove('is-invalid')

                if (!subject)
                    document
                        .getElementById('subject')
                        .classList.add('is-invalid')
                else
                    document
                        .getElementById('subject')
                        .classList.remove('is-invalid')

                if (!message)
                    document
                        .getElementById('message')
                        .classList.add('is-invalid')
                else
                    document
                        .getElementById('message')
                        .classList.remove('is-invalid')

                if (!rodo)
                    document.getElementById('rodo').classList.add('is-invalid')
                else
                    document
                        .getElementById('rodo')
                        .classList.remove('is-invalid')
            } else {
                const myHeaders = new Headers()
                myHeaders.append('Content-Type', 'application/json')

                var raw = JSON.stringify({
                    data: {
                        name: firstName,
                        email: email,
                        subject: subject,
                        message: message,
                    },
                })

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow',
                }

                // fetch(
                //     'https://panel.trenujzfotka.pl/api/emails',
                //     requestOptions,
                // )
                //     .then((response) => response.text())
                //     .then((result) => {
                //         contactForm.reset()
                //         polipop.add({
                //             content: 'Dziękuję za wiadomość!',
                //             title: 'Sukces',
                //             type: 'success',
                //         })
                //     })
                //     .catch((error) =>
                //         polipop.add({
                //             content:
                //                 'Spróbuj ponownie lub powiadom mnie o incydencie!',
                //             title: 'Coś poszło nie tak :(',
                //             type: 'error',
                //         }),
                //     )
            }
        })

    if (feedbackForm)
        feedbackForm.addEventListener('submit', async (event) => {
            event.preventDefault()

            const firstName = document.getElementById('first_name').value
            const feedbackValue =
                document.getElementById('feedback_value').value
            const comment = document.getElementById('comment').value
            const rodo = document.getElementById('rodo').checked

            if (!firstName || !feedbackValue || !comment || !rodo) {
                polipop.add({
                    content:
                        'Sprawdź, czy formularz jest poprawnie wypełniony!',
                    title: 'Coś poszło nie tak :(',
                    type: 'error',
                })
                event.preventDefault()
                if (!firstName)
                    document
                        .getElementById('first_name')
                        .classList.add('is-invalid')
                else
                    document
                        .getElementById('first_name')
                        .classList.remove('is-invalid')

                if (!feedbackValue)
                    document
                        .getElementById('feedback_value')
                        .classList.add('is-invalid')
                else
                    document
                        .getElementById('feedback_value')
                        .classList.remove('is-invalid')

                if (!comment)
                    document
                        .getElementById('comment')
                        .classList.add('is-invalid')
                else
                    document
                        .getElementById('comment')
                        .classList.remove('is-invalid')

                if (!rodo)
                    document.getElementById('rodo').classList.add('is-invalid')
                else
                    document
                        .getElementById('rodo')
                        .classList.remove('is-invalid')
            } else {
                const myHeaders = new Headers()
                myHeaders.append('Content-Type', 'application/json')

                var raw = JSON.stringify({
                    data: {
                        rate: feedbackValue,
                        description: comment,
                        name: firstName,
                        publishedAt: null,
                    },
                })

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow',
                }

                fetch(
                    'https://panel.trenujzfotka.pl/api/feedbacks',
                    requestOptions,
                )
                    .then((response) => response.text())
                    .then((result) => {
                        feedbackForm.reset()
                        polipop.add({
                            content: 'Dziękuję za opinię!',
                            title: 'Sukces',
                            type: 'success',
                        })
                    })
                    .catch((error) =>
                        polipop.add({
                            content:
                                'Spróbuj ponownie lub powiadom mnie o incydencie!',
                            title: 'Coś poszło nie tak :(',
                            type: 'error',
                        }),
                    )
            }
        })
})
