const app = Vue.createApp({
    data(){
        return{
            title: "Contador App - Vue",
            count: 0,
            
        };
    },
    methods: {
        modcount(instruction = "dis", limit = 1){
            if(instruction === "dis") this.count -= limit;
            else this.count += limit;
        },
    },
});