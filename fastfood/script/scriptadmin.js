// let menuVar = "";
let list = "";
let listOfOrders;
let orders;
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

$(document).ready(function () {
    setInterval(() => {
        let currentUID = localStorage.getItem("currentUID");
        if (currentUID) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/users/' + currentUID,
                success: function(user) {
                    if (user.userName != 'admin') {
                        window.location.href = 'login.html';
                    }
                },
                error: function() {
                    window.location.href = 'login.html';
                }
            });
        }
        else {
            window.location.href = 'login.html';
        }
    }, 10000);
    
    $('.manageOrderButton').click(function() {
        $('.manageOrder').show();
        $('.changeMenu').hide();
    });
    $('.changeMenuButton').click(function() {
        $('.manageOrder').hide();
        $('.changeMenu').show();
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products/getAll',
        success: function(menu) {
            // menuVar = menu;
            // console.log(menuVar);
            $.each(menu, function(i, food) {
                $('#menuBody').append(`
                    <tr>
                        <td class="menuCategory-id noedit">${food.id}</td>
                        <td class="menuCategory-createAt noedit">${(new Date(food.createAt)).toLocaleString('vi-VN', timeOption)}</td>
                        <td class="menuCategory-latestChange noedit">${(new Date(food.latestChange)).toLocaleString('vi-VN', timeOption)}</td>
                        <td class="menuCategory-image noedit"><img src="${food.image}"></td>
                        <td class="menuCategory-name noedit">${food.name}</td>
                        <td class="menuCategory-type noedit">${food.type}</td>
                        <td class="menuCategory-description noedit">${food.description}</td>
                        <td class="menuCategory-price noedit">${food.price} ₫</td>
                        <td class="changeMenu-icons noedit"><button class="editButton">&#9998;</button></td>
                        <td class="changeMenu-icons noedit"><button class="deleteButton confirmDel">&#10006;</button></td>
                    </tr>
                `);
            });
        },
        error: function() {
            alert("Đã xảy ra lỗi. Không thể tải thực đơn.");
        }
    });


    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products/types',
        success: function(types) {
            // console.log("list of types: ", types);
            $.each(types, function(i, type) {
                // console.log(type);
                list += "<option value=\"" + type + "\">";
            });
            // console.log(list);
        },
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/orders',
        success: function(ords) {
            orders = ords;

            $.each(orders, function(i, order) {
                let orderTemplate = $('#order-template').contents().clone();
                // order id
                orderTemplate.find('.order-ID').text(order.id);
                // note
                orderTemplate.find('.order-note').text(order.note);
                // overall
                orderTemplate.find('.order-overall').text(order.total + '₫');
                // customer id
                orderTemplate.find('.order-customerID').text(order.user.id);
                // create at
                orderTemplate.find('.order-createAt').text((new Date(order.create_at)).toLocaleString('vi-VN', timeOption));
                // foods
                orderTemplate.find('.order-foods').text(toListOfFoods(order.order_detail));
                // address
                orderTemplate.find('.order-address').text(order.delivery.address);
                // paymentStatus
                orderTemplate.find('.order-paymentStatus').text(order.payment.status);
                // paymentMethod
                orderTemplate.find('.order-paymentMethod').text(order.payment.name);
                // deleteButton
                orderTemplate.find('.order-delButton').html(`<button class="deleteButton order-confirmDel">&#10006;</button>`);
                // editButton
                orderTemplate.find('.order-editButton').html(`<button class="editButton">&#9998;</button>`);
                // progress
                orderTemplate.find('.order-progress').text(orderProgress[parseInt(order.progress)]);

                $('.ordTBBody').append(orderTemplate);
            });
        },
        error: function() {
            alert("Đã xảy ra lỗi. Không thể tải đơn hàng.");
        }
    });
});

function toListOfFoods(arr) {
    let res = "";
    arr.forEach(food => {
        res += ((food.product) ? food.product.name : "") + " (x" + food.quantity + "), ";
    });
    res = res.replace(/, $/, '');
    return res;
}

$('.ordTBBody').on('click', '.order-confirmDel', function () {
    let orderId = $(this).closest('tr').find('.order-ID').text();
    let rowTodel = $(this).closest('tr');

    if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/orders/' + orderId,
            success: function() {
                rowTodel.fadeOut(300, function() {
                    $(this).remove();
                });
            },
            error: function(error) {
                alert("Đã xảy ra lỗi. Không thể xóa đơn hàng này.");
                console.log(error);
            }
        });
    }
});

$('.ordTBBody').on('click', '.editButton', function () {
    let thisRow = $(this).closest('tr');
    let editRow = thisRow.clone();
    thisRow.after(editRow);
    thisRow.hide();

    // address
    let rowAddress = thisRow.find('.order-address');
    let address = rowAddress.text();

    // paymentStatus
    let rowStatus = thisRow.find('.order-paymentStatus');
    let paymentStatusList = "<option value=\"Chưa thanh toán\"><option value=\"Đã thanh toán\">";
    
    // progress
    let rowProgress = thisRow.find('.order-progress');
    let progressList = "<option value=\"Tiếp nhận đơn hàng\"><option value=\"Xử lý\"><option value=\"Vận chuyển\"><option value=\"Hoàn thành\">";

    // edit
    editRow.find('.order-address').contents().replaceWith(`<input type="text" class="editAddress" value="${address}" />`);
    editRow.find('.order-paymentStatus').contents().replaceWith(`
    <input type="text" class="editPaymentStatus" list="listOfPaymentStatus" value="${rowStatus.text()}" />
    <datalist id="listOfPaymentStatus">${paymentStatusList}</datalist>
    `)
    editRow.find('.order-progress').contents().replaceWith(`
    <input type="text" class="editProgress" list="listOfProgress" value="${rowProgress.text()}" />
    <datalist id="listOfProgress">${progressList}</datalist>
    `)
    editRow.find('.order-editButton').contents().replaceWith(`<button type="submit" class="saveButton order-saveChange">&#128190;</button>`);
    editRow.find('.order-delButton').contents().replaceWith(`<button class="deleteButton cancelChange" style="color: yellowgreen;">&#10006;</button>`);
});

$('.ordTBBody').on('click', '.cancelChange', function(event) {
    event.preventDefault();
    $(this).closest('tr').prev('tr').show();
    $(this).closest('tr').remove();
});

$('.ordTBBody').on('click', '.order-saveChange', function () {
    if (!confirm("Bạn có chắc muốn lưu thay đổi?")) {
        return false;
    }
    let thisRow = $(this).closest('tr');
    let address = thisRow.find('.editAddress').val();
    let paymentStatus = thisRow.find('.editPaymentStatus').val();
    if (paymentStatus != "Chưa thanh toán" && paymentStatus != "Đã thanh toán") {
        alert("Thông tin vê thanh toán không hợp lệ. Không thể cập nhật đơn hàng");
        return false;
    }
    let progress = thisRow.find('.editProgress').val();
    let enumProgress = orderProgress.indexOf(progress);
    if (enumProgress == -1) {
        alert("Thông tin về tiến trình đơn hàng không hợp lệ. Không thể cập nhật đơn hàng.");
        return false;
    }

    let orderId = thisRow.find('.order-ID').text();
    let thisOrder = orders.find((order) => order.id == orderId);
    if (!thisOrder) {
        alert("Đã xảy ra lỗi. Không thể cập nhật đơn hàng.");
        return false;
    }

    let newPayment = {
        id: thisOrder.payment.id,
        // name: thisOrder.payment.name,
        status: paymentStatus,
    }
    let newDelivery = {
        id: thisOrder.delivery.id,
        // method: thisOrder.delivery.method,
        // price:thisOrder.delivery.price,
        address: address,
    }
    let newOrder = {
        id: orderId,
        progress: enumProgress,
    }

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/payments',
        data: newPayment,
        error: function() {
            alert("Đã xảy ra lỗi. Không thể cập nhật thông tin thanh toán.");
        }
    });

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/delivery',
        data: newDelivery,
        error: function() {
            alert("Đã xảy ra lỗi. Không thể cập nhật thông tin vận chuyển.");
        }
    });

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/orders',
        data: newOrder,
        error: function() {
            alert("Đã xảy ra lỗi. Không thể cập nhật thông tin đơn hàng.");
        }
    });
    
    let dataRow = thisRow.prev();
    dataRow.find('.order-address').text(address);
    dataRow.find('.order-paymentStatus').text(paymentStatus);
    dataRow.find('.order-progress').text(orderProgress[enumProgress]);
    dataRow.show();
    thisRow.remove();
});

async function getData(url, type) {
    try {
        const response = await fetch(url, {
          method: type,
        });
    
        if (!response.ok) {
          throw new Error('Đã xảy ra lỗi. Không thể tải đơn hàng.');
        }
    
        const data = await response.json();
        
        return data;
    } catch (error) {
        alert(error);
    }
}

let addingNewFood = false;

$('.addFood').click(function() {
    // if(!addingNewFood) {
    if(true) {
        let newFood = $('#menuBody');
        addingNewFood = true;
        

        newFood.prepend(`
            <tr>
                <form action="#" class="newFoodForm">
                    <td class="menuCategory-id noedit"></td>
                    <td class="menuCategory-createAt noedit"></td>
                    <td class="menuCategory-latestChange noedit"></td>
                    <td class="menuCategory-image noedit"><input type="text" class="newFoodImage" placeholder="Tên ảnh" /></td>
                    <td class="menuCategory-name noedit"><input type="text" class="newFoodName" placeholder="Tên món" /></td>
                    <td class="menuCategory-type noedit">
                        <input type="text" class="newFoodType" list="listOfTypes" placeholder="Loại món ăn" />
                        <datalist id="listOfTypes">${list}</datalist>
                    </td>
                    <td class="menuCategory-description noedit"><input type="text" class="newFoodDescription" placeholder="Mô tả" /></td>
                    <td class="menuCategory-price noedit"><div class="priceCell"><input type="text" class="newFoodPrice" placeholder="Giá bán" />₫</div></td>
                    <td class="changeMenu-icons noedit"><button type="submit" class="saveButton saveNewFood">&#128190;</button></td>
                    <td class="changeMenu-icons noedit"><button class="deleteButton directDel" style="color: yellowgreen;">&#10006;</button></td>
                </form>
            </tr>
        `);
    }
});


$('#menuBody').on('click', '.saveNewFood', function(event) {
    event.preventDefault();
    let name = $(this).closest('tr').find('.newFoodName').val();
    let type = $(this).closest('tr').find('.newFoodType').val();
    let price = $(this).closest('tr').find('.newFoodPrice').val();
    let description = $(this).closest('tr').find('.newFoodDescription').val();
    let image = "/fastfood/images/categories/" + $(this).closest('tr').find('.newFoodImage').val();

    // $(this).closest('tr')

    // console.log('name',name, 'type:',type, 'price:',price);
    
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/products',
        data: {
            name: name,
            type: type,
            price: price,
            description: description,
            image: image,
        },
        success: function(food) {
            let newRow = $(`<tr></tr>`);
            newRow.html(`
                <td class="menuCategory-id noedit">` + food.id + `</td>
                <td class="menuCategory-createAt noedit">${(new Date(food.createAt)).toLocaleString('vi-VN', timeOption)}</td>
                <td class="menuCategory-latestChange noedit">${(new Date(food.latestChange)).toLocaleString('vi-VN', timeOption)}</td>
                <td class="menuCategory-image noedit"><img src="` + food.image + `"></td>
                <td class="menuCategory-name noedit">` + food.name + `</td>
                <td class="menuCategory-type noedit">` + food.type + `</td>
                <td class="menuCategory-description noedit">` + food.description + `</td>
                <td class="menuCategory-price noedit">` + food.price + `₫</td>
                <td class="changeMenu-icons noedit"><button class="editButton">&#9998;</button></td>
                <td class="changeMenu-icons noedit"><button class="deleteButton confirmDel">&#10006;</button></td>
            `);
            $('#menuBody').prepend(newRow);

        },
        error: function(err) {
            if (err.responseJSON.message == "This product already exists.") {
                alert("Tên món ăn này đã có trong thực đơn.");
            }
            else {
                alert("Đã xảy ra lỗi. Không thể thêm món mới vào thực đơn.");
            }
            // console.log(err.responseJSON.message);
        },
    });
    
    $(this).closest('tr').remove();
    addingNewFood = false;
});

$('#menuBody').on('click', '.confirmDel', function(event) {
    event.preventDefault();

    let id = $(this).closest('tr').find('.menuCategory-id').text();
    let rowTodel = $(this).closest('tr');

    // if(addingNewFood && $(this).closest('tr').is($('#menuBody > tr').eq(0)) ) {
    if (confirm("Bạn có chắc muốn xóa món ăn này khỏi thực đơn?")) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/products/' + id,
            success: function() {
                rowTodel.fadeOut(300, function() {
                    $(this).remove();
                });
            },
            error: function() {
                alert("Đã xảy ra lỗi. Không thể xóa món ăn khỏi thực đơn.");
            }
        });

        // $(this).closest('tr').remove();
    }

    // console.log($(this).closest('tr').index());
    // $(this).closest('tr').remove();

    // if($('#menuBody > tr:first > .changeMenu-icons noedit > .deleteButton').is($(this))) {
    //     console.log('yes');
    // }
    // else {
    //     console.log('no');
    // }
   
    addingNewFood = false;
});

$('#menuBody').on('click', '.directDel', function(event) {
    event.preventDefault();
    $(this).closest('tr').remove();
    addingNewFood = false;
});

$('#menuBody').on('click', '.cancelChange', function(event) {
    event.preventDefault();
    $(this).closest('tr').prev('tr').find('.noedit').show();
    $(this).closest('tr').remove();
    addingNewFood = false;
});

$('#menuBody').on('click', '.editButton', function(event) {
    event.preventDefault();

    let id = $(this).closest('tr').find('.menuCategory-id').text();
    let name = $(this).closest('tr').find('.menuCategory-name').text();
    let type = $(this).closest('tr').find('.menuCategory-type').text();
    let description = $(this).closest('tr').find('.menuCategory-description').text();
    let price = $(this).closest('tr').find('.menuCategory-price').text().replace(/\D/g, '');
    let createAt = $(this).closest('tr').find('.menuCategory-createAt').text();
    let latestChange = $(this).closest('tr').find('.menuCategory-latestChange').text();
    let image = $(this).closest('tr').find('.menuCategory-image').find('img').attr('src').replace("/fastfood/images/categories/", '');
    // console.log('name:',name,'type:',type,'price:',price);

    $(this).closest('tr').find('.noedit').hide();

    $(this).closest('tr').after(`
    <tr class="edit">
        <form action="#" class="newFoodForm edit">
            <td class="menuCategory-id edit">${id}</td>
            <td class="menuCategory-createAt edit">${createAt}</td>
            <td class="menuCategory-latestChange edit">${latestChange}</td>
            <td class="menuCategory-image edit"><input type="text" class="newFoodImage" value="${image}" /></td>
            <td class="menuCategory-name edit"><input type="text" class="newFoodName" value="${name}" /></td>
            <td class="menuCategory-type edit">
                <input type="text" class="newFoodType" list="listOfTypes" value="${type}" />
                <datalist id="listOfTypes">${list}</datalist>
            </td>
            <td class="menuCategory-description edit"><input type="text" class="newFoodDescription" value="${description}" /></td>
            <td class="menuCategory-price edit"><div class="priceCell"><input type="text" class="newFoodPrice" value="${price}" />₫</div></td>
            <td class="changeMenu-icons edit"><button type="submit" class="saveButton saveEditedFood">&#128190;</button></td>
            <td class="changeMenu-icons edit"><button class="deleteButton cancelChange" style="color: yellowgreen;">&#10006;</button></td>
        </form>
    </tr>
    `);
});

$('#menuBody').on('click', '.saveEditedFood', function(event) {
    event.preventDefault();
    let thisRow = $(this).closest('tr');
    let food = {
        id: thisRow.find('.menuCategory-id').text(),
        image: "",
        name: thisRow.find('.newFoodName').val(),
        type: thisRow.find('.newFoodType').val(),
        price: thisRow.find('.newFoodPrice').val(),
        description: thisRow.find('.newFoodDescription').val(),
        image: "/fastfood/images/categories/" + thisRow.find('.newFoodImage').val(),
    };
    // console.log(food);
    if (confirm("Bạn có chắc muốn thay đổi dữ liệu món ăn này?")) {
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/products/update',
            data: food,
            success: function(res) {
                // console.log(res);
                let createAt = new Date(res.dateTime.createAt).toLocaleString('vi-VN', timeOption);
                let latestChange = new Date(res.dateTime.latestChange).toLocaleString('vi-VN', timeOption);
                thisRow.prev('tr').html(`
                <td class="menuCategory-id noedit">${food.id}</td>
                <td class="menuCategory-createAt noedit">${createAt}</td>
                <td class="menuCategory-latestChange noedit">${latestChange}</td>
                <td class="menuCategory-image noedit"><img src="${food.image}"></td>
                <td class="menuCategory-name noedit">${food.name}</td>
                <td class="menuCategory-type noedit">${food.type}</td>
                <td class="menuCategory-description noedit">${food.description}</td>
                <td class="menuCategory-price noedit">${food.price} ₫</td>
                <td class="changeMenu-icons noedit"><button class="editButton">&#9998;</button></td>
                <td class="changeMenu-icons noedit"><button class="deleteButton confirmDel">&#10006;</button></td>
                `);
                thisRow.prev('tr').find('.noedit').show();
                thisRow.remove();
            },
            error: function(err) {
                alert("Đã xảy ra lỗi. Không thể lưu thay đổi món ăn.");
                // console.log(err);
                thisRow.prev('tr').find('.noedit').show();
                thisRow.remove();
            }
        });
    }

    addingNewFood = false;
});

