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
    let catContainer = $('.food-category');
    
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products/getAll',
        success: function(menu) {
            $.each(menu, function(i, food) {
                let catTemplate = $('#category-template').contents().clone();
                catTemplate.find('.cat-img').attr('src', food.image);
                catTemplate.find('.item > p').text(food.name);
                catTemplate.find('.price > p').text(food.price + '₫');
                catTemplate.find('.description > p').text(food.description);
                catContainer.append(catTemplate);
            });
        },
        error: function() {
            alert("Đã xảy ra lỗi. Không thể tải thực đơn.");
        }
    });
    function addCategory(itemName, price, description, srcImage) {
        let categoryContainer = $("<div>").addClass("category-container");

        let categoryImg = $("<div>").addClass("category-img").html(
            '<img class="cat-img" src="' + srcImage + '">'
        );

        

    }
});