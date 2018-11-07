import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
/** This allows support [(ngModel)] and ngControl. */
var RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return BarRatingComponent; }),
    multi: true
};
/** This allows control required validation. */
var RATING_VALUE_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return BarRatingComponent; }),
    multi: true,
};
var BarRatingComponent = (function () {
    function BarRatingComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.contexts = [];
        /** Maximal rating that can be given using this widget. */
        this.max = 5;
        /** A flag indicating if rating can be updated. */
        this.readOnly = false;
        /** Set the theme */
        this.theme = 'default';
        /** Show rating title */
        this.showText = false;
        /** Replace rate value with a title */
        this.titles = [];
        /** A flag indicating if rating is required for form validation. */
        this.required = false;
        /** An event fired when a user is hovering over a given rating.
         * Event's payload equals to the rating being hovered over. */
        this.hover = new EventEmitter();
        /** An event fired when a user stops hovering over a given rating.
         * Event's payload equals to the rating of the last item being hovered over. */
        this.leave = new EventEmitter();
        /** An event fired when a user selects a new rating.
         * Event's payload equals to the newly selected rating. */
        this.rateChange = new EventEmitter(true);
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    BarRatingComponent.prototype.ngOnChanges = function (changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
    };
    BarRatingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contexts = Array.from({ length: this.max }, function (context, i) { return ({
            selected: false,
            fraction: false,
            click: function (e) { return _this.handleClick(e, i); },
            enter: function () { return _this.handleEnter(i); }
        }); });
        this.updateState(this.rate);
    };
    BarRatingComponent.prototype.update = function (newRate, internalChange) {
        if (internalChange === void 0) { internalChange = true; }
        if (!this.readOnly && !this.disabled && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this.updateState(this.rate);
    };
    /** Reset rate value */
    BarRatingComponent.prototype.reset = function () {
        this.leave.emit(this.nextRate);
        this.updateState(this.rate);
    };
    BarRatingComponent.prototype.updateState = function (nextValue) {
        var _this = this;
        /** Set rate value as text */
        this.nextRate = nextValue - 1;
        /** Set the rating */
        this.contexts = Array.from({ length: this.max }, function (context, index) { return ({
            selected: index + 1 <= nextValue,
            fraction: (index + 1 === Math.round(nextValue) && nextValue % 1) >= 0.5,
            click: function (e) { return _this.handleClick(e, index); },
            enter: function () { return _this.handleEnter(index); }
        }); });
    };
    BarRatingComponent.prototype.handleClick = function (e, value) {
        /** (NOT TESTED) Remove 300ms click delay on touch devices */
        e.preventDefault();
        e.stopPropagation();
        this.update(value + 1);
    };
    BarRatingComponent.prototype.handleEnter = function (index) {
        if (!this.disabled && !this.readOnly) {
            /** Add selected class for rating hover */
            this.contexts.map(function (context, i) {
                context.active = i <= index;
                context.fraction = false;
                context.selected = false;
            });
            this.nextRate = index;
            this.hover.emit(index);
        }
    };
    /** This is the initial value set to the component */
    BarRatingComponent.prototype.writeValue = function (value) {
        this.update(value, false);
        this.changeDetectorRef.markForCheck();
    };
    BarRatingComponent.prototype.validate = function (c) {
        return (this.required && !c.value) ? { required: true } : null;
    };
    BarRatingComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    BarRatingComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    BarRatingComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    return BarRatingComponent;
}());
export { BarRatingComponent };
BarRatingComponent.decorators = [
    { type: Component, args: [{
                selector: 'bar-rating',
                template: "\n    <div [class]=\"'br br-' + theme\" [class.br-readonly]=\"readOnly\" [class.br-disabled]=\"disabled\">\n\n      <div class=\"br-units\" (mouseleave)=\"reset()\">\n\n        <div class=\"br-unit\" *ngFor=\"let unit of contexts\" [class.br-fraction]=\"unit.fraction\"\n            [class.br-selected]=\"unit.selected\" [class.br-active]=\"unit.active\"\n            (click)=\"unit.click($event)\" (mouseenter)=\"unit.enter()\"></div>\n\n      </div>\n\n      <div *ngIf=\"showText\" class=\"br-text\">{{ nextRate | rateTitle: titles}}</div>\n    </div>\n  ",
                styles: ["\n    *{box-sizing:border-box}.br{position:relative;margin:15px 0}.br-units{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.br-unit{cursor:pointer;-webkit-font-smoothing:antialiased;text-rendering:auto}.br-disabled .br-unit,.br-readonly .br-unit{cursor:default}\n  "],
                providers: [RATING_VALUE_ACCESSOR, RATING_VALUE_VALIDATOR],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
BarRatingComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
BarRatingComponent.propDecorators = {
    'rate': [{ type: Input },],
    'max': [{ type: Input },],
    'readOnly': [{ type: Input },],
    'theme': [{ type: Input },],
    'showText': [{ type: Input },],
    'titles': [{ type: Input },],
    'required': [{ type: Input },],
    'hover': [{ type: Output },],
    'leave': [{ type: Output },],
    'rateChange': [{ type: Output },],
};
//# sourceMappingURL=bar-rating.component.js.map