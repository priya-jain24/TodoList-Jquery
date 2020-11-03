//blur effect
var maincontainer = $(".main-container");

function blurEffect(){
    maincontainer.addClass("blur");
}
// $("#close-btn").click(removeBlurEffect('#addlist'))

// $("#close-itembtn").click(removeBlurEffect('#additemlist'))

function removeBlurEffect(id){
    maincontainer.removeClass("blur");
    $(id).modal('hide');
}
//initialise
var allItems = [];
var main_item_index = 0;
var count_items = 0;
function Item(data,id){
    this.data = data;
    this.subtask = [];
    this.id = id;

}
function SubItem(data,id,complete){
    this.data = data;
    this.id = id;
    this.complete = complete;
}
//add item click function
$("#add-btn").click(addItems);
function addItems(){
    var input_data = $("#add-input").val();
    var parent_elem = $(".all-cards");
    const node = document.createElement("div");
    node.className = "todocard_" + count_items;
    node.innerHTML = `<div class="card-heading">
                        <p>${input_data}</p>
                    </div>
                    <div class="allcard-body">
                    <hr>
                    <ul class="allcard-list">
                    </ul>
                    </div>
                    <div class="allcard-footer">
                        <button class="btn" id="delete-btn" onclick="deleteItem(${count_items})">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button class="btn" id="additem-btn" data-target="#additemlist" data-toggle="modal" data-backdrop="static" data-keyboard="false" onclick="getTaskID(${count_items})">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>`
    parent_elem[0].append(node);
    var newitem = new Item(input_data,node.className);
    allItems.push(newitem);
    count_items += 1;
    $('.no_item').css("display","none");
    removeBlurEffect('#addlist');
}
function deleteItem(index){
    allItems.splice(index,1);
    $(".todocard_"+index).remove();
    allItems.length == 0? $('.no_item').css("display","block"): $('.no_item').css("display","none");
}

function getTaskID(index){
    main_item_index = index;
    blurEffect();
}

// add subtask
$("#add-itembtn").click(addSubTask);
function addSubTask(){
    var input_data = $("#add-iteminput").val();
    var parent_elem = $(".todocard_"+main_item_index + " ul");
    const node = document.createElement("li");
    var len = parent_elem.children.length;
    var node_id = "todocard_"+main_item_index+"_"+len;
    node.id = node_id;
    node.innerHTML = `${input_data}<button class="mark-btn" id="btn_${node_id}" onclick="markComplete('${node_id}')">Mark Done</button>`;
    parent_elem.append(node);
    var data = allItems.filter(x => x.id == "todocard_"+main_item_index)[0];
    var new_subtask = new SubItem(input_data, node_id, false);
    data.subtask.push(new_subtask);
    removeBlurEffect('#additemlist');

}

function markComplete(index){
    $("#"+index).addClass("mark-heading");
    $("#btn_"+index).css("visibility","hidden");
    var main_id_arr = index.split("_");
    var main_id = main_id_arr[0] + "_" + main_id_arr[1];
    var data = allItems.filter(x => x.id == main_id)[0];
    var subtask = data.subtask.filter(x => x.id == index)[0];
    subtask.complete = true;
}