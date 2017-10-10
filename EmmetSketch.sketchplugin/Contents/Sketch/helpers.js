function copyEmmetMarkup(list) {
    clipboard.set(list);
}

function alert(title, message) {
    var app = [NSApplication sharedApplication];
    [app displayDialog: message withTitle: title];
}

function isGroup(layer) {
    return [layer isMemberOfClass: [MSLayerGroup class]] || [layer isMemberOfClass: [MSArtboardGroup class]]
}

function isText(layer) {
    return [layer isMemberOfClass: [MSTextLayer class]]
}

function getText(layer) {
    var string = layer.stringValue();
    string = string.replace(/(\r\n|\n|\r)/gm, '<br/>');
    return string;
}

function isImage(layer) {
    var layerName = layer.name();

    var str = layerName;
    var re = /^(img\.|img\b)+/g;
    var found = str.match(re);

    if (found) {
        return true;
    } else {
        return false;
    }

}

function isTag(layer) {
    var layerName = layer.name();

	var re = new RegExp('(\\w)+[#\\.(\\[)]');
    var found = layerName.match(re);

    if (found) {
        return true;
    } else {
        return false;
    }
}

function isTextTag(layer) {
    var layerName = layer.name();

    if (layerName == 'h1' ||
        layerName == 'h2' ||
        layerName == 'h3' ||
        layerName == 'h4' ||
        layerName == 'h5' ||
        layerName == 'h6' ||
        layerName == 'p' ||
        layerName == 'blockquote' ||
        layerName == 'i' ||
        layerName == 'strong' ||
        layerName == 'b' ||
        layerName == 'li' ||
        layerName == 'a') {
        return true;
    } else {
        return false;
    }
}

function setEmmetTag(name) {
    var emptyString = '';
    var layerName = name;
    var reg = /(\[(.*?)\])/g;

    var layerAtts = layerName.match(reg);
    if (layerAtts) {
        layerAtts = layerAtts[0];
    }
    // Remove text inside []
    layerName = layerName.replace(/(\[(.*?)\])/g, emptyString);

    // Convert whitespace to -
    layerName = layerName.replace(/[\s]+/g, '-');

    // Convert remove some characters that can break the emmet code
    layerName = layerName.replace(/[^aA-z0-9:_*$%!#\s.-]/g, '-');

    if (layerAtts) {
        return layerName + layerAtts;
    } else {
        return layerName;
    }
}

function isIgnored(layer) {
    var layerName = layer.name();
    var str = layerName;
    var re = /^(%)+/g;
    var found = str.match(re);

    if (found) {
        return true;
    } else {
        return false;
    }
}

function getEmmetMarkup(list) {
    var emmetString = '';

    for (var i = [list count] - 1; i >= 0; i--) {

        var layer = list[i];
        var layerName = layer.name();
        layerName = setEmmetTag(layerName);

        if (isIgnored(layer)) {
            continue;
        }
        if (isGroup(layer)) {
            var subLayers = [layer layers];

            emmetString += '(' + layerName + '>';
            emmetString += getEmmetMarkup(subLayers);
            emmetString += ')';

        } else if (isText(layer)) {
            if (isTag(layer) || isTextTag(layer)) {
                emmetString += layerName + '{' + getText(layer) + '}';
            } else {
                emmetString += '{' + getText(layer) + '}';
            }
        } else if (isImage(layer)) {
            var layerWidth = layer.frame().width();
            var layerHeight = layer.frame().height();

            emmetString += layerName + '[width=' + layerWidth + ' height=' + layerHeight + ']';
        } else {
            emmetString += layerName;
        }
        if (i !== 0) {
            emmetString += '+';
        }
    }
    return emmetString;
}

var clipboard = {
    pasteBoard: null,
    init: function() {
        this.pasteBoard = NSPasteboard.generalPasteboard();
    },
    set: function(text) {
        if (typeof text === 'undefined') {
            return null;
        }

        if (!this.pasteBoard) {
            this.init();
        }

        this.pasteBoard.declareTypes_owner([NSPasteboardTypeString], null);
        this.pasteBoard.setString_forType(text, NSPasteboardTypeString);

        return true;
    },
    get: function() {
        if (!this.pasteBoard) {
            this.init();
        }

        var text = this.pasteBoard.stringForType(NSPasteboardTypeString);
        return text.toString();
    }
};
