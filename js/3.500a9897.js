(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"17bf":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-layout",{staticClass:"full-height-width",attrs:{view:"lhh lpr lfr"}},[n("pic-header"),n("pic-drawer"),n("q-page-container",{staticClass:"full-height-width"},[n("router-view")],1)],1)},r=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("q-header",{attrs:{elevated:"","show-if-above":""}},[n("q-toolbar",[n("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:e.leftDrawer}}),n("q-toolbar-title",[e._v("\n        "+e._s(e.selectNodeTitle)+"\n      ")]),n("pic-language-picker")],1)],1)],1)},s=[],i=n("ded3"),l=n.n(i),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("q-select",{attrs:{options:e.langOptions,color:"pink",dark:!0,"options-dark":!1,"dropdown-icon":"translate",dense:"","options-dense":!1,borderless:"","emit-value":"","map-options":""},model:{value:e.lang,callback:function(t){e.lang=t},expression:"lang"}})],1)},c=[],u={name:"PicLanguagePicker",data(){return{langOptions:[{value:"en-us",label:"English"},{value:"zh-cn",label:"简体中文"}]}},computed:{lang:{get:function(){return this.$log.debug("Get language setting"),this.$store.getters["uiControl/language"]||this.$q.lang.getLocale()||"zh-cn"},set:function(e){this.$log.debug(`Set language to ${e}`),this.$i18n.locale=e,this.$store.dispatch("uiControl/setLanguage",e)}}},beforeMount(){this.$i18n.locale=this.lang}},h=u,f=n("2877"),g=n("ddd8"),p=n("eebe"),b=n.n(p),$=Object(f["a"])(h,d,c,!1,null,"ff0507a2",null),v=$.exports;b()($,"components",{QSelect:g["a"]});var _=n("2f62"),x={name:"PicHeader",components:{PicLanguagePicker:v},methods:{leftDrawer:function(){this.$store.dispatch("uiControl/reverseLeftDrawerOpen")}},computed:l()({},Object(_["b"])({selectNodeTitle:e=>e.uiControl.selectedNodeTitle}))},m=x,w=n("e359"),y=n("65c6"),N=n("9c40"),k=n("6ac5"),q=Object(f["a"])(m,a,s,!1,null,"8d1ee7a2",null),C=q.exports;b()(q,"components",{QHeader:w["a"],QToolbar:y["a"],QBtn:N["a"],QToolbarTitle:k["a"]});var S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("q-drawer",{attrs:{"show-if-above":"",elevated:"","content-class":"bg-grey-1"},model:{value:e.leftDrawerSync,callback:function(t){e.leftDrawerSync=t},expression:"leftDrawerSync"}},[n("div",{staticClass:"q-pa-md q-gutter-sm"},[n("div",{staticStyle:{"text-align":"center"}},[n("q-badge",{attrs:{color:e.badge.color,"text-color":e.badge.text_color}},[e._v("\n          "+e._s(e.selectNodeTitle)+"\n        ")])],1),n("div",[n("q-input",{ref:"filter",attrs:{filled:"",label:e.$t("filter")},scopedSlots:e._u([{key:"append",fn:function(){return[""!==e.tree.filter?n("q-icon",{staticClass:"cursor-pointer",attrs:{name:"clear"},on:{click:e.resetFilter}}):e._e()]},proxy:!0}]),model:{value:e.tree.filter,callback:function(t){e.$set(e.tree,"filter",t)},expression:"tree.filter"}})],1),n("div",[n("q-tree",{ref:"qtree",attrs:{nodes:e.tree.nodes,"node-key":"nodeKey",dark:e.tree.dark,filter:e.tree.filter,expanded:e.tree.expanded,selected:e.tree.selectedNodeSync},on:{"update:expanded":function(t){return e.$set(e.tree,"expanded",t)},"update:selected":[function(t){return e.$set(e.tree,"selectedNodeSync",t)},e.update_selected]},scopedSlots:e._u([{key:"header-root",fn:function(t){return[n("div",{staticClass:"row items-center"},[e._v("\n              "+e._s(t.node.label)+"\n              "),t.node.children.length>0?n("q-badge",{staticClass:"q-ml-sm",attrs:{color:e.badge.color,"text-color":e.badge.text_color}},[e._v("\n                "+e._s(t.node.children.length)+"\n              ")]):e._e(),n("q-badge",{staticClass:"q-ml-sm",attrs:{"text-color":e.badge.text_color,color:"warning"}},[e._v("\n                "+e._s(t.node.fileCount)+"\n              ")])],1)]}}])})],1)])])],1)},E=[],T={name:"PicDrawer",data(){return{leftDrawerOpen:!1,tree:{filter:"",nodes:[],expanded:[],selectedNodeSync:"",dark:!1},badge:{color:"primary",text_color:"white"}}},computed:{leftDrawerSync:{get:function(){return this.$store.getters["uiControl/leftDrawerOpen"]},set:function(){return this.$store.dispatch("uiControl/reverseLeftDrawerOpen")}},selectNodeTitle:{get:function(){return this.$store.getters["uiControl/selectedNodeTitle"]},set:function(e){if(this.$log.debug(e),null!==e||""!==e)return this.$store.dispatch("uiControl/setSelectedNodeTitle",e)}}},methods:{updateExpandedNodeByNodesBfs:function(e,t=16){let n=[],o=[],r=[],a=[],s=0;n=n.concat(e);while(0!==n.length){const e=n.shift();if(a.push(e.nodeKey),void 0!==e.children){if(0!==e.children.length&&(o=o.concat(e.children),s+=e.children.length),r.length+s>=t){if(0===r.length)continue;break}r=r.concat(a),a=[]}0===n.length&&(n=n.concat(o),o=[])}return r},updateExpandedNodeByNodes:function(e,t){let n=[];return t<1?[]:(e.forEach((e=>{void 0!==e.nodeKey&&n.push(e.nodeKey),void 0!==e.children&&0!==e.children.length&&(n=n.concat(this.updateExpandedNodeByNodes(e.children,t-1)))})),n)},resetFilter:function(){this.tree.filter="",this.$refs.filter.focus()},expandNode:function(e){this.$log.debug(e)},beforeunloadFn:function(e){this.$log.debug(`before unload function ${e}`)},btn_click_nextNode:function(){const e=this.$store.getters["uiControl/nodeKey"];this.update_selected(e+1)},update_selected:function(e){if(this.$log.debug(e),this.$log.debug(null===e),null!==e){this.$store.dispatch("uiControl/setNodeKey",e);const t=this.$refs.qtree.getNodeByKey(e);this.$store.dispatch("uiControl/setSelectedNodeTitle",t.label)}}},created(){window.addEventListener("beforeunload",(e=>this.beforeunloadFn(e))),this.$bus.$on("btn_click_nextNode",this.btn_click_nextNode)},destroyed(){window.removeEventListener("beforeunload",(e=>this.beforeunloadFn(e))),this.$bus.$off("btn_click_nextNode",this.btn_click_nextNode)},beforeMount(){},mounted(){const e=this.$store.getters["apiSetting/treeUrl"],t=this.$store.getters["apiSetting/treeMethod"];let n=null;switch(t){case"GET":n=this.$axios.get(e);break;case"POST":n=this.$axios.post(e);break;default:n=this.$axios.get(e);break}n.then((e=>(this.$log.debug(`Tree Res: ${JSON.stringify({status:e.status,data:e.data})}`),this.tree.expanded=this.updateExpandedNodeByNodesBfs(this.tree.nodes),this.tree.nodes=e.data,e.data))).then((e=>{this.$log.debug(`expandedNodes: ${this.updateExpandedNodeByNodesBfs(e)}`),this.tree.expanded=this.updateExpandedNodeByNodesBfs(e),this.update_selected(this.$store.getters["uiControl/nodeKey"])})).catch((e=>{this.$q.notify({message:this.$t("connection_fail"),caption:`${e.message}`,type:"negative"})}))}},B=T,D=n("9404"),O=n("58a81"),Q=n("27f9"),L=n("0016"),P=n("7f41"),K=Object(f["a"])(B,S,E,!1,null,"ab1b2a0e",null),j=K.exports;b()(K,"components",{QDrawer:D["a"],QBadge:O["a"],QInput:Q["a"],QIcon:L["a"],QTree:P["a"]});var F={name:"MainLayout",components:{PicDrawer:j,PicHeader:C}},M=F,H=n("4d5a"),J=n("09e3"),z=Object(f["a"])(M,o,r,!1,null,null,null);t["default"]=z.exports;b()(z,"components",{QLayout:H["a"],QPageContainer:J["a"]})}}]);