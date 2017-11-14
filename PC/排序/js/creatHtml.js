

function creatHtml(arr){
	var html = arr.map(function(item){
		
		return `
				<div class="cont">
					<span>${item.title}</span>
					<i>${item.txt}</i>
				</div>
		`
		
	}).join('');
	
	return html;
}
