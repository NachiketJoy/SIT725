jQuery(function () {

    scrollUp();
    task();

    function scrollUp() {
        $('.scroll-up-btn').on("click", function () {
            $('html').animate({ scrollTop: 0 });
            $('html').css("scrollBehavior", "auto");
        });
    }

    function task() {
        $(".js-task-event").on("click", function (e) {
            e.preventDefault();

            var btn_text = $(this).text().trim();
            document.getElementById('changeText').innerHTML = btn_text;

            $(".task-description__content").removeClass("task-desc-active");
            $('.js-task-event').removeClass("task-event-active");

            // get the id of the task button
            var task_ID = $(this).attr('id');
            $("." + task_ID).addClass('task-desc-active');
            $(this).addClass('task-event-active');
        });
    }

    // trigger modal
    $('.modal').modal({
        dismissible: false,
        preventScrolling: true
    });

    // skills carousel
    $('.carousel').carousel();
});