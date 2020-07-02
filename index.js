
import './index.css';
import './lib/tagEvent.js';
import createScript from './lib/createScript.js';
import imageLazyLoad from './lib/imageLazyLoad.js'
import yuTransition from './components/layout/transition.vue'
import yuCache from './components/layout/cache.vue'


class Plugin{
	constructor(url) {
		this.url = url;
		this.componentNames = [
			'icon/icon',
			'slide/slide',
			'tabs/tabX',
			'tabs/tabY',
			'dialog/form',
			'layout/slideView',
			'layout/shade',
			'layout/view',
			'layout/routePage',
			'layout/page',
			'layout/pull',
			'layout/touchTitle',
			'layout/touchX',
			'layout/touchY',
			'sidebar/top',
			'sidebar/right',
			'sidebar/bottom',
			'sidebar/left',
		];
	}
	
	install(Vue,options){
		this.createScript(this.url);
		this.imageLazyLoad(Vue,options);
		this.setComponent(Vue);
	}
}

Plugin.prototype.setComponent = function(Vue){
	Vue.component('yuTransition',yuTransition);
	Vue.component('yuCache',yuCache);
	this.componentNames.forEach( name=>{
		let arr = name.split('/');
		let filename = arr[arr.length-1];
		let component = 'yu'+filename.replace(filename[0],filename[0].toLocaleUpperCase());
		Vue.component(component,resolve => require(['./components/'+name+'.vue'], resolve));
	});
}

Plugin.prototype.imageLazyLoad = imageLazyLoad;
Plugin.prototype.createScript = createScript;

export default Plugin;
