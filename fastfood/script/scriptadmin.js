// let menuVar = "";
let list = "";
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

$(document).ready(function () {
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
});



// let myArray = [
//     { 'id':'1', 'image':'', 'name':'chicken dinner', 'type':'chicken', 'price':'100000' },
//     { 'id':'2', 'image':'', 'name':'pizzagoras', 'type':'pizza', 'price':'150000' },
//     { 'id':'3', 'image':'', 'name':'hot cerberus', 'type':'bread', 'price':'50000' },
//     { 'id':'4', 'image':'', 'name':'tamexico', 'type':'tacos', 'price':'100000' },
//     { 'id':'5', 'image':'', 'name':'fire fried', 'type':'fried potatoes', 'price':'50000' },
// ];

// function printMenu(arr) {
//     let menuBodyPlaceHolder = document.querySelector('#menuBody');
//     let content = "";
    
//     for (let i = 0; i < arr.length; i++) {
//         content += `
//             <tr>
//                 <td class="menuCategory-id noedit">${arr[i].id}</td>
//                 <td class="menuCategory-image noedit"><img src="${arr[i].image}"></td>
//                 <td class="menuCategory-name noedit">${arr[i].name}</td>
//                 <td class="menuCategory-type noedit">${arr[i].type}</td>
//                 <td class="menuCategory-price noedit">${arr[i].price}₫</td>
//                 <td class="changeMenu-icons noedit"><button class="editButton">&#9998;</button></td>
//                 <td class="changeMenu-icons noedit"><button class="deleteButton">&#10006;</button></td>
//             </tr>
//         `;
//     }

//     menuBodyPlaceHolder.innerHTML = content;
// };

// printMenu(myArray);



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

    // if(addingNewFood && $(this).closest('tr').is($('#menuBody > tr').eq(0)) ) {
    if (confirm("Bạn có chắc muốn xóa món ăn này khỏi thực đơn?")) {
        let rowTodel = $(this).closest('tr');
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
