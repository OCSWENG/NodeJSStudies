
var add = (a,b) => { return a+b;}

var asyncAdd = async function (a,b) {
    return Promise.resolve(a+b);
}

module.exports.add= add;
module.exports.asyncAdd= asyncAdd;
