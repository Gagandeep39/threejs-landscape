var G=Object.defineProperty,R=Object.defineProperties;var E=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable;var y=(e,t,n)=>t in e?G(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,u=(e,t)=>{for(var n in t||(t={}))F.call(t,n)&&y(e,n,t[n]);if(f)for(var n of f(t))H.call(t,n)&&y(e,n,t[n]);return e},w=(e,t)=>R(e,E(t));import{G as X,P,M as Y,D as j,a as L,B as z,R as D,S as N,b as U,W as Z,O as q,c as M,g as B}from"./vendor.e055b7ed.js";const I=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}};I();const s={plane:{width:16,height:16,heightSegments:22,widthSegments:22}},V=()=>{const e=new X;e.add(s.plane,"width",0,20).onChange(d),e.add(s.plane,"height",0,20).onChange(d),e.add(s.plane,"heightSegments",0,50).onChange(d),e.add(s.plane,"widthSegments",0,50).onChange(()=>d())},m={r:0,g:.19,b:.4},b={r:.1,g:.5,b:1};V();const K=new P(s.plane.width,s.plane.height,s.plane.widthSegments,s.plane.heightSegments),$=new Y({side:j,flatShading:!0,vertexColors:!0}),l=new L(K,$);d();function d(){l.geometry.dispose(),l.geometry=new P(s.plane.width,s.plane.height,s.plane.widthSegments,s.plane.heightSegments),k(),v()}function k(){const e=l.geometry.attributes.position.array;for(let n=0;n<e.length;n+=3){const r=e[n+2];e[n+2]=r+Math.random()}let{position:t}=l.geometry.attributes;t=w(u({},t),{originalPosition:t.array}),console.log(t)}function v(){const e=[];for(let t=0;t<l.geometry.attributes.position.count;t++){const{r:n,g:r,b:o}=m;e.push(n,r,o)}l.geometry.setAttribute("color",new z(new Float32Array(e),3))}const C=new D,h=new N,g=new U(75,window.innerWidth/window.innerHeight,.1,1e3),c=new Z;c.setSize(innerWidth,innerHeight);c.setPixelRatio(devicePixelRatio);document.body.appendChild(c.domElement);new q(g,c.domElement);g.position.z=5;c.render(h,g);h.add(l);const O=new M(16777215,1);O.position.set(0,0,1);h.add(O);const W=new M(16777215,1);W.position.set(0,0,-1);h.add(W);const p={x:0,y:0};function A(){requestAnimationFrame(A),c.render(h,g),C.setFromCamera(p,g);const e=C.intersectObject(l);if(e.length>0&&e[0].object instanceof L){const t=e[0].object.geometry,{color:n}=t.attributes,{r,g:o,b:i}=b;S(n,e[0].face,r,o,i);const a=u({},b);B.to(a,{r:m.r,g:m.g,b:m.b,onUpdate:()=>{S(n,e[0].face,a.r,a.g,a.b)}})}}function S(e,t,n,r,o){e.setX(t.a,n),e.setY(t.a,r),e.setZ(t.a,o),e.setX(t.b,n),e.setY(t.b,r),e.setZ(t.b,o),e.setX(t.c,n),e.setY(t.c,r),e.setZ(t.c,o),e.needsUpdate=!0}A();addEventListener("mousemove",e=>{p.x=e.clientX/innerWidth*2-1,p.y=-(e.clientY/innerHeight)*2+1});