
$(function(){
    // 添加
    let submitBtn = $('.btn[value="提交"]')
    submitBtn.click(function(){
        // let val = $('textarea')[0].value; // 拿到输入区域的内容
        let val = $('textarea').prop('value');
        $('#mList').prepend('<li class="mText clearfix"></li>'); // 在ul的最前面插入li
        // 填写li的结构
        $('#mList li')[0].innerHTML = `<span class="mIcon1"></span>
        <p class="mComtent">${val}</p>
        <input type="button"  value="X" />`
        $('textarea').prop('value',''); // 清空输入区域
    })
    // 删除 事件委托
    $('#mList').on('click','input[type="button"]',function(){
        let i  = $('#mList input[type="button"]').index(this); // 拿到当前点击的删除按钮的下标
        $('#mList li').eq(i).remove(); // 通过下标找到对应的li，移除li
    })
})

