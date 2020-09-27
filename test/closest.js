import closest from '../src/closest';

describe('closest', function() {
    before(function() {
        var html = '<div id="a">' +
                        '<div id="b">' +
                            '<div id="c"></div>' +
                        '</div>' +
                    '</div>';

        document.body.innerHTML += html;
    });

    after(function() {
        document.body.innerHTML = '';
    });

    it('should return the closest parent based on the selector', function() {
        var a = document.querySelector('#a');
        var b = document.querySelector('#b');
        var c = document.querySelector('#c');

        assert.ok(closest(c, '#b'), b);
        assert.ok(closest(c, '#a'), a);
        assert.ok(closest(b, '#a'), a);
    });

    it('should return itself if the same selector is passed', function() {
        assert.ok(closest(document.body, 'body'), document.body);
    });

    it('should not throw on elements without matches()', function() {
        var fakeElement = {
            nodeType: -1, // anything but DOCUMENT_NODE_TYPE
            parentNode: null,
            matches: undefined // undefined to emulate Elements without this function
        };

        try {
            closest(fakeElement, '#a')
        } catch (err) {
            assert.fail();
        }
    });
});
