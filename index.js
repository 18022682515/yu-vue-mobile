
import './index.css';
import imageLazyLoad from './lib/imageLazyLoad.js'

class Plugin{
	constructor() {
		this.componentNames = [
			'slide/slideX',
			'slide/slideY',
			'tabs/tabX',
			'tabs/tabY',
			'layout/transition',
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
		this.imageLazyLoad(Vue,options);
		this.setComponent(Vue);
	}
}

Plugin.prototype.setComponent = function(Vue){
	this.componentNames.forEach( name=>{
			let arr = name.split('/');
			let filename = arr[arr.length-1];
			let component = 'yu'+filename.replace(filename[0],filename[0].toLocaleUpperCase());
		
		Vue.component(component,()=>import('./components/'+name+'.vue'));
	} );
}

Plugin.prototype.imageLazyLoad = imageLazyLoad;

export default Plugin;
