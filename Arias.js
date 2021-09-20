    // function funct2(){
    //     let rtl = document.getElementById('rtl').value
    //     let rtr = document.getElementById('rtr').value
    //     let rbr = document.getElementById('rbr').value
    //     let rbl = document.getElementById('rbl').value
    //     let ttl = document.getElementById('ttl')
    //     let ttr = document.getElementById('ttr')
    //     let tbr = document.getElementById('tbr')
    //     let tbl = document.getElementById('tbl')

    //     let blocks = document.getElementById('blocks')

    //     ttl.value=rtl
    //     ttr.value=rtr
    //     tbr.value=rbr
    //     tbl.value=rbl
    //     blocks.style.borderRadius = `${rtl}px ${rtr}px ${rbr}px ${rbl}px`; 


    // }



    // document.getElementById('nav').onmouseover = function(event) {
    //     let target = event.target
    //     if(target.className == 'menu-item'){
    //         let s = target.getElementsByClassName('submenu')
    //         closeMenu()
    //         s[0].style.display = 'block'
    //     }
    // }

    // document.onmouseover = function(event){
    //     let target = event.target
    //     console.log(event.target)
    //     if(target.className!= 'menu-item' && target.className!='submenu'){
    //         closeMenu()
    //     }
    // }

    // function closeMenu(){
    //     let menu = document.getElementById('nav')
    //     let subm = document.getElementsByClassName('submenu')
    //     for(let i=0; i < subm.length; i++){
    //         subm[i].style.display ='none'
    //     }
    // }


    // let tab
    // let tabContent

    // window.onload=function(){
    //     tabContent = document.getElementsByClassName('tabContent')
    //     tab=document.getElementsByClassName('tab')
    //     hideTabsContent(1)
    // }

    // function hideTabsContent(a){
    //     for(let i = a; i<tabContent.length; i++){
    //         tabContent[i].classList.remove('show')
    //         tabContent[i].classList.add('hide')
    //         tab[i].classList.remove('whiteboarder')
    //     }
    // }

    // document.getElementById('tabs').onclick = function(event){
    //     let target = event.target
    //     if(target.className == 'tab'){
    //         for(let i=0; i<tab.length; i++){
    //             if(target == tab[i]){
    //                 showTabsContent(i)
    //                 break
    //             }
    //         }
    //     }
    // }

    // function showTabsContent(b){
    //     if(tabContent[b].classList.contains('hide')){
    //         hideTabsContent(0)
    //         tab[b].classList.add('whiteboarder')
    //         tabContent[b].classList.remove('hide')
    //         tabContent[b].classList.add('show')
    //     }
    // }

let modal = document.getElementById('myModal')
let btn = document.getElementById("myBtn")

btn.onclick = function () {
    modal.style.display = "block"
}

window.onclick = function(event){
    if(event.target == modal) {
        modal.style.display = "none"
    }
}

// function myMove(){
//     let elem= document.getElementById('myAnimation')
//     let pos = 0
//     let id = setInterval(frame, 10)
//     function frame(){
//         if(pos = 350) {
//             clearInterval(id)
//         }else {
//             pos++
//             elem.style.top = pos + 'px '
//             elem.style.left = pos + 'px '
//         }
//     }
// }

// let slideIndex = 1
// showSlides(slideIndex)

// function plusSlides(n){
//     showSlides(slideIndex += n)
// }

// function currentSlide(n){
//     showSlides(slideIndex =n)
// }

// function showSlides(n){
//     let i
//     let slides = document.getElementsByClassName("mySlides")
//     let dots = document.getElementsByClassName("dot")

//     if(n >slides.length){
//         slideIndex = 1
//     }
//     if(n<1){
//         slideIndex =slides.length
//     }
//     for(i=0; i<slides.length; i++){
//         slides[i].style.display= "none"
//     }
//     for(i=0;i<dots.length; i++){
//     dots[i].className = dots[i].className.replace("active","")
// }
// slides[slideIndex-1].style.display = "block"
// dots[slideIndex-1].className+= " active"
// }