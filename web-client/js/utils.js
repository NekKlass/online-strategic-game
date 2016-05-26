String.prototype.upperCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.lowerCase = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}
