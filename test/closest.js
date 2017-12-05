var closest = require('../src/closest');

describe('closest', function() {
    before(function() {
        var html = '<div id="a">' +
                        '<div id="b">' +
                            '<div id="c"></div>' +
                        '</div>' +
                    '</div>';

        document.body.innerHTML += html;

        global.a = document.querySelector('#a');
        global.b = document.querySelector('#b');
        global.c = document.querySelector('#c');
    });

    after(function() {
        document.body.innerHTML = '';
    });

    it('should return the closest parent based on the selector', function() {
        assert.ok(global.c.closest('#b'), global.b);
        assert.ok(global.c.closest('#a'), global.a);
        assert.ok(global.b.closest('#a'), global.a);
    });

    it('should return itself if the same selector is passed', function() {
        assert.ok(document.body.closest('body'), document.body);
    });

    it('should not throw on elements without matches()', function() {
        var fakeElement = {
            nodeType: -1, // anything but DOCUMENT_NODE_TYPE
            parentNode: null,
            matches: undefined // undefined to emulate Elements without this function
        };

        try {
            fakeElement.closest('#a')
        } catch (err) {
            assert.fail();
        }
    });
});
