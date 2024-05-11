import{_ as M,b as y,r as p,o as i,c as d,a as e,d as n,w as v,e as w,v as L,D as k,m as x,u as D,n as V,F as f,f as $,t as g}from"./index-jwb4G8ly.js";const N={data(){return{isLoading:!1,modal:{},tempCoupon:{},due_date:"",couponSchema:{coupon_code:"required",coupon_percent:"required",coupon_title:"required"}}},props:{coupon:{type:Object,default(){return{}}},isNew:Boolean},emits:["updateCouponEmit"],components:{},methods:{showModal(){this.modal.show()},hideModal(){this.modal.hide()},submitCuopon(){this.$emit("updateCouponEmit",this.tempCoupon)},toggleLoading(o){o?(this.modalBackdrop="static",this.isLoading=o):this.isLoading=o}},mounted(){this.modal=new y.Modal(this.$refs.cupponModal)},watch:{coupon(){if(this.isNew){this.due_date=this.tempCoupon={};const o=new Date().toISOString().slice(0,10);this.due_date=o}else{this.tempCoupon=this.coupon;const o=new Date(this.tempCoupon.due_date*1e3).toISOString().slice(0,10);this.due_date=o}},due_date(){this.tempCoupon.due_date=new Date(this.due_date)/1e3}}},S={id:"cupponModal",ref:"cupponModal",class:"modal fade",tabindex:"-1","aria-labelledby":"cupponModalLabel","aria-hidden":"true","data-bs-backdrop":"static"},E={class:"modal-dialog"},P={class:"modal-content border-0"},U={class:"modal-header bg-dark text-white"},B={id:"cupponModalLabel",class:"modal-title"},F={key:0},G={key:1},q=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),O={class:"modal-body"},j={class:"mb-3"},H=e("label",{for:"title"},"標題",-1),I={class:"mb-3"},T=e("label",{for:"coupon_code"},"優惠碼",-1),z={class:"mb-3"},A=e("label",{for:"due_date"},"到期日",-1),J={class:"mb-3"},K=e("label",{for:"price"},"折扣百分比",-1),Q={class:"mb-3"},R={class:"form-check"},W=e("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用",-1),X={class:"modal-footer"},Y=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},"取消",-1),Z={type:"submit",class:"btn btn-primary"},ee={key:0},te={key:1};function oe(o,t,u,m,s,c){const b=p("LoadingGlobal"),r=p("vee-field"),h=p("ErrorMessage"),a=p("VeeForm");return i(),d("div",S,[e("div",E,[n(a,{"validation-schema":s.couponSchema,onSubmit:c.submitCuopon},{default:v(()=>[e("div",P,[e("div",U,[e("h5",B,[u.isNew?(i(),d("span",F,"新增優惠卷")):(i(),d("span",G,"編輯優惠卷"))]),q]),n(b,{active:s.isLoading,"can-cancel":!0,color:"blue","is-full-page":!1,loader:"dots",opacity:.7},null,8,["active"]),e("div",O,[e("div",j,[H,n(r,{type:"text",class:"form-control",name:"coupon_title",id:"title",modelValue:s.tempCoupon.title,"onUpdate:modelValue":t[0]||(t[0]=l=>s.tempCoupon.title=l),placeholder:"請輸入標題"},null,8,["modelValue"]),n(h,{class:"text-danger",name:"coupon_title"})]),e("div",I,[T,n(r,{type:"text",class:"form-control",id:"coupon_code",name:"coupon_code",modelValue:s.tempCoupon.code,"onUpdate:modelValue":t[1]||(t[1]=l=>s.tempCoupon.code=l),placeholder:"請輸入優惠碼"},null,8,["modelValue"]),n(h,{class:"text-danger",name:"coupon_code"})]),e("div",z,[A,w(e("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":t[2]||(t[2]=l=>s.due_date=l)},null,512),[[L,s.due_date]])]),e("div",J,[K,n(r,{type:"number",class:"form-control",id:"price",name:"coupon_percent",min:"0",modelValue:s.tempCoupon.percent,"onUpdate:modelValue":t[3]||(t[3]=l=>s.tempCoupon.percent=l),modelModifiers:{number:!0},placeholder:"請輸入折扣百分比"},null,8,["modelValue"]),n(h,{class:"text-danger",name:"coupon_percent"})]),e("div",Q,[e("div",R,[n(r,{id:"is_enabled",class:"form-check-input",type:"checkbox",name:"cupon_isEnable",value:1,"unchecked-value":0,modelValue:s.tempCoupon.is_enabled,"onUpdate:modelValue":t[4]||(t[4]=l=>s.tempCoupon.is_enabled=l)},null,8,["modelValue"]),W]),n(h,{class:"text-danger",name:"cupon_isEnable"})])]),e("div",X,[Y,e("button",Z,[u.isNew?(i(),d("span",ee,"新增優惠卷")):(i(),d("span",te,"更新優惠卷"))])])])]),_:1},8,["validation-schema","onSubmit"])])],512)}const se=M(N,[["render",oe]]),_="https://vue3-course-api.hexschool.io/v2/api/japanbread",ne={data(){return{isLoading:!1,coupons:[],deleteData:{},cupponProps:{},isNew:!1}},components:{DelProductModal:k,CupponModal:se},computed:{loadingHeigh(){return this.isLoading?{height:"100px"}:{height:"inherit"}}},methods:{...x(D,["pushMessage"]),async getCupons(o){o===!1?this.isLoading=!1:this.isLoading=!0;try{let t=await this.$http.get(`${_}/admin/coupons`);this.coupons=t.data.coupons,this.isLoading=!1}catch(t){this.pushMessage({style:"fail",title:t.response.data.message}),this.isLoading=!1}},openDelModal(o){this.$refs.delProductModal.showModal(),this.deleteData=o},openCupponModal(o,t){o?(this.isNew=!0,this.cupponProps={}):(this.isNew=!1,this.cupponProps={...t}),this.$refs.cupponModal.toggleLoading(!1),this.$refs.cupponModal.showModal()},async updateCoupon(o){this.$refs.cupponModal.toggleLoading(!0);let t=`${_}/admin/coupon`,u="post",m=o;o.id&&(t=`${_}/admin/coupon/${o.id}`,u="put",m=o);try{let s=await this.$http[u](t,{data:m});await this.getCupons(!1),this.$refs.cupponModal.toggleLoading(!1),this.$refs.cupponModal.hideModal(),this.pushMessage({style:"success",title:s.data.message})}catch(s){this.$refs.cupponModal.hideModal(),this.$refs.cupponModal.toggleLoading(!1),this.pushMessage({style:"danger",title:s.response.data.message})}},async deleteCupon({id:o}){this.isLoading=!0;try{await this.$http.delete(`${_}/admin/coupon/${o}`),await this.getCupons(),this.pushMessage({style:"success",title:"刪除成功"})}catch(t){this.pushMessage({style:"fail",title:"刪除失敗",content:t.response.data.message}),this.isLoading=!1}}},mounted(){this.getCupons()}},ae={class:"table"},le=e("thead",null,[e("tr",null,[e("th",null,"名稱"),e("th",null,"折扣百分比"),e("th",null,"到期日"),e("th",null,"是否啟用"),e("th",null,"編輯")])],-1),ie={key:0,class:"text-success"},de={key:1,class:"text-muted"},ce={class:"py-1"},pe={class:"btn-group"},ue=["onClick"],re=["onClick"],he={class:"text-end mt-4"};function me(o,t,u,m,s,c){const b=p("LoadingGlobal"),r=p("CupponModal"),h=p("DelProductModal");return i(),d(f,null,[e("table",ae,[le,e("tbody",{class:"vl-parent",style:V(c.loadingHeigh)},[n(b,{active:s.isLoading,"onUpdate:active":t[0]||(t[0]=a=>s.isLoading=a),"can-cancel":!0,color:"blue","is-full-page":!1,loader:"dots",opacity:.8},null,8,["active"]),(i(!0),d(f,null,$(s.coupons,(a,l)=>(i(),d("tr",{key:l},[e("td",null,g(a.title),1),e("td",null,g(a.percent)+"%",1),e("td",null,g(o.$filters.date(a.due_date)),1),e("td",null,[a.is_enabled===1?(i(),d("span",ie,"啟用")):(i(),d("span",de,"未啟用"))]),e("td",ce,[e("div",pe,[e("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:C=>c.openCupponModal(!1,a)}," 編輯 ",8,ue),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:C=>c.openDelModal(a)},"刪除",8,re)])])]))),128))],4)]),e("div",he,[e("button",{class:"btn btn-primary",onClick:t[1]||(t[1]=a=>c.openCupponModal(!0))},"建立新的優惠卷")]),n(r,{ref:"cupponModal",coupon:s.cupponProps,isNew:s.isNew,onUpdateCouponEmit:c.updateCoupon},null,8,["coupon","isNew","onUpdateCouponEmit"]),n(h,{ref:"delProductModal",delData:s.deleteData,onConfirmDeleteData:c.deleteCupon},null,8,["delData","onConfirmDeleteData"])],64)}const be=M(ne,[["render",me]]);export{be as default};
