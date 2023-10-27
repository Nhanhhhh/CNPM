$(document).ready(function() {
    $('.minus').click(function () {
        let $input = $(this).parent().find('input');
        let count = parseInt($input.val()) - 1;
        count = count < 0 ? 0 : count;
        $input.val(count);
        $input.change();
        return false;
    });

    $('.plus').click(function () {
        let $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    $('.countVal').focusout(function() {
        let $input = $(this).parent().find('input');
        let val = parseInt($input.val());
        if (val >= 0) {
            // console.log(val);
            $input.val(val);
        }
        else{
            $input.val(0);
        }
        $input.change();
        return false;
    });
});

$(document).ready(function() {
    function addCategory(itemName, price, description, srcImage) {
        let categoryContainer = $("<div>").addClass("category-container");

        let categoryImg = $("<div>").addClass("category-img").html(
            '<img class="cat-img" src="' + srcImage + '">'
        );

        

    }
});