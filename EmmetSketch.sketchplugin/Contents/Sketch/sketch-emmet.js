@import 'helpers.js'

var onRun = function(context) {
    try {
        var doc = context.document;
        var selection = context.selection;

        // If nothing is selected.
        if ([selection count] < 1) {
            alert('Nothing was selected.','Please select, at least, one layer');
            return;
        }

        var emmetMarkup = getEmmetMarkup(selection);
			// emmetMarkup = expandAbbreviation("ul>li*5");
			// log(emmetMarkup);

        doc.showMessage('📋 Snippet Copied');
        copyEmmetMarkup(emmetMarkup);

    } catch (e) {
        alert(e, 'Oops. Something went wrong.');
    }
}
