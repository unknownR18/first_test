'use strict'
{
  const num_bth = document.querySelectorAll('.num_bth');//htmlから数字のクラス名を定数num_bthに代入
  let output_sub = document.getElementById('output_sub');//計算結果を代入
  const output_total = document.getElementById('output_total');//計算過程
  let total = 0;　//0を代入して初期化？
  var state = 'start';//最初の状態を定義
  var mode ='integer_mode'; //最初は整数しか入力させんぞと

//state(状態)　(1)最初の状態(start) (2)数字を入力している状態(calculation)
//             (3)記号を押した後(calBtn) (4)=を押して計算を終えた(finish)
//1から9
 const one_nine=document.querySelectorAll('.one_nine');
 one_nine.forEach(index=> {
   index.addEventListener('click',()=> {
      console.log(index.dataset.indexId);
     if(state==='start') {
       total = index.dataset.indexId;
     }else if(state==='finish'){
　　　　reset();
       total = index.dataset.indexId;
     }else if(state==='calculation'||state==='calBtn'){
     total += index.dataset.indexId;
     }
     output_sub.textContent=total;
     state='calculation'//数字を入力している状態

   })
 })

//0のボタン
 const zero = document.getElementById('zero');
   zero.addEventListener('click', () => {
//前の文字が0の場合は0を入力できないようにする(連続で0を入力できない)
    if(state==='start'||state==='finish'||state==='calBtn'){
      if(output_sub.textContent.slice(-1)==='0'){
        console.log('前の文字はゼロ');
        return;
      }
    }
     if(state==='start') {
       total = zero.dataset.indexId;
     }else{
       total += zero.dataset.indexId;
     }
     output_sub.textContent = total;
     //state = 'calculation'
   })

//小数点(.)
   const point = document.getElementById('point');
     point.addEventListener('click', () => {
       console.log(point.dataset.indexId);
        if(mode==='decimal_mode'){
          return;
        }
　　　 if(state==='start' ||state==='finish'){
        total=0;
      }else if(state==='calBtn'){
        if(output_sub.textContent.slice(-1)!=='0'){
          total +=0;
        }
      }
       total +=point.dataset.indexId;

       output_sub.textContent = total;
       state = 'calculation'
       mode = 'decimal_mode';
     })

//演算子『+ ÷ - x』
const cal = document.querySelectorAll('.cal');
cal.forEach(index => {
  index.addEventListener('click', () => {
    if(state === 'start') {
      return;//最初演算子は押せなくしている
    }else if(state === 'calculation'){
      total += index.dataset.indexId;
    }else if(state === 'finish'){
      //計算後は前の計算結果をtotal に代入して計算しなおす。
      total = output_total.textContent;
      total += index.dataset.indexId;
      output_total.textContent = 0
    }else if(state==='calBtn'){
      //stateがcalBtnの時はtotalの最後の記号を削除し、新たな記号を追加
　　　　total=total.slice(0,-1)
       total+=index.dataset.indexId;
    }
    console.log(index.dataset.indexId);
    output_sub.textContent = total;
    state = 'calBtn'//演算記号を入力している状態
    mode='integer_mode'//整数モードに戻す
  })
})







//BSボタンを押したときの処理
const bs = document.getElementById('bs')
  bs.addEventListener('click', () => {
    if(state ==='finish') {
      return;//計算後は、bsを押せない。
    }
//      一文字目から、最後から二文字目までをtotalに代入（最後の一文字を除きtotalに代入する）
    total = output_sub.textContent.slice(0, -1);
    output_sub.textContent = total;

    let lastWord = output_sub.textContent.slice(-1)
    if(lastWord==='+'||lastWord==='-'||lastWord==='*'||lastWord==='/') {
//bsを押し、最後の文字が演算記号ならstateを演算記号入力中calBtに変更
      state = 'calBtn'
    }else if(lastWord==='') {
//bsを押し、文字が空ならstateを最初startに変更
      state = 'start';
    }
  });



 //Cボタンを押したときの処理
   const clear= document.getElementById('clear')
   clear.addEventListener('click',()=>{
     reset();
   })

  //リセットを行う関数
  function reset(){
    total=0;
    output_sub.textContent=0;
    output_total.textContent=0;
    state='start'
    mode='integer_mode'
  }

  //↓イコールを押した時↓
  const equal_btn = document.getElementById('equal_btn');
  equal_btn.addEventListener('click',() =>{
    console.log(eval(total));
    output_total.textContent = eval(total);
  });

}//閉め
