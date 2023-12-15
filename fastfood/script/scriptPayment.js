let total = 0;
let order_details = [];

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

    $('#atRestaurant').click(function() {
        $(this).prop('checked', true);
        $('#toAddress').prop('checked', false);
        $('.rcvAddress').hide();
        $('.delivery').text('0đ');
        calOverall(0);
    });

    $('#toAddress').click(function() {
        $(this).prop('checked', true);
        $('#atRestaurant').prop('checked', false);
        $('.rcvAddress').show();
        $('.delivery').text('25.000đ');
        calOverall(25000);
    });

    function calOverall(ship) {
        overall = total + ship;
        $('.total').text(total.toLocaleString('vi-VN')+"₫");
        $('.overall').text(overall.toLocaleString('vi-VN')+"₫");
    }

    async function fetchData() {
        let catContainer = document.querySelector('.ordered');
        let orderData = JSON.parse(localStorage.getItem('order')) || [];
        // console.log(orderData);
        
        
        if (orderData.length == 0) {
            catContainer.innerHTML = `<img class="noData" src="/fastfood/images/bgff.png">`;
            $('.ordered').css({
                "max-width": "100%",
                "overflow": "hidden",
                "text-align": "center",
                "justify-content": "center",
                "display": "flex",
                "flex-grow": "1",
            });
            $('.ordered .noData').css({
                "object-fit": "contain",
            });
            $('.noData').css({
                "width": "400px",
                "heigth": "auto",
            });
            return;
        }
        else {
            $('.ordered').css({
                "flex-grow": "1",
                "display": "flex",
                "padding-top": "50px",
                "padding-left": "30px",
                "padding-right": "30px",
                "display": "grid",
                "justify-content": "space-around",
                "justify-items": "center",
                "grid-template-columns": "repeat(auto-fill, minmax(290px, 1fr))",
                "gap": "45px 16px",
            })
        }
        
        for (let product of orderData) {
            try {
                let response = await fetch('http://localhost:3000/products/getByName/' + product.item);
                let food = await response.json();
    
                // console.log(food);
    
                let catTemplate = document.getElementById('category-template').content.cloneNode(true);
                catTemplate.querySelector('.cat-img').src = food.image;
                catTemplate.querySelector('.item > p').innerText = food.name;
                catTemplate.querySelector('.price > p').innerText = food.price + '₫';
                catTemplate.querySelector('.description > p').innerText = food.description;
                catTemplate.querySelector('.number > p').innerText = "Số lượng: " + product.quantity;
    
                catContainer.appendChild(catTemplate);

                total += parseInt(food.price) * parseInt(product.quantity);

                order_details.push({
                    product: food.id,
                    quantity: product.quantity,
                    price: food.price,
                });
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        $('.total').text(total.toLocaleString('vi-VN')+"₫");
        $('.overall').text(total.toLocaleString('vi-VN')+"₫");
    }
    
    fetchData().catch(error => {
        alert('Đã xảy ra lỗi. Không thể tải đồ đã đặt.');
    });
    
});

$('.purchaseButton').click(function(event) {
    event.preventDefault();
    let address = "";
    let payment = {
        name: "",
        status: "",
    }
    // payment
    if ($('#card').prop('checked')) {
        if ($('.name').val() == "" || $('.cardNumber').val() == "" || $('.Expiration').val() == "" || $('.securityCode').val() == "") {
            alert("Thông tin thẻ chưa đầy đủ.");
            return false;
        }
        else {
            payment.name = "Thanh toán bằng thẻ";
            payment.status = "Đã thanh toán";
        }
    }
    else {
        payment.name = "Thanh toán khi nhận hàng";
        payment.status = "Chưa thanh toán";
    }
    // address
    if ($('#toAddress').prop('checked')) {
        if ($('.rcvAddress').val() == "") {
            alert("Địa chỉ nhận hàng chưa được nhập.");
            return false;
        }
        else {
            address = $('.rcvAddress').val();
        }
    }
    else {
        address = "Nhận tại nhà hàng";
    }
    let note = $('.noteInput').val();
    let discount = 0;
    let userId = localStorage.getItem("currentUID");
    if (!userId) {
        alert("Hãy đăng nhập để thực hiện thanh toán");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/orders/createNewOrder',
        data: {
            order_details: order_details,
            discount: discount,
            address: address,
            note: note,
            payment: payment,
            user: userId,
        },
        success: function(order) {
            alert("Đặt hàng thành công. Mã đơn hàng của bạn là: " + order.id);
            localStorage.removeItem("order");
            location.reload();
        }
    });
});