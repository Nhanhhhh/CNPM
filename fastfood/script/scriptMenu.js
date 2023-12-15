let ordered = [];

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

            let stored = JSON.parse(localStorage.getItem("order"));
            if (stored) {
                let foodCat = $('.food-category');
                $.each(stored, function(i, food) {
                    let item = food.item;
                    let quantity = food.quantity;
                    let changeItem = foodCat.find('.item > p:contains('+item+')');
                    changeItem.closest('.category-container').find('.number > .countVal').val(quantity);
                })
            }
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

if (!localStorage.getItem("order")) {
    localStorage.setItem("order", JSON.stringify(ordered));
}
ordered.push(...JSON.parse(localStorage.getItem("order")));

function updateOrdered($refer, count) {
    let key = $refer.parent().siblings('.item-and-price').find('.item').find('p').text();
    let objExist = ordered.find(obj => obj.item === key);

    if(count > 0) {
        if (objExist) {
            objExist.quantity = count;
        }
        else {
            ordered.push({item: key, quantity: count});
        }
        // ordered[key] = count;
        // console.log(ordered);
    }
    else {
        if(objExist) {
            let index = ordered.indexOf(objExist);
            ordered.splice(index, 1);
        }
        // delete ordered[key];
        console.log(ordered);
    }
    localStorage.setItem("order", JSON.stringify(ordered));
}

$('.food-category').on('click', '.minus', function() {
    let $input = $(this).parent().find('input');
    let count = parseInt($input.val()) - 1;
    count = count < 0 ? 0 : count;
    $input.val(count);
    $input.change();

    updateOrdered($(this), count);
    
    return false;
})

$('.food-category').on('click', '.plus', function() {
    let $input = $(this).parent().find('input');
    let count = parseInt($input.val()) + 1
    $input.val(count);
    $input.change();

    updateOrdered($(this), count);

    return false;
});

$('.food-category').on('focusout', '.countVal', function() {
    let $input = $(this).parent().find('input');
    let val = parseInt($input.val());
    if (val >= 0) {
        // console.log(val);
        $input.val(val);
    }
    else{
        $input.val(0);
        val = 0;
    }
    $input.change();

    updateOrdered($(this), val);

    return false;
});
