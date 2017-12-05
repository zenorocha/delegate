var delegate = require('../src/delegate');
var simulant = require('simulant');

describe('delegate', function() {
    before(function() {
        var html = '<ul>' +
                        '<li><a>Item 1</a></li>' +
                        '<li><a>Item 2</a></li>' +
                        '<li><a>Item 3</a></li>' +
                        '<li><a>Item 4</a></li>' +
                        '<li><a>Item 5</a></li>' +
                   '</ul>';

        document.body.innerHTML += html;

        global.container = document.querySelector('ul');
        global.anchor = document.querySelector('a');

        global.spy = sinon.spy(global.container, 'removeEventListener');
    });

    after(function() {
        global.spy.restore();
        document.body.innerHTML = '';
    });

    it('should add an event listener', function(done) {
        delegate(global.container, 'a', 'click', function() {
            done();
        });

        simulant.fire(global.anchor, simulant('click'));
    });

    it('should remove an event listener', function() {
        var delegation = delegate(global.container, 'a', 'click', function() {});

        delegation.destroy();
        assert.ok(global.spy.calledOnce);
    });

    it('should use `document` if the element is unspecified', function(done) {
        delegate('a', 'click', function() {
            done();
        });

        simulant.fire(global.anchor, simulant('click'));
    });

    it('should add event listeners to all the elements in a base selector', function() {
        var spy = sinon.spy();
        delegate('li', 'a', 'click', spy);

        var anchors = document.querySelectorAll('a')
        simulant.fire(anchors[0], simulant('click'));
        simulant.fire(anchors[1], simulant('click'));
        assert.ok(spy.calledTwice);
    });

    it('should add event listeners to all the elements in a base array', function() {
        var spy = sinon.spy();
        var items = document.querySelectorAll('a')
        delegate(items, 'a', 'click', spy);

        var anchors = document.querySelectorAll('a')
        simulant.fire(anchors[0], simulant('click'));
        simulant.fire(anchors[1], simulant('click'));
        assert.ok(spy.calledTwice);
    });
});
