
function imageLazyLoad(Vue){
	const io = new IntersectionObserver(entries => {
	  entries.forEach(entrie => {
	    const element = entrie.target
	    const dataSrc = element.getAttribute('data-src')
	    entrie.isIntersecting && (element.src = dataSrc)
	    new RegExp(dataSrc).test(element.src) && io.unobserve(element)
	  })
	})
	
	Vue.directive('Lazy', {
	  bind (el, bind) {
	    el.setAttribute('data-src', bind.value)
	    io.observe(el)
	  }
	})
}

export default imageLazyLoad;