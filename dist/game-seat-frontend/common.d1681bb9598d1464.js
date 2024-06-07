"use strict";(self.webpackChunkgameseat_frontend=self.webpackChunkgameseat_frontend||[]).push([[76],{3599:(x,C,n)=>{n.d(C,{l:()=>p});var s=n(4412),_=n(1626),b=n(3587),r=n(4438);let p=(()=>{class u{constructor(g){this.http=g,this.selectedChairSource=new s.t(null),this.selectedChair$=this.selectedChairSource.asObservable()}getChairs(){return this.http.get(`${b.c.api_url}chairs`)}selectChair(g){this.selectedChairSource.next(g)}getReservedChairs(){this.http.get(`${b.c.api_url}`)}updateChairStatus(g,a){return this.http.put(b.c.api_url,{Ids:g,IsMaintenance:a},{headers:new _.Lr({"Content-Type":"application/json"})})}static#t=this.\u0275fac=function(a){return new(a||u)(r.KVO(_.Qq))};static#e=this.\u0275prov=r.jDH({token:u,factory:u.\u0275fac,providedIn:"root"})}return u})()},8160:(x,C,n)=>{n.d(C,{E:()=>u});var s=n(1626),_=n(3587),b=n(9437),r=n(8810),p=n(4438);let u=(()=>{class M{constructor(a){this.http=a}getAllReservation(){return this.http.get(`${_.c.api_url}reservations`)}getReservationsByDate(a,m,l){if(!a)throw new Error("Invalid date provided");const P=a.getFullYear()+"-"+("0"+(a.getMonth()+1)).slice(-2)+"-"+("0"+a.getDate()).slice(-2),d=(new s.Nl).set("date",P).set("startTime",m).set("endTime",l);return this.http.get(`${_.c.api_url}reservations/date/`,{params:d}).pipe((0,b.W)(c=>c.includes("chair.reserved")?(0,r.$)(()=>new Error("chair.reserved")):(0,r.$)(()=>new Error("An unexpected error occurred"))))}createReservation(a){return this.http.post(`${_.c.api_url}reservations`,a)}getReservationByUserId(a){return this.http.get(`${_.c.api_url}reservations/by/${a}`)}cancelReservation(a,m){return this.http.post(`${_.c.api_url}reservations/cancel-or-confirm/${a}`,m,{observe:"body"})}static#t=this.\u0275fac=function(m){return new(m||M)(p.KVO(s.Qq))};static#e=this.\u0275prov=p.jDH({token:M,factory:M.\u0275fac,providedIn:"root"})}return M})()},7044:(x,C,n)=>{n.d(C,{H:()=>M});var s=n(8834),_=n(9213),b=n(5911),r=n(4438),p=n(9012),u=n(3955);let M=(()=>{class g{constructor(m,l){this._router=m,this.translate=l,this.currentLanguage="es",l.setDefaultLang(this.currentLanguage)}navigateToLogin(){this._router.navigateByUrl("/login")}navigateToHome(){this._router.navigateByUrl("/home")}toggleLanguage(){this.currentLanguage="en"===this.currentLanguage?"es":"en",this.translate.use(this.currentLanguage)}static#t=this.\u0275fac=function(l){return new(l||g)(r.rXU(p.Ix),r.rXU(u.c$))};static#e=this.\u0275cmp=r.VBU({type:g,selectors:[["app-toolbar"]],standalone:!0,features:[r.aNF],decls:12,vars:0,consts:[[1,"titulos"],["mat-icon-button","",3,"click"],[1,"buttons"]],template:function(l,P){1&l&&(r.j41(0,"mat-toolbar")(1,"div",0)(2,"button",1),r.bIt("click",function(){return P.navigateToHome()}),r.j41(3,"mat-icon"),r.EFF(4,"home"),r.k0s()()(),r.j41(5,"div",2)(6,"button",1),r.bIt("click",function(){return P.toggleLanguage()}),r.j41(7,"mat-icon"),r.EFF(8,"translate"),r.k0s()(),r.j41(9,"button",1),r.bIt("click",function(){return P.navigateToLogin()}),r.j41(10,"mat-icon"),r.EFF(11,"login"),r.k0s()()()())},dependencies:[_.An,b.KQ,s.Hl,s.iY],styles:['@charset "UTF-8";.mat-toolbar-row[_ngcontent-%COMP%], .mat-toolbar-single-row[_ngcontent-%COMP%]{display:flex!important;justify-content:space-between}mat-toolbar[_ngcontent-%COMP%]{background:#00000080}mat-toolbar[_ngcontent-%COMP%] > a[_ngcontent-%COMP%], mat-toolbar[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{background:transparent;color:#fff}a[_ngcontent-%COMP%]{text-decoration:none!important}.titulos[_ngcontent-%COMP%], .buttons[_ngcontent-%COMP%]{display:flex;color:#fff;justify-content:space-between}.titulos[_ngcontent-%COMP%] > h4[_ngcontent-%COMP%]{margin:10px}button.mat-icon-button[_ngcontent-%COMP%]{margin-right:8px}.mat-icon-button[_ngcontent-%COMP%]{border-radius:50%;width:48px;height:48px;line-height:48px;transition:background-color .3s,transform .3s}.mat-icon[_ngcontent-%COMP%]{font-size:26px;border:none}']})}return g})()},5024:(x,C,n)=>{n.d(C,{CB:()=>d,DQ:()=>P,Q3:()=>a,qS:()=>u,sL:()=>m,xn:()=>l,y4:()=>M,zP:()=>v});var s=n(17),r=(n(4402),n(7673),n(1413)),p=n(4438);class u{}function M(i){return i&&"function"==typeof i.connect&&!(i instanceof s.G)}var a=function(i){return i[i.REPLACED=0]="REPLACED",i[i.INSERTED=1]="INSERTED",i[i.MOVED=2]="MOVED",i[i.REMOVED=3]="REMOVED",i}(a||{});const m=new p.nKC("_ViewRepeater");class l{applyChanges(t,e,o,f,h){t.forEachOperation((E,y,O)=>{let D,T;if(null==E.previousIndex){const w=o(E,y,O);D=e.createEmbeddedView(w.templateRef,w.context,w.index),T=a.INSERTED}else null==O?(e.remove(y),T=a.REMOVED):(D=e.get(y),e.move(D,O),T=a.MOVED);h&&h({context:D?.context,operation:T,record:E})})}detach(){}}class P{constructor(){this.viewCacheSize=20,this._viewCache=[]}applyChanges(t,e,o,f,h){t.forEachOperation((E,y,O)=>{let D,T;null==E.previousIndex?(D=this._insertView(()=>o(E,y,O),O,e,f(E)),T=D?a.INSERTED:a.REPLACED):null==O?(this._detachAndCacheView(y,e),T=a.REMOVED):(D=this._moveView(y,O,e,f(E)),T=a.MOVED),h&&h({context:D?.context,operation:T,record:E})})}detach(){for(const t of this._viewCache)t.destroy();this._viewCache=[]}_insertView(t,e,o,f){const h=this._insertViewFromCache(e,o);if(h)return void(h.context.$implicit=f);const E=t();return o.createEmbeddedView(E.templateRef,E.context,E.index)}_detachAndCacheView(t,e){const o=e.detach(t);this._maybeCacheView(o,e)}_moveView(t,e,o,f){const h=o.get(t);return o.move(h,e),h.context.$implicit=f,h}_maybeCacheView(t,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(t);else{const o=e.indexOf(t);-1===o?t.destroy():e.remove(o)}}_insertViewFromCache(t,e){const o=this._viewCache.pop();return o&&e.insert(o,t),o||null}}class d{get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}constructor(t=!1,e,o=!0,f){this._multiple=t,this._emitChanges=o,this.compareWith=f,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new r.B,e&&e.length&&(t?e.forEach(h=>this._markSelected(h)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...t){this._verifyValueAssignment(t),t.forEach(o=>this._markSelected(o));const e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...t){this._verifyValueAssignment(t),t.forEach(o=>this._unmarkSelected(o));const e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...t){this._verifyValueAssignment(t);const e=this.selected,o=new Set(t);t.forEach(h=>this._markSelected(h)),e.filter(h=>!o.has(this._getConcreteValue(h,o))).forEach(h=>this._unmarkSelected(h));const f=this._hasQueuedChanges();return this._emitChangeEvent(),f}toggle(t){return this.isSelected(t)?this.deselect(t):this.select(t)}clear(t=!0){this._unmarkAll();const e=this._hasQueuedChanges();return t&&this._emitChangeEvent(),e}isSelected(t){return this._selection.has(this._getConcreteValue(t))}isEmpty(){return 0===this._selection.size}hasValue(){return!this.isEmpty()}sort(t){this._multiple&&this.selected&&this._selected.sort(t)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(t){t=this._getConcreteValue(t),this.isSelected(t)||(this._multiple||this._unmarkAll(),this.isSelected(t)||this._selection.add(t),this._emitChanges&&this._selectedToEmit.push(t))}_unmarkSelected(t){t=this._getConcreteValue(t),this.isSelected(t)&&(this._selection.delete(t),this._emitChanges&&this._deselectedToEmit.push(t))}_unmarkAll(){this.isEmpty()||this._selection.forEach(t=>this._unmarkSelected(t))}_verifyValueAssignment(t){}_hasQueuedChanges(){return!(!this._deselectedToEmit.length&&!this._selectedToEmit.length)}_getConcreteValue(t,e){if(this.compareWith){e=e??this._selection;for(let o of e)if(this.compareWith(t,o))return o;return t}return t}}let v=(()=>{class i{constructor(){this._listeners=[]}notify(e,o){for(let f of this._listeners)f(e,o)}listen(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(o=>e!==o)}}ngOnDestroy(){this._listeners=[]}static#t=this.\u0275fac=function(o){return new(o||i)};static#e=this.\u0275prov=p.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})()},5911:(x,C,n)=>{n.d(C,{KQ:()=>g,s5:()=>m});var s=n(4438),_=n(6600),b=n(6860),r=n(177);const p=["*",[["mat-toolbar-row"]]],u=["*","mat-toolbar-row"];let M=(()=>{class l{static#t=this.\u0275fac=function(c){return new(c||l)};static#e=this.\u0275dir=s.FsC({type:l,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"],standalone:!0})}return l})(),g=(()=>{class l{constructor(d,c,v){this._elementRef=d,this._platform=c,this._document=v}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){}static#t=this.\u0275fac=function(c){return new(c||l)(s.rXU(s.aKT),s.rXU(b.OD),s.rXU(r.qQ))};static#e=this.\u0275cmp=s.VBU({type:l,selectors:[["mat-toolbar"]],contentQueries:function(c,v,i){if(1&c&&s.wni(i,M,5),2&c){let t;s.mGM(t=s.lsd())&&(v._toolbarRows=t)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(c,v){2&c&&(s.HbH(v.color?"mat-"+v.color:""),s.AVh("mat-toolbar-multiple-rows",v._toolbarRows.length>0)("mat-toolbar-single-row",0===v._toolbarRows.length))},inputs:{color:"color"},exportAs:["matToolbar"],standalone:!0,features:[s.aNF],ngContentSelectors:u,decls:2,vars:0,template:function(c,v){1&c&&(s.NAR(p),s.SdG(0),s.SdG(1,1))},styles:[".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color);--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color)}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"],encapsulation:2,changeDetection:0})}return l})(),m=(()=>{class l{static#t=this.\u0275fac=function(c){return new(c||l)};static#e=this.\u0275mod=s.$C({type:l});static#o=this.\u0275inj=s.G2t({imports:[_.yE,_.yE]})}return l})()}}]);