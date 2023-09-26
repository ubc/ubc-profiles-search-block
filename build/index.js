!function(){"use strict";var e,t={445:function(){var e=window.wp.blocks,t=window.wp.element,n=window.wp.i18n,l=window.wp.blockEditor,a=window.wp.components,r=window.wp.data,o=window.wp.coreData;const s=(e,t)=>{var n,l;const a=(null==t?void 0:t.id)||(null===(n=e.find((e=>e.name===t)))||void 0===n?void 0:n.id);if(a)return a;const r=t.toLocaleLowerCase();return null===(l=e.find((e=>e.name.toLocaleLowerCase()===r)))||void 0===l?void 0:l.id},i=e=>{let{taxonomy_label:n,taxonomy_slug:l,value:r,onChange:o,term_value_type:i}=e;const{terms:u}=c(l);if(null==u||!u.length)return null;const m=r.map((e=>u.find((t=>"id"===i?t.id===e:t.name===e)))).filter(Boolean).map((e=>({id:e.id,value:e.name})));return(0,t.createElement)("div",{className:"block-library-query-inspector__taxonomy-control"},(0,t.createElement)(a.FormTokenField,{label:n,value:m,suggestions:u.map((e=>e.name)),onChange:e=>{const t=new Set,n=new Set;for(const l of e){const e=s(u,l);e&&(t.add(e),n.add(l.value?l.value:l))}o("id"===i?Array.from(t):Array.from(n))}}))},c=e=>(0,r.useSelect)((t=>({terms:t(o.store).getEntityRecords("taxonomy",e,{context:"view",per_page:100})})),[e]);var u=JSON.parse('{"u2":"ubc/profiles-search-block"}');(0,e.registerBlockType)(u.u2,{edit:function(e){const{attributes:s,setAttributes:c}=e,{selectedTaxonomySlug:u,selectedTerms:m}=s,p=(0,l.useBlockProps)();let d=(f="post",(0,r.useSelect)((e=>{const{getTaxonomies:t}=e(o.store);return t({type:f,per_page:-1,context:"view"})}),[f]));var f;return d?(d=d.filter((e=>"post_tag"===e.slug||"category"===e.slug)),d=d.map((e=>({label:e.name,value:e.slug}))),(0,t.createElement)("div",p,(0,t.createElement)("input",{className:"btn btn-large btn-primary",type:"search",placeholder:"Search Profiles"}),(0,t.createElement)("button",null,"Search"),(0,t.createElement)(l.InspectorControls,null,(0,t.createElement)(a.PanelBody,{title:"Settings",initialOpen:!0},(0,t.createElement)(a.SelectControl,{label:"Select a Taxonomy",value:u,options:[{label:"",value:""},...d],onChange:e=>{c({selectedTaxonomySlug:e,selectedTerms:[]})},help:(0,n.__)("Currently only support built-in taxonomies such as category and tag."),__nextHasNoMarginBottom:!0}),(0,t.createElement)(i,{key:u,taxonomy_label:(e=>{const t=d.filter((t=>t.value===e));return 1===t.length?t[0].label:""})(u),taxonomy_slug:u,value:m,term_value_type:"post_tag"===u?"slug":"id",onChange:e=>{c({selectedTerms:e})}}))))):null},save:function(e){const{attributes:n}=e,{selectedTaxonomySlug:l,selectedTerms:a}=n;return(0,t.createElement)("form",{id:"profile-search-form",role:"search",method:"get",action:"/"},(0,t.createElement)("label",{for:"profile-search",className:"visually-hidden"},"Search profiles"),(0,t.createElement)("input",{type:"search",id:"profile-search",name:"s"}),"post_tag"===l?(0,t.createElement)("input",{className:"visually-hidden",type:"text",name:"tag",value:a.join(",")}):null,"category"===l?(0,t.createElement)("input",{className:"visually-hidden",type:"text",name:"cat",value:a.join(",")}):null,""!==l?(0,t.createElement)("input",{type:"text",className:"visually-hidden",name:"profilesearch",value:"1"}):null,(0,t.createElement)("input",{value:"Submit",type:"submit",className:"btn"}))}})}},n={};function l(e){var a=n[e];if(void 0!==a)return a.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,l),r.exports}l.m=t,e=[],l.O=function(t,n,a,r){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],r=e[u][2];for(var s=!0,i=0;i<n.length;i++)(!1&r||o>=r)&&Object.keys(l.O).every((function(e){return l.O[e](n[i])}))?n.splice(i--,1):(s=!1,r<o&&(o=r));if(s){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,a,r]},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};l.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,r,o=n[0],s=n[1],i=n[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(a in s)l.o(s,a)&&(l.m[a]=s[a]);if(i)var u=i(l)}for(t&&t(n);c<o.length;c++)r=o[c],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(u)},n=self.webpackChunkubc_profiles_search_block=self.webpackChunkubc_profiles_search_block||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var a=l.O(void 0,[431],(function(){return l(445)}));a=l.O(a)}();