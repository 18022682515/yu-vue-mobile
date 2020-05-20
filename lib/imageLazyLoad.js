

function imageLazyLoad(Vue,options){
	let io = null;
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
			let clientHeight = document.documentElement.clientHeight;
			let imgs = [];
			function fn(){
				imgs = [...document.querySelectorAll('img[data-src]')];
				imgs.length<1 && setTimeout(fn,100)
			}
			Vue.nextTick(()=>{
				//让vue的虚拟节点生成dom元素后，再获取图片元素
				setTimeout(fn,200); 
			})
			window.addEventListener('scroll',()=>{
				imgs.forEach(img=>{
					let rect = img.getBoundingClientRect();
					if(rect.top<clientHeight && rect.bottom>0){
						img.src = img.getAttribute('data-src');
					}
				})
			})
		})
	}
	
	Vue.directive('Lazy', {
	  bind (el, bind) {
	    el.setAttribute('data-src', bind.value)
	    io && io.observe(el)
	  }
	});
}

export default imageLazyLoad;
