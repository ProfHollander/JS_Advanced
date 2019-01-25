// public, protected, private

function Container(id, className, tagName) {
  // public
  this.id = id;
  this.className = className;

  // protected
  this._tagName = tagName;

  // private
  var element;

  this.getElement = function() {
    return element;
  };

  this.setElement = function(newValue) {
    element = newValue;
  }
}

Container.prototype.render = function() {
  var element = this.getElement();

  if (!element) {
    element = document.createElement(this._tagName);
    element.id = this.id;
    element.className = this.className;

    this.setElement(element);
  }

  return element;
};

Container.prototype.remove = function() {
  var element = this.getElement();

  if(element) {
    element.parentElement.removeChild(element);
    this.setElement(null);
  }
};

function Menu(id, className, items) {
  Container.call(this, id, className, 'ul');

  // protected
  this._items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function() {
  var container = Container.prototype.render.call(this);
  
  this._items.forEach(function(item) {
    if(item instanceof Container) {
      container.appendChild(item.render());
    }
  });

  return container;
};

function MenuItem(className, link, title) {
  Container.call(this, '', className, 'li');

  this.link = link;
  this.title = title;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function() {
  var container = Container.prototype.render.call(this);

  var a = document.createElement('a');
  a.textContent = this.title;
  a.href = this.link;

  container.appendChild(a);

  return container;
};

function SuperMenu(id, className, items, link, title) {
  MenuItem.call(this, 'itemLink', link, title);
  Menu.call(this, id, className, items);
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function() {
  if(this.link && this.title) {
    var menuItem = new MenuItem('itemLink', this.link, this.title).render();
    var menu = Menu.prototype.render.call(this);
    menuItem.appendChild(menu);

    return menuItem;
  } else {
    return Menu.prototype.render.call(this);
  }
};


var menuItemDresses = new MenuItem('', '#', 'Dresses');
var menuItemTops = new MenuItem('', '#', 'Tops');
var menuItemSweaters = new MenuItem('', '#', 'Sweaters');
var menuItemJackets = new MenuItem('', '#', 'Jackets');
var menuItemBlazers = new MenuItem('', '#', 'Blazers');
var menuItemDenim = new MenuItem('', '#', 'Denim');
var menuItemLeggings = new MenuItem('', '#', 'Leggings');
var menuItemSkirts = new MenuItem('', '#', 'Skirts');
var menuItemAccessories = new MenuItem('', '#', 'Accessories');


var menuItemWomen = new SuperMenu('women', 'submenu', [menuItemTops, menuItemDenim, menuItemLeggings, menuItemSkirts, menuItemAccessories], 'single-page.html', 'Women');

var menuItemMen = new SuperMenu('men', 'submenu', [menuItemJackets, menuItemBlazers], '#', 'Men');

var menuItemKids = new SuperMenu('kids', 'submenu', [menuItemDresses], '#', 'Kids');

var menuItemAccessoriesMain = new SuperMenu('accessories', 'submenu', [menuItemSweaters], '#', 'Accessories');

var menuItemHome = new MenuItem('', 'index.html', 'Home');
var menuItemFeatured  = new MenuItem('', 'product.html', 'Featured');
var menuItemHotDeals  = new MenuItem('', '#', 'HotDeals');

var mainMenu = new Menu('', 'nav', [menuItemHome, menuItemMen, menuItemWomen, menuItemKids, menuItemAccessoriesMain,
    menuItemFeatured, menuItemHotDeals]);

var menuG = document.getElementById('menu');
menuG.appendChild(mainMenu.render());
console.log(menuG);
console.log(menuItemMen);
console.log(menuItemWomen);
console.log(menuItemAccessoriesMain);
