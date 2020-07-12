
import { throttle } from 'yu-util'

function imageLazyLoad(Vue,options){
	let io = null;
	let imgs = [];
	options = typeof options==='object'? options: {};
	let clientHeight = document.documentElement.clientHeight;
	
	if(window.IntersectionObserver){
		io = new IntersectionObserver(entries => {
		  entries.forEach(entrie => {
		    const element = entrie.target
		    const dataSrc = element.getAttribute('data-src')
		    entrie.isIntersecting && (element.src = dataSrc)
		    new RegExp(dataSrc).test(element.src) && io.unobserve(element)
		  })
		})
	}else{
		window.addEventListener('load',()=>{
			if(options.root){
				(function fn(){
					let root = document.querySelector(options.root);
					root && rootScroll(root,imgs,clientHeight);
					!root && setTimeout(fn,16) 
				})()
			}else{
				rootScroll(window,imgs,clientHeight);
			}
		})
	}
	
	Vue.directive('Lazy', {
	  inserted (el, binding) {
	    el.setAttribute('data-src', binding.value)
	    io && io.observe(el)
			!io && load(imgs,el,clientHeight);
	  }
	});
}

function rootScroll(root,imgs,clientHeight){
	root.addEventListener( 'scroll', 
		throttle(function(){
			imgs.forEach(img=>{
				let rect = img.getBoundingClientRect();
				if(rect.top<clientHeight && rect.bottom>0){
					img.src = img.getAttribute('data-src');
				}
			})
		},500)
	)
}

function load(imgs,el,clientHeight){
	let contains = document.body.contains.bind(document.body);
	(function fn(){
		if(contains(el)){   //判断el是否已插入body
			imgs.push(el);
			let rect = el.getBoundingClientRect();
			if(rect.top<clientHeight && rect.bottom>0){
				el.src = el.getAttribute('data-src');
			}
		}else{
			setTimeout(fn,16)
		}
	})()
}

export default imageLazyLoad;
