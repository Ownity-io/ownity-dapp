import lang from "./lang.json";

export default class MultiLang {

    constructor(vueContext) {
        if(vueContext.state){
            this.store = vueContext;
        } else {
            this.store = vueContext.$store;
        }
    }

    init() {
        let lang = localStorage.getItem('lang');
        if (lang) {
            this.store.dispatch('updateLanguage', lang);
        } else {
            this.store.dispatch('updateLanguage', 'en');
        }
    }

    get(key) {
        let source = lang;
        let langKey = this.store.getters["langGetter"];

        return source[langKey][key];
    }
}
