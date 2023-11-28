$(document).ready(function() {
    // $('.minus').click(function () {
    //     let $input = $(this).parent().find('input');
    //     let count = parseInt($input.val()) - 1;
    //     count = count < 0 ? 0 : count;
    //     $input.val(count);
    //     $input.change();
    //     return false;
    // });

    $('#card').on('click', function() {
        let $box = $(this);
        $box.prop('checked', true);
        $('#onArrival').prop('checked', false);
        $('.payByCard').show();
        // $('.logoFrame').css('opacity', 0.25);
        // $('.logoFrame').first().css('opacity', '1');
    });

    $('#onArrival').on('click', function() {
        let $box = $(this);
        $box.prop('checked', true);
        $('#card').prop('checked', false);
        $('.payByCard').hide();
    });

    $('.logoFrame').on('click', function() {
        $('.logoFrame').css('opacity', 0.25);
        $(this).css('opacity', 1);
    });
});
