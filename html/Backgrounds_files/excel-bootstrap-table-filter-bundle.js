(function(c){c="default" in c?c["default"]:c;var b=function(){function d(i,h,g,f,e){this.options=e;this.th=h;this.column=g;this.index=f;this.tds=i.find("tbody tr td:nth-child("+(this.column+1)+")").toArray()}d.prototype.initialize=function(){this.menu=this.dropdownFilterDropdown();this.th.appendChild(this.menu);var e=$(this.menu.children[0]);var f=$(this.menu.children[1]);var g=$(this.menu);e.click(function(){return f.toggle()});$(document).click(function(h){if(!g.is(h.target)&&g.has(h.target).length===0){f.hide()}})};d.prototype.searchToggle=function(e){if(this.selectAllCheckbox instanceof HTMLInputElement){this.selectAllCheckbox.checked=false}if(e.length===0){this.toggleAll(true);if(this.selectAllCheckbox instanceof HTMLInputElement){this.selectAllCheckbox.checked=true}return}this.toggleAll(false);this.inputs.filter(function(f){return f.value.toLowerCase().indexOf(e.toLowerCase())>-1}).forEach(function(f){f.checked=true})};d.prototype.updateSelectAll=function(){if(this.selectAllCheckbox instanceof HTMLInputElement){$(this.searchFilter).val("");this.selectAllCheckbox.checked=this.inputs.length===this.inputs.filter(function(e){return e.checked}).length}};d.prototype.selectAllUpdate=function(e){$(this.searchFilter).val("");this.toggleAll(e)};d.prototype.toggleAll=function(g){for(var f=0;f<this.inputs.length;f++){var e=this.inputs[f];if(e instanceof HTMLInputElement){e.checked=g}}};d.prototype.dropdownFilterItem=function(i,f){var g=i.innerText;var h=document.createElement("div");h.className="dropdown-filter-item";var e=document.createElement("input");e.type="checkbox";e.value=g.trim().replace(/ +(?= )/g,"");e.setAttribute("checked","checked");e.className="dropdown-filter-menu-item item";e.setAttribute("data-column",f.column.toString());e.setAttribute("data-index",f.index.toString());h.appendChild(e);h.innerHTML=h.innerHTML.trim()+" "+g;return h};d.prototype.dropdownFilterItemSelectAll=function(){var g=this.options.captions.select_all;var f=document.createElement("div");f.className="dropdown-filter-item";var e=document.createElement("input");e.type="checkbox";e.value=this.options.captions.select_all;e.setAttribute("checked","checked");e.className="dropdown-filter-menu-item select-all";e.setAttribute("data-column",this.column.toString());e.setAttribute("data-index",this.index.toString());f.appendChild(e);f.innerHTML=f.innerHTML+" "+g;return f};d.prototype.dropdownFilterSearch=function(){var f=document.createElement("div");f.className="dropdown-filter-search";var e=document.createElement("input");e.type="text";e.className="dropdown-filter-menu-search form-control";e.setAttribute("data-column",this.column.toString());e.setAttribute("data-index",this.index.toString());e.setAttribute("placeholder",this.options.captions.search);f.appendChild(e);return f};d.prototype.dropdownFilterSort=function(f){var g=document.createElement("div");g.className="dropdown-filter-sort";var e=document.createElement("span");e.className=f.toLowerCase().split(" ").join("-");e.setAttribute("data-column",this.column.toString());e.setAttribute("data-index",this.index.toString());e.innerText=f;g.appendChild(e);return g};d.prototype.dropdownFilterContent=function(){var l=this;var e=this;var g=document.createElement("div");g.className="dropdown-filter-content";var f=this.tds.reduce(function(m,o){var n=m.map(function(p){return p.innerText.trim()});if(n.indexOf(o.innerText.trim())<0){m.push(o)}return m},[]).sort(function(o,n){var m=o.innerText.toLowerCase();var p=n.innerText.toLowerCase();if(!isNaN(Number(m))&&!isNaN(Number(p))){if(Number(m)<Number(p)){return -1}if(Number(m)>Number(p)){return 1}}else{if(m<p){return -1}if(m>p){return 1}}return 0}).map(function(m){return l.dropdownFilterItem(m,e)});this.inputs=f.map(function(m){return m.firstElementChild});var j=this.dropdownFilterItemSelectAll();this.selectAllCheckbox=j.firstElementChild;f.unshift(j);var k=this.dropdownFilterSearch();this.searchFilter=k.firstElementChild;var h=f.reduce(function(n,m){n.appendChild(m);return n},document.createElement("div"));h.className="checkbox-container";var i=[];if(this.options.sort){i=i.concat([this.dropdownFilterSort(this.options.captions.a_to_z),this.dropdownFilterSort(this.options.captions.z_to_a)])}if(this.options.search){i.push(k)}return i.concat(h).reduce(function(m,n){m.appendChild(n);return m},g)};d.prototype.dropdownFilterDropdown=function(){var e=document.createElement("div");e.className="dropdown-filter-dropdown";var g=document.createElement("span");g.className="glyphicon glyphicon-arrow-down dropdown-filter-icon";var f=document.createElement("i");f.className="arrow-down";g.appendChild(f);e.appendChild(g);e.appendChild(this.dropdownFilterContent());if($(this.th).hasClass("no-sort")){$(e).find(".dropdown-filter-sort").remove()}if($(this.th).hasClass("no-filter")){$(e).find(".checkbox-container").remove()}if($(this.th).hasClass("no-search")){$(e).find(".dropdown-filter-search").remove()}return e};return d}();var a=function(){function d(f,e){this.target=f;this.options=e;this.ths=f.find("th"+e.columnSelector).toArray();this.filterMenus=this.ths.map(function(i,g){var h=$(i).index();return new b(f,i,h,g,e)});this.rows=f.find("tbody").find("tr").toArray();this.table=f.get(0)}d.prototype.initialize=function(){this.filterMenus.forEach(function(e){e.initialize()});this.bindCheckboxes();this.bindSelectAllCheckboxes();this.bindSort();this.bindSearch()};d.prototype.bindCheckboxes=function(){var h=this.filterMenus;var g=this.rows;var e=this.ths;var f=this.updateRowVisibility;this.target.find(".dropdown-filter-menu-item.item").change(function(){var i=$(this).data("index");var j=$(this).val();h[i].updateSelectAll();f(h,g,e)})};d.prototype.bindSelectAllCheckboxes=function(){var h=this.filterMenus;var g=this.rows;var e=this.ths;var f=this.updateRowVisibility;this.target.find(".dropdown-filter-menu-item.select-all").change(function(){var i=$(this).data("index");var j=this.checked;h[i].selectAllUpdate(j);f(h,g,e)})};d.prototype.bindSort=function(){var k=this.filterMenus;var j=this.rows;var e=this.ths;var g=this.sort;var h=this.table;var f=this.options;var i=this.updateRowVisibility;this.target.find(".dropdown-filter-sort").click(function(){var n=$(this).find("span");var m=n.data("column");var l=n.attr("class");g(m,l,h,f);i(k,j,e)})};d.prototype.bindSearch=function(){var h=this.filterMenus;var g=this.rows;var e=this.ths;var f=this.updateRowVisibility;this.target.find(".dropdown-filter-search").keyup(function(){var k=$(this).find("input");var i=k.data("index");var j=k.val();h[i].searchToggle(j);f(h,g,e)})};d.prototype.updateRowVisibility=function(f,p,e){var o=p;var n=[];var m=f.map(function(i){return{column:i.column,selected:i.inputs.filter(function(j){return j.checked}).map(function(j){return j.value.trim().replace(/ +(?= )/g,"")})}});for(var k=0;k<p.length;k++){var h=p[k].children;for(var g=0;g<m.length;g++){var l=h[m[g].column].innerText.trim().replace(/ +(?= )/g,"");if(m[g].selected.indexOf(l)===-1){$(p[k]).hide();break}$(p[k]).show()}}};d.prototype.sort=function(j,e,k,g){var m=1;if(e===g.captions.z_to_a.toLowerCase().split(" ").join("-")){m=-1}var f=$(k).find("tbody").get(0);var l=$(f).find("tr").get();l.sort(function(o,n){var i=o.children[j].innerText.toUpperCase();var p=n.children[j].innerText.toUpperCase();if(!isNaN(Number(i))&&!isNaN(Number(p))){if(Number(i)<Number(p)){return -1*m}if(Number(i)>Number(p)){return 1*m}}else{if(i<p){return -1*m}if(i>p){return 1*m}}return 0});for(var h=0;h<l.length;h++){f.appendChild(l[h])}};return d}();c.fn.excelTableFilter=function(d){var e=this;d=c.extend({},c.fn.excelTableFilter.options,d);if(typeof d.columnSelector==="undefined"){d.columnSelector=""}if(typeof d.sort==="undefined"){d.sort=true}if(typeof d.search==="undefined"){d.search=true}if(typeof d.captions==="undefined"){d.captions={a_to_z:"A to Z",z_to_a:"Z to A",search:"Search",select_all:"Select All"}}var f=new a(e,d);f.initialize();return e};c.fn.excelTableFilter.options={}}(jQuery));