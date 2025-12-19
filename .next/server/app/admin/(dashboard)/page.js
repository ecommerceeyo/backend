(()=>{var e={};e.id=2145,e.ids=[2145],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},77048:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>h,pages:()=>c,routeModule:()=>u,tree:()=>o});var s=a(7),r=a(8533),d=a(29377),n=a.n(d),i=a(29799),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);a.d(t,l);let o=["",{children:["admin",{children:["(dashboard)",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,56925)),"/home/wilsonjunior/ecommerce-app/frontend/src/app/admin/(dashboard)/page.tsx"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,340)),"/home/wilsonjunior/ecommerce-app/frontend/src/app/admin/(dashboard)/layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,95667)),"/home/wilsonjunior/ecommerce-app/frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,73472,23)),"next/dist/client/components/not-found-error"]}],c=["/home/wilsonjunior/ecommerce-app/frontend/src/app/admin/(dashboard)/page.tsx"],h="/admin/(dashboard)/page",p={require:a,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/admin/(dashboard)/page",pathname:"/admin",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},11652:(e,t,a)=>{Promise.resolve().then(a.bind(a,28970))},28970:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>y});var s=a(54714),r=a(77580),d=a(72264),n=a(33696),i=a(14089),l=a(80620),o=a(20537);/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,o.Z)("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]),h=(0,o.Z)("ArrowDownRight",[["path",{d:"m7 7 10 10",key:"1fmybs"}],["path",{d:"M17 7v10H7",key:"6fjiku"}]]);var p=a(83446),u=a(1715),m=a(57082),x=a(35178);function y(){let[e,t]=(0,r.useState)(null),[a,o]=(0,r.useState)(!0);(0,r.useEffect)(()=>{(async()=>{try{let e=await m.Nq.getDashboard();e.success&&e.data&&t(e.data)}catch(e){console.error("Failed to fetch dashboard stats:",e)}finally{o(!1)}})()},[]);let y=[{title:"Total Revenue",value:e?`GHS ${e.totalRevenue.toLocaleString()}`:"-",icon:d.Z,change:"+12.5%",changeType:"positive"},{title:"Total Orders",value:e?.totalOrders??"-",icon:n.Z,change:"+8.2%",changeType:"positive"},{title:"Total Products",value:e?.totalProducts??"-",icon:i.Z,change:"+2",changeType:"positive"},{title:"Pending Orders",value:e?.pendingOrders??"-",icon:l.Z,change:"-3",changeType:"negative"}];return(0,s.jsxs)("div",{className:"flex flex-col",children:[s.jsx(u.P,{title:"Dashboard"}),(0,s.jsxs)("div",{className:"p-6",children:[s.jsx("div",{className:"grid gap-4 md:grid-cols-2 lg:grid-cols-4",children:y.map(e=>(0,s.jsxs)(p.Zb,{children:[(0,s.jsxs)(p.Ol,{className:"flex flex-row items-center justify-between pb-2",children:[s.jsx(p.ll,{className:"text-sm font-medium text-muted-foreground",children:e.title}),s.jsx(e.icon,{className:"h-4 w-4 text-muted-foreground"})]}),(0,s.jsxs)(p.aY,{children:[s.jsx("div",{className:"text-2xl font-bold",children:a?s.jsx("div",{className:"h-8 w-24 animate-pulse rounded bg-muted"}):e.value}),(0,s.jsxs)("div",{className:"flex items-center text-xs",children:["positive"===e.changeType?s.jsx(c,{className:"mr-1 h-3 w-3 text-green-500"}):s.jsx(h,{className:"mr-1 h-3 w-3 text-red-500"}),s.jsx("span",{className:(0,x.cn)("positive"===e.changeType?"text-green-500":"text-red-500"),children:e.change}),s.jsx("span",{className:"ml-1 text-muted-foreground",children:"from last month"})]})]})]},e.title))}),(0,s.jsxs)(p.Zb,{className:"mt-6",children:[s.jsx(p.Ol,{children:s.jsx(p.ll,{children:"Recent Orders"})}),s.jsx(p.aY,{children:a?s.jsx("div",{className:"space-y-3",children:[void 0,void 0,void 0,void 0,void 0].map((e,t)=>s.jsx("div",{className:"h-12 animate-pulse rounded bg-muted"},t))}):e?.recentOrders&&e.recentOrders.length>0?s.jsx("div",{className:"space-y-4",children:e.recentOrders.map(e=>(0,s.jsxs)("div",{className:"flex items-center justify-between rounded-lg border p-4",children:[(0,s.jsxs)("div",{children:[s.jsx("p",{className:"font-medium",children:e.orderNumber}),s.jsx("p",{className:"text-sm text-muted-foreground",children:e.customer})]}),(0,s.jsxs)("div",{className:"text-right",children:[(0,s.jsxs)("p",{className:"font-medium",children:["GHS ",e.total.toLocaleString()]}),s.jsx("p",{className:(0,x.cn)("text-sm capitalize","delivered"===e.status&&"text-green-500","pending"===e.status&&"text-yellow-500","shipped"===e.status&&"text-blue-500"),children:e.status})]})]},e.id))}):s.jsx("p",{className:"text-center text-muted-foreground",children:"No recent orders"})})]})]})]})}},83446:(e,t,a)=>{"use strict";a.d(t,{Ol:()=>i,SZ:()=>o,Zb:()=>n,aY:()=>c,eW:()=>h,ll:()=>l});var s=a(54714),r=a(77580),d=a(35178);let n=r.forwardRef(({className:e,...t},a)=>s.jsx("div",{ref:a,className:(0,d.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...t}));n.displayName="Card";let i=r.forwardRef(({className:e,...t},a)=>s.jsx("div",{ref:a,className:(0,d.cn)("flex flex-col space-y-1.5 p-6",e),...t}));i.displayName="CardHeader";let l=r.forwardRef(({className:e,...t},a)=>s.jsx("h3",{ref:a,className:(0,d.cn)("text-2xl font-semibold leading-none tracking-tight",e),...t}));l.displayName="CardTitle";let o=r.forwardRef(({className:e,...t},a)=>s.jsx("p",{ref:a,className:(0,d.cn)("text-sm text-muted-foreground",e),...t}));o.displayName="CardDescription";let c=r.forwardRef(({className:e,...t},a)=>s.jsx("div",{ref:a,className:(0,d.cn)("p-6 pt-0",e),...t}));c.displayName="CardContent";let h=r.forwardRef(({className:e,...t},a)=>s.jsx("div",{ref:a,className:(0,d.cn)("flex items-center p-6 pt-0",e),...t}));h.displayName="CardFooter"},4613:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]])},10137:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]])},68109:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]])},45823:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]])},72264:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]])},47787:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("FolderTree",[["path",{d:"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"hod4my"}],["path",{d:"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"w4yl2u"}],["path",{d:"M3 5a2 2 0 0 0 2 2h3",key:"f2jnh7"}],["path",{d:"M3 3v13a2 2 0 0 0 2 2h3",key:"k8epm1"}]])},38553:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]])},44758:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("ListChecks",[["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}]])},3682:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},66164:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},80620:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]])},96156:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])},18510:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(20537).Z)("Warehouse",[["path",{d:"M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z",key:"gksnxg"}],["path",{d:"M6 18h12",key:"9pbo8z"}],["path",{d:"M6 14h12",key:"4cwo0f"}],["rect",{width:"12",height:"12",x:"6",y:"10",key:"apd30q"}]])},57801:(e,t,a)=>{"use strict";var s=a(87482);a.o(s,"useParams")&&a.d(t,{useParams:function(){return s.useParams}}),a.o(s,"usePathname")&&a.d(t,{usePathname:function(){return s.usePathname}}),a.o(s,"useRouter")&&a.d(t,{useRouter:function(){return s.useRouter}}),a.o(s,"useSearchParams")&&a.d(t,{useSearchParams:function(){return s.useSearchParams}})},56925:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>d,__esModule:()=>r,default:()=>n});let s=(0,a(71481).createProxy)(String.raw`/home/wilsonjunior/ecommerce-app/frontend/src/app/admin/(dashboard)/page.tsx`),{__esModule:r,$$typeof:d}=s,n=s.default}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[3499,6075,5303,9872,6710,9236,873,3206],()=>a(77048));module.exports=s})();