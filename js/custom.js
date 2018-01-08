$(document).ready(function(){
	$(document).on('click', '.removeRow', function(e){
		e.preventDefault();
		if($('.product-item').length > 1) {
			$(this).closest('.product-item').remove();
			// reCount();
		}
	});
	$('.addRow').on('click', function(e){
		e.preventDefault();
		console.log("Hello")
		var newRow = $('.product-item:last-child').clone().appendTo('.products-wrap');
		// $('.claim_item:last-child').find('input').val('');
		// reCount();
	})
	$('.removeLast').on('click', function(e){
		e.preventDefault();
		if($('.claim_item').length > 1) {
			$('.claim_item:last-child').remove();
		}
		// reCount();

	})
	$('#tab_logic tbody').on('keyup change',function(){
		calc();
	});
	$('.prod-list').change(function(){
		var myEl = $(this);
		console.log(myEl);
		setVar(myEl);
	});

});

$('.prod-quant').on("change paste keyup", function() {
	var myEl = $(this);
	setVar(myEl);
});
function setPrice(p, close){
	close.find('.prod-price').data('price', p);
}
function setTotal(price, close, quant){
	close.find('.prod-price').val((price * quant).toFixed(2));
}
function setVar(myEl){
	var p = myEl.find(':selected').data('p');
	var close = myEl.closest('.row');

	setPrice(p, close);

	var price = close.find('.prod-price').data('price');
	var quant = close.find('.prod-quant').val();

	if (quant == '' || quant == null){
		quant = 0;
	}
	if (price == '' || price == null){
		price = 0;
	}

	setTotal(price, close, quant);

	totValue();
}

function totValue(){
	var sum = 0;
	$('.orderSection').find('.prod-price').each(function(){
		sum += Number($(this).val());
	});
	console.log(sum);
	$('.total-value').html('Total: Ghc ' + sum.toFixed(2));
}

// function reCount(){
// 	$('.rowNum').each(function (i) {
// 		$(this).text(i + 1);
// 		calc();
// 	});
// }

function calc()
{
	$('#tab_logic tbody tr').each(function(i, element) {
		var html = $(this).html();
		if(html!='')
		{
			var qty = $(this).find('.qty').val();
			var price = $(this).find('.price').val();
			$(this).find('.total').val(qty*price);

			calc_total();
		}
	});
}

function calc_total()
{
	total=0;
	$('.total').each(function() {
		total += parseFloat($(this).val());
	});
	$('#sum_total').val(total.toFixed(2));
}