"use strict";(self.webpackChunkDogtor=self.webpackChunkDogtor||[]).push([[110],{3110:(U,i,r)=>{r.r(i),r.d(i,{ContactoModule:()=>A});var s=r(6019),m=r(2979),e=r(7537),d=r(1659),u=r.n(d),o=r(3556),g=r(8260),f=r(4522);let p=(()=>{class t{constructor(n){this.httpclient=n,this.baseUrl=g.N.baseUrl}enviarMensaje(n){return this.httpclient.post(`${this.baseUrl}/enviaremail`,n)}}return t.\u0275fac=function(n){return new(n||t)(o.LFG(f.eN))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var Z=r(9198);function h(t,c){1&t&&(o.TgZ(0,"span",18),o._uU(1,"El asunto no puede estar vac\xedo"),o.qZA())}function b(t,c){1&t&&(o.TgZ(0,"span",18),o._uU(1,"Debe introducir un mensaje"),o.qZA())}const v=[{path:"",component:(()=>{class t{constructor(n,a){this.emailservice=n,this.form=a,this.email=localStorage.getItem("email"),this.mensaje=this.form.group({to:["crisblanco96@gmail.com"],subject:["",[e.kI.required,e.kI.pattern("^[A-Za-z ]+$")]],text:["",[e.kI.required,e.kI.pattern("^[A-Za-z ]+$")]]})}enviarmensaje(){this.emailservice.enviarMensaje(this.mensaje.value).subscribe({next:n=>{this.mensaje.reset(),u().fire({title:"\xa1Su correo ha sido enviado!",icon:"success",showConfirmButton:!1,color:"#3d3d1b",background:"#FAE4CF"})},error:n=>{u().fire({title:"Error",text:n.error.mensaje,icon:"error",color:"#3d3d1b",background:"#FAE4CF",showConfirmButton:!1})}})}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)(o.Y36(p),o.Y36(e.qu))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-formucontacto"]],decls:48,vars:4,consts:[["info","CONTACTO"],[1,"formulariocontacto","container-fluid","row"],[1,"col-lg-6","col-md-12","col-sm-12","col-xs-12"],["src","./assets/img/mapa.jfif","alt","imagen de la locaci\xf3n de la cl\xednica Dogtor",1,"mapa"],[1,"col-lg-6","col-md-12","col-sm-12","col-xs-12","mt-3"],["id","logintexto"],[1,"iconos"],["aria-hidden","true",1,"fa","fa-circle"],["aria-hidden","true",1,"fa","fa-phone-square"],[1,"formulario","container-fluid","row"],["src","./assets/img/correo.png","alt","imagen editada de un perro con una carta en la boca",1,"cartero"],[1,"contacto",3,"formGroup","ngSubmit"],[1,"form-group"],["type","text","formControlName","subject","placeholder","Asunto...","required","",1,"form-control"],["class","form-text text-danger",4,"ngIf"],["formControlName","text","placeholder","Mensaje...","required","",1,"form-control"],[1,"btn"],["type","submit",1,"button",3,"disabled"],[1,"form-text","text-danger"]],template:function(n,a){1&n&&(o._UZ(0,"app-ubicacion",0),o.TgZ(1,"div",1),o.TgZ(2,"div",2),o._UZ(3,"img",3),o.qZA(),o.TgZ(4,"div",4),o.TgZ(5,"h1",5),o.TgZ(6,"strong"),o._uU(7,"Informaci\xf3n de contacto"),o.qZA(),o.qZA(),o.TgZ(8,"pre",6),o._UZ(9,"i",7),o._uU(10,"   "),o._UZ(11,"i",7),o._uU(12,"   "),o._UZ(13,"i",7),o._uU(14,"   "),o._UZ(15,"i",7),o.qZA(),o.TgZ(16,"p"),o._uU(17,"SEVILLA"),o.qZA(),o.TgZ(18,"pre"),o._uU(19,"Lunes \u2013 S\xe1bados\nDe 8:00 - 20:00\n            "),o.qZA(),o.TgZ(20,"h4"),o._UZ(21,"i",8),o._uU(22," 954 55 55 77"),o.qZA(),o.qZA(),o.qZA(),o.TgZ(23,"div",9),o.TgZ(24,"div",2),o._UZ(25,"img",10),o.qZA(),o.TgZ(26,"div",4),o.TgZ(27,"h1",5),o.TgZ(28,"strong"),o._uU(29,"Contacto"),o.qZA(),o.qZA(),o.TgZ(30,"p"),o._uU(31,"\xbfNecesitas ayuda? \xa1Escr\xedbenos!"),o.qZA(),o.TgZ(32,"form",11),o.NdJ("ngSubmit",function(){return a.enviarmensaje()}),o.TgZ(33,"div",12),o._UZ(34,"input",13),o._UZ(35,"br"),o.YNc(36,h,2,0,"span",14),o._UZ(37,"br"),o.qZA(),o.TgZ(38,"div",12),o._UZ(39,"textarea",15),o._UZ(40,"br"),o.YNc(41,b,2,0,"span",14),o.qZA(),o._UZ(42,"br"),o.TgZ(43,"div",16),o.TgZ(44,"button",17),o._uU(45,"Enviar Mensaje"),o.qZA(),o.qZA(),o.qZA(),o._UZ(46,"br"),o._UZ(47,"br"),o.qZA(),o.qZA()),2&n&&(o.xp6(32),o.Q6J("formGroup",a.mensaje),o.xp6(4),o.Q6J("ngIf",a.mensaje.controls.subject.errors&&a.mensaje.controls.subject.touched),o.xp6(5),o.Q6J("ngIf",a.mensaje.controls.text.errors&&a.mensaje.controls.text.touched),o.xp6(3),o.Q6J("disabled",a.mensaje.invalid))},directives:[Z.D,e._Y,e.JL,e.sg,e.Fj,e.JJ,e.u,e.Q7,s.O5],styles:[".formulariocontacto[_ngcontent-%COMP%]{width:60%;height:20%;margin:auto auto 30px;text-align:center;border-radius:20px;padding-top:10px;padding-bottom:10px;color:#3a4114;background-color:#fae4cf;background-size:cover}.iconos[_ngcontent-%COMP%]{font-size:7px;color:#44522b}.formulario[_ngcontent-%COMP%]{width:60%;height:20%;margin:auto auto 90px;padding-bottom:10px;text-align:center;border-radius:20px;color:#283111;background-color:#fae4cf;background-size:cover}input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{border-top:none;border-right:none;border-left:none;background-color:#fae4cf;color:#fff;border-color:#fff}[_ngcontent-%COMP%]::placeholder{color:#000}.button[_ngcontent-%COMP%]{min-width:150px;min-height:50px;font-size:20px;letter-spacing:4px;font-weight:600;color:#fff;background:#858062;border:none;border-radius:8px;cursor:pointer;font-family:cocogose}.button[_ngcontent-%COMP%]:hover{transform:scale(1.1);background-color:#44522b}.cartero[_ngcontent-%COMP%]{margin-top:35%;width:100%}.mapa[_ngcontent-%COMP%]{width:90%}pre[_ngcontent-%COMP%]{font-family:lemonmilk}@media screen and (min-width: 300px) and (max-width: 698px){.formulariocontacto[_ngcontent-%COMP%]{width:100%}.formulario[_ngcontent-%COMP%]{width:100%}p[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-size:24px}}"]}),t})(),pathMatch:"full"}];let C=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[m.Bz.forChild(v)]]}),t})();var x=r(513);let A=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[s.ez,C,x.$,e.UX,e.u5]]}),t})()}}]);