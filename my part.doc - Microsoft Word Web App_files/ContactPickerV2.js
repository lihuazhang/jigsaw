/* Copyright (C) 2012 Microsoft Corporation */(function(){var m=window,h=m.jQuery,b=m.wLive=m["wLive"]||{},d=b.ContactPickerV2=b["ContactPickerV2"]||{};d.ViewModels=b.ContactPickerV2["ViewModels"]||{};d.Controls=b.ContactPickerV2["Controls"]||{};var a,i,o,p,f,e,g,c,q,n;$Do.when("wlxcontacts",0,function(){a=b.Contacts.WLXContactsSchema;i=a.person.emails;_schemaPersonPhones=a.person.phones;o=a.person.nickName;p=a.contact.emails;f=a.category;e=a.group;g=a.email;c=a.phone;q=[g.personal,g.work,g.other];n=[c.mobile,c.home,c.home2,c.work,c.work2]});var l=d.ViewModels.ContactType=new $Flags("Person",0,"Category",1,"Group",2,"PicwEmail",3),k=d.ViewModels.DisplayNameType=new $Flags("Nickname",0,"Email",1,"Phone",2),j="DisplayNameType",r={sortOrder:null,displayOrder:null,includeMeContact:true};d.ViewModels.Factory=s;function s(a,w){var x=this,d=h.extend({},r,w||{});function q(c){var b=a.getPersonHelper(c),d={Id:b.getId(),Cid:b.getCid(),HexCid:b.getHexCid(),Name:b.getOrderedName()||a.getFullName(c),Company:b.getCompanyName(),NickName:c[o],Phone:g(c[_schemaPersonPhones],n),UserTile:b.getUserTileMedium(),IsFavorite:b.getIsFavorite(),CategoryIds:b.getCategoryIds(),WlxObject:c};return d}function m(b){var c,f,h,u=b.WlxObject,e=a.getPersonHelper(u);if(!(c=b["Name"]))if(!(c=b["NickName"]))if(!(c=b["Company"]))if(!(c=b["Email"])){if(!!(c=b["Phone"]))b[j]=k.Phone}else b[j]=k.Email;else h=e.getYomiCompanyName();else b[j]=k.Nickname;else{var g=e.getNameType()||a.getDefaultNameType(),i=a.isLastNameFirstForNameType(g),r=!i&&d.sortOrder,q=!i&&d.displayOrder,o=e.getFirstName(),p=e.getLastName(),m=e.getYomiFirstName(),n=e.getYomiLastName(),l=!!(m||n),s=l?m:o,t=l?n:p;h=a.formatName(g,r?"sortNameReverse":"sortName",null,s,null,t,null);f=a.formatName(g,q?"displayNameReverse":"displayName",null,o,null,p,null)}f=f||c;b["ListDisplayName"]=f;b["DisplayName"]=c;b["SortName"]=(h||f).toLowerCase()}function g(d,c){if(d){var b=null;for(var a=0,e=c.length;a<e;a++){b=d[c[a]];if(b)break}}return b}function v(c,d){var a=h.extend({},c,{Email:d,Type:l.Person});m(a);return new b.ContactPickerV2.ViewModels.Contact(a)}function t(f,s){if(!a.isHiddenContact(f)&&(d.includeMeContact||!a.isMeContact(f))){var r=q(f),k=a.getPersonHelper(f),m=k.getPassportMemberName(),o=k.getContacts()||[],e=[],n={},b=0,g,j;if(m)e.push(m);if(h.isArray(f[i]))e=e.concat(f[i]);j=o.length;for(b=0;b<j;b++){var l=o[b][p];if(h.isArray(l))e=e.concat(l)}j=e.length;for(b=0;b<j;b++){g=e[b];if(g&&!n[g]){c(v(r,g),s);n[g]=true}}}}function c(a,c){var d=c.emailHash,b=a.email();c.contacts.push(a);c.idHash[a.clientId()]=a;if(b){b=b.toLowerCase();if(!d[b])d[b]=a}}function s(a,e){var d=a[f.name];c(new b.ContactPickerV2.ViewModels.Contact({Id:a[f.id],Type:l.Category,IsFavoriteCategory:a[f.isFavorite],DisplayName:d,ListDisplayName:d,SortName:d,WlxObject:a}),e)}function u(a,f){var d=a[e.name];c(new b.ContactPickerV2.ViewModels.Contact({Id:a[e.id],Cid:a[e.cid],HexCid:a[e.hexCid],Type:l.Group,DisplayName:d,ListDisplayName:d,SortName:d,WlxObject:a}),f)}x.createContacts=function(){var b={contacts:[],emailHash:{},idHash:{}},d=a.persons,e=a.groups,c=a.categories;for(var f=d.length;f--;)t(d[f],b);for(var g=e.length;g--;)u(e[g],b);for(var h=c.length;h--;)s(c[h],b);return b}}})();(function(){var b=window,f=b.jQuery,e=b.wLive,d=Number.MAX_VALUE,c=e.ContactPickerV2;c.ViewModels.Contact=a;function a(f){var b=this;b.model=f;b.$model=jQuery(b.model);function e(){if(b.model["PicwOrder"]===undefined)b.model["PicwOrder"]=d}function c(c,a){if(a===undefined)a=b.model[c];else jQuery.observable(b.model).setProperty(c,a);return a}b.type=function(){return c("Type")};b.clientId=function(){return b.email()+":"+b.id()+":"+b.type()};b.id=function(){return c("Id")};b.cid=function(){return c("Cid")};b.hexCid=function(){return c("HexCid")};b.displayName=function(){return c("DisplayName")};b.listDisplayName=function(){return c("ListDisplayName")};b.name=function(){return c("Name")};b.company=function(){return c("Company")};b.nickName=function(){return c("NickName")};b.sortName=function(){return c("SortName")};b.picwOrder=function(a){return c("PicwOrder",a)};b.email=function(){return c("Email")};b.userTile=function(a){return c("UserTile",a)};b.isFavorite=function(){return c("IsFavorite")};b.isFavoriteCategory=function(){return c("IsFavoriteCategory")};b.categoryIds=function(){return c("CategoryIds")||[]};b.isSelected=function(a){return c("IsSelected",a)};b.bindPropertyChange=function(a){b.$model.bind("propertyChange",a)};b.unbindPropertyChange=function(a){b.$model.unbind("propertyChange",a)};b.equals=function(c){return c instanceof a&&c.id()===b.id()};b.dispose=function(){b.$model.unbind()};e()}})();(function(){var b=window,e=b.jQuery,d=b.wLive,a=d.ContactPickerV2;a.ViewModels.SelectedContact=c;function c(f,e){var c=this;function g(){c.model={};if(f){c.model.DisplayName=f.name();c.model.Email=f.email();if(!e||!c.model.Email)c.model.SelectionText=f.raw()}if(e){if(e.displayName()){c.displayName(e.displayName());if(!c.model.SelectionText&&!c.model.Email)c.selectionText(e.displayName())}if(e.email())c.email(e.email());c.contact(e)}c.$model=jQuery(c.model);c.model.Error=c.contactRequiresEmail()&&!c.model.Email}function d(b,a){if(a===undefined)a=c.model[b];else jQuery.observable(c.model).setProperty(b,a);return a}c.id=function(a){return d("Id",a===undefined?a:a.toString())};c.displayName=function(a){if(arguments.length===0)if(c.model["DisplayName"])return d("DisplayName",a);else if(c.model["Email"])return d("Email",a);else return d("SelectionText",a);return d("DisplayName",a)};c.userTileHtml=function(){var b="",a=c.contact();if(a&&a.userTile()){var d=$ic.ic.createICFromTemplate("CPV2_addressWell",0,0,0,0,a.hexCid(),a.cid(),"","","",a.userTile(),"",0,0,0,0);b=d.html}return b};c.selectionText=function(a){if(arguments.length===0&&!c.model["SelectionText"])return c.model["Email"];return d("SelectionText",a)};c.email=function(a){return d("Email",a)};c.editing=function(a){return !!d("Editing",a)};c.error=function(a){return !!d("Error",a)};c.contact=function(a){return d("Contact",a)};c.isCategory=function(){var b=c.contact();return !!(b&&b.type()===a.ViewModels.ContactType.Category)};c.isGroup=function(){var b=c.contact();return !!(b&&b.type()===a.ViewModels.ContactType.Group)};c.contactRequiresEmail=function(){return !(c.isCategory()||c.isGroup())};c.isSameContact=function(b){var a=c.contact();return !!(a&&a.equals(b&&b.contact()))};c.tooltip=function(){var d;if(c.error())d=b.$Config.ContactPickerV2.InvalidAddress;else{var a=c.displayName(),e=c.email();d=e&&a!==e?a+" <"+e+">":a}return d};c.bindPropertyChange=function(a){c.$model.bind("propertyChange",a)};c.unbindPropertyChange=function(a){c.$model.unbind("propertyChange",a)};c.errorClass=function(){return c.error()?"cp_error":""};c.ctnrDivClass=function(){return c.isCategory()?"cp_ctnrExp":"cp_ctnr"};g()}})();(function(){var f=window,d=f.jQuery,j=f.wLive,h=new wLive.ContactList.Core.AlphabetHelper,c=f.$WLXContacts,a=j.ContactPickerV2,b=a.ViewModels.SortHelpers={alphabeticalComparer:function(a,b){return h.compareString(a.sortName(),b.sortName(),false)},picwComparer:function(a,b){return a.picwOrder()-b.picwOrder()},picwAlphaComparer:function(c,d){var a=b.picwComparer(c,d);return a!==0?a:b.alphabeticalComparer(c,d)}};a.ViewModels.FlatContactsDataModel=g;var e=g.Events={initialize:"initialize"},i={sortOrder:null,displayOrder:null,picwEmails:[],createContactsFromUnmatchedPicwEmails:true,maxPicwEntries:0,includeMeContact:true};function g(w){var f=this;f.$=d(f);var j=d.extend({},i,w),t=null,g=[],s=[],r=[],p=j.picwEmails,q={},o={},n=false,k=null,l=j.maxPicwEntries;function m(){if(!k)v();else{var a=k.createContacts();g=a.contacts.sort(b.alphabeticalComparer);o=a.emailHash;q=a.idHash;t=c.syncKey;u();f.$.triggerHandler(e.initialize)}}function v(){if(!k&&!n){n=true;c.callWhenReady(function(){k=new wLive.ContactPickerV2.ViewModels.Factory(c,{sortOrder:j.sortOrder,displayOrder:j.displayOrder,includeMeContact:j.includeMeContact});n=false;m()})}}function u(){var d=[],h=g.clone(),k=p||[];for(var c=0;c<k.length;c++){var e=k[c].toLowerCase(),f=o[e];if(f){f.picwOrder(c);if(l===0||d.length<l)d.push(f)}else if(j.createContactsFromUnmatchedPicwEmails){var i=new a.ViewModels.Contact({Id:c,Type:a.ViewModels.ContactType.PicwEmail,DisplayName:e,Email:e,SortName:e,PicwOrder:c});if(l===0||d.length<l)d.push(i);h.push(i)}}s=d;r=h.sort(b.picwAlphaComparer)}f.doWhenInitialized=function(a){if(k)a();else{var b=function(){f.$.unbind(e.initialize,b);a()};f.$.bind(e.initialize,b)}};f.dispose=function(){f.$.unbind()};f.reinitializeIfStale=function(){if(k&&c.syncKey!==t)m()};f.setPicwEmails=function(a){if(a.join(";")!==p.join(";"))f.doWhenInitialized(function(){p=a;m()})};f.getAlphabetHelper=function(){return h};f.getContactsByCategory=function(c){var a=[],b={};d.each(g,function(g,e){var f=e.id();if(!b[f]&&d.inArray(c,e.categoryIds())!==-1){a.push(e);b[f]=true}});return a};f.getContactByClientId=function(a){return q[a]};f.getContactByEmail=function(a){if(!a)return;return o[a.toLowerCase()]};f.getContactByName=function(a){if(!a||a==="")return;a=a.toLowerCase();for(var b=0,e=g.length;b<e;b++){var d=g[b].name()||"",c=g[b].displayName()||"";if(a===d.toLowerCase()||a===c.toLowerCase())return g[b]}};f.getContacts=function(){return g.clone()};f.getPicwContacts=function(c,b){var a=s.clone();if(jQuery.isArray(b)){var f={};for(var e=0;e<b.length;e++)f[b[e].clientId()]=b;var g=[];for(var d=0;d<a.length;d++)if(!f[a[d].clientId()])g.push(a[d]);a=g}if(c&&c>0&&a.length>c)a=a.splice(0,c);return a};f.getMergedContacts=function(){return r.clone()};m()}})();(function(){var f=window,j=f.jQuery,e=f.wLive||{},d=/(?:[<"]\s*)?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\s*[>"])?/i,g=/^[<"]?([^<>"]*)[>"]?$/,b=/[,;](?=(?:[^"]*"[^"]*")*(?![^"]*"))/,a={None:0,Quoted:1,Bare:2,Bracketed:3},c=e.ContactPickerV2=e["ContactPickerV2"]||{};wLive.ContactPickerV2.EmailAddressParser=h;function h(i){var b=this,e={};function h(){f(i)}function c(b,a){if(a===undefined)a=e[b];else jQuery.observable(e).setProperty(b,a);return a}b.email=function(a){return c("Email",a)};b.name=function(a){return c("Name",a)};b.raw=function(a){return c("Raw",a)};function f(f){var t,e;b.raw(f);if(!f)return;f=f.trim();var s=new RegExp(d.source,"gi"),j,m=a.None,h=a.None;while((currMatch=s.exec(f))!=null){var k=currMatch[0],n=k.charAt(0),p=k.charAt(k.length-1);if(n==="<"&&p===">")h=a.Bracketed;else if(n==='"'&&p==='"')h=a.Quoted;else h=a.Bare;if(h>m){j=currMatch;m=h;if(h===a.Bracketed)break}}var c=f;if(j){e=j[0];var l=j.index,o=l+e.length,q=l>0?f.substr(0,l).trim():"",i=o<f.length?f.substr(o):"",r=g.exec(e);e=r[1];if(e.charAt(0)==="'"&&i&&i.charAt(0)==="'"){e=e.slice(1);i=i.slice(1).trim()}c=q===""?i:q;b.email(e.trim())}c=c.replace(/^\s*"\s*/,"").trim();if(c.length>1&&c.charAt(c.length-2)!=="/")c=c.replace(/\s*"$/,"");c=c.replace(/\//g,"");if(c!==""&&c!==e)b.name(c)}h()}c.EmailAddressParser.isValidEmailSyntax=function(a){if(!a)return false;return !!d.exec(a.trim())};function i(d){var a=d.split(b);for(var c=a.length-1;c>=0;c--){a[c]=a[c].trim();if(a[c].length===0)a.splice(c,1)}return a}wLive.ContactPickerV2.EmailAddressParser.parse=function(e){if(!e)return [];var d=i(e),b=[];for(var a=0,f=d.length;a<f;a++)b.push(new c.EmailAddressParser(d[a]));return b};wLive.ContactPickerV2.EmailAddressParser.endsWithDelimiter=function(c){if(c){var a=c.split(b);return !a[a.length-1].trim()}else return false}})();(function(){var f=window,a=f.jQuery,e=f.wLive,c=e.ContactPickerV2;c.ViewModels.ContactPickerModel=d;var b=d.Events={initialize:"initialize",selectedContacts:"selectedContacts",deselectedContacts:"deselectedContacts",editedContact:"editedContact",refreshedContacts:"refreshedContacts",freeformContactRejected:"freeformContactRejected",duplicateContactRejected:"duplicateContactRejected",tooManyContactsRejected:"tooManyContactsRejected"},g={allowDuplicateSelection:true,selectionMaximum:0,allowFreeformEntry:true,autoExpandCategories:false,errorOnDomains:"home.com;attbi.com;example.com;hotmail.co;yaho.com;hotmai.com;yahoo.co;yahoomail.com;direcway.com;homail.com;ims-ms-daemon;local.transport;ethome.net.tw;ethome.net.tw;hotmil.com;hotmial.com;yhoo.com;collegeclub.com;sbcglobal.com;hotamil.com;yaoo.com;yahoo.net;yhaoo.com;mail.hotmail.com;passport.com;kimo.com.tw;yahooo.com;yahho.com;ol.com;gateway.net;hotmail.com.mx;otmail.com;htomail.com;aol.co;altavista.com;hotmaill.com;taiwan.com;hotmail.con;ahoo.com;hotmail.om;hotmail.net;hormail.com;hotail.com;hotamail.com;yahoo.om;homtail.com;msn.net;sprint.ca;angelfire.com;cm1.ethome.net.tw;yohoo.com;a0l.com;alo.com;msn.de;gmail.co"};function d(u,w,t){var d=this;d.$=a(d);var h=u,i={},f=[],y=0,o,k={},x=Math.random().toString();d.getAlphabetHelper=function(){return h.getAlphabetHelper()};d.getContactList=function(){return h.getContacts()};d.getMergedContactList=function(){return h.getMergedContacts()};d.getPicwContactList=function(b,a){return h.getPicwContacts(b,a)};d.selectContacts=function(c,h,g){if(!a.isArray(c))c=[c];h=typeof h==="number"?h:f.length;var e=[],k=[],j=[],m=[],n=i.selectionMaximum;if(i.autoExpandCategories)c=s(c);a.each(c,function(b,a){if(!i.allowFreeformEntry&&!a.contact())k.push(a);else if(!i.allowDuplicateSelection&&r(a))j.push(a);else if(n>0&&f.length+e.length>=n)m.push(a);else{a.id(++y);a.bindPropertyChange(l);e.push(a)}});if(e.length>0){a.observable(f).insert(h,e);d.$.triggerHandler(b.selectedContacts,{model:d,contacts:e,context:g})}if(k.length>0)d.$.triggerHandler(b.freeformContactRejected,{model:d,contacts:k,context:g});if(j.length>0)d.$.triggerHandler(b.duplicateContactRejected,{model:d,contacts:j,context:g});if(m.length>0)d.$.triggerHandler(b.tooManyContactsRejected,{model:d,contacts:m,context:g});return e};d.addSelectedContact=function(a,e,b){var f=j(a.email(),a.name());selectedContact=new c.ViewModels.SelectedContact(a,f);selectedContact.error(selectedContact.contactRequiresEmail()&&!selectedContact.email());return d.selectContacts(selectedContact,e,b)};d.modifySelectedContact=function(c,b,f){var a=b.contact();if(!a)a=j(c.email(),c.name());var d,e;if(c){d=c.name();e=c.email();b.selectionText(c.raw())}b.displayName(a&&a.displayName()?a.displayName():d);if(f&&d)b.displayName(d);b.email(a&&a.email()?a.email():e);b.error(p(b));b.contact(a)};d.refreshContacts=function(){n()};d.contactExists=function(a){if(!a)return false;var b=j(a.email(),a.name());return !!b};d.getContactsByCategory=function(a){return h.getContactsByCategory(a)};d.getContactsByCategoryContact=function(a){var c=a.contact(),b=c.id();return d.getContactsByCategory(b)};d.deselectContactByIndex=function(c){var e=null;if(c>=0){selectedContact=f[c];selectedContact.unbindPropertyChange(l);a.observable(f).remove(c,1);d.$.triggerHandler(b.deselectedContacts,{model:d,contacts:[selectedContact]})}return e};d.deselectContactBySelectedContactId=function(a){return d.deselectContactByIndex(d.indexOfSelectedContactId(a))};d.indexOfSelectedContactId=function(c){var b=-1;a.each(f,function(d,a){if(c===a.id()){b=d;return false}});return b};d.getSelectedContactByIndex=function(a){return f[a]};d.getSelectedContactById=function(a){return d.getSelectedContactByIndex(d.indexOfSelectedContactId(a))};d.selectedContacts=function(a){var b=a?f:f.clone();return b};d.countSelected=function(){return f.length};d.serializeSelection=function(){var b=[];a.each(f,function(d,a){if(a.isCategory()||a.isGroup())b.push('"'+a.displayName()+'"');else{var c=a.displayName().replace('"','\\"');if(a.email())b.push('"'+c+'" <'+a.email()+">");else b.push(c)}});return b.join("; ")};d.dispose=function(){for(var a=0;a<f.length;a++)f[a].unbindPropertyChange(l);d.$.unbind();h.$.unbind(c.ViewModels.FlatContactsDataModel.Events.initialize,m);f=null;h=null};function v(){i=a.extend({},g,w);a.each(t||[],function(b,a){d.selectContacts(a)});o=i.errorOnDomains.split(";");h.$.bind(c.ViewModels.FlatContactsDataModel.Events.initialize,m)}function j(a,b){return a?h.getContactByEmail(a):h.getContactByName(b)}function m(){for(var e=0,g=f.length;e<g;e++){var a=f[e];if(!a.contact()){contact=j(a.email(),a.displayName());if(contact)d.modifySelectedContact(new c.EmailAddressParser(a.selectionText()),a,true)}}d.$.triggerHandler(b.initialize)}function r(c){var b=false;a.each(f,function(d,a){if(c.isSameContact(a)){b=true;return false}});return b}function q(b){var c=b.lastIndexOf("@"),d=b.substring(c+1).trim().toLowerCase();return a.inArray(d,o)!==-1}function p(a){var b=a.email();return a.contactRequiresEmail()&&!b||!a.contact()&&q(b)}function l(g,f){var c=g.target.Id,a=d.getSelectedContactById(c);d.$.triggerHandler(b.editedContact,{model:d,contacts:[a],contact:a,change:f});k[c]=a;e.cpThrottle("cpRefreshDirty"+x,20,n)}function n(){var c=[];for(var g in k){var h=k[g],e=d.indexOfSelectedContactId(g);a.observable(f).move(e,e,1);c.push(h)}k={};d.$.triggerHandler(b.refreshedContacts,{model:d,contacts:[c]})}function s(h){var a=[];for(var e=0;e<h.length;e++){var b=h[e];if(b.isCategory()){var g=d.getContactsByCategoryContact(b);for(var f=0;f<g.length;f++)a.push(new c.ViewModels.SelectedContact(null,g[f]))}else a.push(b)}return a}v()}})();(function(){var a=window,i=a.jQuery,f=a.wLive,b=f.ContactPickerV2,e="CL_Hov",g="CL_Sel",h=a.$Config.imgsBase+"ic/groupsnmxl.png",d=b.ViewModels.ContactType;b.Controls.ContactListTile=c;function c(e,b,d,c){var a=this;a._grid=e;a._contact=b;a.uniqueId=b.clientId();a._searchQuery=d;a._useListDisplayName=c}c.prototype={uniqueId:null,_grid:null,_$container:null,_top:-1,_left:-1,_isDirty:false,_contact:null,_pendingUpdates:null,_propertyChangeProxy:null,render:function(e,c,b){var a=this;if(a._$container){if(c!==a._top||b!==a._left){a._$container.css({top:c,left:b});a._top=c;a._left=b}a._renderUpdates()}else{a._onBeforeRender();a._$container=a._grid.createTile(a.uniqueId,c,b,a._getHtml(),a._getCssClasses(),a._getStyles());a._top=c;a._left=b}},_searchQuery:null,_onBeforeRender:function(){var a=this;a._propertyChangeProxy=function(c,b){a.onPropertyChange(c,b)};a._contact.bindPropertyChange(a._propertyChangeProxy)},_makeBold:function(c,b,a){return f.Search.Helpers.makeBold(c,b,a)},_addHiddenField:function(d,a,e){if(!a)return false;var c=this,b=c._makeBold(a,e,false);if(b!==c._makeBold(a,"",false)){d.fieldHtml=b;return true}else return false},_getHtml:function(){var a=this,c=a._contact,g=[],d=a._useListDisplayName?c.listDisplayName():c.displayName(),b=c.email()||"",e=null;if(d===b)b="";if(a._searchQuery){d=a._makeBold(d,a._searchQuery,false);var h=d!==a._makeBold(c.displayName(),"",false),f=b||"";b=a._makeBold(f,a._searchQuery,true);var j=b!==a._makeBold(f,"",true);if(!j&&!h){e={};a._addHiddenField(e,c.nickName(),a._searchQuery)||a._addHiddenField(e,c.company(),a._searchQuery)||a._addHiddenField(e,c.name(),a._searchQuery);if(!e.fieldHtml)e=null}}else{d=d.encodeHtml();b=b.encodeHtml()}g=i.render({displayNameHtml:d,userTileHtml:a._getUserTileHtml(),emailHtml:b,hidden:e,favoriteStyle:c.isFavorite()?"":"display: none"},"#cp_contactListTileTemplate");return g},_getUserTileHtml:function(){var a=this._contact,b=a.type()===d.Category||a.type()===d.Group?h:a.userTile(),c=$ic.ic.createICFromTemplate("CPV2_contactList",0,0,0,0,a.hexCid(),a.cid(),"","","",b,"",0,0,0,0);return c.html},_getCssClasses:function(){if(this._contact.isSelected())return ["CL_Sel"]},_getStyles:jQuery.noop,_renderUpdates:function(){var a=this;if(a._pendingUpdates){var b=a._pendingUpdates["IsSelected"];if(b!==undefined)a._$container.toggleClass(g,b);a._pendingUpdates=null}},onPropertyChange:function(c,b){var a=this;a._pendingUpdates=a._pendingUpdates||{};a._pendingUpdates[b.path]=b.value;if(a._grid.isVisible(a._top))a._renderUpdates()},mouseover:function(){this._$container.toggleClass(e,true)},mouseout:function(a){this._$container.toggleClass(e,false);this.triggerEvent(a,"mouseoutContact")},mousedown:function(a){this.triggerEvent(a,"mousedownContact")},click:function(a){this.triggerEvent(a,"clickContact")},triggerEvent:function(d,c){var a=this,e=jQuery(d.target,a._$container),b={contact:a._contact,tile:a};setTimeout(function(){a._grid.$.triggerHandler(c,b)},0)},remove:function(){var a=this;if(a._$container){a._$container.empty();a._$container=null}a.dispose()},dispose:function(){var a=this;if(a._propertyChangeProxy)a._person.unbindPropertyChange(a._propertyChangeProxy)},itemEquals:function(a){return this._contact.equals(a)}}})();(function(){var e=window,d=e.jQuery,a=e.wLive,g=".SearchControl",i="keyup"+g,h=9,c=a.ContactPickerV2;c.Controls.SearchResults=b;function b(){}b.prototype={contacts:[],query:""};c.Controls.SearchControl=f;function f(j,o,p){var c=this;c.$=jQuery(c);var g=d(j).delegate(o,i,m),f=false,e,q=new n;c.dispose=function(){g.undelegate();c.$.unbind();$container.empty()};c.getQuery=function(a){return d(a).val()};c.show=function(a){k(function(){var d=new b;d.query=a;if(a&&a!==""){var f=e.getMatches(a,25);d.contacts=f.result}else d.contacts=[];c.$.triggerHandler("search",d)})};function l(b){return a.Search.Helpers.getSuffixStringsFor(b)}function k(b){if(!f)$Do.when("wlxsearchshared",0,function(){f=true;e=new a.Search.Indexer(q);e.initialize(p.getMergedContactList());b()});else b()}function m(b){a.cpThrottle("SearchControl",100,function(){if(b.keyCode===h)return;var a=c.getQuery(b.target);c.show(a)})}function n(){var c=this;c.matchField=function(a){return a.displayName()};function d(a){return a.displayName()}function b(c,h,i,g){var e=[];if(c&&typeof c==="string"){var b;if(!g)b=l(c);else{b=[c];b.push(c.split("@")[1])}b[0]&&e.push(new a.Search.RankSearchKeyWeight(b[0],h,1));for(var d=1,j=b.length;d<j;d++){var f=b[d];if(f)e.push(new a.Search.RankSearchKeyWeight(f,i,d+1))}}return e}c.getKeysAndWeights=function(d){var a=[],c=1e6-d.picwOrder();a=a.concat(b(d.sortName(),c,c-1));a=a.concat(b(d.displayName(),c,c-1));a=a.concat(b(d.name(),c,c-1));a=a.concat(b(d.company(),c-1.5,c-2));a=a.concat(b(d.nickName(),c-1.5,c-2));a=a.concat(b(d.email(),c-2.25,c-2.5,true));return a};c.autoComplete=function(a){return d(a)};c.isValid=function(){return true};c.compareParents=null;c.comparer=function(d,e){var b=d.clientId(),c=e.clientId(),a=0;if(b>c)a=1;else if(b<c)a=-1;return a}}}})();(function(){var c=window,a=c.jQuery,bb=c.wLive,R={maxHeight:400,contactListBottomMargin:60,maxLinesInAddressWell:3,showContactListOnFocus:d,toggleContactListTransitions:null,numFrequentContactsShownLimit:0,excludeSelectedFromFrequentList:false,handleButtonFocus:false,$toggleButton:null},D=13,ab=188,U=c.KeyEvent?c.KeyEvent.DOM_VK_SEMICOLON:186,z=[ab,U],x=9,B=8,Y=46,C=37,S=39,W=38,T=40,Z=33,V=34,w=27,M=200,g=35,Q=35,P=60,q="cp_selected t_bci",G="CL_RelatedHidden",k="cp_primaryInput",A="cp_editInput",v="cp_anyInput",cb="cp_error",p="CL_Highlight t_bci",y="cp_textarea",u="Focus",H=".cpv2",L=".cp_clist",n=".cp_Contact",I="a.cp_exp",i="a.cp_ctBtn",K="a.cp_remBtn",N=".cp_inputArea",F=".CL_Related",O=".cp_textRuler",J="."+k,j="."+v,m="."+A,s=0,d=1,f=2,b=bb.ContactPickerV2,E=h.ListMode={none:s,related:d,full:f},o=h.DefaultTransitions={};o[s]=d;o[d]=f;o[f]=d;function X(b){for(var a in E)if(E[a]===b)return true;return false}var r=h.EntryPoints={relevancy:1,autocomplete:2,contactpicker:3,freeform:4},l=h.UserActionType={deleteContact:1,editContact:2,expandCategory:3,copy:4,paste:5},e=h.UserActionInput={none:0,mouse:1,key:2},t=h.Events={userAction:"userAction"};b.Controls.ContactPicker=h;function h(kc,Ic,Uc){var E=this,U=null,Wc=null,h=null,Fb=null,lb=[],jb="",eb=a.extend({},R,Uc||{}),pb=null,Ib=null,hb=null,gb=null,ab=null,fb=null,dc=null,lc=null,Xb=null,Gb=null,db={contact:null,$contactElt:null},rb=null,bc=105,bb=-1,cb=eb.showContactListOnFocus,kb=eb.$toggleButton,qb=null,zb=eb.handleButtonFocus,Jb=E.$=jQuery(E);E.createTile=function(a,c){return new b.Controls.ContactListTile(a,c,jb,cb===f&&!jb)};E.toggleContactList=function(a){Oc(a);E.setFocus(false)};E.hideContactList=function(){h&&h.closeLetterPicker();fb.toggle(false);bb=-1;cb=eb.showContactListOnFocus};E.addFreeformSelection=function(a){ab.val(a);Hb(ab)};E.refreshLayout=function(){Rb();ob()};E.setFocus=function(d){var b=nb();ob(b);b.focus();var a=b[0];if(a.createTextRange){var c=a.createTextRange();c.moveStart("character",a.value.length);c.collapse();c.select()}else{var e=a.value;a.value="";a.value=e}if(d)b.keyup()};E.completeUserEntry=function(){return Hb(ab)};E.hasIncompleteUserEntry=function(){return !!ab.val()};E.resetSettings=function(c){var d=eb;delete c.$toggleButton;eb=a.extend({},eb,c||{});Wb();var b=eb.showContactListOnFocus;if(b!==d.showContactListOnFocus&&b!==cb){cb=b;if(!jb&&Zb())ib()}E.refreshLayout()};E.dispose=function(){yb();hb.unbind();ab.unbind();fb.remove();uc();U.$.unbind(b.ViewModels.ContactPickerModel.Events.selectedContacts,Ab);U.$.unbind(b.ViewModels.ContactPickerModel.Events.refreshedContacts,Ab);U.$.unbind(b.ViewModels.ContactPickerModel.Events.initialize,fc);a(c).unbind("resize",Rb);if(kb&&zb)kb.unbind("keydown",ac)};function Sc(){Wb();U=Ic;U.$.bind(b.ViewModels.ContactPickerModel.Events.selectedContacts,Ab);U.$.bind(b.ViewModels.ContactPickerModel.Events.refreshedContacts,Ab);U.$.bind(b.ViewModels.ContactPickerModel.Events.initialize,fc);lb=U.getContactList();pb=a(kc);Ib=pb.find("."+y);pb.on("focusin",Ec).on("focusout",Bc).on("copy",Vc);wc();Jc();setTimeout(rc,0);a(c).bind("resize",Rb);if(kb&&zb)kb.bind("keydown",ac)}function Wb(){bc=Q*eb.maxLinesInAddressWell;var b=eb.maxHeight;if(typeof b==="object"||typeof b==="string")qb=a(b);else qb=null;if(!jQuery.isPlainObject(eb.toggleContactListTransitions))eb.toggleContactListTransitions=o}function Jc(){hb=a("<div/>",{"class":"cp_inputContainer"}).appendTo(pb).delegate(I,"click",Hc).delegate(K,"click",qc).delegate(i,"click",yc).delegate(i,"keydown",sc).delegate(i,"mousedown",mc).delegate(i,"mouseout",pc).delegate(i,"focusout",oc).delegate(n,"dblclick",Fc).delegate(j,"keyup",Mc).delegate(j,"paste",Nc).delegate(j,"keydown",Kc).delegate(J,$B.IE&&$B.V<=8?"focus":"focusin",Dc).link({selectedContacts:U.selectedContacts(true)},"#cp_inputTemplate");gb=hb.find(N);Gb=hb.find(O);ab=hb.find(j);var d=gc(Ib,true);ab.val(d);if(U.selectedContacts(true).length===0)ob(ab);else ub(ab);Fb=new b.Controls.SearchControl(kc,j,U);Fb.$.bind("search",Tc);if(c.document.activeElement===Ib[0])E.setFocus();Ib.hide()}function Hb(c){var b=a(c);gc(b);b.val("")}function wc(){fb=a("<div/>",{"class":"cp_clist"}).hide().html(a.render({},"#cp_contactListContainerTemplate")).appendTo(pb);sutra(fb,"$Sutra.Shared.ContactPicker");lc=fb.find(".VirtualizedGrid");dc=fb.find(".GridContainer");Xb=fb.find(F)}function ec(b){fb.show();Kb();h=new wLive.ContactList.Controls.VirtualizedGrid(lc,lb,E,{letterHeader:b,alphabetHelper:U.getAlphabetHelper(),itemClass:"CL_Row",containerHeight:a(window).height(),supportsHover:true,maxColumns:1,height:60,fadeBackground:false},null,fb);h.render();h.$.bind("clickContact",Gc);h.$.bind("clickLetter",xc);h.$.bind("mousedownContact",Ac);h.$.bind("mouseoutContact",Cc);setTimeout(function(){Bb()},0);Xb.toggleClass(G,!!(cb!==d||jb&&jb!==""));h.scrollTo(0);Yb()}function Rc(a,c){var b=0;while(a.length){if(a.charAt(0)===c)b+=1;a=a.slice(1)}return b}function nc(b){var h=a(b.target),i=h.val(),g=Rc(i,'"')%2,e=b.which===D&&!(b.ctrlKey||b.shiftKey),f=!e,c=e;if(!g&&!b.shiftKey)for(var d=0;d<z.length;d++)if(b.which===z[d]){c=true;break}if(c)ic(b,f);return c}function Tb(a,d){var c=false;if(!d){var b=a.val();if(b.length>0&&(bb<0||!h||b!==jb))Fb.show(b);$Do.when("wlxsearchshared",0,function(){if(bb>=0&&h){Qb(a,h.getTile(bb)._contact);c=true}})}$Do.when("wlxsearchshared",0,function(){if(d||!c){Hb(a);setTimeout(function(){E.setFocus(false);ib()},0)}})}function ic(b,c){Tb(a(b.target),c);b.stopPropagation()}function Vc(){Jb.triggerHandler(t.userAction,{type:l.copy,input:e.none})}function Nc(b){setTimeout(function(){Hb(b.target);ob(a(b.target));Jb.triggerHandler(t.userAction,{type:l.paste,input:e.none})},0)}function Mc(b){ob(a(b.target));var d=a(b.target).hasClass(k),c=d?a(b.target).val()==="":false;if(c&&b.keyCode==w){b.stopPropagation();return false}}function Vb(a){var e=a.hasClass(k),c=a.val();if(c.length===0)return [];var d=b.EmailAddressParser.parse(c);a.val("");ub(a);return d}function gc(a,i){var e=a.hasClass(k)||a.hasClass(y),m=sb(a),d=Vb(a),g="";if(i&&d.length>0&&!b.EmailAddressParser.endsWithDelimiter(a.val()))g=d.pop().raw();var c;if(!e)c=U.indexOfSelectedContactId(a.view().data.id());var j={entryPt:r.freeform};for(var f=0,l=d.length;f<l;f++){var h=U.addSelectedContact(d[f],c,j);if(!e&&h&&h.length>0)c++}if(!e)U.deselectContactByIndex(c);return g}function Lb(d,b){var a=d.data;if(!a||a.editing()===b)return;$selectedContactElt=Pb(gb,a.id());var c=$selectedContactElt.width();a.editing(b);setTimeout(function(){U.refreshContacts();if(b){var d=nb();d.css("min-width",c);ob(d);Fb.show(a.selectionText());E.setFocus(false)}},0);return a}function fc(){if(Zb())ib()}function Gc(e,a){if(!h)return;var c=a.contact,d=a.tile;if(ab.val()===""){wb(bb,h.getTileCount());bb=h.getTileIndex(d);Eb(bb)}var b=nb();Qb(b,c)}function xc(){E.setFocus()}function Ac(c,a){var b=a.tile;b._$container.toggleClass(p,true)}function Cc(c,b){if(!h)return;var a=b.tile;if(bb&&h.getTile(bb)!==a)a._$container.toggleClass(p,false)}function nb(){var a=hb.find(m);if(a.length===0)a=ab;return a}function sb(b){return a(b).closest(n)}function qc(b){var c=a.view(b.target).data;xb(c.id(),{input:e.mouse});b.preventDefault()}function yc(b){rb=a.view(b.target).data;b.preventDefault()}function mc(b){var c=a.view(b.target).data;if(!db||c!==db.contact){var d=sb(b.target);d.addClass(q)}}function pc(b){var c=a.view(b.target).data;if(!db||c!==db.contact){var d=sb(b.target);d.removeClass(q)}}function oc(b){var a=sb(b.target);if(db.$contactElt&&a[0]===db.$contactElt[0])vb()}function Hc(c){var b=a.view(c.target).data;if(b.isCategory()){var d=b.id(),f=U.getContactsByCategoryContact(b);Qb(a(c.target),f,U.indexOfSelectedContactId(d));xb(d,{type:l.expandCategory,input:e.mouse})}c.preventDefault()}function Dc(b){vb();if(!tb()||jb!==a(b.target).val()||nb()[0]!==ab[0])ib()}function Ec(){if(!gb.hasClass(u))setTimeout(E.setFocus,0);gb.addClass(u)}function Bc(){setTimeout(function(){if(!document.activeElement||!Ob())gb.removeClass(u)},50)}function Kc(b){var e=a(b.target).hasClass(k),c=e?a(b.target).val()==="":false;switch(b.keyCode){case w:if(e)if(!c){setTimeout(function(){a(b.target).val("")},0);ib()}else{E.hideContactList();b.stopPropagation();return false}else{Lb(a.view(b.target),false);setTimeout(function(){E.setFocus(false);ib()},0)}break;case C:case B:if(c&&Mb()){b.stopPropagation();return false}break;case T:mb(1,true);b.stopPropagation();return false;case W:mb(-1,true);b.stopPropagation();return false;case V:if(h){mb(h.getTileCountPerPage(),true);b.stopPropagation();return false}break;case Z:if(h){mb(-h.getTileCountPerPage(),true);b.stopPropagation();return false}break;case x:var d=true;if(c)E.hideContactList();else{ic(b);d=false}if(!b.shiftKey&&!d){setTimeout(function(){E.setFocus(false);ib()},0);b.stopPropagation();return false}else if(b.shiftKey&&kb&&zb){setTimeout(function(){kb.focus()},0);b.stopPropagation();return false}break;default:return !nc(b)}}function ac(a){if(a.keyCode===x&&!a.shiftKey){E.setFocus(false);a.stopPropagation();return false}}function mb(d,f){if(!h)return false;var e=d/Math.abs(d),a=bb+d,b=h.getTileCount(),c=false,g;if(bb>0&&a<0)if(Eb(0)||bb===1)a=0;else a=1;else if(bb<b-1&&a>=b)a=b-1;while(0<=a&&a<b){if(Eb(a)){c=true;break}a+=e}if(c){wb(bb,b);bb=a}else if(f)if(e<0){wb(bb,b);bb=h.getTileCount();c=mb(-1,false)}else{wb(bb,b);bb=-1;c=mb(1,false)}return c}function Yb(){if(!h)return;var b=hb.find(m);if(b.length===0||c.document.activeElement===ab[0])if(ab.val()!==""){bb=-1;mb(1,false)}else{wb(bb,h.getTileCount());bb=-1}else{var d=b.view().data.contact();if(d){for(var a=lb.length-1;a>=0;a-=1)if(lb[a]===d){bb=a;Eb(a);break}}else{bb=-1;mb(1,false)}}}function Eb(a){if(!h)return;var c=false,b=h.getTile(a);if(!h.isItemVisible(a)){h.scrollTo(a);h.render()}if(b._contact&&b._$container){b._$container.toggleClass(p,true);c=true}return c}function wb(a,c){if(!h)return;if(0<=a&&a<c){var b=h.getTile(a);if(b._$container)b._$container.toggleClass(p,false)}}function sc(b){var d=a.view(b.target).data.id(),c={input:e.key};switch(b.keyCode){case B:Mb()||Nb()||E.setFocus(true);xb(d,c);b.stopPropagation();return false;case Y:Nb()||E.setFocus(true);xb(d,c);break;case C:Mb();break;case S:if(!Nb()){vb();E.setFocus(true)}break;case D:cc(b.target,c);break;case w:E.setFocus(true);break;case x:if(b.shiftKey&&kb&&zb){kb.focus();b.stopPropagation();return false}}}function rc(){a("BODY").bind("click",Db).bind("dblclick",Db)}function uc(){a("BODY").unbind("click",Db).unbind("dblclick",Db)}function Db(c){if(!c||!c.target)return;var d=c.target,b=a(d);if(b.closest(".LetterPickerContainer").length>0)return;if(b.closest(L).length>0)return;if(kb&&jc(kb[0],b[0])){if(nb()[0]===ab[0])E.completeUserEntry();else{Sb();setTimeout(function(){E.setFocus(false)},0)}return}if(b.hasClass(A)&&Ub(b))return;Sb();if(rb){E.completeUserEntry();setTimeout(function(){if(rb){Cb(rb,Pb(ab,rb.id()));rb=null}},0)}if(Ob())return;E.completeUserEntry();E.hideContactList()}function Sb(){var a=hb.find(m);if(a.length!==0)Tb(a,false)}function Ub(a){return jc(pb,a)}function jc(b,c){return a(c).closest(b).length===1}function Zb(){return tb()||Ob()}function tb(){return fb.css("display")!=="none"}function Ob(){return Ub(document.activeElement)}function Fc(a){cc(a.target,{input:e.mouse})}function cc(c,b){Lb(a.view(c),true);if(b)Jb.triggerHandler(t.userAction,a.extend({type:l.editContact,input:e.none},b))}function Qb(c,e,o){if(!c.hasClass(v))c=ab;var n=c.hasClass(k),q=sb(c),l=Vb(c),h;if(l.length>0)h=l[0];ub(ab);if(!a.isArray(e))e=[e];var g=0;if(!n){var j=Lb(c.view(),false);j.contact(e[0]);U.modifySelectedContact(h,j,false);g=1}var i=[];for(;g<e.length;g++)i.push(new b.ViewModels.SelectedContact(h,e[g]));var p=jb?r.autocomplete:cb===f?r.contactpicker:r.relevancy;U.selectContacts(i,o,{entryPt:p});var m=!(c[0]===ab[0]&&c.val()===0);c.val("");vb();setTimeout(function(){if(eb.excludeSelectedFromFrequentList&&cb===d)ib(true);E.setFocus(m);Bb()},0)}function xb(c,b){var f=U.getSelectedContactById(c);if(f===db.contact)db={};U.deselectContactBySelectedContactId(c);if(eb.excludeSelectedFromFrequentList&&cb===d)ib(true);ob();setTimeout(Bb,0);if(b)Jb.triggerHandler(t.userAction,a.extend({type:l.deleteContact,input:e.none},b))}function Cb(b,a){vb();db={contact:b,$contactElt:a};a.addClass(q);a.find(i).focus();E.hideContactList()}function vb(){if(db.$contactElt){db.$contactElt.removeClass(q);db={}}}function Mb(){var b=false;if(!db.contact||!db.$contactElt){var a=hc();if(a.contact&&a.$contactElt){Cb(a.contact,a.$contactElt);b=true}}else{var c=U.indexOfSelectedContactId(db.contact.id())-1;if(c>=0){var e=U.getSelectedContactByIndex(c),d=db.$contactElt.prev();Cb(e,d);b=true}}return b}function Nb(){if(!db.contact||!db.$contactElt)return false;var a=U.indexOfSelectedContactId(db.contact.id());if(a<U.selectedContacts(true).length-1){a+=1;var c=U.getSelectedContactByIndex(a),b=db.$contactElt.next();Cb(c,b);return true}else return false}function hc(){var c=U.selectedContacts(true),d=c.length-1,b=null,a=null;if(d>=0){b=c[d];a=Pb(ab,b.id());if(!a[0])a=hb.find(m).closest(n)}return {contact:b,$contactElt:a}}function Pb(a,c){var b=jQuery(a).closest(H);return b.find(n+"[cid='"+c+"']")}function Tc(g,a){if(c.document.activeElement&&nb()[0]===ab[0]){var f=jQuery(c.document.activeElement);if(!f.hasClass(v))return}var e=nb();if(e[0]!==ab[0]&&(cb===d||cb===s)&&e.val()===""){E.hideContactList();return}if(jb===a.query&&h&&tb())return;if(a.query==="")ib();else Lc(a.query,a.contacts.sort(b.ViewModels.SortHelpers.picwComparer));Yb()}function Ab(){setTimeout(function(){ob(ab)},0)}function ub(b,c){c=c||parseInt(b.css("min-width"),10)||0;var a=Math.max(c,Qc(b.val())),d=gb[0].clientWidth;if(d!==0)a=Math.min(a,d-g);b.width(a);return a}function ob(e){if(e)ub(e);if(!ab)return;var b=gb[0].clientWidth;if(b===0)return;var h=gb.position().left,a=h+b-g,c=hc();if(c.$contactElt){var d=c.$contactElt.position().left;if($B.rtl)a=d-g;else a-=d+c.$contactElt[0].clientWidth}var f=false;if(a<g){a=b-g;f=true}ab.width(0);a=ub(ab,a);gb.css("max-height",bc+"px");setTimeout(function(){if(f)a=gb[0].clientWidth-g;ab.width(0);ab.width(a);if(tb())Kb();zc()},0)}function zc(){var b=jQuery(c.document.activeElement).closest(j);b=b.length>0?b:ab;var a=b[0],e=gb.scrollTop(),d=0;if(a){while(a&&a!==gb[0]){d+=a.offsetTop;a=a.offsetParent}if(d<e||d>e+gb.height())gb.scrollTop(d)}}function Bb(){var a=vc(),b=Math.max(M,gb.innerWidth());fb.width(b);fb.height(a);a=tc(a);if(h)h.resize();return {width:b,height:a}}function vc(){var a=eb.maxHeight;if(qb&&qb.length>0){var g=parseInt(qb.css("padding-bottom"),10),e=pb.offset().top+pb.outerHeight()-qb.offset().top;a=qb.innerHeight()-e-g}else{var b=fb.outerHeight()-fb.innerHeight();a=a&&a>0?a-hb.outerHeight()-b:Number.MAX_VALUE;var c=$f.getLocation(hb[0]),d=$f.clientHeight(),f=c.addScrollTop!=-1?$f.scrollTop():0;a=Math.min(d+f-c.bottom-b-eb.contactListBottomMargin,a)}a=Math.max(P,a);return a}function tc(a){a=Math.min(a,dc.outerHeight());fb.height(a);return a}function Rb(){Bb()}function Qc(a){Gb.text(a);var b=Gb.innerWidth();Gb.text("");return b+g}function Kb(){c.$f.dockIt(fb[0],hb[0],0,-1,1)}function ib(i){var a=[],b=false;if(cb===s)b=true;else{var c=null;if(eb.excludeSelectedFromFrequentList&&cb==d){var g=U.selectedContacts();c=[];for(var e=0;e<g.length;e++){var h=g[e].contact();if(h)c.push(h)}}a=cb===d?U.getPicwContactList(eb.numFrequentContactsShownLimit,c):U.getContactList();jb="";if(a.length>0){if(i||!tb()||!Pc(a,lb)){yb();lb=a;ec(cb===f)}}else b=true}if(b){yb();lb=a;E.hideContactList()}}function Pc(a,c){var b=a===c;if(a&&c&&!b)if(a.length===c.length){b=true;for(var d=0;d<a.length;d++)if(a[d]!==c[d]){b=false;break}}return b}function Lc(b,a){yb();lb=a;jb=b;if(lb.length>0)ec(false);else E.hideContactList()}function yb(){h&&h.dispose();h=null;lb=null;bb=-1}function Oc(b){var a=nb(),c=a.length>0?a.val():ab.val(),d=cb;cb=typeof b==="undefined"?eb.toggleContactListTransitions[cb]:b;if(!X(cb))cb=f;if(c===""||cb===f)ib(cb!==d);else a.keyup();if(h){fb.show();Kb()}}Sc()}$Do.register("WLXContactPickerV2")})()