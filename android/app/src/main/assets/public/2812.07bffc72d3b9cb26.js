"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2812],{2812:(A,m,g)=>{g.r(m),g.d(m,{ProfePageModule:()=>v});var f=g(6814),s=g(95),i=g(7027),u=g(2946),d=g(5861),t=g(5879),h=g(4017),p=g(2115),P=g(3309),C=g(7742);function M(e,c){if(1&e){const r=t.EpF();t.TgZ(0,"tbody")(1,"tr")(2,"td"),t._uU(3),t.qZA(),t.TgZ(4,"ion-button",9),t.NdJ("click",function(){const a=t.CHM(r).$implicit,l=t.oxw();return t.KtG(l.setOpen(!0,a.nombre))}),t._uU(5,"Crear Clase"),t.qZA()()()}if(2&e){const r=c.$implicit;t.xp6(3),t.Oqu(r.nombre)}}function O(e,c){if(1&e&&(t.TgZ(0,"li",20),t._uU(1),t.qZA()),2&e){const r=c.$implicit;t.xp6(1),t.Oqu(r)}}function b(e,c){if(1&e){const r=t.EpF();t.TgZ(0,"tr")(1,"ion-accordion-group")(2,"ion-accordion")(3,"ion-item",10)(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td"),t._uU(7),t.qZA()(),t.TgZ(8,"div",11)(9,"ion-item-sliding")(10,"ion-item",12),t._UZ(11,"ion-icon",13),t.qZA(),t.TgZ(12,"ion-item-options",14)(13,"ion-item-option",9),t.NdJ("click",function(){const a=t.CHM(r).$implicit,l=t.oxw();return t.KtG(l.verCodigo(a.id))}),t._UZ(14,"ion-icon",15),t.qZA(),t.TgZ(15,"ion-item-option",16),t.NdJ("click",function(){const a=t.CHM(r).$implicit,l=t.oxw();return t.KtG(l.eliminarClase(a.id))}),t._UZ(16,"ion-icon",17),t.qZA()()()(),t.TgZ(17,"div",18)(18,"ul"),t.YNc(19,O,2,1,"li",19),t.qZA()()()()()}if(2&e){const r=c.$implicit;t.xp6(5),t.hij("",r.asignatura," - "),t.xp6(2),t.Oqu(r.hora),t.xp6(12),t.Q6J("ngForOf",r.asistencia)}}function Z(e,c){if(1&e){const r=t.EpF();t.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title",21),t._uU(3,"CREAR CLASE"),t.qZA(),t.TgZ(4,"ion-buttons",22)(5,"ion-button",9),t.NdJ("click",function(){t.CHM(r);const o=t.oxw();return t.KtG(o.setOpen(!1,""))}),t._uU(6,"Cerrar"),t.qZA()(),t.TgZ(7,"ion-buttons",23)(8,"ion-button",24),t.NdJ("click",function(){t.CHM(r);const o=t.oxw();return t.KtG(o.guardarClase())}),t._uU(9,"Confirmar"),t.qZA()()()(),t.TgZ(10,"ion-content",25)(11,"div",26)(12,"form",27)(13,"ion-item")(14,"ion-label",28),t._uU(15,"ID"),t.qZA(),t._UZ(16,"ion-input",29),t.qZA(),t.TgZ(17,"ion-item")(18,"ion-button",30),t.NdJ("click",function(){t.CHM(r);const o=t.oxw();return t.KtG(o.generarID())}),t._uU(19,"Generar C\xf3digo"),t.qZA()()()()()}if(2&e){const r=t.oxw();t.xp6(12),t.Q6J("formGroup",r.registroClase)}}const y=[{path:"",component:(()=>{var e;class c{constructor(n,o,a,l,_,w,T){this.alertController=n,this.aService=o,this.cService=a,this.toastController=l,this.uService=_,this.aRoute=w,this.cStorage=T,this.KEYC="clases",this.KEYA="asignaturas",this.KEY="usuarios",this.isModalOpen=!1,this.agreOpen=!1,this.asignaturas=[],this.usuarios=[],this.clases=[],this.rut_profesor="",this.nombre_profesor="",this.dato="",this.cantidad_clases=0,this.dateTime=new Date,this.hora=this.dateTime.getHours(),this.minutos=this.dateTime.getMinutes(),this.time="",this.randomPassword="",this.registroClase=new s.cw({id:new s.NI("",s.kI.required),asignatura:new s.NI(""),profesor:new s.NI(""),hora:new s.NI(""),asistencia:new s.NI([])})}generarID(){this.randomPassword=Math.random().toString(36).slice(-8),console.log(this.randomPassword),this.dato=this.randomPassword,this.registroClase.controls.id.setValue(this.randomPassword),this.time=this.hora+":"+this.minutos,this.registroClase.controls.hora.setValue(this.time),this.registroClase.controls.profesor.setValue(this.nombre_profesor)}verCodigo(n){var o=this.clases.find(a=>a.id==n);null!=o?(this.dato=o.id,console.log(n),console.log(this.dato)):this.mostrarToast("top","Clase no encontrada.",2e3)}filtrarAsignaturas(){var n=this;return(0,d.Z)(function*(){return yield n.listarAsig(),n.asignaturas=n.asignaturas.filter(o=>o.rut_profesor===n.rut_profesor),n.asignaturas})()}filtrarClases(){var n=this;return(0,d.Z)(function*(){return yield n.listarClase(),n.clases=n.clases.filter(o=>o.profesor===n.nombre_profesor),n.clases})()}filtrarProfes(){return this.usuarios.filter(o=>"profesor"===o.perfil)}listarAsig(){var n=this;return(0,d.Z)(function*(){n.asignaturas=yield n.aService.listar(n.KEYA)})()}listarClase(){var n=this;return(0,d.Z)(function*(){n.clases=yield n.cService.listar(n.KEYC)})()}listarUsuarios(){var n=this;return(0,d.Z)(function*(){n.usuarios=yield n.uService.listar(n.KEY)})()}guardarClase(){var n=this;return(0,d.Z)(function*(){const o=n.registroClase.value;o.asistencia=[],console.log(o),(yield n.cService.agregar(o,n.KEYC))?(n.mostrarToast("middle","Clase creada!",3e3),n.registroClase.reset(),yield n.filtrarClases(),n.agreOpen=!1):n.mostrarToast("middle","Error al crear clase.",3e3)})()}eliminarClase(n){var o=this;return(0,d.Z)(function*(){var l;yield(yield o.alertController.create({header:"Confirmar eliminaci\xf3n",message:"\xbfEst\xe1s seguro de que deseas eliminar esta clase?",animated:!0,backdropDismiss:!0,translucent:!0,buttons:[{text:"Cancelar",role:"cancel",cssClass:"alerta-custom",handler:()=>{}},{text:"Eliminar",handler:(l=(0,d.Z)(function*(){yield o.cService.eliminar(n,o.KEYC),yield o.filtrarClases(),o.dato="",o.mostrarToast("middle","Clase eliminada!",3e3)}),function(){return l.apply(this,arguments)})}]})).present()})()}setOpen(n,o){var a=this;return(0,d.Z)(function*(){a.agreOpen=n,a.registroClase.controls.asignatura.setValue(o)})()}mostrarToast(n,o,a){var l=this;return(0,d.Z)(function*(){yield(yield l.toastController.create({message:o,duration:a,position:n})).present()})()}ngOnInit(){var n=this;return(0,d.Z)(function*(){n.rut_profesor=n.aService.getRutProfesor(),n.nombre_profesor=n.aRoute.snapshot.paramMap.get("nombre")||"",yield n.listarAsig(),yield n.listarUsuarios(),yield n.listarClase(),yield n.filtrarAsignaturas(),yield n.filtrarClases(),yield n.filtrarProfes(),console.log(n.rut_profesor),console.log(n.nombre_profesor),console.log(n.asignaturas),console.log(n.time),console.log(n.clases)})()}}return(e=c).\u0275fac=function(n){return new(n||e)(t.Y36(i.Br),t.Y36(h.c),t.Y36(p.A),t.Y36(i.yF),t.Y36(P.r),t.Y36(u.gz),t.Y36(p.A))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-profe"]],decls:41,vars:8,consts:[[1,"mainContent"],[1,"card1"],[3,"allowEmptyString","qrdata","width","errorCorrectionLevel"],["label","C\xf3digo QR",3,"ngModel","ngModelChange"],[1,"card2"],["width","100%","id","tabla"],[4,"ngFor","ngForOf"],[1,"modalModi",3,"isOpen"],["class","modiTemplate"],[3,"click"],["slot","header"],["slot","content"],["color","favorite2"],["name","arrow-back-outline"],["side","end"],["slot","icon-only","name","eye-outline"],["color","favorite2",3,"click"],["slot","icon-only","name","trash-outline"],["slot","content",1,"ion-padding"],["class","tracking-in-expand",4,"ngFor","ngForOf"],[1,"tracking-in-expand"],[1,"modiTitle"],["slot","start"],["slot","end"],["type","submit",3,"click"],[1,"ion-paddinga"],[1,"modalClase"],[3,"formGroup"],["position","stacked"],["type","text","formControlName","id","value","randomPassword"],["expand","block",1,"generarcode",3,"click"]],template:function(n,o){1&n&&(t.TgZ(0,"ion-content",0)(1,"ion-grid")(2,"ion-row")(3,"ion-col")(4,"ion-card",1)(5,"ion-card-header")(6,"ion-title"),t._uU(7," Escanea tu QR de clases! "),t.qZA()(),t.TgZ(8,"ion-card-content"),t._UZ(9,"qrcode",2),t.TgZ(10,"ion-input",3),t.NdJ("ngModelChange",function(l){return o.dato=l}),t.qZA()()()(),t.TgZ(11,"ion-col")(12,"ion-card",4)(13,"ion-card-header")(14,"p")(15,"b")(16,"strong"),t._uU(17,"TUS ASIGNATURAS"),t.qZA()()()(),t.TgZ(18,"ion-card-content")(19,"table",5)(20,"thead")(21,"tr")(22,"td"),t._uU(23,"Asignatura"),t.qZA()()(),t.YNc(24,M,6,1,"tbody",6),t.qZA()()(),t.TgZ(25,"ion-card",4)(26,"ion-card-header")(27,"p")(28,"b")(29,"strong"),t._uU(30,"TUS CLASES"),t.qZA()()()(),t.TgZ(31,"ion-card-content")(32,"table",5)(33,"thead")(34,"tr")(35,"td"),t._uU(36,"Asignatura"),t.qZA()()(),t.TgZ(37,"tbody"),t.YNc(38,b,20,3,"tr",6),t.qZA()()()()()()()(),t.TgZ(39,"ion-modal",7),t.YNc(40,Z,20,1,"ng-template",8),t.qZA()),2&n&&(t.xp6(9),t.Q6J("allowEmptyString",!0)("qrdata",o.dato)("width",256)("errorCorrectionLevel","M"),t.xp6(1),t.Q6J("ngModel",o.dato),t.xp6(14),t.Q6J("ngForOf",o.asignaturas),t.xp6(14),t.Q6J("ngForOf",o.clases),t.xp6(1),t.Q6J("isOpen",o.agreOpen))},dependencies:[f.sg,s._Y,s.JJ,s.JL,s.On,i.We,i.eh,i.YG,i.Sm,i.PM,i.FN,i.Zi,i.wI,i.W2,i.jY,i.Gu,i.gu,i.pK,i.Ie,i.u8,i.IK,i.td,i.Q$,i.Nd,i.wd,i.sr,i.ki,i.j9,C.V,s.sg,s.u],styles:['@charset "UTF-8";ion-content[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}ion-row[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.mainContent[_ngcontent-%COMP%]{top:76px;--background: rgb(224, 224, 224);overflow:hidden}.mainContent[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{overflow:scroll;margin-bottom:60px}.user-wrapper[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;display:flex;margin:auto}.fade-in-animation[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeIn ease-in 1.5s}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}.card1[_ngcontent-%COMP%], .card2[_ngcontent-%COMP%]{text-align:center;background:white;border:1px red solid}.card1[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%]{font-weight:700;color:#000}.card2[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:#000}.card2[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#000;font-weight:700}ion-input[_ngcontent-%COMP%]{font-weight:700}.modalModi[_ngcontent-%COMP%]{--background: transparent;padding:0;border:0;margin:0}.modalModi[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%]{--background: linear-gradient(rgba(255, 27, 27, .585), rgba(255, 203, 185, .558), rgba(249, 248, 248, .749));--color: white}.modalModi[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%]{justify-items:center;align-items:center;text-align:center;color:tomato;font-weight:700}.modalModi[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background: white;--color: black;--font-weight: bold}.modalModi[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{align-items:center;text-align:center;justify-content:center;padding:0;color:#000;--background: transparent}.modalModi[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{--background: transparent;border:none;outline:none;cursor:pointer;transition:all .2s ease-in-out}.modalModi[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]:hover{transform:scale(1.08);--background: tomato}.modalModi[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{width:80%;background-color:#ac0000;color:#fff;margin:0 auto}.alerta-custom[_ngcontent-%COMP%]   .alert-wrapper[_ngcontent-%COMP%]{background:#ffffff;color:red}ion-item-sliding[_ngcontent-%COMP%]   ion-item-options[_ngcontent-%COMP%]{position:absolute}@media (max-width: 680px){ion-item-sliding[_ngcontent-%COMP%]   ion-item-options[_ngcontent-%COMP%]{position:flex}ion-item-sliding[_ngcontent-%COMP%]   ion-item-options[_ngcontent-%COMP%]   ion-item-option[_ngcontent-%COMP%]{width:24%;top:50%}}ion-accordion[_ngcontent-%COMP%]{margin:2% auto 1%;color:#414141;background:white;border-radius:1px;font-weight:700;font-family:sans-serif}ion-accordion[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]   .icon-inner[_ngcontent-%COMP%]{color:#000}ion-accordion[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-weight:700;text-align:center}.tracking-in-expand[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both}@keyframes _ngcontent-%COMP%_tracking-in-expand{0%{letter-spacing:-.5em;opacity:0}40%{opacity:.6}to{opacity:1}}.cboClase[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}ion-accordion.accordion-expanding[_ngcontent-%COMP%], ion-accordion.accordion-expanded[_ngcontent-%COMP%]{width:calc(100% - 32px);margin:16px auto;font-weight:700}ion-accordion.accordion-collapsing[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%], ion-accordion.accordion-collapsed[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%]{--background: rgb(255, 0, 0);--background: linear-gradient(135deg, rgba(255, 0, 0, 1) 11%, rgba(255, 255, 255, 1) 11%, rgba(198, 198, 198, .5685924027814251) 100%);--color: rgb(0, 0, 0)}ion-accordion.accordion-expanding[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%], ion-accordion.accordion-expanded[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%]{--background: rgb(255, 0, 0);--background: linear-gradient(-45deg, rgba(255, 0, 0, 1) 11%, rgba(255, 255, 255, 1) 11%, rgba(198, 198, 198, .5685924027814251) 100%);--color: black}']}),c})()}];let x=(()=>{var e;class c{}return(e=c).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[u.Bz.forChild(y),u.Bz]}),c})(),v=(()=>{var e;class c{}return(e=c).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[f.ez,s.u5,i.Pc,x,C.N,s.UX]}),c})()}}]);