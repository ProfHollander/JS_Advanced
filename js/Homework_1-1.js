function Container(id, className, tagName) {
    // public
    this.id = id;
    this.className = className;

    // protected
    this._tagName = tagName;

    // private
    var element;

    this.returnElement = function () {
        var element = this.getElement();

        return element;
    }

    this.getElement = function () {
        return element;
    }

    this.setElement = function (newValue) {
        element = newValue;
    }
}

Container.prototype.render = function () {
    var element = this.getElement();

    if (!element) {
        element = document.createElement(this._tagName);
        element.id = this.id;
        element.className = this.className;

        this.setElement(element);
    }

    return element;
};

Container.prototype.remove = function () {
    var element = this.getElement();

    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
};

function Menu(id, className, items) {
    Container.call(this, id, className, 'ul');

    // protected
    this._items = items;
}

Menu.prototype = Object.create(Container.prototype);

Menu.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    this._items.forEach(function (item) {
        if (item instanceof Container) {
            container.appendChild(item.render());
        }
    });

    return container;
};

Menu.prototype.remove = function () {
    var element = document.getElementById(this.id);

    this.setElement(element);

    Container.prototype.remove.call(this);
};

function MasterMenu(id, className, mainMenu, subMenus) {
    Menu.call(this, id, className, subMenus);

    //protected
    this._subMenus = subMenus;
    this._mainTitle = mainMenu.title;
    this._mainLink = mainMenu.link;
}

MasterMenu.prototype = Object.create(Menu.prototype);

MasterMenu.prototype.render = function () {
    var container = Menu.prototype.render.call(this);

    var a = document.createElement('a');
    a.textContent = this._mainTitle;
    a.href = this._mainLink;

    container.appendChild(a);

    var ul = document.createElement('ul');

    this._subMenus.forEach(function (menu) {
        if (menu instanceof Container) {
            ul.appendChild(menu.returnElement());
        }
    });
    container.appendChild(ul);
    var li = document.createElement('li');
    li.appendChild(container);
    return li;
};

function MenuItem(className, link, title) {
    Container.call(this, '', className, 'li');

    this.link = link;
    this.title = title;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    var a = document.createElement('a');
    a.textContent = this.title;
    a.href = this.link;

    container.appendChild(a);

    return container;
};

MenuItem.prototype.remove = function () {
    var list = document.getElementsByTagName('li');

    for (var i = 0; i < list.length; i++) {
        if (list[i].firstChild.textContent == this.title) {
            var element = list[i];
        }
    }

    this.setElement(element);

    Container.prototype.remove.call(this);
};

var Home = new MenuItem('menu-item', '#', 'Home');
var News = new MenuItem('menu-item', '#', 'News');
var Blog = new MenuItem('menu-item', '#', 'Blog');

var subMenuItem1 = new MenuItem('menu-item', '#', 'Breaking News');
var subMenuItem2 = new MenuItem('menu-item', '#', 'Financial News');

var subMenuItem3 = new MenuItem('menu-item', '#', 'Interesting blogs');
var subMenuItem4 = new MenuItem('menu-item', '#', 'Boring blogs');
var subMenuItem5 = new MenuItem('menu-item', '#', 'Mainstream blogs');

var subNews = new MasterMenu('menuM', 'menu master', News, [subMenuItem1, subMenuItem2]);
var subBlogs = new MasterMenu('menuM', 'menu master', Blog, [subMenuItem3, subMenuItem4, subMenuItem5]);

var main = new Menu('menu45', 'menu menu45', [Home, subNews, subBlogs]);

document.body.appendChild(main.render());


