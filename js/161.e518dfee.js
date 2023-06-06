"use strict";(globalThis["webpackChunkpic_online_front"]=globalThis["webpackChunkpic_online_front"]||[]).push([[161],{83161:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ae});var o=n(83673);const l={class:"q-pt-md"};function a(e,t,n,a,s,r){const i=(0,o.up)("moleculer-status");return(0,o.wg)(),(0,o.iD)("div",l,[(0,o.Wm)(i)])}var s=n(62323);const r=["href"];function i(e,t,n,l,a,i){const c=(0,o.up)("q-tab"),d=(0,o.up)("q-tabs"),u=(0,o.up)("q-separator"),m=(0,o.up)("moleculer-configuration"),p=(0,o.up)("q-tab-panel"),h=(0,o.up)("moleculer-nodes"),b=(0,o.up)("moleculer-services"),g=(0,o.up)("q-tab-panels"),f=(0,o.up)("q-badge"),w=(0,o.up)("q-card-section"),_=(0,o.up)("q-card");return(0,o.wg)(),(0,o.j4)(_,null,{default:(0,o.w5)((()=>[(0,o.Wm)(d,{modelValue:a.selectTab,"onUpdate:modelValue":t[0]||(t[0]=e=>a.selectTab=e),"active-bg-color":"pink-1","active-color":"pink-4",align:"justify",class:"text-teal","indicator-color":"pink-5"},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(a.tabs,(t=>((0,o.wg)(),(0,o.j4)(c,{key:t,label:e.$t(t),name:t},null,8,["label","name"])))),128))])),_:1},8,["modelValue"]),(0,o.Wm)(u),(0,o.Wm)(g,{modelValue:a.selectTab,"onUpdate:modelValue":t[1]||(t[1]=e=>a.selectTab=e),animated:""},{default:(0,o.w5)((()=>[(0,o.Wm)(p,{name:a.tabs[0]},{default:(0,o.w5)((()=>[(0,o.Wm)(m)])),_:1},8,["name"]),(0,o.Wm)(p,{name:a.tabs[1]},{default:(0,o.w5)((()=>[(0,o.Wm)(h)])),_:1},8,["name"]),(0,o.Wm)(p,{name:a.tabs[2]},{default:(0,o.w5)((()=>[(0,o.Wm)(b)])),_:1},8,["name"])])),_:1},8,["modelValue"]),(0,o.Wm)(u),(0,o.Wm)(w,{style:{height:"25px","text-align":"center",padding:"2px"}},{default:(0,o.w5)((()=>[(0,o._)("a",{href:a.authorInfo.repo.url,style:{"text-decoration":"none"},target:"_blank"},[(0,o.Wm)(f,{color:a.badge.color,"text-color":a.badge.text_color,outline:""},{default:(0,o.w5)((()=>[(0,o.Uk)((0,s.zw)(a.authorInfo.repo.url),1)])),_:1},8,["color","text-color"])],8,r)])),_:1})])),_:1})}var c=n(98880);const d={class:"boxes"},u={class:"text-subtitle2 text-center"},m={class:"text-center"},p={class:"text-center"},h={class:"JavaScript"};function b(e,t,n,l,a,r){const i=(0,o.up)("q-card-section"),b=(0,o.up)("q-card"),g=(0,o.up)("q-separator"),f=(0,o.up)("q-btn"),w=(0,o.Q2)("highlightjs");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("div",d,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(Object.keys(r.configure),(t=>((0,o.wg)(),(0,o.j4)(b,{key:t,class:"q-ma-sm bg-secondary text-white"},{default:(0,o.w5)((()=>[(0,o.Wm)(i,null,{default:(0,o.w5)((()=>[(0,o._)("div",u,(0,s.zw)(e.$t(t)),1),(0,o._)("div",m,(0,s.zw)(r.configure[t]),1)])),_:2},1024)])),_:2},1024)))),128))]),(0,o.Wm)(g),(0,o._)("div",p,[(0,o.Wm)(f,{label:e.$t("show_broker_config"),class:"q-ma-sm",onClick:t[0]||(t[0]=e=>a.showBroker=!a.showBroker)},null,8,["label"]),(0,o.wy)((0,o._)("div",null,[(0,o.wy)(((0,o.wg)(),(0,o.iD)("pre",null,[(0,o._)("code",h,(0,s.zw)(a.broker),1)])),[[w]])],512),[[c.F8,a.showBroker]])])])}const g={name:"MoleculerConfiguration",components:{},data(){return{showBroker:!1,loading:!1,broker:null}},computed:{configure(){const e=this.broker;return e?{namespace:e.namespace||"<not set>",transporter:e.transporter||"<no transporter>",serializer:e.serializer||"JSON",strategy:e.registry.strategy||"Round Robin",cacher:e.cacher?"Enabled":"Disabled",logger:e.logger?"Enabled":"Disabled",metrics:e.metrics.enabled?"Enabled":"Disabled",tracing:e.tracing.enabled?"Enabled":"Disabled"}:{}}},methods:{getConfiguration(){this.loading=!0,this.$axios.get("/dev/~node/options").then((e=>this.broker=e)).then((()=>this.loading=!1)).catch((e=>this.$q.notify({type:"error",message:e.message})))}},mounted(){this.$q.dark.isActive?n.e(736).then(n.bind(n,183)):n.e(736).then(n.bind(n,15683)),this.getConfiguration()}};var f=n(74260),w=n(10151),_=n(25589),v=n(65869),k=n(48240),y=n(7518),W=n.n(y);const q=(0,f.Z)(g,[["render",b],["__scopeId","data-v-3a714090"]]),x=q;W()(g,"components",{QCard:w.Z,QCardSection:_.Z,QSeparator:v.Z,QBtn:k.Z});const $={class:"col-2 q-table__title"},Z={class:"full-width row flex-center text-accent q-gutter-sm"};function Q(e,t,n,l,a,r){const i=(0,o.up)("q-space"),c=(0,o.up)("q-icon"),d=(0,o.up)("q-input"),u=(0,o.up)("q-btn"),m=(0,o.up)("q-badge"),p=(0,o.up)("q-td"),h=(0,o.up)("q-table");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(h,{columns:r.getCols,rows:a.nodes,filter:a.filter,loading:a.firstLoad&&a.loading,"no-data-label":e.$t("no_data_label"),"no-results-label":e.$t("no_result_label"),title:e.$t("node_status"),"row-key":"node_id"},{top:(0,o.w5)((n=>[(0,o._)("div",$,(0,s.zw)(e.$t("node_status")),1),(0,o.Wm)(i),(0,o.Wm)(d,{modelValue:a.filter,"onUpdate:modelValue":t[0]||(t[0]=e=>a.filter=e),placeholder:e.$t("search"),borderless:"",debounce:"300",dense:""},{append:(0,o.w5)((()=>[(0,o.Wm)(c,{name:"search"})])),_:1},8,["modelValue","placeholder"]),(0,o.Wm)(u,{class:"q-ml-md",flat:"",icon:"archive","no-caps":"",round:"",onClick:r.exportTable},null,8,["onClick"]),(0,o.Wm)(u,{icon:n.inFullscreen?"fullscreen_exit":"fullscreen",dense:"",flat:"",round:"",onClick:n.toggleFullscreen},null,8,["icon","onClick"])])),"body-cell":(0,o.w5)((e=>[(0,o.Wm)(p,{props:e},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{label:e.value,color:"primary"},null,8,["label"])])),_:2},1032,["props"])])),"no-data":(0,o.w5)((({icon:e,message:t,filter:n})=>[(0,o._)("div",Z,[(0,o.Wm)(c,{name:"sentiment_dissatisfied",size:"2em"}),(0,o._)("span",null,(0,s.zw)(t),1),(0,o.Wm)(c,{name:n?"filter_b_and_w":e,size:"2em"},null,8,["name"])])])),_:1},8,["columns","rows","filter","loading","no-data-label","no-results-label","title"])])}n(65663);var j=n(12841);function C(e,t){let n=void 0!==t?t(e):e;return n=void 0===n||null===n?"":String(n),n=n.split('"').join('""'),`"${n}"`}const T={name:"MoleculerNodes",components:{},data(){return{firstLoad:!0,loading:!1,timer:null,filter:"",nodes:[]}},computed:{getCols(){const e=this.nodes;if(e.length<1)return[];const t=e[0],n=[];for(const o in t)n.push({name:o,align:"left",field:o,sortable:!0,format:e=>`${e}`,label:this.$t(o).toUpperCase()});return n}},methods:{getNodes(){return this.loading=!0,this.$axios.get("/dev/~node/list").then((e=>e.map((e=>({node_id:e.id,type:e.client.type,version:e.client.version,ip:e.ipList[0],hostname:e.hostname,status:e.available,cpu:e.cpu}))))).then((e=>this.nodes=e)).then((()=>{this.firstLoad=!1,this.loading=!1})).catch((e=>this.$q.notify({type:"error",message:e.message})))},exportTable(){const e=[this.cols.map((e=>C(e.label)))].concat(this.data.map((e=>this.cols.map((t=>C("function"===typeof t.field?t.field(e):e[void 0===t.field?t.name:t.field],t.format))).join(",")))).join("\r\n"),t=(0,j.Z)("table-export.csv",e,"text/csv");!0!==t&&this.$q.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})}},mounted(){this.getNodes()}};var S=n(54993),z=n(62025),D=n(34842),I=n(24554),A=n(83884),B=n(69721);const U=(0,f.Z)(T,[["render",Q]]),V=U;W()(T,"components",{QTable:S.Z,QSpace:z.Z,QInput:D.Z,QIcon:I.Z,QBtn:k.Z,QTd:A.Z,QBadge:B.Z});const E={class:"col-2 q-table__title"},M={class:"full-width row flex-center text-accent q-gutter-sm"};function F(e,t,n,l,a,r){const i=(0,o.up)("q-space"),d=(0,o.up)("q-icon"),u=(0,o.up)("q-input"),m=(0,o.up)("q-btn"),p=(0,o.up)("q-th"),h=(0,o.up)("q-tr"),b=(0,o.up)("q-td"),g=(0,o.up)("q-badge"),f=(0,o.up)("q-table");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(f,{columns:r.columns,data:a.service,expanded:a.expanded,"onUpdate:expanded":t[1]||(t[1]=e=>a.expanded=e),title:e.$t("service_action"),filter:a.filter,"hide-bottom":a.table.hide_bottom,"no-data-label":e.$t("no_data_label"),"no-results-label":e.$t("no_result_label"),flat:"","row-key":"service_action"},{top:(0,o.w5)((n=>[(0,o._)("div",E,(0,s.zw)(e.$t("service_action")),1),(0,o.Wm)(i),(0,o.Wm)(u,{modelValue:a.filter,"onUpdate:modelValue":t[0]||(t[0]=e=>a.filter=e),placeholder:e.$t("search"),borderless:"",debounce:"300",dense:""},{append:(0,o.w5)((()=>[(0,o.Wm)(d,{name:"search"})])),_:1},8,["modelValue","placeholder"]),(0,o.Wm)(m,{class:"q-ml-md",flat:"",icon:"archive","no-caps":"",round:"",onClick:r.exportTable},null,8,["onClick"]),(0,o.Wm)(m,{icon:n.inFullscreen?"fullscreen_exit":"fullscreen",dense:"",flat:"",round:"",onClick:n.toggleFullscreen},null,8,["icon","onClick"])])),header:(0,o.w5)((e=>[(0,o.Wm)(h,{props:e},{default:(0,o.w5)((()=>[(0,o.Wm)(p,{"auto-width":""}),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.cols,(t=>((0,o.wg)(),(0,o.j4)(p,{key:t.name,props:e},{default:(0,o.w5)((()=>[(0,o.Uk)((0,s.zw)(t.label),1)])),_:2},1032,["props"])))),128))])),_:2},1032,["props"])])),body:(0,o.w5)((t=>[((0,o.wg)(),(0,o.j4)(h,{key:t.row.service_action,props:t},{default:(0,o.w5)((()=>[(0,o.Wm)(b,{"auto-width":""},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{icon:t.expand?"remove":"add",color:"accent",dense:"",round:"",size:"sm",onClick:e=>t.expand=!t.expand},null,8,["icon","onClick"])])),_:2},1024),(0,o.Wm)(b,{key:"service_action",props:t},{default:(0,o.w5)((()=>[(0,o.Wm)(g,{label:t.row.service_action,color:"accent"},null,8,["label"]),t.row.version?((0,o.wg)(),(0,o.j4)(g,{key:0,label:t.row.version},null,8,["label"])):(0,o.kq)("",!0)])),_:2},1032,["props"]),(0,o.Wm)(b,{key:"rest",props:t},{default:(0,o.w5)((()=>[(0,o.Wm)(g,{label:t.row.rest,color:"brown"},null,8,["label"])])),_:2},1032,["props"]),(0,o.Wm)(b,{key:"parameters",props:t},{default:(0,o.w5)((()=>[t.row.parameters?((0,o.wg)(),(0,o.j4)(g,{key:0,label:t.row.parameters,color:"blue-grey"},null,8,["label"])):(0,o.kq)("",!0)])),_:2},1032,["props"]),(0,o.Wm)(b,{key:"instances",props:t},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.row.instance,(e=>((0,o.wg)(),(0,o.j4)(g,{key:e,label:e,color:"primary"},null,8,["label"])))),128))])),_:2},1032,["props"]),(0,o.Wm)(b,{key:"status",props:t},{default:(0,o.w5)((()=>[t.row.status?((0,o.wg)(),(0,o.j4)(g,{key:0,label:e.$t("online"),color:"green"},null,8,["label"])):((0,o.wg)(),(0,o.j4)(g,{key:1,label:e.$t("offline"),color:"red"},null,8,["label"]))])),_:2},1032,["props"])])),_:2},1032,["props"])),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.getServiceActions(t.row.service_action),(n=>(0,o.wy)(((0,o.wg)(),(0,o.j4)(h,{key:n.name,props:t},{default:(0,o.w5)((()=>[(0,o.Wm)(b,{"auto-width":""}),(0,o.Wm)(b,{key:"service_action"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,s.zw)(n.name)+" ",1),n.action.cache?((0,o.wg)(),(0,o.j4)(g,{key:0,label:e.$t("cached"),color:"orange"},null,8,["label"])):(0,o.kq)("",!0)])),_:2},1024),(0,o.Wm)(b,{key:"rest"},{default:(0,o.w5)((()=>[r.getActionRest(n,t.row).method?((0,o.wg)(),(0,o.j4)(g,{key:0,label:r.getActionRest(n,t.row).method,color:"indigo"},null,8,["label"])):(0,o.kq)("",!0),(0,o.Uk)(" "+(0,s.zw)(r.getActionRest(n,t.row).url),1)])),_:2},1024),(0,o.Wm)(b,{key:"parameters"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,s.zw)(r.getActionParams(n,40)),1)])),_:2},1024),(0,o.Wm)(b,{key:"instances"}),(0,o.Wm)(b,{key:"status"},{default:(0,o.w5)((()=>[n.available?((0,o.wg)(),(0,o.j4)(g,{key:0,label:e.$t("online"),color:"green"},null,8,["label"])):((0,o.wg)(),(0,o.j4)(g,{key:1,label:e.$t("offline"),color:"red"},null,8,["label"]))])),_:2},1024)])),_:2},1032,["props"])),[[c.F8,t.expand]]))),128))])),"no-data":(0,o.w5)((({icon:e,message:t,filter:n})=>[(0,o._)("div",M,[(0,o.Wm)(d,{name:"sentiment_dissatisfied",size:"2em"}),(0,o._)("span",null,(0,s.zw)(t),1),(0,o.Wm)(d,{name:n?"filter_b_and_w":e,size:"2em"},null,8,["name"])])])),_:1},8,["columns","data","expanded","title","filter","hide-bottom","no-data-label","no-results-label"])])}function N(e,t){let n=void 0!==t?t(e):e;return n=void 0===n||null===n?"":String(n),n=n.split('"').join('""'),`"${n}"`}const P={name:"MoleculerServices",data(){return{table:{hide_bottom:!1},timer:null,filter:"",expanded:[],service:[],actions:{}}},computed:{computedExpanded(){return this.service.map((e=>e.service_action))},columns(){const e="service_action,rest,parameters,instances,status".split(",");return e.map((e=>({name:e,align:"left",field:e,sortable:!0,format:e=>`${e}`,label:this.$t(e).toUpperCase()})))}},methods:{getActions(){return this.$axios.get("/dev/~node/actions").then((e=>e.filter((e=>!e.name.startsWith("$"))))).then((e=>(e.sort(((e,t)=>e.name.localeCompare(t.name))),e.reduce(((e,t)=>(e[t.name]=t,e)),{})))).then((e=>this.actions=e)).catch((e=>this.$q.notify({type:"error",message:e.message})))},getService(){return this.$axios.get("/dev/~node/services").then((e=>e.filter((e=>!e.name.startsWith("$"))))).then((e=>(e.sort(((e,t)=>e.name.localeCompare(t.name))),e.forEach((e=>e.nodes.sort())),e))).then((e=>e.map((e=>({service_action:e.name,version:e.version,rest:e.settings.rest?e.settings.rest:`/${e.fullName}`,parameters:void 0,instance:e.nodes,status:e.nodes.length>0}))))).then((e=>this.service=e)).catch((e=>this.$q.notify({type:"error",message:e.message})))},getServiceActions(e){return Object.keys(this.actions).filter((t=>t.startsWith(`${e}.`))).map((e=>this.actions[e]))},getActionRest(e,t="test"){const n={method:"",url:""};if(e.action.rest){if("string"==typeof e.action.rest){const t=e.action.rest.split(" ");t.length>1?(n.method=t[0],n.url=t[1]):(n.method="*",n.url=t[0])}else n.method=e.action.rest.method||"*",n.url=e.action.rest.path;n.url=t.rest+n.url}return n},getActionParams(e,t){if(e.action&&e.action.params){const n=Object.keys(e.action.params).join(", ");return n.length>t?n.substr(0,t)+"…":n}return""},exportTable(){const e=[this.cols.map((e=>N(e.label)))].concat(this.data.map((e=>this.cols.map((t=>N("function"===typeof t.field?t.field(e):e[void 0===t.field?t.name:t.field],t.format))).join(",")))).join("\r\n"),t=(0,j.Z)("table-export.csv",e,"text/csv");!0!==t&&this.$q.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})}},mounted(){this.getActions().then((e=>this.getService())).then((()=>this.expanded=this.computedExpanded)).then((()=>this.timer=setInterval((()=>{this.getActions().then((e=>this.getService()))}),3e3))).then((()=>this.$bus.once("hook:beforeDestroy",(e=>clearInterval(this.timer)))))}};var R=n(18186),H=n(92414);const K=(0,f.Z)(P,[["render",F]]),O=K;W()(P,"components",{QTable:S.Z,QSpace:z.Z,QInput:D.Z,QIcon:I.Z,QBtn:k.Z,QTr:R.Z,QTh:H.Z,QTd:A.Z,QBadge:B.Z});const Y="configure,nodes,services".split(","),L={name:"index",components:{MoleculerServices:O,MoleculerNodes:V,MoleculerConfiguration:x},data(){return{authorInfo:{repo:{name:"Pic Online",url:"https://github.com/iitii/pic_online",author:"Github@IITII"}},badge:{color:"pink",text_color:"white"},tabs:Y,selectTab:Y[0]}}};var J=n(57547),G=n(3269),X=n(5906),ee=n(86602);const te=(0,f.Z)(L,[["render",i],["__scopeId","data-v-21d83a05"]]),ne=te;W()(L,"components",{QCard:w.Z,QTabs:J.Z,QTab:G.Z,QSeparator:v.Z,QTabPanels:X.Z,QTabPanel:ee.Z,QCardSection:_.Z,QBadge:B.Z});const oe={name:"PicServerStatus",components:{MoleculerStatus:ne}},le=(0,f.Z)(oe,[["render",a]]),ae=le}}]);