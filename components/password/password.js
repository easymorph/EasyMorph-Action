define(["client.property-panel/component-utils", "general.utils/string-limits", "text!./password.ng.html"], function(t, e, n) {
    return {
        template: n,
        controller: ["$scope", function(n) {
            var i = function() {
                // n.data - object which looks similar to layout object. Contains all the property values
                return n.data
            };
            // n - $scope
            // n.definition - item definition from "definition" extension property
            n.definition.maxlength ? n.maxlength = n.definition.maxlength : n.maxlength = e.name,
            t.defineLabel(n, n.definition, i, n.args.handler),
            t.defineVisible(n, n.args.handler),
            t.defineReadOnly(n, n.args.handler),
            t.defineChange(n, n.args.handler),
            // creates "value" property on the current $scope
            t.defineValue(n, n.definition, i), 
            // creates "displayValue" property and "isExpression()" and "isLocked()" methods on $scope
            // "displayValue" property reads and assings "value" property
            t.defineExpression(n, !1), 
            t.definePlaceholder(n, n.definition)
        }]
    };
});