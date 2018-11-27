!function(t){"use strict";var e=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};e.VERSION="3.4.0",e.TRANSITION_DURATION=150,e.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},e.prototype.init=function(e,o,i){if(this.enabled=!0,this.type=e,this.$element=t(o),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&t(document).find(t.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var n=this.options.trigger.split(" "),r=n.length;r--;){var s=n[r];if("click"==s)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=s){var a="hover"==s?"mouseenter":"focusin",p="hover"==s?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(p+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.getOptions=function(e){return(e=t.extend({},this.getDefaults(),this.$element.data(),e)).delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},e.prototype.getDelegateOptions=function(){var e={},o=this.getDefaults();return this._options&&t.each(this._options,function(t,i){o[t]!=i&&(e[t]=i)}),e},e.prototype.enter=function(e){var o=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);if(o||(o=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,o)),e instanceof t.Event&&(o.inState["focusin"==e.type?"focus":"hover"]=!0),o.tip().hasClass("in")||"in"==o.hoverState)o.hoverState="in";else{if(clearTimeout(o.timeout),o.hoverState="in",!o.options.delay||!o.options.delay.show)return o.show();o.timeout=setTimeout(function(){"in"==o.hoverState&&o.show()},o.options.delay.show)}},e.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},e.prototype.leave=function(e){var o=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);if(o||(o=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,o)),e instanceof t.Event&&(o.inState["focusout"==e.type?"focus":"hover"]=!1),!o.isInStateTrue()){if(clearTimeout(o.timeout),o.hoverState="out",!o.options.delay||!o.options.delay.hide)return o.hide();o.timeout=setTimeout(function(){"out"==o.hoverState&&o.hide()},o.options.delay.hide)}},e.prototype.show=function(){var o=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(o);var i=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(o.isDefaultPrevented()||!i)return;var n=this,r=this.tip(),s=this.getUID(this.type);this.setContent(),r.attr("id",s),this.$element.attr("aria-describedby",s),this.options.animation&&r.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,r[0],this.$element[0]):this.options.placement,p=/\s?auto?\s?/i,l=p.test(a);l&&(a=a.replace(p,"")||"top"),r.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this),this.options.container?r.appendTo(t(document).find(this.options.container)):r.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var h=this.getPosition(),d=r[0].offsetWidth,c=r[0].offsetHeight;if(l){var f=a,u=this.getPosition(this.$viewport);a="bottom"==a&&h.bottom+c>u.bottom?"top":"top"==a&&h.top-c<u.top?"bottom":"right"==a&&h.right+d>u.width?"left":"left"==a&&h.left-d<u.left?"right":a,r.removeClass(f).addClass(a)}var g=this.getCalculatedOffset(a,h,d,c);this.applyPlacement(g,a);var v=function(){var t=n.hoverState;n.$element.trigger("shown.bs."+n.type),n.hoverState=null,"out"==t&&n.leave(n)};t.support.transition&&this.$tip.hasClass("fade")?r.one("bsTransitionEnd",v).emulateTransitionEnd(e.TRANSITION_DURATION):v()}},e.prototype.applyPlacement=function(e,o){var i=this.tip(),n=i[0].offsetWidth,r=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(s)&&(s=0),isNaN(a)&&(a=0),e.top+=s,e.left+=a,t.offset.setOffset(i[0],t.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),i.addClass("in");var p=i[0].offsetWidth,l=i[0].offsetHeight;"top"==o&&l!=r&&(e.top=e.top+r-l);var h=this.getViewportAdjustedDelta(o,e,p,l);h.left?e.left+=h.left:e.top+=h.top;var d=/top|bottom/.test(o),c=d?2*h.left-n+p:2*h.top-r+l,f=d?"offsetWidth":"offsetHeight";i.offset(e),this.replaceArrow(c,i[0][f],d)},e.prototype.replaceArrow=function(t,e,o){this.arrow().css(o?"left":"top",50*(1-t/e)+"%").css(o?"top":"left","")},e.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},e.prototype.hide=function(o){var i=this,n=t(this.$tip),r=t.Event("hide.bs."+this.type);function s(){"in"!=i.hoverState&&n.detach(),i.$element&&i.$element.removeAttr("aria-describedby").trigger("hidden.bs."+i.type),o&&o()}if(this.$element.trigger(r),!r.isDefaultPrevented())return n.removeClass("in"),t.support.transition&&n.hasClass("fade")?n.one("bsTransitionEnd",s).emulateTransitionEnd(e.TRANSITION_DURATION):s(),this.hoverState=null,this},e.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},e.prototype.hasContent=function(){return this.getTitle()},e.prototype.getPosition=function(e){var o=(e=e||this.$element)[0],i="BODY"==o.tagName,n=o.getBoundingClientRect();null==n.width&&(n=t.extend({},n,{width:n.right-n.left,height:n.bottom-n.top}));var r=window.SVGElement&&o instanceof window.SVGElement,s=i?{top:0,left:0}:r?null:e.offset(),a={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},p=i?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},n,a,p,s)},e.prototype.getCalculatedOffset=function(t,e,o,i){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-o/2}:"top"==t?{top:e.top-i,left:e.left+e.width/2-o/2}:"left"==t?{top:e.top+e.height/2-i/2,left:e.left-o}:{top:e.top+e.height/2-i/2,left:e.left+e.width}},e.prototype.getViewportAdjustedDelta=function(t,e,o,i){var n={top:0,left:0};if(!this.$viewport)return n;var r=this.options.viewport&&this.options.viewport.padding||0,s=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-r-s.scroll,p=e.top+r-s.scroll+i;a<s.top?n.top=s.top-a:p>s.top+s.height&&(n.top=s.top+s.height-p)}else{var l=e.left-r,h=e.left+r+o;l<s.left?n.left=s.left-l:h>s.right&&(n.left=s.left+s.width-h)}return n},e.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},e.prototype.getUID=function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},e.prototype.tip=function(){if(!this.$tip&&(this.$tip=t(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},e.prototype.enable=function(){this.enabled=!0},e.prototype.disable=function(){this.enabled=!1},e.prototype.toggleEnabled=function(){this.enabled=!this.enabled},e.prototype.toggle=function(e){var o=this;e&&((o=t(e.currentTarget).data("bs."+this.type))||(o=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,o))),e?(o.inState.click=!o.inState.click,o.isInStateTrue()?o.enter(o):o.leave(o)):o.tip().hasClass("in")?o.leave(o):o.enter(o)},e.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})};var o=t.fn.tooltip;t.fn.tooltip=function(o){return this.each(function(){var i=t(this),n=i.data("bs.tooltip"),r="object"==typeof o&&o;!n&&/destroy|hide/.test(o)||(n||i.data("bs.tooltip",n=new e(this,r)),"string"==typeof o&&n[o]())})},t.fn.tooltip.Constructor=e,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=o,this}}(jQuery),function(t){"use strict";var e=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");e.VERSION="3.4.0",e.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),e.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),e.prototype.constructor=e,e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),o=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof o?"html":"append":"text"](o),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},e.prototype.hasContent=function(){return this.getTitle()||this.getContent()},e.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var o=t.fn.popover;t.fn.popover=function(o){return this.each(function(){var i=t(this),n=i.data("bs.popover"),r="object"==typeof o&&o;!n&&/destroy|hide/.test(o)||(n||i.data("bs.popover",n=new e(this,r)),"string"==typeof o&&n[o]())})},t.fn.popover.Constructor=e,t.fn.popover.noConflict=function(){return t.fn.popover=o,this}}(jQuery),function(t){"use strict";var e=".dropdown-backdrop",o='[data-toggle="dropdown"]',i=function(e){t(e).on("click.bs.dropdown",this.toggle)};function n(e){var o=e.attr("data-target");o||(o=(o=e.attr("href"))&&/#[A-Za-z]/.test(o)&&o.replace(/.*(?=#[^\s]*$)/,""));var i=o&&t(document).find(o);return i&&i.length?i:e.parent()}function r(i){i&&3===i.which||(t(e).remove(),t(o).each(function(){var e=t(this),o=n(e),r={relatedTarget:this};o.hasClass("open")&&(i&&"click"==i.type&&/input|textarea/i.test(i.target.tagName)&&t.contains(o[0],i.target)||(o.trigger(i=t.Event("hide.bs.dropdown",r)),i.isDefaultPrevented()||(e.attr("aria-expanded","false"),o.removeClass("open").trigger(t.Event("hidden.bs.dropdown",r)))))}))}i.VERSION="3.4.0",i.prototype.toggle=function(e){var o=t(this);if(!o.is(".disabled, :disabled")){var i=n(o),s=i.hasClass("open");if(r(),!s){"ontouchstart"in document.documentElement&&!i.closest(".navbar-nav").length&&t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click",r);var a={relatedTarget:this};if(i.trigger(e=t.Event("show.bs.dropdown",a)),e.isDefaultPrevented())return;o.trigger("focus").attr("aria-expanded","true"),i.toggleClass("open").trigger(t.Event("shown.bs.dropdown",a))}if("select"===o.attr("data-type"))o.siblings(".option-list").length&&!i.data("selectClick")&&(i.data("selectClick",1),i.on("click.dropdown.select",function(e){var i=t(e.target),n=i.closest("dd");n.length&&(n.hasClass("disabled")?e.stopPropagation():1*o.attr("data-multiple")?o.find("input").val(i.text()).attr("data-val",n.attr("data-val")):(n.addClass("active").siblings(".active").removeClass("active"),o.find("input").val(i.text()).attr("data-val",n.attr("data-val"))))}));return!1}},i.prototype.keydown=function(e){var i=t(this);if(e.preventDefault(),e.stopPropagation(),!i.is(".disabled, :disabled")){var r=n(i),s=r.hasClass("open");if(!s&&27!=e.which||s&&27==e.which)return 27==e.which&&r.find(o).trigger("focus"),i.trigger("click");var a=r.find(".dropdown-menu dd:not(.disabled):visible a");if(a.length){var p=a.index(e.target);38==e.which&&p>0&&p--,40==e.which&&p<a.length-1&&p++,~p||(p=0),a.eq(p).trigger("focus"),13===e.which&&a.eq(p).trigger("click")}}};var s=t.fn.dropdown;t.fn.dropdown=function(e){return this.each(function(){var o=t(this),n=o.data("bs.dropdown");n||o.data("bs.dropdown",n=new i(this)),"string"==typeof e&&n[e].call(o)})},t.fn.dropdown.Constructor=i,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=s,this},t(document).on("click.bs.dropdown.data-api",r).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",o,i.prototype.toggle).on("keydown.bs.dropdown.data-api",o,i.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",i.prototype.keydown)}(jQuery),$(function(){$('[data-toggle="tooltip"]').tooltip({container:"body",delay:100}),$('[data-toggle="popover"]').popover({container:"body",delay:100})});