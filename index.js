import './index.css';

class Plugin{
	constructor(){
		this.componentNames = [
			'slide/slideX',
			'slide/slideY',
			'tabs/tabX',
			'tabs/tabY',
			'layout/transition',
			'layout/routerContainer',
			'layout/router',
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
	
	setComponent(Vue){
		this.componentNames.forEach( name=>{
		    let arr = name.split('/');
		    let filename = arr[arr.length-1];
		    let component = 'yu'+filename.replace(filename[0],filename[0].toLocaleUpperCase());
			
			Vue.component(component,()=>import('./components/'+name+'.vue'));
		} );
	}
	
	install(Vue,options){
		this.setComponent(Vue);
	}
	
}

export default Plugin;