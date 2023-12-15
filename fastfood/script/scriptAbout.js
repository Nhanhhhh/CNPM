// $(document).ready(function() {

// })

let timeOption = {
    weekday: 'short', 
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false,
};
const orderProgress = ['Tiếp nhận đơn hàng', 'Xử lý', 'Vận chuyển', 'Hoàn thành'];

function toListOfFoods(arr) {
    let res = "";
    arr.forEach(food => {
        res += ((food.product) ? food.product.name : "") + " (x" + food.quantity + "), ";
    });
    res = res.replace(/, $/, '');
    return res;
}

function getOrderData() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/orders/getById/' + $('.searchBox').val(),
        success: function(order) {
            if (!order) {
                $('.nonexist').show();
                $('.res-tb').hide();
                
            }
            else {
                let resRow = $('.resRow');
                // order id
                resRow.find('.res-ID').text(order.id);
                // customer name
                resRow.find('.res-customerName').text(order.user.name);
                // create at
                resRow.find('.res-createAt').text((new Date(order.create_at)).toLocaleString('vi-VN', timeOption));
                // foods
                resRow.find('.res-foods').text(toListOfFoods(order.order_detail));
                // address
                resRow.find('.res-address').text(order.delivery.address);
                // overall
                resRow.find('.res-overall').text(order.total + '₫');
                // paymentStatus
                resRow.find('.res-paymentStatus').text(order.payment.status);
                // paymentMethod
                resRow.find('.res-paymentMethod').text(order.payment.name);
                // note
                resRow.find('.res-note').text(order.note);
                // progress
                resRow.find('.res-progress').text(orderProgress[parseInt(order.progress)]);

                $('.nonexist').hide();
                $('.res-tb').show();
            }
        },
        error: function() {
            alert("Đã xảy ra lỗi. Không thể tìm đơn hàng.");
            return false;
        }
    });
}

$('.submitOrderId').click(function (e) { 
    e.preventDefault();
    getOrderData();
    let containerPosition = $('.search-container').offset().top;
    $('html, body').animate({
        scrollTop: containerPosition
    }, 200); 
});

$('.searchBox').on('keypress',function(e) {
    // e.preventDefault();
    if(e.which == 13) {
        getOrderData();
        let containerPosition = $('.search-container').offset().top;
        $('html, body').animate({
            scrollTop: containerPosition
        }, 200);
    }
});