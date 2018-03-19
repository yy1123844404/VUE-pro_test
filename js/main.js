//定义组件（局部）
const ctop = {
	template:`
		<div class="top">
			<h1>这个标题组件</h1>
		</div>
	`
}

const cleft={
	template:`
		<div class="left">
			<span>这个是左边的组件--列表</span><br><br>
			<span v-for="(value,key) in this.ary" @click="add(key)">
				{{ value }}<br>
			</span>
		</div>
	`,
	data:function(){
		return {
			ary:[]
		}
	},
	methods:{
		add:function(key){
			this.$emit("addall",key);
		}
	},
	beforeMount:function(){
		axios.get("./js/main.json")
		  .then((res)=>{
		  	this.ary = res.data.title;
		  })
		  .catch(function(err){
		  	console.log(err)
		  }
		);
	}
}

const cright={
	props:["obj"],
	template:`
		<div class="right">
			<span>这个右边的组件--内容</span>
			<br><br>
			<h2 style="text-align: center;"> {{obj.title}} </h2>
			<p>&nbsp;&nbsp;{{obj.content}} </p>
		</div>
	`
}

const cbottom = {
	template:`
		<div class="bottom">
			<span>这个是底部组件</span>
		</div>
	`
}
//实例化组件
Vue.component("ctop",ctop);
Vue.component("cleft",cleft);
Vue.component("cright",cright);
Vue.component("cbottom",cbottom);






//挂载目标
new Vue({
	el:"#maxbox",
	data:{
		ary:[],
		obj:{
			title:"",
			content:""
		}
	},
	methods:{
		ok:function(key){
			axios.get("./js/main.json")
			  .then((res)=>{
			  	this.ary = res.data;
			  	this.obj.title = res.data.title[key];
			  	this.obj.content = res.data.content[key]
			  })
			  .catch(function(err){
			  	console.log(err);
			  }
			);
		}
	}
})
