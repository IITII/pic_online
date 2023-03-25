(globalThis["webpackChunkpic_online_front"]=globalThis["webpackChunkpic_online_front"]||[]).push([[64],{33649:(e,t,o)=>{"use strict";o.d(t,{Ti:()=>i,_V:()=>r,gc:()=>l,hA:()=>n,sw:()=>s});o(65663);function i(e=window,t=document){return e.innerHeight?e.innerHeight:t.body&&t.body.clientHeight?t.body.clientHeight:e.screen.availHeight}function n(e=window,t=document){return e.innerWidth?e.innerWidth:t.body&&t.body.clientWidth?t.body.clientWidth:e.screen.availWidth}function r(e,t,o,i,n=!0,r=""){t.dispatch("user/user",e),i.defaults.headers["authorization"]=["Token",e.token].join(" "),n&&o.push({path:r||`/${e.user_type}/image`})}function l(e,t){e.dispatch("user/logout"),t.defaults.headers["authorization"]=""}function s(e,t=""){const o=["admin","maintainer"];return t?`${t} text-white`:o.some((t=>t===e))?"bg-pink-4 text-white":"bg-primary text-white"}},94336:(e,t,o)=>{"use strict";o.d(t,{Z:()=>p});var i=o(83673),n=o(98880);const r={class:"background"},l=["alt","src"];function s(e,t,o,s,a,d){return(0,i.wy)(((0,i.wg)(),(0,i.iD)("div",null,[(0,i._)("div",r,[(0,i._)("img",{alt:o.imgAlt,src:d.back,class:"img"},null,8,l)])],512)),[[n.F8,d.back]])}var a=o(33649),d=o(10741);const c={name:"PicBackground",computed:{...(0,d.rn)({background:e=>e.common.background}),back(){return this.backgroundImage||this.background}},beforeMount(){this.$log.debug(this.background),this.resizeImage()},methods:{resizeImage(){let e=document.getElementsByClassName("background");if(e&&e.length>0){e=e[0];const t=`${(0,a.Ti)()}px`;this.$log.debug(`Resize image height to ${t}`),e.style.height=t}}},watch:{back(e){e&&this.resizeImage()}},props:{backgroundImage:{type:String,default:""},imgAlt:{type:String,default:""}}};var u=o(74260);const h=(0,u.Z)(c,[["render",s],["__scopeId","data-v-03ad63c1"]]),p=h},78350:(e,t,o)=>{"use strict";o.d(t,{Z:()=>u});var i=o(83673);function n(e,t,o,n,r,l){const s=(0,i.up)("q-select");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(s,{modelValue:l.lang,"onUpdate:modelValue":t[0]||(t[0]=e=>l.lang=e),dark:!0,options:r.langOptions,"options-dark":e.$q.dark.isActive,"options-dense":!1,borderless:"",color:"pink",dense:"","dropdown-icon":"translate","emit-value":"","map-options":""},null,8,["modelValue","options","options-dark"])])}const r={name:"PicLanguagePicker",data(){return{langOptions:[{value:"en-US",label:"English"},{value:"zh-CN",label:"简体"}]}},computed:{lang:{get:function(){return this.$log.debug("Get language setting"),this.$store.getters["user/language"]||this.$q.lang.getLocale()||"zh-CN"},set:function(e){this.$log.debug(`Set language to ${e}`),this.$i18n.locale=e,this.$store.dispatch("user/language",e)}}},beforeMount(){this.$i18n.locale=this.lang}};var l=o(74260),s=o(68516),a=o(7518),d=o.n(a);const c=(0,l.Z)(r,[["render",n]]),u=c;d()(r,"components",{QSelect:s.Z})},78334:(e,t,o)=>{"use strict";o.d(t,{Z:()=>y});var i=o(83673),n=o(62323);function r(e,t,o,r,l,s){const a=(0,i.up)("q-icon"),d=(0,i.up)("q-item-section"),c=(0,i.up)("q-item-label"),u=(0,i.up)("q-item"),h=(0,i.up)("q-list"),p=(0,i.up)("q-menu"),g=(0,i.up)("q-btn"),m=(0,i.Q2)("close-popup");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(g,{dense:"",flat:"",icon:"more",round:""},{default:(0,i.w5)((()=>[(0,i.Wm)(p,{fit:""},{default:(0,i.w5)((()=>[(0,i.Wm)(h,null,{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.links,((e,t)=>(0,i.wy)(((0,i.wg)(),(0,i.j4)(u,{key:t,to:e.link,clickable:""},{default:(0,i.w5)((()=>[e.icon?((0,i.wg)(),(0,i.j4)(d,{key:0,avatar:""},{default:(0,i.w5)((()=>[(0,i.Wm)(a,{name:e.icon},null,8,["name"])])),_:2},1024)):(0,i.kq)("",!0),(0,i.Wm)(d,null,{default:(0,i.w5)((()=>[(0,i.Wm)(c,null,{default:(0,i.w5)((()=>[(0,i.Uk)((0,n.zw)(e.title),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["to"])),[[m]]))),128)),(0,i.wy)(((0,i.wg)(),(0,i.j4)(u,{clickable:"",onClick:s.logout},{default:(0,i.w5)((()=>[(0,i.Wm)(d,{avatar:""},{default:(0,i.w5)((()=>[(0,i.Wm)(a,{name:"logout"})])),_:1}),(0,i.Wm)(d,null,{default:(0,i.w5)((()=>[(0,i.Uk)((0,n.zw)(e.$t("logout")),1)])),_:1})])),_:1},8,["onClick"])),[[m]])])),_:1})])),_:1})])),_:1})])}var l=o(33649);const s={name:"PicMenu",components:{},props:{menuLinks:{type:Array,required:!1,default:e=>[]}},computed:{links(){return this.menuLinks}},methods:{logout(){return(0,l.gc)(this.$store,this.$axios)}}};var a=o(74260),d=o(48240),c=o(20811),u=o(27011),h=o(83414),p=o(52035),g=o(24554),m=o(2350),_=o(60677),f=o(7518),b=o.n(f);const w=(0,a.Z)(s,[["render",r]]),y=w;b()(s,"components",{QBtn:d.Z,QMenu:c.Z,QList:u.Z,QItem:h.Z,QItemSection:p.Z,QIcon:g.Z,QItemLabel:m.Z}),b()(s,"directives",{ClosePopup:_.Z})},57006:(e,t,o)=>{"use strict";o.d(t,{Z:()=>$});var i=o(83673),n=o(62323);const r=["href"];function l(e,t,o,l,s,a){const d=(0,i.up)("q-tab"),c=(0,i.up)("q-tabs"),u=(0,i.up)("q-separator"),h=(0,i.up)("q-input"),p=(0,i.up)("q-tab-panel"),g=(0,i.up)("q-tab-panels"),m=(0,i.up)("q-btn"),_=(0,i.up)("q-card-section"),f=(0,i.up)("q-badge"),b=(0,i.up)("q-card");return(0,i.wg)(),(0,i.j4)(b,{class:"setting_sty"},{default:(0,i.w5)((()=>[(0,i.Wm)(c,{modelValue:s.selectTab,"onUpdate:modelValue":t[0]||(t[0]=e=>s.selectTab=e),"active-bg-color":"pink-1","active-color":"pink-4",align:"justify",class:"text-teal","indicator-color":"pink-5"},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(a.namespace.keys(),(e=>((0,i.wg)(),(0,i.j4)(d,{key:e,label:e,name:e},null,8,["label","name"])))),128))])),_:1},8,["modelValue"]),(0,i.Wm)(u),(0,i.Wm)(g,{modelValue:s.selectTab,"onUpdate:modelValue":t[1]||(t[1]=e=>s.selectTab=e),animated:""},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(a.namespace.keys(),((e,t)=>((0,i.wg)(),(0,i.j4)(p,{key:t,name:e},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(a.namespace.get(s.selectTab),(e=>((0,i.wg)(),(0,i.j4)(h,{key:e,modelValue:s.store[e],"onUpdate:modelValue":t=>s.store[e]=t,label:e,dense:s.dense},null,8,["modelValue","onUpdate:modelValue","label","dense"])))),128))])),_:2},1032,["name"])))),128))])),_:1},8,["modelValue"]),(0,i.Wm)(_,{style:{"text-align":"center",padding:"3px"}},{default:(0,i.w5)((()=>[(0,i.Wm)(m,{onClick:a.submit,color:"primary",label:e.$t("submit"),class:"btn-style"},null,8,["onClick","label"]),(0,i.Wm)(m,{onClick:a.reset,color:"accent",label:e.$t("revert"),class:"btn-style"},null,8,["onClick","label"]),(0,i.Wm)(m,{onClick:a.btn_default,color:"negative",label:e.$t("default"),class:"btn-style"},null,8,["onClick","label"])])),_:1}),(0,i.Wm)(u),(0,i.Wm)(_,{style:{height:"25px","text-align":"center",padding:"2px"}},{default:(0,i.w5)((()=>[(0,i._)("a",{href:s.authorInfo.repo.url,style:{"text-decoration":"none"},target:"_blank"},[(0,i.Wm)(f,{color:s.badge.color,"text-color":s.badge.text_color,outline:""},{default:(0,i.w5)((()=>[(0,i.Uk)((0,n.zw)(s.authorInfo.repo.name),1)])),_:1},8,["color","text-color"])],8,r)])),_:1})])),_:1})}const s={name:"PicStoreSettings",data(){return{selectTab:"",store:{},dense:!1,authorInfo:{repo:{name:"Vue Store Management by IITII",url:"https://github.com/iitii/pic_online",author:"Github@IITII"}},badge:{color:"pink",text_color:"white"}}},mounted(){this.reset()},computed:{namespace(){const e=new Map,t="default";for(let o in this.store){const i=o.includes("/")?o.split("/")[0]:t;e.has(i)?e.set(i,e.get(i).concat(o)):e.set(i,[o])}return e}},methods:{submit(){const e=this.namespace.get(this.selectTab);for(let t in e){const o=e[t];this.$store.dispatch(o,this.store[o])}},reset(){this.store=JSON.parse(JSON.stringify(this.$store.getters)),this.$log.debug(this.namespace.keys().next().value),this.selectTab=this.namespace.keys().next().value},btn_default(){localStorage.clear()}}};var a=o(74260),d=o(10151),c=o(57547),u=o(3269),h=o(65869),p=o(5906),g=o(86602),m=o(34842),_=o(25589),f=o(48240),b=o(69721),w=o(7518),y=o.n(w);const k=(0,a.Z)(s,[["render",l],["__scopeId","data-v-2a4e9380"]]),$=k;y()(s,"components",{QCard:d.Z,QTabs:c.Z,QTab:u.Z,QSeparator:h.Z,QTabPanels:p.Z,QTabPanel:g.Z,QInput:m.Z,QCardSection:_.Z,QBtn:f.Z,QBadge:b.Z})},59578:(e,t,o)=>{"use strict";o.d(t,{Z:()=>k});var i=o(83673),n=o(62323);const r={class:"q-pa-md q-gutter-sm"},l={style:{"text-align":"center"}},s={class:"row items-center"};function a(e,t,o,a,d,c){const u=(0,i.up)("q-badge"),h=(0,i.up)("q-icon"),p=(0,i.up)("q-input"),g=(0,i.up)("q-tree"),m=(0,i.up)("q-drawer");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(m,{modelValue:c.leftDrawerSync,"onUpdate:modelValue":t[3]||(t[3]=e=>c.leftDrawerSync=e),"content-class":"bg-grey-1",elevated:"","show-if-above":""},{default:(0,i.w5)((()=>[(0,i._)("div",r,[(0,i._)("div",l,[(0,i.Wm)(u,{color:d.badge.color,"text-color":d.badge.text_color},{default:(0,i.w5)((()=>[(0,i.Uk)((0,n.zw)(c.selectNodeTitle),1)])),_:1},8,["color","text-color"])]),(0,i._)("div",null,[(0,i.Wm)(p,{ref:"filter",modelValue:d.tree.filter,"onUpdate:modelValue":t[0]||(t[0]=e=>d.tree.filter=e),label:e.$t("filter"),filled:"",onInput:c.inputListener},{append:(0,i.w5)((()=>[""!==d.tree.filter?((0,i.wg)(),(0,i.j4)(h,{key:0,class:"cursor-pointer",name:"clear",onClick:c.resetFilter},null,8,["onClick"])):(0,i.kq)("",!0)])),_:1},8,["modelValue","label","onInput"])]),(0,i._)("div",null,[(0,i.Wm)(g,{ref:"qtree","no-transition":"",expanded:d.tree.expanded,"onUpdate:expanded":t[1]||(t[1]=e=>d.tree.expanded=e),filter:d.tree.filter,nodes:d.tree.nodes,selected:d.tree.selectedNodeSync,"onUpdate:selected":[t[2]||(t[2]=e=>d.tree.selectedNodeSync=e),c.update_selected],"node-key":"nodeKey",onLazyLoad:c.onLazyLoad},{"default-header":(0,i.w5)((e=>[(0,i._)("div",s,[(0,i.Uk)((0,n.zw)(e.node.label)+" ",1),e.node.dirCount?((0,i.wg)(),(0,i.j4)(u,{key:0,color:d.badge.color,"text-color":d.badge.text_color,class:"q-ml-sm"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,n.zw)(e.node.dirCount),1)])),_:2},1032,["color","text-color"])):(0,i.kq)("",!0),e.node.hasOwnProperty("fileCount")?((0,i.wg)(),(0,i.j4)(u,{key:1,"text-color":d.badge.text_color,class:"q-ml-sm",color:"warning"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,n.zw)(e.node.fileCount),1)])),_:2},1032,["text-color"])):(0,i.kq)("",!0)])])),_:1},8,["expanded","filter","nodes","selected","onLazyLoad","onUpdate:selected"])])])])),_:1},8,["modelValue"])])}o(65663);var d=o(10741);let c=null;const u={name:"PicDrawer",props:{api_url:{type:String,required:!0},lazy_url:{type:String,required:!0},storeName:{type:String,required:!0}},data(){return{leftDrawerOpen:!0,tree:{filter:"",nodes:[],nodeKeyMap:new Map,expanded:[],selectedNodeSync:1},badge:{color:"primary",text_color:"white"}}},computed:{...(0,d.rn)({currentNodeKey:e=>e[c.storeName].node_key,drawer_open:e=>e[c.storeName].drawer_open}),leftDrawerSync:{get:function(){return this.$store.getters[`${this.storeName}/drawer_open`]},set:function(e){return this.$store.dispatch(`${this.storeName}/drawer_open`,e)}},selectNodeTitle:{get:function(){return this.$store.getters[`${this.storeName}/title`]},set:function(e){if(e)return this.$store.dispatch(`${this.storeName}/title`,e)}}},methods:{nodesToNodeKeyMap:function(e){const t=new Map;function o(e,i=1/0,n=t){i!==1/0&&n.set(e.nodeKey,i),Array.isArray(e.children)&&e.children.length>0&&e.children.forEach((t=>o(t,e.nodeKey)))}return e.forEach((e=>o(e))),t},nodeKeyMapToExpandNodes:function(e,t=1){const o=this.tree.nodeKeyMap,i=[e];let n=e;while(n!==t)n=o.get(n),i.push(n);return i},resetFilter:function(){this.tree.filter="",this.$refs.filter.focus()},inputListener:function(e){""===e?this.tree.expanded=this.nodeKeyMapToExpandNodes(this.currentNodeKey):this.$refs.qtree.expandAll()},onLazyLoad:function({node:e,key:t,done:o,fail:i}){return this.$log.debug("lazy load:",e,t),this.$axios({method:"POST",url:this.lazy_url,params:{nodeKey:t},timeout:2e3}).then((e=>o(e))).catch((e=>{this.$log.error(e.message),i([])}))},update_selected:function(e){if(this.$log.debug(e,this.tree.selectedNodeSync),null!==e){this.$store.dispatch(`${this.storeName}/node_key`,e);const t=this.$refs.qtree.getNodeByKey(e);this.$log.debug(t),t?(this.$store.dispatch(`${this.storeName}/title`,t.label),this.tree.expanded=this.nodeKeyMapToExpandNodes(e),this.tree.selectedNodeSync=e):(this.$log.debug("??? unkown node, redirect to 1"),this.update_selected(1))}},btn_click_nextNode:function(){this.update_selected(this.currentNodeKey+1)},btn_click_leftDrawer(){this.leftDrawerSync=!this.leftDrawerSync},btn_click_setting(){}},beforeCreate(){c=this},created(){this.$bus.on("btn_click_nextNode",this.btn_click_nextNode),this.$bus.on("btn_click_leftDrawer",this.btn_click_leftDrawer),this.$bus.on("btn_click_setting",this.btn_click_setting)},unmounted(){this.$bus.off("btn_click_nextNode",this.btn_click_nextNode),this.$bus.off("btn_click_leftDrawer",this.btn_click_leftDrawer),this.$bus.off("btn_click_setting",this.btn_click_setting)},beforeMount(){},mounted(){this.$axios({method:"GET",url:this.api_url}).then((e=>(this.tree.nodes=e,e))).then((e=>(this.tree.nodeKeyMap=this.nodesToNodeKeyMap(e),this.update_selected(this.currentNodeKey),e))).then((e=>{const t=this.nodeKeyMapToExpandNodes(this.currentNodeKey);this.$log.debug(`expandedNodes: ${t}`),this.tree.expanded=t})).catch((e=>{this.$log.error("connection_fail",e),this.$q.notify({message:this.$t("connection_fail"),caption:`${e.message}`,type:"negative"})}))}};var h=o(74260),p=o(96873),g=o(69721),m=o(34842),_=o(24554),f=o(55551),b=o(7518),w=o.n(b);const y=(0,h.Z)(u,[["render",a]]),k=y;w()(u,"components",{QDrawer:p.Z,QBadge:g.Z,QInput:m.Z,QIcon:_.Z,QTree:f.Z})},16118:(e,t,o)=>{"use strict";o.d(t,{Z:()=>L});var i=o(83673),n=o(62323);const r=["onClick"],l={key:0},s={key:0,class:"waterfall-nomore"};function a(e,t,o,a,d,c){const u=(0,i.up)("lazy-img"),h=(0,i.up)("vue-waterfall"),p=(0,i.up)("tool-group"),g=(0,i.up)("pic-store-settings"),m=(0,i.up)("q-dialog"),_=(0,i.up)("q-page");return(0,i.wg)(),(0,i.j4)(_,{class:"full-height-width"},{default:(0,i.w5)((()=>[(0,i.Wm)(h,{ref:"waterfall",gutter:8,lazyload:!0,delay:400,list:d.water_fall.img_urls,breakpoints:d.breakpoints,backgroundColor:c.backgroundColor},{item:(0,i.w5)((({item:t,url:o})=>[(0,i._)("div",{class:"text-center",onClick:e=>c.card_click_event("imgBoxClickEvent",t)},[(0,i.Wm)(u,{class:"img_box",url:o},null,8,["url"]),e.show_img_title?((0,i.wg)(),(0,i.iD)("span",l,(0,n.zw)(t.info),1)):(0,i.kq)("",!0)],8,r)])),_:1},8,["list","breakpoints","backgroundColor"]),d.water_fall.no_more?((0,i.wg)(),(0,i.iD)("span",s,(0,n.zw)(e.$t("waterfallOver")),1)):(0,i.kq)("",!0),(0,i.Wm)(p),(0,i.Wm)(m,{ref:"dialog",onHide:c.onDialogHide},{default:(0,i.w5)((()=>[(0,i.Wm)(g,{class:"btn-group-setting"})])),_:1},8,["onHide"])])),_:1})}var d=o(10741),c=o(33649);const u={class:"text-h6"};function h(e,t,o,r,l,s){const a=(0,i.up)("q-card-section"),d=(0,i.up)("video-player"),c=(0,i.up)("q-card"),h=(0,i.up)("q-dialog");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(h,{ref:"player"},{default:(0,i.w5)((()=>[(0,i.Wm)(c,{style:(0,n.j5)(s.computedCardStyle),class:"player"},{default:(0,i.w5)((()=>[o.info?((0,i.wg)(),(0,i.j4)(a,{key:0,ref:"player_title",class:(0,n.C_)(s.color),style:{padding:"0.5rem"}},{default:(0,i.w5)((()=>[(0,i._)("div",u,(0,n.zw)(o.info),1)])),_:1},8,["class"])):(0,i.kq)("",!0),(0,i.Wm)(a,{class:"player-padding"},{default:(0,i.w5)((()=>[(0,i.Wm)(d,{ref:"videoPlayer","playback-rate":l.playbackRate,options:s.playerOpts,customEventName:"changed",onChanged:t[0]||(t[0]=e=>s.playerStateChanged(e)),onReady:s.playerIsReady},null,8,["playback-rate","options","onReady"])])),_:1})])),_:1},8,["style"])])),_:1},512)])}o(65663),o(43709);var p=o(61959),g=o(23510);const m={name:"PicVPlayer",components:{VideoPlayer:g.Y7},props:{info:{type:String,required:!1,default:""},video:{type:String,required:!0},src:{type:String,required:!1,default:""},height:{type:Number,required:!1,default:300},width:{type:Number,required:!1,default:600}},computed:{...(0,d.rn)({user_type:e=>e.user.user_type}),color(){const e=[0,1];return e.indexOf(this.user_type)>=0?"bg-pink-4 text-white text-center":"bg-primary text-white text-center"},player(){return this.$refs.videoPlayer.player},computedSize(){const e=this.height/this.width,t=.8*(0,c.hA)(),o=.8*(0,c.Ti)(),i=this.width>t?t:this.width,n=this.height>o?o:this.height,r=Math.floor(i*e),l=Math.floor(n/e),s={height:0,width:0};return r>n?(s.height=n,s.width=l):l>i?(s.height=r,s.width=i):(s.height=r,s.width=l),s},computedCardStyle(){const e=[],t=this.computedSize;for(const o in t)e.push(`${o}: ${"height"===o?t[o]+48:t[o]}px`);return e.join(";")},playerOpts(){return{autoplay:!1,language:"zh",languages:["zh","en"],liveui:!0,controls:!0,html5:{nativeControlsForTouch:!0},playbackRates:[.7,1,1.1,1.2,1.5,2],...this.computedSize,sources:[{src:this.video}],poster:this.src,plugins:{hotkeys:{volumeStep:.1,seekStep:5,enableModifiersForNumbers:!1,fullscreenKey:function(e,t){return 70===e.which||e.ctrlKey&&13===e.which||13===e.which}}}}}},data(){return{playbackRate:1.1}},methods:{playerStateChanged(e){},playerIsReady(e){this.$log.debug("player ready!",e,(0,p.IU)(e),e.target.player)},show(){this.$log.debug("show"),this.$refs.player.show()},hide(){this.$log.debug("hide"),this.$refs.player.hide()},onDialogHide(){this.$log.debug("hide"),this.$emit("hide")},onOKClick(){this.$log.debug("onClick"),this.$emit("ok"),this.hide()},onCancelClick(){this.$log.debug("onCancelClick"),this.hide()}},mounted(){this.$log.debug("mounted",this.$refs.player.$el),this.$refs.player.$el.onkeydown=e=>{switch(this.$log.debug("keydown",e),e.key){case"c":this.playbackRate+=.1;break;case"x":this.playbackRate-=.05;break;case"z":this.playbackRate=1;break}this.playbackRate=+this.playbackRate.toFixed(2)}},unmounted(){this.$log.debug("unmounted")}};var _=o(74260),f=o(46778),b=o(10151),w=o(25589),y=o(7518),k=o.n(y);const $=(0,_.Z)(m,[["render",h],["__scopeId","data-v-2bc79623"]]),v=$;k()(m,"components",{QDialog:f.Z,QCard:b.Z,QCardSection:w.Z});const x={key:0,class:"tool-group",ref:"tools"};function q(e,t,o,n,r,l){const s=(0,i.up)("tool-button");return r.show?((0,i.wg)(),(0,i.iD)("div",x,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(l.toolButtonGroup,(e=>((0,i.wg)(),(0,i.j4)(s,(0,i.dG)({key:e.btnColor},e),null,16)))),128))],512)):(0,i.kq)("",!0)}function C(e,t,o,r,l,s){const a=(0,i.up)("q-tooltip"),d=(0,i.up)("q-btn");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(d,{color:o.btnColor,icon:o.btnIcon,round:o.btnRound,onClick:o.btnOnClick},{default:(0,i.w5)((()=>[0!==o.tooltipMessage.length?((0,i.wg)(),(0,i.j4)(a,{key:0,anchor:o.tooltipAnchor,self:o.tooltipSelf},{default:(0,i.w5)((()=>[(0,i.Uk)((0,n.zw)(o.tooltipMessage),1)])),_:1},8,["anchor","self"])):(0,i.kq)("",!0)])),_:1},8,["color","icon","round","onClick"])])}const N={name:"ToolButton",props:{btnOnClick:{type:Function,required:!0},btnIcon:{type:String,required:!0},btnColor:{type:String,required:!0,default:"primary"},btnRound:{type:Boolean,required:!1,default:!0},tooltipMessage:{type:String,required:!0,default:""},tooltipAnchor:{type:String,required:!1,default:"center left"},tooltipSelf:{type:String,required:!1,default:"center right"}}};var S=o(48240),I=o(5363);const Z=(0,_.Z)(N,[["render",C]]),M=Z;k()(N,"components",{QBtn:S.Z,QTooltip:I.Z});const W={name:"ToolGroup",components:{ToolButton:M},data(){return{show:!0}},computed:{...(0,d.rn)({tool_group_force_right:e=>e.common.tool_group_force_right}),toolButtonGroup(){return[{btnOnClick:this.top,btnIcon:"navigation",btnColor:"primary",tooltipMessage:this.$t("top")},{btnOnClick:this.nextNode,btnIcon:"redo",btnColor:"cyan-5",tooltipMessage:this.$t("next_one")},{btnOnClick:this.loadMore,btnIcon:"replay_10",btnColor:"warning",tooltipMessage:this.$t("loadManual")},{btnOnClick:this.leftDrawer,btnIcon:"open_in_new",btnColor:"pink-3",tooltipMessage:this.$t("open_drawer")},{btnOnClick:this.setting,btnIcon:"settings",btnColor:"secondary",tooltipMessage:this.$t("setting")}]}},methods:{top:function(){this.$log.debug("go top"),this.$bus.emit("btn_click_goto_top")},nextNode:function(){this.$log.debug("nextNode"),this.$bus.emit("btn_click_nextNode")},loadMore:function(){this.$log.debug("loadMore"),this.$bus.emit("btn_click_loadMore")},leftDrawer:function(){this.$log.debug("leftDrawer"),this.$bus.emit("btn_click_leftDrawer")},setting:function(){this.$log.debug("setting"),this.$bus.emit("btn_click_setting")}},mounted(){const e={web:{right:"1.5rem",bottom:"20px"},mobile:{left:"1.5rem",bottom:"60px"}},t=this.$q.platform.is.mobile&&!this.tool_group_force_right?"mobile":"web";for(const o in e[t])this.$refs.tools.style[o]=e[t][o]}},D=(0,_.Z)(W,[["render",q],["__scopeId","data-v-59629fb7"]]),T=D;var z=o(57006);var V=o(88639);V.wU,Boolean,(0,d.rn)({viewerPlayInterval:e=>e.image.viewer_play_interval});var Q=o(70568);let K=null,P=null;const O={name:"PicWaterfall",components:{ToolGroup:T,PicStoreSettings:z.Z,VueWaterfall:Q.p,LazyImg:Q.j},props:{api_url:{type:String,required:!0},storeName:{type:String,required:!0},waterfall_type:{type:String,required:!1,default:"image",validate:e=>"video,image".split(",").indexOf(e)>=0}},data(){return{water_fall:{show:!0,no_more:!1,page:0,img_urls:[]},breakpoints:{1500:{rowPerView:6},1250:{rowPerView:5},1e3:{rowPerView:4},750:{rowPerView:3},500:{rowPerView:2},300:{rowPerView:1}}}},computed:{...(0,d.rn)({node_key:e=>e[K.storeName].node_key,waterfall_col:e=>e[K.storeName].waterfall_col,show_img_title:e=>e[K.storeName].show_img_title,skip_empty_dir:e=>e[K.storeName].skip_empty_dir,waterfall_stride:e=>e[K.storeName].waterfall_stride,title_max_length:e=>e[K.storeName].title_max_length,auto_next:e=>e[K.storeName].auto_next}),reach_bottom_distance(){const e=(0,c.Ti)();return Math.floor(.2*e)},backgroundColor(){return this.$log.debug("dark mode: ",this.$q.dark.isActive),this.$q.dark.isActive?"#121212":"#ffffff"}},watch:{node_key(e){this.$log.debug(`nodeKey updated: ${e}`),this.resetConfig(),this.loadMore(),this.btn_click_goto_top()}},methods:{footerHeight(){return this.show_img_title?18:0},show(){this.$log.debug("show"),this.$log.debug(this.$refs),this.$refs.dialog.show()},hide(){this.$log.debug("hide"),this.$refs.dialog.hide()},onDialogHide(){this.$log.debug("hide"),this.$emit("hide")},imgErrorEvent:function(e){return this.$q.notify({type:"warning",message:this.$t("img_load_error")+"",caption:`${e.src}`})},card_click_event(e,t){switch(this.$log.debug("card_click_event",e,t),this.waterfall_type){case"video":return this.showVideoDialog(t);case"image":default:return this.showImageViewer(t)}},showImageViewer(e){let t=parseInt(e.index)||Math.max(0,this.water_fall.img_urls.indexOf(e));this.$log.debug("showImageViewer",t),this.$viewerApi(this.viewerOpts(t))},showVideoDialog(e){return this.$log.debug("showVideoDialog",e),this.$q.dialog({component:v,parent:this,componentProps:{...e}})},resetConfig(){for(const e in viewer)this.viewer[e]=viewer[e];for(const e in P)this.water_fall[e]=P[e];this.water_fall.no_more=!1},loadMore(){if(this.water_fall.no_more)return this.$q.notify({type:"warn",message:this.$t("no_more_pic")+""}),void(this.auto_next&&(this.$q.notify({type:"positive",message:"auto_next success!!!"}),this.$bus.emit("btn_click_nextNode")));const e={nodeKey:this.node_key,page:this.water_fall.page,page_size:this.waterfall_stride};return this.$axios.post(this.api_url,e).then((t=>(this.$log.debug("req res:",t),t.length<e.page_size&&(this.water_fall.no_more=!0),t))).then((e=>e.map((e=>{let t=e.video?e.video:e.src;t=t.includes("%")?decodeURI(t):t;let o=t.split("/").pop().split(".");return o.pop(),o=o.join(".").slice(0,this.title_max_length),e["info"]=o,e})))).then((e=>e.map((e=>({...e,imgSrc:e.src}))))).then((e=>{this.$log.debug("set waterfall urls",e),this.water_fall.img_urls=this.water_fall.img_urls.concat(e)})).then((()=>this.water_fall.page++)).catch((e=>{this.$q.notify({type:"warn",message:e.message})}))},btn_click_goto_top(){this.$log.debug("waterfall",this.$refs.waterfall.$el),document.querySelector("html").scrollTop=0},btn_click_loadMore(){return this.loadMore()},viewerOpts(e=0){let t={toolbar:!0,keyboard:!0,focus:!0,interval:2e3,url:"src",loop:!1},o={images:this.water_fall.img_urls,options:{...t,initialViewIndex:e}};return o}},beforeCreate(){K=this,this.$log.debug(this.$store.getters)},created(){P=JSON.parse(JSON.stringify(this.water_fall)),this.$bus.on("btn_click_goto_top",this.btn_click_goto_top),this.$bus.on("btn_click_loadMore",this.btn_click_loadMore),this.$bus.on("btn_click_setting",this.show)},mounted(){"video"===this.storeName&&this.$store.dispatch(`${this.storeName}/show_img_title`,!0),this.loadMore()},unmounted(){this.$log.debug("waterfall destroy"),this.$bus.off("btn_click_goto_top",this.btn_click_goto_top),this.$bus.off("btn_click_loadMore",this.btn_click_loadMore),this.$bus.off("btn_click_setting",this.show)}};var U=o(24379);const j=(0,_.Z)(O,[["render",a]]),L=j;k()(O,"components",{QPage:U.Z,QDialog:f.Z})},25893:()=>{}}]);