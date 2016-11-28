// http://www.w3schools.com/howto/howto_js_tabs.asp

function tabs(evt, section) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(section).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


//change front page picture and go to shop option after click
document.getElementById('start').addEventListener('click',function(){
	var main =document.getElementById('hideme');
	
	main.style.display = 'none';
	
	var el = document.getElementById('main');
		el.style.display = 'inline-flex';
		el.style.flexWrap ='wrap';
	
	document.body.style.backgroundImage = "url('./pictures/2i.jpg')";});
	
 //initializing var so could be updateted in show panel method and be used outsiede this method
var price=0;
var priceTypeThishrt=0;
var priceExtraText=0;
var priceExtraGraphic=0;

var msg = ''; 
var customText = document.getElementById("addText");
var type=document.getElementById('t-type');
var selectedColor=document.getElementById("selectColor");
var selectedSize=document.getElementById('getSize');
var custom_tab =document.getElementsByClassName('disable');
var order_tab =document.getElementById('order_tab');
var fontColor =document.getElementById('fontColor');
var fontStyle =document.getElementById('fontStyle');
var pricePassToServer =document.getElementById('price').value;	
var orderRecite=["","","","","","",""];//array storing info from each section about selected details

		
// change/add graphic  on thisrt 

 var graphic =document.getElementById('graphic');
		graphic.addEventListener('click', function() {
			var selectedGraphic = document.getElementById("graphic");
			if(selectedGraphic.value == "none"){
					document.getElementById("graph").src = "./pictures/blank.png"; 
					orderRecite[6]="";
					priceExtraGraphic=0;
			}
			else{
				priceExtraGraphic=5; // extra charge for graphic
			
						document.getElementById("graph").src = "./pictures/graphic/"+selectedGraphic.value+".png"; 	 
				
				orderRecite[6]="Added graphic : "+selectedGraphic.value;
			}
		});
	
		
//adding text on thisrt and display waring if text is to long
$("#addText").keyup(function(){
	var text=this.value;
	var warning=document.getElementById("addTextButtonWarning");
	if(text.length>8){
		warning.style.opacity=1;
		$('#order_tab').css('pointer-events', 'none');
		$('#order_tab').css('opacity', '0.3');
	}
	else{
		if(text.length==0){
			warning.style.opacity=0;
			orderRecite[3]="";
			
			document.getElementById('text').innerHTML="";
		}
		else{
		document.getElementById('text').innerHTML=text;
		warning.style.opacity=0;
		orderRecite[3]="Cutome text : "+ text;
		
		}
		$('#order_tab').css('pointer-events', 'auto');
		$('#order_tab').css('opacity', '1');
	}
});


//display order and calculate price

//eneable access to all setions
function enableAll(){
	enable();
	$('#custom_tab').css('pointer-events', 'auto');
	$('#custom_tab').css('opacity', '1');
	$('#disableColor').css('opacity', '1');
	selectedColor.disabled=false;
	selectedColor.style.opacity=1;
}		
//enable access to selecting size and order details		
function enable(){
		$(function(){
		selectedSize.disabled=false;
		selectedSize.style.opacity=1;
		$('#order_tab').css('pointer-events', 'auto');
		$('#order_tab').css('opacity', '1');
		$('#disableSize').css('opacity', '1');
		selectedSize.disabled=false;
		selectedSize.style.opacity=1;
			
		});
};
//disable access to sections 
function disable(){
	$(function(){
		//i was unable to found correct syntax name for pointer-events on javascript 
		//and for jquery its work perfect when use exacly same syntax name like in css
		$('#custom_tab').css('pointer-events', 'none');
		$('#custom_tab').css('opacity', '0.3');
		$('#order_tab').css('pointer-events', 'none');
		$('#order_tab').css('opacity', '0.3');
		$('#disableSize').css('opacity', '0.3');
		$('#disableColor').css('opacity', '0.3');
		selectedColor.disabled=true;
		selectedColor.style.opacity=0.3;
		selectedSize.disabled=true;
		selectedSize.style.opacity=0.3;
		});
};
//disable access at load webside to customizing order on and basket as long thisert is not selected
	disable();	

//method enabling and disabling access to part of web side depend from selection
document.getElementById('t-type').addEventListener('change',function(){
disable()

orderRecite[1]="Size : "+ selectedSize.value;
orderRecite[2]="Color : "+ selectedColor.value;
orderRecite[6]="";
priceExtraGraphic=0;

	if(type.value=="none"){	
		document.getElementById('picture').style.backgroundImage="url('./pictures/"+type.value+".jpg')";	
		pricePassToServer=0;	
	}
	else{
	if(type.value=="custom"){
		document.getElementById('picture').style.backgroundImage="url('./pictures/color/blue.jpg')";		
		enableAll();
		priceTypeThishrt=10;
	}
	else{
		//remove data to prevent from display on recite
		orderRecite[2]=""; // reset color if selected in pass
		orderRecite[3]="";	//reset text
		orderRecite[4]="";	//reset font family
		orderRecite[5]="";	//reset font color
		orderRecite[6]="";	//reset graphic

		document.getElementById("graph").src = "./pictures/blank.png"; //remove custom picture if was selected
		
		document.getElementById('text').innerHTML=""; //remove displayed text if was typed in pass
		enable();		//enable access to basket and size opion
		document.getElementById('picture').style.backgroundImage="url('./pictures/presets/"+type.value+".jpg')";
		priceTypeThishrt=14;
	}
	orderRecite[0]="Type : "+type.value;
	}
	
	
});

 //changing picture of thisrt depent of selected color 
		selectedColor.addEventListener('click', function() {
			var colorSelected = document.getElementById("selectColor").value;
			document.getElementById('picture').style.backgroundImage="url('./pictures/color/"+colorSelected +".jpg')";					 
			//add color information to recite
			orderRecite[2]="Color : "+ selectedColor.value;
		});
		


//add chosen size Thishrt text to recite
selectedSize.addEventListener('change',function(){
	orderRecite[1]="Size : "+ selectedSize.value;
	
});

//change font family on displayed text
fontStyle.addEventListener('change',function(){
	$('#text').css('fontFamily', fontStyle.value);

});	


//changing font color on thisrt
fontColor.addEventListener('change',function(){
	$('#text').css('color', fontColor.value);
	orderRecite[5]=="Font color : "+ fontColor.value;
	
});


//validating dicount code
var discountRate=0;
var discountValue=0;


var submitButton =document.getElementById('check');
	submitButton.addEventListener('click', function() {
	 
	//regex test was generated by site https://regex101.com/ 
	const str = $("#discountNo").val();	
	const regex = /[A-Za-z]+\.[A-Za-z]+@mycit.ie$/g;
	let m;
		while ((m = regex.exec(str)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			
			// The result can be accessed through the `m`-variable.
			m.forEach((match, groupIndex) => {
			
				discountRate=0.2;
				document.getElementById("order_tab").click(); //update price
			});	
		}
		
});

$("form").submit(function() {
	
		if(type!='custom'){
		//delete not needed data before sending to server 
		selectedColor.remove();		
		fontColor.remove();
		fontStyle.remove();
		graphic.remove();
		customText.remove();
	}

});

$("form").change(function(){
	var orderOprionsLen, i;
	orderOprionsLen = 7;
	var texts="";
	//if custom text is empty it will dont show font family on recite
	if(orderRecite[3]==""){
		orderRecite[4]="";
		orderRecite[5]=""
		priceExtraText=0;
	}
	//if custom text is not empty it will show font family on recite
	else{
		orderRecite[4]="Font Style : "+ fontStyle.value;
		orderRecite[5]= "Font Color :"+fontColor.value;
		priceExtraText=3;
	}

	for (i = 0; i < orderOprionsLen; i++) {
		if(orderRecite[i]!=""){
		texts+= orderRecite[i]+"</br>";
		}
	}

	var discounMessege=" ";
	pricePassToServer=priceTypeThishrt+priceExtraText+priceExtraGraphic;
	if(discountRate!=0){
		discountValue=(pricePassToServer*discountRate).toFixed(2);
		discounMessege="</br>Discount value :"+discountValue+"&euro;</br>Final Price :"+(pricePassToServer-discountValue);
	}
	var el = document.getElementById('orderDetailsText');
	el.innerHTML = texts+"</br>"+"Final Price: "+pricePassToServer+"&euro;"+discounMessege;
	
	pricePassToServer=pricePassToServer-discountValue;
	
	
	//update final price so server fill recive updated price after all changes
	var finalPrice= document.getElementById('price');
	finalPrice.setAttribute("value",pricePassToServer);
	$('.pricePreview').html("Price: "+(priceTypeThishrt+priceExtraText+priceExtraGraphic)+"&euro;");
	
});

