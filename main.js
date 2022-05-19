//Contact JS

var contactSideBar = document.getElementById("contactNike");
var contactSideBarMobile = document.getElementById("mobileContactNike");
window.onscroll = function () {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        contactSideBar.className = "contactNikeFadeOut";
        contactSideBarMobile.className = "contactNikeFadeOut";
    } else {
        contactSideBar.className = contactSideBar.className.replace("contactNikeFadeOut", "")
        contactSideBarMobile.className = contactSideBar.className.replace("contactNikeFadeOut", "")
    }
}
// SHOW ALL 
var countHide = 0
var buttonShowAll = document.getElementsByClassName("productsShowAll")[0];
buttonShowAll.onclick = function () {
    countHide++;
    var tar = document.querySelectorAll(".productsNike .productsNike__listItem")[1];
    tar.classList.toggle("hide");
    if (countHide % 2 == 0) {
        buttonShowAll.innerHTML = "<span>Xem tất cả</span>";
    } else {
        buttonShowAll.innerHTML = "<span>Ẩn bớt</span>";
    }
}
//SUB MENU HEADER ITEM

var subItemButton = document.getElementsByClassName("mainItem")[0];
var subMenu = document.getElementsByClassName('subMenu')[0];
var mainItem = document.getElementsByClassName('mainItem')[0];
subItemButton.onclick = function () {
    subMenu.classList.toggle("active");
    mainItem.classList.toggle("active");
}
//FOOTER COLLAPSE MENU 
var listSub = document.getElementsByClassName('footerSub');
var buttonFooter = document.getElementsByClassName("slideDown");
for (var i = 0; i < buttonFooter.length; i++) {
    buttonFooter[i].onclick = function () {
        var id = this.getAttribute("data-id");
        listSub[id].classList.toggle("active");

    }
}
//SUB MENU HEADER 
var iconSub = document.getElementsByClassName("navbar-toggler-icon")[0];
var buttonSub = document.getElementsByClassName("navbar-toggler")[0];
var subHeader = document.getElementById("sideBarHeader");
var sideBarHeaderOverlay = document.getElementsByClassName("sideBarHeaderOverlay")[0];
buttonSub.onclick = function () {
    subHeader.classList.toggle("active");
    sideBarHeaderOverlay.classList.toggle("active");
    iconSub.classList.toggle("active");
}
sideBarHeaderOverlay.onclick = function () {
    subHeader.classList.toggle("active");
    sideBarHeaderOverlay.classList.toggle("active");
    iconSub.classList.toggle("active");
}
//Choose Shoes Size

var size = document.querySelectorAll(".card-size >span");

for (var i = 0; i < size.length; i++) {
    size[i].addEventListener('click', function () {
        var tar = this;
        var parentTar = tar.parentElement.parentElement.id;
        changePrice(tar, parentTar);
        removeActive(parentTar);
        this.className += " active";
    })
}
function removeActive(tar) {
    for (var i = 0; i < size.length; i++) {
        if (size[i].parentElement.parentElement.id == tar)
            size[i].className = size[i].className.replace("active", " ")
    }
}
function changePrice(tar, tarParrent) {
    switch (tarParrent) {
        case "airForceLV8":
            if (Number(tar.innerHTML) === 41) {
                document.querySelector(`#${tarParrent} .new`).innerHTML = '3.800.000<u>đ</u>'
            }
            if (Number(tar.innerHTML) === 42) {
                document.querySelector(`#${tarParrent} .new`).innerHTML = '3.700.000<u>đ</u>'
            } else if ((Number(tar.innerHTML) === 40)) {
                document.querySelector(`#${tarParrent} .new`).innerHTML = '3.900.000<u>đ</u>'
            }
            break;
        case 'airForce107':
            if (Number(tar.innerHTML) === 41 || Number(tar.innerHTML) === 42) {
                document.querySelector(`#${tarParrent} .old`).innerHTML = '';
                document.querySelector(`#${tarParrent} .card-discount`).style.display = 'none';
            }
            if (Number(tar.innerHTML) === 40) {
                document.querySelector(`#${tarParrent} .old`).innerHTML = '3.000.000<u>đ</u>';
                document.querySelector(`#${tarParrent} .card-discount`).style.display = 'block';
            }
            break;
        default:
    }
}

// countPurchaseProduct
var countProducts = 0;
var cartsNumber = document.getElementById("carts");
var carts = document.getElementsByClassName("card-shopCart");
for (var i = 0; i < carts.length; i++) {
    carts[i].onclick = function () {
        countProducts++;
        cartsNumber.innerHTML = countProducts;
    }
}
//closeList 
var overlay = document.getElementsByClassName("sideBarOverlay")[0];
var purchase = document.getElementsByClassName("card-shopCart");
var closeButton = document.getElementById("closeList");
var sideBar = document.getElementById("sideBarList");
closeButton.onclick = function () {
    sideBar.classList.toggle("showSideBarList");
    overlay.classList.toggle("active");

}
overlay.onclick = function () {
    overlay.classList.toggle("active");
    sideBar.classList.toggle("showSideBarList");
}
//AddShoes
var contentList = document.querySelector('.sideBarList__list');
var contentHead = document.querySelectorAll(".header__cart >ul")[0];
var itemShoes = "";
var totalBill = document.querySelector(".totalBill .priceMain");
var total = 0;
var idArr = [];
var shoesArr = [];
for (var i = 0; i < purchase.length; i++) {
    purchase[i].onclick = function () {
        countProducts++;
        cartsNumber.innerHTML = countProducts;
        var srcShoes = this.parentElement;
        var linkShoes = document.querySelector(`#${srcShoes.id} > img`);
        var shoesName = document.querySelectorAll(`#${srcShoes.id} .card-text`);
        var checkDupli = checkDuplicate(idArr, `${srcShoes.id}`);
        idArr = isPushIn(idArr, `${srcShoes.id}`);
        if (checkDupli == false) {
            var objectShoes = {
                imgSrc: `${linkShoes.src}`,
                nameShoes: `${shoesName[0].innerHTML}`,
                price: `${shoesName[1].innerHTML}`,
                amount: 1,
                id: `${srcShoes.id}`
            }
            shoesArr.push(objectShoes);
        }
        else {
            var indexItem = getIndexItem(idArr, `${srcShoes.id}`);
            if (indexItem != -1) {
                indexItem = Number(indexItem);
                shoesArr[indexItem].amount += 1;
                // console.log(quanlity.innerHTML);

            } else {
                alert("Có lỗi!!!")
            }
        }
        itemShoes = renderListShoes(shoesArr);
        contentList.innerHTML = itemShoes;
        contentHead.innerHTML = itemShoes;
        if (contentList.innerHTML == "") {
            totalBill.innerHTML = `${total}<u>đ</u>`
        } else {
            var bill = convertToNumber(`${shoesName[1].innerHTML}`)
            total += bill;
            var convert = convertToString(total);
            totalBill.innerHTML = convert + "<u>đ</u>";
        }
        sideBar.classList.toggle("showSideBarList");
        overlay.classList.toggle("active");
    }
}

function getIndexItem(arr, item) {
    for (var i in arr) {
        if (arr[i] == item) {
            return i;
        }
    }
    return -1;
}
function renderListShoes(arr) {
    var content = arr.reduce(function (glcontent, value, index) {
        glcontent += `<li>
        <div class="row">
            <div class="col-3 pr-0">
                <img src="${value.imgSrc}" class="img-fluid" alt="">
            </div>
            <div class="col-9">
                <h3>
                    <a href="#">
                        ${value.nameShoes}
                        </a>
                        </h3>
                <div class="d-flex itemTitle justify-content-between">
                    <span>Số lượng</span>
                    <span class="priceMain">${value.price}</span>
                </div>
                <div class="d-flex itemAddMore justify-content-between align-items-center">
                    <div class="buttonAdd d-flex justify-content-between">
                        <span class="descend" data-id="${index}" onclick="descend(${index})">-</span>
                        <span class="itemToTal">${value.amount}</span>
                        <span class="ascend" data-id="${index}" onclick="ascend(${index})">+</span>
                    </div>
                    <div class="deleteItem" onclick="deleteItem(${index})">
                        Xóa
                    </div>
                </div>
            </div>
        </div>
        </li>`
        return glcontent
    }, "");
    return content;
}

//AscendItem 
function ascend(i) {
    var ascendButton = document.getElementsByClassName("itemToTal")[Number(i)];
    // console.log(ascendButton,i);
    shoesArr.forEach(function (item, index) {
        if (index == i) {
            item.amount += 1;
            console.log(item.amount);
            ascendButton.innerHTML = item.amount;
            var bill = convertToNumber(`${item.price}`)
            total += bill;
        }
    });
    countProducts++;
    cartsNumber.innerHTML = countProducts;
    var convert = convertToString(total);
    totalBill.innerHTML = convert + "<u>đ</u>";
    itemShoes = renderListShoes(shoesArr);
    contentList.innerHTML = itemShoes;
    contentHead.innerHTML = itemShoes;
}
function descend(i) {
    var ascendButton = document.getElementsByClassName("itemToTal")[Number(i)];
    // console.log(ascendButton,i);
    shoesArr.forEach(function (item, index) {
        if (index == i) {
            if (item.amount > 1) {
                item.amount -= 1;
                ascendButton.innerHTML = item.amount;
                var bill = convertToNumber(`${item.price}`)
                total -= bill;
                countProducts--;
                cartsNumber.innerHTML = countProducts;
            } else {
                alert("Chưa bổ sung chức năng xóa nếu số lượng nhỏ hơn 1");
            }
        }
    });
    var convert = convertToString(total);
    totalBill.innerHTML = convert + "<u>đ</u>";
    itemShoes = renderListShoes(shoesArr);
    contentList.innerHTML = itemShoes;
    contentHead.innerHTML = itemShoes;
}
function deleteItem(i) {
    shoesArr.forEach((element, index) => {
        if (index == i) {
            shoesArr.splice(i, 1);
            var bill = convertToNumber(`${element.price}`)
            total -= bill * element.amount;
            var convert = convertToString(total);
            totalBill.innerHTML = convert + "<u>đ</u>";
        }
    });
    itemShoes = renderListShoes(shoesArr);
    contentList.innerHTML = itemShoes;
    contentHead.innerHTML = itemShoes;
    if (shoesArr.length == 0) {
        contentList.innerHTML = "Giỏ hàng của bạn chưa có sản phẩm nào";
        contentHead.innerHTML = "Giỏ hàng của bạn chưa có sản phẩm nào";
    }
}
//Check item is Exist Already in the List 

function isPushIn(arr, item) {
    if (arr.length > 0) {
        for (var i of arr) {
            if (i == item) {
                continue;
            } else {
                arr.push(item);
                break;
            }
        }
    } else {
        arr.push(item);
    }

    return arr;
}
function checkDuplicate(arr, item) {
    var isExist = false;

    for (var i of arr) {
        if (i == item) {
            isExist = true;
        }
    }
    return isExist;
}
//Convert String to Number
function convertToNumber(str) {
    var number = ""
    for (var i of str) {
        var convert = Number(i);
        if (Number.isInteger(convert)) {
            number += convert;
        }
    }
    return Number(number);
}
function convertToString(num) {
    var arr = [];
    var stringNum = num.toString();
    var count = 0;
    for (var i = stringNum.length - 1; i >= 0; i--) {
        count++;
        arr.unshift(stringNum[i]);
        if (count == 3 && i != 0) {
            arr.unshift(".");
            count = 0;
        }
    }
    arr = arr.join("");
    return arr;
}





//Like Hearts
var heartsNumber = 0;
var storeHearts = document.getElementById("hearts");
var noticeLike = document.getElementsByClassName("noticeLike");
var noticeUnLike = document.getElementsByClassName("noticeUnLike")[0];
var hearts = document.getElementsByClassName("card-heart");
var count = 0;
for (var i = 0; i < hearts.length; i++) {
    hearts[i].onclick = function () {
        var isAdd = this.classList.toggle("like-heart");
        if (isAdd) {
            heartsNumber++;
            storeHearts.innerHTML = heartsNumber;
            noticeLike[count++].classList.toggle("showNoticeLike");
            setTimeout(() => {
                noticeLike[--count].className = 'noticeLike';


            }, 2000);
        } else {
            heartsNumber--;
            storeHearts.innerHTML = heartsNumber;
            noticeUnLike.classList.toggle("showNoticeLike")
            setTimeout(() => {
                noticeUnLike.classList.toggle("showNoticeLike")
            }, 2000);
        }
    }
}

//CardSelect 

var cardSelect = document.getElementsByClassName("card-select");
for (var i = 0; i < cardSelect.length; i++) {
    cardSelect[i].onclick = function () {
        alert("Chức năng chưa được xây dựng")
    }
}


