"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[371],{371:(P,p,s)=>{s.r(p),s.d(p,{LoginPageModule:()=>y});var f=s(6814),i=s(95),o=s(7027),g=s(2946),u=s(5861),e=s(5879);let m=(()=>{var t;class c{constructor(n){this.loadingCtrl=n,this.loader=null}presentLoader(){var n=this;return(0,u.Z)(function*(){n.loader=yield n.loadingCtrl.create({message:"Espere un momento...",spinner:"crescent",keyboardClose:!0,translucent:!0}),yield n.loader.present()})()}hideLoader(){var n=this;return(0,u.Z)(function*(){n.loader&&(yield n.loader.dismiss())})()}}return(t=c).\u0275fac=function(n){return new(n||t)(e.LFG(o.HT))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),c})();var h=s(3309);const v=[{path:"",component:(()=>{var t;class c{constructor(n,a,r,l){this.loaderService=n,this.router=a,this.uService=r,this.toastController=l,this.admin={rut:"11.111.111-1",nombre:"ariel",email:"ariel@duoc.cl",fechanac:"2003-05-09",perfil:"admin",pass1:"Judas123",pass2:"Judas123"},this.profesor=[{rut:"12.111.111-1",nombre:"felipe",email:"felipe@profesor.duoc.cl",fechanac:"2003-05-09",perfil:"profesor",pass1:"Judas123",pass2:"Judas123"},{rut:"14.111.111-1",nombre:"felipe2",email:"felipe2@profesor.duoc.cl",fechanac:"2003-05-09",perfil:"profesor",pass1:"Judas123",pass2:"Judas123"}],this.alumno={rut:"13.111.111-1",nombre:"manuel",email:"manuel@duocuc.cl",fechanac:"2003-05-09",perfil:"alumno",pass1:"Judas123",pass2:"Judas123"},this.usuario=new i.cw({email:new i.NI("",[i.kI.email,i.kI.required,i.kI.pattern("^(.+)@(duocuc\\.cl|profesor\\.duoc\\.cl|duoc\\.cl)$")]),clave:new i.NI("",[i.kI.required,i.kI.minLength(6),i.kI.maxLength(20),i.kI.pattern("(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}")])}),this.email="",this.clave="",this.KEY="usuarios"}login(){var n=this;return(0,u.Z)(function*(){var r=(yield n.uService.listar(n.KEY)).find(l=>l.email==n.email&&l.pass1==n.clave);if(console.log(r),null==r)n.mostrarToast("top","Datos Incorrectos",3e3);else{if(null==r)return n.router.navigate(["/error"]),void(yield n.loaderService.hideLoader());try{yield n.loaderService.presentLoader()}finally{let l={state:{user:r}};return n.uService.setEstadoLogin(),n.router.navigate(["/home"],l),yield n.loaderService.hideLoader(),n.clear(),console.log(n.uService.getEstadoLogin()),r}}})()}clear(){this.email="",this.clave=""}recoverPassword(){var n=this;return(0,u.Z)(function*(){try{yield n.loaderService.presentLoader()}finally{n.router.navigate(["/restcon"]),yield n.loaderService.hideLoader()}})()}register(){var n=this;return(0,u.Z)(function*(){try{yield n.loaderService.presentLoader()}finally{n.router.navigate(["/registro"]),yield n.loaderService.hideLoader()}})()}mostrarToast(n,a,r){var l=this;return(0,u.Z)(function*(){yield(yield l.toastController.create({message:a,duration:r,position:n,color:"danger"})).present()})()}ngOnInit(){var n=this;return(0,u.Z)(function*(){yield n.uService.agregar(n.admin,n.KEY),yield n.uService.agregar(n.profesor[0],n.KEY),yield n.uService.agregar(n.profesor[1],n.KEY),yield n.uService.agregar(n.alumno,n.KEY),console.log(n.admin,n.alumno,n.profesor)})()}}return(t=c).\u0275fac=function(n){return new(n||t)(e.Y36(m),e.Y36(g.F0),e.Y36(h.r),e.Y36(o.yF))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-login"]],decls:58,vars:3,consts:[[1,"user-wrapper"],["src","assets/images/favicon.png","width","40px","height","40px","alt","",1,"fade-in-animation"],[1,"fade-in-animation",2,"margin-top","15%"],[3,"fullscreen"],["alt","Banner estudiantil","src","assets/images/fondo-cifras.jpg"],[1,"icon-container"],["src","assets/images/favicon-16x16.png",1,"icon-class"],["color","gray"],[1,"ion-activatable","ripple-parent","rounded-rectangle"],["color","#F3E3E2",1,"input"],["position","stacked"],["type","email","placeholder","Ingrese su correo",1,"correo",3,"ngModel","ngModelChange"],["type","password","placeholder","Ingrese su contrase\xf1a",1,"contrase\xf1a",3,"ngModel","ngModelChange"],["fill","solid","size","default",1,"entrar",3,"click"],[1,"link"],[1,"linkazul",3,"click"],[1,"circulo1"],[1,"circulo2"],[1,"circulo3"]],template:function(n,a){1&n&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"div",0),e._UZ(3,"img",1),e.TgZ(4,"div")(5,"h4",2)(6,"strong"),e._uU(7,"erifyU"),e.qZA()()()()()(),e.TgZ(8,"ion-content",3)(9,"div")(10,"ion-card"),e._UZ(11,"ion-img",4),e.TgZ(12,"ion-card-header")(13,"ion-card-title")(14,"b"),e._uU(15,"INGRESO DE USUARIO"),e.qZA()(),e.TgZ(16,"ion-card-subtitle")(17,"span",5),e._UZ(18,"ion-img",6),e.TgZ(19,"b"),e._uU(20,"VerifyU"),e.qZA()()()(),e.TgZ(21,"ion-card-content"),e._UZ(22,"hr",7),e.qZA(),e.TgZ(23,"ion-card-content")(24,"div",8),e._UZ(25,"ion-ripple-effect"),e.TgZ(26,"ion-item",9)(27,"ion-label",10),e._uU(28,"Correo"),e.qZA(),e.TgZ(29,"ion-input",11),e.NdJ("ngModelChange",function(l){return a.email=l}),e.qZA()()(),e.TgZ(30,"div",8),e._UZ(31,"ion-ripple-effect"),e.TgZ(32,"ion-item",9)(33,"ion-label",10),e._uU(34,"Contrase\xf1a"),e.qZA(),e.TgZ(35,"ion-input",12),e.NdJ("ngModelChange",function(l){return a.clave=l}),e.qZA()()(),e._UZ(36,"hr",7),e.TgZ(37,"ion-button",13),e.NdJ("click",function(){return a.login()}),e._uU(38,"Entrar"),e.qZA(),e.TgZ(39,"b")(40,"ion-text",14),e._uU(41,"\xbfNo tienes una cuenta? "),e.qZA(),e.TgZ(42,"a",15),e.NdJ("click",function(){return a.register()}),e._uU(43,"Registrate aqui"),e.qZA()(),e.TgZ(44,"b")(45,"ion-text",14),e._uU(46,"\xbfOlvidaste tu contrase\xf1a? "),e.qZA(),e.TgZ(47,"a",15),e.NdJ("click",function(){return a.recoverPassword()}),e._uU(48,"Reestablecer aqui"),e.qZA()()()()(),e._UZ(49,"div",16)(50,"div",17)(51,"div",18)(52,"div",16)(53,"div",17)(54,"div",18)(55,"div",16)(56,"div",17)(57,"div",18),e.qZA()),2&n&&(e.xp6(8),e.Q6J("fullscreen",!0),e.xp6(21),e.Q6J("ngModel",a.email),e.xp6(6),e.Q6J("ngModel",a.clave))},dependencies:[i.JJ,i.On,o.YG,o.PM,o.FN,o.Zi,o.tO,o.Dq,o.W2,o.Gu,o.Xz,o.pK,o.Ie,o.Q$,o.H$,o.yW,o.sr,o.j9],styles:["ion-card[_ngcontent-%COMP%]{background:white;background:linear-gradient(#a30000,#a40000,rgba(255,255,255,.566),rgba(255,255,255,0));box-shadow:0 0 1rem #0000008e;border-radius:.8em!important;z-index:1}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background: white;border-bottom:1px solid red}ion-item[_ngcontent-%COMP%]{margin-bottom:15px}ion-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:red}.user-wrapper[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;display:flex;margin:auto}.fade-in-animation[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeIn ease-in 1.5s}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@media (max-width: 450px){ion-card[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;position:relative;top:50px}}@media (min-width: 650px){ion-card[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;position:relative;top:25px}}@media (min-width: 1200px){ion-card[_ngcontent-%COMP%]{max-width:450px;margin:0 auto;position:relative;top:25px}}ion-card-title[_ngcontent-%COMP%]{color:#fff}ion-card-subtitle[_ngcontent-%COMP%]{color:gray}.input[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{margin:auto;display:flex;text-align:center;justify-content:center;align-items:center}.input[_ngcontent-%COMP%]{text-align:center;border-radius:15px;background-color:#f3e3e285}.entrar[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;display:flex;margin:3% auto 2%}ion-button[_ngcontent-%COMP%]{--background: tomato;--border-radius: 0}.ripple-parent[_ngcontent-%COMP%]{position:relative}.rounded-rectangle[_ngcontent-%COMP%]{border-radius:5px;overflow:hidden;color:#210dbc}.link[_ngcontent-%COMP%]{display:flex;justify-content:center;color:#fff}.linkazul[_ngcontent-%COMP%]{text-decoration:none;width:-moz-fit-content;width:fit-content;display:flex;margin:auto}.linkazul[_ngcontent-%COMP%]:hover{color:#fff}ion-title[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}ion-button[_ngcontent-%COMP%]{--background: tomato}.icon-container[_ngcontent-%COMP%]{display:flex;align-items:center}.icon-container[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:#fff}.icon-class[_ngcontent-%COMP%]{width:20px;height:20px;margin-right:8px}"]}),c})()}];let _=(()=>{var t;class c{}return(t=c).\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[g.Bz.forChild(v),g.Bz]}),c})(),y=(()=>{var t;class c{}return(t=c).\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[f.ez,i.u5,o.Pc,_,i.UX]}),c})()}}]);